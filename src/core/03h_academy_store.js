/* ==========================================================
   Procure Sherpa v2.0 - Academy State & Progress Engine
   Section: Learner State, Quiz Scoring, Badges & Local Storage
   ========================================================== */
PS.academy = PS.academy || {};

PS.academy.STORE_KEY = 'academy_progress';

/* Three levels of decision altitude, not three levels of seniority.
   Every function is written at one of them, so a reader can see what a
   lesson prepares them to decide on before opening it. Before this
   existed the curriculum read as one flat "basic" block: a category
   manager and a first-week buyer were shown the same lesson with no
   way to tell them apart. */
PS.academy.TIERS = [
  { id: 'core', name: 'Foundation', desc: 'The fundamentals: what the function is, and how the work is done correctly.' },
  { id: 'practitioner', name: 'Practitioner', desc: 'Running a category or an event: cost engineering, evaluation, negotiation, contracting.' },
  { id: 'executive', name: 'Executive', desc: 'Owning the portfolio: strategy, governance, risk posture, and the board conversation.' }
];
PS.academy.tierName = function (id) {
  var t = (PS.academy.TIERS || []).filter(function (x) { return x.id === id; })[0];
  return t ? t.name : 'Foundation';
};

/* Badges are declared with the functions that earn them, so the trigger is
   data a gate can read. They used to be eleven hand-written `if` lines
   inside checkBadges: renaming a function in the content files left its
   badge permanently unearnable and nothing could notice, because the id the
   rule tested no longer existed anywhere. `requires` lists function ids that
   all have to be complete; `first` earns on any single completion; `all`
   earns when the whole curriculum is complete. */
