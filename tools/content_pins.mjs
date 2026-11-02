/* ==========================================================
   The content counts the product promises, in one place.

   WHO OWNS WHAT
   -------------
   These numbers used to live only in tools/verify_deploy.mjs, which is a
   deploy step and does not run inside `npm run qa`. So the exact pins
   (13 SOPs, 27 checklists, 33 templates, 19 calculators, 9 maturity
   areas, 21 lifecycle stages, 40 Academy functions in 15 modules, the
   223/179 curriculum counts, the handoff edges and the documented search
   example) were only ever checked against the live site, while the gate
   that every developer runs held loose floors instead ("< 5", "< 10").
   A content regression could be merged and shipped, and `npm run qa`
   would not notice.

   Ownership now:
     * tools/test_integrity.mjs  G1   owns these pins as part of `npm run qa`
                                     (it calls contentPins() below).
     * tools/verify_deploy.mjs   owns only what the local gate cannot do:
                                 proving the SERVED bytes carry this
                                 source tree's build stamp. It re-runs the
                                 same contentPins() against the served
                                 application, so the two can never drift
                                 apart, and it adds no new number of its
                                 own.
     * G6 in test_integrity.mjs  owns the handoff edges (the 8 legs
                                 master §26 names, and the rule that every
                                 declared edge can carry a field).
                                 handoffWalk() here is the shared walk both
                                 G6 and the deploy check use.
     * G21 in test_integrity.mjs owns the SOP library's own procedure
                                 steps - the count §18 and §77 make claims
                                 about - separately from the Academy's
                                 140 sopSteps in G12.

   A pin is exact on purpose: content is the product, and "at least 5" is
   not a check on a library the documentation counts by name. When the
   library deliberately grows, the number changes here, in the same commit
   as the content, and the documents that quote it are updated by
   tools/check_drift.mjs failing.
   ========================================================== */

export const PINS = {
  kb: 72,
  sop: 16,
  cl: 27,
  tpl: 33,
  dec: 17,
  kpi: 18,
  gloss: 45,
  scen: 6,
  calc: 19,
  maturityAreas: 9,
  lifecycleStages: 21,
  academyFunctions: 48,
  academyModules: 16,
  academySopSteps: 279,
  academyQuizQuestions: 219,
  /* The three altitudes the curriculum is written at. A function cannot
     be at two levels, and a level cannot gain or lose a function without
     these numbers moving - which is the point: changing a lesson's level
     now fails G1/G16 and G23 until every document that quotes the split
     is re-read. Counts: 9 foundation, 15 practitioner, 13 executive. */
  academyTierCounts: { core: 10, practitioner: 24, executive: 14 },
  /* G21: the SOP library's own procedure steps (master §18 part 7).
     This count was 106 before the torn steps were repaired: four of those
     were not steps at all, but halves of a step created by a ';' written
     inside a step's own prose (the compact seed format splits steps on
     ';'). 102 is the number of procedure steps the SOP documents actually
     hold, and G21 now refuses a step whose instruction carries step
     metadata, so the artifact cannot quietly go back to 106. */
  sopLibrarySteps: 125,
  sopLibraryMinStepsPerSop: 6,
  /* G18: Academy functions that carry a link into a workbench. One short
     by design: func-mission-value is the orientation lesson and has no
     practice tool, and every other function must have one or the library
     stops being a system. A key dropped from PS.ACADEMY_WORKBENCH moves
     this number and fails the gate. */
  academyWorkbenchLinked: 47,
  workbenches: 8,
  navLearnSections: 5,
  navLearnItems: 26,
  navWorkSections: 6,
  navWorkItems: 30,
  navFooterLinks: 4
};

/* §9/§82: the search the product documents has to answer the example the
   requirements give. */
export const SEARCH_FIXTURE = { query: 'supplier increased price by 12%', title: 'Supplier Price Increase' };

/**
 * Every registry count, measured from a live PS.
 * @param {object} PS the application object from the artifact or the served bytes
 * @returns {Array<{label:string, got:number, pin:number, spec:string}>}
 */
