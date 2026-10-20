/* ==========================================================
   Procure Sherpa - Learning Paths
   Three tracks from foundations to strategic leadership, with
   progress drawn from Academy module completion.
   ========================================================== */

PS.learningPaths = PS.learningPaths || {};

PS.learningPaths.PATHS = [
  {
    id: 'beginner',
    title: 'Procurement Foundations',
    level: 1,
    desc: 'Start from zero: what procurement is, why it matters, and the concepts every professional relies on.',
    modules: ['func-mission-value', 'func-spend-analysis', 'func-requirement-scope', 'func-landed-cost-tco', 'func-indirect-sourcing'],
    skills: ['Basic concepts', 'Cost analysis', 'Spend visibility', 'Where your own spend actually goes'],
    duration: '2-3 weeks',
    color: 'var(--ok)'
  },
  {
    id: 'intermediate',
    title: 'Operational Excellence',
    level: 2,
    desc: 'The day-to-day skills: running a competitive event, evaluating bids, negotiating and placing the order.',
    modules: ['func-rfx-strategy', 'func-rfq-issuance', 'func-quote-normalization', 'func-supplier-eval', 'func-negotiation-strategy', 'func-commercial-terms', 'func-po-execution'],
    skills: ['Running a tender', 'Bid evaluation', 'Negotiation', 'Commercial terms', 'Order execution'],
    duration: '4-6 weeks',
    color: 'var(--warn-2)'
  },
  {
    id: 'advanced',
    title: 'Commercial & Contract Leadership',
    level: 3,
    desc: 'Category strategy, cost engineering, contracting and the operational controls that make them hold.',
    modules: ['func-category-mgmt', 'func-should-cost', 'func-contract-structuring', 'func-doa-controls', 'func-threeway-matching', 'func-software-licensing', 'func-professional-services'],
    skills: ['Category strategy', 'Should-cost', 'Contract structuring', 'Delegation of authority', 'Three-way matching', 'Software and services buying'],
    duration: '6-8 weeks',
    color: 'var(--scen)'
  },
  {
    id: 'expert',
    title: 'Risk, Governance & Resilience',
    level: 4,
    desc: 'The work that decides whether the function survives an audit, a disclosure obligation or a disruption.',
    modules: ['func-supplier-risk', 'func-ethics-compliance', 'func-sustainability', 'func-resilience-continuity', 'func-srm-scorecards', 'func-savings-reporting'],
    skills: ['Due diligence', 'Anti-bribery controls', 'Sustainable sourcing', 'Supply resilience', 'Supplier performance', 'Savings assurance'],
    duration: '4-6 weeks',
    color: 'var(--danger)'
  }
];

PS.learningPaths.getUserProgress = function (pathId) {
  var path = PS.learningPaths.PATHS.filter(function (p) { return p.id === pathId; })[0];
  if (!path) return null;
  var completed = 0;
  path.modules.forEach(function (modId) {
    if (PS.academy.isCompleted(modId)) completed++;
  });
  return {
    path: path,
    completed: completed,
    total: path.modules.length,
    pct: path.modules.length > 0 ? Math.round((completed / path.modules.length) * 100) : 0
  };
};

PS.learningPaths.getNextModule = function (pathId) {
  var progress = PS.learningPaths.getUserProgress(pathId);
  if (!progress) return null;
  for (var i = 0; i < progress.path.modules.length; i++) {
    if (!PS.academy.isCompleted(progress.path.modules[i])) {
      return progress.path.modules[i];
    }
  }
  return null;
};

