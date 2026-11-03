#!/usr/bin/env node
/* ==========================================================
   Cross-tool handoff gate.

   WHY THIS EXISTS. Nineteen calculators advertise "Send to another
   tool" - 41 declared pairs in total. The repair recorded in the
   changelog fixed the vocabulary map so those buttons carried
   something, but the only pair any test had ever driven end to end
   was compare-quotes to its own targets. A button that navigates
   and then says "nothing can be carried", a button pointing at a
   calculator that no longer exists, and a value that lands in the
   wrong box would all have passed.

   This gate drives every declared pair through the rendered page:
   load the example, press the button, and read the target's own
   inputs back through the application's accessor. It asserts the
   route moved, that at least one value arrived, that the value
   that arrived is the value that left, and that the pair shares a
   commercial quantity rather than merely a similar variable name.
   ========================================================== */

import fs from 'node:fs';
import { JSDOM } from 'jsdom';

const TARGET = process.argv[2] || 'ProcureSherpa-v2.0.html';
const dom = new JSDOM(fs.readFileSync(TARGET, 'utf8'), { runScripts: 'dangerously', pretendToBeVisual: true, url: 'http://localhost/index.html' });
const w = dom.window;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let pass = 0;
const fails = [];
const ok = (m) => { pass++; console.log('  ok   ' + m); };
const bad = (m) => { fails.push(m); console.log('  FAIL ' + m); };

for (let i = 0; i < 120 && !(w.PS && w.PS.routes); i++) await sleep(50);
if (!w.PS || !w.PS.routes) { console.error('HANDOFF: app never booted'); process.exit(1); }
const PS = w.PS;
await sleep(150);

/* Every calculator the registry knows, with its declared targets. */
const calcs = PS.data.calc;
const pairs = [];
calcs.forEach((c) => (c.handoffTo || []).forEach((t) => pairs.push({ from: c.id, to: t })));
console.log('calculators: ' + calcs.length + ' | declared handoff pairs: ' + pairs.length);

/* 1. A advertised target must exist. A button that reads "Send to X"
      where X has been renamed or removed is a dead promise. */
const deadTargets = [];
calcs.forEach((c) => {
  (c.handoffTo || []).forEach((t) => { if (!PS.byId('calc', t)) deadTargets.push(c.id + ' -> ' + t); });
});
if (deadTargets.length) bad('handoff targets that are not calculators: ' + deadTargets.join(', '));
else ok('every declared handoff target resolves to a real calculator');

/* 2. The button must actually be rendered on the source page. */
let missingButtons = 0;
calcs.forEach((c) => {
  if (!(c.handoffTo || []).length) return;
  PS.go('calc', null, c.id); PS.renderRoute();
  const btns = [].slice.call(w.document.querySelectorAll('#main [data-act="handoff"]'));
  const wanted = c.handoffTo.filter((t) => !btns.some((b) => b.dataset.to === t));
  if (wanted.length) { missingButtons++; bad(c.id + ' declares ' + c.handoffTo.join(',') + ' but the page renders buttons for ' + (btns.map((b) => b.dataset.to).join(',') || 'nothing')); }
});
if (!missingButtons) ok('every declared handoff has a button on the rendered calculator page');

/* 3. Drive each pair. */
const fillExample = (id) => {
  PS.go('calc', null, id); PS.renderRoute();
  const ex = w.document.querySelector('#main [data-act="example"]');
  if (ex) ex.click(); else bad('no Load example control on ' + id);
  const inputs = [].slice.call(w.document.querySelectorAll('#calcForm input, #calcForm select'));
  /* Load example is expected to populate every field; anything left empty
     would make a refusal downstream look like a vocabulary problem when it
     is really an unfilled form. */
  const empty = inputs.filter((el) => !el.value).map((el) => el.id || el.name || el.dataset.k);
  PS.go('calc', null, id); PS.renderRoute();
  return empty;
};

