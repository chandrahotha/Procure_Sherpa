/* Headless smoke test: load the built app in jsdom, visit every route,
   collect runtime errors, and judge each render against the page
   contract in tools/page_contract.mjs.

   Takes an optional path so the same suite can be run against the
   minified deploy build:  node tools/smoke.mjs dist/index.html
   Minification is only safe if the minified artifact passes the same
   checks as the readable one, so the build runs both.

   WHAT CHANGED, and why it matters. The old version failed a route whose
   render was under 60 characters, so #/dec (196 chars) passed as
   "content rendered" while it was showing the not-found card, #/fav
   (178) passed while offering neither a link nor a control, and
   #/community (227) passed as a page that could not be what its name
   says. The floor is now a contract, decided from master §76 and §81
   rather than from what the build happened to pass, and it is shared
   with G7 in tools/test_integrity.mjs and with tools/verify_deploy.mjs
   so nobody can quietly hold a route to a softer number elsewhere. */
import path from 'node:path';
import { JSDOM, VirtualConsole } from 'jsdom';
import { assessRoute, classify, routeName, DETAIL_KIND } from './page_contract.mjs';

const HTML = path.resolve(process.argv[2] || 'ProcureSherpa-v2.0.html');
const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', (e) => errors.push('jsdom: ' + (e.detail?.message || e.message)));
vc.on('error', (...a) => errors.push('console.error: ' + a.map(String).join(' ')));

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
const { window } = dom;
await new Promise((r) => setTimeout(r, 1200)); /* let boot finish */
const PS = window.PS;

/* Every route the application registers, plus one fixture per content
   kind and the query variants a page only fills in when asked.
   ROUTE_COVERAGE below fails the gate if a route is registered and left
   off this table, which is how `#/k/k-c-procurement` - an id that has
   never existed in the library - sat here masquerading as a passing
   route while the real concept is `#/k/c-procurement`. */
const ROUTES = [
  /* one visit per registered route */
  '#/home', '#/academy', '#/academy-progress', '#/certificate', '#/quickstart',
  '#/what', '#/search', '#/glossary', '#/scenarios', '#/operations',
  '#/list/calc', '#/list/sop', '#/list/cl', '#/list/tpl', '#/list/kpi', '#/list/kb', '#/list/dec',
  '#/k', '#/sop', '#/cl', '#/tpl', '#/dec', '#/kpi', '#/scen', '#/calc',
  '#/lifecycle', '#/maturity', '#/help', '#/dash', '#/dash-savings',
  '#/saved', '#/fav', '#/recent', '#/backup', '#/settings', '#/audit',
  '#/copilot', '#/exams', '#/spend-model', '#/docpack',
  '#/assessment', '#/learning-paths', '#/labs', '#/portfolio',
  '#/daily-tip', '#/career-paths', '#/community', '#/next-up', '#/whats-new',
  '#/rfx', '#/suppliers', '#/contracts', '#/catalogue', '#/receipts', '#/budget', '#/approvals', '#/analytics',
  '#/notfound',
  /* detail fixtures: the §81 deliverables, one real id per kind */
  '#/k/c-procurement', '#/sop/sop-procurement-lifecycle', '#/cl/cl-procurement-intake',
  '#/tpl/tpl-rfq', '#/calc/calc-tco', '#/calc/calc-compare-quotes', '#/calc/calc-payment-terms',
  '#/dec/rfq-or-rfp', '#/kpi/kpi-savings', '#/scen/scn-new-purchase',
  '#/academy/func-mission-value', '#/academy/func-supplier-risk',
  /* the SOP library is the product's core deliverable: every document in
     it is visited, not sampled */
  '#/sop/sop-procurement-intake', '#/sop/sop-rfq', '#/sop/sop-rfp',
  '#/sop/sop-supplier-evaluation', '#/sop/sop-contract-review',
  '#/sop/sop-negotiation-preparation', '#/sop/sop-savings-calculation',
  '#/sop/sop-supplier-price-increase-review', '#/sop/sop-contract-renewal',
  '#/sop/sop-supplier-performance-management', '#/sop/sop-procurement-audit',
  '#/sop/sop-emergency-procurement',
  /* pages that only answer when asked (§9, §50) */
  '#/search?q=TCO', '#/what?q=supplier%20increased%20price%20by%2012%20percent',
  '#/help/getting-started'
];

