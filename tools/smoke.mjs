/* Headless smoke test: load the built app in jsdom, visit every major route,
   collect runtime errors, and flag empty renders. */
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM, VirtualConsole } from 'jsdom';

const HTML = path.resolve('ProcureSherpa-v2.0.html');
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

const ROUTES = [
  '#/home', '#/academy', '#/academy-progress', '#/certificate',
  '#/academy/func-mission-value', '#/academy/func-landed-cost-tco',
  '#/academy/func-spend-analysis', '#/academy/func-category-mgmt',
  '#/academy/func-should-cost', '#/academy/func-supplier-risk',
  '#/academy/func-contract-structuring', '#/academy/func-supplier-eval',
  '#/quickstart', '#/what', '#/search', '#/glossary', '#/scenarios', '#/operations',
  '#/list/calc', '#/list/sop', '#/list/cl', '#/list/tpl', '#/list/kpi', '#/list/kb', '#/list/dec',
  '#/calc/calc-tco', '#/calc/calc-compare-quotes', '#/calc/calc-payment-terms',
  '#/sop/sop-procurement-lifecycle',
  '#/sop/sop-procurement-intake',
  '#/sop/sop-rfq',
  '#/sop/sop-rfp',
  '#/sop/sop-supplier-evaluation',
  '#/sop/sop-contract-review',
  '#/sop/sop-negotiation-preparation',
  '#/sop/sop-savings-calculation',
  '#/sop/sop-supplier-price-increase-review',
  '#/sop/sop-contract-renewal',
  '#/sop/sop-supplier-performance-management',
  '#/sop/sop-procurement-audit',
  '#/sop/sop-emergency-procurement',
  '#/cl/cl-procurement-intake', '#/tpl/tpl-rfq',
  '#/k/k-c-procurement', '#/kpi/kpi-savings', '#/dec', '#/maturity', '#/lifecycle',
  '#/help', '#/help/getting-started', '#/dash', '#/dash-savings', '#/saved', '#/fav', '#/recent',
  '#/backup', '#/settings', '#/scen/scn-new-purchase', '#/notfound',
  '#/copilot', '#/exams', '#/spend-model', '#/docpack'
];
const results = [];
for (const hash of ROUTES) {
  const before = errors.length;
  try {
    window.location.hash = hash;
    await new Promise((r) => setTimeout(r, 120));
    const main = window.document.querySelector('#main, main, [role="main"]') || window.document.body;
    const text = (main.textContent || '').trim();
    results.push({ hash, chars: text.length, empty: text.length < 60, newErrors: errors.slice(before) });
  } catch (e) {
    results.push({ hash, chars: 0, empty: true, newErrors: [String(e && e.message || e)] });
  }
}

let bad = 0;
console.log('--- route smoke ---');
for (const r of results) {
  const flag = r.empty || r.newErrors.length ? 'FAIL' : 'ok  ';
  if (flag === 'FAIL') bad++;
  console.log(flag, r.hash.padEnd(34), String(r.chars).padStart(6) + ' chars', r.newErrors.length ? ' ERRORS: ' + r.newErrors.slice(0, 2).join(' | ').slice(0, 220) : '');
}
console.log('--- summary ---');
console.log('routes:', results.length, 'failing:', bad);
console.log('total runtime errors captured:', errors.length);
if (errors.length) console.log('first errors:\n' + errors.slice(0, 8).join('\n'));
const fails = results.filter((r) => r.empty).map((r) => r.hash);
if (fails.length) console.log('EMPTY/THIN PAGES:', fails.join(', '));
process.exit(0);
