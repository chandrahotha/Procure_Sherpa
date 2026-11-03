#!/usr/bin/env node
/* ==========================================================
   Reachability gate.

   WHY THIS EXISTS. The layout audit and the accessibility
   audit both run in jsdom, and jsdom performs no layout: it can
   tell you a node exists, not whether a person can see it. That
   gap was real - at 768 px the lesson tab rail was showing three
   of five tabs, the library jump bar was showing five of twenty
   categories, and the Academy progress table was scrolling its
   Open button off the edge for all 88 rows. Every one of those
   passed every gate.

   This gate asks the question the others cannot: at four widths,
   is any control that the application renders outside the screen,
   or hidden inside a container whose scroll hides it?

   NO NEW DEPENDENCY. It drives the Chrome that is already on the
   machine over the DevTools protocol, using Node's built-in
   WebSocket and fetch. If no browser is present it says so loudly
   rather than pretending to have checked - see the SKIPPED path.
   ========================================================== */

import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { tmpdir } from 'node:os';

const TARGET = process.argv[2] || 'dist/index.html';
const WIDTHS = [1440, 1024, 768, 390];

function findChrome() {
  const c = [process.env.CHROME_BIN, '/usr/bin/google-chrome', '/usr/bin/chromium',
    '/usr/bin/chromium-browser', '/usr/bin/google-chrome-stable'];
  return c.find((p) => p && existsSync(p)) || null;
}

const chrome = findChrome();
const file = resolve(TARGET);
if (!existsSync(file)) { console.error('REACHABILITY: target missing - ' + TARGET + ' (run npm run build:min)'); process.exit(1); }

if (!chrome) {
  console.log('REACHABILITY: SKIPPED - no Chrome/Chromium binary found (set CHROME_BIN).');
  console.log('  This gate is not covered on this machine. Say so in any report that claims full UI verification.');
  process.exit(0);
}

const profile = resolve(tmpdir(), 'ps-reach-' + process.pid);
const PORT = 9333;
const proc = spawn(chrome, [
  '--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
  '--user-data-dir=' + profile, '--remote-debugging-port=' + PORT,
  '--window-size=1440,900', 'about:blank'
], { stdio: ['ignore', 'ignore', 'pipe'] });

let stderr = '';
proc.stderr.on('data', (d) => { stderr += d.toString(); });
proc.on('exit', (c) => { if (!reported) console.error('REACHABILITY: chrome exited early (' + c + ') - ' + stderr.slice(-300)); process.exit(1); });

let reported = false;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function pageTarget() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch('http://127.0.0.1:' + PORT + '/json/list');
      const list = await res.json();
      const t = list.find((x) => x.type === 'page' && x.webSocketDebuggerUrl);
      if (t) return t.webSocketDebuggerUrl;
    } catch (e) { /* not listening yet */ }
    await sleep(250);
  }
  throw new Error('no CDP page target: ' + stderr.slice(-200));
}

/* A tiny CDP client: sequential ids, one response each. */
function connect(url) {
  const ws = new WebSocket(url);
  let id = 0;
  const waiters = new Map();
  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(typeof ev.data === 'string' ? ev.data : ev.data.toString());
    const w = waiters.get(msg.id);
    if (w) { waiters.delete(msg.id); msg.error ? w.reject(new Error(msg.error.message)) : w.resolve(msg.result); }
  });
  const send = (method, params) => new Promise((res, rej) => {
    const n = ++id;
    waiters.set(n, { resolve: res, reject: rej });
    ws.send(JSON.stringify({ id: n, method, params: params || {} }));
  });
  return new Promise((res) => ws.addEventListener('open', () => res({ send, close: () => ws.close() })));
}

/* The sweep runs inside the page, because only the page knows what it
   rendered. It walks every route the router registers, with a real record
   argument where the route needs one, and reports two things: controls
   whose right edge is past the viewport, and containers that scroll away
   two or more of their own controls. */
