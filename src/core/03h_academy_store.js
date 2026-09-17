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
  { id: 'grandmaster', name: 'Sherpa Scholar', icon: '🏆', desc: 'Completed all 16 core functions in the Procurement Academy.' }
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

  function award(bId) {
    if (!data.badges[bId]) {
      data.badges[bId] = new Date().toISOString();
      newlyAwarded.push(bId);
    }
  }

  if (compCount >= 1) award('pioneer');
  if (comp['func-landed-cost-tco']) award('tco_tactician');
  if (comp['func-rfq-issuance'] && comp['func-quote-normalization']) award('rfq_architect');
  if (comp['func-negotiation-strategy'] && comp['func-commercial-terms']) award('negotiation_ace');
  if (comp['func-contract-structuring'] && comp['func-doa-controls']) award('contract_guardian');
  if (comp['func-po-execution'] && comp['func-threeway-matching']) award('p2p_specialist');
  if (comp['func-srm-scorecards'] && comp['func-savings-reporting']) award('value_champion');
  
  var allFunctions = (PS.ACADEMY_FUNCTIONS || []);
  if (allFunctions.length > 0 && compCount >= allFunctions.length) {
    award('grandmaster');
  }

  if (newlyAwarded.length > 0) {
    PS.academy.save(data);
  }
  return newlyAwarded;
};

PS.academy.getStats = function () {
  var data = PS.academy.getAll();
  var allFunctions = (PS.ACADEMY_FUNCTIONS || []);
  var total = allFunctions.length || 16;
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
