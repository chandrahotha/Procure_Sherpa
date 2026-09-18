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

const HTML = 'ProcureSherpa-v2.0.html';
const errors = [];
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

let issues = 0;
const seen = new Set();
function report(route, type, detail) {
  const key = type + '|' + detail;
  if (seen.has(key)) return;
  seen.add(key);
  issues++;
  console.log('  [' + type + '] ' + detail + (route ? '   (' + route + ')' : ''));
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

  /* heading hierarchy: h1 must exist and be first heading */
  const h1s = doc.querySelectorAll('h1');
  const firstHeading = doc.querySelector('h1, h2, h3');
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
console.log('issues found: ' + issues);
if (issues) console.log('\nFirst issues:');
process.exit(issues ? 1 : 0);