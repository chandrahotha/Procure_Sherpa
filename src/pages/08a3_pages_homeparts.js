/* ==========================================================
   Procure Sherpa v3.1 - Home Page Components
   Command Center, rebuilt on the institutional design system.

   Every surface here builds through src/ui/ (PS.ui.card, cardHead,
   stat, statGrid, note, btnRow, empty) and the inst-* classes in
   01n_design_system.css, so one design change lands on the whole
   page. Inline styles and emoji decoration are removed: colour marks
   meaning (the jade accent and the altitude colours), never decoration.

   Behaviour is unchanged: same links, same data, same i18n attributes,
   same problem-form action, same daily tip and weekly challenge.
   ========================================================== */

PS.homeStartHere = function () {
  var stats = PS.academy ? PS.academy.getStats() : { completedCount: 0, totalCount: 19, pct: 0, currentFunc: 'func-mission-value' };
  var saved = PS.saved && PS.saved.list ? PS.saved.list() : [];
  var isNew = stats.completedCount === 0 && saved.length === 0;
  var funcs = PS.ACADEMY_FUNCTIONS || [];
  var curFunc = funcs.filter(function (f) { return f.id === stats.currentFunc; })[0] || funcs[0];
  var tip = (PS.dailyTips && PS.dailyTips.getTipOfDay) ? PS.dailyTips.getTipOfDay() : null;
  var challenge = (PS.dailyTips && PS.dailyTips.getChallengeOfWeek) ? PS.dailyTips.getChallengeOfWeek() : null;

  var primary, secondary;
  var prof = PS.user ? PS.user.getProfile() : { role: 'beginner', track: 'academy' };
  var operational = prof.track === 'operations';
  var moduleCount = new Set(funcs.map(function (f) { return f.module; })).size;
  var curriculumNote = funcs.length + ' functions across ' + moduleCount + ' modules, beginner to advanced';
  if (isNew) {
    if (operational) {
      primary = { href: '#/operations', label: 'Start with the Operations Hub', note: 'Six phases of the work, and every procedure, checklist, template and calculator that belongs to them.' };
      secondary = { href: '#/academy', label: 'Or learn the theory first', note: curriculumNote + '.' };
    } else {
      primary = { href: '#/academy', label: 'Start the Academy', note: 'With a quiz and a sandbox in each: ' + curriculumNote + '.' };
      secondary = { href: '#/what', label: 'Or describe a live problem', note: 'Map a situation to the right SOP, checklist and calculator.' };
    }
  } else if (saved.length) {
    primary = { href: '#/saved', label: 'Resume: ' + (saved[0].title || 'your saved work'), note: saved.length + ' item' + (saved.length === 1 ? '' : 's') + ' saved in this browser.' };
    secondary = { href: curFunc ? '#/academy/' + encodeURIComponent(curFunc.id) : '#/next-up', label: 'Next lesson: ' + (curFunc ? curFunc.title : 'continue'), note: 'Pick up where the Academy left off.' };
  } else {
    primary = { href: curFunc ? '#/academy/' + encodeURIComponent(curFunc.id) : '#/next-up', label: 'Continue: ' + (curFunc ? curFunc.title : 'the Academy'), note: stats.completedCount + ' of ' + stats.totalCount + ' functions mastered so far.' };
    secondary = { href: '#/next-up', label: 'What to learn next', note: 'A recommendation based on your quiz scores and open modules.' };
  }

  var start = PS.ui.card(
    PS.ui.cardHead(PS.esc(isNew ? 'Start here' : 'Pick up where you left off')) +
    '<p class="inst-home-lead">' + PS.esc(primary.note) + '</p>' +
    PS.ui.btnRow('<a class="inst-home-btn inst-home-btn--primary" href="' + PS.esc(primary.href) + '">' + PS.esc(primary.label) + ' <span aria-hidden="true">&rarr;</span></a>' +
      '<a class="inst-home-btn inst-home-btn--ghost" href="' + PS.esc(secondary.href) + '">' + PS.esc(secondary.label) + '</a>'),
    { class: 'inst-home-start inst-home-card--primary' }
  );

  var problem = '<form class="inst-home-problem" id="homeProblemForm">' +
    '<label class="sr-only" for="homeWhat">Describe the procurement problem you are working on</label>' +
    '<input type="text" id="homeWhat" maxlength="200" placeholder="Describe a procurement problem in your own words">' +
    '<button type="button" class="inst-home-btn inst-home-btn--primary" data-act="home-what-run">Find the tools</button>' +
    '</form>' +
    '<p class="note inst-home-hint">Or <a href="#/search">search everything</a>, or press <kbd>Ctrl</kbd>+<kbd>K</kbd>.</p>';

  var today = '';
  if (tip) {
    today = PS.ui.card(
      '<p class="inst-home-kicker inst-home-today-kicker">Today</p>' +
      '<div class="inst-home-tip"><span class="inst-home-chip">' + PS.esc(tip.category) + '</span>' +
      '<p>' + PS.esc(tip.tip) + '</p>' +
      '<p class="note inst-home-tip-source">Source: ' + PS.esc(tip.source) + ' &middot; <a href="#/daily-tip">more tips</a></p></div>' +
      (challenge ? '<div class="inst-home-challenge"><strong>This week</strong> ' + PS.esc(challenge.title) +
        ' &middot; ' + PS.esc(challenge.desc) + ' <a href="#/labs">Open the labs</a></div>' : ''),
      { class: 'inst-home-today' }
    );
  }

  return '<section class="inst-home-section no-print">' + start + problem + today + '</section>';
};