export function contentPins(PS) {
  const d = PS.data || {};
  const n = (a) => (a || []).length;
  const funcs = PS.ACADEMY_FUNCTIONS || [];
  const wb = Object.keys(PS.WORKBENCH_TITLES || {});
  return [
    { label: 'knowledge concepts', got: n(d.kb), pin: PINS.kb, spec: 'section 10-17, §81 Knowledge' },
    { label: 'SOP documents', got: n(d.sop), pin: PINS.sop, spec: 'section 19, §81 SOP' },
    { label: 'checklists', got: n(d.cl), pin: PINS.cl, spec: 'section 22, §81 Checklists' },
    { label: 'templates', got: n(d.tpl), pin: PINS.tpl, spec: 'section 23, §81 Templates' },
    { label: 'decision guides', got: n(d.dec), pin: PINS.dec, spec: 'section 21, §81 Decisions' },
    { label: 'calculators', got: n(d.calc), pin: PINS.calc, spec: 'section 6, §81 Calculators' },
    { label: 'KPIs', got: n(d.kpi), pin: PINS.kpi, spec: 'section 30, §81 KPIs' },
    { label: 'glossary terms', got: n(d.gloss), pin: PINS.gloss, spec: 'section 31' },
    { label: 'scenarios', got: n(d.scen), pin: PINS.scen, spec: 'section 51, §81 Scenarios' },
    { label: 'maturity areas', got: n(PS.MATURITY), pin: PINS.maturityAreas, spec: 'section 63' },
    { label: 'lifecycle stages', got: n(PS.LIFECYCLE), pin: PINS.lifecycleStages, spec: 'section 12' },
    { label: 'academy functions', got: funcs.length, pin: PINS.academyFunctions, spec: 'section 77' },
    { label: 'academy modules', got: new Set(funcs.map((f) => f.module)).size, pin: PINS.academyModules, spec: 'distinct modules across the functions' },
    { label: 'academy-taught step sequences', got: funcs.reduce((a, f) => a + (f.sopSteps || []).length, 0), pin: PINS.academySopSteps, spec: 'G12: PS.ACADEMY_FUNCTIONS[].sopSteps' },
    { label: 'academy quiz questions', got: funcs.reduce((a, f) => a + (f.quizzes || []).length, 0), pin: PINS.academyQuizQuestions, spec: 'G12: PS.ACADEMY_FUNCTIONS[].quizzes' },
    ...Object.entries(PINS.academyTierCounts).map(([t, pin]) => ({
      label: 'academy functions at the ' + t + ' level',
      got: funcs.filter((f) => f.tier === t).length,
      pin,
      spec: 'the level filter on the Academy hub (#/academy?tier=' + t + ')'
    })),
    { label: 'SOP library procedure steps', got: (d.sop || []).reduce((a, s) => a + (s.steps || []).length, 0), pin: PINS.sopLibrarySteps, spec: 'G21: the steps written into the SOP documents themselves' },
    { label: 'academy functions linked to a workbench', got: funcs.filter((f) => !!(PS.ACADEMY_WORKBENCH || {})[f.id]).length, pin: PINS.academyWorkbenchLinked, spec: 'G18: the library has to reach the tool where the work is practised' },
    { label: 'workbench collections', got: wb.length, pin: PINS.workbenches, spec: 'section 27, the eight record collections' }
  ];
}

/**
 * Measure the sidebar the way both gates do.
 * @param {Document} doc the rendered document
 * @returns {{sections:number, items:number, footer:number, names:string[]}}
 */
export function navCounts(doc) {
  return {
    sections: doc.querySelectorAll('#navRoot .nav-sec').length,
    items: doc.querySelectorAll('#navRoot li').length,
    footer: doc.querySelectorAll('.sidebar-foot-link').length,
    names: [...doc.querySelectorAll('#navRoot .nav-sec-head > span:nth-child(2)')].map((s) => s.textContent.trim())
  };
}

/**
 * Walk every declared calculator handoff and report the ones that can
 * never carry a value. Owned as a *gate* by G6 (which adds the named legs
 * master §26 requires); shared here so the deploy check measures the same
 * thing against the served bytes.
 * @param {object} PS
 * @returns {{edges:number, dead:string[]}}
 */
export function handoffWalk(PS) {
  const calcs = PS.data.calc || [];
  let edges = 0;
  const dead = [];
  for (const c of calcs) {
    for (const t of c.handoffTo || []) {
      edges++;
      const tgt = calcs.filter((x) => x.id === t)[0];
      if (!tgt) { dead.push(c.id + ' -> ' + t + ' (no such calculator)'); continue; }
      const vals = {};
      (c.fields || []).forEach((f) => { vals[f.k] = 1; });
      if (!Object.keys(PS.mapHandoffValues(c, tgt, vals)).length) dead.push(c.id + ' -> ' + t + ' (no shared field)');
    }
  }
  return { edges, dead };
}
