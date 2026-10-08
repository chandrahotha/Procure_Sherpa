/* ==========================================================
   Procure Sherpa - Skill Level Assessment
   Ten-question diagnostic that places the user on a 1-5 level
   and feeds the recommendations on Learning Paths and Next Up.
   ========================================================== */

PS.skillAssessment = PS.skillAssessment || {};

PS.skillAssessment.QUESTIONS = [
  {
    id: 'q1',
    category: 'sourcing',
    question: 'What is the primary purpose of a Request for Proposal (RFP)?',
    options: [
      'To collect price quotes from suppliers',
      'To invite detailed proposals for complex requirements with evaluation criteria',
      'To confirm a supplier\'s interest in bidding',
      'To request samples from potential suppliers'
    ],
    correct: 1,
    explanation: 'An RFP is used for complex requirements where price alone is not sufficient. It invites detailed proposals including technical approach, methodology, and pricing.'
  },
  {
    id: 'q2',
    category: 'negotiation',
    question: 'What does BATNA stand for in negotiation terminology?',
    options: [
      'Best Alternative To a Negotiated Agreement',
      'Basic Agreement Terms and Negotiation Articles',
      'Bargaining Agreement for Trade and Negotiated Assets',
      'Best Approach To Negotiate Agreements'
    ],
    correct: 0,
    explanation: 'BATNA (Best Alternative To a Negotiated Agreement) is your walk-away option. The stronger your BATNA, the more power you have in negotiations.'
  },
  {
    id: 'q3',
    category: 'contracts',
    question: 'What is the main purpose of a Service Level Agreement (SLA)?',
    options: [
      'To define payment terms',
      'To establish measurable performance metrics and consequences',
      'To outline the contract duration',
      'To specify warranty terms'
    ],
    correct: 1,
    explanation: 'An SLA defines measurable service metrics (e.g., uptime, response time) and consequences for not meeting them, providing accountability.'
  },
  {
    id: 'q4',
    category: 'risk',
    question: 'Which of the following is a key benefit of dual sourcing?',
    options: [
      'Lower unit prices due to volume',
      'Reduced supply disruption risk',
      'Simplified supplier management',
      'Faster contract negotiation'
    ],
    correct: 1,
    explanation: 'Dual sourcing reduces dependency on a single supplier, mitigating the risk of supply disruption if one supplier fails.'
  },
  {
    id: 'q5',
    category: 'sourcing',
    question: 'What is the Kraljic Matrix used for?',
    options: [
      'Calculating total cost of ownership',
      'Segmenting suppliers based on profit impact and supply risk',
      'Evaluating supplier financial stability',
      'Measuring procurement savings'
    ],
    correct: 1,
    explanation: 'The Kraljic Matrix segments purchases into four quadrants (strategic, leverage, bottleneck, routine) based on profit impact and supply risk.'
  },
  {
    id: 'q6',
    category: 'negotiation',
    question: 'What is ZOPA in negotiation theory?',
    options: [
      'Zone of Possible Agreement',
      'Zero-sum Outcome Position Analysis',
      'Zone of Price Advantage',
      'Zonal Optimization of Purchase Agreements'
    ],
    correct: 0,
    explanation: 'ZOPA (Zone of Possible Agreement) is the range between each party\'s walk-away point where a mutually acceptable agreement can be reached.'
  },
  {
    id: 'q7',
    category: 'contracts',
    question: 'What is a "force majeure" clause?',
    options: [
      'A clause requiring immediate payment',
      'A clause excusing performance due to unforeseeable events',
      'A clause allowing unilateral contract changes',
      'A clause defining intellectual property rights'
    ],
    correct: 1,
    explanation: 'A force majeure clause excuses a party from performing contractual obligations when circumstances beyond their control prevent performance.'
  },
  {
    id: 'q8',
    category: 'risk',
    question: 'What is the primary goal of a supplier risk assessment?',
    options: [
      'To negotiate lower prices',
      'To identify and evaluate potential threats from suppliers',
      'To compare supplier capabilities',
      'To establish long-term partnerships'
    ],
    correct: 1,
    explanation: 'Supplier risk assessment identifies potential threats (financial, operational, compliance) and evaluates their likelihood and impact.'
  },
  {
    id: 'q9',
    category: 'sourcing',
    question: 'What is the difference between RFQ and RFP?',
    options: [
      'RFQ is for complex requirements, RFP for simple',
      'RFQ requests price quotes, RFP requests detailed proposals',
      'RFQ is binding, RFP is not',
      'RFQ is used for services, RFP for goods'
    ],
    correct: 1,
    explanation: 'An RFQ requests price quotes for well-defined requirements. An RFP requests detailed proposals including approach and methodology for complex needs.'
  },
  {
    id: 'q10',
    category: 'negotiation',
    question: 'What is "anchoring" in negotiation?',
    options: [
      'Setting a fixed price',
      'The first offer that influences the negotiation range',
      'Agreeing to a midpoint',
      'Using a third-party mediator'
    ],
    correct: 1,
    explanation: 'Anchoring is the cognitive bias where the first number mentioned in a negotiation heavily influences the final outcome. Set your anchor strategically.'
  }
];