PS.homeWelcomeCard = function () {
  var prof = PS.user ? PS.user.getProfile() : { name: 'Procurement Specialist', role: 'beginner', track: 'academy', company: '' };
  var roleMeta = PS.user ? PS.user.getRoleMeta(prof.role) : { title: 'Procurement Beginner & Enthusiast' };
  var trackMeta = PS.user ? PS.user.getTrackMeta(prof.track) : { label: 'Academy Learner' };
  var initials = PS.user ? PS.user.getInitials(prof.name) : 'PS';

  return PS.ui.card(
    '<div class="inst-home-user-row">' +
    '<div class="inst-home-avatar">' + PS.esc(initials) + '</div>' +
    '<div class="inst-home-user-meta">' +
    '<h1 class="inst-home-welcome-title">Welcome back, ' + PS.esc(prof.name) + '</h1>' +
    '<div class="inst-home-user-meta-row">' +
    '<span class="inst-home-chip inst-home-chip--role">' + PS.esc(roleMeta.title) + '</span>' +
    (prof.company ? '<span class="inst-home-chip inst-home-chip--company">&bull; ' + PS.esc(prof.company) + '</span>' : '') +
    '<span class="inst-home-chip inst-home-chip--track">' + PS.esc(trackMeta.label) + '</span>' +
    '</div></div></div>' +
    PS.ui.btnRow('<button type="button" class="inst-home-btn inst-home-btn--ghost" data-act="user-profile-open" data-i18n="common.edit"><span class="inst-home-icon" aria-hidden="true">&#9881;</span> ' + (PS.i18n ? PS.i18n.t('common.edit') : 'Edit') + ' Profile & Role</button>'),
    { class: 'inst-home-welcome' }
  );
};