/* Render one route from an empty browser profile. Without this the
   numbers depend on visit order: #/recent measured 1135 characters when
   it happened to run after a handful of detail pages had called
   PS.recent.add, and 145 when it ran first. A gate must not be able to
   pass a page for the accident of its position in the list. */
function cleanProfile() {
  try { window.localStorage.clear(); } catch (e) { /* jsdom store, nothing to do */ }
}

const results = [];
for (const hash of ROUTES) {
  const before = errors.length;
  try {
    cleanProfile();
    window.location.hash = hash;
    await new Promise((r) => setTimeout(r, 120));
    const main = window.document.querySelector('#main, main, [role="main"]') || window.document.body;
    results.push({ hash, ...assessRoute({ win: window, hash, main }), newErrors: errors.slice(before) });
  } catch (e) {
    results.push({ hash, kind: classify(hash), chars: 0, links: 0, controls: 0, h1: 0, problems: ['threw: ' + String(e && e.message || e)], newErrors: [String(e && e.message || e)] });
  }
}

/* ---------- coverage: the table may not be smaller than the app ---------- */
const registered = Object.keys(PS.routes).filter((r) => r !== 'notfound');
const covered = new Set(ROUTES.map(routeName));
const uncovered = registered.filter((r) => !covered.has(r));
const stale = ROUTES.filter((h) => !covered.has(routeName(h))).map((h) => h + ' (no such route)');
/* A detail fixture is only a test if the id it names exists. */
const deadFixtures = [];
for (const h of ROUTES) {
  const segs = h.replace(/^#\//, '').split('?')[0].split('/');
  const type = DETAIL_KIND[segs[0]];
  if (type && segs[1] && !PS.byId(type, decodeURIComponent(segs[1]))) {
    deadFixtures.push(h + ' (no ' + type + ' with that id)');
  }
}

let bad = 0;
console.log('--- route smoke (page contract: LIBRARY >= 600 chars, WORKSPACE >= 250 chars with a way forward, STATE exempt) ---');
for (const r of results) {
  const fail = r.problems.length || r.newErrors.length;
  if (fail) bad++;
  console.log((fail ? 'FAIL' : 'ok  '), r.hash.padEnd(46), String(r.chars).padStart(6) + ' chars', r.kind.padEnd(10),
    (r.links + '/' + r.controls + '/' + r.h1).padStart(8),
    r.newErrors.length ? ' ERRORS: ' + r.newErrors.slice(0, 2).join(' | ').slice(0, 200) : (r.problems.length ? ' ' + r.problems.join(' ; ').slice(0, 220) : ''));
}
console.log('--- coverage ---');
if (uncovered.length) { bad += uncovered.length; uncovered.forEach((r) => console.log('FAIL ROUTE_COVERAGE #/' + r + ' is registered but never visited by this gate')); }
else console.log('ok   all ' + registered.length + ' registered routes are visited');
if (stale.length) { bad += stale.length; stale.forEach((s) => console.log('FAIL ROUTE_COVERAGE table entry ' + s)); }
if (deadFixtures.length) { bad += deadFixtures.length; deadFixtures.forEach((s) => console.log('FAIL FIXTURE ' + s)); }

console.log('--- summary ---');
console.log('routes:', results.length, 'failing:', bad);
console.log('total runtime errors captured:', errors.length);
if (errors.length) console.log('first errors:\n' + errors.slice(0, 8).join('\n'));
const fails = results.filter((r) => r.problems.length).map((r) => r.hash);
if (fails.length) console.log('PAGES FAILING THE CONTRACT:', fails.join(', '));
if (bad > 0 || errors.length > 0) {
  console.error('\nSMOKE TESTS FAILED: ' + bad + ' failing routes, ' + errors.length + ' runtime errors');
  process.exit(1);
}
console.log('\nSMOKE TESTS PASSED');
process.exit(0);
