#!/usr/bin/env node
/* ==========================================================
   Workbench data gate.

   WHY THIS EXISTS. The journey suite walks five routes - home,
   calc, saved, sop, what. The eight workbenches, which are the
   entire "Work" half of this product and the only place a reader
   can enter their own data, had no test that created a record.
   Smoke proved each page renders 250+ characters; nothing proved
   that pressing New, filling the form and pressing Save produces
   a row, that an edit updates instead of duplicating, that a
   delete removes, or that a required field is actually enforced.

   This gate does all of that in the rendered DOM, for every
   collection, and reads the values back from the store.
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

/* A value appropriate to the control, the way a person would fill it in.
   The type is decided first, because a number input rejects a word and
   leaves itself empty - which is correct behaviour, and the first version
   of this gate blamed the app for it by comparing the record against the
   value it had asked for rather than the value the control kept. */
const valueFor = (el) => {
  const t = (el.type || el.tagName).toLowerCase();
  if (t === 'select-one' || t === 'select') {
    const opts = [].slice.call(el.options).filter((o) => o.value !== '');
    if (!opts.length) return null;
    return opts[Math.min(1, opts.length - 1)].value;
  }
  if (t === 'number' || t === 'range') return '1234.5';
  if (t === 'date' || t === 'datetime-local') return '2026-01-15';
  if (t === 'checkbox' || t === 'radio') { el.checked = true; return 'true'; }
  if (t === 'email') return 'gate.record@example.test';
  if (t === 'url') return 'https://example.test';
  if (t === 'tel') return '+44 20 7946 0000';
  if (el.maxLength > 0 && el.maxLength < 12) return 'AB12';
  return 'Gate record ' + Math.floor(Math.random() * 1000);
};

const fillForm = (form) => {
  const controls = [].slice.call(form.querySelectorAll('input, select, textarea'));
  const written = {};
  controls.forEach((el) => {
    if (el.disabled || el.readOnly || el.type === 'hidden') return;
    const v = valueFor(el);
    if (v === null || v === undefined) return;
    if (el.type !== 'checkbox') el.value = v;
    el.dispatchEvent(new w.Event('input', { bubbles: true }));
    el.dispatchEvent(new w.Event('change', { bubbles: true }));
    /* assert what the control accepted, not what was asked for */
    const kept = el.type === 'checkbox' ? el.checked : el.value;
    if (String(kept).length > 3) written[el.name || el.getAttribute('data-k') || el.id || 'anon'] = kept;
  });
  return { controls: controls.length, written };
};