PS.academy.BADGES = [
  { id: 'foundation_grounding', name: 'Grounded Foundations', icon: '🧱', desc: 'Mastered the mission, spend analysis, requirement scoping and channel selection - the four lessons everything else rests on.', requires: ['func-mission-value', 'func-spend-analysis', 'func-requirement-scope', 'func-rfx-strategy'] },
  { id: 'cost_value_analyst', name: 'Cost & Value Analyst', icon: '🔬', desc: 'Mastered Category Management, Should-Cost Modelling and Multi-Criteria Supplier Evaluation.', requires: ['func-category-mgmt', 'func-should-cost', 'func-supplier-eval'] },
  { id: 'pioneer', name: 'Procurement Pioneer', icon: '🎖️', desc: 'Completed your first procurement function in the Academy.', first: true },
  { id: 'tco_tactician', name: 'TCO Tactician', icon: '⚖️', desc: 'Mastered Landed Cost & Total Cost of Ownership.', requires: ['func-landed-cost-tco'] },
  { id: 'rfq_architect', name: 'RFQ & Sourcing Architect', icon: '📐', desc: 'Mastered Tender Formulation, RFQ & Price Normalization.', requires: ['func-rfq-issuance', 'func-quote-normalization'] },
  { id: 'negotiation_ace', name: 'Strategic Negotiator', icon: '🤝', desc: 'Mastered BATNA, ZOPA and Commercial Term Optimization.', requires: ['func-negotiation-strategy', 'func-negotiation-record', 'func-commercial-terms'] },
  { id: 'contract_guardian', name: 'Contract Guardian', icon: '📜', desc: 'Mastered Contract Structuring, Legal Clauses and DOA Controls.', requires: ['func-contract-structuring', 'func-contract-types-renewal', 'func-doa-controls'] },
  { id: 'p2p_specialist', name: 'P2P Disciplinarian', icon: '📦', desc: 'Mastered PO Execution, Expediting and 3-Way Matching.', requires: ['func-po-execution', 'func-requisition-intake', 'func-threeway-matching'] },
  { id: 'value_champion', name: 'Value & SRM Champion', icon: '💎', desc: 'Mastered Supplier Relationship Management and Savings Realization.', requires: ['func-srm-scorecards', 'func-savings-reporting'] },
  { id: 'indirect_navigator', name: 'Indirect Navigator', icon: '🧭', desc: 'Mastered Indirect & MRO sourcing and Professional Services buying.', requires: ['func-indirect-sourcing', 'func-professional-services'] },
  { id: 'saas_strategist', name: 'Software & SaaS Strategist', icon: '☁️', desc: 'Mastered Software, SaaS and Technology Licensing.', requires: ['func-software-licensing'] },
  { id: 'responsible_buyer', name: 'Responsible Buyer', icon: '🌱', desc: 'Mastered Sustainable Procurement and Ethics & Due Diligence.', requires: ['func-sustainability', 'func-ethics-compliance'] },
  { id: 'resilience_architect', name: 'Resilience Architect', icon: '🛡️', desc: 'Mastered Supplier Resilience and Business Continuity.', requires: ['func-resilience-continuity', 'func-supplier-risk'] },
  { id: 'analytics_architect', name: 'Spend Analytics Architect', icon: '📊', desc: 'Mastered Digital Procurement, Spend Analytics and Category Strategy.', requires: ['func-digital-procurement', 'func-spend-analytics', 'func-category-strategy'] },
  { id: 'portfolio_commander', name: 'Portfolio Commander', icon: '🧬', desc: 'Mastered the Tail, Supply Market Structure and Demand Management.', requires: ['func-tail-spend-program', 'func-market-structure', 'func-demand-management'] },
  { id: 'boardroom_ready', name: 'Boardroom Ready', icon: '🏛️', desc: 'Mastered the Operating Model, the Value Narrative and Transformation Sequencing.', requires: ['func-operating-model', 'func-value-narrative', 'func-transformation-roadmap'] },
  { id: 'influence_architect', name: 'Influence & Adoption Architect', icon: '🧲', desc: 'Mastered Stakeholder Mapping, the Executive Ask and Change Adoption.', requires: ['func-stakeholder-mapping', 'func-executive-ask', 'func-adoption-and-change'] },
  { id: 'market_depth', name: 'Category Depth Specialist', icon: '🧭', desc: 'Mastered Freight and Customs, Regulated Procurement and the People-Time Categories.', requires: ['func-freight-and-landed-cost', 'func-regulated-procurement', 'func-people-time-categories'] },
  { id: 'contract_steward', name: 'Contract Steward', icon: '⚖️', desc: 'Mastered the Obligation Register, Change Control and Claims & Remedies.', requires: ['func-obligation-register', 'func-change-control', 'func-claims-and-remedies'] },
  { id: 'supplier_lifecycle', name: 'Supplier Lifecycle Discipline', icon: '🔁', desc: 'Mastered Supplier Onboarding & Segmentation and Corrective Action & Business Review.', requires: ['func-supplier-onboarding', 'func-corrective-action'] },
  { id: 'supply_guardian', name: 'Supply Continuity Architect', icon: '🛡️', desc: 'Mastered Supplier Development, Conformity & Audit and Dual Sourcing & Resilience.', requires: ['func-supplier-development', 'func-quality-and-audit', 'func-dual-source-resilience'] },
  { id: 'disruption_response', name: 'Disruption Response Lead', icon: '⚡', desc: 'Mastered Emergency Buying, Allocation and Shortage, and Post-Disruption Recovery.', requires: ['func-emergency-procurement', 'func-allocation-and-shortage', 'func-disruption-recovery'] },
  { id: 'finance_fluency', name: 'Procurement Finance Fluency', icon: '💰', desc: 'Mastered Payment Terms as an Instrument, the Cash Conversion Cycle and Supply Chain Finance.', requires: ['func-payment-terms-value', 'func-cash-conversion-cycle', 'func-supply-chain-finance'] },
  { id: 'assurance_guardian', name: 'Integrity and Assurance Practitioner', icon: '\ud83d\udd0d', desc: 'Mastered Fraud Risk Patterns, Bid Rigging Detection and Case Response & Disclosure.', requires: ['func-purchasing-fraud-risk', 'func-bid-rigging-detection', 'func-fraud-response-and-disclosure'] },
  { id: 'responsible_sourcing', name: 'Responsible Sourcing Practitioner', icon: '🌱', desc: 'Mastered the Scope 3 Baseline, Circular Sourcing Economics and Social Value & Labour Due Diligence.', requires: ['func-scope3-buying-baseline', 'func-circular-sourcing-economics', 'func-social-value-labour-due-diligence'] },
  { id: 'sector_buyer', name: 'Specialised Sector Buyer', icon: '🏗️', desc: 'Mastered Energy and Utility Procurement, Works and Construction Buying and Marketing and Creative Services.', requires: ['func-energy-utility-procurement', 'func-works-and-construction-buying', 'func-marketing-and-creative-services'] },
  { id: 'ai_data_steward', name: 'AI and Data Steward', icon: '🧠', desc: 'Mastered Model Service Economics, Data Licensing and Provenance, and AI Supplier Assurance.', requires: ['func-model-service-procurement', 'func-data-licensing-and-provenance', 'func-ai-supplier-assurance'] },
  { id: 'grandmaster', name: 'Sherpa Scholar', icon: '🏆', desc: 'Completed every core function in the Procurement Academy.', all: true }
];

