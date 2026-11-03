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
import { contentPins, handoffWalk, navCounts, PINS, SEARCH_FIXTURE } from './content_pins.mjs';
import { assessRoute } from './page_contract.mjs';

const ROOT = process.cwd();
const HTML = path.join(ROOT, 'ProcureSherpa-v2.0.html');

let failures = 0;
/* The two counters the summary prints. They exist because every document
   in this repo that describes this suite quotes a number - "19 gates, 46
   assertions" - and nothing measured it, so the prose could only drift.
   Now the suite says what it ran, and the docs point at it. */
let assertions = 0;
const gateLabels = new Set();
/* Several assertions are legitimately credited to more than one gate, and
   the label is then written as one string ("G2/G3"). Counting those strings
   as the gate inventory under-reported it: the summary said 19 gates while
   the file defines G1 to G20, which is the kind of number a document then
   quotes and nobody can reconcile. Split the label so the inventory counts
   gates, not label spellings. */
const mark = (gate) => String(gate).split('/').forEach((g) => gateLabels.add(g.trim()));
const fail = (gate, msg) => { assertions++; mark(gate); failures++; console.log('  FAIL [' + gate + '] ' + msg); };
const ok = (gate, msg) => { assertions++; mark(gate); console.log('  ok   [' + gate + '] ' + msg); };

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

/* ---------- G1: the content library is the size the product claims ---------- */
console.log('\nG1  content registries');
/* These are the exact pins that used to live only in
   tools/verify_deploy.mjs, outside `npm run qa`. Deleting a SOP, a
   checklist or a calculator is now a build failure on every branch, not
   something only the deployed site notices. The pin list itself is owned
   by tools/content_pins.mjs, which the deploy check also reads, so the
   two cannot disagree. */
for (const c of contentPins(PS)) {
  if (c.got !== c.pin) {
    fail('G1', c.label + ': found ' + c.got + ', the pin is ' + c.pin + ' (' + c.spec + '). If the library changed on purpose, change tools/content_pins.mjs in the same commit and update every document that quotes the count.');
  } else {
    ok('G1', c.label + ': ' + c.got + ' (' + c.spec + ')');
  }
}
const missingById = (PS.ACADEMY_FUNCTIONS || []).filter((f) => !PS.byId('academy', f.id));
if (missingById.length) fail('G1', missingById.length + ' academy functions are not resolvable by PS.byId: ' + missingById.map((f) => f.id).join(', '));
else ok('G1', 'every academy function resolves through PS.byId("academy", id)');

/* ---------- G22: search answers the example the requirements document ---------- */
console.log('\nG22  documented search answer');
/* §9 asks for global search over the library; §82 asks that a
   professional can answer "what SOP should I follow" inside the
   application. The example the requirements give is a supplier raising
   a price, and the answer must be the page for it. This assertion used to
   exist only in the deploy check. */
{
  const hit = (PS.search(SEARCH_FIXTURE.query).results || [])[0] || {};
  if (hit.title !== SEARCH_FIXTURE.title) {
    fail('G22', 'search("' + SEARCH_FIXTURE.query + '") returns "' + (hit.title || 'nothing') + '" as the top result, expected "' + SEARCH_FIXTURE.title + '"');
  } else {
    ok('G22', 'search finds the documented example (' + SEARCH_FIXTURE.query + ' -> ' + hit.title + ')');
  }
}

/* ---------- G23: the curriculum says what level it is written at ---------- */
console.log('\nG23  curriculum levels');
/* The complaint that started this work: the product is good for a first
   week and thin for a category manager. The cause was structural - all
   28 functions were written in one flat voice with nothing on the page
   saying which altitude a lesson was for, so a professional had to open
   it to find out. G23 owns the fix: every function carries one of the
   three named levels, the counts are pinned, the hub can be filtered by
   level, and the level survives onto the function page and the paths. */
{
  const TIER_IDS = (PS.academy.TIERS || []).map((t) => t.id);
  const funcs = PS.ACADEMY_FUNCTIONS || [];
  const untiered = funcs.filter((f) => !f.tier || TIER_IDS.indexOf(f.tier) === -1);
  if (untiered.length) {
    fail('G23', untiered.length + ' functions carry no level from ' + TIER_IDS.join('/') + ': ' + untiered.map((f) => f.id).join(', '));
  } else {
    ok('G23', 'every one of the ' + funcs.length + ' functions carries one of the three named levels');
  }
  let tierPinBad = 0;
  for (const [t, pin] of Object.entries(PINS.academyTierCounts)) {
    const got = funcs.filter((f) => f.tier === t).length;
    if (got !== pin) { fail('G23', t + ' level holds ' + got + ' functions, the pin is ' + pin + ' - if the split changed on purpose, update tools/content_pins.mjs and every document that quotes it'); tierPinBad++; }
  }
  if (!tierPinBad) ok('G23', 'the level split is pinned: ' + Object.entries(PINS.academyTierCounts).map(([t, n]) => n + ' ' + t).join(', '));

  /* The hub must be filterable by level, and the filter must actually
     filter: rendering #/academy?tier=executive must show the executive
     functions and nothing else. A filter that renders the full list is
     the "page that passes as rendered" defect in a new costume. */
  const renderHub = (tier) => {
    w.location.hash = tier ? '#/academy?tier=' + tier : '#/academy';
    PS.renderRoute();
    const doc = w.document;
    return {
      cards: [...doc.querySelectorAll('#main .func-card')],
      pills: [...doc.querySelectorAll('#main .func-card-level')].map((e) => e.textContent.trim()),
      chips: [...doc.querySelectorAll('#main .filters .chip')].map((e) => e.textContent.trim())
    };
  };
  const all = renderHub('');
  if (all.cards.length !== funcs.length) {
    fail('G23', 'the Academy hub renders ' + all.cards.length + ' function cards, expected ' + funcs.length);
  } else if (all.pills.length !== funcs.length) {
    fail('G23', 'only ' + all.pills.length + ' of ' + funcs.length + ' cards state their level');
  } else if (!TIER_IDS.every((t) => all.chips.some((c) => c.indexOf(PS.academy.tierName(t)) !== -1))) {
    fail('G23', 'the hub has no filter chip for every level: ' + all.chips.join(' | '));
  } else {
    ok('G23', 'the hub labels all ' + funcs.length + ' cards and offers a filter per level (' + all.chips.join(', ') + ')');
  }
  for (const t of TIER_IDS) {
    const pin = PINS.academyTierCounts[t];
    const view = renderHub(t);
    if (view.cards.length !== pin) {
      fail('G23', '#/academy?tier=' + t + ' renders ' + view.cards.length + ' functions, the pin is ' + pin);
      continue;
    }
    const hrefs = view.cards.map((c) => c.getAttribute('href') || '');
    const ids = funcs.filter((f) => f.tier === t).map((f) => '#/academy/' + encodeURIComponent(f.id));
    const same = ids.length === hrefs.length && ids.every((h, i) => hrefs.indexOf(h) !== -1);
    if (!same) { fail('G23', '#/academy?tier=' + t + ' renders functions that are not at that level'); continue; }
    ok('G23', '#/academy?tier=' + t + ' renders exactly the ' + pin + ' ' + PS.academy.tierName(t) + ' functions');
  }
  /* The level has to reach the lesson itself, and the paths page, or a
     reader who lands on a function from search still cannot tell. */
  const execFunc = funcs.filter((f) => f.tier === 'executive')[0];
  w.location.hash = '#/academy/' + encodeURIComponent(execFunc.id);
  PS.renderRoute();
  const levelChip = [...w.document.querySelectorAll('#main .chips .chip')].map((e) => e.textContent.trim())
    .filter((c) => /Level/.test(c));
  if (!levelChip.length) fail('G23', 'the function page for ' + execFunc.id + ' does not state its level');
  else ok('G23', 'the function page states its level (' + levelChip.join(', ') + ')');
  w.location.hash = '#/learning-paths';
  PS.renderRoute();
  const pathPills = [...w.document.querySelectorAll('#main .path-card .level-pill')].map((e) => e.textContent.trim());
  const named = PS.academy.TIERS.map((t) => t.name).filter((nm) => pathPills.some((p2) => p2.indexOf(nm) !== -1));
  if (named.length < 3) fail('G23', 'the learning paths are not tagged by level: ' + pathPills.join(' | '));
  else ok('G23', 'every learning path states its level (' + named.join(', ') + ')');
}

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
/* The controls every page renders. Collected during the sweep and read
   by G4: the static shell only carries five data-act values, so a gate
   that looked at the shell alone was reporting "5 controls checked" for
   an application with 146 action handlers. */
const renderedActs = new Set();

/* Some routes only render their content when they have a query, so a
   sweep with no query never sees the links inside them. The "what should
   I do" plan builder and the search page both work that way, and a broken
   link inside the plan builder went unnoticed for exactly that reason. */
const ROUTE_VISITS = [];
for (const r of routes) {
  const a = (routeArgs[r] || []).length ? routeArgs[r] : [''];
  for (const x of a) ROUTE_VISITS.push('#/' + r + (x ? '/' + x : ''));
}
ROUTE_VISITS.push('#/what?q=supplier%20increased%20price%20by%2012%20percent');
ROUTE_VISITS.push('#/search?q=contract');
ROUTE_VISITS.push('#/list/kb/Fundamentals');
ROUTE_VISITS.push('#/academy/func-mission-value?tab=learn');
ROUTE_VISITS.push('#/academy/func-mission-value?tab=think');
ROUTE_VISITS.push('#/academy/func-mission-value?tab=sop');
ROUTE_VISITS.push('#/academy/func-mission-value?tab=practice');
ROUTE_VISITS.push('#/academy/func-mission-value?tab=apply');

