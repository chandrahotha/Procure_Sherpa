/* ==========================================================
   Procure Sherpa - Skill Portfolio
   Skill levels across six competency areas, drawn from Academy
   module completion, with an exportable summary.
   ========================================================== */

PS.skillPortfolio = PS.skillPortfolio || {};

PS.skillPortfolio.SKILL_TREE = [
  {
    id: 'sourcing',
    name: 'Sourcing & supplier selection',
    modules: ['func-mission-value', 'func-should-cost', 'func-supplier-eval', 'func-category-mgmt'],
    description: 'Identify, evaluate and select suppliers through a structured process.'
  },
  {
    id: 'cost',
    name: 'Cost analysis & TCO',
    modules: ['func-landed-cost-tco', 'func-should-cost', 'func-spend-analysis'],
    description: 'True cost beyond the unit price, including hidden and lifecycle cost.'
  },
  {
    id: 'negotiation',
    name: 'Negotiation & commercial',
    modules: ['func-landed-cost-tco', 'func-category-mgmt', 'func-contract-structuring'],
    description: 'Preparation, anchoring and value creation at the table.'
  },
  {
    id: 'contracts',
    name: 'Contract management',
    modules: ['func-contract-structuring', 'func-supplier-risk'],
    description: 'Structure, negotiate and manage contracts that protect the organization.'
  },
  {
    id: 'risk',
    name: 'Risk management',
    modules: ['func-supplier-risk', 'func-category-mgmt'],
    description: 'Spot, assess and mitigate supplier and supply chain risk.'
  },
  {
    id: 'analytics',
    name: 'Spend analytics',
    modules: ['func-spend-analysis', 'func-should-cost'],
    description: 'Turn spend data into savings opportunities and decisions.'
  }
];

PS.skillPortfolio.getSkillLevel = function (skillId) {
  var skill = PS.skillPortfolio.SKILL_TREE.filter(function (s) { return s.id === skillId; })[0];
  if (!skill) return 0;
  var completed = 0;
  skill.modules.forEach(function (modId) {
    if (PS.academy.isCompleted(modId)) completed++;
  });
  return Math.round((completed / skill.modules.length) * 5);
};

PS.skillPortfolio.getOverallLevel = function () {
  var total = 0;
  PS.skillPortfolio.SKILL_TREE.forEach(function (skill) {
    total += PS.skillPortfolio.getSkillLevel(skill.id);
  });
  return Math.round(total / PS.skillPortfolio.SKILL_TREE.length);
};

PS.skillPortfolio.getLevelLabel = function (level) {
  if (level >= 5) return 'Master';
  if (level >= 4) return 'Expert';
  if (level >= 3) return 'Practitioner';
  if (level >= 2) return 'Apprentice';
  if (level >= 1) return 'Beginner';
  return 'New';
};