PS.skillAssessment.getLevel = function (score) {
  if (score >= 90) return { level: 5, label: 'Strategic Leader', desc: 'You have mastery-level procurement expertise. Focus on mentoring others and driving organizational strategy.' };
  if (score >= 75) return { level: 4, label: 'Advanced Practitioner', desc: 'You have strong procurement skills. Deepen expertise in specialized areas like strategic sourcing and risk management.' };
  if (score >= 60) return { level: 3, label: 'Competent Professional', desc: 'You have solid fundamentals. Focus on practical application and intermediate concepts.' };
  if (score >= 40) return { level: 2, label: 'Developing Enthusiast', desc: 'You have some procurement knowledge. Build foundations in sourcing, negotiation, and contracts.' };
  return { level: 1, label: 'Curious Beginner', desc: 'You are at the start of your procurement journey. Begin with foundational concepts and work your way up.' };
};

PS.skillAssessment.getRecommendations = function (score, categories) {
  var recs = [];
  var weakest = categories.slice().sort(function (a, b) { return a.pct - b.pct; })[0];
  if (weakest && weakest.pct < 60) {
    recs.push({ type: 'priority', text: 'Priority: Strengthen your ' + weakest.category + ' skills (scored ' + weakest.pct + '%)', module: weakest.category });
  }
  if (score >= 75) {
    recs.push({ type: 'advanced', text: 'Explore advanced modules: Strategic Sourcing, Contract Structuring, Supplier Risk Management' });
  } else if (score >= 60) {
    recs.push({ type: 'intermediate', text: 'Continue with: TCO Analysis, Negotiation Preparation, Category Management' });
  } else {
    recs.push({ type: 'beginner', text: 'Start with: Mission & Value, Landed Cost & TCO, Should Cost Analysis' });
  }
  recs.push({ type: 'practice', text: 'Apply your knowledge in Practice Labs and real-world scenarios' });
  return recs;
};

PS.skillAssessment.getCategoryScores = function (answers) {
  var categories = {};
  PS.skillAssessment.QUESTIONS.forEach(function (q) {
    if (!categories[q.category]) categories[q.category] = { category: q.category, correct: 0, total: 0, pct: 0 };
    categories[q.category].total++;
    if (answers[q.id] === q.correct) categories[q.category].correct++;
  });
  Object.keys(categories).forEach(function (k) {
    var c = categories[k];
    c.pct = Math.round((c.correct / c.total) * 100);
  });
  return Object.keys(categories).map(function (k) { return categories[k]; });
};