for (const hash of ROUTE_VISITS) {
  {
    if (seenRoutes.has(hash)) continue;
    seenRoutes.add(hash);
    /* Measure every route from an empty browser profile, exactly as
       tools/smoke.mjs does. Without it the sweep is order-dependent:
       #/recent reported 146 characters because one earlier detail page had
       added a record to the recent list, and 301 when it ran clean, and
       which number a page got was a property of the list above it. */
    try { w.localStorage.clear(); } catch (e) { /* jsdom store, nothing to do */ }
    w.location.hash = hash;
    PS.renderRoute();
    const main = w.document.querySelector('#main');
    visited.push(hash);
    /* The same page contract tools/smoke.mjs applies (tools/page_contract
       .mjs). This sweep used to fail a route only under 40 characters, a
       softer number than smoke's 60 and a different one, so a route that
       was showing the not-found card at 190 characters passed here, there
       and in verify_deploy all at once. One contract, three tools. */
    const verdict = assessRoute({ win: w, hash, main });
    for (const p of verdict.problems) {
      if (p.startsWith('leaks ')) {
        sentinelHits.push(hash + ' ' + p);
      } else {
        emptyRoutes.push(hash + ' [' + verdict.kind + '] ' + p);
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
    /* Collect the controls every page renders, not just the ones present
       in the static shell. G4 reads this set. */
    main.querySelectorAll('[data-act]').forEach((el) => {
      const v = el.getAttribute('data-act');
      if (v) renderedActs.add(v);
    });
  }
}
if (sentinelHits.length) {
  sentinelHits.slice(0, 20).forEach((s) => fail('G2/G3', s));
  if (sentinelHits.length > 20) fail('G2/G3', '... and ' + (sentinelHits.length - 20) + ' more');
} else {
  ok('G2/G3', visited.length + ' routes rendered with no sentinel text and no unresolvable internal link');
}
if (emptyRoutes.length) emptyRoutes.forEach((e) => fail('G7', 'route fails the page contract: ' + e));
else ok('G7', 'every visited route meets the page contract in tools/page_contract.mjs (' + visited.length + ' routes)');

/* ---------- G4: every data-act has a handler ---------- */
console.log('\nG4  action handlers');
const acts = new Set();
w.document.querySelectorAll('[data-act]').forEach((el) => {
  const v = el.getAttribute('data-act');
  if (v) acts.add(v);
});
/* The controls rendered by the route sweep count too. Before this, G4
   looked only at the static shell, so it reported "5 distinct data-act
   values all have handlers" for an application that wires 146 handlers
   and renders 86 distinct controls: a button on any page other than the
   shell could point at nothing and the gate would not have known. */
renderedActs.forEach((a) => acts.add(a));
const orphanActs = [...acts].filter((a) => typeof PS.acts[a] !== 'function');
if (orphanActs.length) fail('G4', 'controls with no handler: ' + orphanActs.join(', '));
else ok('G4', acts.size + ' distinct data-act values, across the shell and every rendered route, all have handlers');

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
/* The walk is shared with tools/verify_deploy.mjs through
   tools/content_pins.mjs, so the gate and the deploy check cannot measure
   different edge sets. G6 owns this assertion; the deploy check only
   re-runs it against the served bytes. */
const handoff = handoffWalk(PS);
const edges = handoff.edges;
const deadEdges = handoff.dead;
if (deadEdges.length) {
  deadEdges.forEach((d) => fail('G6', 'handoff edge can never carry data: ' + d));
} else {
  ok('G6', 'all ' + edges + ' handoff edges carry at least one field');
}
/* The floor. Without it this gate could not fail: delete every
   `handoffTo` in the registry and `deadEdges` stays empty, so the gate
   prints "all 0 handoff edges carry at least one field" and passes.
   Requirement section 26 names six source tools and the destinations
   each must send to; of those, the calculator-to-calculator legs are the
   ones that can prepopulate a field, and they are listed here so a
   regression that drops one of them is a build failure rather than a
   quieter product.
   This is a floor and not the requirement: section 26 also asks for
   handoffs into non-calculator destinations (the Award Recommendation
   template, the Contract Renewal SOP, the Savings Dashboard, supplier
   risk), which today are links rather than data handoffs, and which are
   recorded in docs/completion-ledger.md against section 26. */
const REQUIRED_EDGES = [
  ['calc-compare-quotes', 'calc-negotiation-savings'],
  ['calc-compare-quotes', 'calc-tco'],
  ['calc-price-increase', 'calc-negotiation-savings'],
  ['calc-price-increase', 'calc-price-escalation'],
  ['calc-price-increase', 'calc-tco'],
  ['calc-tco', 'calc-make-vs-buy'],
  ['calc-savings-analysis', 'calc-budget-vs-actual'],
  ['calc-budget-vs-actual', 'calc-savings-analysis']
];
const edgeSet = new Set();
for (const c of PS.data.calc || []) {
  for (const t of c.handoffTo || []) edgeSet.add(c.id + '->' + t);
}
const missingEdges = REQUIRED_EDGES.filter(([from, to]) => !edgeSet.has(from + '->' + to));
if (missingEdges.length) {
  missingEdges.forEach(([from, to]) => fail('G6', 'required handoff (section 26) is gone: ' + from + ' -> ' + to));
} else {
  ok('G6', 'the ' + REQUIRED_EDGES.length + ' handoff legs the requirements name between calculators are all declared');
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
/* The sidebar and the footer strip are inbound links too. The
   navigation is scoped by the profile's track, so a route is reachable
   if it is reachable in the view it belongs to. Checking only the
   rendered menu would have called the three Workbench routes orphans,
   which is the opposite of the truth. */
const savedProfile = PS.user._cache;
PS.user._cache = { name: 'T', role: 'beginner', track: 'academy', company: '', avatarBg: '#000', joinedDate: '' };
PS.buildNav();
collectTargets();
PS.user._cache = { name: 'T', role: 'beginner', track: 'operations', company: '', avatarBg: '#000', joinedDate: '' };
PS.buildNav();
collectTargets();
PS.user._cache = savedProfile;
if (PS.buildNav) PS.buildNav();
const orphanRoutes = routes.filter((r) => !routeTargets.has(r));
if (orphanRoutes.length) {
  orphanRoutes.forEach((r) => fail('G11', 'route has no inbound link anywhere: #/' + r));
} else {
  ok('G11', 'every registered route is reachable from somewhere');
}

/* ---------- G12: the Academy curriculum is well-formed ---------- */
console.log('\nG12  academy curriculum');
/* G12 measures the Academy: the 112 quiz questions and the 140 step
   sequences the Academy teaches. It used to also print "140 SOP steps,
   each with an owner, control, record and pitfall" as the evidence for the
   SOP centre's depth, which was the wrong library: those 140 are
   PS.ACADEMY_FUNCTIONS[].sopSteps, and the SOP documents' own 106 `steps`
   were counted by nothing. Master §18 and §77 make claims about SOP
   content, so the SOP library is now asserted directly, in G21, and the
   two can fail independently. */
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
if (qBad) fail('G12', qBad + ' academy quiz problems (above)');
else if (qCount !== PINS.academyQuizQuestions) fail('G12', 'the Academy teaches ' + qCount + ' quiz questions, expected the pinned ' + PINS.academyQuizQuestions);
else ok('G12', qCount + ' academy quiz questions, each with exactly one correct option, a rationale on every option and a principle');
if (sBad) fail('G12', sBad + ' academy step problems (above)');
else if (sCount !== PINS.academySopSteps) fail('G12', 'the Academy teaches ' + sCount + ' step sequences, expected the pinned ' + PINS.academySopSteps);
else ok('G12', sCount + ' academy-taught step sequences, each with an owner, control, record and pitfall');

/* ---------- G21: the SOP library's own procedure steps ---------- */
console.log('\nG21  SOP procedure depth');
/* §18 gives an SOP 19 numbered parts, and part 7 is "Procedure: detailed
   sequential steps". §77 forbids placeholder text in that content. Until
   now the only step-depth claim in the suite was read out of the Academy
   (see G12), so deleting a step from an SOP document, or emptying one,
   failed nothing. Each step must name what happens, who does it, what it
   produces and which control covers it - §18 parts 5, 7, 10 and 13. */
let sopStepBad = 0, sopStepCount = 0;
for (const doc of PS.data.sop || []) {
  const steps = doc.steps || [];
  if (steps.length < PINS.sopLibraryMinStepsPerSop) {
    sopStepBad++;
    fail('G21', doc.id + ' has ' + steps.length + ' procedure steps, expected at least ' + PINS.sopLibraryMinStepsPerSop + ' (section 18 part 7)');
  }
  for (const st of steps) {
    sopStepCount++;
    if (!st.s || !String(st.s).trim()) { sopStepBad++; fail('G21', doc.id + ' has a procedure step with no title'); continue; }
    const d = String(st.d || '').trim();
    if (d.length < 80) { sopStepBad++; fail('G21', doc.id + ' step "' + String(st.s).slice(0, 40) + '" has a ' + d.length + '-character instruction; a sequential step must say what to do'); }
    for (const [k, label] of [['role', 'owner (section 18 part 5)'], ['out', 'output (section 18 part 13)'], ['ctrl', 'control (section 18 part 10)']]) {
      if (!st[k]) { sopStepBad++; fail('G21', doc.id + ' step "' + String(st.s).slice(0, 40) + '" declares no ' + label); }
    }
    /* The compact seed format separates steps with ';' and step metadata
       with ','. A ';' written inside a step's prose used to tear the step
       in two and leave one half with no instruction and the other half
       showing raw `role=…,out=…` metadata on the page. */
    if (/(^|\s)(role|out|ctrl)=/.test(d)) { sopStepBad++; fail('G21', doc.id + ' step "' + String(st.s).slice(0, 40) + '" leaks step metadata into its instruction: ' + d.slice(0, 80)); }
  }
}
if (sopStepCount !== PINS.sopLibrarySteps) {
  fail('G21', 'the SOP library holds ' + sopStepCount + ' procedure steps, expected the pinned ' + PINS.sopLibrarySteps);
} else if (!sopStepBad) {
  ok('G21', (PS.data.sop || []).length + ' SOP documents hold ' + sopStepCount + ' procedure steps, each titled, at 80+ characters, with an owner, an output and a control');
}

/* ---------- G12: the workbenches are reachable and functional ---------- */
console.log('\nG12  workbenches');
const WB_ROUTES = ['rfx', 'suppliers', 'contracts', 'catalogue', 'receipts', 'budget', 'approvals', 'analytics'];
let wbBad = 0;
for (const r of WB_ROUTES) {
  if (!PS.routes[r]) { fail('G12', 'workbench route missing: #' + r); wbBad++; continue; }
  w.location.hash = '#/' + r;
  PS.renderRoute();
  const main = w.document.querySelector('#main');
  const text = main ? main.textContent.trim() : '';
  if (text.length < 300) { fail('G12', '#/' + r + ' rendered almost nothing'); wbBad++; }
  if (text.includes('undefined')) { fail('G12', '#/' + r + ' leaks undefined'); wbBad++; }
  if (!main.querySelector('#wbForm') && r !== 'rfx' && r !== 'analytics' && r !== 'budget') {
    fail('G12', '#/' + r + ' has no record form'); wbBad++;
  }
}
if (!wbBad) ok('G12', WB_ROUTES.length + ' workbenches render with a form, no leaks and no empty pages');
/* every workbench collection must survive a round trip through the store */
if (PS.wb) {
  const probe = { id: 'probe', name: 'probe' };
  PS.wb.upsert('suppliers', probe);
  const stored = PS.store.get(PS.wb.KEY, {});
  const kept = stored && Array.isArray(stored.suppliers) && stored.suppliers.some((r) => r.id === 'probe');
  if (!kept) fail('G12', 'a workbench record does not survive the store round trip');
  else ok('G12', 'workbench records persist through the store');
  PS.wb.remove('suppliers', 'probe');
}

/* ---------- G13: the curriculum is a sequence, and the role recommends ----------
   This gate used to assert the opposite of the requirement. It checked
   that the role REORDERED the curriculum, which is the thing that was
   wrong: a numbered curriculum whose number is not its position is
   broken. It now states the requirement in the requirement's words.
   ------------------------------------------------------------------- */
console.log('\nG13  curriculum sequence');
/* The reordering itself must not come back. It was removed because a
   numbered curriculum whose number is not its position is broken, and
   the role now recommends instead of moving things. */
const reorderingHelpers = ['moduleOrder', 'moduleRank', 'toolOrder'].filter((k) => PS.user && typeof PS.user[k] === 'function');
if (reorderingHelpers.length) {
  fail('G13', 'the curriculum reordering has been reintroduced: PS.user.' + reorderingHelpers.join(', '));
} else {
  ok('G13', 'nothing in the profile can reorder the curriculum');
}
const setUser = (role, track) => { PS.user._cache = { name: 'T', role, track, company: '', avatarBg: '#000', joinedDate: '' }; };
const moduleBadges = () => {
  w.location.hash = '#/academy';
  PS.renderRoute();
  return [...w.document.querySelectorAll('#main .module-group .module-badge')]
    .map((e) => parseInt(String(e.textContent).replace(/\D+/g, ''), 10));
};
const ROLES = ['beginner', 'buyer', 'manager', 'finance', 'compliance'];
let seqBad = 0;
for (const role of ROLES) {
  setUser(role, 'academy');
  const nums = moduleBadges();
  /* Ascending-plus-count used to be the check, which a hub missing module
     7 and holding a duplicate module 8 would have passed. The requirement
     is that the numbered curriculum numbers 1 to N in order, so that is
     what is compared - against the module count pinned in
     tools/content_pins.mjs, so adding a module cannot fail this gate for
     the wrong reason or pass it without being counted. */
  const want = Array.from({ length: PINS.academyModules }, (_, i) => i + 1);
  if (nums.join(',') !== want.join(',')) {
    fail('G13', 'the curriculum for role ' + role + ' shows modules [' + nums.join(',') +
      '], expected 1 to ' + PINS.academyModules + ' in order');
    seqBad++;
  }
}
if (!seqBad) ok('G13', 'all ' + ROLES.length + ' roles see the curriculum in module order, 1 to ' + PINS.academyModules);

/* The role must still do something visible, and it must do it by
   recommending rather than by moving. */
setUser('compliance', 'academy');
w.location.hash = '#/academy';
PS.renderRoute();
const recPanel = w.document.querySelector('#main .academy-role-rec');
if (!recPanel) {
  fail('G13', 'the role produces no recommendation');
} else {
  const recNums = [...recPanel.querySelectorAll('.chip')]
    .map((c) => parseInt(String(c.textContent).replace(/\D+/g, ''), 10))
    .filter((n) => !isNaN(n));
  const recAsc = recNums.every((n, i) => i === 0 || recNums[i - 1] < n);
  if (!recNums.length) fail('G13', 'the role recommendation names no modules');
  else if (!recAsc) fail('G13', 'the role recommendation is not in module order: ' + recNums.join(' '));
  else ok('G13', 'the role recommends modules in order (' + recNums.join(', ') + ')');

  /* The panel must show what the picker chose. A gate that measures
     coverage at one limit while the interface renders another proves a
     recommendation nobody can see - which is exactly how this drifted:
     the hub asked for four modules and the gate checked five. */
  const recWanted = (PS.user.recommendedModules() || []).length;
  const recShown = recPanel.querySelectorAll('.academy-role-rec .chip').length
    || recPanel.querySelectorAll('.chip').length;
  if (recShown < recWanted) {
    fail('G13', 'the role recommends ' + recWanted + ' modules but the panel shows ' + recShown +
      ' - a recommendation the interface hides is not a recommendation');
  } else {
    ok('G13', 'the panel displays every module the picker recommended (' + recShown + ')');
  }
}

/* A module the tag map does not know can never be recommended, and the
   picker stops at four - so Modules 12 and 13 arriving as content left them
   invisible to every role, with no gate noticing. The three checks below are
   the ones that would have caught it: the tag map covers every module in the
   curriculum, it names no module that does not exist, and every module is
   actually recommended by somebody. */
const curriculumModuleNames = [...new Set((PS.ACADEMY_FUNCTIONS || []).map((f) => f.module))];
const tagNames = Object.keys(PS.ACADEMY_MODULE_TAGS || {});
const untagged = curriculumModuleNames.filter((n) => tagNames.indexOf(n) < 0);
if (untagged.length) {
  fail('G13', untagged.length + ' curriculum modules are in no role recommendation map: ' + untagged.join('; '));
} else {
  ok('G13', 'every one of the ' + curriculumModuleNames.length + ' curriculum modules is tagged for role matching');
}
const staleTags = tagNames.filter((n) => curriculumModuleNames.indexOf(n) < 0);
if (staleTags.length) {
  fail('G13', 'the role tag map names modules the curriculum does not have: ' + staleTags.join('; '));
} else {
  ok('G13', 'the role tag map names no phantom module');
}
const recommendedByAny = new Set();
for (const role of ROLES) {
  setUser(role, 'academy');
  (PS.user.recommendedModules() || []).forEach((n) => recommendedByAny.add(n));
}
const neverRecommended = curriculumModuleNames.filter((n) => !recommendedByAny.has(n));
if (neverRecommended.length) {
  fail('G13', neverRecommended.length + ' modules no role is ever pointed at: ' + neverRecommended.join('; '));
} else {
  ok('G13', 'every module is recommended by at least one of the ' + ROLES.length + ' roles');
}

/* Resume must point at work that is actually left to do. */
const probe = PS.academy.getAll();
const saved = JSON.parse(JSON.stringify(probe.completed || {}));
const firstFive = (PS.ACADEMY_FUNCTIONS || []).slice(0, 5).map((f) => f.id);
firstFive.forEach((id) => { probe.completed[id] = { done: true }; });
PS.academy.save(probe);
const nextUp = PS.academy.nextUncompleted();
if (!nextUp || firstFive.indexOf(nextUp.id) >= 0) {
  fail('G13', 'resume still points at a function that is already finished');
} else {
  ok('G13', 'resume points at the first unfinished function (' + nextUp.id + ')');
}
probe.completed = saved;
PS.academy.save(probe);

/* Every learning path is a sequence. */
if (PS.learningPaths && PS.learningPaths.sortPaths) PS.learningPaths.sortPaths();
let pathBad = 0;
(PS.learningPaths ? PS.learningPaths.PATHS : []).forEach((p) => {
  const nums = p.modules.map((m) => {
    const f = PS.byId('academy', m);
    return f ? (PS.academyModuleNumber(f.module) || 0) : 0;
  });
  if (!nums.every((n, i) => i === 0 || nums[i - 1] <= n)) {
    fail('G13', 'learning path ' + p.id + ' is not in module order: ' + nums.join(' '));
    pathBad++;
  }
});
if (!pathBad) ok('G13', 'every learning path is in module order');

/* And the table that lists them all must be too. */
w.location.hash = '#/learning-paths';
PS.renderRoute();
const tds = [...w.document.querySelectorAll('#main table tbody tr td:first-child')]
  .map((td) => parseInt(String(td.textContent).replace(/\D+/g, ''), 10))
  .filter((n) => !isNaN(n));
if (!tds.length || !tds.every((n, i) => i === 0 || tds[i - 1] <= n)) {
  fail('G13', 'the all-modules table is not in module order: ' + tds.join(' '));
} else {
  ok('G13', 'the all-modules table is in module order (' + tds.length + ' rows)');
}

setUser('beginner', 'operations');
w.location.hash = '#/home';
PS.renderRoute();
if (!/Start with the Operations Hub/.test(w.document.querySelector('#main').textContent)) {
  fail('G13', 'the operations track does not change where the Command Center starts you');
} else {
  ok('G13', 'the track changes where the product starts you');
}
setUser('beginner', 'academy');

/* ---------- G14: the knowledge library's domain map must be coherent ---------- */
console.log('\nG14  category map');
/* Only the knowledge library is a domain map. A KPI category holding
   one measure, or a calculator category holding one tool, is perfectly
   normal; a knowledge category holding one concept splits a domain on
   the list page for no reason, and is almost always a typo. */
const catCounts = {};
for (const it of PS.data.kb || []) {
  if (!it.cat) continue;
  catCounts[it.cat] = (catCounts[it.cat] || 0) + 1;
}
const strays = Object.keys(catCounts).filter((k) => catCounts[k] === 1);
if (strays.length) {
  strays.forEach((k) => fail('G14', 'a knowledge category holds a single concept, which splits a domain: ' + k));
} else {
  ok('G14', 'every knowledge domain holds more than one concept (' + Object.keys(catCounts).length + ' domains)');
}

/* ---------- G15: every explanation carries its example ---------- */
console.log('\nG15  worked examples');
/* A worked example is part of the explanation, not a separate
   reflection. The case study used to live only in the 'Think' tab, so
   somebody reading how a function works never met an example of it
   working. */
let noExample = [];
for (const f of PS.ACADEMY_FUNCTIONS || []) {
  w.location.hash = '#/academy/' + encodeURIComponent(f.id) + '?tab=learn';
  PS.renderRoute();
  if (!w.document.querySelector('#main .academy-worked-example')) noExample.push(f.id);
}
if (noExample.length) {
  fail('G15', noExample.length + ' Academy functions have no worked example in the explanation: ' + noExample.slice(0, 4).join(', '));
} else {
  ok('G15', 'every Academy function shows a worked example in the explanation (' + (PS.ACADEMY_FUNCTIONS || []).length + ' functions)');
}

/* Every calculator must be able to show itself working, and the
   example has to cover the fields or it is not an example. */
let noCalcExample = [];
let partialExample = [];
for (const c of PS.data.calc || []) {
  if (!c.example) { noCalcExample.push(c.id); continue; }
  const missing = (c.fields || []).filter((f) => c.example[f.k] === undefined && f.type !== 'check');
  if (missing.length) partialExample.push(c.id + ' (' + missing.map((f) => f.k).join(',') + ')');
}
if (noCalcExample.length) {
  fail('G15', 'calculators with no example data: ' + noCalcExample.join(', '));
} else {
  ok('G15', 'every calculator carries example data (' + (PS.data.calc || []).length + ' tools)');
}
if (partialExample.length) {
  fail('G15', 'calculator examples do not cover every field: ' + partialExample.join('; '));
} else {
  ok('G15', 'every calculator example covers every field');
}

/* The random values must respect the rules the field declares, or the
   reader concludes the tool is broken rather than that it is exploring. */
let ruleBreaks = [];
for (const c of PS.data.calc || []) {
  if (!c.example) continue;
  for (const f of c.fields || []) {
    if (f.type === 'check' || f.type === 'select' || f.type === 'date' || f.type === 'text') continue;
    for (let i = 0; i < 12; i++) {
      const v = PS.calcRandomValue(f, c.example[f.k] !== undefined ? c.example[f.k] : f.def);
      if (f.min !== undefined && f.min !== null && v < f.min) ruleBreaks.push(c.id + '.' + f.k + ' below min');
      if (f.max !== undefined && f.max !== null && v > f.max) ruleBreaks.push(c.id + '.' + f.k + ' above max');
      if (f.nonNegative && v < 0) ruleBreaks.push(c.id + '.' + f.k + ' negative');
      if (f.positive && v <= 0) ruleBreaks.push(c.id + '.' + f.k + ' not positive');
      if (f.int && v !== Math.round(v)) ruleBreaks.push(c.id + '.' + f.k + ' not whole');
    }
  }
}
if (ruleBreaks.length) {
  fail('G15', 'random values break the field rules: ' + ruleBreaks.slice(0, 5).join(', '));
} else {
  ok('G15', 'random values respect every field rule');
}

/* ---------- G16: the navigation is scoped by the track, and the current
   route always wins ---------- */
console.log('\nG16  navigation scoping');
const navSetView = (track) => {
  PS.user._cache = { name: 'T', role: 'beginner', track, company: '', avatarBg: '#000', joinedDate: '' };
  PS.buildNav();
};
const navSecs = () => [...w.document.querySelectorAll('#navRoot .nav-sec-head > span:nth-child(2)')].map((e) => e.textContent.trim());

w.location.hash = '#/home';
PS.renderRoute();
navSetView('academy');
const navLearn = navCounts(w.document);
if (navLearn.sections !== PINS.navLearnSections || navLearn.items !== PINS.navLearnItems) {
  fail('G16', 'the learn view is wrong: ' + navLearn.sections + ' sections, ' + navLearn.items + ' items (expected ' + PINS.navLearnSections + ' and ' + PINS.navLearnItems + ')');
} else {
  ok('G16', 'the learn view shows ' + PINS.navLearnSections + ' sections and ' + PINS.navLearnItems + ' items (' + navLearn.names.join(', ') + ')');
}
if (navSecs().indexOf('Learn') < 0 || navSecs().indexOf('Workbench') >= 0) {
  fail('G16', 'the learn view shows the wrong sections: ' + navSecs().join(', '));
} else {
  ok('G16', 'the learn view shows the learning navigation and hides the working one');
}
w.location.hash = '#/home';
PS.renderRoute();
navSetView('operations');
if (navSecs().indexOf('Learn') >= 0 || navSecs().indexOf('Workbench') < 0) {
  fail('G16', 'the work view shows the wrong sections: ' + navSecs().join(', '));
} else {
  ok('G16', 'the work view shows the working navigation and hides the learning one');
}
if (navSecs().indexOf('Library') < 0) {
  fail('G16', 'the shared library is not reachable from the work view');
} else {
  ok('G16', 'the shared library is reachable from both views');
}
/* The work view's shape and the system footer strip. Both were pinned only
   in tools/verify_deploy.mjs, i.e. only against the deployed site, so
   adding or losing a sidebar entry was invisible to `npm run qa`. The src
   README §3 rule says what these numbers are: a learner sees 5 sections
   and 26 items, a practitioner 6 and 30, and the system pages live in a
   permanent footer strip outside the tree. */
const navWork = navCounts(w.document);
if (navWork.sections !== PINS.navWorkSections || navWork.items !== PINS.navWorkItems) {
  fail('G16', 'the work view is wrong: ' + navWork.sections + ' sections, ' + navWork.items + ' items (expected ' + PINS.navWorkSections + ' and ' + PINS.navWorkItems + ')');
} else {
  ok('G16', 'the work view shows ' + PINS.navWorkSections + ' sections and ' + PINS.navWorkItems + ' items (' + navWork.names.join(', ') + ')');
}
if (navWork.footer !== PINS.navFooterLinks) {
  fail('G16', 'the sidebar footer has ' + navWork.footer + ' links, expected ' + PINS.navFooterLinks);
} else {
  ok('G16', 'the system pages sit in the ' + navWork.footer + '-link footer strip, outside the collapsible tree');
}
if (navLearn.names.join('|') !== 'Start|Learn|Library|Look It Up|My Work') {
  fail('G16', 'the learn view sections changed: ' + navLearn.names.join(', ') + ' (expected Start, Learn, Library, Look It Up, My Work)');
} else {
  ok('G16', 'the learn view names its sections Start, Learn, Library, Look It Up and My Work');
}
if (navWork.names.join('|') !== 'Start|Workbench|Toolkit|Library|Look It Up|My Work') {
  fail('G16', 'the work view sections changed: ' + navWork.names.join(', ') + ' (expected Start, Workbench, Toolkit, Library, Look It Up, My Work)');
} else {
  ok('G16', 'the work view names its sections Start, Workbench, Toolkit, Library, Look It Up and My Work');
}

/* The current route always wins: a page outside the current view must
   still have its section in the navigation, or the menu is a dead end.

   This is checked through the real navigation path - set the hash and
   let the router do the work - and NOT by calling buildNav() by hand.
   The first version of this check called buildNav() explicitly, and
   passed while the product was broken: the nav was built once at boot
   for a default route and never rebuilt on navigation, so a first load
   of any workbench page showed a menu that did not contain the page. */
navSetView('operations');
w.location.hash = '#/academy';
PS.renderRoute();
if (navSecs().indexOf('Learn') < 0) {
  fail('G16', 'an Academy page in the work view has no Learn section in the menu');
} else {
  ok('G16', 'a page outside the current view still shows its section');
}
navSetView('academy');
w.location.hash = '#/suppliers';
PS.renderRoute();
if (navSecs().indexOf('Workbench') < 0) {
  fail('G16', 'a Workbench page in the learn view has no Workbench section in the menu');
} else {
  ok('G16', 'a working page in the learn view still shows its section');
}

/* A first load. The nav is built at boot for a default route, so the
   first navigation has to correct it. This is the case that shipped
   broken. */
navSetView('academy');
w.location.hash = '#/rfx';
PS.renderRoute();
if (navSecs().indexOf('Workbench') < 0) {
  fail('G16', 'a first load of a workbench page does not bring its section into the menu');
} else {
  ok('G16', 'a first load of a workbench page brings its section into the menu');
}

/* The switch writes the profile field, and only the profile field. */
navSetView('academy');
w.location.hash = '#/academy';
PS.renderRoute();
PS.buildNav();
PS.acts['nav-view']({ dataset: { view: 'operations' } });
if (PS.user.getProfile().track !== 'operations') {
  fail('G16', 'the switch does not write profile.track');
} else {
  ok('G16', 'the switch writes profile.track');
}
if (w.location.hash !== '#/operations') {
  fail('G16', 'switching view from a hidden section did not navigate to the new landing page');
} else {
  ok('G16', 'switching view from a hidden section lands on the new view');
}
navSetView('academy');
w.location.hash = '#/list/sop';
PS.renderRoute();
PS.buildNav();
PS.acts['nav-view']({ dataset: { view: 'operations' } });
if (w.location.hash !== '#/list/sop') {
  fail('G16', 'switching view on a shared page moved the reader off it');
} else {
  ok('G16', 'switching view on a shared page leaves the reader where they were');
}
navSetView('academy');

/* ---------- G17: nothing in the interface has been mangled ---------- */
console.log('\nG17  text integrity');
/* A build script that pipes source through a shell can quietly turn a
   symbol into a question mark. It happened here: the seven navigation
   icons were written through a PowerShell pipe whose encoding was not
   UTF-8, and every one of them became a literal '?'. The page still
   rendered, the tests still passed, and the sidebar looked like it had
   a font problem. A question mark where a symbol belongs is always a
   bug, and it should fail the build rather than be noticed in a
   screenshot. */
const symbolish = [];
for (const g of PS.NAV_UNIFIED || []) {
  if (!g.ico || g.ico === '?' || g.ico.indexOf('?') >= 0) symbolish.push('nav icon for ' + g.sec);
}
for (const g of PS.NAV_UNIFIED || []) {
  (g.items || []).forEach((it) => {
    if (it.label && it.label.indexOf('\uFFFD') >= 0) symbolish.push(it.label);
  });
}
if (symbolish.length) {
  fail('G17', 'mangled characters in the interface: ' + symbolish.slice(0, 5).join(', '));
} else {
  ok('G17', 'no mangled characters in the navigation');
}
/* And the same check across the whole document, because the same pipe
   could have mangled anything written through it. */
const docText = w.document.documentElement.innerHTML;
if (docText.indexOf('\uFFFD') >= 0) {
  const at = docText.indexOf('\uFFFD');
  fail('G17', 'the document contains a replacement character near: ' + docText.slice(Math.max(0, at - 60), at + 20));
} else {
  ok('G17', 'the document contains no replacement characters');
}

/* ---------- G18: the Academy and the workbenches are connected ---------- */
console.log('\nG18  learning to practice');
/* The library teaches and the workbenches are where the work happens.
   A function that has no way to reach the tool where you would
   practise it is a library, not a system. */
const wbIds = Object.keys(PS.ACADEMY_WORKBENCH || {});
const funcIds = (PS.ACADEMY_FUNCTIONS || []).map((f) => f.id);
const phantom = wbIds.filter((id) => funcIds.indexOf(id) < 0);
if (phantom.length) {
  fail('G18', 'the workbench map points at functions that do not exist: ' + phantom.join(', '));
} else {
  ok('G18', 'every workbench link points at a real function');
}
let noWb = 0, badRoute = 0, used = {};
for (const f of PS.ACADEMY_FUNCTIONS || []) {
  const wb = (PS.ACADEMY_WORKBENCH || {})[f.id];
  if (!wb) { noWb++; continue; }
  used[wb] = (used[wb] || 0) + 1;
  if (!PS.routes[wb]) { badRoute++; }
}
if (badRoute) {
  fail('G18', badRoute + ' workbench links point at a route that does not exist');
} else {
  ok('G18', 'every workbench link resolves to a real route');
}
const neverUsed = Object.keys(PS.WORKBENCH_TITLES || {}).filter((k) => !used[k]);
if (neverUsed.length) {
  fail('G18', 'workbenches nothing in the Academy links to: ' + neverUsed.join(', '));
} else {
  ok('G18', 'all 8 workbenches are reachable from the Academy (' + (funcIds.length - noWb) + ' of ' + funcIds.length + ' functions)');
}

/* ---------- G19: the page you are on is in the menu ---------- */
console.log('\nG19  menu and page agree');
/* Every page that has a section in the navigation must show that
   section while you are on it. This is the whole of the 'the current
   route always wins' rule, checked across every route and in both
   views.

   It is a separate gate from G16 because the failure is different:
   G16 checks that the rule works, this checks that it is applied
   everywhere. A page that is not in the menu is a dead end, and there
   is no reason for a reader to know which pages those are. */
const navAgree = [];
for (const view of ['academy', 'operations']) {
  PS.user._cache = { name: 'T', role: 'beginner', track: view, company: '', avatarBg: '#000', joinedDate: '' };
  for (const r of routes) {
    if (r === 'notfound') continue;
    const a = routeArgs[r] || [];
    w.location.hash = '#/' + r + (a.length ? '/' + a[0] : '');
    PS.renderRoute();
    const owner = PS.navOwnerSection(r);
    if (!owner) continue;
    const shown = [...w.document.querySelectorAll('#navRoot .nav-sec-head > span:nth-child(2)')]
      .map((e) => e.textContent.trim());
    if (shown.indexOf(owner.sec) < 0) navAgree.push(view + ' ' + r + ' -> ' + owner.sec);
  }
}
if (navAgree.length) {
  fail('G19', navAgree.length + ' pages are not in the menu while you are on them: ' + navAgree.slice(0, 4).join(', '));
} else {
  ok('G19', 'every page is in the menu while you are on it, in both views');
}

/* ---------- G20: the build carries a stamp that can be read back ---------- */
console.log('\nG20  build stamp');
/* The stamp is what makes a deployment checkable: the served bytes
   carry a hash of the sources they were built from, so 'is the live
   site the build I think it is?' has an answer. It only works if the
   stamp survives minification, and the minifier rewrites string
   literals, so the readable form and the minified form have to be read
   back differently. Both are checked here. */
const stampOf = (html) => {
  const m = /PS\.BUILD\s*=\s*(['"])([^'"]*)\1/.exec(String(html));
  return m ? m[2] : null;
};
const stampSrc = stampOf(fs.readFileSync(path.join(ROOT, 'ProcureSherpa-v2.0.html'), 'utf8'));
if (!stampSrc) {
  fail('G20', 'the readable artifact carries no build stamp');
} else {
  ok('G20', 'the readable artifact carries a build stamp (' + stampSrc + ')');
}
const distPath = path.join(ROOT, 'dist', 'index.html');
if (fs.existsSync(distPath)) {
  const stampDist = stampOf(fs.readFileSync(distPath, 'utf8'));
  if (!stampDist) {
    fail('G20', 'the minified deploy build carries no build stamp, so a deployment cannot be identified');
  } else if (stampSrc && stampDist !== stampSrc) {
    fail('G20', 'the minified build has a different stamp than the readable one (' + stampDist + ' vs ' + stampSrc + ')');
  } else {
    ok('G20', 'the minified deploy build carries the same stamp (' + stampDist + ')');
  }
} else {
  /* Say so out loud. `npm run qa` runs this suite before `verify:min`
     builds dist/, so on a clean tree there is nothing to read yet, and a
     silent skip here once let a broken minifier path look like a passing
     stamp gate. verify:min re-runs the suites that matter against the
     real dist build; this line records that the check was skipped, not
     that it passed. */
  console.log('  skip [G20] no dist/index.html yet in this run, so the minified stamp was not checked here');
}
/* And the stamp has to be a hash of the sources, not a constant, so
   that a change to the source really does change the identity of the
   build. */
try {
  const manifest = fs.readFileSync(path.join(ROOT, 'src', 'manifest.txt'), 'utf8')
    .split(/\r?\n/).map((s) => s.trim()).filter((s) => s && !s.startsWith('#'));
  const toCRLF = (s) => s.replace(/\r\n/g, '\n').replace(/\n/g, '\r\n');
  const parts = manifest.map((rel) => toCRLF(fs.readFileSync(path.join(ROOT, rel), 'utf8')));
  const crypto = await import('node:crypto');
  const expected = crypto.createHash('sha256').update(parts.join(''), 'utf8').digest('hex').slice(0, 12);
  if (stampSrc && stampSrc !== expected) {
    fail('G20', 'the stamp is not the hash of the sources (' + stampSrc + ' vs ' + expected + ')');
  } else {
    ok('G20', 'the stamp is the hash of the sources');
  }
} catch (e) {
  fail('G20', 'could not recompute the source hash: ' + e.message);
}

/* ---------- G24: the curriculum, the tracks and the badges are one system ----------
   Modules 12 and 13 arrived as content and nothing noticed that the rest of
   the Academy had not moved with them: nine functions belonged to no
   learning path, the paths page still said "Four tracks" while the data had
   four, the all-modules table (built by walking the paths) silently dropped
   them, and no badge could be earned for the work. Each of those is a
   content-and-wiring defect, and the gates only measured content.

   This gate measures the wiring: every function has exactly one track, every
   track entry names a real function, every badge can actually be earned, and
   the page states the count the data holds instead of a number an author
   typed. ------------------------------------------------------------------ */
console.log('\nG24  tracks, badges and curriculum coverage');
const g24Funcs = PS.ACADEMY_FUNCTIONS || [];
const g24Paths = (PS.learningPaths && PS.learningPaths.PATHS) || [];
const g24Ids = g24Funcs.map((f) => f.id);

if (!g24Paths.length) {
  fail('G24', 'no learning paths are registered');
} else {
  const g24Home = {};
  const g24Phantom = [];
  g24Paths.forEach((p) => (p.modules || []).forEach((id) => {
    g24Home[id] = (g24Home[id] || 0) + 1;
    if (!PS.byId('academy', id)) g24Phantom.push(p.id + ' -> ' + id);
  }));
  const g24Untracked = g24Ids.filter((id) => !g24Home[id]);
  const g24Dup = Object.keys(g24Home).filter((id) => g24Home[id] > 1);
  if (g24Untracked.length) {
    fail('G24', g24Untracked.length + ' Academy functions are in no learning path: ' +
      g24Untracked.map((id) => PS.byId('academy', id).title).join('; '));
  } else {
    ok('G24', 'all ' + g24Ids.length + ' Academy functions belong to a learning path');
  }
  if (g24Dup.length) {
    fail('G24', g24Dup.length + ' functions are claimed by more than one path: ' + g24Dup.join(', '));
  } else {
    ok('G24', 'no function is claimed by two paths');
  }
  if (g24Phantom.length) {
    fail('G24', 'learning paths list functions that do not exist: ' + g24Phantom.join(', '));
  } else {
    ok('G24', 'every path entry (' + Object.keys(g24Home).length + ') resolves to a real Academy function');
  }
  const g24TierBad = g24Paths.filter((p) => !p.tier || !PS.academy.tierName(p.tier) ||
    !(PS.academy.TIERS || []).some((t) => t.id === p.tier));
  if (g24TierBad.length) {
    fail('G24', 'paths without a named level: ' + g24TierBad.map((p) => p.id).join(', '));
  } else {
    ok('G24', 'all ' + g24Paths.length + ' tracks are tagged with one of the three levels');
  }
}

/* The page must state the number the data holds. "Four tracks" was typed
   while the file held four; the day a fifth arrived the sentence became a
   claim the product could not support, and no gate reads prose. */
w.location.hash = '#/learning-paths';
PS.renderRoute();
const g24Main = w.document.querySelector('#main');
const g24Text = g24Main ? g24Main.textContent : '';
const g24Stated = (g24Text.match(/(\d+)\s+tracks/g) || []).map((s) => Number(s.match(/\d+/)[0]));
if (!g24Stated.length) {
  fail('G24', 'the learning-paths page states no track count');
} else if (g24Stated[0] !== g24Paths.length) {
  fail('G24', 'the learning-paths page says "' + g24Stated[0] + ' tracks" but the data holds ' + g24Paths.length);
} else {
  ok('G24', 'the learning-paths page states the real count (' + g24Stated[0] + ' tracks)');
}
const g24Rows = g24Main ? g24Main.querySelectorAll('table tbody tr').length : 0;
const g24ExpectedRows = g24Paths.reduce((a, p) => a + (p.modules || []).length, 0);
if (g24Rows !== g24ExpectedRows) {
  fail('G24', 'the all-modules table renders ' + g24Rows + ' rows, expected ' + g24ExpectedRows +
    ' (one per function per track)');
} else {
  ok('G24', 'the all-modules table lists all ' + g24Rows + ' function/track pairs');
}

/* Badges are derived from declared triggers, so a trigger that names a
   function the curriculum does not have is a badge nobody can ever earn.
   Before this, the triggers were eleven `if` lines and no reader could check
   them without re-deriving the whole file. */
const g24Badges = PS.academy.BADGES || [];
const g24Unearnable = [];
const g24Ruleless = [];
g24Badges.forEach((b) => {
  if (b.first || b.all) return;
  const need = b.requires || [];
  if (!need.length) { g24Ruleless.push(b.id); return; }
  const missing = need.filter((id) => !g24Ids.includes(id));
  if (missing.length) g24Unearnable.push(b.id + ' -> ' + missing.join(', '));
});
if (g24Unearnable.length) {
  fail('G24', 'badges that can never be earned, their trigger names a function that does not exist: ' +
    g24Unearnable.join('; '));
} else {
  ok('G24', 'every badge trigger names a real Academy function (' + g24Badges.length + ' badges)');
}
if (g24Ruleless.length) {
  fail('G24', 'badges with no earning rule at all: ' + g24Ruleless.join(', '));
} else {
  ok('G24', 'every badge declares how it is earned');
}
/* And the other direction: a lesson that appears in no badge rule is a lesson
   the recognition system cannot see. The roadmap claimed "every function
   covered" from v2.4 onward while seven foundation and analysis lessons
   earned nothing - the first-screen material was the least rewarded. */
const badgeCovered = {};
g24Badges.forEach((b) => (b.requires || []).forEach((id) => { badgeCovered[id] = 1; }));
const unrewarded = g24Ids.filter((id) => !badgeCovered[id]);
if (unrewarded.length) {
  fail('G24', unrewarded.length + ' Academy functions appear in no badge rule: ' + unrewarded.join(', '));
} else {
  ok('G24', 'every Academy function contributes to at least one badge (' + g24Ids.length + ' functions, ' + g24Badges.length + ' badges)');
}
const g24DupBadgeIds = g24Badges.map((b) => b.id).filter((id, i, a) => a.indexOf(id) !== i);
if (g24DupBadgeIds.length) fail('G24', 'duplicate badge ids: ' + g24DupBadgeIds.join(', '));
else ok('G24', 'badge ids are unique');

/* And the derivation has to work both ways: earn it, then take the
   completion away and the award has to be withdrawn. This was previously
   asserted for no badge at all. */
const g24Probe = PS.academy.getAll();
const g24Saved = JSON.parse(JSON.stringify(g24Probe));
try {
  const g24Target = g24Badges.filter((b) => (b.requires || []).length > 1)[0];
  if (!g24Target) {
    fail('G24', 'no multi-function badge exists to test the derivation with');
  } else {
    const g24Blank = { completed: {}, scores: {}, badges: {}, current: '' };
    PS.academy.save(g24Blank);
    g24Target.requires.forEach((id) => PS.academy.markCompleted(id));
    const g24Earned = PS.academy.getAll().badges;
    if (!g24Earned[g24Target.id]) {
      fail('G24', 'completing every function in ' + g24Target.id + "'s rule did not award it");
    } else {
      ok('G24', 'completing ' + g24Target.requires.length + ' functions awards ' + g24Target.id);
    }
    const g24Partial = PS.academy.getAll();
    delete g24Partial.completed[g24Target.requires[g24Target.requires.length - 1]];
    PS.academy.save(g24Partial);
    PS.academy.checkBadges();
    const g24After = PS.academy.getAll().badges;
    if (g24After[g24Target.id]) {
      fail('G24', 'the ' + g24Target.id + ' badge survived after its trigger was undone - badges are not derived from the record');
    } else {
      ok('G24', 'undoing a trigger withdraws ' + g24Target.id + ' - badges are derived, not accumulated');
    }
  }
} finally {
  PS.academy.save(g24Saved);
}

/* Pages that state a curriculum count in prose have to state the registry's
   number. The Command Center sentence was typed, the curriculum grew by two
   modules in src/content/, and the home page kept advertising the smaller
   product. This scans the pages a reader trusts to orient themselves - not
   the changelog, whose older entries are dated statements about the past and
   are meant to keep the numbers they had on that date. */
const prosePages = ['#/home', '#/academy', '#/learning-paths', '#/academy-progress'];
const proseBad = [];
for (const route of prosePages) {
  w.location.hash = route;
  PS.renderRoute();
  const prose = (w.document.querySelector('#main') || { textContent: '' }).textContent.replace(/\s+/g, ' ');
  for (const m of prose.matchAll(/(\d+)\s+functions?\b/g)) {
    if (Number(m[1]) !== g24Ids.length) {
      proseBad.push(route + ' says "' + m[0] + '" while the registry holds ' + g24Ids.length + ' functions');
    }
  }
  for (const m of prose.matchAll(/(\d+)\s+modules?\b/g)) {
    if (Number(m[1]) !== PINS.academyModules && Number(m[1]) !== g24Paths.length) {
      proseBad.push(route + ' says "' + m[0] + '" while the curriculum holds ' + PINS.academyModules + ' modules');
    }
  }
}
if (proseBad.length) {
  fail('G24', 'pages stating a curriculum count the data does not support: ' + proseBad.join(' | '));
} else {
  ok('G24', 'the orienting pages state real counts, not typed numbers (' + prosePages.join(', ') + ')');
}

/* ---------- G25: the product does not claim an authority it does not have ----------
   Procure Sherpa is not an authorized issuer of procurement credentials. The
   certificate route already says so, and the Academy still scores exams,
   awards badges and prints a page called "Transcript" - which is the surface
   where a reader could form a claim the product cannot support. Nothing
   asserted either half of that: no gate read the wording, and the disclaimer
   could be deleted from any of the three pages without a test noticing.

   The ban list is written as assertions of authority rather than as words,
   because the curriculum legitimately discusses accredited suppliers and
   certification bodies. A route page is the scope, for the same reason. */
console.log('\nG25  credential honesty and the content report');
const CREDENTIAL_CLAIMS = [
  /is accredited/i, /accredited by/i, /nationally recogni[sz]ed/i, /recogni[sz]ed qualification/i,
  /Executive Certificate/i, /Master of (Procurement|Supply|Sourcing)/i,
  /this certificate (certifies|confirms|attests)/i, /certified by Procure Sherpa/i,
  /ISO\s*\d{4}\s*certified/i, /award(s|ed)? (you )?a (recognised|certified|accredited)/i
];
const credentialRoutes = ['#/certificate', '#/exams', '#/academy-progress', '#/portfolio', '#/assessment', '#/academy', '#/learning-paths'];
const claimHits = [];
for (const route of credentialRoutes) {
  w.location.hash = route;
  PS.renderRoute();
  const text = (w.document.querySelector('#main') || { textContent: '' }).textContent;
  for (const re of CREDENTIAL_CLAIMS) {
    const m = text.match(re);
    if (m) claimHits.push(route + ' says "' + m[0] + '"');
  }
}
if (claimHits.length) {
  fail('G25', 'a page claims an authority the product does not have: ' + claimHits.join(' | '));
} else {
  ok('G25', 'no credential-bearing page asserts accreditation, recognition or certification (' + credentialRoutes.length + ' pages read)');
}

/* The honest line has to be on the pages that report a result, not only on
   the one that is switched off. */
const disclaimerNeeded = ['#/certificate', '#/exams', '#/academy-progress'];
const missingDisclaimer = [];
for (const route of disclaimerNeeded) {
  w.location.hash = route;
  PS.renderRoute();
  const text = (w.document.querySelector('#main') || { textContent: '' }).textContent;
  if (!/not an authorized issuer|not a legally authorized issuer/i.test(text)) missingDisclaimer.push(route);
}
if (missingDisclaimer.length) {
  fail('G25', 'pages reporting a result without saying the result certifies nothing: ' + missingDisclaimer.join(', '));
} else {
  ok('G25', 'every page that reports a result states that it is not a credential (' + disclaimerNeeded.join(', ') + ')');

/* Where the teaching material comes from, and what its examples are. The
   product's own editorial rule is that an invented case study must not be
   presented as a real one, and a lesson page that stops saying "these
   figures are constructed" is the way a learning product drifts into
   fabricated authority without anyone deciding to. */
{
  const lessonHashes = ['#/academy/func-obligation-register?tab=learn', '#/academy/func-claims-and-remedies?tab=think'];
  const noOrigin = [];
  for (const h of lessonHashes) {
    w.location.hash = h;
    PS.renderRoute();
    const txt = w.document.querySelector('#main').textContent;
    if (!/illustrative/i.test(txt) || !/constructed/i.test(txt)) noOrigin.push(h);
  }
  if (noOrigin.length) {
    fail('G25', 'lesson pages with no statement of where the material comes from: ' + noOrigin.join(', '));
  } else {
    ok('G25', 'lesson pages state that the material is written for this product and the examples are constructed');
  }
  /* The page-level disclaimer is not enough: a reader who jumps straight to
     the worked example never reaches the footer. The example itself carries
     the provenance line, on every surface that renders one. */
  const workedHash = '#/academy/func-obligation-register?tab=learn';
  w.location.hash = workedHash;
  PS.renderRoute();
  const card = w.document.querySelector('.academy-worked-example');
  if (!card) {
    fail('G25', 'the worked example on ' + workedHash + ' does not render a .academy-worked-example card, so there is nothing for the provenance label to sit on');
  } else if (!/illustrative/i.test(card.textContent) || !/constructed/i.test(card.textContent)) {
    fail('G25', 'the worked example card carries no constructed/illustrative provenance label');
  } else {
    ok('G25', 'the lesson worked example is labelled as constructed on the card itself');
  }
  const exampleHashes = ['#/calc/calc-tco', '#/scen/scn-new-purchase'];
  const noExampleLabel = [];
  for (const h of exampleHashes) {
    w.location.hash = h;
    PS.renderRoute();
    const txt = w.document.querySelector('#main').textContent;
    if (!/illustrative/i.test(txt) || !/constructed/i.test(txt)) noExampleLabel.push(h);
  }
  if (noExampleLabel.length) {
    fail('G25', 'pages that render example or scenario data with no illustrative provenance label: ' + noExampleLabel.join(', '));
  } else {
    ok('G25', 'calculator and scenario pages label their example data as illustrative');
  }
  const allSrc = ['src/pages/08g1_pages_academy.js', 'src/pages/08g2_pages_quiz_engine.js']
    .map((f) => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n');
  if (/Real-?World (Enterprise|Situation|Rationale)/i.test(allSrc)) {
    fail('G25', 'an invented case is labelled as a real-world one again - constructed examples must read as illustrative');
  } else {
    ok('G25', 'no invented case study is presented as a real-world report');
  }
}
}

/* The content-quality report the build already computes, shown to the person
   who would have to act on it. */
const qaProblems = PS.contentQA();
w.location.hash = '#/audit';
PS.renderRoute();
const auditText = (w.document.querySelector('#main') || { textContent: '' }).textContent;
if (!/Content quality report/i.test(auditText)) {
  fail('G25', 'PS.contentQA() is still only a console.warn - the #/audit page does not show it');
} else if (qaProblems.length === 0 ? !/no issues/i.test(auditText) : !auditText.includes(qaProblems.length + ' issue')) {
  fail('G25', 'the #/audit content report disagrees with PS.contentQA() (which returns ' + qaProblems.length + ')');
} else {
  ok('G25', 'the audit page shows the content report and agrees with PS.contentQA() (' + qaProblems.length + ' problems)');
}

/* ---------- G26: an exam attempt means answered questions ----------
   Reported by the owner: clicking Next through a practice exam without
   answering anything produced "70 percent". The engine had in fact graded it
   0/5 and NOT PASSED - what read as a score was the pass mark, rendered as a
   fourth stat tile in the same size and weight as the score and coloured by
   the outcome. Two defects, both fixed, and both asserted here so neither can
   come back: a blank attempt must not be submittable or recordable, and the
   pass mark must never be presented as if it were the reader's result. */
console.log('\nG26  exam attempt integrity');
/* jsdom has no scrollIntoView, and the exam runner calls it on every render.
   The other harnesses stub it the same way; without it this gate dies on the
   second render instead of reporting anything. */
w.HTMLElement.prototype.scrollIntoView = w.HTMLElement.prototype.scrollIntoView || function () {};
w.location.hash = '#/exams';
PS.renderRoute();
const examsH1 = (w.document.querySelector('#main h1') || { textContent: '' }).textContent;
if (/certification/i.test(examsH1)) {
  fail('G26', 'the exams page is still titled "' + examsH1.trim() + '" while the product issues no credentials');
} else {
  ok('G26', 'the exams page calls itself practice, not certification ("' + examsH1.trim() + '")');
}
const startBtn = [...w.document.querySelectorAll('#main [data-act="exam-start"]')][0];
if (!startBtn) {
  fail('G26', 'no exam bank card offers a start button');
} else {
  startBtn.click();
  const sess = PS.exams.session;
  if (!sess || !sess.questions.length) {
    fail('G26', 'starting an exam did not create a session');
  } else {
    /* Walk to the end pressing Next only - no answers at all. */
    for (let i = 0; i < sess.questions.length + 2; i++) {
      const nx = w.document.querySelector('#examRunner [data-act="exam-next"]');
      if (nx) nx.click();
    }
    const attemptsBefore = PS.exams.history().length;
    const submitBlank = w.document.querySelector('#examRunner [data-act="exam-submit"]');
    if (!submitBlank) {
      fail('G26', 'a blank exam reached the last question with no submit control');
    } else {
      submitBlank.click();
      const attemptsAfter = PS.exams.history().length;
      if (attemptsAfter !== attemptsBefore) {
        fail('G26', 'a completely unanswered exam was recorded as an attempt');
      } else if (!PS.exams.session || PS.exams.session.done) {
        fail('G26', 'blocking the blank submission also ended the session, so the reader cannot fix it');
      } else {
        ok('G26', 'a blank exam cannot be submitted or recorded - the session stays open on the first unanswered question');
      }
    }
    /* Now answer every question the way a reader does: click an option. */
    const total = PS.exams.session.questions.length;
    for (let i = 0; i < total; i++) {
      PS.exams.session.current = i;
      PS.exams.renderExamRunner();
      const radio = w.document.querySelector('#examRunner input[name="examOpt"]');
      if (!radio) break;
      radio.checked = true;
      radio.dispatchEvent(new w.Event('change', { bubbles: true }));
    }
    const answeredCount = Object.keys(PS.exams.session.answers).length;
    if (answeredCount !== total) {
      fail('G26', 'clicking an option on each question recorded ' + answeredCount + ' of ' + total + ' answers');
    } else {
      ok('G26', 'selecting an option records the answer for that question (' + total + ' of ' + total + ')');
    }
    const submit = w.document.querySelector('#examRunner [data-act="exam-submit"]');
    submit.click();
    const confirm = w.document.querySelector('[data-modal="ok"]');
    if (confirm) confirm.click();
    const attempt = PS.exams.history().slice(-1)[0];
    if (!attempt) fail('G26', 'a fully answered exam recorded no attempt');
    else if (attempt.answered !== total) fail('G26', 'the recorded attempt says ' + attempt.answered + ' answered of ' + total);
    else ok('G26', 'the graded attempt records answered ' + attempt.answered + '/' + total + ' at ' + attempt.pct + '%');

    const tiles = [...w.document.querySelectorAll('#examRunner .stat')];
    const tileLabels = tiles.map((t) => ((t.querySelector('.s-lab') || {}).textContent || '').trim());
    const barePassMark = tileLabels.some((l) => /^pass mark$/i.test(l));
    if (!tiles.length) {
      fail('G26', 'the result panel rendered no stats at all');
    } else if (barePassMark) {
      fail('G26', 'the result panel shows the pass mark as its own stat tile again: ' + tileLabels.join(' | '));
    } else if (!tileLabels.some((l) => /pass mark/i.test(l))) {
      fail('G26', 'the result panel no longer states the pass mark anywhere, so the score has no reference: ' + tileLabels.join(' | '));
    } else if (!tileLabels.some((l) => /answered/i.test(l))) {
      fail('G26', 'the result panel does not say how many questions were answered: ' + tileLabels.join(' | '));
    } else {
      ok('G26', 'result tiles are the reader\'s own numbers only (' + tileLabels.join(' | ') + ')');
    }
    PS.exams.stopTimer();
    PS.exams.session = null;
  }
}

/* ---------- G27: the progress rails say what the record says ----------
   A progress bar is the one element a learner trusts to answer "how far am I
   in this?". It is also the easiest thing in a redesign to make decorative:
   rendered from a count that disagrees with the completion record, it looks
   alive and lies. So the rails are compared against the data, per module,
   with a learner mid-way through the curriculum rather than at either extreme.
   jsdom has no scrollIntoView; the Academy renders it on some paths. */
console.log('\nG27  progress rails tell the truth');
w.HTMLElement.prototype.scrollIntoView = w.HTMLElement.prototype.scrollIntoView || function () {};
const g27Probe = PS.academy.getAll();
const g27Keep = JSON.parse(JSON.stringify(g27Probe));
try {
  const g27Seq = PS.academy.sequence();
  /* Master an uneven set so no module can pass by accident: 2 of module 1,
     all of module 2, none of module 3. */
  PS.academy._cache = null;
  PS.academy.save({ completed: {}, scores: {}, badges: {}, current: '' });
  ['func-mission-value', 'func-spend-analysis', 'func-requirement-scope', 'func-rfx-strategy', 'func-quote-normalization']
    .forEach((id) => PS.academy.markCompleted(id));
  const g27Done = Object.keys(PS.academy.getAll().completed).filter((k) => PS.academy.getAll().completed[k]).length;

  w.location.hash = '#/academy';
  PS.renderRoute();
  const g27Main = w.document.querySelector('#main');
  const rails = [...g27Main.querySelectorAll('.module-progress')];
  const moduleNames = [...new Set(PS.ACADEMY_FUNCTIONS.map((f) => f.module))];
  if (rails.length !== moduleNames.length) {
    fail('G27', 'the hub renders ' + rails.length + ' progress rails for ' + moduleNames.length + ' modules');
  } else {
    ok('G27', 'every module on the hub carries a progress rail (' + rails.length + ')');
  }

  /* Matched by the module name the group actually displays, not by index:
     if the hub ever renders the groups in an order that is not the order the
     data is read in, an index pairing would compare one module's bar against
     another module's record and call the difference a pass. */
  const wrong = [];
  rails.forEach((rail) => {
    const group = rail.closest('.module-group');
    const headName = group ? (group.querySelector('h2') || { textContent: '' }).textContent.trim() : '';
    const modName = moduleNames.filter((n) => n === headName)[0];
    if (!modName) { wrong.push('a rail sits under a heading no module matches ("' + headName + '")'); return; }
    const inMod = PS.ACADEMY_FUNCTIONS.filter((f) => f.module === modName);
    const done = inMod.filter((f) => PS.academy.isCompleted(f.id)).length;
    const shown = (rail.querySelector('.module-progress-count') || { textContent: '' }).textContent.trim();
    const fill = (rail.querySelector('.module-progress-fill') || {}).style;
    const wantPct = Math.round((done / inMod.length) * 100) + '%';
    if (shown !== done + '/' + inMod.length) wrong.push(modName + ' shows ' + shown + ', record says ' + done + '/' + inMod.length);
    if (fill && fill.width !== wantPct) wrong.push(modName + ' bar is ' + fill.width + ', should be ' + wantPct);
  });
  if (wrong.length) fail('G27', 'progress rails disagree with the completion record: ' + wrong.join(' | '));
  else ok('G27', 'every rail count and bar width matches the completion record exactly');

  const summary = (g27Main.querySelector('.section-sub') || { textContent: '' }).textContent;
  const summaryCount = (summary.match(/mastered\s+(\d+)\s+of\s+(\d+)/i) || []).slice(1);
  if (summaryCount.length !== 2) {
    fail('G27', 'the curriculum summary line does not state a mastered count: "' + summary.trim().slice(0, 90) + '"');
  } else if (Number(summaryCount[0]) !== g27Done || Number(summaryCount[1]) !== PS.ACADEMY_FUNCTIONS.length) {
    fail('G27', 'the summary says ' + summaryCount[0] + ' of ' + summaryCount[1] + ', the record says ' + g27Done + ' of ' + PS.ACADEMY_FUNCTIONS.length);
  } else {
    ok('G27', 'the hub summary states the real position (' + summaryCount[0] + ' of ' + summaryCount[1] + ' mastered)');
  }
  if (!/hours? of lessons left|curriculum is complete/i.test(summary)) {
    fail('G27', 'the hub summary states no remaining-time estimate: "' + summary.trim().slice(0, 90) + '"');
  } else {
    ok('G27', 'the hub tells the learner what is still to read (' + (summary.match(/about [0-9.]+ (hours?|minutes?)/i) || [''])[0] + ')');
  }

  /* Position on the lesson page has to be the position in the taught
     sequence, not an index into whatever order the array happens to be in. */
  const midFunc = g27Seq[8];
  w.location.hash = '#/academy/' + encodeURIComponent(midFunc.id);
  PS.renderRoute();
  const chips = [...w.document.querySelectorAll('#main .chip')].map((c) => c.textContent.replace(/\s+/g, ' '));
  const posChip = chips.filter((c) => /Lesson \d+ of \d+/.test(c))[0];
  if (!posChip) {
    fail('G27', 'the lesson page states no position in the curriculum');
  } else if (!new RegExp('Lesson ' + 9 + ' of ' + g27Seq.length).test(posChip)) {
    fail('G27', 'the lesson page says "' + posChip.trim() + '" but the function is number 9 of ' + g27Seq.length + ' in the taught sequence');
  } else {
    ok('G27', 'the lesson page states its place in the sequence (' + posChip.trim().replace(/^📍\s*/, '') + ')');
  }
  /* The hub's filters and its jump strip. Seventeen modules and fifty-one
     lessons is long enough that these are how anyone navigates, and a filter
     that quietly ignores the other one - or a strip that counts something the
     cards below do not show - is worse than no filter at all. */
  const g27Mastered = g27Seq.filter((f) => PS.academy.isCompleted(f.id)).length;
  const g27Cards = (sel) => { w.location.hash = sel; PS.renderRoute(); return w.document.querySelectorAll('#main .func-card').length; };
  const mCards = g27Cards('#/academy?status=mastered');
  const uCards = g27Cards('#/academy?status=unread');
  const allCards = g27Cards('#/academy');
  if (mCards !== g27Mastered) {
    fail('G27', 'the "Mastered" filter shows ' + mCards + ' lessons but ' + g27Mastered + ' are recorded as mastered');
  } else if (uCards + mCards !== allCards) {
    fail('G27', 'the status filters do not partition the curriculum: ' + uCards + ' unread + ' + mCards + ' mastered against ' + allCards + ' shown');
  } else {
    ok('G27', 'the hub status filters agree with the completion record and partition it (' + uCards + ' unread + ' + mCards + ' mastered = ' + allCards + ')');
  }

  /* Level and status must compose rather than reset each other. */
  const execTotal = g27Seq.filter((f) => f.tier === 'executive').length;
  const execMastered = g27Seq.filter((f) => f.tier === 'executive' && PS.academy.isCompleted(f.id)).length;
  const combo = g27Cards('#/academy?tier=executive&status=mastered');
  if (combo !== execMastered) {
    fail('G27', 'tier=executive&status=mastered shows ' + combo + ' lessons, expected ' + execMastered + ' of ' + execTotal + ' executive functions');
  } else {
    ok('G27', 'the level and status filters compose (' + combo + ' of ' + execTotal + ' executive lessons mastered)');
  }

  /* The jump strip has to count what the cards on the page actually are. */
  w.location.hash = '#/academy';
  PS.renderRoute();
  const stripChips = [...w.document.querySelectorAll('#main .module-index-chip')];
  const stripBad = [];
  stripChips.forEach((chip) => {
    const href = chip.getAttribute('href') || '';
    const target = w.document.querySelector('#main ' + href.replace('#', '#'));
    const cardCount = target ? target.querySelectorAll('.func-card').length : -1;
    const parts = String(chip.querySelector('.mi-count').textContent).split('/');
    if (Number(parts[1]) !== cardCount) stripBad.push(href + ' chip says /' + parts[1] + ' but the module holds ' + cardCount);
  });
  if (!stripChips.length) {
    fail('G27', 'the hub has no module index strip, so a ' + g27Seq.length + '-lesson page offers no way to navigate it');
  } else if (stripBad.length) {
    fail('G27', 'the module index strip disagrees with the curriculum below it: ' + stripBad.slice(0, 3).join('; '));
  } else {
    ok('G27', 'the module index strip lists ' + stripChips.length + ' modules and each count matches the lessons under it');
  }

  /* A filter combination with nothing in it must say so and offer the way
     back, rather than rendering a page that looks broken. */
  w.location.hash = '#/academy?tier=executive&status=attempted';
  PS.renderRoute();
  const emptyBox = w.document.querySelector('#main .empty');
  const emptyCards = w.document.querySelectorAll('#main .func-card').length;
  if (emptyCards === 0 && !emptyBox) {
    fail('G27', 'an empty filter result renders no lessons and no explanation');
  } else if (emptyCards === 0 && emptyBox && !emptyBox.querySelector('a')) {
    fail('G27', 'the empty filter result explains itself but offers no way back to the full curriculum');
  } else {
    ok('G27', 'an empty filter result states why and links back to the whole curriculum');
  }

  /* ---- Revision scheduling: the dates behind the review queue ----
     A queue that invents a study date, or that calls a lesson overdue
     when nothing was ever recorded, is worse than no queue: it is a
     progress claim with no evidence behind it. These assertions measure
     the ladder against the record the browser actually holds. */
  const DAY = 86400000;
  const setAcademy = (obj) => { PS.academy._cache = null; PS.academy.save(obj); PS.academy._cache = null; };

  setAcademy({ completed: {}, scores: {}, badges: {}, current: 'func-mission-value' });
  const freshQ = PS.revise.queue();
  if (freshQ.tracked !== 0 || freshQ.due.length !== 0) {
    fail('G27', 'a learner with no recorded progress is shown ' + freshQ.tracked + ' scheduled and ' + freshQ.due.length + ' due - nothing may be due before anything was read');
  } else {
    ok('G27', 'a fresh record schedules nothing: no lesson is invented as due');
  }

  const rA = PS.ACADEMY_FUNCTIONS[3].id;
  setAcademy({ completed: {}, studied: { [rA]: true }, scores: {}, badges: {}, log: { [rA]: { studied: Date.now() - 2 * DAY } }, current: rA });
  const studied = PS.revise.nextDue(rA);
  if (!studied || studied.days !== 3 || studied.inherited) {
    fail('G27', 'a lesson studied two days ago with no quiz should sit on the 3-day step of the shorter ladder, got ' + JSON.stringify(studied));
  } else if (Date.now() >= studied.due) {
    fail('G27', 'a lesson studied two days ago is already marked due');
  } else {
    ok('G27', 'a lesson studied two days ago without a quiz is scheduled ahead, not overdue (' + PS.revise.whenPhrase(studied.due) + ')');
  }

  const rB = PS.ACADEMY_FUNCTIONS[4].id;
  const passedAgo = new Date(Date.now() - 30 * DAY).toISOString();
  setAcademy({ completed: { [rB]: true }, scores: { [rB]: { score: 4, total: 5, pct: 80, date: passedAgo } }, badges: {}, log: {}, current: rB });
  const passed = PS.revise.nextDue(rB);
  const qPassed = PS.revise.queue();
  if (!passed || passed.days !== 7 || !passed.strong) {
    fail('G27', 'a lesson passed at 80% thirty days ago should be on the 7-day step of the longer ladder, got ' + JSON.stringify(passed));
  } else if (Date.now() < passed.due || qPassed.due.filter((x) => x.id === rB).length !== 1) {
    fail('G27', 'a lesson passed thirty days ago is not listed as due');
  } else if (passed.last !== Date.parse(passedAgo)) {
    fail('G27', 'the schedule is not measuring from the quiz date the record already holds');
  } else {
    ok('G27', 'a lesson passed thirty days ago is due now, measured from the real quiz date in the record');
  }

  PS.revise.markReviewed(rB);
  const afterOne = PS.revise.nextDue(rB);
  PS.revise.markReviewed(rB);
  const afterTwo = PS.revise.nextDue(rB);
  if (!(afterOne.days > passed.days) || !(afterTwo.days > afterOne.days)) {
    fail('G27', 'marking a review did not lengthen the interval: ' + passed.days + ' -> ' + afterOne.days + ' -> ' + afterTwo.days);
  } else if (afterTwo.reps !== 2) {
    fail('G27', 'the review count did not persist (expected 2, got ' + afterTwo.reps + ')');
  } else {
    ok('G27', 'each marked review moves the lesson up the ladder (' + passed.days + ' -> ' + afterOne.days + ' -> ' + afterTwo.days + ' days)');
  }

  const rC = PS.ACADEMY_FUNCTIONS[5].id;
  setAcademy({ completed: { [rB]: true, [rC]: true }, scores: {}, badges: {}, log: {}, current: rC });
  const inherited = PS.revise.nextDue(rC);
  const qInherited = PS.revise.queue();
  if (!inherited || !inherited.inherited || Date.now() >= inherited.due) {
    fail('G27', 'a completion with no date anywhere must be scheduled from today and labelled, not called overdue');
  } else if (qInherited.noDate !== 2) {
    fail('G27', 'the queue counts ' + qInherited.noDate + ' undated completions but the record holds 2');
  } else {
    ok('G27', 'undated completions are scheduled from today and counted as having no recorded date (' + qInherited.noDate + ')');
  }

  setAcademy({ completed: { [rB]: true, [rC]: true }, studied: { [rA]: true }, scores: { [rB]: { score: 4, total: 5, pct: 80, date: passedAgo } }, badges: {}, log: { [rA]: { studied: Date.now() - 2 * DAY } }, current: rA });
  const qPage = PS.revise.queue();
  w.location.hash = '#/revise';
  PS.renderRoute();
  const revText = w.document.querySelector('#main').textContent;
  const statedDue = (revText.match(/(\d+)\s+lessons?\s+due/) || [])[1];
  const pageLinks = [...w.document.querySelectorAll('#main a[href^="#/academy/"]')].length;
  if (Number(statedDue) !== qPage.due.length) {
    fail('G27', 'the review queue page states ' + statedDue + ' due while PS.revise.queue() reports ' + qPage.due.length);
  } else if (!pageLinks) {
    fail('G27', 'the review queue lists no way into the lessons it says are due');
  } else if (!/dates were recorded|no date/.test(revText) || !/7, 21, 60/.test(revText)) {
    fail('G27', 'the review queue does not state how its dates are worked out, or hides the undated completions');
  } else {
    ok('G27', 'the review queue page states the same counts the scheduler computes and explains the ladder');
  }
  setAcademy(g27Keep);
} finally {
  PS.academy._cache = null;
  PS.academy.save(g27Keep);
}

/* ---------- G28: the glossary's "Where to use it" column ----------
   §31 promised every glossary entry would link to relevant content. All 35
   records converted from v1.1.0 shipped `rel: {}`, so the column rendered its
   muted placeholder for every row and nothing noticed: G5 counts inbound links
   only, and an empty relation set is not an unresolvable reference, so
   check_rels had nothing to report either. This gate is what makes the column
   a requirement instead of a layout. */
console.log('\nG28  glossary links render');
const g28Terms = (PS.data.gloss || []);
const g28Keys = PS.GLOSS_LINK_KEYS || ['concepts', 'sops', 'calcs', 'templates'];
const g28Type = PS.GLOSS_LINK_TYPE || { concepts: 'kb', sops: 'sop', calcs: 'calc', templates: 'tpl' };
const g28Empty = [];
const g28Dead = [];
for (const g of g28Terms) {
  const rel = g.rel || {};
  const total = g28Keys.reduce((a, k) => a + ((rel[k] || []).length), 0);
  if (!total) { g28Empty.push(g.id); continue; }
  for (const k of g28Keys) {
    for (const id of (rel[k] || [])) {
      if (!PS.byId(g28Type[k], id)) g28Dead.push(g.id + ' -> ' + k + '/' + id);
    }
  }
}
if (g28Empty.length) {
  fail('G28', g28Empty.length + ' glossary terms still ship no relations, so their row renders the empty placeholder: ' + g28Empty.slice(0, 8).join(', '));
} else {
  ok('G28', 'all ' + g28Terms.length + ' glossary terms carry relations for the "Where to use it" column');
}
if (g28Dead.length) {
  fail('G28', 'glossary relations that resolve to nothing: ' + g28Dead.slice(0, 8).join(', '));
} else {
  ok('G28', 'every glossary relation resolves to a registered concept, SOP, calculator or template');
}

/* And the column has to actually render chips, not just hold the data. */
w.location.hash = '#/glossary';
PS.renderRoute();
const g28Rows = [...w.document.querySelectorAll('#main table tbody tr')];
const g28Blank = g28Rows.filter((r) => /:|—|-\s*$/.test((r.lastElementChild || { textContent: '' }).textContent.trim()) && (r.lastElementChild || { textContent: '' }).textContent.trim().length < 3);
if (!g28Rows.length) {
  fail('G28', 'the glossary page renders no term table');
} else if (g28Blank.length) {
  fail('G28', g28Blank.length + ' glossary rows render the placeholder instead of links');
} else {
  ok('G28', 'the glossary table renders ' + g28Rows.length + ' rows, every one with links in the "Where to use it" column');
}


/* ---------- G29: the v3 theme is the only source of colour ----------
   The 3.0 revamp replaced the palette wholesale. Two ways that silently
   regress: a page writes a hex into an inline style (it looked right in the
   theme the author was viewing, and is invisible in the other one), or a
   chart hard-codes a fill, because an SVG presentation attribute cannot
   resolve var() at all. Both happened in v2 and neither was ever measured. */
console.log('\nG29  the theme owns every colour');
{
  const ALLOWED = /^#(?:fff|ffffff|000|000000)$/i; /* opaque ink on a saturated fill: theme-independent */
  const dirs = ['src/pages', 'src/core'];
  const offenders = [];
  for (const d of dirs) {
    for (const f of fs.readdirSync(path.join(ROOT, d))) {
      if (!f.endsWith('.js')) continue;
      const text = fs.readFileSync(path.join(ROOT, d, f), 'utf8')
        /* A token fallback is not a hard-coded colour: `var(--danger,#dc3545)`
           resolves to the theme and only paints the hex if the token is gone. */
        .replace(/var\(--[a-z0-9-]+\s*,\s*#[0-9a-fA-F]{3,8}\)/g, 'var(--token)');
      text.split(/\r?\n/).forEach((line, i) => {
        const m = line.match(/style="[^"]*?#[0-9a-fA-F]{3,8}/g) || [];
        m.forEach((hit) => {
          const hex = (hit.match(/#[0-9a-fA-F]{3,8}/g) || []).filter((h) => !ALLOWED.test(h));
          if (hex.length) offenders.push(d + '/' + f + ':' + (i + 1) + ' ' + hex.join(' '));
        });
      });
    }
  }
  if (offenders.length) {
    fail('G29', 'generated markup paints ' + offenders.length + ' inline colour(s) that no theme token owns: ' + offenders.slice(0, 6).join(', ') +
      ' - use var(--accent)/var(--ok)/var(--danger), or a class');
  } else {
    ok('G29', 'no inline colour in generated markup escapes the theme tokens');
  }

  const chartsSrc = fs.readFileSync(path.join(ROOT, 'src', 'core', '03j_charts.js'), 'utf8');
  const frozen = (chartsSrc.match(/(?:fill|stroke|stop-color)="#[0-9a-fA-F]{3,8}"/g) || []);
  if (frozen.length) {
    fail('G29', frozen.length + ' chart colour(s) are hard-coded and will not follow the theme: ' + frozen.slice(0, 5).join(', ') +
      ' - resolve them through PS.chart.tokens()');
  } else {
    ok('G29', 'charts resolve their palette from the theme at render time (PS.chart.tokens)');
  }

  const cssText = fs.readFileSync(HTML, 'utf8');
  const railTokens = ['--rail', '--rail-2', '--rail-line', '--rail-text', '--rail-dim', '--rail-hi'];
  const missing = railTokens.filter((tk) => !cssText.includes(tk + ':'));
  if (missing.length) {
    fail('G29', 'the navigation rail tokens are incomplete: ' + missing.join(', '));
  } else if (!/\.sidebar\{[^}]*var\(--rail\)/.test(cssText.replace(/\s+/g, ''))) {
    fail('G29', 'the sidebar is no longer painted from the rail tokens');
  } else {
    ok('G29', 'the navigation rail is built from ' + railTokens.length + ' theme tokens, in both themes');
  }

  const lessonHtml = (() => {
    w.location.hash = '#/academy/func-mission-value?tab=learn';
    PS.renderRoute();
    return w.document.querySelector('#main');
  })();
  const lessonBody = lessonHtml.querySelector('.lesson-body');
  if (!lessonBody) {
    fail('G29', 'the lesson page renders no .lesson-body, so the reading typography is not applied to any prose');
  } else if (!/\.lesson-body\s+p\s*,\s*\.lesson-body\s+li\{font-family:var\(--font-read\)/.test(cssText.replace(/\r/g, ''))) {
    fail('G29', '.lesson-body exists but the shipped CSS sets no reading face for it');
  } else {
    ok('G29', 'lesson prose is wrapped and set in the reading face (--font-read) by the shipped CSS');
  }
}

/* ---------- G30: the lesson page works as a lesson ----------
   The completion action used to exist only inside the fifth tab, so a reader
   who finished the mission had no way to record it without discovering the
   laboratory page. These rules assert the closing block, the next-lesson card
   and the section jumps from the rendered page - and that a jump link has a
   target, because a table of contents that scrolls nowhere is worse than none. */
console.log('\nG30  the lesson page works as a lesson');
{
  const g30Funcs = PS.ACADEMY_FUNCTIONS || [];
  const g30Id = g30Funcs[1].id;
  const g30Next = g30Funcs[2];
  w.location.hash = '#/academy/' + encodeURIComponent(g30Id) + '?tab=learn';
  PS.renderRoute();
  const g30Main = w.document.querySelector('#main');

  const close = g30Main.querySelector('.lesson-close');
  const markBtn = close && close.querySelector('[data-act="academy-mark-done"]');
  if (!close) {
    fail('G30', 'the lesson page shows no "what is left in this lesson" block');
  } else if (!markBtn) {
    fail('G30', 'the lesson closing block has no mark-as-studied control, so completion is only reachable from one tab');
  } else {
    ok('G30', 'every lesson tab ends with the remaining steps and a working completion control');
  }

  const navCards = [...g30Main.querySelectorAll('.lesson-nav-card.is-next')];
  const nextTitle = navCards.length ? String(navCards[0].textContent).replace(/\s+/g, ' ').trim() : '';
  if (!navCards.length) {
    fail('G30', 'the lesson page has no next-lesson card');
  } else if (g30Next && nextTitle.indexOf(g30Next.title.slice(0, 24)) < 0) {
    fail('G30', 'the next-lesson card does not name the lesson that actually follows (' + g30Next.title + ')');
  } else {
    ok('G30', 'the next-lesson card names the lesson that actually follows it');
  }

  const tocLinks = [...g30Main.querySelectorAll('.lesson-toc a')];
  const dangling = tocLinks.filter((a) => {
    const ref = a.getAttribute('href') || '';
    return !/^#lsec-\d+$/.test(ref) || !g30Main.querySelector(ref);
  });
  if (!tocLinks.length) {
    fail('G30', 'the Learn tab renders no section jump bar, so a six-card lesson has no way in');
  } else if (dangling.length) {
    fail('G30', dangling.length + ' section jump links have no target on the page: ' + dangling.map((a) => a.getAttribute('href')).join(', '));
  } else {
    ok('G30', 'the Learn tab section jumps all resolve to a card on the page (' + tocLinks.length + ')');
  }

  /* Every in-page jump in the product routes on data-act="scroll-to", because
     a bare href="#x" would be read as a route by the hash router and land on
     the not-found card. This checks the rule is applied everywhere and that
     each target exists on the page the link is on. */
  const g30Pages = ['#/academy', '#/academy?tab=learn', '#/list/kb', '#/list/calc', '#/list/sop'];
  const g30Bad = [];
  let g30Jumps = 0;
  for (const h of g30Pages) {
    w.location.hash = h.indexOf('tab=') >= 0 ? '#/academy/func-mission-value?' + h.split('?')[1] : h;
    PS.renderRoute();
    const page = w.document.querySelector('#main');
    [...page.querySelectorAll('[data-act="scroll-to"]')].forEach((a) => {
      g30Jumps++;
      const id = a.getAttribute('data-target') || '';
      /* Element ids are document-scoped, so look them up there and then
         require the element to be on the page the link is actually on. */
      const target = id ? w.document.getElementById(id) : null;
      if (!id || !target || !page.contains(target)) g30Bad.push(h + ' -> ' + (id || '(no target)'));
    });
  }
  if (g30Jumps < 10) {
    fail('G30', 'only ' + g30Jumps + ' in-page jumps exist across the hub, lessons and libraries - the navigation strips have gone missing');
  } else if (g30Bad.length) {
    fail('G30', 'in-page jumps with no target on their own page: ' + g30Bad.slice(0, 5).join(', '));
  } else {
    ok('G30', g30Jumps + ' in-page jumps all route through scroll-to and resolve to a target on their own page');
  }

  /* The library result count has to move with the filter. It used to state the
     whole library while showing four entries, which is the kind of number that
     teaches people to ignore the interface. */
  w.location.hash = '#/list/kb';
  PS.renderRoute();
  const kbPage = w.document.querySelector('#main');
  const countEl = kbPage.querySelector('#listCount');
  const input = kbPage.querySelector('#listQ');
  if (!countEl) {
    fail('G30', 'the library page renders no live result count');
  } else if (!input) {
    fail('G30', 'the library page has no filter input to drive the count');
  } else {
    const before = String(countEl.textContent).replace(/[^0-9]/g, '').slice(0, 3);
    input.value = 'zzqq';
    PS.refreshList();
    const after = String(w.document.querySelector('#listCount').textContent).replace(/[^0-9]/g, '').slice(0, 3);
    const tiles = w.document.querySelectorAll('#listWrap .tile').length;
    if (after.indexOf('0') !== 0 && tiles !== 0) {
      fail('G30', 'the result count did not move when the filter excluded everything (count says ' + after + ', ' + tiles + ' tiles rendered)');
    } else {
      ok('G30', 'the library result count follows the filter (' + before + ' entries shown, then the filtered position)');
    }
    input.value = '';
    PS.refreshList();
  }
}

w.close();
console.log('\n--- summary ---');
const byGate = (a, b) => Number(a.slice(1)) - Number(b.slice(1));
console.log('gates exercised: ' + gateLabels.size + ' (' + [...gateLabels].sort(byGate).join(', ') + ')');
console.log('assertions:   ' + assertions + ' run, ' + failures + ' failed');
console.log('\n' + (failures ? 'INTEGRITY GATE: FAIL (' + failures + ' failures)' : 'INTEGRITY GATE: PASS'));
process.exit(failures ? 1 : 0);
