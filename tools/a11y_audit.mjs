/* ==========================================================
   Accessibility audit (WCAG 2.1 AA subset)
   Headless DOM audit over every route for the automated,
   machine-checkable requirements:
     - document has a lang attribute
     - every form control has a programmatic label (label/aria)
     - every button / interactive element has an accessible name
     - images carry alt text (informational - app has none)
     - no duplicate id attributes
     - heading hierarchy sanity (one visible h1, and it is first)
     - links have discernible text
     - no empty buttons that are the sole trigger
     - keyboard focus has a visible indicator, in both themes
       (§47 names "keyboard navigation" and "visible focus states";
       WCAG 2.1 SC 2.4.7)

   Coverage: every route the application registers, plus one real id per
   content kind. This tool used to sweep a hand-written list of 38 of the
   52 registered routes, so the 14 pages it did not name could break and
   nothing would notice - and because findings were de-duplicated by
   message, one systemic violation printed as a single line and a reader
   could not tell whether it hit one route or every route. Both are fixed:
   the route list is derived from the shipped registry, every occurrence is
   counted, and the per-route table is printed.

   Focus/contrast: contrast is still manual (no computed-colour check
   here), but focus is no longer delegated to a manual pass that never
   happened. The focus rules are asserted from the shipped CSS below.
   ========================================================== */
import path from 'node:path';
import { JSDOM, VirtualConsole } from 'jsdom';
import { DETAIL_KIND } from './page_contract.mjs';

const HTML = path.resolve(process.argv[2] || 'ProcureSherpa-v2.0.html');
const vc = new VirtualConsole();
vc.on('jsdomError', () => {});
vc.on('error', () => {});

const dom = await JSDOM.fromFile(HTML, {
  runScripts: 'dangerously',
  resources: 'usable',
  pretendToBeVisual: true,
  virtualConsole: vc,
  beforeParse(window) {
    window.matchMedia = window.matchMedia || (() => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} }));
    window.scrollTo = () => {};
    window.HTMLElement.prototype.scrollIntoView = function () {};
    if (!window.print) window.print = () => {};
  }
});
await new Promise((r) => setTimeout(r, 1200));
const { window } = dom;
const d = window.document;
const PS = window.PS;

/* Every registered route, then one detail page per content kind so the
   templates a page is built from are audited and not only the index. The
   ids come out of the shipped registry, which is why the fixture list
   cannot go stale the way a hand-written one did. */
const ROUTES = Object.keys(PS.routes).map((r) => '#/' + r);
for (const [prefix, type] of Object.entries(DETAIL_KIND)) {
  const first = (PS.data[type] || [])[0];
  if (first) ROUTES.push('#/' + prefix + '/' + first.id);
}
ROUTES.push('#/list/kb/Fundamentals', '#/what?q=supplier%20price%20increase', '#/search?q=contract', '#/academy/func-mission-value?tab=practice');

/* Findings are grouped by message so one systemic problem does not print
   38 times, but the grouping no longer hides anything: every occurrence is
   counted, the routes that carry it are named, and a per-route table is
   printed at the end. */
let occurrences = 0;
const seen = new Map();
const order = [];
const perRoute = new Map();
function report(route, type, detail) {
  occurrences++;
  perRoute.set(route, (perRoute.get(route) || 0) + 1);
  const key = type + '|' + detail;
  if (seen.has(key)) { seen.get(key).routes.push(route); return; }
  seen.set(key, { type, detail, routes: [route] });
  order.push(key);
}

/* Only elements the assistive technology can actually reach count. The
   print-only report header (.report-head) is display:none on screen, so
   its <h1> is not a second heading for a screen reader - counting it
   would fail almost every route for a problem that does not exist. */
function visible(win, el) {
  for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
    const st = win.getComputedStyle(n);
    if (st.display === 'none' || st.visibility === 'hidden') return false;
  }
  return true;
}

