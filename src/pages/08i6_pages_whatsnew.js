/* ==========================================================
   Procure Sherpa - What's New
   Version history, newest first, so new features get found.
   ========================================================== */

PS.whatsNew = PS.whatsNew || {};

PS.whatsNew.CHANGES = [
  {
    version: '2.3',
    date: '2026-10-08',
    title: 'Learning hub for procurement enthusiasts',
    tag: 'Major',
    items: [
      'Skill assessment: ten questions that place you on a 1-5 level and shape your learning path',
      'Learning paths: three tracks from foundations to strategic leadership',
      'Practice labs: supplier evaluation, negotiation, contract review and spend analysis, each with feedback',
      'Skill portfolio: your level across six competency areas with a copyable summary',
      'Daily tip and weekly challenge',
      'Career paths: the usual progression from analyst to CPO',
      'Community board for notes and questions, stored locally'
    ]
  },
  {
    version: '2.2',
    date: '2026-09-28',
    title: 'Robustness and quality',
    tag: 'Improvement',
    items: [
      'Unit tests for the core utilities (18 tests, under 100ms)',
      'JSDoc type annotations across the core API',
      'Storage usage bar in Settings, with a warning near the quota',
      'Calculator validation at startup: missing implementations and broken examples are reported',
      'Global handlers for uncaught errors and failed promises',
      'Browser support stated plainly: evergreen browsers, ES2015+ built-ins'
    ]
  },
  {
    version: '2.1',
    date: '2026-09-20',
    title: 'Intelligence and automation',
    tag: 'Feature',
    items: [
      'Procurement Copilot: answers questions from the bundled knowledge base, with citations',
      'Certification exams: timed, randomised, with pass marks and attempt history',
      'Spend data model: one category-supplier hierarchy feeding the Pareto and Kraljic charts',
      'Document pack builder: assemble RFI/RFP/contract packs with a cover sheet',
      'What-if analysis on any calculator, with saveable scenario trees',
      'Static share pages for any route'
    ]
  },
  {
    version: '2.0',
    date: '2026-09-16',
    title: 'First release',
    tag: 'Release',
    items: [
      'Procurement Academy with 19 competency modules, quizzes and badges',
      '19 financial and operational calculators',
      '13 SOPs, 27 checklists and 33 templates',
      'Decision guides, KPIs, glossary and guided scenarios',
      'Universal search with a Ctrl+K command palette',
      'Savings dashboard, maturity assessment, saved work, favorites and backup/restore'
    ]
  }
];

PS.whatsNew.seenVersion = function () {
  return PS.store.get('whatsnew_seen', '');
};

PS.whatsNew.markSeen = function () {
  PS.store.set('whatsnew_seen', PS.VERSION);
};

PS.route('whats-new', function () {
  PS.pageTitle = "What's new";
  PS.whatsNew.markSeen();

  var html = '<div class="card">' +
    '<div class="card-head"><h1>What\'s new</h1>' +
    '<div class="spacer"></div><span class="badge">v' + PS.esc(PS.VERSION) + '</span></div>' +
    '<p class="lead">Every release, newest first. Yours is marked.</p>' +
    '</div>';

  PS.whatsNew.CHANGES.forEach(function (c) {
    var tagColor = c.tag === 'Major' ? 'var(--scen-soft);color:var(--scen)'
      : (c.tag === 'Feature' ? 'var(--accent-soft);color:var(--accent)'
        : (c.tag === 'Improvement' ? 'var(--ok-soft);color:var(--ok)' : 'var(--sunken);color:var(--mute)'));
    var isCurrent = c.version === PS.VERSION;
    html += '<div class="card" style="' + (isCurrent ? 'border-left:4px solid var(--accent)' : '') + '">' +
      '<div class="card-head"><div><h2 style="margin-bottom:2px">v' + PS.esc(c.version) + ': ' + PS.esc(c.title) + '</h2>' +
      '<div style="display:flex;gap:8px;align-items:center">' +
      '<span class="badge" style="background:' + tagColor + '">' + PS.esc(c.tag) + '</span>' +
      '<span class="note">' + PS.esc(c.date) + '</span>' +
      (isCurrent ? '<span class="badge" style="background:var(--accent-soft);color:var(--accent)">Your version</span>' : '') +
      '</div></div></div>' +
      '<ul style="margin-top:10px;padding-left:20px">' +
      c.items.map(function (item) { return '<li style="margin-bottom:6px">' + PS.esc(item) + '</li>'; }).join('') +
      '</ul></div>';
  });

  return html;
});
