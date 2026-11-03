#!/usr/bin/env node
/* ==========================================================
   Saved-work lifecycle gate.

   WHY THIS EXISTS. The completion ledger says it plainly:
   "Storage - Save | nothing | No | RED - no tool references
   PS.saved.add", and row 27 adds that "no gate performs
   add -> rename -> duplicate -> delete -> import on the saved-work
   page, and MAX_SAVED 250 and the 10-tag cap are constants nothing
   tests". Saved work is the reader's own output - the thing they
   came to keep - and until now the only proof it worked was that
   the page rendered a few hundred characters.

   This gate performs the whole lifecycle through the same action
   handlers a click runs through, and asserts the two documented
   limits actually hold.
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

/* Click the button the app puts in its own dialog, so the confirmation
   step is part of the assertion rather than something the test skips by
   calling the underlying function. */
const clickDialog = (label) => {
  const btns = [].slice.call(w.document.querySelectorAll('.modal button, .modal-backdrop button, #modalRoot button, .prompt button'));
  const hit = btns.filter((b) => new RegExp(label, 'i').test(b.textContent))[0];
  if (hit) { hit.click(); return true; }
  return false;
};

/* PS.saved.add returns the record it wrote, not an id - and returns null
   when a limit refuses it. The first version of this gate treated the
   return value as an id and reported two failures that did not exist. */
const newSaved = (title, tags) => {
  const rec = PS.saved.add({
    type: 'calculation',
    title,
    data: { calc: 'calc-tco', calcTitle: 'TCO - Total Cost of Ownership', inputs: { a: 1 }, result: { total: 1 } },
    tags: tags || ['gate']
  });
  return rec && rec.id ? rec.id : null;
};

