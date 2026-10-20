/* ==========================================================
   Integrity gate: the checks that catch a broken application even
   when every existing test is green.

   The QA suite was passing while the Maturity page threw an
   uncaught TypeError, the Lifecycle page rendered zero stages, the
   "What to Learn Next" page could not say what to learn next, saved
   work could not be reopened, and a calculator silently inverted its
   RAG band. The reason is that the existing checks assert that a page
   rendered *something*, not that it rendered the *right* thing.

   These gates assert the right thing. They are hard failures.
   ========================================================== */
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM, VirtualConsole } from 'jsdom';

const ROOT = process.cwd();
const HTML = path.join(ROOT, 'ProcureSherpa-v2.0.html');

let failures = 0;
const fail = (gate, msg) => { failures++; console.log('  FAIL [' + gate + '] ' + msg); };
const ok = (gate, msg) => console.log('  ok   [' + gate + '] ' + msg);

/* ---------- load the artifact ---------- */
const vc = new VirtualConsole();
const dom = new JSDOM(fs.readFileSync(HTML, 'utf8'), {
  runScripts: 'dangerously',
  url: 'https://localhost/',
  virtualConsole: vc,
  pretendToBeVisual: true
});
const w = dom.window;
const PS = w.PS;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const errors = [];
w.addEventListener('error', (e) => errors.push(String(e.message || e.error)));

await sleep(300);

/* ---------- G1: the registries that were empty must not be empty ---------- */
console.log('\nG1  content registries');
if (!PS.MATURITY || PS.MATURITY.length < 5) fail('G1', 'PS.MATURITY has ' + (PS.MATURITY || []).length + ' areas, expected at least 5');
else ok('G1', 'PS.MATURITY has ' + PS.MATURITY.length + ' areas');
if (!PS.LIFECYCLE || PS.LIFECYCLE.length < 10) fail('G1', 'PS.LIFECYCLE has ' + (PS.LIFECYCLE || []).length + ' stages, expected at least 10');
else ok('G1', 'PS.LIFECYCLE has ' + PS.LIFECYCLE.length + ' stages');
if (!PS.ACADEMY_FUNCTIONS || PS.ACADEMY_FUNCTIONS.length < 20) fail('G1', 'PS.ACADEMY_FUNCTIONS has ' + (PS.ACADEMY_FUNCTIONS || []).length + ', expected at least 20');
else ok('G1', 'PS.ACADEMY_FUNCTIONS has ' + PS.ACADEMY_FUNCTIONS.length + ' functions');
const missingById = (PS.ACADEMY_FUNCTIONS || []).filter((f) => !PS.byId('academy', f.id));
if (missingById.length) fail('G1', missingById.length + ' academy functions are not resolvable by PS.byId: ' + missingById.map((f) => f.id).join(', '));
else ok('G1', 'every academy function resolves through PS.byId("academy", id)');

/* ---------- G2/G3/G7: render every route and inspect the result ---------- */
console.log('\nG2/G3/G7  route rendering');
const routes = Object.keys(PS.routes).filter((r) => r !== 'notfound');
const routeArgs = {
  k: Object.keys(PS.data.kb || {}).length ? [PS.data.kb[0].id] : [],
  sop: PS.data.sop && PS.data.sop[0] ? [PS.data.sop[0].id] : [],
  cl: PS.data.cl && PS.data.cl[0] ? [PS.data.cl[0].id] : [],
  tpl: PS.data.tpl && PS.data.tpl[0] ? [PS.data.tpl[0].id] : [],
  dec: PS.data.dec && PS.data.dec[0] ? [PS.data.dec[0].id] : [],
  kpi: PS.data.kpi && PS.data.kpi[0] ? [PS.data.kpi[0].id] : [],
  scen: PS.data.scen && PS.data.scen[0] ? [PS.data.scen[0].id] : [],
  calc: PS.data.calc && PS.data.calc[0] ? [PS.data.calc[0].id] : [],
  academy: (PS.ACADEMY_FUNCTIONS || []).length ? [PS.ACADEMY_FUNCTIONS[0].id] : [],
  list: ['kb']
};
const visited = [];
const allHrefs = new Set();
const sentinelHits = [];
const emptyRoutes = [];
const seenRoutes = new Set();