PS.homeDualHub = function () {
  var stats = PS.academy ? PS.academy.getStats() : { completedCount: 0, totalCount: 19, pct: 0, badgesEarned: 0 };
  var allFuncs = PS.ACADEMY_FUNCTIONS || [];
  var curFunc = allFuncs.filter(function (f) { return f.id === stats.currentFunc; })[0] || allFuncs[0];
  var d = PS.data || {};
  var nSop = d.sop ? d.sop.length : 13;
  var nCalc = d.calc ? d.calc.length : 19;
  var nCl = d.cl ? d.cl.length : 27;
  var nTpl = d.tpl ? d.tpl.length : 33;
  var nModules = 0, seen = {};
  (PS.ACADEMY_FUNCTIONS || []).forEach(function (f) { if (!seen[f.module]) { seen[f.module] = 1; nModules++; } });

  var academyCard = PS.ui.card(
    '<div class="inst-home-hub-head">' +
    '<span class="inst-home-hub-badge inst-home-hub-badge--learning">Learning Hub</span>' +
    '<span class="inst-home-hub-progress">' + stats.completedCount + ' of ' + stats.totalCount + ' mastered</span>' +
    '</div>' +
    '<h2 class="inst-home-hub-title">Procurement Academy</h2>' +
    '<p class="inst-home-hub-desc">Interactive digital learning journeys for newcomers, enthusiasts and practitioners. Core commercial functions, step by step, with worked examples and knowledge checks.</p>' +
    '<div class="inst-home-hub-meta">' +
    '<div class="inst-home-hub-stat"><span class="inst-home-hub-stat-val">' + nModules + '</span><span class="inst-home-hub-stat-lab">core learning modules</span></div>' +
    '<div class="inst-home-hub-stat"><span class="inst-home-hub-stat-val">' + allFuncs.length + '</span><span class="inst-home-hub-stat-lab">practical functions</span></div>' +
    '<div class="inst-home-hub-stat"><span class="inst-home-hub-stat-val">' + stats.badgesEarned + '</span><span class="inst-home-hub-stat-lab">badges earned</span></div>' +
    '</div>' +
    '<div class="inst-home-progress">' +
    '<div class="inst-home-progress-meta"><span>Academy completion</span><span>' + stats.pct + '%</span></div>' +
    '<div class="inst-home-progress-track"><div class="inst-home-progress-fill" style="width:' + stats.pct + '%;"></div></div>' +
    '</div>' +
    PS.ui.btnRow('<a class="inst-home-btn inst-home-btn--primary" href="#/academy/' + (curFunc ? curFunc.id : 'func-mission-value') + '">' + (stats.completedCount > 0 ? 'Resume: ' + PS.esc(curFunc ? curFunc.title : '') : 'Start Academy Curriculum') + ' <span aria-hidden="true">&rarr;</span></a>' +
      '<a class="inst-home-btn inst-home-btn--ghost" href="#/academy">All modules</a>'),
    { class: 'inst-home-hub-card inst-home-hub-card--learning' }
  );

  var operationsCard = PS.ui.card(
    '<div class="inst-home-hub-head">' +
    '<span class="inst-home-hub-badge inst-home-hub-badge--operations">Operations Hub</span>' +
    '<span class="inst-home-hub-progress">' + nSop + ' SOPs &middot; ' + nCl + ' checklists &middot; ' + nTpl + ' templates</span>' +
    '</div>' +
    '<h2 class="inst-home-hub-title">Operations Hub</h2>' +
    '<p class="inst-home-hub-desc">The operational reference for active procurement execution: controlled SOPs, financial calculators, compliance checklists and production templates, arranged by lifecycle phase.</p>' +
    '<div class="inst-home-hub-meta">' +
    '<div class="inst-home-hub-stat"><span class="inst-home-hub-stat-val">' + nSop + '</span><span class="inst-home-hub-stat-lab">controlled SOPs</span></div>' +
    '<div class="inst-home-hub-stat"><span class="inst-home-hub-stat-val">' + nCalc + '</span><span class="inst-home-hub-stat-lab">financial calculators</span></div>' +
    '<div class="inst-home-hub-stat"><span class="inst-home-hub-stat-val">' + nCl + '</span><span class="inst-home-hub-stat-lab">operational checklists</span></div>' +
    '<div class="inst-home-hub-stat"><span class="inst-home-hub-stat-val">' + nTpl + '</span><span class="inst-home-hub-stat-lab">production templates</span></div>' +
    '</div>' +
    PS.ui.btnRow('<a class="inst-home-btn inst-home-btn--primary" href="#/operations">Open Operations Hub <span aria-hidden="true">&rarr;</span></a>' +
      '<a class="inst-home-btn inst-home-btn--ghost" href="#/list/sop">SOPs</a>' +
      '<a class="inst-home-btn inst-home-btn--ghost" href="#/list/calc">Calculators</a>'),
    { class: 'inst-home-hub-card inst-home-hub-card--operations' }
  );

  return PS.ui.card(
    academyCard + operationsCard,
    { class: 'inst-home-dual-hub no-print' }
  );
};