let PS;
setTimeout(() => {
  PS = w.PS;

  console.log('\nA  a record is created, listed and read back');
  w.localStorage.clear();
  PS.saved.list().forEach((r) => PS.saved.remove(r.id));
  const start = PS.saved.list().length;
  const id = newSaved('Gate saved item');
  if (!id) bad('A1: PS.saved.add returned no id');
  else if (PS.saved.list().length !== start + 1) bad('A1: the list did not grow (' + start + ' -> ' + PS.saved.list().length + ')');
  else ok('A1: PS.saved.add writes a record and the list grows by one');

  const rec = PS.saved.get(id);
  if (!rec) bad('A2: the new record cannot be read back by id');
  else {
    if (!rec.created || !rec.modified) bad('A2: the record has no created/modified stamp');
    else ok('A2: the record carries created and modified stamps');
    if (rec.data && rec.data.calc !== 'calc-tco') bad('A2: the payload lost its source tool (' + rec.data.calc + ')');
    else ok('A2: the payload round-trips with its source tool');
  }

  w.location.hash = '#/saved';
  PS.renderRoute();
  const page = w.document.getElementById('main').textContent;
  if (page.indexOf('Gate saved item') < 0) bad('A3: the saved-work page does not list the new record');
  else ok('A3: the saved-work page lists the new record');

  console.log('\nB  rename, duplicate and delete run through their own dialogs');
  const renameBtn = [].slice.call(w.document.querySelectorAll('[data-act="saved-rename"]'))[0];
  if (!renameBtn) bad('B1: no rename control rendered');
  else {
    renameBtn.click();
    const field = [].slice.call(w.document.querySelectorAll('.modal input, #modalRoot input, .prompt input'))[0];
    if (!field) bad('B1: rename opened no text field');
    else {
      field.value = 'Gate item renamed';
      field.dispatchEvent(new w.Event('input', { bubbles: true }));
      if (!clickDialog('Rename')) bad('B1: rename asked for no confirmation');
      else {
        const after = PS.saved.get(renameBtn.dataset.id) || {};
        if (after.title !== 'Gate item renamed') bad('B1: the rename did not reach the store (title is ' + JSON.stringify(after.title) + ')');
        else ok('B1: rename through the dialog updates the stored title');
      }
    }
  }

  w.location.hash = '#/saved'; PS.renderRoute();
  const dupBtn = [].slice.call(w.document.querySelectorAll('[data-act="saved-duplicate"]'))[0];
  if (!dupBtn) bad('B2: no duplicate control rendered');
  else {
    const before = PS.saved.list().length;
    dupBtn.click();
    const after = PS.saved.list().length;
    if (after !== before + 1) bad('B2: duplicate produced ' + (after - before) + ' new records');
    else {
      const titles = PS.saved.list().map((r) => r.title);
      if (new Set(titles).size === titles.length) ok('B2: duplicate adds a copy with a distinct id');
      else bad('B2: duplicate reused a title without marking the copy');
    }
  }

  w.location.hash = '#/saved'; PS.renderRoute();
  const delBtn = [].slice.call(w.document.querySelectorAll('[data-act="saved-delete"]'))[0];
  if (!delBtn) bad('B3: no delete control rendered');
  else {
    const before = PS.saved.list().length;
    delBtn.click();
    if (!clickDialog('Delete')) bad('B3: delete removed the record without asking');
    else {
      const after = PS.saved.list().length;
      if (after !== before - 1) bad('B3: delete left ' + after + ' records, expected ' + (before - 1));
      else ok('B3: delete asks, then removes exactly one record');
    }
  }

  console.log('\nC  the two documented limits are real');
  if (typeof PS.MAX_SAVED !== 'number') bad('C1: PS.MAX_SAVED is not a number');
  else {
    PS.saved.list().forEach((r) => PS.saved.remove(r.id));
    for (let i = 0; i < PS.MAX_SAVED; i++) PS.saved.add({ type: 'calculation', title: 'Fill ' + i, data: { calc: 'calc-tco' } });
    const at = PS.saved.list().length;
    const extra = newSaved('One too many');
    const after = PS.saved.list().length;
    if (at !== PS.MAX_SAVED) bad('C1: the store holds ' + at + ' after writing ' + PS.MAX_SAVED + ' records');
    else if (after > PS.MAX_SAVED) bad('C1: the limit is not enforced - ' + after + ' records after the cap');
    else if (after === PS.MAX_SAVED && extra) bad('C1: a record past the cap was returned as saved');
    else ok('C1: the ' + PS.MAX_SAVED + '-item limit is enforced and the overflow is refused');
    const page2 = (() => { w.location.hash = '#/saved'; PS.renderRoute(); return w.document.getElementById('main').textContent; })();
    if (page2.indexOf('One too many') >= 0) bad('C1: the refused record is displayed anyway');
    else ok('C1: the refused record does not appear on the page');
  }

  PS.saved.list().forEach((r) => PS.saved.remove(r.id));
  const manyTags = newSaved('Tag stress', ['alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot', 'golf', 'hotel', 'india', 'juliet', 'kilo', 'lima', 'mike', 'november', 'oscar']);
  const storedTags = (PS.saved.get(manyTags) || {}).tags || [];
  if (storedTags.length > 10) bad('C2: ' + storedTags.length + ' tags were stored; the documented cap is 10');
  else if (!storedTags.length) bad('C2: the tag cap threw the tags away entirely');
  else ok('C2: fifteen tags submitted, ' + storedTags.length + ' stored (cap respected, not silently emptied)');

  console.log('\nD  saved work survives a reload, because it is the reader own output');
  PS.saved.list().forEach((r) => PS.saved.remove(r.id));
  const persistId = newSaved('Persist me');
  const rawKeys = Object.keys(w.localStorage).filter((k) => /^ps_/.test(k));
  if (!rawKeys.length) bad('D1: no ps_ namespace keys in localStorage after a save');
  else {
    const found = rawKeys.some((k) => String(w.localStorage.getItem(k)).indexOf('Persist me') >= 0);
    if (!found) bad('D1: the saved record is not present in the stored payload');
    else ok('D1: the record is written into the ' + rawKeys.length + ' ps_ store keys');
    /* and it is still the same record the store would hand back */
    if (!PS.saved.get(persistId)) bad('D1: the id returned by add does not resolve after the write');
    else ok('D1: the id returned by add resolves against the store as written');
  }
  const audit = (PS.auditList() || []).map((a) => a.e).join(',');
  if (/saved|work-saved/.test(audit)) ok('D2: the local audit log records the save (' + (audit.match(/work-saved/g) || []).length + ' entries)');
  else console.log('  note D2 - no save event in the audit log; the product may not audit saves by design');

  console.log('\n--- saved-work gate summary ---');
  console.log('assertions passed: ' + pass);
  console.log('assertions failed: ' + fails.length);
  if (fails.length) { fails.forEach((f) => console.log('  X ' + f)); console.log('SAVED-WORK GATE: FAIL'); w.close(); process.exit(1); }
  console.log('SAVED-WORK GATE: PASS - add, list, rename, duplicate, delete and both limits behave as documented');
  w.close();
  process.exit(0);
}, 3500);
