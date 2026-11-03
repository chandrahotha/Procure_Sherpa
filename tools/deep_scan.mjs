#!/usr/bin/env node
/* ==========================================================
   Deep scan.

   The suites already prove the data agrees with itself. This one
   attacks the parts no suite covers:

   1. RUNTIME ERRORS - does any route throw, or log at error level,
      when it renders? jsdom suites catch parse problems, not
      browser-side failures.
   2. CONTROL FUZZ - every button and every [data-act] control on
      every route is actually clicked. G4 proves a handler EXISTS;
      nothing proved it runs without throwing, or that the page is
      still a page afterwards.
   3. TEXT LEAKS - rendered text scanned for NaN, undefined,
      [object Object], Invalid Date and lone null, which is how a
      broken template usually reaches a user.
   4. DUPLICATE IDS - two elements with one id means one of them is
      silently unreachable to script and to assistive tech.

   Drives the machine's own Chrome over CDP. No new dependency.
   ========================================================== */

import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { tmpdir } from 'node:os';

const TARGET = process.argv[2] || 'dist/index.html';
const WIDTH = Number(process.argv[3] || 1440);
/* The locale axis matters because every other check has only ever run in
   English: a translation that returns a missing key, or a Spanish label
   long enough to break a chip row, is invisible to an English-only scan.
   The i18n audit proves the catalog is WIRED; this proves the app still
   renders with it switched on. */