PS.academy.getAll = function () {
  return PS.store.get(PS.academy.STORE_KEY, {
    completed: {},
    scores: {},
    badges: {},
    current: 'func-mission-value'
  });
};

PS.academy.save = function (data) {
  PS.store.set(PS.academy.STORE_KEY, data);
};

PS.academy.isCompleted = function (funcId) {
  var data = PS.academy.getAll();
  return !!(data.completed && data.completed[funcId]);
};

PS.academy.getQuizResult = function (funcId) {
  var data = PS.academy.getAll();
  return (data.scores && data.scores[funcId]) || null;
};

PS.academy.recordQuiz = function (funcId, score, total, userAnswers, recoveredMap) {
  var data = PS.academy.getAll();
  data.scores = data.scores || {};
  var existing = data.scores[funcId] || {};
  var pct = total > 0 ? Math.round((score / total) * 100) : 0;
  data.scores[funcId] = {
    score: score,
    total: total,
    pct: pct,
    date: new Date().toISOString(),
    answers: userAnswers || {},
    recovered: recoveredMap || existing.recovered || {}
  };
  if (pct >= 70) {
    data.completed = data.completed || {};
    data.completed[funcId] = true;
  } else {
    /* Mastery is not permanent. A failed retake clears the mastered flag,
       otherwise the transcript showed "Mastered" next to a 0% score. */
    data.completed = data.completed || {};
    data.completed[funcId] = false;
  }
  PS.academy.save(data);
  return PS.academy.checkBadges();
};

PS.academy.getMistakeState = function (funcId, qIdx) {
  var data = PS.academy.getAll();
  data.mistakes = data.mistakes || {};
  var key = funcId + '_' + qIdx;
  return data.mistakes[key] || { count: 0, wrongOptions: [] };
};

PS.academy.recordMistake = function (funcId, qIdx, wrongOptIdx) {
  var data = PS.academy.getAll();
  data.mistakes = data.mistakes || {};
  var key = funcId + '_' + qIdx;
  var st = data.mistakes[key] || { count: 0, wrongOptions: [] };
  st.count = (st.count || 0) + 1;
  st.wrongOptions = st.wrongOptions || [];
  if (wrongOptIdx !== undefined && st.wrongOptions.indexOf(wrongOptIdx) === -1) {
    st.wrongOptions.push(wrongOptIdx);
  }
  data.mistakes[key] = st;
  PS.academy.save(data);
  return st;
};

PS.academy.clearMistake = function (funcId, qIdx) {
  var data = PS.academy.getAll();
  if (data.mistakes) {
    var key = funcId + '_' + qIdx;
    delete data.mistakes[key];
    PS.academy.save(data);
  }
};

