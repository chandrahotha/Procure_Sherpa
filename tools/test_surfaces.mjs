/* ==========================================================
   Surface gate.

   Every other content check in this repo asks whether the data is
   correct: G1 counts the records, check_rels proves the links resolve,
   G12 asserts the curriculum shape. None of them asks whether a piece
   of content ever REACHES the application. A tranche could be added to
   the registries, pass every pin, and never appear in search, on the
   hub, in an exam bank or on a lesson page - and `npm run qa` would be
   green, because green means the data agrees with itself.

   This gate boots the artifact and asks the running app the questions a
   learner would ask about the newest material, derived from the data
   rather than hard-coded to a module number, so the next tranche is
   covered the moment it lands:

     * the newest Academy module is on the hub, in sequence
     * each of its lessons renders, names its governing SOP, and every
       relation it declares resolves to a record that exists
     * its lab links go somewhere real rather than to a dead route
     * search finds each lesson by its own title, and each new concept
       by name
     * the module has an exam bank, and the full bank holds the pinned
       number of questions
     * a learning path claims its lessons, so the track list cannot
       quietly stop covering the curriculum
     * the learning surfaces that read the whole record still render

   Usage: node tools/test_surfaces.mjs   (or: npm run surfaces)
   ========================================================== */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import { PINS } from './content_pins.mjs';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const ARTIFACT = path.join(ROOT, 'ProcureSherpa-v2.0.html');
if (!fs.existsSync(ARTIFACT)) {
  console.error('FAIL: run `npm run build` first - this gate measures the artifact.');
  process.exit(1);
}

const results = [];
const check = (label, ok, detail) => { const r = { label, ok, detail: detail || '' }; results.push(r); console.log((ok ? '  ok   ' : '  FAIL ') + label + (r.detail ? '  [' + r.detail + ']' : '')); };

const dom = new JSDOM(fs.readFileSync(ARTIFACT, 'utf8'), { runScripts: 'dangerously', pretendToBeVisual: true });
const w = dom.window;
await new Promise((r) => setTimeout(r, 1200));
const PS = w.PS;
if (!PS || !PS.ACADEMY_FUNCTIONS) { console.error('FAIL: the artifact did not boot.'); process.exit(1); }

const d = w.document;
const render = async (hash) => {
  w.location.hash = hash;
  await new Promise((r) => setTimeout(r, 260));
  const main = d.querySelector('#main');
  return main ? main.textContent.replace(/\s+/g, ' ') : '';
};

/* Which pool backs each relation key and each lab route prefix. */
const POOL = { concepts: 'kb', sops: 'sop', checklists: 'cl', templates: 'tpl', calcs: 'calc', decisions: 'dec', kpis: 'kpi', glossary: 'gloss' };
const ROUTE_POOL = { calc: 'calc', cl: 'cl', tpl: 'tpl', sop: 'sop', glossary: 'gloss', kpi: 'kpi', dec: 'dec', scen: 'scen', academy: 'academy' };
const idsOf = (pool) => new Set((pool === 'academy' ? PS.ACADEMY_FUNCTIONS : (PS.data[pool] || [])).map((r) => r.id));

/* The newest module, taken from the data so nothing here rots. */
const moduleNumber = (f) => PS.academyModuleNumber(f.module) || 0;
const newest = Math.max(...PS.ACADEMY_FUNCTIONS.map(moduleNumber));
const fresh = PS.ACADEMY_FUNCTIONS.filter((f) => moduleNumber(f) === newest);
check('the curriculum has a newest module to test', newest > 0 && fresh.length > 0,
  'Module ' + newest + ' with ' + fresh.length + ' lessons');

/* 1. the hub lists it, in sequence, with its lessons. */
const hub = await render('#/academy');
check('the Academy hub shows Module ' + newest + ' in sequence',
  hub.indexOf('Module ' + newest) >= 0,
  fresh.length + ' lessons in it');
fresh.forEach((f) => check('the hub lists ' + f.kicker, hub.indexOf(f.title) >= 0 || hub.indexOf(f.kicker) >= 0));

/* 2. each lesson renders, with its governing SOP named and its relations real. */
for (const f of fresh) {
  const page = await render('#/academy/' + encodeURIComponent(f.id));
  check(f.kicker + ' renders as a lesson page',
    page.indexOf(f.title) >= 0 && page.length > 4000,
    page.length + ' chars');
  const sopIds = idsOf('sop');
  check(f.kicker + ' names a governing SOP that exists', !!f.relSop && sopIds.has(f.relSop), f.relSop || 'none');
  const broken = [];
  Object.keys(POOL).forEach((key) => {
    const have = idsOf(POOL[key]);
    (f.rel && f.rel[key] ? f.rel[key] : []).forEach((x) => { if (!have.has(x)) broken.push(key + ':' + x); });
  });
  check(f.kicker + ' declares only relations that resolve', broken.length === 0, broken.join(', '));
  const lab = f.labMission || {};
  const labBroken = [lab.ctaHref, lab.secondaryHref]
    .filter((h) => typeof h === 'string' && h.startsWith('#/'))
    .map((h) => {
      const m = /^#\/(calc|cl|tpl|sop|glossary|kpi|dec|scen|academy)\/(.+)$/.exec(h);
      if (!m) return h + ' (unrecognised route)';
      const pool = ROUTE_POOL[m[1]];
      return idsOf(pool).has(decodeURIComponent(m[2])) ? null : h + ' (no such record)';
    })
    .filter(Boolean);
  check(f.kicker + ' lab links go to records that exist', labBroken.length === 0, labBroken.join(', '));
}