const LOCALE = process.argv[4] || '';
const file = resolve(TARGET);
if (!existsSync(file)) { console.error('DEEP SCAN: target missing - ' + TARGET); process.exit(1); }
const chrome = [process.env.CHROME_BIN, '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find((p) => p && existsSync(p));
if (!chrome) { console.log('DEEP SCAN: SKIPPED - no Chrome/Chromium found (set CHROME_BIN). Not covered on this machine.'); process.exit(0); }

const proc = spawn(chrome, ['--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
  '--user-data-dir=' + resolve(tmpdir(), 'ps-deep-' + process.pid), '--remote-debugging-port=9555', '--window-size=' + WIDTH + ',900', 'about:blank'],
  { stdio: ['ignore', 'ignore', 'pipe'] });
let stderr = '';
proc.stderr.on('data', (d) => { stderr += d.toString(); });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function target() {
  for (let i = 0; i < 80; i++) {
    try {
      const l = await (await fetch('http://127.0.0.1:9555/json/list')).json();
      const t = l.find((x) => x.type === 'page' && x.webSocketDebuggerUrl);
      if (t) return t.webSocketDebuggerUrl;
    } catch (e) { /* not up yet */ }
    await sleep(250);
  }
  throw new Error('no CDP target: ' + stderr.slice(-200));
}
function connect(url) {
  const ws = new WebSocket(url); let id = 0; const w = new Map();
  const events = [];
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

/* Phase 1: render every route and watch for errors and leaks. */
const RENDER = `(() => {
  const PS = window.PS;
  if (!PS || !PS.routes) return JSON.stringify({ error: 'app did not boot' });
  const routes = Object.keys(PS.routes).filter(function (r) { return r !== 'notfound'; });
  const argFor = { k: [PS.data.kb[0].id], sop: [PS.data.sop[0].id], cl: [PS.data.cl[0].id], tpl: [PS.data.tpl[0].id],
    dec: [PS.data.dec[0].id], kpi: [PS.data.kpi[0].id], scen: [PS.data.scen[0].id], calc: [PS.data.calc[0].id],
    academy: [PS.ACADEMY_FUNCTIONS[0].id], help: [PS.HELP[0].id], list: ['kb'] };
  const bad = [];
  const LEAK = /NaN|undefined|\\[object Object\\]|Invalid Date/;
  for (const r of routes) {
    const args = argFor[r] || [];
    for (const x of (args.length ? args : [''])) {
      const hash = '#/' + r + (x ? '/' + x : '');
      location.hash = hash;
      try { PS.renderRoute(); } catch (e) { bad.push({ hash, kind: 'render threw', detail: String(e && e.message).slice(0, 120) }); continue; }
      const m = document.getElementById('main');
      const txt = m.textContent || '';
      const leak = txt.match(LEAK);
      if (leak) bad.push({ hash, kind: 'text leak', detail: leak[0] + ' near: ' + txt.slice(Math.max(0, txt.indexOf(leak[0]) - 60), txt.indexOf(leak[0]) + 40).replace(/\\s+/g, ' ') });
      const seen = {}, dup = [];
      [].slice.call(document.querySelectorAll('[id]')).forEach(function (e) { if (seen[e.id]) dup.push(e.id); seen[e.id] = 1; });
      if (dup.length) bad.push({ hash, kind: 'duplicate id', detail: dup.slice(0, 4).join(', ') });
      if (txt.trim().length < 120) bad.push({ hash, kind: 'near-empty render', detail: txt.trim().length + ' chars' });
      /* Page-level responsiveness, which is a different failure from a
         clipped control: if the document itself is wider than the window,
         the whole page scrolls sideways on a phone. */
      const de = document.documentElement;
      if (de.scrollWidth > de.clientWidth + 2) bad.push({ hash, kind: 'page overflows the viewport horizontally', detail: de.scrollWidth + ' vs ' + de.clientWidth + 'px' });
    }
  }
  return JSON.stringify({ routes: routes.length, bad: bad });
})()`;

/* Phase 2: click every control on every route, in a sandbox that cannot
   leave this page or destroy the profile: print, dialogs, popups and
   navigation are stubbed and the original handlers still run. */
const FUZZ = `(async () => {
  const PS = window.PS;
  const routes = Object.keys(PS.routes).filter(function (r) { return r !== 'notfound'; });
  const argFor = { k: [PS.data.kb[0].id], sop: [PS.data.sop[0].id], cl: [PS.data.cl[0].id], tpl: [PS.data.tpl[0].id],
    dec: [PS.data.dec[0].id], kpi: [PS.data.kpi[0].id], scen: [PS.data.scen[0].id], calc: [PS.data.calc[0].id],
    academy: [PS.ACADEMY_FUNCTIONS[0].id], help: [PS.HELP[0].id], list: ['kb'] };
  const errs = [];
  let clicked = 0;
  window.print = function () {};
  window.confirm = function () { return false; };
  window.alert = function () {};
  window.open = function () { return null; };
  const realAssign = location.assign ? location.assign.bind(location) : null;
  try { location.assign = function () {}; } catch (e) {}
  const sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  for (const r of routes) {
    const args = argFor[r] || [];
    for (const x of (args.length ? args : [''])) {
      const hash = '#/' + r + (x ? '/' + x : '');
      location.hash = hash;
      PS.renderRoute();
      await sleep(5);
      const m = document.getElementById('main');
      const ctl = [].slice.call(m.querySelectorAll('button, [data-act], a[data-act]'));
      for (let i = 0; i < ctl.length; i++) {
        const el = ctl[i];
        const label = (el.getAttribute('data-act') || el.textContent || el.tagName).trim().slice(0, 34);
        const before = (document.getElementById('main').textContent || '').length;
        try { el.click(); clicked++; } catch (e) { errs.push({ route: hash, control: label, kind: 'threw', detail: String(e && e.message).slice(0, 110) }); continue; }
        await sleep(8);
        const after = (document.getElementById('main').textContent || '').length;
        if (before > 400 && after < 120) errs.push({ route: hash, control: label, kind: 'emptied the page', detail: before + ' -> ' + after + ' chars' });
        /* restore the page so the next control is clicked on a rendered route */
        location.hash = hash; PS.renderRoute();
        await sleep(4);
      }
    }
  }
  return JSON.stringify({ clicked: clicked, errs: errs });
})()`;

/* Phase 3: type into every field on every route. Clicking a control
   proves the handler runs; it does not prove the handler survives what a
   user can type. Each input, textarea and select is given negative, zero,
   enormous, non-numeric, whitespace, very long and markup-bearing values,
   and after each one the page is re-checked for the leaks phase already
   knows, plus one thing it cannot see: whether the typed marker came back
   as MARKUP rather than as text. The marker sets a flag if an injected
   handler runs, which is the only honest test of that. */
const INPUTS = `(async () => {
  const PS = window.PS;
  const routes = Object.keys(PS.routes).filter(function (r) { return r !== 'notfound'; });
  const argFor = { k: [PS.data.kb[0].id], sop: [PS.data.sop[0].id], cl: [PS.data.cl[0].id], tpl: [PS.data.tpl[0].id],
    dec: [PS.data.dec[0].id], kpi: [PS.data.kpi[0].id], scen: [PS.data.scen[0].id], calc: [PS.data.calc[0].id],
    academy: [PS.ACADEMY_FUNCTIONS[0].id], help: [PS.HELP[0].id], list: ['kb'] };
  const MARK = 'psxss<img src=x onerror="window.__xss=1">';
  const VALUES = ['', ' ', '-1', '0', '0.0000001', '99999999999999999999', '1e309', 'abc', 'NaN', 'null',
    'undefined', 'Infinity', '<script>window.__xss=2<\\/script>', MARK, '"\\'&<>;', 'a'.repeat(4000), '3,500.50', '  12  ',
    '10%', '-0.000', '2147483648', '9007199254740993', '\\u0000', '\\u202e', 'x'.repeat(200) + ' &amp; '];
  const errs = [];
  let typed = 0;
  window.__xss = 0;
  const sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  const LEAK = /NaN|undefined|\\[object Object\\]|Invalid Date/;
  for (const r of routes) {
    const args = argFor[r] || [];
    for (const x of (args.length ? args : [''])) {
      const hash = '#/' + r + (x ? '/' + x : '');
      location.hash = hash;
      PS.renderRoute();
      await sleep(5);
      const fields = [].slice.call(document.querySelectorAll('#main input, #main textarea, #main select'));
      for (let i = 0; i < fields.length; i++) {
        const f = fields[i];
        if (f.disabled || f.readOnly || f.type === 'hidden' || !f.offsetParent) continue;
        const name = (f.id || f.name || f.getAttribute('data-act') || f.tagName).toString().slice(0, 30);
        for (let v = 0; v < VALUES.length; v++) {
          const val = VALUES[v];
          try {
            if (f.tagName === 'SELECT') {
              const opt = [].slice.call(f.options).find(function (o) { return o.value === val; });
              f.selectedIndex = opt ? [].indexOf.call(f.options, opt) : Math.min(v, f.options.length - 1);
            } else { f.value = val; }
            f.dispatchEvent(new Event('input', { bubbles: true }));
            f.dispatchEvent(new Event('change', { bubbles: true }));
            f.dispatchEvent(new Event('blur', { bubbles: true }));
            typed++;
          } catch (e) { errs.push({ route: hash, field: name, kind: 'threw on input', detail: val.slice(0, 24) + ' - ' + String(e && e.message).slice(0, 90) }); break; }
          await sleep(3);
        }
        const txt = (document.getElementById('main').textContent || '');
        const leak = txt.match(LEAK);
        if (leak) errs.push({ route: hash, field: name, kind: 'text leak after typing', detail: leak[0] });
      }
      /* the markup check is per route, not per field, because the value
         that escapes is the one that was typed last into a visible field */
      const html = document.getElementById('main').innerHTML;
      if (html.indexOf('onerror="window') > -1 || html.toLowerCase().indexOf('<img src=x onerror') > -1) {
        errs.push({ route: hash, field: 'page', kind: 'typed markup came back as HTML', detail: 'raw marker present in innerHTML' });
      }
    }
  }
  return JSON.stringify({ typed: typed, xssFlag: window.__xss, errs: errs.slice(0, 40), errCount: errs.length });
})()`;

/* Phase 4: the two rendering modes no suite exercises. Print is the
   feature the top bar button advertises, and reduced motion is an
   accessibility promise the CSS makes; neither has ever been rendered. */
const MEDIA = `(() => {
  const PS = window.PS;
  const routes = Object.keys(PS.routes).filter(function (r) { return r !== 'notfound'; });
  const argFor = { k: [PS.data.kb[0].id], sop: [PS.data.sop[0].id], calc: [PS.data.calc[0].id], academy: [PS.ACADEMY_FUNCTIONS[0].id] };
  const bad = [];
  for (const r of routes) {
    const args = argFor[r] || [];
    for (const x of (args.length ? args : [''])) {
      const hash = '#/' + r + (x ? '/' + x : '');
      location.hash = hash;
      try { PS.renderRoute(); } catch (e) { bad.push({ hash, kind: 'render threw', detail: String(e.message).slice(0, 90) }); continue; }
      const m = document.getElementById('main');
      const visible = [].slice.call(m.querySelectorAll('h1,h2,h3,p,td,th,li,label,button,a')).filter(function (e) { return e.getBoundingClientRect().height > 0; });
      if (!visible.length) bad.push({ hash, kind: 'nothing visible in this media', detail: 'no element with height' });
      const over = [].slice.call(m.querySelectorAll('a,button')).filter(function (e) { const b = e.getBoundingClientRect(); return b.width > 0 && b.right > window.innerWidth + 1 && !e.closest('.table-wrap'); });
      if (over.length) bad.push({ hash, kind: 'control past the page edge in this media', detail: over.length + ' controls, e.g. ' + over[0].textContent.trim().slice(0, 26) });
    }
  }
  return JSON.stringify({ bad: bad });
})()`;

/* If an injected script fails to parse, the evaluation returns no value
   and the old code crashed on JSON.parse(undefined) - which reads like an
   app failure and is really a broken probe. Say which phase failed and
   show the page-side error instead. */
function valueOf(res, phase) {
  if (res && res.exceptionDetails) {
    const d = res.exceptionDetails;
    console.error('DEEP SCAN: the ' + phase + ' probe itself failed to run: ' + String(d.exception && d.exception.description || d.text).split('\n')[0]);
    proc.kill(); process.exit(1);
  }
  if (!res || !res.result || typeof res.result.value !== 'string') {
    console.error('DEEP SCAN: the ' + phase + ' probe returned no value: ' + JSON.stringify(res).slice(0, 500));
    proc.kill(); process.exit(1);
  }
  return res.result.value;
}

/* Phase 5: keyboard, with real Tab keys.

   The first version called element.focus() and compared computed styles.
   It reported 34 elements as "focusable with no visible focus change", and
   every one of them was wrong: this application styles focus with
   :focus-visible, and a programmatic focus() does NOT match
   :focus-visible, so the outline genuinely did not change - because the
   probe never produced the state a keyboard user produces. Only
   Input.dispatchKeyEvent with Tab does. The routes are limited to a
   representative set because each Tab is a round trip. */
const FOCUS_READ = `(() => {
  const el = document.activeElement;
  if (!el || el === document.body) return JSON.stringify({ tag: 'BODY' });
  const cs = getComputedStyle(el);
  const b = el.getBoundingClientRect();
  return JSON.stringify({
    tag: el.tagName, cls: String(el.className).slice(0, 30), text: (el.textContent || el.value || '').trim().slice(0, 24),
    outline: cs.outlineStyle + ' ' + cs.outlineWidth + ' ' + cs.outlineColor, shadow: cs.boxShadow.slice(0, 40),
    inView: b.width > 0 && b.height > 0 && b.top >= 0 && b.left >= 0 && b.right <= window.innerWidth + 1 && b.bottom <= window.innerHeight + 1,
    /* Shipped with a failing inView so the next occurrence explains
       itself: where the box actually is, and whether an ancestor could
       scroll it in. Without this a finding is a claim with no evidence. */
    rect: [Math.round(b.left), Math.round(b.top), Math.round(b.right), Math.round(b.bottom)],
    vp: [window.innerWidth, window.innerHeight], sy: Math.round(window.scrollY),
    revealers: (function () {
      const acc = [];
      for (let p = el.parentElement; p && p !== document.documentElement; p = p.parentElement) {
        const c = getComputedStyle(p);
        if (/auto|scroll/.test(c.overflowY) && p.scrollHeight > p.clientHeight) acc.push((p.id || p.tagName) + 'y');
        if (/auto|scroll/.test(c.overflowX) && p.scrollWidth > p.clientWidth) acc.push((p.id || p.tagName) + 'x');
      }
      return acc.join(',') || 'none';
    })(),
    href: el.getAttribute('href') || ''
  });
})()`;


/* Phase 6: persistence. The product promise is that work survives a
   reload; nothing so far reloaded the page after an interaction. A
   favorite is toggled through the UI, a profile value is typed, the
   document is reloaded, and both are read back. */
const PERSIST = `(async () => {
  const PS = window.PS;
  const notes = [];
  location.hash = '#/academy/' + PS.ACADEMY_FUNCTIONS[3].id;
  PS.renderRoute();
  await new Promise(function (r) { setTimeout(r, 20); });
  const star = document.getElementById('favBtn');
  const before = PS.fav ? PS.fav.list().length : -1;
  if (star) { star.click(); await new Promise(function (r) { setTimeout(r, 20); }); }
  const after = PS.fav ? PS.fav.list().length : -1;
  if (before >= 0 && after === before) notes.push('toggling the favorite button did not change the favorites list (' + before + ' items)');
  location.hash = '#/settings';
  PS.renderRoute();
  await new Promise(function (r) { setTimeout(r, 20); });
  /* The app persists preferences when Save is pressed, not on every
     keystroke - the first version of this probe typed and reloaded and
     reported a bug that did not exist. */
  const org = document.getElementById('setOrg');
  let saveClicked = false;
  if (org) {
    org.value = 'Deep Scan Org';
    org.dispatchEvent(new Event('input', { bubbles: true }));
    org.dispatchEvent(new Event('change', { bubbles: true }));
    const save = [].slice.call(document.querySelectorAll('#main button')).filter(function (b) { return /save/i.test(b.textContent || ''); })[0];
    if (save) { save.click(); saveClicked = true; }
  }
  return JSON.stringify({ favBefore: before, favAfter: after, orgSet: !!org, saveClicked: saveClicked, notes: notes });
})()`;

const CHECK_PERSIST = `(() => {
  const PS = window.PS;
  const out = [];
  if (PS.fav && PS.fav.list().length === 0) out.push('the favorite added before the reload is gone after it');
  const prefs = PS.prefs();
  if (prefs.orgName !== 'Deep Scan Org') out.push('the organisation name typed before the reload did not persist (read back: ' + JSON.stringify(prefs.orgName) + ')');
  location.hash = '#/settings';
  PS.renderRoute();
  const org = document.getElementById('setOrg');
  if (org && org.value !== 'Deep Scan Org') out.push('the settings field shows ' + JSON.stringify(org.value) + ' after reload instead of the stored value');
  return JSON.stringify(out);
})()`;

const url = await target();
const cdp = await connect(url);
await cdp.send('Page.enable');
await cdp.send('Runtime.enable');
await cdp.send('Log.enable');
await cdp.send('Emulation.setDeviceMetricsOverride', { width: WIDTH, height: 900, deviceScaleFactor: 1, mobile: false });
await cdp.send('Page.navigate', { url: 'file://' + file });
let booted = false;
for (let i = 0; i < 50 && !booted; i++) {
  await sleep(300);
  const r = await cdp.send('Runtime.evaluate', { expression: '!!(window.PS && window.PS.routes)', returnByValue: true });
  booted = !!(r.result && r.result.value);
}
if (!booted) { console.error('DEEP SCAN: app did not boot - ' + stderr.slice(-200)); proc.kill(); process.exit(1); }
if (LOCALE) {
  const lr = await cdp.send('Runtime.evaluate', { expression: "(function(){ try { PS.i18n.setLocale(" + JSON.stringify(LOCALE) + "); return PS.i18n.t ? PS.i18n.t('topbar.account') : ''; } catch (e) { return 'ERR ' + e.message; } })()", returnByValue: true });
  console.log('locale switched to ' + LOCALE + ' (topbar.account now reads: ' + JSON.stringify(lr.result.value) + ')');
}

const res1 = await cdp.send('Runtime.evaluate', { expression: RENDER, returnByValue: true });
const d1 = JSON.parse(valueOf(res1, 'render scan'));
if (d1.error) { console.error('DEEP SCAN: ' + d1.error); proc.kill(); process.exit(1); }

const res2 = await cdp.send('Runtime.evaluate', { expression: FUZZ, returnByValue: true, awaitPromise: true });
const d2 = JSON.parse(valueOf(res2, 'control fuzz'));

/* Phase 3 runs before the media passes, because typing is the thing most
   likely to leave the app in a state a later phase would misread. */
const res3 = await cdp.send('Runtime.evaluate', { expression: INPUTS, returnByValue: true, awaitPromise: true, timeout: 300000 });
const d3 = JSON.parse(valueOf(res3, 'input fuzz'));
console.log('values typed into fields: ' + d3.typed + ' | input failures: ' + d3.errCount + ' | injected-handler flag: ' + d3.xssFlag);
d3.errs.forEach((b) => console.log('   [input] ' + b.route + ' - ' + b.field + ' - ' + b.kind + ' - ' + b.detail));
if (d3.xssFlag) console.log('   INJECTION: a handler typed into a field actually ran (flag ' + d3.xssFlag + ')');
d2.errs = d2.errs.concat(d3.errs.map((b) => ({ route: b.route, control: b.field, kind: b.kind, detail: b.detail })));
if (d3.xssFlag) d2.errs.push({ route: 'app-wide', control: 'injection', kind: 'typed markup executed', detail: 'window.__xss=' + d3.xssFlag });

/* Phase 4: print, then reduced motion. Emulated media is reset after each
   pass so one mode's findings cannot leak into the next. */
for (const media of ['print', 'reduce']) {
  await cdp.send('Emulation.setEmulatedMedia', media === 'print'
    ? { media: 'print' }
    : { media: '', features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await cdp.send('Runtime.evaluate', { expression: 'PS.renderRoute()', returnByValue: true });
  const rm = await cdp.send('Runtime.evaluate', { expression: MEDIA, returnByValue: true, awaitPromise: false });
  const dm = JSON.parse(valueOf(rm, 'media ' + media));
  console.log('media ' + media + ': ' + dm.bad.length + ' problem(s)');
  dm.bad.slice(0, 12).forEach((b) => console.log('   [' + media + '] ' + b.hash + ' - ' + b.kind + ' - ' + b.detail));
  d2.errs = d2.errs.concat(dm.bad.map((b) => ({ route: b.hash, control: 'media:' + media, kind: b.kind, detail: b.detail })));
}
await cdp.send('Emulation.setEmulatedMedia', { media: '' });

const KEY_ROUTES = ['home', 'dash', 'search', 'calc', 'academy', 'sop', 'cl', 'settings', 'exams', 'revise', 'list', 'saved', 'kpi', 'dec'];
const focusFindings = [];
let tabStops = 0;
for (const r of KEY_ROUTES) {
  const argFor = { calc: 'calc-compare-quotes', academy: (await cdp.send('Runtime.evaluate', { expression: 'PS.ACADEMY_FUNCTIONS[0].id', returnByValue: true })).result.value, sop: 'sop-procurement-lifecycle', cl: 'cl-requirement-definition', list: 'kb' };
  const a = argFor[r] ? '/' + argFor[r] : '';
  /* Navigate, let the queued hashchange land, then start from a known
     scroll position. Each route used to inherit the scroll left behind by
     the previous route's traversal, which is how a stop that is perfectly
     reachable came to be measured against the wrong viewport. */
  await cdp.send('Runtime.evaluate', { expression: 'location.hash=' + JSON.stringify('#/' + r + a), returnByValue: true });
  await sleep(250);
  await cdp.send('Runtime.evaluate', { expression: "window.scrollTo(0, 0); var nr = document.getElementById('navRoot'); if (nr) nr.scrollTop = 0; var sb = document.querySelector('.sidebar'); if (sb) sb.scrollTop = 0; document.activeElement && document.activeElement.blur && document.activeElement.blur();", returnByValue: true });
  await sleep(80);
  /* the unfocused outline of each element is captured once, so a style
     that is simply always-on is not mistaken for a focus ring */
  const prev = new Set();
  for (let i = 0; i < 18; i++) {
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9 });
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9 });
    const rr = await cdp.send('Runtime.evaluate', { expression: FOCUS_READ, returnByValue: true });
    const f = JSON.parse(rr.result.value);
    if (f.tag === 'BODY') break;
    const key = r + '|' + f.tag + '|' + f.cls + '|' + f.text;
    tabStops++;
    if (prev.has(key)) break;
    prev.add(key);
    const hasRing = (f.outline && !/none 0px/.test(f.outline)) || (f.shadow && f.shadow !== 'none');
    if (!hasRing) focusFindings.push({ route: '#/' + r + a, kind: 'keyboard focus with no visible ring', detail: f.tag + '.' + f.cls + ' "' + f.text + '" outline=' + f.outline });
    if (f.inView === false) focusFindings.push({ route: '#/' + r + a, kind: 'focused off-screen', detail: f.tag + '.' + f.cls + ' "' + f.text + '" rect=' + String(f.rect) + ' viewport=' + String(f.vp) + ' scrollY=' + f.sy + ' scrollable ancestors=' + f.revealers });
  }
}
console.log('tab stops traversed: ' + tabStops + ' | focus problems: ' + focusFindings.length);
focusFindings.slice(0, 12).forEach((b) => console.log('   [keyboard] ' + b.route + ' - ' + b.kind + ' - ' + b.detail));