/* Record that a function has been studied, without claiming mastery.
   Mastery is earned by passing the quiz; this records engagement only. */
PS.academy.markStudied = function (funcId) {
  var data = PS.academy.getAll();
  data.studied = data.studied || {};
  data.studied[funcId] = true;
  data.current = funcId;
  PS.academy.save(data);
  if (PS.revise && PS.revise.record) PS.revise.record(funcId, 'studied');
};
PS.academy.isStudied = function (funcId) {
  var data = PS.academy.getAll();
  return !!(data.studied && data.studied[funcId]);
};

PS.academy.markCompleted = function (funcId) {
  var data = PS.academy.getAll();
  data.completed = data.completed || {};
  data.completed[funcId] = true;
  data.current = funcId;
  PS.academy.save(data);
  if (PS.revise && PS.revise.record) PS.revise.record(funcId, 'completed');
  return PS.academy.checkBadges();
};

PS.academy.checkBadges = function () {
  var data = PS.academy.getAll();
  data.badges = data.badges || {};
  var newlyAwarded = [];
  var comp = data.completed || {};
  var compCount = Object.keys(comp).filter(function (k) { return comp[k]; }).length;
  var allFunctions = (PS.ACADEMY_FUNCTIONS || []);

  /* Badges are derived from the completion record, not accumulated. A
     badge that no longer follows from the current record is withdrawn,
     so a demoted function cannot leave a stale award on the transcript. */
  var earned = {};
  (PS.academy.BADGES || []).forEach(function (badge) {
    if (badge.first) {
      if (compCount >= 1) earned[badge.id] = 1;
      return;
    }
    if (badge.all) {
      if (allFunctions.length > 0 && compCount >= allFunctions.length) earned[badge.id] = 1;
      return;
    }
    var need = badge.requires || [];
    if (!need.length) return;
    if (need.every(function (fid) { return !!comp[fid]; })) earned[badge.id] = 1;
  });

  var changed = false;
  Object.keys(earned).forEach(function (bId) {
    if (!data.badges[bId]) { data.badges[bId] = new Date().toISOString(); newlyAwarded.push(bId); changed = true; }
  });
  Object.keys(data.badges).forEach(function (bId) {
    if (!earned[bId]) { delete data.badges[bId]; changed = true; }
  });
  if (changed) PS.academy.save(data);
  return newlyAwarded;
};

/* The function a learner should be sent back to. It used to be
   'the last one you opened', which meant that after completing five
   functions in a row the Academy and the Command Center both said
   'Resume: The Procurement Mission & Value Creation' - the first
   function, already done. The pointer has to move. */
PS.academy.nextUncompleted = function () {
  var data = PS.academy.getAll();
  var comp = (data && data.completed) || {};
  var funcs = PS.ACADEMY_FUNCTIONS || [];
  if (!funcs.length) return null;
  /* Sequence order: module number first, then the order the functions
     were authored in within the module. */
  var ordered = funcs.slice().sort(function (a, b) {
    var na = PS.academyModuleNumber(a.module) || 0;
    var nb = PS.academyModuleNumber(b.module) || 0;
    if (na !== nb) return na - nb;
    return funcs.indexOf(a) - funcs.indexOf(b);
  });
  for (var i = 0; i < ordered.length; i++) {
    if (!comp[ordered[i].id]) return ordered[i];
  }
  /* Everything is done. Point at the last function so there is
     somewhere to go, and let the caller say so. */
  return ordered[ordered.length - 1];
};

PS.academy.getStats = function () {
  var data = PS.academy.getAll();
  var allFunctions = (PS.ACADEMY_FUNCTIONS || []);
  var total = allFunctions.length || 19;
  var comp = data.completed || {};
  var compCount = Object.keys(comp).filter(function (k) { return comp[k]; }).length;
  var pct = Math.min(100, Math.round((compCount / total) * 100));
  var badgesEarned = Object.keys(data.badges || {}).length;

  return {
    completedCount: compCount,
    totalCount: total,
    pct: pct,
    badgesEarned: badgesEarned,
    badgesTotal: PS.academy.BADGES.length,
    currentFunc: (PS.academy.nextUncompleted() || { id: data.current || 'func-mission-value' }).id
  };
};

