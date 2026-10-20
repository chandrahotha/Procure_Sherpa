/* ==========================================================
   Procure Sherpa v2.0 - Academy State & Progress Engine
   Section: Learner State, Quiz Scoring, Badges & Local Storage
   ========================================================== */
PS.academy = PS.academy || {};

PS.academy.STORE_KEY = 'academy_progress';

PS.academy.BADGES = [
  { id: 'pioneer', name: 'Procurement Pioneer', icon: '🎖️', desc: 'Completed your first procurement function in the Academy.' },
  { id: 'tco_tactician', name: 'TCO Tactician', icon: '⚖️', desc: 'Mastered Landed Cost & Total Cost of Ownership.' },
  { id: 'rfq_architect', name: 'RFQ & Sourcing Architect', icon: '📐', desc: 'Mastered Tender Formulation, RFQ & Price Normalization.' },
  { id: 'negotiation_ace', name: 'Strategic Negotiator', icon: '🤝', desc: 'Mastered BATNA, ZOPA and Commercial Term Optimization.' },
  { id: 'contract_guardian', name: 'Contract Guardian', icon: '📜', desc: 'Mastered Contract Structuring, Legal Clauses and DOA Controls.' },
  { id: 'p2p_specialist', name: 'P2P Disciplinarian', icon: '📦', desc: 'Mastered PO Execution, Expediting and 3-Way Matching.' },
  { id: 'value_champion', name: 'Value & SRM Champion', icon: '💎', desc: 'Mastered Supplier Relationship Management and Savings Realization.' },
  { id: 'indirect_navigator', name: 'Indirect Navigator', icon: '🧭', desc: 'Mastered Indirect & MRO sourcing and Professional Services buying.' },
  { id: 'saas_strategist', name: 'Software & SaaS Strategist', icon: '☁️', desc: 'Mastered Software, SaaS and Technology Licensing.' },
  { id: 'responsible_buyer', name: 'Responsible Buyer', icon: '🌱', desc: 'Mastered Sustainable Procurement and Ethics & Due Diligence.' },
  { id: 'resilience_architect', name: 'Resilience Architect', icon: '🛡️', desc: 'Mastered Supplier Resilience and Business Continuity.' },
  { id: 'grandmaster', name: 'Sherpa Scholar', icon: '🏆', desc: 'Completed every core function in the Procurement Academy.' }
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
  return PS.academy.checkBadges();
};

PS.academy.checkBadges = function () {
  var data = PS.academy.getAll();
  data.badges = data.badges || {};
  var newlyAwarded = [];
  var comp = data.completed || {};
  var compCount = Object.keys(comp).filter(function (k) { return comp[k]; }).length;

  /* Badges are derived from the completion record, not accumulated. A
     badge that no longer follows from the current record is withdrawn,
     so a demoted function cannot leave a stale award on the transcript. */
  var earned = {};
  if (compCount >= 1) earned['pioneer'] = 1;
  if (comp['func-landed-cost-tco']) earned['tco_tactician'] = 1;
  if (comp['func-rfq-issuance'] && comp['func-quote-normalization']) earned['rfq_architect'] = 1;
  if (comp['func-negotiation-strategy'] && comp['func-commercial-terms']) earned['negotiation_ace'] = 1;
  if (comp['func-contract-structuring'] && comp['func-doa-controls']) earned['contract_guardian'] = 1;
  if (comp['func-po-execution'] && comp['func-threeway-matching']) earned['p2p_specialist'] = 1;
  if (comp['func-srm-scorecards'] && comp['func-savings-reporting']) earned['value_champion'] = 1;
  if (comp['func-indirect-sourcing'] && comp['func-professional-services']) earned['indirect_navigator'] = 1;
  if (comp['func-software-licensing']) earned['saas_strategist'] = 1;
  if (comp['func-sustainability'] && comp['func-ethics-compliance']) earned['responsible_buyer'] = 1;
  if (comp['func-resilience-continuity'] && comp['func-supplier-risk']) earned['resilience_architect'] = 1;
  var allFunctions = (PS.ACADEMY_FUNCTIONS || []);
  if (allFunctions.length > 0 && compCount >= allFunctions.length) earned['grandmaster'] = 1;

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
    currentFunc: data.current || 'func-mission-value'
  };
};

PS.academy.reset = function () {
  PS.store.remove(PS.academy.STORE_KEY);
};