setTimeout(() => {
  const PS = w.PS;
  const cols = Object.keys(PS.WB_FIELDS || {});
  console.log('workbench collections: ' + cols.join(', '));

  cols.forEach((col) => {
    const route = '#/' + col;
    if (!PS.routes[col]) { bad(col + ': no route named ' + route + ', so its workbench cannot be opened'); return; }
    w.location.hash = route;
    PS.renderRoute();
    const main = w.document.getElementById('main');
    const text = () => w.document.getElementById('main').textContent;

    /* --- required-field enforcement: save an empty form --- */
    /* The form is open by default while a collection is empty, and only
       hidden behind a "new record" control once rows exist - so the gate
       takes whichever path the page actually offers rather than assuming
       a button that an empty workbench does not show. */
    let form = w.document.getElementById('wbForm');
    const newBtn = [].slice.call(main.querySelectorAll('[data-act="wb-new"]'))[0];
    if (!form && newBtn) { newBtn.click(); form = w.document.getElementById('wbForm'); }
    if (!form) { bad(col + ': the page offers neither an open form nor a new-record control'); return; }
    const before = PS.wb.list(col).length;
    const idsBefore = new Set(PS.wb.list(col).map((r) => r.id));
    const saveBtn = form.querySelector('[data-act="wb-save"]');
    if (!saveBtn) { bad(col + ': the form has no save control'); return; }
    saveBtn.click();
    if (PS.wb.list(col).length !== before) bad(col + ': an empty form was accepted - required fields are not enforced');
    else ok(col + ': an empty form is refused and nothing is written');

    /* --- create --- */
    const fresh = w.document.getElementById('wbForm');
    if (!fresh) { bad(col + ': the refused save also closed the form'); return; }
    const filled = fillForm(fresh);
    if (!filled.controls) { bad(col + ': the form has no editable controls'); return; }
    w.document.getElementById('wbForm').querySelector('[data-act="wb-save"]').click();
    const after = PS.wb.list(col).length;
    if (after !== before + 1) { bad(col + ': save with ' + filled.controls + ' fields filled produced ' + (after - before) + ' records, expected 1'); return; }
    /* read back the row that was actually created, not row zero: a
       collection that already holds seed records would otherwise make the
       gate compare the typed values against somebody else's row - which is
       exactly what it did on its first run */
    const created = PS.wb.list(col).filter((r) => !idsBefore.has(r.id));
    if (created.length !== 1) { bad(col + ': the save produced ' + created.length + ' new rows, expected exactly 1'); return; }
    const rec = created[0];
    ok(col + ': a record is created through the UI (' + filled.controls + ' controls filled)');

    /* the values must come back out, not just the row count */
    const stored = JSON.stringify(rec);
    const typedValues = Object.values(filled.written).filter((v) => typeof v === 'string' && v.length > 3);
    const lost = typedValues.filter((v) => stored.indexOf(v) < 0);
    if (lost.length) bad(col + ': typed values did not reach the record: ' + lost.slice(0, 2).join(' | '));
    else ok(col + ': every typed value round-trips into the stored record');

    /* --- render integrity after the write --- */
    const leak = text().match(/NaN|undefined|\[object Object\]|Invalid Date/);
    if (leak) bad(col + ': the page leaks "' + leak[0] + '" after a save');
    else ok(col + ': the page renders cleanly with the new record');

    /* --- edit updates, never duplicates --- */
    const editBtn = [].slice.call(w.document.querySelectorAll('[data-act="wb-edit"][data-col="' + col + '"]'))[0];
    if (!editBtn) bad(col + ': no edit control rendered for the new row');
    else {
      editBtn.click();
      const ef = w.document.getElementById('wbForm');
      if (!ef) bad(col + ': pressing Edit did not open the form');
      else {
        const marker = 'Edited ' + col;
        const target = [].slice.call(ef.querySelectorAll('input[type=text], input:not([type]), textarea')).filter((i) => !i.disabled)[0];
        if (target) { target.value = marker; target.dispatchEvent(new w.Event('input', { bubbles: true })); }
        ef.querySelector('[data-act="wb-save"]').click();
        const now = PS.wb.list(col).length;
        if (now !== after) bad(col + ': editing changed the record count to ' + now + ' (a duplicate)');
        else if (target && JSON.stringify(PS.wb.list(col)).indexOf(marker) < 0) bad(col + ': the edit did not reach the store');
        else ok(col + ': an edit updates the record and creates no duplicate');
      }
    }

    /* --- delete removes, through the confirmation the app shows --- */
    const delBtn = [].slice.call(w.document.querySelectorAll('[data-act="wb-delete"][data-col="' + col + '"]'))[0];
    if (!delBtn) bad(col + ': no delete control rendered');
    else {
      delBtn.click();
      const okBtn = [].slice.call(w.document.querySelectorAll('.modal button, .modal-backdrop button, #modalRoot button'))
        .filter((b) => /delete|confirm|yes/i.test(b.textContent))[0];
      if (!okBtn) bad(col + ': delete asked for no confirmation');
      else {
        okBtn.click();
        const fin = PS.wb.list(col).length;
        if (fin !== before) bad(col + ': after confirming delete the collection holds ' + fin + ', expected ' + before);
        else ok(col + ': delete asks first, then removes the record');
      }
    }

    /* --- persistence: the store must be what a reload would read --- */
    const raw = w.localStorage.getItem(Object.keys(w.localStorage).find((k) => /wb|workbench/i.test(k)) || '');
    if (raw && raw !== 'undefined') ok(col + ': the workbench store is written to local storage');
    else bad(col + ': no workbench payload found in local storage after the writes');
  });

  /* --- one arithmetic check on a page that totals what the reader typed --- */
  console.log('\nE  the totals are arithmetic, not decoration');
  w.location.hash = '#/suppliers';
  PS.renderRoute();
  let f = w.document.getElementById('wbForm');
  if (!f) {
    const nb = [].slice.call(w.document.querySelectorAll('[data-act="wb-new"]'))[0];
    if (nb) { nb.click(); f = w.document.getElementById('wbForm'); }
  }
  if (f) {
    const spend = [].slice.call(f.querySelectorAll('input')).filter((i) => /spend|value|amount/i.test(i.name + i.id + (i.getAttribute('aria-label') || '')))[0];
    if (spend) {
      spend.value = '1000';
      spend.dispatchEvent(new w.Event('input', { bubbles: true }));
      spend.dispatchEvent(new w.Event('change', { bubbles: true }));
      const name = [].slice.call(f.querySelectorAll('input[type=text], input:not([type])'))[0];
      if (name) { name.value = 'Arithmetic Gate Supplier'; name.dispatchEvent(new w.Event('input', { bubbles: true })); }
      w.document.getElementById('wbForm').querySelector('[data-act="wb-save"]').click();
      const recs = PS.wb.list('suppliers');
      const mine = recs.filter((r) => String(r.name || '').indexOf('Arithmetic Gate') === 0)[0];
      if (!mine) bad('E1: the supplier record was not stored under the name typed');
      else {
        const sum = recs.reduce((a, r) => a + (PS.num(r.spend) || 0), 0);
        const page = w.document.getElementById('main').textContent;
        const shown = (page.match(/[\d,]+\.?\d*/g) || []).map((s) => Number(s.replace(/,/g, '')));
        const rounded = Math.round(sum);
        const found = shown.some((v) => Math.abs(v - rounded) < 1 || Math.abs(v - rounded / 1000) < 0.05);
        if (found) ok('E1: the supplier register displays the sum of what is stored (' + rounded + ')');
        else bad('E1: stored spend sums to ' + rounded + ' but no figure on the page matches it');
        PS.wb.remove('suppliers', mine.id);
      }
    } else console.log('  note E1 - no spend field recognised on the supplier form; arithmetic not checked');
  }

  console.log('\n--- workbench gate summary ---');
  console.log('assertions passed: ' + pass);
  console.log('assertions failed: ' + fails.length);
  if (fails.length) { fails.forEach((f) => console.log('  X ' + f)); console.log('WORKBENCH GATE: FAIL'); process.exit(1); }
  console.log('WORKBENCH GATE: PASS - every collection creates, updates, deletes and persists through its own form');
  w.close();
  process.exit(0);
}, 3500);