/* Phase 5b: dialogs. The modal code has a role, an aria-modal, a focus
   trap, an Escape handler and a focus restore - all of which are invisible
   to jsdom, because the trap filters on rendered size. This drives real
   Tab and Escape keys in a real browser and checks the four promises a
   keyboard user depends on: focus goes into the dialog, it stays there,
   Escape gets out, and it comes back to where it was. */
const DIALOG_FIND = `(() => {
  const PS = window.PS;
  /* Stub the side effects before clicking anything. An export control
     starts a download and a print control calls window.print, either of
     which can destroy the execution context mid-sweep and make the probe
     look like the application failed. */
  window.print = function () {};
  try { window.URL.createObjectURL = function () { return 'blob:stub'; }; } catch (e) {}
  try { window.HTMLAnchorElement.prototype.click = function () {}; } catch (e) {}
  /* Dialogs that open from content the reader can always reach on a
     fresh profile. saved-delete and wb-delete need a record to exist,
     and exam-exit needs a running attempt, so they are not reliable
     discovery targets here - the point is to test the dialog machinery,
     not to seed data first. */
  const acts = ['storage-info', 'settings-reset', 'recent-clear', 'docpack-open', 'copilot-clear', 'calc-share', 'whatif-open'];
  const routes = Object.keys(PS.routes).filter(function (r) { return r !== 'notfound'; });
  const argFor = { k: [PS.data.kb[0].id], sop: [PS.data.sop[0].id], calc: [PS.data.calc[0].id], academy: [PS.ACADEMY_FUNCTIONS[0].id], list: ['kb'] };
  const opened = [];
  for (const r of routes) {
    const args = argFor[r] || [];
    for (const x of (args.length ? args : [''])) {
      const hash = '#/' + r + (x ? '/' + x : '');
      location.hash = hash; PS.renderRoute();
      const hits = [].slice.call(document.querySelectorAll('#main [data-act], .topbar [data-act]')).filter(function (e) {
        return acts.indexOf(e.getAttribute('data-act')) >= 0 && e.offsetParent;
      });
      for (let i = 0; i < hits.length; i++) {
        hits[i].click();
        const bd = document.querySelector('.modal-backdrop');
        if (!bd) continue;
        opened.push({ route: hash, act: hits[i].getAttribute('data-act') });
        /* Close it and keep looking. This used to say "return here" to
           stop after the first dialog, which returned undefined from the
           whole probe - the tool then reported that the application had
           produced no value, when the value missing was the probe's own.
           (No backticks in this comment: the probe is a template literal
           and a backtick inside it ends the string, wherever it sits.) */
        bd.remove();
      }
    }
    if (opened.length >= 4) break;
  }
  return JSON.stringify(opened);
})()`;