PS.homeSmartResume = function () {
  var savedList = (PS.saved && PS.saved.list) ? PS.saved.list() : [];

  if (savedList.length > 0) {
    var latest = savedList[0];
    return PS.ui.card(
      '<div class="inst-home-resume-row">' +
      '<div class="inst-home-resume-left">' +
      '<span class="inst-home-chip inst-home-chip--state inst-home-chip--active">Active workspace</span>' +
      '<span><strong>' + PS.esc(latest.title || latest.id) + '</strong> <span class="inst-home-mono">(' + PS.esc(PS.dateTime(latest.savedAt)) + ')</span></span>' +
      '</div>' +
      '<div class="inst-home-resume-right">' +
      '<a class="inst-home-btn inst-home-btn--primary inst-home-btn--sm" href="#/' + PS.esc(latest.type) + '/' + PS.esc(latest.id) + '">Reopen draft <span aria-hidden="true">&rarr;</span></a>' +
      '<a class="inst-home-btn inst-home-btn--ghost inst-home-btn--sm" href="#/saved">View all (' + savedList.length + ')</a>' +
      '</div></div>',
      { class: 'inst-home-smart-resume no-print' }
    );
  }

  return PS.ui.card(
    '<div class="inst-home-resume-row inst-home-resume-row--empty">' +
    '<div class="inst-home-resume-left">' +
    '<span class="inst-home-chip inst-home-chip--state inst-home-chip--ok">Getting started</span>' +
    '<span>New to Procure Sherpa? Follow the guided curriculum in the Academy or explore the Operations Hub.</span>' +
    '</div>' +
    '<div class="inst-home-resume-right">' +
    '<a class="inst-home-btn inst-home-btn--primary inst-home-btn--sm" href="#/academy">Start learning <span aria-hidden="true">&rarr;</span></a>' +
    '<a class="inst-home-btn inst-home-btn--ghost inst-home-btn--sm" href="#/what">What should I do?</a>' +
    '</div></div>',
    { class: 'inst-home-smart-resume no-print' }
  );
};

PS.homeThinkingPoint = function () {
  var pool = [];
  (PS.ACADEMY_FUNCTIONS || []).forEach(function (f) {
    (f.thinkingPoints || []).forEach(function (tp) {
      if (tp && tp.quote) pool.push({ tp: tp, f: f });
    });
  });
  if (!pool.length) return '';
  var day = Math.floor(Date.now() / 86400000);
  var pick = pool[day % pool.length];
  var explain = String(pick.tp.explanation || '');
  if (explain.length > 320) explain = explain.slice(0, 317).replace(/\s+\S*$/, '') + '\u2026';
  return PS.ui.card(
    '<p class="inst-home-kicker inst-home-thinking-kicker">Today&rsquo;s thinking point &middot; from the Academy curriculum</p>' +
    '<blockquote class="inst-home-thinking-quote">&ldquo;' + PS.esc(pick.tp.quote) + '&rdquo;</blockquote>' +
    '<div class="inst-home-thinking-explain">' + PS.esc(explain) + '</div>' +
    (pick.tp.reflectionPrompt ? '<p class="note inst-home-thinking-reflect"><strong>Reflect:</strong> ' + PS.esc(pick.tp.reflectionPrompt) + '</p>' : '') +
    PS.ui.btnRow('<a class="inst-home-btn inst-home-btn--primary inst-home-btn--sm" href="#/academy/' + encodeURIComponent(pick.f.id) + '">Study &ldquo;' + PS.esc(pick.f.title) + '&rdquo; <span aria-hidden="true">&rarr;</span></a>' +
      '<a class="inst-home-btn inst-home-btn--ghost inst-home-btn--sm" href="#/academy/' + encodeURIComponent(pick.f.id) + '?tab=think">Open the Think tab</a>') +
    '<p class="note inst-home-thinking-source">' + PS.esc(pick.f.module) + ' &middot; an authored teaching point from the lesson, not a sourced statistic</p>',
    { class: 'inst-home-thinking-point thinking-point-card no-print' }
  );
};

