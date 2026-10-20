/* ==========================================================
   Procure Sherpa v2.1 - Home Page Components
   Clean, segregated Dual-Hub Command Center
   1. Personalized Welcome Card with Local User Account
   2. Segregated Dual-Hub Gateway (Academy vs Operations)
   3. Smart Resume & Workspace Status
   4. Featured Procurement Thinking Point
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
  if (isNew) {
    if (operational) {
      primary = { href: '#/operations', label: 'Start with the Operations Hub', note: 'Six phases of the work, and every procedure, checklist, template and calculator that belongs to them.' };
      secondary = { href: '#/academy', label: 'Or learn the theory first', note: 'Eleven modules, twenty-five functions, beginner to advanced.' };
    } else {
      primary = { href: '#/academy', label: 'Start the Academy', note: 'Twenty-five functions across ten modules, beginner to advanced, with a quiz and a sandbox in each.' };
      secondary = { href: '#/what', label: 'Or describe a live problem', note: 'Map a situation to the right SOP, checklist and calculator.' };
    }
  } else if (saved.length) {
    primary = { href: '#/saved', label: 'Resume: ' + (saved[0].title || 'your saved work'), note: saved.length + ' item' + (saved.length === 1 ? '' : 's') + ' saved in this browser.' };
    secondary = { href: curFunc ? '#/academy/' + encodeURIComponent(curFunc.id) : '#/next-up', label: 'Next lesson: ' + (curFunc ? curFunc.title : 'continue'), note: 'Pick up where the Academy left off.' };
  } else {
    primary = { href: curFunc ? '#/academy/' + encodeURIComponent(curFunc.id) : '#/next-up', label: 'Continue: ' + (curFunc ? curFunc.title : 'the Academy'), note: stats.completedCount + ' of ' + stats.totalCount + ' functions mastered so far.' };
    secondary = { href: '#/next-up', label: 'What to learn next', note: 'A recommendation based on your quiz scores and open modules.' };
  }

  return '<section class="home-start no-print">' +
    '<div class="home-start-main">' +
    '<span class="home-start-kicker">' + (isNew ? 'Start here' : 'Pick up where you left off') + '</span>' +
    '<a class="home-start-primary" href="' + primary.href + '">' + PS.esc(primary.label) + ' &rarr;</a>' +
    '<p class="home-start-note">' + PS.esc(primary.note) + '</p>' +
    '<a class="home-start-secondary" href="' + secondary.href + '">' + PS.esc(secondary.label) + '</a>' +
    '<p class="home-start-note">' + PS.esc(secondary.note) + '</p>' +
    '<form class="home-start-problem" id="homeProblemForm">' +
    '<label class="sr-only" for="homeWhat">Describe the procurement problem you are working on</label>' +
    '<input type="text" id="homeWhat" maxlength="200" placeholder="Describe a procurement problem in your own words">' +
    '<button type="button" class="btn btn-primary" data-act="home-what-run">Find the tools</button>' +
    '</form>' +
    '<p class="note home-start-hint">Or <a href="#/search">search everything</a>, or press <kbd>Ctrl</kbd>+<kbd>K</kbd>.</p>' +
    '</div>' +
    (tip ? '<div class="home-start-today">' +
      '<span class="home-start-kicker">Today</span>' +
      '<div class="home-tip"><span class="badge">' + PS.esc(tip.category) + '</span>' +
      '<p>' + PS.esc(tip.tip) + '</p>' +
      '<p class="note">Source: ' + PS.esc(tip.source) + ' &middot; <a href="#/daily-tip">more tips</a></p></div>' +
      (challenge ? '<div class="home-challenge"><strong>This week</strong> ' + PS.esc(challenge.title) +
        ' &middot; ' + PS.esc(challenge.desc) + ' <a href="#/labs">Open the labs</a></div>' : '') +
      '</div>' : '') +
    '</section>';
};

PS.homeWelcomeCard = function () {
  var prof = PS.user ? PS.user.getProfile() : { name: 'Procurement Specialist', role: 'beginner', track: 'academy', company: '' };
  var roleMeta = PS.user ? PS.user.getRoleMeta(prof.role) : { title: 'Procurement Beginner & Enthusiast' };
  var trackMeta = PS.user ? PS.user.getTrackMeta(prof.track) : { label: 'Academy Learner' };
  var initials = PS.user ? PS.user.getInitials(prof.name) : 'PS';

  return '<section class="home-welcome-card no-print">' +
    '<div class="home-user-badge-row">' +
    '<div class="home-user-avatar" style="background:' + PS.esc(prof.avatarBg || 'var(--accent)') + '">' + PS.esc(initials) + '</div>' +
    '<div class="home-user-meta">' +
    '<h1>Welcome back, ' + PS.esc(prof.name) + '</h1>' +
    '<div class="flex items-center gap8 flex-wrap">' +
    '<span class="home-role-pill">' + PS.esc(roleMeta.title) + '</span>' +
    (prof.company ? '<span class="home-track-pill">&bull; ' + PS.esc(prof.company) + '</span>' : '') +
    '<span class="home-track-pill">' + PS.esc(trackMeta.label) + '</span>' +
    '</div></div></div>' +
    '<div class="btn-row" style="margin:0;">' +
    '<button type="button" class="btn btn-sm btn-ghost" data-act="user-profile-open" data-i18n="common.edit">&#9881; ' + (PS.i18n ? PS.i18n.t('common.edit') : 'Edit') + ' Profile & Role</button>' +
    '</div>' +
    '</section>';
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

  return '<section class="dual-hub-grid no-print">' +
    /* Card 1: Procurement Academy (The Learning Hub) */
    '<div class="hub-portal-card is-learning">' +
    '<div class="hub-card-header">' +
    '<span class="hub-badge learning">Learning Hub &middot; Beginner to Advanced</span>' +
    '<span class="t-xs t-dim font-bold">' + stats.completedCount + ' of ' + stats.totalCount + ' Mastered</span>' +
    '</div>' +
    '<div class="hub-card-title">Procurement Academy</div>' +
    '<p class="hub-card-desc">Interactive digital learning journeys for newcomers, enthusiasts, and practitioners. Learn core commercial functions step by step with thought-provoking explanations, realistic examples, and knowledge checks.</p>' +
    '<div class="hub-progress">' +
    '<div class="hub-progress-meta"><span>Academy completion</span><span>' + stats.pct + '%</span></div>' +
    '<div class="academy-progress-track"><div class="academy-progress-fill" style="width:' + stats.pct + '%;"></div></div>' +
    '</div>' +
    '<div class="hub-quick-features">' +
    '<div class="hub-feature-item"><span>📚</span><span>' + nModules + ' Core Learning Modules</span></div>' +
    '<div class="hub-feature-item"><span>🎯</span><span>' + allFuncs.length + ' Practical Functions</span></div>' +
    '<div class="hub-feature-item"><span>💡</span><span>Real-Time Thinking Points</span></div>' +
    '<div class="hub-feature-item"><span>🏆</span><span>' + stats.badgesEarned + ' Badges Earned</span></div>' +
    '</div>' +
    '<div class="hub-card-footer">' +
    '<a class="btn btn-primary" href="#/academy/' + (curFunc ? curFunc.id : 'func-mission-value') + '">' +
    (stats.completedCount > 0 ? 'Resume: ' + PS.esc(curFunc ? curFunc.title : '') : 'Start Academy Curriculum') + ' &rarr;</a>' +
    '<a class="btn btn-ghost" href="#/academy">All Modules</a>' +
    '</div>' +
    '</div>' +

    /* Card 2: Operations Hub (Execution Hub) */
    '<div class="hub-portal-card is-operations">' +
    '<div class="hub-card-header">' +
    '<span class="hub-badge operations">Operations Hub &middot; Practitioner Tools</span>' +
    '<span class="t-xs t-dim font-bold">' + nSop + ' SOPs &middot; ' + nCl + ' checklists &middot; ' + nTpl + ' templates</span>' +
    '</div>' +
    '<div class="hub-card-title">Operations Hub</div>' +
    '<p class="hub-card-desc">The complete operational reference for active procurement execution. Controlled standard operating procedures, financial calculators, contract review checklists, and production RFP templates arranged by lifecycle phase.</p>' +
    '<div class="hub-progress">' +
    '<div class="hub-progress-meta"><span>Work phases</span><span>' + (PS.LIFECYCLE_PHASES ? PS.LIFECYCLE_PHASES.length : 6) + '</span></div>' +
    '<div class="hub-phase-strip">' +
    (PS.LIFECYCLE_PHASES || []).map(function (ph, i) {
      return '<span class="hub-phase-chip" title="' + PS.esc(ph.title) + '">' + (i + 1) + '</span>';
    }).join('') +
    '</div></div>' +
    '<div class="hub-quick-features">' +
    '<div class="hub-feature-item"><span>📋</span><span>' + nSop + ' Controlled SOPs</span></div>' +
    '<div class="hub-feature-item"><span>🧮</span><span>' + nCalc + ' Financial Calculators</span></div>' +
    '<div class="hub-feature-item"><span>☑️</span><span>' + nCl + ' Operational Checklists</span></div>' +
    '<div class="hub-feature-item"><span>📝</span><span>' + nTpl + ' Production Templates</span></div>' +
    '</div>' +
    '<div class="hub-card-footer">' +
    '<a class="btn btn-ops" href="#/operations">Open Operations Hub &rarr;</a>' +
    '<div class="flex gap8">' +
    '<a class="btn btn-sm" href="#/list/sop">SOPs</a>' +
    '<a class="btn btn-sm" href="#/list/calc">Calculators</a>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</section>';
};