const DIALOG_STATE = `(() => {
  const bd = document.querySelector('.modal-backdrop');
  if (!bd) return JSON.stringify({ open: false });
  const ae = document.activeElement;
  const inside = !!(ae && bd.contains(ae));
  const cs = getComputedStyle(bd);
  return JSON.stringify({
    open: true,
    role: bd.getAttribute('role'),
    modal: bd.getAttribute('aria-modal'),
    labelledBy: !!bd.getAttribute('aria-labelledby'),
    activeTag: ae ? ae.tagName : null,
    activeText: ae ? (ae.textContent || ae.value || '').trim().slice(0, 26) : null,
    inside: inside,
    visible: cs.display !== 'none' && bd.getBoundingClientRect().height > 0
  });
})()`;

const DIALOG_CLOSE_STATE = `(() => {
  const bd = document.querySelector('.modal-backdrop');
  const ae = document.activeElement;
  return JSON.stringify({
    stillOpen: !!bd,
    activeTag: ae ? ae.tagName : null,
    activeId: ae ? (ae.id || ae.getAttribute('data-act') || '') : '',
    inMain: !!(ae && document.getElementById('main') && document.getElementById('main').contains(ae)),
    inTopbar: !!(ae && document.querySelector('.topbar') && document.querySelector('.topbar').contains(ae)),
    onTrigger: !!(window.__psTrigger && ae === window.__psTrigger)
  });
})()`;

