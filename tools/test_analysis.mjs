#!/usr/bin/env node
/* ==========================================================
   Analysis gate.

   WHY THIS EXISTS. Three surfaces do arithmetic on what the reader
   enters, and none of them had a behaviour test: the spend model
   (no tool in tools/ referenced spendModel at all, yet it is the
   input to the Pareto curve, the Kraljic map and the budget
   position), the maturity assessment (its score is the thing a
   reader takes to a manager), and the document-pack builder (it
   assembles a bundle someone else will read). Smoke renders them;
   rendering a page that says 42% proves nothing about whether 42
   is the right number.

   The spend model is checked against the shipped example rather
   than a hand-written one, so the arithmetic is verified against
   data the product itself claims is representative.
   ========================================================== */

import fs from 'node:fs';
import { JSDOM } from 'jsdom';

const TARGET = process.argv[2] || 'ProcureSherpa-v2.0.html';
const dom = new JSDOM(fs.readFileSync(TARGET, 'utf8'), { runScripts: 'dangerously', pretendToBeVisual: true, url: 'http://localhost/index.html' });
const w = dom.window;
let pass = 0;
const fails = [];
const ok = (m) => { pass++; console.log('  ok   ' + m); };
const bad = (m) => { fails.push(m); console.log('  FAIL ' + m); };