const SWEEP = `async () => {
  const PS = window.PS;
  if (!PS || !PS.routes) return JSON.stringify({ error: 'app did not boot' });
  const routes = Object.keys(PS.routes).filter(function (r) { return r !== 'notfound'; });
  const argFor = {
    k: [PS.data.kb[0].id], sop: [PS.data.sop[0].id], cl: [PS.data.cl[0].id],
    tpl: [PS.data.tpl[0].id], dec: [PS.data.dec[0].id], kpi: [PS.data.kpi[0].id],
    scen: [PS.data.scen[0].id], calc: [PS.data.calc[0].id],
    academy: [PS.ACADEMY_FUNCTIONS[0].id], help: [PS.HELP[0].id], list: ['kb']
  };
  const sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  /* Two different failures, reported separately, because they have
     different fixes and one of them is not a failure at all.

     unreachable - the control is outside the viewport and nothing can
     bring it in: no ancestor scrolls sideways. This is the defect.

     hides - a container does scroll sideways, and it is hiding two or
     more controls behind that scroll. A wide table on a phone is allowed
     to scroll, so this is only a finding when the container has no pinned
     action column; .pin-action is the documented way of saying "the row
     may scroll, the way forward does not". Excluding it is not a
     relaxation of the first test: a pinned control is measured by the
     unreachable rule above and would still be reported if it left the
     screen. */
  const scrollable = function (el) {
    for (var p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      if (/auto|scroll/.test(getComputedStyle(p).overflowX)) return p;
    }
    return null;
  };
  const out = [];
  for (const r of routes) {
    const args = argFor[r] || [];
    for (const x of (args.length ? args : [''])) {
      const hash = '#/' + r + (x ? '/' + x : '');
      location.hash = hash;
      PS.renderRoute();
      await sleep(10);
      const m = document.getElementById('main');
      const iw = window.innerWidth;
      const stuck = function (e) {
        const s = scrollable(e);
        return !!(s && s.classList.contains('pin-action') && s.querySelectorAll('a,button').length >= 2);
      };
      const off = [].slice.call(m.querySelectorAll('a,button')).filter(function (e) {
        const b = e.getBoundingClientRect();
        if (!(e.offsetParent && b.width > 0 && b.right > iw + 1)) return false;
        return !scrollable(e);
      });
      const clips = [].slice.call(m.querySelectorAll('*')).filter(function (e) {
        const cs = getComputedStyle(e);
        if (!/hidden|auto|scroll/.test(cs.overflowX)) return false;
        if (e.scrollWidth <= e.clientWidth + 24) return false;
        if (e.classList.contains('pin-action')) return false;
        return e.querySelectorAll('a,button').length >= 2;
      }).map(function (e) {
        return String(e.className).slice(0, 34) + ' hides ' + (e.scrollWidth - e.clientWidth) + 'px of ' + e.querySelectorAll('a,button').length + ' controls';
      });
      if (off.length || clips.length) out.push({ route: hash, offscreen: off.length, sample: [].slice.call(off.slice(0, 2)).map(function (e) { return e.tagName + ':' + e.textContent.trim().slice(0, 24); }), clips: clips });
    }
  }
  return JSON.stringify({ routes: routes.length, findings: out });
}`;

/* The second criterion: is a control that is on screen actually clickable?
   Every other sweep in this repository drives controls with element.click(),
   which fires the handler no matter what is stacked on top of the element -
   so a full-viewport overlay, or a sticky bar eating the top row of a table,
   is invisible to them all. elementFromPoint is the honest question: if a
   real mouse press at that point would land somewhere else, the reader
   cannot use the control.

   The measurement has to be clip-aware, or it drowns in false positives. A
   collapsed accordion keeps real layout boxes for its children - they are
   clipped, not display:none - and a control under the sticky header is only
   covered at some scroll offsets. So the visible box of a control is its own
   rectangle intersected with the viewport and with every ancestor that
   clips, and a control is judged only where it is genuinely painted. A
   press landing on an ancestor counts as success because the application
   resolves actions with closest('[data-act]'). */