const dialogFindings = [];
const openedDialogs = JSON.parse(valueOf(await cdp.send('Runtime.evaluate', { expression: DIALOG_FIND, returnByValue: true }), 'dialog discovery'));
let dialogsTested = 0;
for (const d of openedDialogs) {
  /* Re-open the way a reader does it: navigate, let the queued hashchange
     land, bring the control into view, then press it with a real mouse
     event. Navigating and clicking in the same turn used to report that
     Escape left focus nowhere - the pending hashchange had re-rendered the
     page and replaced the button, so the dialog had stored a detached node
     as its "previous focus". That measured the probe, not the product. */
  await cdp.send('Runtime.evaluate', { expression: 'location.hash = ' + JSON.stringify(d.route), returnByValue: true });
  await sleep(250);
  const box = JSON.parse(valueOf(await cdp.send('Runtime.evaluate', {
    expression: "(function () { var b = [].slice.call(document.querySelectorAll('#main [data-act], .topbar [data-act]')).filter(function (e) { return e.getAttribute('data-act') === " + JSON.stringify(d.act) + " && e.offsetParent; })[0]; if (!b) return 'null'; window.__psTrigger = b; b.scrollIntoView({ block: 'center' }); var r = b.getBoundingClientRect(); return JSON.stringify({ x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) }); })()",
    returnByValue: true
  }), 'dialog trigger box'));
  if (!box) { dialogFindings.push({ where: d.route + ' ' + d.act, kind: 'skipped - the control is not on the page until there is something to act on' }); continue; }
  await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: box.x, y: box.y, button: 'left', clickCount: 1, buttons: 1 });
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: box.x, y: box.y, button: 'left', clickCount: 1, buttons: 0 });
  await sleep(120);
  const st = JSON.parse(valueOf(await cdp.send('Runtime.evaluate', { expression: DIALOG_STATE, returnByValue: true }), 'dialog state'));
  if (!st.open) continue;
  dialogsTested++;
  const label = d.route + ' ' + d.act;
  if (!st.visible) dialogFindings.push({ where: label, kind: 'dialog is not visible' });
  if (st.role !== 'dialog') dialogFindings.push({ where: label, kind: 'dialog has no role', detail: String(st.role) });
  if (st.modal !== 'true') dialogFindings.push({ where: label, kind: 'dialog has no aria-modal', detail: String(st.modal) });
  if (!st.labelledBy) dialogFindings.push({ where: label, kind: 'dialog has no accessible name' });
  if (!st.inside) dialogFindings.push({ where: label, kind: 'focus did not move into the dialog', detail: 'active=' + st.activeTag + ' ' + st.activeText });
  /* Tab around: the trap must keep focus inside */
  let escaped = null;
  for (let k = 0; k < 12; k++) {
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9 });
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9 });
    const s2 = JSON.parse(valueOf(await cdp.send('Runtime.evaluate', { expression: DIALOG_STATE, returnByValue: true }), 'dialog state after tab'));
    if (!s2.open) { escaped = 'dialog closed while tabbing'; break; }
    if (!s2.inside) { escaped = 'focus left the dialog on Tab (no trap): landed on ' + s2.activeTag + ' ' + s2.activeText; break; }
  }
  if (escaped) dialogFindings.push({ where: label, kind: 'keyboard focus', detail: escaped });
  /* Escape must close it and put focus back */
  await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27, nativeVirtualKeyCode: 27 });
  await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27, nativeVirtualKeyCode: 27 });
  await sleep(60);
  const closed = JSON.parse(valueOf(await cdp.send('Runtime.evaluate', { expression: DIALOG_CLOSE_STATE, returnByValue: true }), 'dialog closed state'));
  if (closed.stillOpen) dialogFindings.push({ where: label, kind: 'Escape did not close the dialog' });
  else if (!closed.onTrigger) dialogFindings.push({ where: label, kind: 'Escape did not give focus back to the control that opened the dialog', detail: 'active=' + closed.activeTag + ' ' + closed.activeId + (closed.inMain || closed.inTopbar ? ' (somewhere else in the page)' : ' (not in the page at all)') });
  else dialogFindings.push({ where: label, kind: 'ok', detail: 'closed by Escape, focus back on the ' + closed.activeTag.toLowerCase() + ' that opened it' });
  /* make sure a stuck dialog cannot poison the rest of the run */
  await cdp.send('Runtime.evaluate', { expression: "var b=document.querySelector('.modal-backdrop'); if (b) { var x=b.querySelector('.modal-close,[data-act=modal-close],button'); } PS.closeModal && PS.closeModal();", returnByValue: true });
}
const dialogProblems = dialogFindings.filter((f) => f.kind !== 'ok' && f.kind.indexOf('skipped') !== 0);
console.log('dialogs driven: ' + dialogsTested + ' | dialog problems: ' + dialogProblems.length);
dialogFindings.filter((f) => f.kind === 'ok').forEach((f) => console.log('   ok   ' + f.where + ' - ' + f.detail));
dialogFindings.filter((f) => f.kind.indexOf('skipped') === 0).forEach((f) => console.log('   n/a  ' + f.where + ' - ' + f.kind));
dialogProblems.slice(0, 12).forEach((f) => console.log('   [dialog] ' + f.where + ' - ' + f.kind + (f.detail ? ' - ' + f.detail : '')));
d2.errs = d2.errs.concat(dialogProblems.map((f) => ({ route: f.where, control: 'dialog', kind: f.kind, detail: f.detail || '' })));

