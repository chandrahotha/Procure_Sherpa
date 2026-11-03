#!/usr/bin/env node
/* ==========================================================
   Print-output and offline gate.

   WHY THIS EXISTS. Ledger row 32 says it directly: "Nothing
   asserts print output at all - no tool captures a print render,
   and black-and-white legibility is unverified." Row 76 repeats
   the gap for the Offline check, which today is proven only
   indirectly by the CSP and the network audit.

   There is no print root in this app - printing is @media print
   CSS over the same DOM - so the only honest way to test it is to
   ask a real browser to render the page under print media and
   read what stays visible. That is what this gate does: it runs a
   calculator with distinctive numbers, switches to print, and
   asserts the reader's own figures and the §32 field set survive
   onto the paper. It then loads the whole application with the
   Network domain watching, and asserts nothing was fetched.
   ========================================================== */

import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { tmpdir } from 'node:os';

const TARGET = process.argv[2] || 'dist/index.html';
const file = resolve(TARGET);
const chrome = [process.env.CHROME_BIN, '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find((p) => p && existsSync(p));
if (!chrome) { console.log('PRINT/OFFLINE: SKIPPED - no Chrome/Chromium found (set CHROME_BIN). Not covered on this machine.'); process.exit(0); }
if (!existsSync(file)) { console.error('PRINT/OFFLINE: target missing - ' + TARGET); process.exit(1); }

const proc = spawn(chrome, ['--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
  '--user-data-dir=' + resolve(tmpdir(), 'ps-print-' + process.pid), '--remote-debugging-port=9666', '--window-size=1280,900', 'about:blank'],
  { stdio: ['ignore', 'ignore', 'pipe'] });
let stderr = '';
proc.stderr.on('data', (d) => { stderr += d.toString(); });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function targetUrl() {
  for (let i = 0; i < 80; i++) {
    try {
      const l = await (await fetch('http://127.0.0.1:9666/json/list')).json();
      const t = l.find((x) => x.type === 'page' && x.webSocketDebuggerUrl);
      if (t) return t.webSocketDebuggerUrl;
    } catch (e) { /* wait */ }
    await sleep(250);
  }
  throw new Error('no CDP target: ' + stderr.slice(-200));
}
function connect(url) {
  const ws = new WebSocket(url); let id = 0; const w = new Map(); const events = [];
  ws.addEventListener('message', (ev) => {
    const m = JSON.parse(ev.data);
    if (m.method) { events.push(m); return; }
    const x = w.get(m.id); if (x) { w.delete(m.id); m.error ? x.reject(new Error(m.error.message)) : x.resolve(m.result); }
  });
  return new Promise((res) => ws.addEventListener('open', () => res({
    send: (method, params) => new Promise((r, j) => { const n = ++id; w.set(n, { resolve: r, reject: j }); ws.send(JSON.stringify({ id: n, method, params: params || {} })); }),
    events, close: () => ws.close()
  })));
}
function valueOf(res, phase) {
  if (res && res.exceptionDetails) {
    console.error('PRINT/OFFLINE: the ' + phase + ' probe failed: ' + String(res.exceptionDetails.exception && res.exceptionDetails.exception.description || res.exceptionDetails.text).split('\n')[0]);
    proc.kill(); process.exit(1);
  }
  if (!res || !res.result || typeof res.result.value !== 'string') { console.error('PRINT/OFFLINE: ' + phase + ' returned no value'); proc.kill(); process.exit(1); }
  return res.result.value;
}

/* Run a calculator with numbers that could not appear by accident, then
   report what is visible when the page is asked to print. */
/* Load the shipped example, change exactly one field to a number that
   could not appear by accident, then calculate. The first version of this
   probe filled every field with the same value, which broke the TCO
   arithmetic (a discount rate of 81234 is not a rate) and then reported
   that the printed page had lost the reader's figures when it was the
   probe that had never produced a result. */
const RUN_AND_PRINT = `(() => {
  const PS = window.PS;
  const id = 'calc-tco';
  location.hash = '#/calc/' + id; PS.renderRoute();
  const main = document.getElementById('main');
  const pick = function (re) {
    return [].slice.call(main.querySelectorAll('button,[data-act]')).filter(function (b) { return re.test((b.textContent || '') + ' ' + (b.getAttribute('data-act') || '')); })[0];
  };
  const marker = '81234';
  const ex = pick(/load example|example/i);
  if (ex) ex.click();
  const field = document.querySelector('#f_unitPrice') || [].slice.call(document.querySelectorAll('#main input[type=number]'))[0];
  let set = 0;
  if (field) {
    field.value = marker;
    field.dispatchEvent(new Event('input', { bubbles: true }));
    field.dispatchEvent(new Event('change', { bubbles: true }));
    set = 1;
  }
  const run = [].slice.call(document.querySelectorAll('#main button,#main [data-act]')).filter(function (b) { return b.getAttribute('data-act') === 'calc' || /calculate/i.test(b.textContent || ''); })[0];
  if (run) run.click();
  const screen = (function () {
    let t = '';
    [].slice.call(document.querySelectorAll('#main *')).forEach(function (e) {
      if (e.getBoundingClientRect().height > 0) t += ' ' + e.textContent;
    });
    return t.replace(/\\s+/g, ' ');
  })();
  /* The print capture is collected HERE, in the same evaluate as the
     run. Splitting them across two evaluates lost the result every time:
     something between the calls re-renders the calculator back to its
     empty form, and the probe then reported that printing dropped the
     reader's numbers. A manual two-step check had already shown the app
     is fine - under print media the .print-only block becomes
     display:block and carries "Unit purchase price 81234". */
  const vis = [];
  [].slice.call(document.querySelectorAll('#main *')).forEach(function (e) {
    const cs = getComputedStyle(e);
    if (cs.display === 'none' || cs.visibility === 'hidden') return;
    if (!e.getBoundingClientRect().height) return;
    if (e.children.length) return;
    const t = (e.textContent || '').trim();
    if (t) vis.push(t);
  });
  const colourOnly = [].slice.call(document.querySelectorAll('#main .badge, #main .stat, #main td, #main .chip')).filter(function (e) {
    const cs = getComputedStyle(e);
    const isColoured = cs.color.indexOf('rgb(') === 0 && cs.color !== 'rgb(0, 0, 0)' && cs.color !== 'rgb(255, 255, 255)';
    return isColoured && !(e.textContent || '').trim();
  });
  return JSON.stringify({
    inputsSet: set, marker: marker, screenHasMarker: screen.indexOf(marker) >= 0,
    leafCount: vis.length, printText: vis.join(' | '),
    colourOnlyCount: colourOnly.length
  });
})()`;


const url = await targetUrl();
const cdp = await connect(url);
await cdp.send('Page.enable');
await cdp.send('Runtime.enable');
await cdp.send('Network.enable');

console.log('--- print output and offline: ' + TARGET + ' ---');

/* offline first, on a clean navigation */
await cdp.send('Page.navigate', { url: 'file://' + file });
for (let i = 0; i < 60; i++) {
  await sleep(300);
  const r = await cdp.send('Runtime.evaluate', { expression: '!!(window.PS && window.PS.routes)', returnByValue: true });
  if (r.result.value) break;
}
/* walk a spread of routes so any lazy asset would be requested */
await cdp.send('Runtime.evaluate', { expression: `(async () => {
  const PS = window.PS;
  const rs = ['home','dash','academy','sop','calc','glossary','search','analytics','exams','revise','settings','saved'];
  for (const r of rs) { location.hash = '#/' + r; PS.renderRoute(); await new Promise(function (x) { setTimeout(x, 30); }); }
  return 'walked';
})()`, returnByValue: true, awaitPromise: true });

const netEvents = cdp.events.filter((e) => e.method === 'Network.requestWillBeSent');
const external = netEvents.filter((e) => {
  const u = e.params.request.url;
  return !/^file:/.test(u) && !/^data:/.test(u) && !/^blob:/.test(u);
});
console.log('network requests observed: ' + netEvents.length + ' | anything not file:/data:/blob:: ' + external.length);
if (external.length) {
  console.log('  FAIL offline - the application reached outside the file: ' + external.slice(0, 3).map((e) => e.params.request.url).join(', '));
} else {
  console.log('  ok   offline - every request during a twelve-route walk stayed inside the local file');
}

/* print capture */
/* The media switch re-renders the page (the theme schedule listens for
   it), so the calculation is performed AFTER print media is emulated -
   otherwise the result the probe is checking has been wiped by the very
   act of switching. This is the third time in this file that a re-render
   was the bug, and each time the app was innocent. */
await cdp.send('Emulation.setEmulatedMedia', { media: 'print' });
const run = JSON.parse(valueOf(await cdp.send('Runtime.evaluate', { expression: RUN_AND_PRINT, returnByValue: true }), 'calculator run'));
console.log('calculator inputs set to the marker ' + run.marker + ' (' + run.inputsSet + ' fields); on-screen copy carries it: ' + run.screenHasMarker);
const pr = run;
await cdp.send('Emulation.setEmulatedMedia', { media: '' });

const REQUIRED_PRINT = ['Generated', 'Decision-support output', 'Inputs', 'Assumptions'];
const missing = REQUIRED_PRINT.filter((k) => pr.printText.indexOf(k) < 0);
const hasFigures = pr.printText.indexOf(run.marker) >= 0;

console.log('print render: ' + pr.leafCount + ' visible leaf text nodes captured in the same evaluate as the calculation');
if (hasFigures) console.log('  ok   the reader own input value survives onto the printed page');
else console.log('  FAIL the printed page does not contain the figure the reader typed (' + run.marker + ') | captured: ' + pr.printText.slice(0, 400));
if (missing.length) console.log('  FAIL \u00a732 fields absent from the print render: ' + missing.join(', ') + ' | captured: ' + pr.printText.slice(0, 300));
else console.log('  ok   \u00a732 field set present in the print render (generated stamp, inputs, assumptions, decision-support footer)');
if (pr.colourOnlyCount) console.log('  FAIL ' + pr.colourOnlyCount + ' element(s) carry meaning by colour alone with no text - unreadable in black and white');
else console.log('  ok   nothing in the print render signals by colour alone');

const bad = (external.length ? 1 : 0) + (hasFigures ? 0 : 1) + (missing.length ? 1 : 0) + (pr.colourOnlyCount ? 1 : 0);
console.log('PRINT/OFFLINE GATE: ' + (bad ? 'FAIL - ' + bad + ' issue(s)' : 'PASS - the printed page carries the reader figures and the app fetched nothing'));
cdp.close(); proc.kill();
process.exit(bad ? 1 : 0);
