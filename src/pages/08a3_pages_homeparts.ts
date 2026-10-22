/* ==========================================================
   Procure Sherpa v2.1 - Home Page Components
   Clean, segregated Dual-Hub Command Center
   1. Personalized Welcome Card with Local User Account
   2. Segregated Dual-Hub Gateway (Academy vs Operations)
   3. Smart Resume & Workspace Status
   4. Featured Procurement Thinking Point
   ========================================================== */

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
    '<button type="button" class="btn btn-sm btn-ghost" data-act="user-profile-open">&#9881; Edit Profile & Role</button>' +
    '</div>' +
    '</section>';
};

PS.homeDualHub = function () {
  var stats = PS.academy ? PS.academy.getStats() : { completedCount: 0, totalCount: 16, pct: 0, badgesEarned: 0 };
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
    '<div class="academy-progress-track" style="margin-bottom:16px;"><div class="academy-progress-fill" style="width:' + stats.pct + '%;"></div></div>' +
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
    '<span class="t-xs t-dim font-bold">' + nSop + ' SOPs &middot; ' + nCalc + ' Calculators</span>' +
    '</div>' +
    '<div class="hub-card-title">Operations Hub</div>' +
    '<p class="hub-card-desc">The complete operational reference for active procurement execution. Controlled standard operating procedures, financial calculators, contract review checklists, and production RFP templates arranged by lifecycle phase.</p>' +
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