/* Phase 6: interact, reload, read back. The reload is a real navigation,
   so this is the only phase that proves localStorage is the app's memory
   rather than a scratch pad. */
const res6 = await cdp.send('Runtime.evaluate', { expression: PERSIST, returnByValue: true, awaitPromise: true });
const d6 = JSON.parse(valueOf(res6, 'persistence setup'));
await cdp.send('Page.navigate', { url: 'file://' + file });
let again = false;
for (let i = 0; i < 50 && !again; i++) {
  await sleep(300);
  const r = await cdp.send('Runtime.evaluate', { expression: '!!(window.PS && window.PS.routes)', returnByValue: true });
  again = !!(r.result && r.result.value);
}
const res7 = await cdp.send('Runtime.evaluate', { expression: CHECK_PERSIST, returnByValue: true });
const d7 = JSON.parse(valueOf(res7, 'persistence check'));
console.log('after reload: favorites ' + d6.favBefore + ' -> ' + d6.favAfter + ' | persistence problems: ' + d7.length);
d6.notes.forEach((n) => console.log('   [persist] ' + n));
d7.forEach((n) => console.log('   [persist] ' + n));
d2.errs = d2.errs.concat(d7.map((n) => ({ route: 'reload', control: 'persistence', kind: n, detail: '' }))).concat(d6.notes.map((n) => ({ route: 'interaction', control: 'persistence', kind: n, detail: '' })));

