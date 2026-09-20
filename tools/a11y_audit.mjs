/* ==========================================================
   Accessibility audit (WCAG 2.1 AA subset)
   Headless DOM audit over every route for the automated,
   machine-checkable requirements:
     - document has a lang attribute
     - every form control has a programmatic label (label/aria)
     - every button / interactive element has an accessible name
     - images carry alt text (informational - app has none)
     - no duplicate id attributes
     - heading hierarchy sanity (no skipped h1)
     - links have discernible text
     - no empty buttons that are the sole trigger
   Focus/contrast are covered by manual + Lighthouse; this catches
   the structural violations that break screen readers.
   ========================================================== */
import { JSDOM, VirtualConsole } from 'jsdom';

const HTML = process.argv[2] || 'ProcureSherpa-v2.0.html';
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

const ROUTES = [
  '#/home', '#/academy', '#/academy-progress', '#/certificate',
  '#/academy/func-mission-value', '#/operations', '#/what', '#/search', '#/glossary',
  '#/list/calc', '#/list/sop', '#/list/cl', '#/list/tpl', '#/list/kpi', '#/list/kb', '#/list/dec',
  '#/calc/calc-tco', '#/calc/calc-compare-quotes', '#/calc/calc-payment-terms',
  '#/sop/sop-rfq', '#/cl/cl-procurement-intake', '#/tpl/tpl-rfq', '#/k/k-c-procurement',
  '#/kpi/kpi-savings', '#/dec', '#/maturity', '#/lifecycle', '#/help', '#/dash',
  '#/dash-savings', '#/saved', '#/backup', '#/settings', '#/scen/scn-new-purchase',
  '#/copilot', '#/exams', '#/spend-model', '#/docpack'
];

/* Findings are deduplicated by message so one systemic problem does not
   print 38 times. Earlier this silently discarded the repeats, so a
   single printed line could mean one route or every route. Repeats are
   now counted and the affected routes reported at the end. */
let issues = 0;
const seen = new Map();
const order = [];
function report(route, type, detail) {
  const key = type + '|' + detail;
  if (seen.has(key)) { seen.get(key).routes.push(route); return; }
  seen.set(key, { type, detail, routes: [route] });
  order.push(key);
  issues++;
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
     the only one. Only the "first heading" half of this was previously
     implemented - the h1 count was collected and then never looked at,
     so a route with no h1 at all, or with three of them, passed. */
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

/* shell-level (non-route) checks */
const lang = d.documentElement.getAttribute('lang');
console.log('--- accessibility audit: ' + HTML + ' ---');
console.log('document lang: ' + (lang || 'MISSING'));
console.log('routes scanned: ' + ROUTES.length);
console.log('distinct issues: ' + issues);

if (issues) {
  console.log('');
  for (const key of order) {
    const f = seen.get(key);
    const n = f.routes.length;
    const where = n === 1 ? f.routes[0] : n + ' routes, first ' + f.routes[0];
    console.log('  [' + f.type + '] ' + f.detail + '   (' + where + ')');
  }
  console.log('');
  console.log('ACCESSIBILITY AUDIT: FAIL');
} else {
  console.log('ACCESSIBILITY AUDIT: PASS');
}
process.exit(issues ? 1 : 0);