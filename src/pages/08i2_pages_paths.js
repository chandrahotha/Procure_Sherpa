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
    modules: ['func-mission-value', 'func-landed-cost-tco', 'func-should-cost', 'func-spend-analysis'],
    skills: ['Basic concepts', 'Cost analysis', 'Spend visibility'],
    duration: '2-3 weeks',
    color: 'var(--ok)'
  },
  {
    id: 'intermediate',
    title: 'Operational Excellence',
    level: 2,
    desc: 'The day-to-day skills: sourcing, negotiation, and contract management.',
    modules: ['func-supplier-eval', 'func-category-mgmt', 'func-contract-structuring', 'func-supplier-risk'],
    skills: ['Supplier evaluation', 'Negotiation', 'Contract basics', 'Risk awareness'],
    duration: '4-6 weeks',
    color: 'var(--warn-2)'
  },
  {
    id: 'advanced',
    title: 'Strategic Leadership',
    level: 3,
    desc: 'Category strategy, complex supplier relationships, and the work of driving organizational value.',
    modules: ['func-supplier-risk', 'func-contract-structuring', 'func-category-mgmt', 'func-spend-analysis'],
    skills: ['Strategic sourcing', 'Stakeholder leadership', 'Value creation', 'Risk management'],
    duration: '6-8 weeks',
    color: 'var(--scen)'
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
    '<p class="lead">Three tracks. Start where you are; each path builds on the one before it.</p>';

  if (assessment) {
    var level = PS.skillAssessment.getLevel(assessment.score);
    html += '<div class="hub-note" style="margin-top:12px">Your assessment placed you at <strong>Level ' + level.level + ', ' + PS.esc(level.label) + '</strong> (' + assessment.score + '%). ' +
      '<a href="#/assessment">Retake</a></div>';
  } else {
    html += '<div class="hub-note" style="margin-top:12px">Not sure where to start? <a href="#/assessment">Take the skill assessment</a> and the recommendation below becomes specific.</div>';
  }

  html += '</div>';

  html += '<div class="grid grid-3 mb16">';

  PS.learningPaths.PATHS.forEach(function (path) {
    var progress = PS.learningPaths.getUserProgress(path.id);
    var nextMod = PS.learningPaths.getNextModule(path.id);
    var nextFunc = nextMod ? PS.byId('academy', nextMod) : null;
    var isComplete = progress && progress.pct === 100;

    html += '<div class="card" style="border-top:3px solid ' + path.color + '">' +
      '<div style="display:flex;justify-content:space-between;align-items:flex-start">' +
      '<div><span class="level-pill">' + path.level + '</span>' +
      '<h2 style="margin:8px 0 4px;font-size:1.05em">' + PS.esc(path.title) + '</h2></div>' +
      (isComplete ? '<span class="level-pill" style="background:var(--ok-soft);color:var(--ok)">Done</span>' : '') +
      '</div>' +
      '<p class="note" style="margin:8px 0">' + PS.esc(path.desc) + '</p>' +
      '<div style="margin:12px 0">' +
      '<div style="display:flex;justify-content:space-between;font-size:.82em;margin-bottom:4px">' +
      '<span>' + (progress ? progress.completed + '/' + progress.total : '0/' + path.modules.length) + ' modules</span>' +
      '<span>' + (progress ? progress.pct : 0) + '%</span>' +
      '</div>' +
      '<div class="bar-track"><div class="bar-fill" style="background:' + path.color + ';width:' + (progress ? progress.pct : 0) + '%"></div></div>' +
      '</div>' +
      '<div class="note" style="margin-bottom:8px"><strong>Skills:</strong> ' + PS.esc(path.skills.join(', ')) + '</div>' +
      '<div class="note" style="margin-bottom:12px"><strong>Time:</strong> ' + PS.esc(path.duration) + '</div>' +
      (nextFunc ? '<a class="btn btn-sm btn-primary" href="#/academy/' + encodeURIComponent(nextFunc.id) + '">Next: ' + PS.esc(nextFunc.title) + '</a>' : '') +
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