/* Anything the browser itself logged at error level, e.g. a failed
   resource or a CSP refusal, which the page cannot report about itself. */
const browserErrs = cdp.events.filter((e) =>
  (e.method === 'Runtime.consoleAPICalled' && (e.params.type === 'error' || e.params.type === 'warning')) ||
  e.method === 'Runtime.exceptionThrown' ||
  (e.method === 'Log.entryAdded' && e.params.entry.level === 'error')
).map((e) => {
  if (e.method === 'Runtime.exceptionThrown') { const d = e.params.exceptionDetails; return 'exception: ' + String(d.exception && d.exception.description || d.text).slice(0, 140); }
  if (e.method === 'Log.entryAdded') { const en = e.params.entry; return en.source + ': ' + String(en.text).slice(0, 140); }
  return e.params.type + ': ' + (e.params.args || []).map((a) => String(a.value !== undefined ? a.value : (a.description || a.type))).join(' ').slice(0, 140);
});

console.log('--- deep scan: ' + TARGET + ' at ' + WIDTH + ' px ---');
console.log('routes rendered checked: ' + d1.routes);
console.log('render problems: ' + d1.bad.length);
d1.bad.slice(0, 25).forEach((b) => console.log('   [' + b.kind + '] ' + b.hash + ' - ' + b.detail));
console.log('controls clicked: ' + d2.clicked + ' | control failures: ' + d2.errs.length);
d2.errs.slice(0, 25).forEach((b) => console.log('   [' + b.kind + '] ' + b.route + ' - ' + b.control + ' - ' + b.detail));
const uniqBrowser = [...new Set(browserErrs)];
console.log('browser-level errors/warnings: ' + uniqBrowser.length);
uniqBrowser.slice(0, 15).forEach((b) => console.log('   ' + b));
const total = d1.bad.length + d2.errs.length + uniqBrowser.filter((b) => b.startsWith('exception') || b.startsWith('network') || b.startsWith('js')).length;
console.log('DEEP SCAN: ' + (total ? 'FOUND ' + total + ' issue(s)' : 'CLEAN - no render errors, no control failures, no text leaks, no duplicate ids'));
cdp.close(); proc.kill();
process.exit(total ? 1 : 0);