PS.skillAssessment.storeResult = function (score, level, categoryScores) {
  var data = PS.store.get('skill_assessment', {});
  data.lastScore = score;
  data.level = level;
  data.categoryScores = categoryScores;
  data.date = new Date().toISOString();
  data.history = data.history || [];
  data.history.push({ score: score, level: level, date: data.date });
  if (data.history.length > 10) data.history = data.history.slice(-10);
  PS.store.set('skill_assessment', data);
};

PS.skillAssessment.getLastResult = function () {
  return PS.store.get('skill_assessment', null);
};

PS.route('assessment', function () {
  PS.pageTitle = 'Skill Assessment';
  var lastResult = PS.skillAssessment.getLastResult();

  var html = '<div class="card">' +
    '<div class="card-head"><h1>Skill assessment</h1></div>' +
    '<p class="lead">Ten questions on sourcing, negotiation, contracts and risk. About three minutes.</p>' +
    '<p class="note">Your results stay in this browser. They set the recommendations on Learning Paths and What to Learn Next.</p>' +
    '</div>';

  if (lastResult) {
    var lastLevel = PS.skillAssessment.getLevel(lastResult.score);
    html += '<div class="card mb16">' +
      '<h2>Your last result</h2>' +
      '<div class="grid grid-3 mb16">' +
      '<div class="stat"><span class="s-val">' + lastResult.score + '%</span><span class="s-lab">Score</span></div>' +
      '<div class="stat"><span class="s-val">Level ' + lastLevel.level + '</span><span class="s-lab">' + PS.esc(lastLevel.label) + '</span></div>' +
      '<div class="stat"><span class="s-val">' + (lastResult.date ? PS.dateStr(lastResult.date) : '\u2014') + '</span><span class="s-lab">Date</span></div>' +
      '</div>' +
      '<div class="btn-row"><button type="button" class="btn btn-primary" data-act="assessment-start">Retake</button>' +
      '<a class="btn" href="#/learning-paths">My learning path</a></div>' +
      '</div>';
  }

  html += '<div class="card" id="assessmentContainer">' +
    '<div id="assessmentQuiz">' +
    '<div style="text-align:center;padding:36px 20px">' +
    '<h2>Ready when you are</h2>' +
    '<p class="lead">Ten questions across sourcing, negotiation, contracts and risk.</p>' +
    '<button type="button" class="btn btn-primary btn-lg" data-act="assessment-start">Start the assessment</button>' +
    '</div>' +
    '</div>' +
    '</div>';

  PS.pageInit = function () {
    PS.bindAssessmentEvents();
  };

  return html;
});

PS.renderAssessmentQuestion = function (qIndex) {
  var q = PS.skillAssessment.QUESTIONS[qIndex];
  var total = PS.skillAssessment.QUESTIONS.length;
  var progress = Math.round((qIndex / total) * 100);

  return '<div style="margin-bottom:14px">' +
    '<div class="bar-track"><div class="bar-fill" style="width:' + progress + '%"></div></div>' +
    '<div class="note">Question ' + (qIndex + 1) + ' of ' + total + '</div>' +
    '</div>' +
    '<h3 style="margin-bottom:14px">' + PS.esc(q.question) + '</h3>' +
    '<div id="assessmentOptions">' +
    q.options.map(function (opt) {
      return '<label class="opt-card">' +
        '<input type="radio" name="assessment-q' + qIndex + '" value="' + q.options.indexOf(opt) + '">' +
        PS.esc(opt) +
        '</label>';
    }).join('') +
    '</div>' +
    '<div class="btn-row" style="margin-top:14px">' +
    (qIndex > 0 ? '<button type="button" class="btn" data-act="assessment-prev">Previous</button>' : '') +
    '<button type="button" class="btn btn-primary" data-act="assessment-next">Next</button>' +
    '</div>';
};