for (const r of routes) {
  const args = (routeArgs[r] || []).length ? routeArgs[r] : [''];
  for (const a of args) {
    const hash = '#/' + r + (a ? '/' + a : '');
    if (seenRoutes.has(hash)) continue;
    seenRoutes.add(hash);
    w.location.hash = hash;
    PS.renderRoute();
    const main = w.document.querySelector('#main');
    const text = main ? main.textContent.trim() : '';
    visited.push(hash);
    if (text.length < 40) emptyRoutes.push(hash + ' (' + text.length + ' chars)');
    /* sentinel leaks: the signature of a consumer reading a property
       that the producer never wrote */
    for (const bad of ['undefined', 'NaN', '[object Object]', 'null%']) {
      if (text.includes(bad)) {
        const idx = text.indexOf(bad);
        sentinelHits.push(hash + ' contains "' + bad + '" near: ' + text.slice(Math.max(0, idx - 40), idx + 40).replace(/\s+/g, ' '));
      }
    }
    /* every internal link on the page must resolve */
    main.querySelectorAll('a[href^="#/"]').forEach((a) => {
      const h = a.getAttribute('href').split('?')[0].replace(/^#\//, '');
      allHrefs.add(h);
      const segs = h.split('/');
      if (!PS.routes[segs[0]]) {
        const id = segs[1];
        const type = { k: 'kb', sop: 'sop', cl: 'cl', tpl: 'tpl', dec: 'dec', kpi: 'kpi', scen: 'scen', calc: 'calc' }[segs[0]];
        const list = segs[0] === 'list' ? PS.data[segs[1]] : (type ? PS.data[type] : null);
        if (!list || !list.some((x) => x.id === id)) {
          sentinelHits.push(hash + ' links to a route that does not resolve: ' + a.getAttribute('href'));
        }
      }
    });
  }
}
if (sentinelHits.length) {
  sentinelHits.slice(0, 20).forEach((s) => fail('G2/G3', s));
  if (sentinelHits.length > 20) fail('G2/G3', '... and ' + (sentinelHits.length - 20) + ' more');
} else {
  ok('G2/G3', visited.length + ' routes rendered with no sentinel text and no unresolvable internal link');
}
if (emptyRoutes.length) emptyRoutes.forEach((e) => fail('G7', 'route renders almost nothing: ' + e));
else ok('G7', 'every visited route rendered real content');

/* ---------- G4: every data-act has a handler ---------- */
console.log('\nG4  action handlers');
const acts = new Set();
w.document.querySelectorAll('[data-act]').forEach((el) => acts.add(el.getAttribute('data-act')));
const orphanActs = [...acts].filter((a) => typeof PS.acts[a] !== 'function');
if (orphanActs.length) fail('G4', 'controls with no handler: ' + orphanActs.join(', '));
else ok('G4', acts.size + ' distinct data-act values all have handlers');

/* ---------- G5: no orphan content ---------- */
console.log('\nG5  knowledge graph');
const inbound = new Map();
const countInbound = (type, ids) => {
  for (const id of ids || []) {
    const key = type + ':' + id;
    inbound.set(key, (inbound.get(key) || 0) + 1);
  }
};
for (const t of Object.keys(PS.data)) {
  for (const it of PS.data[t] || []) {
    const rel = it.rel || {};
    for (const k of Object.keys(rel)) {
      countInbound(PS.REL_TYPE[PS.relKey(k)] || k, rel[k]);
    }
  }
}
/* The Academy is a consumer of the library too: every function links
   out to concepts, SOPs, checklists, templates, calculators, decision
   guides and KPIs, and those links are inbound links. */
for (const f of PS.ACADEMY_FUNCTIONS || []) {
  const rel = f.rel || {};
  for (const k of Object.keys(rel)) {
    countInbound(PS.REL_TYPE[PS.relKey(k)] || k, rel[k]);
  }
}
const orphans = [];
for (const t of Object.keys(PS.data)) {
  for (const it of PS.data[t] || []) {
    const key = t + ':' + it.id;
    if (!inbound.has(key)) orphans.push(t + '/' + it.id);
  }
}
if (orphans.length) {
  orphans.forEach((o) => fail('G5', 'content item has no inbound link: ' + o));
} else {
  ok('G5', 'every content item has at least one inbound link');
}

/* ---------- G6: cross-tool handoffs must actually carry data ---------- */
console.log('\nG6  cross-tool handoff');
let edges = 0;
const deadEdges = [];
for (const c of PS.data.calc || []) {
  const handoffs = c.handoffTo || [];
  for (const t of handoffs) {
    edges++;
    const tgt = PS.data.calc.filter((x) => x.id === t)[0];
    if (!tgt) { deadEdges.push(c.id + ' -> ' + t + ' (no such calculator)'); continue; }
    const vals = {};
    (c.fields || []).forEach((f) => { vals[f.k] = 1; });
    const carried = PS.mapHandoffValues(c, tgt, vals);
    if (!Object.keys(carried).length) deadEdges.push(c.id + ' -> ' + t + ' (no shared field)');
  }
}
if (deadEdges.length) {
  deadEdges.forEach((d) => fail('G6', 'handoff edge can never carry data: ' + d));
} else {
  ok('G6', 'all ' + edges + ' handoff edges carry at least one field');
}

/* ---------- G8: the Academy must link into the content library ---------- */
console.log('\nG8  academy to library links');
let noSop = 0, noCalc = 0;
for (const f of PS.ACADEMY_FUNCTIONS || []) {
  const rel = f.rel || {};
  if (!rel.sops || !rel.sops.length) noSop++;
  if (!rel.calcs || !rel.calcs.length) noCalc++;
}
if (noSop) fail('G8', noSop + ' academy functions have no SOP link');
else ok('G8', 'every academy function links to at least one SOP');
if (noCalc) fail('G8', noCalc + ' academy functions have no calculator link');
else ok('G8', 'every academy function links to at least one calculator');

/* ---------- G9: the account score must be readable ---------- */
console.log('\nG9  assessment result');
PS.skillAssessment.storeResult(80, 4, [{ category: 'Sourcing', pct: 80, correct: 4, total: 5 }]);
const last = PS.skillAssessment.getLastResult();
if (!last || typeof last.score !== 'number') fail('G9', 'the assessment result does not expose a numeric score');
else if (last.score !== 80) fail('G9', 'the assessment score read back as ' + last.score);
else ok('G9', 'assessment score reads back correctly (' + last.score + '%)');

/* ---------- G10: runtime errors ---------- */
console.log('\nG10  runtime errors');
if (errors.length) errors.slice(0, 5).forEach((e) => fail('G10', e));
else ok('G10', 'no uncaught runtime errors during the sweep');

/* ---------- G11: no orphaned routes ---------- */
console.log('\nG11  route reachability');
const routeTargets = new Set();
const collectTargets = () => {
  w.document.querySelectorAll('a[href^="#/"]').forEach((a) => {
    routeTargets.add(a.getAttribute('href').split('?')[0].replace(/^#\//, '').split('/')[0]);
  });
};
for (const r of routes) {
  const a = routeArgs[r] || [];
  w.location.hash = '#/' + r + (a.length ? '/' + a[0] : '');
  PS.renderRoute();
  collectTargets();
}
/* the sidebar and the footer strip are inbound links too */
collectTargets();
const orphanRoutes = routes.filter((r) => !routeTargets.has(r));
if (orphanRoutes.length) {
  orphanRoutes.forEach((r) => fail('G11', 'route has no inbound link anywhere: #/' + r));
} else {
  ok('G11', 'every registered route is reachable from somewhere');
}

/* ---------- G12: the curriculum is well-formed ---------- */
console.log('\nG12  curriculum integrity');
let qBad = 0, sBad = 0, qCount = 0, sCount = 0;
for (const f of PS.ACADEMY_FUNCTIONS || []) {
  for (const q of f.quizzes || []) {
    qCount++;
    const correct = (q.options || []).filter((o) => o.isCorrect).length;
    if (correct !== 1) { qBad++; fail('G12', f.id + ' has a question with ' + correct + ' correct options (exactly one is required)'); }
    for (const o of q.options || []) {
      if (!o.rationale || !o.text) { qBad++; fail('G12', f.id + ' has a quiz option with no text or no rationale'); }
    }
    if (!q.principle) { qBad++; fail('G12', f.id + ' has a question with no principle'); }
  }
  for (const s of f.sopSteps || []) {
    sCount++;
    for (const k of ['title', 'role', 'desc', 'control', 'record', 'pitfall']) {
      if (!s[k]) { sBad++; fail('G12', f.id + ' has an SOP step with no ' + k); }
    }
  }
}
if (!qBad) ok('G12', qCount + ' quiz questions, each with exactly one correct option, a rationale on every option and a principle');
if (!sBad) ok('G12', sCount + ' SOP steps, each with an owner, control, record and pitfall');

w.close();
console.log('\n' + (failures ? 'INTEGRITY GATE: FAIL (' + failures + ' failures)' : 'INTEGRITY GATE: PASS'));
process.exit(failures ? 1 : 0);