PS.homeSmartResume = function () {
  var savedList = (PS.saved && PS.saved.list) ? PS.saved.list() : [];

  if (savedList.length > 0) {
    var latest = savedList[0];
    return '<div class="card card-tight flex items-center justify-between no-print" style="margin-bottom:20px;">' +
      '<div class="flex items-center gap12">' +
      '<span class="badge badge-type">Active Workspace</span>' +
      '<span><strong>' + PS.esc(latest.title || latest.id) + '</strong> <span class="t-dim t-xs">(' + PS.esc(PS.dateTime(latest.savedAt)) + ')</span></span>' +
      '</div>' +
      '<div class="btn-row" style="margin:0;">' +
      '<a class="btn btn-sm btn-primary" href="#/' + PS.esc(latest.type) + '/' + PS.esc(latest.id) + '">Reopen Draft &rarr;</a>' +
      '<a class="btn btn-sm btn-ghost" href="#/saved">View All (' + savedList.length + ')</a>' +
      '</div></div>';
  }

  return '<div class="card card-tight flex items-center justify-between no-print" style="margin-bottom:20px;">' +
    '<div class="flex items-center gap12">' +
    '<span class="badge badge-ok">Getting Started</span>' +
    '<span>New to Procure Sherpa? Follow the guided curriculum in Academy or explore the Operations Hub.</span>' +
    '</div>' +
    '<div class="btn-row" style="margin:0;">' +
    '<a class="btn btn-sm btn-primary" href="#/academy">Start Learning &rarr;</a>' +
    '<a class="btn btn-sm btn-ghost" href="#/what">What should I do?</a>' +
    '</div></div>';
};