PS.homeQuickCalc = function () {
  var recent = PS.recent.list().filter(function (r) { return r.type === 'calc'; }).slice(0, 3);
  var popular = [
    { id: 'calc-tco', title: 'TCO' },
    { id: 'calc-compare-quotes', title: 'Compare Quotes' },
    { id: 'calc-landed-cost', title: 'Landed Cost' },
    { id: 'calc-negotiation-savings', title: 'Negotiation Savings' }
  ];
  var seen = {};
  recent.forEach(function (r) { seen[r.id] = 1; });
  var chips = popular.filter(function (c) { return !seen[c.id]; }).map(function (c) {
    return '<a class="inst-home-btn inst-home-btn--ghost inst-home-btn--sm" href="#/calc/' + PS.esc(c.id) + '">' + PS.esc(c.title) + '</a>';
  }).join('');
  var recentChips = recent.map(function (r) {
    return '<a class="inst-home-btn inst-home-btn--ghost inst-home-btn--sm" href="#/calc/' + PS.esc(r.id) + '">' + PS.esc(r.title || r.id) + '</a>';
  }).join('');
  if (!chips && !recentChips) return '';
  return PS.ui.card(
    '<div class="inst-home-hub-head">' +
    '<span class="inst-home-hub-badge">Quick calculator</span>' +
    '<span class="inst-home-hub-progress">Recent &middot; popular</span>' +
    '</div>' +
    PS.ui.btnRow(recentChips + chips) +
    '<p class="note inst-home-note">Jump straight into the tools you use most. Results stay local.</p>',
    { class: 'inst-home-quick-calc no-print' }
  );
};

PS.homePhase11 = function () {
  var cards = [
    { href: '#/copilot', title: 'Procurement Copilot', desc: 'Ask the offline assistant about concepts, processes and calculators - answers with citations.' },
    { href: '#/exams', title: 'Practice Exams', desc: 'Timed, randomised practice exams from the Academy question bank, scored against a pass mark. Recorded in this browser only.' },
    { href: '#/spend-model', title: 'Spend Data Model', desc: 'One category-supplier hierarchy feeding the Pareto and Kraljic charts.' },
    { href: '#/docpack', title: 'Document Pack Builder', desc: 'Assemble RFI / RFP / contract packs with a cover sheet and contents.' }
  ];
  return PS.ui.card(
    '<div class="inst-home-hub-head">' +
    '<span class="inst-home-hub-badge">Intelligence &amp; automation</span>' +
    '<span class="inst-home-hub-progress inst-home-badge--phase">Phase 11</span>' +
    '</div>' +
    '<div class="inst-home-phase-grid">' +
    cards.map(function (c) {
      return '<a class="inst-home-phase-card" href="' + c.href + '">' +
        '<h3 class="inst-home-phase-title">' + PS.esc(c.title) + '</h3>' +
        '<p class="inst-home-phase-desc">' + PS.esc(c.desc) + '</p>' +
        '</a>';
    }).join('') +
    '</div>',
    { class: 'inst-home-phase11 no-print' }
  );
};

PS.homeQuickActions = function () {
  var actions = [
    { id: 'new-calc', label: 'New Calculation', href: '#/list/calc', desc: 'Compare quotes, TCO, landed cost, savings' },
    { id: 'new-sop', label: 'Browse SOPs', href: '#/list/sop', desc: 'Controlled procedures for every phase' },
    { id: 'new-checklist', label: 'Checklists', href: '#/list/cl', desc: 'Verify compliance at every step' },
    { id: 'new-template', label: 'Templates', href: '#/list/tpl', desc: 'RFQ, RFP, contracts, justifications' },
    { id: 'what-do', label: 'What should I do?', href: '#/what', desc: 'Guided routing from your problem' },
    { id: 'academy', label: 'Academy', href: '#/academy', desc: 'Structured learning paths' }
  ];

  var html = '<div class="inst-home-quick-actions">';
  actions.forEach(function (a) {
    html += '<a class="inst-home-quick-action" href="' + a.href + '" title="' + PS.esc(a.desc) + '">' +
      '<span class="inst-home-quick-action-label">' + PS.esc(a.label) + '</span>' +
      '</a>';
  });
  html += '</div>';
  return html;
};