const HITTEST = `async () => {
  const PS = window.PS;
  if (!PS || !PS.routes) return JSON.stringify({ error: 'app did not boot' });
  const sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  const routes = Object.keys(PS.routes).filter(function (r) { return r !== 'notfound'; });
  const argFor = {
    k: [PS.data.kb[0].id], sop: [PS.data.sop[0].id], cl: [PS.data.cl[0].id],
    tpl: [PS.data.tpl[0].id], dec: [PS.data.dec[0].id], kpi: [PS.data.kpi[0].id],
    scen: [PS.data.scen[0].id], calc: [PS.data.calc[0].id],
    academy: [PS.ACADEMY_FUNCTIONS[0].id], help: [PS.HELP[0].id], list: ['kb']
  };
  const clip = function (a, b) {
    const l = Math.max(a.left, b.left), t = Math.max(a.top, b.top);
    const r = Math.min(a.right, b.right), bo = Math.min(a.bottom, b.bottom);
    return { left: l, top: t, right: r, bottom: bo, width: r - l, height: bo - t };
  };
  function visibleRect(e) {
    let v = e.getBoundingClientRect();
    v = { left: v.left, top: v.top, right: v.right, bottom: v.bottom, width: v.width, height: v.height };
    for (let p = e.parentElement; p; p = p.parentElement) {
      const cs = getComputedStyle(p);
      if (cs.overflowX === 'visible' && cs.overflowY === 'visible') continue;
      const r = p.getBoundingClientRect();
      const bl = parseFloat(cs.borderLeftWidth) || 0, bt = parseFloat(cs.borderTopWidth) || 0;
      const br = parseFloat(cs.borderRightWidth) || 0, bb = parseFloat(cs.borderBottomWidth) || 0;
      const box = { left: r.left + bl, top: r.top + bt, right: r.right - br, bottom: r.bottom - bb, width: 0, height: 0 };
      box.width = box.right - box.left; box.height = box.bottom - box.top;
      v = clip(v, box);
      if (v.width <= 0 || v.height <= 0) return v;
      if (p === document.body || p === document.documentElement) break;
    }
    return clip(v, { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight, width: 0, height: 0 });
  }
  function inRect(e, v) {
    /* A sticky or fixed element that is not an ancestor covers content by
       design - the library jump bar is sticky and 264 px tall at 1024 px, so
       every point of a link that has scrolled under it is covered while it is
       under it, and the link is perfectly usable the moment it is beside the
       bar. Sampling only where nothing is deliberately painted over the
       content keeps the criterion to its actual question - is this control
       reachable - instead of reporting normal sticky-header overlap. */
    const overlays = [];
    for (const o of document.querySelectorAll('.topbar, #main .list-jump, #main [class*="sticky"], #main [style*="position:sticky"]')) {
      const oc = getComputedStyle(o);
      if (oc.position !== 'sticky' && oc.position !== 'fixed') continue;
      if (o === e || o.contains(e) || e.contains(o)) continue;
      const q = o.getBoundingClientRect();
      if (q.width < 4 || q.height < 4) continue;
      overlays.push([q.left, q.top, q.right, q.bottom]);
    }
    const ix = Math.min(6, Math.max(1, Math.round(v.width / 4)));
    const iy = Math.min(6, Math.max(1, Math.round(v.height / 4)));
    const cx = v.left + v.width / 2, cy = v.top + v.height / 2;
    return [[cx, cy], [v.left + ix, v.top + iy], [v.right - ix, v.top + iy],
      [v.left + ix, v.bottom - iy], [v.right - ix, v.bottom - iy]]
      .map(function (p) { return [Math.round(p[0]), Math.round(p[1])]; })
      .filter(function (p) { return p[0] >= 0 && p[1] >= 0 && p[0] < window.innerWidth && p[1] < window.innerHeight; })
      .filter(function (p) { return !overlays.some(function (o) { return p[0] >= o[0] && p[0] <= o[2] && p[1] >= o[1] && p[1] <= o[3]; }); });
  }
  const seen = new Map();
  /* Cached because the same element is met again at every scroll offset and
     the call flushes style; uncached it turned this gate from 80 seconds
     into ten minutes. Elements are rebuilt by each renderRoute, so a WeakMap
     scoped to the sweep cannot answer for a stale node. */
  const visCache = new WeakMap();
  for (const r of routes) {
    const args = argFor[r] || [];
    for (const x of (args.length ? args : [''])) {
      const hash = '#/' + r + (x ? '/' + x : '');
      /* Settle the navigation before measuring: assigning location.hash
         queues a hashchange that renders the route a second time, and a
         rect read while that rebuild is landing belongs to a node that is
         already gone. Verified separately with real presses. */
      location.hash = hash;
      await sleep(20);
      try { PS.renderRoute(); } catch (e) { continue; }
      await sleep(30);
      const de = document.scrollingElement || document.documentElement;
      const maxTop = Math.max(0, de.scrollHeight - de.clientHeight);
      const steps = [];
      for (let y = 0; y < maxTop; y += Math.round(window.innerHeight * 0.7)) steps.push(y);
      steps.push(maxTop);
      for (const sy of steps.slice(0, 8)) {
        window.scrollTo(0, sy);
        await sleep(15);
        /* a[href], not a: an anchor with no href is not a control - it is not
           focusable and a press on it does nothing - yet category sections
           use one as their scroll target, and the sticky jump bar lies over
           part of it. Scoping the set to real controls is a correction to
           what this criterion judges, not a relaxation of it: every anchor
           that is a link, and every button and [data-act] control, is still
           hit-tested. */
        const els = [].slice.call(document.querySelectorAll('#main a[href], #main button, #main [data-act], .topbar a[href], .topbar button, .topbar [data-act]'));
        for (const e of els) {
          const own = e.getBoundingClientRect();
          if (own.width < 6 || own.height < 6) continue;
          /* A closed details element hides its content through the UA's
             shadow slot, so nothing in the parent chain reports a clip and
             the hidden links keep stale layout boxes that sit on top of the
             cards below. checkVisibility is the browser's own answer to "is
             this actually rendered"; without it, 529 of the findings on the
             Operations page were accordion content nobody can see at all.
             Older browsers without the API fall through to the geometric
             test rather than inventing findings. */
          if (!visCache.has(e)) visCache.set(e, typeof e.checkVisibility === 'function' ? e.checkVisibility({ checkVisibilityCSS: true, contentVisibilityAuto: true, opacityProperty: true, visibilityProperties: true }) : true);
          if (!visCache.get(e)) continue;
          const v = visibleRect(e);
          /* not painted here at this offset - the geometry criterion owns
             that case, this one only judges what a person can see */
          if (v.width < 8 || v.height < 8) continue;
          if (v.width * v.height < own.width * own.height * 0.4) continue;
          const sample = inRect(e, v);
          if (!sample.length) continue;
          const label = (e.textContent || e.value || '').trim().slice(0, 26);
          const key = hash + '|' + e.tagName + '|' + (e.getAttribute('data-act') || '') + '|' + (e.getAttribute('href') || '') + '|' + label;
          let hit = false;
          let blocker = '';
          for (const p of sample) {
            const top = document.elementFromPoint(p[0], p[1]);
            if (top && (top === e || e.contains(top) || top.contains(e))) { hit = true; break; }
            if (!blocker) blocker = (top ? top.tagName + (top.id ? '#' + top.id : '') + (typeof top.className === 'string' && top.className ? '.' + top.className.split(/\\s+/)[0] : ' (no class)') + ' whose box is ' + [Math.round(top.getBoundingClientRect().left), Math.round(top.getBoundingClientRect().top), Math.round(top.getBoundingClientRect().right), Math.round(top.getBoundingClientRect().bottom)].join(',') : 'nothing there') + ' at ' + p.join(',');
          }
          if (!seen.has(key)) seen.set(key, { route: hash, label: e.tagName + ' "' + label + '"', own: [Math.round(own.left), Math.round(own.top), Math.round(own.right), Math.round(own.bottom)].join(',') + ' (scroll ' + sy + ')', blockedBy: blocker || 'not yet measured', ok: false });
          if (hit) seen.get(key).ok = true;
        }
      }
      window.scrollTo(0, 0);
    }
  }
  const bad = [];
  seen.forEach(function (v) { if (!v.ok) bad.push(v); });
  return JSON.stringify({ checked: seen.size, bad: bad });
}`;