PS.route('learning-paths', function () {
  PS.pageTitle = 'Learning paths';
  var assessment = PS.skillAssessment ? PS.skillAssessment.getLastResult() : null;

  var html = '<div class="card">' +
    '<div class="card-head"><h1>Learning paths</h1></div>' +
    '<p class="lead">Four tracks. Start where you are; each path builds on the one before it.</p>';

  if (assessment) {
    var level = PS.skillAssessment.getLevel(assessment.score);
    html += '<div class="hub-note" style="margin-top:12px">Your assessment placed you at <strong>Level ' + level.level + ', ' + PS.esc(level.label) + '</strong> (' + assessment.score + '%). ' +
      '<a href="#/assessment">Retake</a></div>';
  } else {
    html += '<div class="hub-note" style="margin-top:12px">Not sure where to start? <a href="#/assessment">Take the skill assessment</a> and the recommendation below becomes specific.</div>';
  }

  html += '</div>';

  html += '<div class="grid grid-3 mb16 path-grid">';

  PS.learningPaths.PATHS.forEach(function (path) {
    var progress = PS.learningPaths.getUserProgress(path.id);
    var nextMod = PS.learningPaths.getNextModule(path.id);
    var nextFunc = nextMod ? PS.byId('academy', nextMod) : null;
    var isComplete = progress && progress.pct === 100;
    var done = progress ? progress.completed : 0;
    var total = path.modules.length;

    html += '<div class="card path-card" style="border-top:3px solid ' + path.color + '">' +
      '<div class="path-card-head">' +
      '<span class="level-pill">Level ' + path.level + '</span>' +
      (isComplete ? '<span class="level-pill" style="background:var(--ok-soft);color:var(--ok)">Done</span>' : '') +
      '</div>' +
      '<h2 class="path-card-title">' + PS.esc(path.title) + '</h2>' +
      '<p class="path-card-desc">' + PS.esc(path.desc) + '</p>' +
      '<div class="path-progress">' +
      '<div class="path-progress-meta"><span>' + done + ' of ' + total + ' modules</span><span>' + (progress ? progress.pct : 0) + '%</span></div>' +
      '<div class="bar-track"><div class="bar-fill" style="background:' + path.color + ';width:' + (progress ? progress.pct : 0) + '%"></div></div>' +
      '</div>' +
      '<div class="path-skills"><span class="path-label">What you will be able to do</span>' +
      '<ul class="path-skill-list">' + path.skills.map(function (s) { return '<li>' + PS.esc(s) + '</li>'; }).join('') + '</ul></div>' +
      '<div class="path-meta-row"><span class="path-label">Time</span><span>' + PS.esc(path.duration) + '</span></div>' +
      '<div class="path-card-foot">' +
      (nextFunc
        ? '<a class="btn btn-primary btn-block" href="#/academy/' + encodeURIComponent(nextFunc.id) + '">' +
          '<span class="btn-label">Start: ' + PS.esc(nextFunc.title) + '</span></a>'
        : '<a class="btn btn-block" href="#/academy"><span class="btn-label">Open the Academy</span></a>') +
      '</div>' +
      '</div>';
  });

  html += '</div>';

  html += '<div class="card">' +
    '<h2>All modules</h2>' +
    '<div class="table-wrap"><table><thead><tr><th>Module</th><th>Path</th><th>Status</th><th></th></tr></thead><tbody>';

  PS.learningPaths.PATHS.forEach(function (path) {
    path.modules.forEach(function (modId, idx) {
      var func = PS.byId('academy', modId);
      if (!func) return;
      var isComp = PS.academy.isCompleted(modId);
      html += '<tr>' +
        '<td><strong>' + PS.esc(func.title) + '</strong>' +
        (idx === 0 ? ' <span class="level-pill" style="background:' + path.color + ';color:#fff">Start</span>' : '') +
        '<br><small class="muted">' + PS.esc(func.module || '') + '</small></td>' +
        '<td>' + PS.esc(path.title) + '</td>' +
        '<td>' + (isComp ? '<span style="color:var(--ok);font-weight:600">Complete</span>' : '<span class="muted">Not started</span>') + '</td>' +
        '<td><a class="btn btn-sm" href="#/academy/' + encodeURIComponent(func.id) + '">Open</a></td>' +
        '</tr>';
    });
  });

  html += '</tbody></table></div></div>';

  return html;
});
