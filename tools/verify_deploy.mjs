/* Verify a deployed Procure Sherpa by running the shared assertions
   against what is actually being served.

   Usage:
     node tools/verify_deploy.mjs
     node tools/verify_deploy.mjs https://procuresherpa.vercel.app

   WHAT THIS FILE OWNS, AND WHAT IT DOES NOT
   -----------------------------------------
   It owns one thing no local gate can do: prove that the bytes on the
   internet were built from this source tree, by reading the build stamp
   out of the served page and recomputing it from src/. Everything else it
   used to do was re-measure the content library with numbers written in
   this file - and this file is not part of `npm run qa`, so the only
   place the product was really counted was a deploy step, while the gate
   every developer runs held loose floors ("< 5", "< 10").

   Those counts moved into the gate. They live in
   tools/content_pins.mjs (content, curriculum, navigation shape, the
   documented search example) and tools/page_contract.mjs (what a route
   must contain to count as rendered). tools/test_integrity.mjs runs them
   against the artifact inside `npm run qa`; this file runs the same
   exported functions against the served application, so a deployment that
   is not the tested build fails here and a content regression fails
   there, and neither can drift from the other because there is one list
   of numbers. */
import { JSDOM, VirtualConsole } from 'jsdom';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { stampFor, readStamp } from './build_stamp.mjs';
import { contentPins, handoffWalk, navCounts, PINS, SEARCH_FIXTURE } from './content_pins.mjs';
import { assessRoute } from './page_contract.mjs';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

/* --wait <seconds> polls until the served build is the one expected.
   A deployment is not live the instant the gate finishes: the build
   takes about twenty seconds and the alias moves after that, so a
   check that runs immediately finds the previous deployment and
   reports it as a failure of the build that is actually on its way. */
const argv = process.argv.slice(2);
const waitIdx = argv.indexOf('--wait');
const WAIT_SECONDS = waitIdx >= 0 ? parseInt(argv[waitIdx + 1], 10) || 0 : 0;
const URL = argv.find((a) => !a.startsWith('--') && a !== String(WAIT_SECONDS)) || 'https://procuresherpa.vercel.app';
let failures = 0;
const ok = (label, cond, extra) => {
  console.log((cond ? '  PASS  ' : '  FAIL  ') + label + (extra ? '  [' + extra + ']' : ''));
  if (!cond) failures++;
};

/* The identity check. The served application carries a hash of the
   sources it was built from, so this can answer the only question that
   matters about a deployment: is the site serving the build I think it
   is? Everything else below checks that the build is correct; this
   checks that the build is the right one. */
const expectedStamp = (() => {
  try {
    const manifest = fs.readFileSync(path.join(ROOT, 'src', 'manifest.txt'), 'utf8')
      .split(/\r?\n/).map((s) => s.trim()).filter((s) => s && !s.startsWith('#'));
    const toCRLF = (s) => s.replace(/\r\n/g, '\n').replace(/\n/g, '\r\n');
    return stampFor(manifest.map((rel) => toCRLF(fs.readFileSync(path.join(ROOT, rel), 'utf8'))));
  } catch (e) {
    return null;
  }
})();
const fetchHtml = async () => {
  const res = await fetch(URL, { headers: { 'user-agent': 'procure-sherpa-verify', 'cache-control': 'no-cache' } });
  if (!res.ok) return { status: res.status, html: null };
  return { status: res.status, html: await res.text() };
};



let html = null;
let servedStamp = null;
let httpStatus = 0;
const deadline = Date.now() + WAIT_SECONDS * 1000;
let attempt = 0;
for (;;) {
  attempt++;
  const r = await fetchHtml();
  httpStatus = r.status;
  html = r.html;
  servedStamp = html ? readStamp(html) : null;
  if (html && (!expectedStamp || servedStamp === expectedStamp)) break;
  if (!WAIT_SECONDS || Date.now() >= deadline) break;
  if (attempt === 1) {
    console.log('  waiting for the deployment to land' +
      (expectedStamp ? ' (expecting build ' + expectedStamp + ', serving ' + (servedStamp || 'none') + ')' : '') + '...');
  }
  await new Promise((r2) => setTimeout(r2, 5000));
}
console.log('\n' + URL + '  ->  HTTP ' + httpStatus + (attempt > 1 ? '  (' + attempt + ' attempts)' : ''));
if (!html) { console.log('  the site is not serving'); process.exit(1); }
console.log('  served bytes: ' + html.length.toLocaleString());

const vc = new VirtualConsole();
const dom = new JSDOM(html, { runScripts: 'dangerously', url: 'https://localhost/', virtualConsole: vc, pretendToBeVisual: true });
const w = dom.window;
const PS = w.PS;
await new Promise((r) => setTimeout(r, 400));
if (!PS) { console.log('  the application did not initialise'); process.exit(1); }

console.log('\nIdentity');
ok('the served build carries a build stamp', !!servedStamp, servedStamp || 'none');
ok('the served build is the build from this source tree', !!servedStamp && !!expectedStamp && servedStamp === expectedStamp,
  'served=' + (servedStamp || 'none') + ' expected=' + (expectedStamp || 'none'));

console.log('\nContent (measured by tools/content_pins.mjs, gated by G1)');
for (const c of contentPins(PS)) {
  ok(c.label + ' is the pinned ' + c.pin, c.got === c.pin, c.label + ' = ' + c.got + ' [' + c.spec + ']');
}

