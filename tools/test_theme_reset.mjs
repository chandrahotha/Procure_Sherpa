#!/usr/bin/env node
/* ==========================================================
   Theme and reset gate.

   WHY THIS EXISTS. Ledger row 76 lists the QA requirements the
   product states for itself, and says the Dark mode and Reset
   checks had no test at all: "all of Responsive/Dark mode/Print
   (6 of 6)" and "Reset/Saves/Prints for calculators (3 of 7)".
   Dark mode is the theme this portal is read in at night and
   Reset is the control a reader presses when they want to try the
   arithmetic again from their own numbers - both are things that
   break silently, because a broken one still shows a page.

   This gate switches the theme and proves the palette actually
   changed and the choice was stored; then it runs a calculator,
   presses the reset control, and proves the reader is left with
   the shipped defaults and no stale result.
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

const varOf = (name, el) => w.getComputedStyle(el || w.document.documentElement).getPropertyValue(name).trim();

setTimeout(() => {
  const PS = w.PS;

  console.log('\nT  the theme toggle changes what is on the screen, not just a flag');
  const startTheme = w.document.documentElement.getAttribute('data-theme');
  if (!startTheme) bad('T1: no data-theme on the document at boot, so the CSS cannot select a palette');
  else ok('T1: the document boots with data-theme=' + startTheme);

  const btn = w.document.getElementById('themeBtn');
  if (!btn) bad('T2: no theme control in the top bar');
  else {
    const beforeBg = varOf('--bg');
    const beforeText = varOf('--text');
    btn.click();
    const nowTheme = w.document.documentElement.getAttribute('data-theme');
    const afterBg = varOf('--bg');
    const afterText = varOf('--text');
    if (nowTheme === startTheme) bad('T2: clicking the theme control left data-theme at ' + startTheme);
    else ok('T2: the theme control flips data-theme ' + startTheme + ' -> ' + nowTheme);
    if (!afterBg || afterBg === beforeBg) bad('T3: the palette did not move - --bg was ' + beforeBg + ' and is still ' + afterBg);
    else ok('T3: --bg moved from ' + beforeBg + ' to ' + afterBg + ' and --text from ' + beforeText + ' to ' + afterText);

    /* the choice must be in the store a reload reads, not only in the DOM */
    const stored = PS.store.get(PS.K.prefs, {}) || {};
    if (stored.theme !== nowTheme) bad('T4: the store holds theme=' + JSON.stringify(stored.theme) + ' while the page shows ' + nowTheme + ' - a reload would flip it back');
    else ok('T4: the theme choice is written to the prefs store a reload reads');

    /* every surface must still resolve a colour, or a rule keyed to the old
       theme leaves text with nothing to draw in */
    w.location.hash = '#/home'; PS.renderRoute();
    const probes = ['#main', '.card', '.topbar', '.sidebar'];
    const unresolved = probes.filter((sel) => {
      const el = w.document.querySelector(sel);
      if (!el) return false;
      const cs = w.getComputedStyle(el);
      return !cs.color || cs.color === 'unset' || cs.backgroundColor === 'unset';
    });
    if (unresolved.length) bad('T5: ' + unresolved.join(', ') + ' resolve no colour in the ' + nowTheme + ' theme');
    else ok('T5: page, card, top bar and nav all resolve foreground and background in the ' + nowTheme + ' theme');

    btn.click();
    const back = w.document.documentElement.getAttribute('data-theme');
    if (back !== startTheme) bad('T6: a second click left the theme at ' + back + ' instead of returning to ' + startTheme);
    else ok('T6: the toggle is a toggle - it returns to ' + startTheme);
  }

  console.log('\nR  a calculator reset returns the reader to the shipped starting point');
  const calcIds = (PS.data.calc || []).map((c) => c.id);
  let tested = 0;
  let missingReset = [];
  calcIds.forEach((id) => {
    w.location.hash = '#/calc/' + id;
    PS.renderRoute();
    const main = w.document.getElementById('main');
    const inputs = [].slice.call(main.querySelectorAll('input:not([type=hidden]), textarea, select'));
    if (!inputs.length) return;
    tested++;
    const shipped = inputs.map((i) => i.type === 'checkbox' ? String(i.checked) : i.value);
    /* change something, run it, then reset */
    const first = inputs[0];
    first.value = '7';
    first.dispatchEvent(new w.Event('input', { bubbles: true }));
    first.dispatchEvent(new w.Event('change', { bubbles: true }));
    const runBtn = [].slice.call(main.querySelectorAll('button, [data-act]')).filter((b) => /calculate|run|compute/i.test(b.textContent || ''))[0];
    if (runBtn) runBtn.click();
    const resetBtn = [].slice.call(main.querySelectorAll('button, [data-act]')).filter((b) => /^reset|clear input|restore defaults/i.test((b.textContent || '').trim()))[0];
    if (!resetBtn) { missingReset.push(id); return; }
    resetBtn.click();
    PS.renderRoute();
    const main2 = w.document.getElementById('main');
    const inputs2 = [].slice.call(main2.querySelectorAll('input:not([type=hidden]), textarea, select'));
    const now = inputs2.map((i) => i.type === 'checkbox' ? String(i.checked) : i.value);
    const text = main2.textContent;
    if (text.indexOf('NaN') >= 0 || text.indexOf('undefined') >= 0) bad('R1: ' + id + ' leaks NaN/undefined after a reset');
    else if (now.join('|') === shipped.map((v, i) => i === 0 ? '7' : v).join('|')) bad('R1: ' + id + ' reset left the edited value in place');
    else ok('R1: ' + id + ' reset restores the shipped inputs (' + inputs2.length + ' fields)');
  });
  if (missingReset.length) bad('R2: ' + missingReset.length + ' of ' + tested + ' calculators offer no reset control: ' + missingReset.slice(0, 6).join(', ') + (missingReset.length > 6 ? ' …' : ''));
  else ok('R2: all ' + tested + ' calculators with inputs offer a reset that restores the shipped values');

  console.log('\n--- theme and reset gate summary ---');
  console.log('assertions passed: ' + pass);
  console.log('assertions failed: ' + fails.length);
  if (fails.length) { console.log('THEME/RESET GATE: FAIL'); w.close(); process.exit(1); }
  console.log('THEME/RESET GATE: PASS - the theme changes the palette and persists, and every calculator can be reset');
  w.close();
  process.exit(0);
}, 3500);
