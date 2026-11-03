#!/usr/bin/env node
/* ==========================================================
   Content-page structure gate.

   WHY THIS EXISTS. Ledger rows 37 and 38 said it exactly: the
   knowledge page and the SOP page are "implemented consistently -
   and asserted by nothing: no gate names a knowledge-page section,
   so deleting the 'Risks' block from the template would pass
   npm run qa". For a learning portal that is the wrong shape of
   promise: the sections ARE the teaching method, and a record that
   renders a heading with nothing under it teaches nothing.

   This gate renders every record in every content type and asserts
   (a) the documented sections are present and (b) each one holds
   content rather than an empty heading.
   ========================================================== */

import fs from 'node:fs';
import { JSDOM } from 'jsdom';

const TARGET = process.argv[2] || 'ProcureSherpa-v2.0.html';
const dom = new JSDOM(fs.readFileSync(TARGET, 'utf8'), { runScripts: 'dangerously', pretendToBeVisual: true, url: 'http://localhost/index.html' });
const w = dom.window;

const REQUIRED = {
  kb: ['Why procurement cares', 'When it is used', 'How it works', 'Practical example', 'Risks to manage', 'Common mistakes', 'Related content'],
  sop: ['At a glance', 'Purpose and scope', 'Inputs', 'Outputs', 'Procedure', 'Controls, records and measurement', 'Responsibilities (RACI summary)', 'Related content'],
  cl: ['Checklist status', 'Notes', 'Related content'],
  tpl: ['Related content'],
  dec: ['Questions to answer', 'Reasoning', 'Related content'],
  kpi: ['Related content']
};
const ROUTE = { kb: 'k', sop: 'sop', cl: 'cl', tpl: 'tpl', dec: 'dec', kpi: 'kpi' };
const MIN_BODY = 40;

let pass = 0;
const fails = [];
const ok = (m) => { pass++; console.log('  ok   ' + m); };
const bad = (m) => { fails.push(m); console.log('  FAIL ' + m); };

/* Text between one heading and the next: a heading with nothing under it
   is the failure mode this gate exists to catch, and a presence-only
   check would not see it. */
function sections(main) {
  const nodes = [].slice.call(main.querySelectorAll('h1, h2, h3'));
  const out = [];
  nodes.forEach((h, i) => {
    let text = '';
    let n = i + 1 < nodes.length ? nodes[i + 1] : null;
    let el = h;
    while (el && el !== main) {
      let sib = el.nextSibling;
      while (sib && sib !== n) {
        if (sib.nodeType === 3) text += sib.nodeValue;
        else if (sib.nodeType === 1) text += ' ' + sib.textContent;
        sib = sib.nextSibling;
      }
      el = el.parentNode;
    }
    out.push({ title: h.textContent.trim(), body: text.replace(/\s+/g, ' ').trim() });
  });
  return out;
}

setTimeout(() => {
  const PS = w.PS;
  Object.keys(REQUIRED).forEach((type) => {
    const list = PS.data[type] || [];
    const route = ROUTE[type];
    const missingSections = [];
    const emptySections = [];
    const noRender = [];
    list.forEach((rec) => {
      w.location.hash = '#/' + route + '/' + rec.id;
      try { PS.renderRoute(); } catch (e) { noRender.push(rec.id + ': threw ' + e.message); return; }
      const main = w.document.getElementById('main');
      if (main.textContent.trim().length < 500) { noRender.push(rec.id + ': rendered ' + main.textContent.trim().length + ' chars'); return; }
      const secs = sections(main);
      const found = new Set(secs.map((s) => s.title));
      const absent = REQUIRED[type].filter((req) => !found.has(req));
      if (absent.length) missingSections.push(rec.id + ' [' + absent.join(', ') + ']');
      const blank = secs.filter((s) => REQUIRED[type].includes(s.title) && s.body.length < MIN_BODY);
      if (blank.length) emptySections.push(rec.id + ' [' + blank.map((b) => b.title + '=' + b.body.length + 'ch').join(', ') + ']');
    });

    const label = type + ' (' + list.length + ' records, ' + REQUIRED[type].length + ' required sections)';
    if (noRender.length) bad(label + ' - pages that did not render: ' + noRender.slice(0, 3).join(' | '));
    else ok(label + ' - every record renders');
    if (missingSections.length) bad(label + ' - ' + missingSections.length + ' record(s) missing a documented section: ' + missingSections.slice(0, 4).join(' | '));
    else ok(label + ' - every documented section is present on every record');
    if (emptySections.length) bad(label + ' - ' + emptySections.length + ' record(s) hold a heading with nothing under it: ' + emptySections.slice(0, 4).join(' | '));
    else ok(label + ' - no required section is an empty heading');
  });

  /* the "no wall of text" claim in row 38 */
  const kb = PS.data.kb || [];
  const renderedFull = kb.filter((r) => {
    w.location.hash = '#/k/' + r.id; PS.renderRoute();
    const t = w.document.getElementById('main').textContent;
    return r.full && t.indexOf(String(r.full).slice(0, 60)) >= 0;
  });
  const withFull = kb.filter((r) => r.full).length;
  if (renderedFull.length) bad('the "full" field is rendered as a text wall on ' + renderedFull.length + ' concept page(s)');
  else ok('no concept renders a "full" wall of text (' + withFull + ' of ' + kb.length + ' records carry the field at all)');

  console.log('\n--- content-structure gate summary ---');
  console.log('assertions passed: ' + pass);
  console.log('assertions failed: ' + fails.length);
  if (fails.length) { console.log('CONTENT STRUCTURE GATE: FAIL'); w.close(); process.exit(1); }
  console.log('CONTENT STRUCTURE GATE: PASS - every content page carries its documented sections, with something under them');
  w.close();
  process.exit(0);
}, 3500);
