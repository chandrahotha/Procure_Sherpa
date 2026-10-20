/* Verify a deployed Procure Sherpa by running the same integrity
   checks against what is actually being served.

   Usage:
     node tools/verify_deploy.mjs
     node tools/verify_deploy.mjs https://procuresherpa.vercel.app

   This loads the served HTML into jsdom and asserts the same things the
   build gate asserts locally, against the live bytes: the content
   registries are populated, every route renders real content with no
   sentinel leaks, the navigation has the expected shape and highlights
   correctly, the Academy is the expected size, and the cross-tool
   handoffs still carry data. */
import { JSDOM, VirtualConsole } from 'jsdom';

const URL = process.argv[2] || 'https://procuresherpa.vercel.app';
let failures = 0;
const ok = (label, cond, extra) => {
  console.log((cond ? '  PASS  ' : '  FAIL  ') + label + (extra ? '  [' + extra + ']' : ''));
  if (!cond) failures++;
};

const res = await fetch(URL, { headers: { 'user-agent': 'procure-sherpa-verify' } });
console.log('\n' + URL + '  ->  HTTP ' + res.status);
if (!res.ok) { console.log('  the site is not serving'); process.exit(1); }
const html = await res.text();
console.log('  served bytes: ' + html.length.toLocaleString());

const vc = new VirtualConsole();
const dom = new JSDOM(html, { runScripts: 'dangerously', url: 'https://localhost/', virtualConsole: vc, pretendToBeVisual: true });
const w = dom.window;
const PS = w.PS;
await new Promise((r) => setTimeout(r, 400));
if (!PS) { console.log('  the application did not initialise'); process.exit(1); }

console.log('\nContent');
ok('content library loaded', (PS.data.kb || []).length > 60, 'kb=' + (PS.data.kb || []).length);
ok('13 SOPs', (PS.data.sop || []).length === 13, (PS.data.sop || []).length + '');
ok('27 checklists', (PS.data.cl || []).length === 27, (PS.data.cl || []).length + '');
ok('33 templates', (PS.data.tpl || []).length === 33, (PS.data.tpl || []).length + '');
ok('19 calculators', (PS.data.calc || []).length === 19, (PS.data.calc || []).length + '');
ok('9 maturity areas', (PS.MATURITY || []).length === 9, (PS.MATURITY || []).length + '');
ok('21 lifecycle stages', (PS.LIFECYCLE || []).length === 21, (PS.LIFECYCLE || []).length + '');
ok('28 academy functions', (PS.ACADEMY_FUNCTIONS || []).length === 28, (PS.ACADEMY_FUNCTIONS || []).length + '');
ok('11 academy modules', new Set((PS.ACADEMY_FUNCTIONS || []).map((f) => f.module)).size === 11);

console.log('\nCurriculum');
const steps = (PS.ACADEMY_FUNCTIONS || []).reduce((a, f) => a + (f.sopSteps || []).length, 0);
const quizzes = (PS.ACADEMY_FUNCTIONS || []).reduce((a, f) => a + (f.quizzes || []).length, 0);
ok('140 SOP steps', steps === 140, steps + '');
ok('112 quiz questions', quizzes === 112, quizzes + '');
ok('every function has a governing SOP', (PS.ACADEMY_FUNCTIONS || []).every((f) => f.relSop));
ok('every function links to the library', (PS.ACADEMY_FUNCTIONS || []).every((f) => f.rel && f.rel.sops.length && f.rel.calcs.length));
ok('every question has exactly one correct option', (PS.ACADEMY_FUNCTIONS || []).every((f) => (f.quizzes || []).every((q) => (q.options || []).filter((o) => o.isCorrect).length === 1)));

console.log('\nNavigation');
w.location.hash = '#/home';
PS.renderRoute();
ok('sidebar present on the landing page', !w.document.querySelector('#app').classList.contains('has-no-sidebar'));
ok('five sections', w.document.querySelectorAll('#navRoot .nav-sec').length === 5);
ok('33 navigation items', w.document.querySelectorAll('#navRoot li').length === 33);
ok('four footer links', w.document.querySelectorAll('.sidebar-foot-link').length === 4);
w.location.hash = '#/sop/sop-rfq';
PS.renderRoute();
ok('active item highlights on a detail route', !!w.document.querySelector('#navRoot a.is-current'));

console.log('\nRoutes');
const routes = Object.keys(PS.routes).filter((r) => r !== 'notfound');
let bad = 0, thin = 0, leaks = 0;
for (const r of routes) {
  w.location.hash = '#/' + r;
  PS.renderRoute();
  const main = w.document.querySelector('#main');
  const text = main ? main.textContent.trim() : '';
  if (text.length < 40) thin++;
  if (text.includes('undefined') || text.includes('[object Object]')) leaks++;
  main.querySelectorAll('a[href^="#/"]').forEach((a) => {
    const segs = a.getAttribute('href').split('?')[0].replace(/^#\//, '').split('/');
    if (!PS.routes[segs[0]]) bad++;
  });
}
ok('all ' + routes.length + ' routes render real content', thin === 0, thin + ' thin');
ok('no sentinel text on any route', leaks === 0, leaks + ' leaks');
ok('every internal link resolves', bad === 0, bad + ' broken');

console.log('\nTools');
let edges = 0, emptyEdges = 0;
for (const c of PS.data.calc || []) {
  for (const t of (c.handoffTo || [])) {
    edges++;
    const tgt = PS.data.calc.filter((x) => x.id === t)[0];
    if (!tgt) { emptyEdges++; continue; }
    const vals = {};
    (c.fields || []).forEach((f) => { vals[f.k] = 1; });
    if (!Object.keys(PS.mapHandoffValues(c, tgt, vals)).length) emptyEdges++;
  }
}
ok('every cross-tool handoff carries data', emptyEdges === 0, edges + ' edges');
ok('search finds the documented example', (PS.search('supplier increased price by 12%').results[0] || {}).title === 'Supplier Price Increase');

w.close();
console.log('\n' + (failures ? 'DEPLOY VERIFICATION: FAIL (' + failures + ' failures)' : 'DEPLOY VERIFICATION: PASS'));
process.exit(failures ? 1 : 0);