PS.homeThinkingPoint = function () {
  return '<div class="thinking-point-card no-print" style="margin-bottom:24px;">' +
    '<div class="thinking-point-eyebrow">&#128161; Featured Procurement Thinking Point</div>' +
    '<blockquote class="thinking-point-quote">&ldquo;The cheapest quotation is rarely the lowest-cost purchase.&rdquo;</blockquote>' +
    '<div class="thinking-point-explain">In procurement, purchase price is only what you pay on Day 1. Total Cost of Ownership (TCO) is what you pay across the entire asset lifespan. A supplier offering a 10% discount on equipment that consumes 30% more power and breaks down twice as often will cost your company far more across its operating life than the discount saves.</div>' +
    '<div class="flex items-center flex-wrap" style="gap:12px; margin-top:14px;">' +
    '<a class="btn btn-sm btn-primary" href="#/academy/func-landed-cost-tco">Study TCO in Academy &rarr;</a>' +
    '<a class="btn btn-sm" href="#/calc/calc-tco">Open TCO Calculator</a>' +
    '<a class="btn btn-sm btn-ghost" href="#/sop/sop-procurement-lifecycle">View Lifecycle SOP</a>' +
    '</div></div>';
};

PS.homeQuickActions = function () {
  var actions = [
    { id: 'new-calc', label: 'New Calculation', href: '#/list/calc', icon: '🧮', desc: 'Compare quotes, TCO, landed cost, savings' },
    { id: 'new-sop', label: 'Browse SOPs', href: '#/list/sop', icon: '📋', desc: 'Controlled procedures for every phase' },
    { id: 'new-checklist', label: 'Checklists', href: '#/list/cl', icon: '☑️', desc: 'Verify compliance at every step' },
    { id: 'new-template', label: 'Templates', href: '#/list/tpl', icon: '📝', desc: 'RFQ, RFP, contracts, justifications' },
    { id: 'what-do', label: 'What should I do?', href: '#/what', icon: '🧭', desc: 'Guided routing from your problem' },
    { id: 'academy', label: 'Academy', href: '#/academy', icon: '🎓', desc: 'Structured learning paths' }
  ];

  var html = '<div class="quick-actions no-print">';
  actions.forEach(function (a) {
    html += '<a class="quick-action-btn" href="' + a.href + '" title="' + PS.esc(a.desc) + '">' +
      '<span class="qa-icon">' + a.icon + '</span>' + PS.esc(a.label) + '</a>';
  });
  html += '</div>';
  return html;
};