PS.renderAssessmentResults = function (answers) {
  var score = 0;
  var categories = PS.skillAssessment.getCategoryScores(answers);
  PS.skillAssessment.QUESTIONS.forEach(function (q) {
    if (answers[q.id] === q.correct) score++;
  });
  var pct = Math.round((score / PS.skillAssessment.QUESTIONS.length) * 100);
  var level = PS.skillAssessment.getLevel(pct);
  var recs = PS.skillAssessment.getRecommendations(pct, categories);
  PS.skillAssessment.storeResult(pct, level.level, categories);

  var html = '<div class="card">' +
    '<div class="card-head"><h2>Your results</h2></div>' +
    '<div class="grid grid-3 mb16">' +
    '<div class="stat"><span class="s-val">' + pct + '%</span><span class="s-lab">Overall score</span></div>' +
    '<div class="stat"><span class="s-val">Level ' + level.level + '</span><span class="s-lab">' + PS.esc(level.label) + '</span></div>' +
    '<div class="stat"><span class="s-val">' + score + '/' + PS.skillAssessment.QUESTIONS.length + '</span><span class="s-lab">Correct</span></div>' +
    '</div>' +
    '<p>' + PS.esc(level.desc) + '</p>' +
    '</div>' +
    '<div class="card">' +
    '<h2>By category</h2>' +
    '<div style="margin-top:12px">' +
    categories.map(function (c) {
      var color = c.pct >= 70 ? 'var(--ok)' : (c.pct >= 50 ? 'var(--warn-2)' : 'var(--danger)');
      return '<div style="margin-bottom:12px">' +
        '<div style="display:flex;justify-content:space-between;margin-bottom:4px">' +
        '<span style="text-transform:capitalize">' + PS.esc(c.category) + '</span>' +
        '<span style="color:' + color + ';font-weight:600">' + c.pct + '%</span>' +
        '</div>' +
        '<div class="bar-track"><div class="bar-fill" style="background:' + color + ';width:' + c.pct + '%"></div></div>' +
        '</div>';
    }).join('') +
    '</div>' +
    '</div>' +
    '<div class="card">' +
    '<h2>Where to go next</h2>' +
    '<ul style="margin-top:12px;padding-left:20px">' +
    recs.map(function (r) { return '<li style="margin-bottom:8px">' + PS.esc(r.text) + '</li>'; }).join('') +
    '</ul>' +
    '<div class="btn-row" style="margin-top:14px">' +
    '<a class="btn btn-primary" href="#/learning-paths">My learning path</a>' +
    '<a class="btn" href="#/academy">Academy modules</a>' +
    '<button type="button" class="btn btn-ghost" data-act="assessment-start">Retake</button>' +
    '</div>' +
    '</div>';

  return html;
};

PS.bindAssessmentEvents = function () {
  var answers = {};
  var currentQ = 0;
  var total = PS.skillAssessment.QUESTIONS.length;

  PS.acts['assessment-start'] = function () {
    currentQ = 0;
    answers = {};
    PS.$('#assessmentQuiz').innerHTML = PS.renderAssessmentQuestion(0);
    PS.bindAssessmentNav();
  };

  PS.bindAssessmentNav = function () {
    PS.acts['assessment-next'] = function () {
      var q = PS.skillAssessment.QUESTIONS[currentQ];
      var selected = document.querySelector('input[name="assessment-q' + currentQ + '"]:checked');
      if (!selected) {
        PS.toast('Choose an answer first.', 'warning');
        return;
      }
      answers[q.id] = parseInt(selected.value, 10);
      currentQ++;
      if (currentQ >= total) {
        PS.$('#assessmentQuiz').innerHTML = PS.renderAssessmentResults(answers);
        PS.audit('assessment-completed', 'Score recorded');
      } else {
        PS.$('#assessmentQuiz').innerHTML = PS.renderAssessmentQuestion(currentQ);
        PS.bindAssessmentNav();
      }
    };
    PS.acts['assessment-prev'] = function () {
      if (currentQ > 0) {
        currentQ--;
        PS.$('#assessmentQuiz').innerHTML = PS.renderAssessmentQuestion(currentQ);
        PS.bindAssessmentNav();
      }
    };
  };
};