/* The data behind the hub readiness panel: mastery split by altitude, what
   the review queue holds, and what the recorded answers say is unsettled.
   It reads the same records the rails, the queue and the reflection read, so
   the hub cannot present a second number for one fact. */
PS.academy.readiness = function () {
  var funcs = PS.ACADEMY_FUNCTIONS || [];
  var tiers = (PS.academy.TIERS || []).map(function (t) {
    var inTier = funcs.filter(function (f) { return f.tier === t.id; });
    var done = inTier.filter(function (f) { return PS.academy.isCompleted(f.id); }).length;
    return { id: t.id, name: t.name, done: done, total: inTier.length };
  });
  var nextFn = PS.academy.nextUncompleted();
  var q = PS.revise ? PS.revise.queue() : null;
  var r = PS.reflection ? PS.reflection.summary() : null;
  return {
    tiers: tiers,
    next: nextFn ? { id: nextFn.id, title: nextFn.title, module: nextFn.module } : null,
    due: q ? q.due.length : 0,
    answered: r ? r.totals.answered : 0,
    wrong: r ? r.totals.wrong : 0,
    topPrinciple: r && r.principles.length ? r.principles[0].principle : ''
  };
};

/* ---------- curriculum progress helpers (used by the Academy hub and the lesson page) ----------
   The hub lists 15 modules and 40 lessons and tells the reader nothing about
   where they are in it: the only progress view was a separate page, and a
   learner mid-way through Module 9 could not see that Module 4 was half done
   without leaving the curriculum. These three functions are the data the
   progress rails and the lesson position line are built from. */

/* The curriculum in the order it is taught: module number, then the order
   the functions were authored in inside the module. Same rule as
   nextUncompleted, so the position a learner is shown and the lesson they
   are told to resume cannot disagree. */
PS.academy.sequence = function () {
  var funcs = PS.ACADEMY_FUNCTIONS || [];
  return funcs.slice().sort(function (a, b) {
    var na = PS.academyModuleNumber(a.module) || 0;
    var nb = PS.academyModuleNumber(b.module) || 0;
    if (na !== nb) return na - nb;
    return funcs.indexOf(a) - funcs.indexOf(b);
  });
};

PS.academy.positionIn = function (funcId) {
  var seq = PS.academy.sequence();
  for (var i = 0; i < seq.length; i++) { if (seq[i].id === funcId) return i + 1; }
  return 0;
};

PS.academy.moduleProgress = function (moduleName) {  var funcs = (PS.ACADEMY_FUNCTIONS || []).filter(function (f) { return f.module === moduleName; });
  var done = funcs.filter(function (f) { return PS.academy.isCompleted(f.id); }).length;
  return { done: done, total: funcs.length, pct: funcs.length ? Math.round((done / funcs.length) * 100) : 0 };
};

/* A lesson's duration is written as prose ("24 mins"), so the estimate reads
   the leading number and says nothing at all when it cannot. An honest
   "about 6 hours left" is worth more than a precise-looking figure built on a
   guess, and a missing duration contributes zero rather than an invented one. */
PS.academy.minutesRemaining = function () {
  var left = 0;
  (PS.ACADEMY_FUNCTIONS || []).forEach(function (f) {
    if (PS.academy.isCompleted(f.id)) return;
    var m = PS.num(String(f.duration || '').match(/\d+/));
    if (m && m > 0 && m < 600) left += m;
  });
  return left;
};

PS.academy.hoursPhrase = function (mins) {
  if (!mins) return '';
  if (mins < 60) return 'about ' + mins + ' minutes of lessons left';
  return 'about ' + (Math.round(mins / 6) / 10) + ' hours of lessons left';
};

PS.academy.reset = function () {
  PS.store.remove(PS.academy.STORE_KEY);
};