for (const hash of ROUTES) {
  /* Measured from an empty profile so every route is audited in the same
     state, the same reason tools/smoke.mjs does it. */
  try { window.localStorage.clear(); } catch (e) { /* opaque origin, app falls back to its memory store */ }
  window.location.hash = hash;
  await new Promise((r) => setTimeout(r, 100));
  const doc = window.document;

  /* lang attribute present */
  if (!doc.documentElement.getAttribute('lang')) report(hash, 'lang', 'missing lang attribute');

  /* duplicate ids */
  const ids = {};
  doc.querySelectorAll('[id]').forEach((el) => {
    const id = el.id;
    if (ids[id]) { if (ids[id] === 1) report(hash, 'dup-id', 'duplicate id "' + id + '"'); ids[id] = 2; }
    else ids[id] = 1;
  });

  /* form controls need labels */
  doc.querySelectorAll('input, select, textarea').forEach((el) => {
    const type = (el.getAttribute('type') || 'text').toLowerCase();
    if (type === 'hidden') return;
    const id = el.id;
    const labelled = (id && doc.querySelector('label[for="' + id.replace(/"/g, '\\"') + '"]'))
      || el.closest('label')
      || el.getAttribute('aria-label')
      || el.getAttribute('aria-labelledby')
      || el.getAttribute('title');
    if (!labelled) report(hash, 'label', 'unlabelled control <' + el.tagName.toLowerCase() + '> id="' + id + '"');
  });

  /* buttons need accessible names */
  doc.querySelectorAll('button').forEach((el) => {
    const name = (el.textContent || '').trim() || el.getAttribute('aria-label') || el.getAttribute('title');
    if (!name) report(hash, 'button', 'button with no accessible name');
    if (name && name.length === 1 && /[\u2190\u2192\u00d7\u2713\u2605\u2606]/.test(name) && !el.getAttribute('aria-label') && !el.getAttribute('title')) {
      report(hash, 'button', 'icon-only button "' + name + '" lacks aria-label/title');
    }
  });

  /* images need alt */
  doc.querySelectorAll('img').forEach((el) => {
    if (el.hasAttribute('alt') === false) report(hash, 'img', 'img missing alt');
  });

  /* heading hierarchy: an h1 must exist, be the first heading, and be
     the only one. */
  const h1s = [...doc.querySelectorAll('h1')].filter((el) => visible(window, el));
  const headings = [...doc.querySelectorAll('h1, h2, h3')].filter((el) => visible(window, el));
  const firstHeading = headings[0];
  if (!h1s.length) report(hash, 'heading', 'route renders no visible h1');
  else if (h1s.length > 1) report(hash, 'heading', h1s.length + ' visible h1 elements on one route, expected exactly 1');
  if (firstHeading && firstHeading.tagName !== 'H1') report(hash, 'heading', 'page starts with ' + firstHeading.tagName + ', expected h1');

  /* links need discernible text */
  doc.querySelectorAll('a').forEach((el) => {
    const text = (el.textContent || '').trim();
    if (!text && !el.getAttribute('aria-label') && !el.getAttribute('title')) report(hash, 'link', 'link with no text (href=' + (el.getAttribute('href') || '').slice(0, 40) + ')');
  });
}

/* ---------- the shipped CSS has to promise a visible focus indicator ----------
   §47 names keyboard navigation and visible focus states, and WCAG 2.1
   SC 2.4.7 is a level-A requirement: keyboard focus must be visibly
   indicated. src/base/01b_reset.css used to carry `a:focus-visible
   {outline:none}`, which removed the browser indicator from every link on
   the site - the one element type with no border of its own to fall back
   on. The audit therefore has to assert the opposite of what it used to
   tolerate: a focus rule that clears the outline without replacing it is a
   finding, and there must be an anchor-visible focus rule whose colour
   comes from a token both themes define. */
const cssText = [...d.querySelectorAll('style')].map((s) => s.textContent || '').join('\n');
const rules = [];
for (const m of cssText.matchAll(/([^{}@]+)\{([^{}]*)\}/g)) {
  rules.push({ sel: m[1].trim(), body: m[2] });
}
const isFocusSel = (sel) => /:focus(-visible)?\b/.test(sel);
const removesOutline = (body) => /outline:\s*(none|0)\b/i.test(body);
const declaresVisibleOutline = (body) => /outline:\s*(\d|var\(--focus-outline\))/i.test(body) && !/outline:\s*(none|0)\b/i.test(body);

if (!cssText.trim()) {
  report('css', 'focus', 'no stylesheet found in the artifact, so no focus indicator can be verified');
} else {
  const stripped = rules.filter((r) => isFocusSel(r.sel) && removesOutline(r.body) && !/box-shadow/.test(r.body));
  const shadowOnly = rules.filter((r) => isFocusSel(r.sel) && removesOutline(r.body) && /box-shadow/.test(r.body));
  stripped.forEach((r) => report('css', 'focus', 'focus rule removes the outline and declares no replacement: ' + r.sel.slice(0, 80)));
  /* A shadow is not enough on its own: forced-colors mode (Windows high
     contrast) drops box-shadow, and the ring was the only thing left once
     `outline:none` was written. Anchor rules specifically must keep an
     outline. */
  shadowOnly.filter((r) => /(^|[\s,>(])a(:|[\s,{])|a:focus|a\[|\.nav-list a|\.tile|res-title/.test(r.sel))
    .forEach((r) => report('css', 'focus', 'shadow-only focus indicator on a link rule (invisible in forced-colours mode): ' + r.sel.slice(0, 80)));
  const anchorFocus = rules.filter((r) => /(^|[\s,>])a:focus(-visible)?\b/.test(r.sel) || (r.sel === ':focus-visible' || r.sel === ':focus'));
  if (!anchorFocus.some((r) => declaresVisibleOutline(r.body))) {
    report('css', 'focus', 'no focus rule gives links a visible outline (WCAG 2.1 SC 2.4.7, master §47)');
  } else {
    /* the colour must follow the theme, and the tokens are how that is
       expressed here */
    const usesVar = /outline:\s*var\(--focus-outline\)/.test(anchorFocus.map((r) => r.body).join(';'));
    const rootBlock = /:root\s*\{([^{}]*)\}/.exec(cssText);
    const darkBlock = /\[data-theme="dark"\][^{]*\{([^{}]*)\}/.exec(cssText);
    const inBoth = (name) => !!(rootBlock && darkBlock && rootBlock[1].includes(name) && darkBlock[1].includes(name));
    if (!usesVar) report('css', 'focus', 'the link focus outline does not use the --focus-outline token, so it cannot follow the theme');
    else if (!inBoth('--focus-outline')) report('css', 'focus', '--focus-outline is not declared in both the :root and the [data-theme="dark"] blocks');
    else if (!inBoth('--accent')) report('css', 'focus', '--accent, which the focus outline resolves through, is not declared in both themes');
  }
}

const lang = d.documentElement.getAttribute('lang');
console.log('--- accessibility audit: ' + HTML + ' ---');
console.log('document lang: ' + (lang || 'MISSING'));
console.log('routes scanned: ' + ROUTES.length + ' (registered routes: ' + Object.keys(PS.routes).length + ')');
const missed = Object.keys(PS.routes).filter((r) => !ROUTES.some((h) => h === '#/' + r));
console.log('distinct messages: ' + order.length + ' | total occurrences: ' + occurrences + ' | routes with a finding: ' + perRoute.size);

if (occurrences) {
  console.log('');
  for (const key of order) {
    const f = seen.get(key);
    const n = f.routes.length;
    const where = n === 1 ? f.routes[0] : n + ' routes: ' + f.routes.slice(0, 6).join(', ') + (n > 6 ? ' (+' + (n - 6) + ' more)' : '');
    console.log('  [' + f.type + '] ' + f.detail + '   (' + n + ' occurrence' + (n === 1 ? '' : 's') + ' - ' + where + ')');
  }
  console.log('');
  console.log('  occurrences per route:');
  [...perRoute.entries()].sort((a, b) => b[1] - a[1]).forEach(([route, count]) => {
    console.log('    ' + route.padEnd(46) + count);
  });
  console.log('');
  console.log('ACCESSIBILITY AUDIT: FAIL');
} else {
  console.log('ACCESSIBILITY AUDIT: PASS');
}
if (missed.length) {
  console.error('internal error: ' + missed.length + ' registered routes were not scanned (' + missed.join(', ') + ')');
}
process.exit(occurrences || missed.length ? 1 : 0);