setTimeout(() => {
  const PS = w.PS;

  /* ---------- 1. the spend model ---------- */
  console.log('\nM  the spend model adds up, and its charts say the same thing');
  const model = PS.spendModel.example();
  PS.spendModel.save(model);
  const loaded = PS.spendModel.load();
  if (!loaded || !loaded.categories || !loaded.categories.length) bad('M1: the shipped example does not survive a save/load round-trip');
  else if (loaded.categories.length !== model.categories.length) bad('M1: load returned ' + loaded.categories.length + ' categories, saved ' + model.categories.length);
  else ok('M1: the spend model round-trips through the store (' + model.categories.length + ' categories)');

  /* sum it the long way, independently of the product's own helper */
  let manualTotal = 0;
  const supplierNames = [];
  (model.categories || []).forEach((c) => {
    (c.suppliers || []).forEach((s) => {
      const v = Number(s.spend || s.value || s.annual || 0);
      manualTotal += v;
      if (s.name) supplierNames.push(s.name);
    });
    if (!c.suppliers || !c.suppliers.length) manualTotal += Number(c.spend || c.value || 0);
  });
  const productTotal = PS.spendModel.total(model);
  const productSuppliers = PS.spendModel.suppliers(model);
  if (Math.abs(productTotal - manualTotal) > Math.max(1, manualTotal * 0.001)) bad('M2: PS.spendModel.total says ' + productTotal + ' but the categories sum to ' + manualTotal);
  else ok('M2: the total matches an independent sum of the same records (' + Math.round(productTotal).toLocaleString() + ')');
  if (!productSuppliers.length) bad('M3: suppliers() returned nothing although the model names ' + supplierNames.length + ' suppliers');
  else if (productSuppliers.length !== supplierNames.length) bad('M3: suppliers() returned ' + productSuppliers.length + ' of ' + supplierNames.length);
  else ok('M3: suppliers() enumerates every supplier in the model (' + productSuppliers.length + ')');

  w.location.hash = '#/spend-model'; PS.renderRoute();
  const page = w.document.getElementById('main').textContent;
  const leak = page.match(/NaN|undefined|\[object Object\]|Infinity/);
  if (leak) bad('M4: the spend-model page leaks "' + leak[0] + '"');
  else ok('M4: the spend-model page renders with no numeric leak');
  const svg = PS.spendModel.chartsHtml(model);
  if (!/svg/i.test(svg)) bad('M5: chartsHtml produced no SVG');
  else if (/NaN|Infinity/.test(svg)) bad('M5: the chart markup contains NaN or Infinity');
  else ok('M5: Pareto and Kraljic render as SVG with finite coordinates (' + Math.round(svg.length / 1024) + ' KB of markup)');

  /* ---------- 2. the maturity assessment ---------- */
  console.log('\nN  the maturity score is the mean of the answers, not a number from nowhere');
  w.location.hash = '#/maturity'; PS.renderRoute();
  const selects = [].slice.call(w.document.querySelectorAll('#main select'));
  if (selects.length < 3) bad('N1: the maturity page exposes only ' + selects.length + ' rating controls');
  else {
    selects.forEach((s, i) => {
      const opts = [].slice.call(s.options).filter((o) => o.value !== '');
      if (opts.length) { s.value = opts[Math.min(i % opts.length, opts.length - 1)].value; s.dispatchEvent(new w.Event('change', { bubbles: true })); }
    });
    const run = [].slice.call(w.document.querySelectorAll('#main [data-act="maturity-run"]'))[0];
    if (!run) bad('N2: no run control on the maturity page');
    else {
      run.click();
      const res = PS.maturityResult;
      if (!res) bad('N2: pressing run produced no result');
      else {
        const levels = res.rows.map((r) => Number(r.level || r.score || r.value || 0)).filter((n) => isFinite(n));
        const manual = levels.length ? levels.reduce((a, b) => a + b, 0) / levels.length : NaN;
        if (!isFinite(res.avg)) bad('N3: the average is not a number (' + res.avg + ')');
        else if (Math.abs(res.avg - manual) > 0.01) bad('N3: reported average ' + res.avg + ' but the rows mean ' + manual.toFixed(3));
        else ok('N3: the average equals the mean of the ' + levels.length + ' answers (' + res.avg.toFixed(2) + ')');
        if (res.rows.length < 3) bad('N4: only ' + res.rows.length + ' maturity areas scored');
        else ok('N4: ' + res.rows.length + ' maturity areas each carry a score');
        const save = [].slice.call(w.document.querySelectorAll('#main [data-act="maturity-save"]'))[0];
        if (!save) bad('N5: no save control');
        else {
          const before = PS.saved.list().length;
          save.click();
          const after = PS.saved.list().length;
          if (after !== before + 1) bad('N5: saving the assessment wrote ' + (after - before) + ' records');
          else ok('N5: the assessment saves into the reader own work');
        }
      }
    }
  }

  /* ---------- 3. the document pack ---------- */
  console.log('\nO  a document pack contains what was put into it, and says what it is');
  const cands = PS.docpack.candidates();
  if (!cands || !cands.length) bad('O1: the pack builder offers no candidates');
  else {
    ok('O1: ' + cands.length + ' records are available to pack');
    const pick = cands.slice(0, 3).map((c) => c.title || c.id);
    const beforePacks = PS.docpack.list().length;
    PS.docpack.addToPacks('Gate pack', cands.slice(0, 3));
    const packs = PS.docpack.list();
    if (packs.length < beforePacks + 1) bad('O2: creating a pack did not add it (' + beforePacks + ' -> ' + packs.length + ')');
    else {
      const mine = packs.filter((p) => p.title === 'Gate pack')[0] || packs[0];
      const items = mine.items || [];
      if (items.length !== 3) bad('O2: the pack holds ' + items.length + ' items, expected 3');
      else ok('O2: a pack of three records is created and listed');
      const html = PS.docpack.buildPackHtml('Gate pack', cands.slice(0, 3), {});
      const missing = pick.filter((t) => String(t).length > 3 && html.indexOf(String(t).slice(0, 20)) < 0);
      if (missing.length) bad('O3: the assembled pack omits ' + missing.length + ' of its items: ' + missing.slice(0, 2).join(', '));
      else ok('O3: the assembled document contains each of the three items');
      if (/validate assumptions|decision-support|not[a-z ]*advice/i.test(html)) ok('O4: the pack carries its own limitation wording');
      else bad('O4: the assembled pack has no disclaimer or limitation statement');
      if (/NaN|undefined|\[object Object\]/.test(html)) bad('O5: the assembled pack leaks ' + (html.match(/NaN|undefined|\[object Object\]/) || [''])[0]);
      else ok('O5: the assembled pack has no numeric or object leak');
    }
    w.location.hash = '#/docpack'; PS.renderRoute();
    const t = w.document.getElementById('main').textContent;
    if (t.indexOf('Gate pack') < 0) bad('O6: the pack page does not list the pack that was created');
    else ok('O6: the pack page lists the created pack');
  }

  console.log('\n--- analysis gate summary ---');
  console.log('assertions passed: ' + pass);
  console.log('assertions failed: ' + fails.length);
  if (fails.length) { console.log('ANALYSIS GATE: FAIL'); w.close(); process.exit(1); }
  console.log('ANALYSIS GATE: PASS - the spend model adds up, the maturity score is the mean of the answers, and a pack holds what went in');
  w.close();
  process.exit(0);
}, 3500);