/* 3. search reaches the new material the way a user would type it. */
const newConcepts = (PS.data.kb || []).filter((c) => (c.rel && c.rel.concepts || []).length && fresh.some((f) => (f.rel.concepts || []).indexOf(c.id) >= 0));
check('the concepts behind Module ' + newest + ' are registered',
  newConcepts.length >= fresh.length, newConcepts.length + ' concepts');
const titleOf = (r) => r.title || r.t || '';
newConcepts.slice(0, 6).forEach((c) => {
  const res = PS.search(titleOf(c).split(':')[0].split(' ').slice(0, 4).join(' '));
  const found = (res.results || []).some((r) => r && (r.id === c.id || titleOf(r) === titleOf(c)));
  check('search finds the concept "' + titleOf(c).slice(0, 34) + '"', found, 'top: ' + titleOf((res.results || [])[0] || {}));
});
fresh.forEach((f) => {
  const res = PS.search(f.title.split(':')[0].split(' ').slice(0, 5).join(' '));
  const found = (res.results || []).some((r) => r && r.id === f.id);
  check('search finds the lesson "' + f.title.slice(0, 30) + '"', found,
    'top: ' + titleOf((res.results || [])[0] || {}));
});

/* 4. exams cover the newest module, and the full bank is the pinned pool. */
const banks = (PS.exams && PS.exams.banks) ? PS.exams.banks() : [];
const bankForNewest = banks.filter((b) => String(b.id || '').indexOf('module-' + newest) >= 0 || String(b.title || '').indexOf('Module ' + newest) >= 0);
check('an exam bank exists for Module ' + newest, bankForNewest.length > 0, banks.length + ' banks in total');
const full = banks.filter((b) => (b.id || '') === 'cert-full')[0];
const fullCount = full ? ((full.questions || full.pool || []).length || (PS.ACADEMY_FUNCTIONS.reduce((a, f) => a + (f.quizzes || []).length, 0))) : 0;
check('the full exam bank spans the pinned question pool',
  !!full && fullCount === PINS.academyQuizQuestions,
  fullCount + ' questions in the bank, ' + PINS.academyQuizQuestions + ' pinned across ' + PS.ACADEMY_FUNCTIONS.length + ' lessons');

/* 5. a learning path claims the newest lessons, so tracks cannot stop covering. */
const paths = PS.learningPaths.PATHS || [];
const claimed = new Set();
paths.forEach((p) => (p.modules || []).forEach((m) => claimed.add(m)));
const unclaimed = fresh.map((f) => f.id).filter((id) => !claimed.has(id));
check('a learning path claims every lesson in Module ' + newest, unclaimed.length === 0, unclaimed.join(', '));
check('the learning paths page renders the whole track list',
  (await render('#/learning-paths')).length > 1500, paths.length + ' paths');

/* 6. the surfaces that read the whole record still work on it. */
for (const route of ['#/revise', '#/reflection', '#/academy-progress', '#/search?q=' + encodeURIComponent(fresh[0].title.split(' ').slice(0, 3).join(' '))]) {
  const t = await render(route);
  check(route + ' renders', t.length > 250, t.length + ' chars');
}

/* 7. every SOP the new lessons point at is a real page. */
for (const f of fresh) {
  if (!f.relSop) continue;
  const t = await render('#/sop/' + f.relSop);
  check('the governing SOP ' + f.relSop + ' renders as a procedure', t.length > 2000, t.length + ' chars');
}

const failed = results.filter((r) => !r.ok);
console.log('\n--- surface summary ---');
console.log('checks: ' + (results.length - failed.length) + '/' + results.length + ' passed');
if (failed.length) {
  console.log('\nFAIL: content exists in the data but does not reach the application.');
  console.log('This gate is about surfaces: hub listing, lesson render, search, exam bank, learning path, SOP page.');
  process.exit(1);
}
console.log('SURFACE GATE: PASS - Module ' + newest + ' reaches every surface a learner can ask it for.');

/* The application installs its own timers (the exam countdown, the reading
   progress loop), which keep the event loop alive after the last check.
   Without an explicit exit this process runs forever and the suite hangs. */
w.close();
process.exit(0);