try {
  const url = await pageTarget();
  const cdp = await connect(url);
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  const results = [];
  for (const width of WIDTHS) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 500 });
    await cdp.send('Page.navigate', { url: 'file://' + file });
    let booted = false;
    for (let i = 0; i < 40 && !booted; i++) {
      await sleep(300);
      const r = await cdp.send('Runtime.evaluate', { expression: '!!(window.PS && window.PS.routes)', returnByValue: true });
      booted = !!(r.result && r.result.value);
    }
    if (!booted) { console.error('REACHABILITY: app did not boot at ' + width + 'px'); process.exit(1); }
    /* The boot overlay is a full-viewport fixed layer that fades out over
       300 ms. Hit-testing while it is still up reports every control on the
       page as blocked by an invisible layer, so wait for it to come down. */
    for (let i = 0; i < 25; i++) {
      const lr = await cdp.send('Runtime.evaluate', { expression: "(function(){ var l = document.getElementById('bootLoader'); return (!l || getComputedStyle(l).display === 'none' || getComputedStyle(l).opacity === '0' && getComputedStyle(l).pointerEvents === 'none') ? 'gone' : 'up'; })()", returnByValue: true });
      if (lr.result && lr.result.value === 'gone') break;
      await sleep(200);
    }
    const res = await cdp.send('Runtime.evaluate', { expression: '(' + SWEEP + ')()', returnByValue: true, awaitPromise: true });
    const data = JSON.parse(res.result.value);
    if (data.error) { console.error('REACHABILITY: ' + data.error); process.exit(1); }
    const res2 = await cdp.send('Runtime.evaluate', { expression: '(' + HITTEST + ')()', returnByValue: true, awaitPromise: true });
    const hits = JSON.parse(res2.result.value);
    if (hits.error) { console.error('REACHABILITY: ' + hits.error); process.exit(1); }
    results.push({ width, routes: data.routes, findings: data.findings, hitChecked: hits.checked, hitFindings: hits.bad });
  }
  reported = true;
  cdp.close();
  proc.kill();

  let bad = 0, hitBad = 0;
  for (const r of results) {
    const label = (r.findings.length ? 'UNREACHABLE' : 'clear') + ' | ' + (r.hitFindings.length ? 'UNCLICKABLE' : 'clickable');
    console.log('  ' + String(r.width).padStart(4) + ' px: ' + r.routes + ' routes - ' + label + ' (' + r.hitChecked + ' on-screen controls hit-tested)');
    for (const f of r.findings) {
      bad++;
      console.log('      ' + f.route + ' - ' + (f.offscreen ? f.offscreen + ' control(s) off the right edge ' + JSON.stringify(f.sample) : '') + (f.clips.length ? ' | ' + f.clips.join('; ') : ''));
    }
    for (const f of r.hitFindings) {
      hitBad++;
      console.log('      ' + f.route + ' - ' + f.label + ' box ' + f.own + ' is on screen but a press at ' + f.blockedBy);
    }
  }
  bad += hitBad;
  console.log('reachability findings: ' + bad + ' across ' + results.length + ' widths (' + TARGET + ')');
  if (bad) { console.error('REACHABILITY GATE: FAIL - the application renders controls a person cannot reach or cannot click'); process.exit(1); }
  console.log('REACHABILITY GATE: PASS - every rendered control is reachable and clickable at ' + WIDTHS.join('/') + ' px');
  process.exit(0);
} catch (e) {
  reported = true;
  proc.kill();
  console.error('REACHABILITY: internal error - ' + e.message);
  process.exit(1);
}