console.log('\nCurriculum (G12 and G21 own these rules locally)');
ok('every academy function has a governing SOP', (PS.ACADEMY_FUNCTIONS || []).every((f) => f.relSop));
ok('every academy function links into the library', (PS.ACADEMY_FUNCTIONS || []).every((f) => f.rel && f.rel.sops.length && f.rel.calcs.length));
ok('every quiz question has exactly one correct option', (PS.ACADEMY_FUNCTIONS || []).every((f) => (f.quizzes || []).every((q) => (q.options || []).filter((o) => o.isCorrect).length === 1)));
ok('every SOP procedure step names an owner, an output and a control', (PS.data.sop || []).every((s) => (s.steps || []).every((st) => st.s && st.role && st.out && st.ctrl)));

console.log('\nNavigation (G16 owns these numbers)');
w.location.hash = '#/home';
PS.renderRoute();
ok('the landing page keeps the sidebar', !w.document.querySelector('#app').classList.contains('has-no-sidebar'));
/* The navigation is scoped by the profile's track, so both views are
   measured against the bytes that are actually served. */
const setView = (track) => {
  w.PS.user._cache = { name: 'T', role: 'beginner', track, company: '', avatarBg: '#000', joinedDate: '' };
  w.PS.buildNav();
};
setView('academy');
const learn = navCounts(w.document);
ok('the learn view is ' + PINS.navLearnSections + ' sections and ' + PINS.navLearnItems + ' items',
  learn.sections === PINS.navLearnSections && learn.items === PINS.navLearnItems, learn.names.join(', ') + ' / ' + learn.items + ' items');
ok('the learn view names Start, Learn, Library, Look It Up and My Work',
  learn.names.join('|') === 'Start|Learn|Library|Look It Up|My Work', learn.names.join(', '));
setView('operations');
const work = navCounts(w.document);
ok('the work view is ' + PINS.navWorkSections + ' sections and ' + PINS.navWorkItems + ' items',
  work.sections === PINS.navWorkSections && work.items === PINS.navWorkItems, work.names.join(', ') + ' / ' + work.items + ' items');
ok('the work view names Start, Workbench, Toolkit, Library, Look It Up and My Work',
  work.names.join('|') === 'Start|Workbench|Toolkit|Library|Look It Up|My Work', work.names.join(', '));
ok('the sidebar carries a Learn / Work switch', w.document.querySelectorAll('#navViewSwitch .nav-view-btn').length === 2);
ok('the footer strip carries ' + PINS.navFooterLinks + ' system links', work.footer === PINS.navFooterLinks, work.footer + '');
setView('academy');
w.location.hash = '#/sop/sop-rfq';
PS.renderRoute();
ok('active item highlights on a detail route', !!w.document.querySelector('#navRoot a.is-current'));

console.log('\nWorkbenches');
const WB_ROUTES = ['rfx', 'suppliers', 'contracts', 'catalogue', 'receipts', 'budget', 'approvals', 'analytics'];
for (const r of WB_ROUTES) {
  try { w.localStorage.clear(); } catch (e) { /* opaque origin */ }
  w.location.hash = '#/' + r;
  PS.renderRoute();
  const verdict = assessRoute({ win: w, hash: '#/' + r, main: w.document.querySelector('#main') });
  ok('#/' + r + ' meets the page contract', verdict.problems.length === 0, verdict.problems.join('; '));
}
ok('the workbench store is present', typeof PS.wb === 'object' && typeof PS.wb.upsert === 'function');

console.log('\nRoutes (page contract: tools/page_contract.mjs)');
const routes = Object.keys(PS.routes).filter((r) => r !== 'notfound');
let contractFails = 0, brokenLinks = 0;
for (const r of routes) {
  /* The contract is measured from an empty profile, exactly as
     tools/smoke.mjs and G7 do, so "WORKSPACE page" means the page a new
     reader sees rather than whatever the sweep left behind three routes
     earlier. */
  try { w.localStorage.clear(); } catch (e) { /* opaque origin */ }
  w.location.hash = '#/' + r;
  PS.renderRoute();
  const verdict = assessRoute({ win: w, hash: '#/' + r, main: w.document.querySelector('#main') });
  if (verdict.problems.length) {
    contractFails++;
    console.log('  FAIL  #/' + r + ' [' + verdict.kind + ', ' + verdict.chars + ' chars] ' + verdict.problems.join('; ').slice(0, 200));
  }
  w.document.querySelectorAll('#main a[href^="#/"]').forEach((a) => {
    const segs = a.getAttribute('href').split('?')[0].replace(/^#\//, '').split('/');
    if (!PS.routes[segs[0]]) brokenLinks++;
  });
}
ok('all ' + routes.length + ' registered routes meet the page contract', contractFails === 0, contractFails + ' failing');
ok('every internal link resolves', brokenLinks === 0, brokenLinks + ' broken');

console.log('\nTools (G6 owns the handoff rules)');
const handoff = handoffWalk(PS);
ok('every cross-tool handoff carries data', handoff.dead.length === 0, handoff.edges + ' edges' + (handoff.dead.length ? ': ' + handoff.dead.join('; ') : ''));
const hit = (PS.search(SEARCH_FIXTURE.query).results || [])[0] || {};
ok('search finds the documented example', hit.title === SEARCH_FIXTURE.title, 'top result: ' + (hit.title || 'nothing'));

w.close();
console.log('\n' + (failures ? 'DEPLOY VERIFICATION: FAIL (' + failures + ' failures)' : 'DEPLOY VERIFICATION: PASS'));
process.exit(failures ? 1 : 0);