PS.route('portfolio', function () {
  PS.pageTitle = 'Skill portfolio';
  var overallLevel = PS.skillPortfolio.getOverallLevel();
  var levelLabel = PS.skillPortfolio.getLevelLabel(overallLevel);

  var html = '<div class="card">' +
    '<div class="card-head"><h1>Skill portfolio</h1></div>' +
    '<p class="lead">Your level across six competency areas, drawn from the modules you have completed.</p>' +
    '<div style="display:flex;align-items:center;gap:16px;margin-top:14px">' +
    '<div style="font-size:2.6em;font-weight:700;color:var(--accent)">' + overallLevel + '/5</div>' +
    '<div><div style="font-size:1.2em;font-weight:600">' + PS.esc(levelLabel) + '</div>' +
    '<div class="note">Overall competency</div></div>' +
    '</div>' +
    '</div>';

  html += '<div class="card">' +
    '<h2>Skill tree</h2>' +
    '<div class="grid grid-3" style="margin-top:14px">';

  PS.skillPortfolio.SKILL_TREE.forEach(function (skill) {
    var level = PS.skillPortfolio.getSkillLevel(skill.id);
    var pct = (level / 5) * 100;
    var color = level >= 4 ? 'var(--ok)' : (level >= 2 ? 'var(--warn-2)' : 'var(--mute)');

    html += '<div class="card" style="text-align:center;padding:18px">' +
      '<h3 style="margin:0 0 4px;font-size:.95em">' + PS.esc(skill.name) + '</h3>' +
      '<div style="font-size:.82em;color:var(--mute);margin-bottom:12px">' + PS.esc(skill.description) + '</div>' +
      '<div class="bar-track" style="margin-bottom:8px"><div class="bar-fill" style="background:' + color + ';width:' + pct + '%"></div></div>' +
      '<div style="font-weight:600;color:' + color + '">' + level + '/5 &middot; ' + PS.esc(PS.skillPortfolio.getLevelLabel(level)) + '</div>' +
      '</div>';
  });

  html += '</div></div>';

  html += '<div class="card">' +
    '<h2>Completed modules</h2>';

  var completedModules = 0;
  var totalModules = 0;

  PS.skillPortfolio.SKILL_TREE.forEach(function (skill) {
    html += '<h3 style="margin-top:14px">' + PS.esc(skill.name) + '</h3><ul style="margin-top:8px;padding-left:20px">';
    skill.modules.forEach(function (modId) {
      var func = PS.byId('academy', modId);
      if (!func) return;
      totalModules++;
      var isComp = PS.academy.isCompleted(modId);
      if (isComp) completedModules++;
      html += '<li style="margin-bottom:4px">' + PS.esc(func.title) + (isComp ? ' <span class="level-pill" style="background:var(--ok-soft);color:var(--ok)">Complete</span>' : '') + '</li>';
    });
    html += '</ul>';
  });

  html += '<div class="hub-note" style="margin-top:14px"><strong>' + completedModules + '</strong> of <strong>' + totalModules + '</strong> modules completed across the six areas.</div>' +
    '</div>';

  html += '<div class="card">' +
    '<h2>Export</h2>' +
    '<p class="note">A plain-text summary you can paste into a review or a CV.</p>' +
    '<button type="button" class="btn btn-primary" data-act="portfolio-export">Copy summary</button>' +
    '<div id="portfolioExportResult" style="margin-top:12px"></div>' +
    '</div>';

  PS.pageInit = function () {
    PS.acts['portfolio-export'] = function () {
      var summary = PS.generatePortfolioSummary();
      PS.$('#portfolioExportResult').innerHTML = '<div class="alert alert-info"><pre style="white-space:pre-wrap;font-size:.85em">' + PS.esc(summary) + '</pre></div>';
      PS.copy(summary, 'Portfolio summary');
    };
  };

  return html;
});

PS.generatePortfolioSummary = function () {
  var overallLevel = PS.skillPortfolio.getOverallLevel();
  var levelLabel = PS.skillPortfolio.getLevelLabel(overallLevel);
  var lines = [
    'PROCUREMENT SKILL PORTFOLIO',
    'Level: ' + overallLevel + '/5 (' + levelLabel + ')',
    'Generated: ' + PS.dateStr(),
    '',
    'COMPETENCIES:'
  ];

  PS.skillPortfolio.SKILL_TREE.forEach(function (skill) {
    var level = PS.skillPortfolio.getSkillLevel(skill.id);
    lines.push('  ' + skill.name + ': ' + level + '/5 ' + PS.skillPortfolio.getLevelLabel(level));
  });

  lines.push('', 'COMPLETED MODULES:');
  PS.skillPortfolio.SKILL_TREE.forEach(function (skill) {
    skill.modules.forEach(function (modId) {
      if (PS.academy.isCompleted(modId)) {
        var func = PS.byId('academy', modId);
        if (func) lines.push('  ' + func.title);
      }
    });
  });

  lines.push('', 'Generated by Procure Sherpa');
  return lines.join('\n');
};
