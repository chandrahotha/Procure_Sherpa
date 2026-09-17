/* ==========================================================
   Procure Sherpa v2.0 - Home Page Components
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
    '<div class="home-user-avatar" style="background:' + PS.esc(prof.avatarBg || '#4f46e5') + '">' + PS.esc(initials) + '</div>' +
    '<div class="home-user-meta">' +
    '<h1>Welcome back, ' + PS.esc(prof.name) + '</h1>' +
    '<div class="flex items-center gap8 flex-wrap">' +
    '<span class="home-role-pill">' + PS.esc(roleMeta.title) + '</span>' +
    (prof.company ? '<span class="home-track-pill">&bull; ' + PS.esc(prof.company) + '</span>' : '') +
    '<span class="home-track-pill">' + PS.esc(trackMeta.label) + '</span>' +
    '</div></div></div>' +
    '<div class="btn-row" style="margin:0;">' +
    '<button type="button" class="btn btn-sm btn-ghost" data-act="user-profile-open">&#9881; Edit Profile &amp; Role</button>' +
    '</div>' +
    '</section>';
};

PS.homeDualHub = function () {
  var stats = PS.academy ? PS.academy.getStats() : { completedCount: 0, totalCount: 16, pct: 0, badgesEarned: 0 };
  var allFuncs = PS.ACADEMY_FUNCTIONS || [];
  var curFunc = allFuncs.filter(function (f) { return f.id === stats.currentFunc; })[0] || allFuncs[0];

  return '<section class="dual-hub-grid no-print">' +
    /* Card 1: Procurement Academy (The Learning Hub) */
    '<div class="hub-portal-card is-learning">' +
    '<div class="hub-card-header">' +
    '<span class="hub-badge learning">Learning Hub &middot; Beginner to Advanced</span>' +
    '<span class="t-xs t-dim font-bold">' + stats.completedCount + ' of ' + stats.totalCount + ' Mastered</span>' +
    '</div>' +
    '<div class="hub-card-title">Procurement Academy</div>' +
    '<p class="hub-card-desc">Interactive digital learning journeys for procurement newbies, enthusiasts, and practitioners. Learn core commercial functions step by step with thought-provoking explanations, realistic examples, and knowledge checks.</p>' +
    '<div class="academy-progress-track" style="margin-bottom:16px;"><div class="academy-progress-fill" style="width:' + stats.pct + '%;"></div></div>' +
    '<div class="hub-quick-features">' +
    '<div class="hub-feature-item"><span>📚</span><span>8 Core Learning Modules</span></div>' +
    '<div class="hub-feature-item"><span>🎯</span><span>16 Practical Functions</span></div>' +
    '<div class="hub-feature-item"><span>💡</span><span>Real-Time Thinking Points</span></div>' +
    '<div class="hub-feature-item"><span>🏆</span><span>' + stats.badgesEarned + ' Badges Earned</span></div>' +
    '</div>' +
    '<div class="hub-card-footer">' +
    '<a class="btn btn-primary" href="#/academy/' + (curFunc ? curFunc.id : 'func-mission-value') + '">' +
    (stats.completedCount > 0 ? 'Resume: ' + PS.esc(curFunc ? curFunc.title : '') : 'Start Academy Curriculum') + ' &rarr;</a>' +
    '<a class="btn btn-ghost" href="#/academy">All Modules</a>' +
    '</div>' +
    '</div>' +

    /* Card 2: Operations & Knowledge Hub (Execution Hub) */
    '<div class="hub-portal-card is-operations">' +
    '<div class="hub-card-header">' +
    '<span class="hub-badge operations">Operations Hub &middot; Practitioner Tools</span>' +
    '<span class="t-xs t-dim font-bold">13 SOPs &middot; 19 Calculators</span>' +
    '</div>' +
    '<div class="hub-card-title">Operations &amp; Knowledge Hub</div>' +
    '<p class="hub-card-desc">The complete operational reference for active procurement execution. Controlled standard operating procedures, financial calculators, contract review checklists, and production RFP templates arranged by lifecycle phase.</p>' +
    '<div class="hub-quick-features">' +
    '<div class="hub-feature-item"><span>📋</span><span>13 Controlled SOPs</span></div>' +
    '<div class="hub-feature-item"><span>🧮</span><span>19 Financial Calculators</span></div>' +
    '<div class="hub-feature-item"><span>☑️</span><span>27 Operational Checklists</span></div>' +
    '<div class="hub-feature-item"><span>📝</span><span>33 Production Templates</span></div>' +
    '</div>' +
    '<div class="hub-card-footer">' +
    '<a class="btn btn-primary" href="#/operations" style="background:#0d9488; border-color:#0d9488;">Open Operations Hub &rarr;</a>' +
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
  var recentList = (PS.recent && PS.recent.list) ? PS.recent.list() : [];

  if (savedList.length > 0) {
    var latest = savedList[0];
    return '<div class="card card-tight no-print" style="margin-bottom:20px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">' +
      '<div class="flex items-center gap12">' +
      '<span class="badge" style="background:var(--accent-soft); color:var(--accent); font-weight:700;">Active Workspace</span>' +
      '<span><strong>' + PS.esc(latest.title || latest.id) + '</strong> <span class="t-dim t-xs">(' + PS.esc(PS.dateTime(latest.savedAt)) + ')</span></span>' +
      '</div>' +
      '<div class="btn-row" style="margin:0;">' +
      '<a class="btn btn-sm btn-primary" href="#/' + PS.esc(latest.type) + '/' + PS.esc(latest.id) + '">Reopen Draft &rarr;</a>' +
      '<a class="btn btn-sm btn-ghost" href="#/saved">View All (' + savedList.length + ')</a>' +
      '</div></div>';
  }

  return '<div class="card card-tight no-print" style="margin-bottom:20px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">' +
    '<div class="flex items-center gap12">' +
    '<span class="badge" style="background:var(--ok-soft); color:var(--ok); font-weight:700;">Getting Started</span>' +
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
    '<blockquote class="thinking-point-quote">&ldquo;The cheapest quotation is not necessarily the lowest-cost purchase.&rdquo;</blockquote>' +
    '<div class="thinking-point-explain">In procurement, purchase price is only what you pay on Day 1. Total Cost of Ownership (TCO) is what you pay across the entire asset lifespan. A supplier offering a 10% discount on equipment that consumes 30% more power and breaks down twice as often will cost your company millions in lost operating revenue.</div>' +
    '<div class="flex items-center flex-wrap" style="gap:12px; margin-top:14px;">' +
    '<a class="btn btn-sm btn-primary" href="#/academy/func-landed-cost-tco">Study TCO in Academy &rarr;</a>' +
    '<a class="btn btn-sm" href="#/calc/calc-tco">Open TCO Calculator</a>' +
    '<a class="btn btn-sm btn-ghost" href="#/sop/sop-procurement-lifecycle">View Lifecycle SOP</a>' +
    '</div></div>';
};