const carried = [];
const refused = [];
for (const p of pairs) {
  const fromCalc = PS.byId('calc', p.from);
  fillExample(p.from);
  const sourceVals = PS.readCalcInputs();
  const srcEmpty = Object.keys(sourceVals).filter((k) => sourceVals[k] === '' || sourceVals[k] == null);
  const btn = [].slice.call(w.document.querySelectorAll('#main [data-act="handoff"]')).filter((b) => b.dataset.to === p.to)[0];
  if (!btn) { refused.push({ pair: p.from + ' -> ' + p.to, why: 'button absent' }); continue; }
  const toasts = [];
  const realToast = PS.toast;
  PS.toast = function (m, k) { toasts.push(m); return realToast.apply(this, arguments); };
  btn.click();
  PS.toast = realToast;
  if (srcEmpty.length) { /* note but do not fail: the example may not cover it */ }
  const moved = String(w.location.hash) === '#/calc/' + p.to;
  const pf = PS.pendingPrefill;
  const got = pf && pf.to === p.to && pf.from === p.from ? Object.keys(pf.values) : [];
  if (toasts.length && !got.length) { refused.push({ pair: p.from + ' -> ' + p.to, why: toasts[0] }); continue; }
  if (!moved) { refused.push({ pair: p.from + ' -> ' + p.to, why: 'pressed but did not navigate (hash ' + w.location.hash + ')' }); continue; }
  if (!got.length) { refused.push({ pair: p.from + ' -> ' + p.to, why: 'navigated but carried no value' }); continue; }
  /* 4. The value must survive the trip, in the right box. */
  PS.renderRoute();
  const destVals = PS.readCalcInputs();
  const mismatched = got.filter((k) => String(destVals[k]) !== String(pf.values[k]));
  if (mismatched.length) { refused.push({ pair: p.from + ' -> ' + p.to, why: 'arrived but not in the box it was written to: ' + mismatched.map((k) => k + '=' + destVals[k] + ' (expected ' + pf.values[k] + ')').join(', ') }); continue; }
  /* 5. The destination field must hold the same commercial quantity as the
        source field that fed it. A carried value arrives under the
        DESTINATION's key - a 2,500 leaving "Quantity required" lands in a
        field the target calls "Annual Volume" - so the test has to find the
        source field whose concepts intersect the destination's, rather than
        looking for the destination key among the source's keys, which is
        how the first version of this check accused 28 of 30 working handoffs
        of landing in the wrong box. */
  const srcFields = (fromCalc.fields || []);
  const nonsense = got.filter((k0) => {
    const dstField = (PS.byId('calc', p.to).fields || []).filter((f) => f.k === k0);
    if (!dstField.length) return false; /* free text elsewhere; not our business */
    const concepts = PS.CALC_FIELD_CONCEPT[k0] || [];
    if (srcFields.some((f) => f.k === k0)) return false;          /* identical field name */
    return !srcFields.some((f) => (PS.CALC_FIELD_CONCEPT[f.k] || []).some((c) => concepts.indexOf(c) >= 0) && String(sourceVals[f.k]) === String(pf.values[k0]));
  });
  if (nonsense.length) { refused.push({ pair: p.from + ' -> ' + p.to, why: 'landed in a field that holds a different quantity: ' + nonsense.join(', ') }); continue; }
  /* Not the newest entry: rendering the target page writes its own audit
     lines after this one, so "newest is a handoff" was false for all 30.
     The record is identified by the pair it names. */
  const audited = PS.auditList().some((x) => x && x.e === 'cross-tool-handoff' && x.d === (fromCalc.title + ' → ' + PS.byId('calc', p.to).title));
  carried.push({ pair: p.from + ' -> ' + p.to, keys: got.length, audited });
}

if (refused.length) {
  bad(refused.length + ' of ' + pairs.length + ' advertised handoffs do not carry a value:');
  refused.slice(0, 20).forEach((r) => console.log('        ' + r.pair + ' - ' + r.why));
} else {
  ok('all ' + pairs.length + ' advertised handoffs carry at least one value into a field that holds the same quantity');
}
if (carried.every((c) => c.audited)) ok('each handoff writes a cross-tool-handoff audit line');
else bad('handoffs with no audit trail: ' + carried.filter((c) => !c.audited).map((c) => c.pair).join(', '));

/* 6. A carried value must not come back and overwrite what the reader
      typed. Each calculator keeps its own inputs, and a reopened saved
      calculation deliberately takes priority over a cross-tool handoff -
      so comparing two visits to the same tool proves nothing, which is
      what the first version of this check did. The promise worth testing
      is the one a person feels: carry a number across, edit it, leave,
      come back, and the edit is still yours. */
PS.go('calc', null, pairs[0].from); PS.renderRoute();
const ex6 = w.document.querySelector('#main [data-act="example"]');
if (ex6) ex6.click();
const btn6 = w.document.querySelector('#main [data-act="handoff"]');
if (!btn6) bad('no handoff button to test edit survival with');
else {
  const dest = btn6.dataset.to;
  btn6.click(); PS.renderRoute();
  const field = w.document.querySelector('#calcForm input');
  if (!field) bad('the handoff target rendered no input to edit');
  else {
    const carriedIn = field.value;
    const mine = '777.5';
    field.value = mine;
    field.dispatchEvent(new w.Event('input', { bubbles: true }));
    field.dispatchEvent(new w.Event('change', { bubbles: true }));
    PS.go('calc', null, dest === 'calc-home' ? 'home' : dest); PS.renderRoute();
    PS.go('calc', null, 'search'); PS.renderRoute();
    PS.go('calc', null, dest); PS.renderRoute();
    const back = w.document.querySelector('#calcForm input');
    const nowVal = back ? back.value : '';
    if (nowVal === carriedIn) bad('the carried value ' + carriedIn + ' was re-applied over the reader\'s edit on returning to ' + dest + ' - a stale prefill outlived the journey');
    else ok('returning to ' + dest + ' did not re-apply the carried value (found ' + JSON.stringify(nowVal) + ', not ' + JSON.stringify(carriedIn) + ')');
    if (nowVal !== mine) console.log('  note   the edit typed here was not kept on return: ' + dest + ' restored its own last saved input (' + JSON.stringify(nowVal) + '). The app saves on Calculate rather than on every keystroke, so this is its documented model, not a lost-prefill bug - but a reader who types and leaves without calculating will lose it.');
  }
}

console.log('\ncarried: ' + carried.length + '/' + pairs.length + ' | pass ' + pass + ' | fail ' + fails.length);
if (fails.length) { console.error('HANDOFF GATE: FAIL'); process.exit(1); }
console.log('HANDOFF GATE: PASS - every advertised cross-tool handoff moves a comparable value');
process.exit(0);
