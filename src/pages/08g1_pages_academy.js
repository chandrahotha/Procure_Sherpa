/* ==========================================================
   Procure Sherpa v2.0 - Academy Curriculum & Function Pages
   Section: Academy Hub, Function View, 5-Tab Learning Flow
   ========================================================== */
PS.route('academy', function (funcId, params) {
  if (funcId) {
    return PS.renderAcademyFunction(funcId, params);
  }
  return PS.renderAcademyHub();
});

PS.route('academy-progress', function () {
  PS.pageTitle = 'Academy Progress & Transcript';
  var stats = PS.academy.getStats();
  var data = PS.academy.getAll();
  var funcs = PS.ACADEMY_FUNCTIONS || [];

  var html = '<div class="card">' +
    '<div class="card-head"><h1>Academy Mastery Transcript</h1><div class="spacer"></div>' +
    '<a class="btn btn-sm" href="#/certificate">🎓 Credential Transcript (Future)</a> ' +
    '<button type="button" class="btn btn-sm" data-act="print">Print / PDF Transcript</button></div>' +
    '<p class="lead">Complete record of your procurement competency progression, assessment scores, and practical laboratory completion.</p>' +
    '<div class="grid grid-3 mb16">' +
    '<div class="stat"><span class="s-val">' + stats.completedCount + '/' + stats.totalCount + '</span><span class="s-lab">Functions Mastered</span></div>' +
    '<div class="stat"><span class="s-val">' + stats.pct + '%</span><span class="s-lab">Academy Completion</span></div>' +
    '<div class="stat"><span class="s-val">' + stats.badgesEarned + '/' + stats.badgesTotal + '</span><span class="s-lab">Badges Earned</span></div>' +
    '</div>' +
    '<div class="btn-row no-print"><button type="button" class="btn btn-sm btn-danger btn-ghost" data-act="academy-reset-all">Reset all progress</button></div>' +
    '<div class="table-wrap"><table><thead><tr>' +
    '<th>Module & Function</th><th>Lifecycle Fit</th><th>Assessment Score</th><th>Status</th><th>Action</th>' +
    '</tr></thead><tbody>' +
    funcs.map(function (f) {
      var isComp = PS.academy.isCompleted(f.id);
      var sc = data.scores && data.scores[f.id];
      return '<tr>' +
        '<td><strong>' + PS.esc(f.title) + '</strong><br><small class="muted">' + PS.esc(f.module) + '</small></td>' +
        '<td><span class="badge">' + PS.esc(f.lifecycleStage || 'General') + '</span></td>' +
        '<td>' + (sc ? sc.pct + '% (' + sc.score + '/' + sc.total + ')' : '<span class="muted">Not taken</span>') + '</td>' +
        '<td>' + (isComp ? '<span style="color:#059669;font-weight:700">✓ Mastered</span>' : '<span class="muted">In Progress</span>') + '</td>' +
        '<td><a class="btn btn-sm" href="#/academy/' + encodeURIComponent(f.id) + '">Open</a></td>' +
        '</tr>';
    }).join('') +
    '</tbody></table></div></div>';

  return html;
});

/* ---------- Curriculum Hub View ---------- */
PS.renderAcademyHub = function () {
  PS.pageTitle = 'Procurement Academy';
  var stats = PS.academy.getStats();
  var data = PS.academy.getAll();
  var funcs = PS.ACADEMY_FUNCTIONS || [];

  // Group functions by module. The module order follows the learner's
  // role and track, so a compliance officer is pointed at the modules
  // that carry their work first, and a practitioner sees them in the
  // order the work happens. The role used to be display-only.
  var modules = {};
  var ordered = (PS.user && PS.user.moduleOrder) ? PS.user.moduleOrder(funcs) : funcs;
  ordered.forEach(function (f) {
    var mod = f.module || 'Core Foundations';
    if (!modules[mod]) modules[mod] = [];
    modules[mod].push(f);
  });

  var curFunc = funcs.filter(function (f) { return f.id === stats.currentFunc; })[0] || funcs[0];

  var html = '<div class="academy-hero">' +
    '<div class="academy-title-row">' +
    '<div class="ps-logo-chip" style="width:76px;height:76px;flex:0 0 76px;padding:6px" aria-hidden="true"><img src="' + PS.LOGO_DATA + '" alt="" loading="lazy"></div>' +
    '<div><span class="academy-badge-tag">Procure Sherpa Academy</span>' +
    '<h1 style="margin:6px 0 2px">The Digital Procurement Academy</h1>' +
    '<p class="lead mb0">Master end-to-end procurement from first principles to executive decision-making. Learn, reflect, practice with scenarios, and execute in the laboratory.</p>' +
    '</div>' +
    '<div><a class="btn btn-primary" href="#/academy/' + (curFunc ? curFunc.id : 'func-mission-value') + '">' +
    (stats.completedCount > 0 ? 'Resume Learning: ' + (curFunc ? curFunc.title : '') : 'Start Journey from Zero') + ' &rarr;</a></div>' +
    '</div>' +
    '<div class="academy-progress-wrap">' +
    '<div class="academy-progress-label-row">' +
    '<span>Curriculum Progress: <strong>' + stats.completedCount + ' of ' + stats.totalCount + ' Functions Mastered</strong></span>' +
    '<span><strong>' + stats.pct + '%</strong> Complete</span>' +
    '</div>' +
    '<div class="academy-progress-track"><div class="academy-progress-fill" style="width:' + stats.pct + '%"></div></div>' +
    '</div>' +
    '</div>';

  // Badges strip
  html += '<div class="card mb16"><div class="card-head"><h2>Achievement Badges</h2><div class="spacer"></div>' +
    '<span class="badge">' + stats.badgesEarned + ' of ' + stats.badgesTotal + ' Unlocked</span></div>' +
    '<div class="badge-grid">' +
    PS.academy.BADGES.map(function (b) {
      var un = !!(data.badges && data.badges[b.id]);
      return '<div class="badge-card ' + (un ? 'is-unlocked' : 'is-locked') + '">' +
        '<div class="badge-icon">' + b.icon + '</div>' +
        '<div class="badge-name">' + PS.esc(b.name) + '</div>' +
        '<div class="badge-desc">' + PS.esc(b.desc) + '</div>' +
        (un ? '<div style="margin-top:6px;font-size:0.7rem;color:#059669;font-weight:700">✓ Unlocked</div>' : '<div style="margin-top:6px;font-size:0.7rem;color:var(--mute)">Locked</div>') +
        '</div>';
    }).join('') +
    '</div></div>';

  // Curriculum modules
  html += PS.academyRoleRecommendation(funcs);

  html += '<div class="section-head"><h2>End-to-End Procurement Curriculum</h2></div>';

  Object.keys(modules).forEach(function (modName, modIdx) {
    var modFuncs = modules[modName];
    var modNo = PS.academyModuleNumber(modName) || (modIdx + 1);
    html += '<div class="module-group" id="module-' + modNo + '">' +
      '<div class="module-head">' +
      /* The badge is the module's own number. Position and module number
         are the same thing now that the list is never reordered, but the
         number is read from the data so that they cannot drift apart
         again. */
      '<span class="module-badge">Module ' + (PS.academyModuleNumber(modName) || (modIdx + 1)) + '</span>' +
      '<h2>' + PS.esc(modName) + '</h2>' +
      '</div>' +
      '<div class="grid grid-3">' +
      modFuncs.map(function (f) {
        var isComp = PS.academy.isCompleted(f.id);
        var qRes = PS.academy.getQuizResult(f.id);
        return '<a class="func-card ' + (isComp ? 'is-mastered' : '') + '" href="#/academy/' + encodeURIComponent(f.id) + '">' +
          '<div class="func-card-kicker">' + PS.esc(f.kicker || 'Procurement Function') + '</div>' +
          '<div class="func-card-title">' + PS.esc(f.title) + '</div>' +
          '<div class="func-card-desc">' + PS.esc(f.tagline || f.desc) + '</div>' +
          '<div class="func-card-meta">' +
          '<span>⏱️ ' + PS.esc(f.duration || '15 mins') + '</span>' +
          '<span>🎯 ' + (f.quizzes ? f.quizzes.length : 3) + ' Scenarios</span>' +
          (qRes ? '<span>📊 ' + qRes.pct + '% Score</span>' : '') +
          '</div></a>';
      }).join('') +
      '</div></div>';
  });

  return html;
};

/* ---------- Function Learning Detail View ---------- */
PS.renderAcademyFunction = function (funcId, params) {
  var func = (PS.ACADEMY_FUNCTIONS || []).filter(function (f) { return f.id === funcId; })[0];
  if (!func) return PS.notFound('Academy Function', funcId);

  PS.pageTitle = func.title + ' | Academy';
  PS.academy.currentFuncQuizzesCount = (func.quizzes || []).length;
  
  // Set current function in state
  var curData = PS.academy.getAll();
  curData.current = funcId;
  PS.academy.save(curData);

  var activeTab = (params && params.tab) ? params.tab : 'learn';
  var isComp = PS.academy.isCompleted(funcId);
  var quizRes = PS.academy.getQuizResult(funcId);

  var funcs = PS.ACADEMY_FUNCTIONS || [];
  var curIdx = -1;
  funcs.forEach(function (f, i) { if (f.id === funcId) curIdx = i; });
  var prevFunc = curIdx > 0 ? funcs[curIdx - 1] : null;
  var nextFunc = curIdx < funcs.length - 1 ? funcs[curIdx + 1] : null;

  var html = '<div class="card" style="margin-bottom:14px">' +
    '<div class="dash-eyebrow-row"><span class="eyebrow">' + PS.esc(func.module || 'Academy') + ' &middot; ' + PS.esc(func.kicker || 'Function') + '</span>' +
    '<div class="spacer"></div>' +
    (isComp ? '<span class="badge" style="background:#ecfdf5;color:#059669;font-weight:700">✓ Function Mastered</span>' : '<span class="badge badge-primary">Learning in Progress</span>') +
    '</div>' +
    '<h1>' + PS.esc(func.title) + '</h1>' +
    '<p class="lead" style="margin-bottom:14px">' + PS.esc(func.tagline || func.desc) + '</p>' +
    '<div class="chips">' +
    '<span class="chip">📍 Lifecycle Stage: <strong>' + PS.esc(func.lifecycleStage || 'Core') + '</strong></span>' +
    '<span class="chip">⏱️ Duration: <strong>' + PS.esc(func.duration || '15 mins') + '</strong></span>' +
    (quizRes ? '<span class="chip">🏆 Quiz Score: <strong>' + quizRes.pct + '%</strong></span>' : '') +
    '</div>' +
    '</div>';

  // 5 Tab Navigation
  var tabs = [
    { id: 'learn', label: '1. Learn Concept', badge: 'Core' },
    { id: 'think', label: '2. Think & Reflect', badge: 'Mindset' },
    { id: 'sop', label: '3. Digital SOP', badge: (func.sopSteps ? func.sopSteps.length : 'Steps') },
    { id: 'practice', label: '4. Practice & Test', badge: (func.quizzes ? func.quizzes.length : 'Quiz') },
    { id: 'apply', label: '5. Apply in Lab', badge: 'Mission' }
  ];

  html += '<div class="academy-tabs no-print">';
  tabs.forEach(function (t) {
    var isAct = activeTab === t.id;
    html += '<a class="academy-tab-btn ' + (isAct ? 'is-active' : '') + '" href="#/academy/' + encodeURIComponent(funcId) + '?tab=' + t.id + '">' +
      t.label + ' <span class="tab-badge">' + t.badge + '</span></a>';
  });
  html += '</div>';

  // Render tab content
  if (activeTab === 'learn') {
    html += PS.renderFuncTabLearn(func);
  } else if (activeTab === 'think') {
    html += PS.renderFuncTabThink(func);
  } else if (activeTab === 'sop') {
    html += PS.renderFuncTabSOP(func);
  } else if (activeTab === 'practice') {
    html += PS.renderFuncTabPractice(func);
  } else if (activeTab === 'apply') {
    html += PS.renderFuncTabApply(func);
  }

  // Next / Previous Navigation Footer
  html += '<div class="card card-tight no-print" style="margin-top:24px"><div class="flex-between">' +
    (prevFunc ? '<a class="btn btn-ghost" href="#/academy/' + encodeURIComponent(prevFunc.id) + '">&larr; ' + PS.esc(prevFunc.title) + '</a>' : '<div></div>') +
    '<a class="btn" href="#/academy">All Modules</a>' +
    (nextFunc ? '<a class="btn btn-primary" href="#/academy/' + encodeURIComponent(nextFunc.id) + '">' + PS.esc(nextFunc.title) + ' &rarr;</a>' : '<a class="btn btn-primary" href="#/academy-progress">View Progress &rarr;</a>') +
    '</div></div>';

  return html;
};

/* ---------- Tab 1: Learn ---------- */
PS.renderFuncTabLearn = function (f) {
  var html = '<div class="grid grid-2">' +
    '<div class="card">' +
    '<h2>What is this function?</h2>' +
    '<p>' + PS.esc(f.what) + '</p>' +
    '<h3>Why it is critical to the business</h3>' +
    '<ul>' + (f.why || []).map(function (w) { return '<li>' + PS.esc(w) + '</li>'; }).join('') + '</ul>' +
    '<h3>When is this function executed?</h3>' +
    '<ul>' + (f.when || []).map(function (w) { return '<li>' + PS.esc(w) + '</li>'; }).join('') + '</ul>' +
    '</div>' +
    '<div class="card">' +
    '<h2>Lifecycle & Stakeholder Engagement</h2>' +
    '<p><strong>Lifecycle Fit:</strong> ' + PS.esc(f.lifecycleDesc || f.lifecycleStage) + '</p>' +
    '<h3>Who is involved (RACI)</h3>' +
    '<div class="table-wrap"><table><thead><tr><th>Role</th><th>Responsibility</th></tr></thead><tbody>' +
    (f.raci || []).map(function (r) {
      return '<tr><td><strong>' + PS.esc(r.role) + '</strong></td><td>' + PS.esc(r.resp) + '</td></tr>';
    }).join('') +
    '</tbody></table></div>' +
    '</div></div>' +
    '<div class="grid grid-2">' +
    '<div class="card">' +
    '<h2>Required Inputs & Deliverable Outputs</h2>' +
    '<h3>Inputs Required Before Starting</h3>' +
    '<ul>' + (f.inputs || []).map(function (i) { return '<li>' + PS.esc(i) + '</li>'; }).join('') + '</ul>' +
    '<h3>Outputs & Records Produced</h3>' +
    '<ul>' + (f.outputs || []).map(function (o) { return '<li>' + PS.esc(o) + '</li>'; }).join('') + '</ul>' +
    '</div>' +
    '<div class="card">' +
    '<h2>Controls, Risks & Best Practices</h2>' +
    '<h3>Mandatory Controls & Governance</h3>' +
    '<ul>' + (f.controls || []).map(function (c) { return '<li>' + PS.esc(c) + '</li>'; }).join('') + '</ul>' +
    '<h3>Common Mistakes to Avoid</h3>' +
    '<ul>' + (f.mistakes || []).map(function (m) { return '<li><span style="color:#dc2626">&#10006;</span> ' + PS.esc(m) + '</li>'; }).join('') + '</ul>' +
    '<h3>Industry Best Practices</h3>' +
    '<ul>' + (f.bestPractices || []).map(function (b) { return '<li><span style="color:#059669">&#10004;</span> ' + PS.esc(b) + '</li>'; }).join('') + '</ul>' +
    '</div></div>';

  html += PS.academyWorkedExample(f);

  if (f.terms && f.terms.length) {
    html += '<div class="card"><h2>Key Terminology Decoded</h2><div class="grid grid-3">' +
      f.terms.map(function (t) {
        return '<div class="tile"><div class="t-kicker">Term</div><div class="t-title">' + PS.esc(t.term) + '</div><p class="t-desc">' + PS.esc(t.def) + '</p></div>';
      }).join('') + '</div></div>';
  }

  html += PS.academyLinkedTools(f);

  html += '<div class="btn-row no-print" style="margin-top:16px">' +
    '<a class="btn btn-primary" href="#/academy/' + encodeURIComponent(f.id) + '?tab=think">Next: Procurement Thinking Points &rarr;</a>' +
    '</div>';

  return html;
};

/* ---------- Recommended for your role ----------
   The role picks which modules carry your work. It never changes the
   order they appear in: a numbered curriculum whose number is not its
   position is broken, and a learner who sees 'Module 7' first has no
   way to know whether that is deliberate. So the recommendation is a
   panel that points at the modules, listed in module number order, and
   the curriculum below it stays in sequence. */
PS.academyRoleRecommendation = function (funcs) {
  var allModules = [];
  (funcs || []).forEach(function (f) {
    if (f.module && allModules.indexOf(f.module) < 0) allModules.push(f.module);
  });
  allModules.sort(function (a, b) { return (PS.academyModuleNumber(a) || 0) - (PS.academyModuleNumber(b) || 0); });
  if (!PS.user || typeof PS.user.recommendedModules !== 'function') return '';
  var prof = PS.user.getProfile();
  var roleMeta = PS.user.getRoleMeta(prof.role);
  var mods = PS.user.recommendedModules(4);
  if (!mods.length) return '';
  /* The first recommended module that still has work in it is the one
     to open: a recommendation to a module you have already finished
     is not a recommendation. */
  var target = null;
  mods.forEach(function (name) {
    if (target) return;
    var inMod = (funcs || []).filter(function (f) { return f.module === name; });
    var open = inMod.filter(function (f) { return !PS.academy.isCompleted(f.id); });
    if (open.length) target = { mod: name, func: open[0] };
  });
  if (!target) {
    var firstMod = (funcs || [])[0];
    if (firstMod) target = { mod: firstMod.module, func: firstMod };
  }
  if (!target) return '';
  return '<div class="card no-print academy-role-rec">' +
    '<div class="card-head"><h2>Recommended for your role</h2><div class="spacer"></div>' +
    '<span class="eyebrow">' + PS.esc(roleMeta.title) + '</span></div>' +
    '<p class="card-sub">These are the modules that carry the work in your role, listed in curriculum order. The curriculum below runs Module 1 to Module ' +
    (allModules.length || '') + ' in sequence, whatever your role.</p>' +
    '<div class="hub-linked-row"><span class="hub-linked-label">Modules</span>' +
    mods.map(function (name) {
      var n = PS.academyModuleNumber(name);
      return '<a class="chip" href="#module-' + n + '">Module ' + n + '</a>';
    }).join('') + '</div>' +
    '<div class="btn-row" style="margin-top:12px">' +
    '<a class="btn btn-primary" href="#/academy/' + encodeURIComponent(target.func.id) + '">Start with ' +
    PS.esc(target.func.title) + '</a>' +
    '</div></div>';
};

/* ---------- The worked example, in the explanation ----------
   The case study used to live only in the 'Think' tab, which meant that
   somebody reading how a function works never met an example of it
   working. A worked example is part of the explanation, not a separate
   reflection: it is what turns a definition into something you can see
   happening. It is now in the 'Learn' tab, where the explanation is,
   and the 'Think' tab keeps the deeper treatment and the reflection
   prompts. */
PS.academyWorkedExample = function (f) {
  var tps = f.thinkingPoints || [];
  var tp0 = tps[0] || null;
  var sc = f.realScenario || null;
  var body = '';
  if (sc) {
    body = '<h3>' + PS.esc(sc.title) + '</h3>' +
      '<p>' + PS.esc(sc.situation) + '</p>' +
      '<div class="alert alert-info"><strong>The dilemma:</strong> ' + PS.esc(sc.dilemma) + '</div>' +
      '<h3>How it was resolved</h3>' +
      '<p>' + PS.esc(sc.resolution) + '</p>';
  } else if (tp0 && tp0.realWorldExample) {
    body = '<h3>The situation</h3>' +
      '<p>' + PS.esc(tp0.realWorldExample) + '</p>' +
      '<h3>What the decision turned on</h3>' +
      '<p>' + PS.esc(tp0.explanation) + '</p>' +
      '<div class="alert alert-info"><strong>What to take away:</strong> ' + PS.esc(tp0.quote) + '</div>';
  } else {
    return '';
  }
  /* If this function has a calculator attached, the reader can go
     straight from the example to the tool with the example already
     loaded, which is the difference between reading about a
     calculation and seeing one. */
  var calcLink = '';
  var calcIds = (f.rel && f.rel.calcs) || [];
  if (calcIds.length) {
    var cid = calcIds[0];
    var c = PS.byId('calc', cid);
    if (c) {
      calcLink = '<div class="btn-row no-print" style="margin-top:12px">' +
        '<a class="btn btn-primary" href="' + PS.routeFor('calc', cid) + '?example=1">' +
        'Open ' + PS.esc(c.title) + ' with the example loaded</a>' +
        '</div>';
    }
  }
  return '<div class="card academy-worked-example">' +
    '<div class="card-head"><h2>Worked example</h2><div class="spacer"></div>' +
    '<span class="eyebrow">See it happen</span></div>' +
    body + calcLink +
    '</div>';
};

/* ---------- Linked library: the Academy connected to the content library ----------
   Every Academy function links out to the concepts that explain it, the
   SOP that governs it, the checklist that evidences it, the template
   that records it, the calculator that quantifies it, the decision guide
   that frames it and the KPI that measures it. Before this existed the
   Academy was a content silo: 95 tabs, and not one link out of them. */
PS.academyLinkedTools = function (f) {
  var rel = f.rel || {};
  var groups = [
    { key: 'concepts', label: 'Concepts that explain this', type: 'kb' },
    { key: 'sops', label: 'Controlled procedures', type: 'sop' },
    { key: 'checklists', label: 'Execution checklists', type: 'cl' },
    { key: 'templates', label: 'Templates and forms', type: 'tpl' },
    { key: 'calcs', label: 'Calculators', type: 'calc' },
    { key: 'decisions', label: 'Decision guides', type: 'dec' },
    { key: 'kpis', label: 'KPIs that measure it', type: 'kpi' }
  ];
  var blocks = [];
  groups.forEach(function (g) {
    var ids = rel[g.key] || [];
    if (!ids.length) return;
    var chips = ids.map(function (id) {
      var item = g.type === 'kb' ? PS.byId('kb', id) : PS.byId(g.type, id);
      if (!item) return '';
      var title = item.title || item.term || id;
      /* A calculator link from an explanation should arrive at a working
         calculation, not at an empty form. An empty form looks like a
         broken tool; a tool with the example already in it and the result
         showing looks like a tool you can learn from. */
      var href = PS.routeFor(g.type, id);
      if (g.type === 'calc') href += '?example=1';
      return '<a class="chip" href="' + href + '">' + PS.esc(title) + '</a>';
    }).filter(Boolean).join('');
    if (!chips) return;
    blocks.push('<div class="hub-linked-row"><span class="hub-linked-label">' + PS.esc(g.label) + '</span>' + chips + '</div>');
  });
  if (!blocks.length) return '';
  return '<div class="card no-print">' +
    '<div class="card-head"><h2>Apply this in the library</h2><div class="spacer"></div>' +
    '<span class="eyebrow">Linked tools</span></div>' +
    '<p class="card-sub">The reading, the procedure, the evidence, the document, the numbers, the fork in the road and the measure. This function is the entry point, not the whole job.</p>' +
    '<div class="hub-linked">' + blocks.join('') + '</div>' +
    '</div>';
};

/* ---------- Tab 2: Think ---------- */
PS.renderFuncTabThink = function (f) {
  var thinkingPoints = f.thinkingPoints || [];
  var html = '<div class="card">' +
    '<div class="card-head"><h2>Procurement Mindset & Thinking Points</h2><div class="spacer"></div>' +
    '<span class="eyebrow">Executive Perspective</span></div>' +
    '<p class="lead">Procurement mastery is not about memorizing textbook definitions; it is about developing commercial acumen, anticipating risks, and understanding human and economic incentives.</p>' +
    '</div>';

  thinkingPoints.forEach(function (tp) {
    html += '<div class="thinking-point-card">' +
      '<div class="thinking-point-eyebrow">💡 Thought-Provoking Procurement Principle</div>' +
      '<blockquote class="thinking-point-quote">&ldquo;' + PS.esc(tp.quote) + '&rdquo;</blockquote>' +
      '<div class="thinking-point-explain">' + PS.esc(tp.explanation) + '</div>' +
      (tp.realWorldExample ? '<div class="thinking-point-case"><strong>Real-World Enterprise Situation</strong>' + PS.esc(tp.realWorldExample) + '</div>' : '') +
      (tp.reflectionPrompt ? '<div class="thinking-point-reflect"><strong>Reflect as a Procurement Professional:</strong> ' + PS.esc(tp.reflectionPrompt) + '</div>' : '') +
      '</div>';
  });

  if (f.realScenario) {
    html += '<div class="card">' +
      '<h2>Deep-Dive Case Study: ' + PS.esc(f.realScenario.title) + '</h2>' +
      '<p>' + PS.esc(f.realScenario.situation) + '</p>' +
      '<div class="alert alert-info"><strong>The Dilemma:</strong> ' + PS.esc(f.realScenario.dilemma) + '</div>' +
      '<h3>How an Expert Procurement Professional Solved It</h3>' +
      '<p>' + PS.esc(f.realScenario.resolution) + '</p>' +
      '</div>';
  } else if (thinkingPoints.length && thinkingPoints[0].realWorldExample) {
    /* The Academy never carried a separate case study, so the section
       never rendered. The thinking point already carries a worked
       enterprise situation, which is the case study, and it is presented
       here as one rather than left as an extra paragraph. */
    html += '<div class="card">' +
      '<div class="card-head"><h2>Deep-Dive Case Study</h2><div class="spacer"></div>' +
      '<span class="eyebrow">Worked Situation</span></div>' +
      '<h3>The situation</h3>' +
      '<p>' + PS.esc(thinkingPoints[0].realWorldExample) + '</p>' +
      '<h3>What the decision turned on</h3>' +
      '<p>' + PS.esc(thinkingPoints[0].explanation) + '</p>' +
      '<div class="alert alert-info"><strong>What to take away:</strong> ' + PS.esc(thinkingPoints[0].quote) + '</div>' +
      (thinkingPoints[0].reflectionPrompt ? '<h3>Ask yourself</h3><p>' + PS.esc(thinkingPoints[0].reflectionPrompt) + '</p>' : '') +
      '</div>';
  }

  html += '<div class="btn-row no-print" style="margin-top:16px">' +
    '<a class="btn btn-primary" href="#/academy/' + encodeURIComponent(f.id) + '?tab=sop">Next: Study Digital SOP &rarr;</a>' +
    '</div>';

  return html;
};

/* ---------- Tab 3: Digital SOP ---------- */
PS.renderFuncTabSOP = function (f) {
  var steps = f.sopSteps || [];
  var html = '<div class="card">' +
    '<div class="card-head"><h2>Standard Operating Procedure (Digital SOP)</h2><div class="spacer"></div>' +
    (f.relSop ? '<a class="btn btn-sm" href="#/sop/' + encodeURIComponent(f.relSop) + '">Open Formal Controlled SOP Document &rarr;</a>' : '') +
    '</div>' +
    '<p class="card-sub">Follow this disciplined sequential workflow to execute this procurement function with full audit compliance and commercial integrity.</p>' +
    '</div>' +
    '<div class="sop-stepper">';

  steps.forEach(function (s, i) {
    html += '<div class="sop-step-card">' +
      '<div class="sop-step-header">' +
      '<span class="sop-step-num">' + (i + 1) + '</span>' +
      '<span class="sop-step-title">' + PS.esc(s.title) + '</span>' +
      '<span class="sop-step-role-badge">Lead: ' + PS.esc(s.role || 'Procurement Specialist') + '</span>' +
      '</div>' +
      '<div class="sop-step-body">' +
      '<p>' + PS.esc(s.desc) + '</p>' +
      '<div class="sop-step-grid">' +
      '<div class="sop-step-field"><strong>Mandatory Control / Check</strong>' + PS.esc(s.control || 'Adhere to organizational threshold') + '</div>' +
      '<div class="sop-step-field"><strong>Record / Evidence Generated</strong>' + PS.esc(s.record || 'Documented in ERP / Procurement folder') + '</div>' +
      '</div>' +
      (s.pitfall ? '<div class="sop-step-pitfall"><strong>⚠️ Common Pitfall at this Step:</strong> ' + PS.esc(s.pitfall) + '</div>' : '') +
      '</div></div>';
  });

  html += '</div>' +
    '<div class="btn-row no-print" style="margin-top:16px">' +
    '<a class="btn btn-primary" href="#/academy/' + encodeURIComponent(f.id) + '?tab=practice">Next: Interactive Practice & Knowledge Checks &rarr;</a>' +
    '</div>';

  return html;
};

/* ---------- Tab 4: Practice ---------- */
PS.renderFuncTabPractice = function (f) {
  var html = PS.academyQuiz.renderSection(f);
  html += '<div class="btn-row no-print" style="margin-top:16px">' +
    '<a class="btn btn-primary" href="#/academy/' + encodeURIComponent(f.id) + '?tab=apply">Next: Apply in Laboratory &rarr;</a>' +
    '</div>';
  return html;
};

/* ---------- Tab 5: Apply in Lab & Interactive Crisis Sandbox ---------- */
PS.renderFuncTabApply = function (f) {
  var isComp = PS.academy.isCompleted(f.id);

  // Map function to specialized commercial crisis simulation
  var crisisType = 'price-increase';
  if (f.id === 'func-spend-analysis') {
    crisisType = 'spend_analysis';
  } else if (f.id === 'func-category-mgmt') {
    crisisType = 'kraljic_matrix';
  } else if (f.id === 'func-should-cost') {
    crisisType = 'should_cost';
  } else if (f.id === 'func-supplier-eval') {
    crisisType = 'supplier_eval';
  } else if (f.id === 'func-supplier-risk') {
    crisisType = 'supplier_risk';
  } else if (f.id === 'func-contract-structuring') {
    crisisType = 'contract_redline';
  } else if (f.id === 'func-quote-normalization' || f.id === 'func-rfq-issuance' || f.id === 'func-rfx-strategy' || f.id === 'func-requirement-scope') {
    crisisType = 'incoterms';
  } else if (f.id === 'func-landed-cost-tco') {
    crisisType = 'tco';
  } else if (f.id === 'func-threeway-matching' || f.id === 'func-po-execution' || f.id === 'func-doa-controls') {
    crisisType = 'matching';
  } else if (f.id === 'func-negotiation-strategy' || f.id === 'func-commercial-terms' || f.id === 'func-srm-scorecards') {
    crisisType = 'negotiation';
  }

  var sandboxHtml = PS.renderAcademySandbox(crisisType, f);

  var lab = f.labMission || {
    title: 'Hands-on Procurement Laboratory Mission',
    desc: 'Apply the concepts, SOP, and decision frameworks you learned using our practical procurement tools.',
    tasks: ['Review the case inputs', 'Enter parameters into the tool', 'Analyze the recommendation'],
    ctaLabel: 'Open Laboratory Tool',
    ctaHref: '#/list/calc'
  };

  var labHtml = '<div class="lab-card">' +
    '<span class="lab-badge">Laboratory Practical Mission</span>' +
    '<h2 class="lab-title">' + PS.esc(lab.title) + '</h2>' +
    '<p class="lab-desc">' + PS.esc(lab.desc) + '</p>' +
    '<div class="lab-task-box">' +
    '<h4>Your Practical Mission Objectives:</h4>' +
    '<ol>' + (lab.tasks || []).map(function (t) { return '<li>' + PS.esc(t) + '</li>'; }).join('') + '</ol>' +
    '</div>' +
    '<div class="lab-actions-row">' +
    '<a class="btn btn-primary" href="' + PS.esc(lab.ctaHref) + '">' + PS.esc(lab.ctaLabel || 'Launch Tool in Laboratory') + ' &rarr;</a>' +
    (lab.secondaryHref ? '<a class="btn" href="' + PS.esc(lab.secondaryHref) + '">' + PS.esc(lab.secondaryLabel || 'Open Supporting Template') + '</a>' : '') +
    '<button type="button" class="btn ' + (isComp ? 'btn-ghost' : 'btn-primary') + '" data-act="academy-mark-done" data-func="' + PS.esc(f.id) + '">' +
    (isComp ? '✓ Mastered &amp; Completed' : 'Mark as studied (not yet mastered)') + '</button>' +
    '</div>' +
    '</div>';

  return sandboxHtml + labHtml;
};

/* ---------- Interactive Sandbox Engine & Crisis Models ---------- */
PS.renderAcademySandbox = function (type, f) {
  var html = '<div class="sandbox-card" id="academySandboxCard" data-crisis="' + PS.esc(type) + '" data-func="' + PS.esc(f.id) + '">' +
    '<div class="sandbox-header">' +
    '<div>' +
    '<span class="sandbox-tag">Commercial Crisis Simulation</span>' +
    '<h2 style="margin:6px 0 2px;">Interactive Procurement Sandbox</h2>' +
    '</div>' +
    '<span class="badge badge-primary">Hands-on Decision Sandbox</span>' +
    '</div>';

  html += PS.renderSandboxForm(type);

  html += '<div class="sandbox-result-box" id="academySandboxResult">' +
    '<div class="t-dim t-sm">Loading initial commercial model evaluation...</div>' +
    '</div>' +
    '</div>';

  // Automatically trigger evaluation after render
  setTimeout(function () {
    PS.executeAcademySandbox(type);
  }, 40);

  return html;
};

PS.executeAcademySandbox = function (type) {
  /* `html`, `chartSvg` and `vol` are declared once here rather than in
     each branch below. The branches are an if/else chain inside one
     function, and `var` is function-scoped, so a `var html` per branch
     was ten declarations of the same binding - legal, but it read as if
     each branch had its own variable when it did not. */
  var html, chartSvg, vol;
  var resBox = document.getElementById('academySandboxResult');
  if (!resBox) return;

  var getNum = function (id, def) {
    var el = document.getElementById(id);
    if (!el) return def;
    var n = parseFloat(el.value);
    return isNaN(n) ? def : n;
  };

  var getVal = function (id, def) {
    var el = document.getElementById(id);
    return el ? el.value : def;
  };

  if (type === 'spend_analysis') {
    var v1 = getNum('sb_sp_v1', 3400000);
    var v2 = getNum('sb_sp_v2', 2100000);
    var v3 = getNum('sb_sp_v3', 1200000);
    var v4 = getNum('sb_sp_v4', 650000);
    var v5 = getNum('sb_sp_v5', 450000);
    var tail = getNum('sb_sp_tail', 1200000);
    var tailCount = getNum('sb_sp_tail_count', 180);
    var rebatePct = getNum('sb_sp_rebate', 5.0);

    var vendors = [
      { name: 'Apex Logistics', spend: v1 },
      { name: 'Global Precision', spend: v2 },
      { name: 'OmniTech Elect.', spend: v3 },
      { name: 'Vanguard Packag.', spend: v4 },
      { name: 'Tri-State Freight', spend: v5 },
      { name: 'Tail Spend (' + tailCount + ' vendors)', spend: tail }
    ];

    var totalSpend = v1 + v2 + v3 + v4 + v5 + tail;
    var top3Spend = v1 + v2 + v3;
    var top3Pct = totalSpend > 0 ? (top3Spend / totalSpend) * 100 : 0;
    var rebateSavings = tail * (rebatePct / 100);
    var apAdminSavings = Math.round((tailCount * 0.75) * 350);
    var totalRecovery = rebateSavings + apAdminSavings;

    chartSvg = PS.chart.pareto(vendors, { width: 680, height: 280 });

    html = '<span class="sandbox-verdict-tag verdict-strong">Pareto Audit Result : High Spend Concentration &amp; Actionable Tail Opportunity</span>' +
      chartSvg +
      '<div class="sandbox-metric-row">' +
      '<div class="sandbox-metric-tile"><div class="m-lab">Total Addressable Spend</div><div class="m-val">$' + (totalSpend / 1000000).toFixed(2) + 'M</div></div>' +
      '<div class="sandbox-metric-tile is-info"><div class="m-lab">Top 3 Vendor Share (Class A)</div><div class="m-val">' + top3Pct.toFixed(1) + '%</div></div>' +
      '<div class="sandbox-metric-tile is-success"><div class="m-lab">Tail Rebate Recovery</div><div class="m-val">$' + Math.round(rebateSavings).toLocaleString() + '</div></div>' +
      '<div class="sandbox-metric-tile is-success"><div class="m-lab">AP Admin Cost Elimination</div><div class="m-val">$' + apAdminSavings.toLocaleString() + '</div></div>' +
      '</div>' +
      '<div class="sandbox-forensic-text">' +
      '<strong>Forensic Spend Insight:</strong> Just 3 strategic suppliers account for <strong>' + top3Pct.toFixed(1) + '% of enterprise expenditure</strong>. Conversely, the tail of ' + tailCount + ' suppliers generates only $' + (tail / 1000000).toFixed(2) + 'M in spend while consuming enormous procurement and accounting bandwidth. Consolidating 75% of tail vendors into master service contracts delivers <strong>$' + Math.round(totalRecovery).toLocaleString() + ' in combined annual value</strong> ($' + Math.round(rebateSavings).toLocaleString() + ' in volume rebates plus $' + apAdminSavings.toLocaleString() + ' in transactional AP processing cost avoidance).' +
      '</div>' +
      '<div class="quiz-tip-box" style="margin-top:14px;">' +
      '<div class="quiz-tip-head"><span class="quiz-tip-badge">&#128161; Tactical Advisor Tip (Pareto Tail Optimization)</span></div>' +
      '<div class="quiz-tip-text">Category managers should spend 80% of their strategic sourcing time managing the top 20% of vendors (Class A). Automate the tail through P-cards, punchout catalogues, and aggregator distributors to permanently eliminate rogue spend.</div>' +
      '</div>';
    resBox.innerHTML = html;

  } else if (type === 'kraljic_matrix') {
    var sImp = getNum('sb_kr_s_imp', 88);
    var sRisk = getNum('sb_kr_s_risk', 85);
    var lImp = getNum('sb_kr_l_imp', 75);
    var lRisk = getNum('sb_kr_l_risk', 20);
    var bImp = getNum('sb_kr_b_imp', 25);
    var bRisk = getNum('sb_kr_b_risk', 85);
    var nImp = getNum('sb_kr_n_imp', 18);
    var nRisk = getNum('sb_kr_n_risk', 15);

    var items = [
      { name: 'Custom ASICs', impact: sImp, risk: sRisk, spend: '$4.5M Spend', spendRatio: 1.3, color: '#6366f1' },
      { name: 'Shipping Packaging', impact: lImp, risk: lRisk, spend: '$2.8M Spend', spendRatio: 1.1, color: '#10b981' },
      { name: 'Resin Additives', impact: bImp, risk: bRisk, spend: '$400k Spend', spendRatio: 0.6, color: '#f59e0b' },
      { name: 'Office Supplies', impact: nImp, risk: nRisk, spend: '$250k Spend', spendRatio: 0.5, color: '#64748b' }
    ];

    chartSvg = PS.chart.kraljic(items, { width: 640, height: 420 });

    html = '<span class="sandbox-verdict-tag verdict-strong">Portfolio Alignment : 4 Categories Mapped to Strategic Playbooks</span>' +
      chartSvg +
      '<div class="sandbox-metric-row">' +
      '<div class="sandbox-metric-tile is-info"><div class="m-lab">Strategic Playbook</div><div class="m-val">Long-Term Alliance</div></div>' +
      '<div class="sandbox-metric-tile is-success"><div class="m-lab">Leverage Playbook</div><div class="m-val">Reverse Auction / Tender</div></div>' +
      '<div class="sandbox-metric-tile is-warn"><div class="m-lab">Bottleneck Playbook</div><div class="m-val">Safety Stock / Spec Shift</div></div>' +
      '<div class="sandbox-metric-tile"><div class="m-lab">Non-Critical Playbook</div><div class="m-val">P-Card Catalogues</div></div>' +
      '</div>' +
      '<div class="sandbox-forensic-text">' +
      '<strong>Executive Kraljic Diagnostics:</strong> Do not use one-size-fits-all sourcing tactics. Apply aggressive price pressure only to <strong>Leverage categories</strong> (Packaging) where buyer power is high and supply markets are competitive. For <strong>Strategic items</strong> (ASICs), pursue multi-year executive partnerships with gain-sharing. For <strong>Bottleneck items</strong> (Resin Additives), prioritize supply continuity via vendor safety stock or engineering spec de-customization over nominal price cuts.' +
      '</div>' +
      '<div class="quiz-tip-box" style="margin-top:14px;">' +
      '<div class="quiz-tip-head"><span class="quiz-tip-badge">&#128161; Tactical Advisor Tip (Kraljic Strategy Enforcement)</span></div>' +
      '<div class="quiz-tip-text">Aggressive adversarial negotiation in a Bottleneck quadrant triggers immediate supplier walkaways or retaliatory lead time extensions. Match commercial aggression strictly to market contestability.</div>' +
      '</div>';
    resBox.innerHTML = html;

  } else if (type === 'should_cost') {
    var mat = getNum('sb_sc_mat', 38.50);
    var hrs = getNum('sb_sc_hrs', 0.40);
    var rate = getNum('sb_sc_rate', 35.00);
    var labor = hrs * rate;
    var over = getNum('sb_sc_over', 8.50);
    var mfg = mat + labor + over;
    var sgaPct = getNum('sb_sc_sga', 10.0) / 100;
    var sga = mfg * sgaPct;
    var cogs = mfg + sga;
    var marginPct = getNum('sb_sc_margin', 12.0) / 100;
    var margin = cogs * marginPct;
    var shouldCost = cogs + margin;
    var quote = getNum('sb_sc_quote', 89.00);
    vol = getNum('sb_sc_vol', 20000);
    var unitVariance = quote - shouldCost;
    var annualPadding = unitVariance * vol;
    var paddingPct = quote > 0 ? (unitVariance / quote) * 100 : 0;

    var costElements = [
      { label: 'Raw Materials', val: mat },
      { label: 'Direct Labor', val: labor },
      { label: 'Machine Overhead', val: over },
      { label: 'SG&A Overhead', val: sga },
      { label: 'Supplier Margin', val: margin }
    ];

    chartSvg = PS.chart.waterfall(costElements, { width: 680, height: 260, currency: '$' });

    html = '<span class="sandbox-verdict-tag ' + (unitVariance > 0 ? 'verdict-danger' : 'verdict-strong') + '">' +
      (unitVariance > 0 ? 'Audit Result : Hidden Margin Padding of $' + unitVariance.toFixed(2) + '/unit Exposed' : 'Audit Result : Quoted Price Aligned with Bottom-Up Model') + '</span>' +
      chartSvg +
      '<div class="sandbox-metric-row">' +
      '<div class="sandbox-metric-tile is-info"><div class="m-lab">Modeled Should-Cost</div><div class="m-val">$' + shouldCost.toFixed(2) + '</div></div>' +
      '<div class="sandbox-metric-tile"><div class="m-lab">Supplier Quoted Price</div><div class="m-val">$' + quote.toFixed(2) + '</div></div>' +
      '<div class="sandbox-metric-tile is-danger"><div class="m-lab">Unjustified Price Premium</div><div class="m-val">+' + paddingPct.toFixed(1) + '% ($' + unitVariance.toFixed(2) + ')</div></div>' +
      '<div class="sandbox-metric-tile is-success"><div class="m-lab">Annual Addressable Savings</div><div class="m-val">$' + Math.round(annualPadding).toLocaleString() + '</div></div>' +
      '</div>' +
      '<div class="sandbox-forensic-text">' +
      '<strong>Should-Cost Forensic Evidence:</strong> Based on verified material index rates ($' + mat.toFixed(2) + '), direct machining cycle time (' + (hrs * 60).toFixed(0) + ' min @ $' + rate.toFixed(2) + '/hr), and standard industry overhead allocations, the fair manufacturing cost is $' + mfg.toFixed(2) + '. Even after factoring a healthy 12% operating profit margin ($' + margin.toFixed(2) + '), the legitimate unit cost is <strong>$' + shouldCost.toFixed(2) + '</strong>. The vendor quote of $' + quote.toFixed(2) + ' contains <strong>$' + unitVariance.toFixed(2) + '/unit in artificial padding</strong>, representing <strong>$' + Math.round(annualPadding).toLocaleString() + ' in annual budget leakage</strong>.' +
      '</div>' +
      '<div class="quiz-tip-box" style="margin-top:14px;">' +
      '<div class="quiz-tip-head"><span class="quiz-tip-badge">&#128161; Tactical Advisor Tip (Should-Cost Anchoring)</span></div>' +
      '<div class="quiz-tip-text">Present this cost buildup sheet directly to the vendor vice president of sales. When you demonstrate exact knowledge of machine cycle times and scrap rates, suppliers abandon inflated general inflation narratives and negotiate at genuine cost benchmarks.</div>' +
      '</div>';
    resBox.innerHTML = html;

  } else if (type === 'supplier_risk') {
    var wc = getNum('sb_zr_wc', 180000);
    var re = getNum('sb_zr_re', 110000);
    var ebit = getNum('sb_zr_ebit', 85000);
    var eq = getNum('sb_zr_eq', 320000);
    var liab = getNum('sb_zr_liab', 780000);
    var sales = getNum('sb_zr_sales', 1500000);
    var assets = getNum('sb_zr_assets', 1100000);

    var x1 = assets > 0 ? (wc / assets) : 0;
    var x2 = assets > 0 ? (re / assets) : 0;
    var x3 = assets > 0 ? (ebit / assets) : 0;
    var x4 = liab > 0 ? (eq / liab) : 0;
    var x5 = assets > 0 ? (sales / assets) : 0;

    var z = (1.2 * x1) + (1.4 * x2) + (3.3 * x3) + (0.6 * x4) + (0.999 * x5);
    chartSvg = PS.chart.zscoreGauge(z, { width: 380, height: 220 });

    var zoneName = z < 1.23 ? 'Distress Zone' : (z < 2.90 ? 'Grey Zone' : 'Safe Zone');
    var defaultProb = z < 1.23 ? '72% - 85% within 24 Months' : (z < 2.90 ? '25% - 35% within 24 Months' : '< 5% Insolvency Risk');
    var safeguard = z < 1.23 ? 'Enforce Letter of Credit & Immediate Dual Sourcing' : (z < 2.90 ? 'Parent Guarantee & Escrow Inventory' : 'Standard Commercial Credit Terms');

    html = '<span class="sandbox-verdict-tag ' + (z < 1.23 ? 'verdict-danger' : (z < 2.90 ? 'verdict-warn' : 'verdict-strong')) + '">' +
      'Solvency Audit : Altman Z-Score of ' + z.toFixed(2) + ' (' + zoneName + ')</span>' +
      chartSvg +
      '<div class="sandbox-metric-row">' +
      '<div class="sandbox-metric-tile ' + (z < 1.23 ? 'is-danger' : (z < 2.90 ? 'is-warn' : 'is-success')) + '"><div class="m-lab">Altman Z-Score</div><div class="m-val">' + z.toFixed(2) + '</div></div>' +
      '<div class="sandbox-metric-tile"><div class="m-lab">Solvency Classification</div><div class="m-val">' + zoneName + '</div></div>' +
      '<div class="sandbox-metric-tile ' + (z < 1.23 ? 'is-danger' : 'is-info') + '"><div class="m-lab">Default Probability</div><div class="m-val">' + defaultProb + '</div></div>' +
      '<div class="sandbox-metric-tile is-warn"><div class="m-lab">Mandatory Control Safeguard</div><div class="m-val">' + safeguard + '</div></div>' +
      '</div>' +
      '<div class="sandbox-forensic-text">' +
      (z < 1.23 ?
        '<strong>Critical Insolvency Warning:</strong> The vendor Altman Z-Score of <strong>' + z.toFixed(2) + '</strong> places them deep within the bankruptcy Distress Zone. Severe debt leverage ($' + liab.toLocaleString() + ' liabilities against $' + eq.toLocaleString() + ' equity) and paper-thin operating earnings create an acute risk of sudden operational cessation. <strong>Immediately freeze all advance prepayments</strong>, secure tooling escrow agreements, and qualify a secondary backup supplier within 30 days.' :
        (z < 2.90 ?
          '<strong>Marginal Liquidity Watch:</strong> An Altman Z-Score of <strong>' + z.toFixed(2) + '</strong> indicates borderline solvency. While the vendor is operational today, working capital buffers are constrained. Require monthly certified financial updates, avoid multi-month pre-funding, and establish dual-tooling rights.' :
          '<strong>Financially Sound Supplier:</strong> The vendor Altman Z-Score of <strong>' + z.toFixed(2) + '</strong> confirms strong balance sheet health, low debt distress, and dependable operational viability.')) +
      '</div>' +
      '<div class="quiz-tip-box" style="margin-top:14px;">' +
      '<div class="quiz-tip-head"><span class="quiz-tip-badge">&#128161; Tactical Advisor Tip (Bankruptcy Mitigation)</span></div>' +
      '<div class="quiz-tip-text">In an insolvent supplier crisis, the biggest danger is having proprietary tooling trapped in bankruptcy court proceedings. Always ensure contract terms state that buyer-owned tooling is clearly tagged and must be released immediately upon demand.</div>' +
      '</div>';
    resBox.innerHTML = html;

  } else if (type === 'contract_redline') {
    var cLiab = getVal('sb_cr_liability', 'fallback');
    var cPay = getVal('sb_cr_payment', 'fallback');
    var cWar = getVal('sb_cr_warranty', 'fallback');
    var cIp = getVal('sb_cr_ip', 'fallback');

    var scoreMap = { vendor: 25, fallback: 8, redline: 0 };
    var riskScore = (scoreMap[cLiab] !== undefined ? scoreMap[cLiab] : 8) +
      (scoreMap[cPay] !== undefined ? scoreMap[cPay] : 8) +
      (scoreMap[cWar] !== undefined ? scoreMap[cWar] : 8) +
      (scoreMap[cIp] !== undefined ? scoreMap[cIp] : 8);

    var ratingText = riskScore <= 16 ? 'Optimal Enterprise Protection' : (riskScore <= 40 ? 'Commercially Balanced Risk' : 'Catastrophic Legal & Balance Sheet Exposure');
    var badgeClass = riskScore <= 16 ? 'verdict-strong' : (riskScore <= 40 ? 'verdict-warn' : 'verdict-danger');
    var meterColor = riskScore <= 16 ? '#10b981' : (riskScore <= 40 ? '#f59e0b' : '#ef4444');

    html = '<span class="sandbox-verdict-tag ' + badgeClass + '">' +
      'Contract Redline Audit : Legal Risk Exposure Score ' + riskScore + ' / 100 (' + ratingText + ')</span>' +
      '<div style="margin: 16px 0; background: var(--bg); border: 1px solid var(--border); border-radius: 8px; padding: 14px 18px;">' +
      '<div style="display:flex; justify-content:space-between; margin-bottom:6px; font-weight:700; font-size:13px;">' +
      '<span>Aggregate Corporate Liability Exposure Meter</span>' +
      '<span style="color:' + meterColor + '">' + riskScore + '% Risk Exposure</span>' +
      '</div>' +
      '<div style="height: 10px; background: var(--border); border-radius: 5px; overflow:hidden;">' +
      '<div style="width:' + Math.min(riskScore, 100) + '%; height:100%; background:' + meterColor + '; transition: width 0.3s ease;"></div>' +
      '</div>' +
      '</div>' +
      '<div class="sandbox-metric-row">' +
      '<div class="sandbox-metric-tile ' + (riskScore <= 16 ? 'is-success' : (riskScore <= 40 ? 'is-info' : 'is-danger')) + '"><div class="m-lab">Corporate Risk Index</div><div class="m-val">' + riskScore + ' / 100</div></div>' +
      '<div class="sandbox-metric-tile"><div class="m-lab">Contract Rating</div><div class="m-val">' + ratingText + '</div></div>' +
      '<div class="sandbox-metric-tile ' + (riskScore > 40 ? 'is-danger' : 'is-success') + '"><div class="m-lab">General Counsel Sign-Off</div><div class="m-val">' + (riskScore <= 32 ? 'Approved for Execution' : 'Rejected : Breaches Policy') + '</div></div>' +
      '<div class="sandbox-metric-tile"><div class="m-lab">Balance Sheet Contingency</div><div class="m-val">' + (riskScore <= 20 ? 'Fully Capped & Shielded' : (riskScore <= 40 ? 'Moderate Managed Risk' : 'Severe Uncapped Exposure')) + '</div></div>' +
      '</div>' +
      '<div class="sandbox-forensic-text">' +
      (riskScore > 40 ?
        '<strong>High Legal Hazard Warning:</strong> Accepting supplier paper on limitation of liability or IP assignment exposes the corporate balance sheet to catastrophic claims. If a supplier suffers a major data security breach, a 1x annual fee cap prevents any consequential damages recovery. You must enforce the fallback clause or enterprise redlines before signature.' :
        '<strong>Commercially Sound Redline Position:</strong> Your negotiated position protects critical enterprise assets (uncapped indemnity for gross negligence and data breach, IP ownership of bespoke deliverables, and dispute short-payment rights) while offering sufficient commercial balance to prevent vendor contract impasse.') +
      '</div>' +
      '<div class="quiz-tip-box" style="margin-top:14px;">' +
      '<div class="quiz-tip-head"><span class="quiz-tip-badge">&#128161; Tactical Advisor Tip (Redline Protocol)</span></div>' +
      '<div class="quiz-tip-text">Never execute vendor standard terms without unbundling the limitation of liability clause. Ensure confidentiality breaches, intellectual property infringement, and data privacy gross negligence are strictly carved out from standard liability caps.</div>' +
      '</div>';
    resBox.innerHTML = html;

  } else if (type === 'supplier_eval') {
    var aQ = getNum('sb_ev_a_qual', 9.0);
    var aP = getNum('sb_ev_a_price', 6.0);
    var aD = getNum('sb_ev_a_deliv', 8.5);
    var aE = getNum('sb_ev_a_esg', 8.0);
    var aF = getNum('sb_ev_a_fin', 8.0);

    var bQ = getNum('sb_ev_b_qual', 7.5);
    var bP = getNum('sb_ev_b_price', 9.2);
    var bD = getNum('sb_ev_b_deliv', 7.0);
    var bE = getNum('sb_ev_b_esg', 7.0);
    var bF = getNum('sb_ev_b_fin', 6.5);

    // Weights: Quality 30%, Price 25%, Delivery 20%, ESG 15%, Financial 10%
    var scoreA = (aQ * 0.30) + (aP * 0.25) + (aD * 0.20) + (aE * 0.15) + (aF * 0.10);
    var scoreB = (bQ * 0.30) + (bP * 0.25) + (bD * 0.20) + (bE * 0.15) + (bF * 0.10);
    var aWins = scoreA >= scoreB;
    var delta = Math.abs(scoreA - scoreB);

    html = '<span class="sandbox-verdict-tag ' + (delta > 0.4 ? 'verdict-strong' : 'verdict-warn') + '">' +
      'MCDA Sourcing Award : ' + (aWins ? 'Supplier A (Quality Leader)' : 'Supplier B (Challenger Value)') + ' Recommended</span>' +
      '<div style="margin: 16px 0; background: var(--bg); border: 1px solid var(--border); border-radius: 8px; overflow:hidden;">' +
      '<table style="width:100%; border-collapse:collapse; font-size:12.5px;">' +
      '<thead><tr style="background:var(--bg-2); border-bottom:1px solid var(--border); text-align:left;">' +
      '<th style="padding:8px 12px;">Evaluation Criterion</th><th style="padding:8px 12px;">Weight</th><th style="padding:8px 12px;">Supplier A (Incumbent)</th><th style="padding:8px 12px;">Supplier B (Challenger)</th>' +
      '</tr></thead>' +
      '<tbody>' +
      '<tr style="border-bottom:1px solid var(--border);"><td style="padding:7px 12px; font-weight:600;">Technical Quality &amp; Specs</td><td style="padding:7px 12px;">30%</td><td style="padding:7px 12px;">' + aQ.toFixed(1) + ' / 10 (' + (aQ * 0.3).toFixed(2) + ')</td><td style="padding:7px 12px;">' + bQ.toFixed(1) + ' / 10 (' + (bQ * 0.3).toFixed(2) + ')</td></tr>' +
      '<tr style="border-bottom:1px solid var(--border);"><td style="padding:7px 12px; font-weight:600;">Commercial &amp; Landed Price</td><td style="padding:7px 12px;">25%</td><td style="padding:7px 12px;">' + aP.toFixed(1) + ' / 10 (' + (aP * 0.25).toFixed(2) + ')</td><td style="padding:7px 12px; font-weight:700; color:#059669;">' + bP.toFixed(1) + ' / 10 (' + (bP * 0.25).toFixed(2) + ')</td></tr>' +
      '<tr style="border-bottom:1px solid var(--border);"><td style="padding:7px 12px; font-weight:600;">Delivery Capacity &amp; Lead Time</td><td style="padding:7px 12px;">20%</td><td style="padding:7px 12px;">' + aD.toFixed(1) + ' / 10 (' + (aD * 0.2).toFixed(2) + ')</td><td style="padding:7px 12px;">' + bD.toFixed(1) + ' / 10 (' + (bD * 0.2).toFixed(2) + ')</td></tr>' +
      '<tr style="border-bottom:1px solid var(--border);"><td style="padding:7px 12px; font-weight:600;">ESG &amp; Regulatory Compliance</td><td style="padding:7px 12px;">15%</td><td style="padding:7px 12px;">' + aE.toFixed(1) + ' / 10 (' + (aE * 0.15).toFixed(2) + ')</td><td style="padding:7px 12px;">' + bE.toFixed(1) + ' / 10 (' + (bE * 0.15).toFixed(2) + ')</td></tr>' +
      '<tr style="border-bottom:1px solid var(--border);"><td style="padding:7px 12px; font-weight:600;">Financial Health &amp; Solvency</td><td style="padding:7px 12px;">10%</td><td style="padding:7px 12px;">' + aF.toFixed(1) + ' / 10 (' + (aF * 0.1).toFixed(2) + ')</td><td style="padding:7px 12px;">' + bF.toFixed(1) + ' / 10 (' + (bF * 0.1).toFixed(2) + ')</td></tr>' +
      '<tr style="background:var(--bg-2); font-weight:700;"><td style="padding:10px 12px;">Composite Weighted Score</td><td style="padding:10px 12px;">100%</td>' +
      '<td style="padding:10px 12px; color:' + (aWins ? '#4f46e5' : 'inherit') + ';">' + scoreA.toFixed(2) + ' / 10.0 ' + (aWins ? '★ Winner' : '') + '</td>' +
      '<td style="padding:10px 12px; color:' + (!aWins ? '#4f46e5' : 'inherit') + ';">' + scoreB.toFixed(2) + ' / 10.0 ' + (!aWins ? '★ Winner' : '') + '</td>' +
      '</tr>' +
      '</tbody></table></div>' +
      '<div class="sandbox-metric-row">' +
      '<div class="sandbox-metric-tile ' + (aWins ? 'is-info' : 'is-success') + '"><div class="m-lab">Recommended Finalist</div><div class="m-val">' + (aWins ? 'Supplier A' : 'Supplier B') + '</div></div>' +
      '<div class="sandbox-metric-tile is-success"><div class="m-lab">Winning MCDA Score</div><div class="m-val">' + (aWins ? scoreA : scoreB).toFixed(2) + ' / 10.0</div></div>' +
      '<div class="sandbox-metric-tile"><div class="m-lab">Winning Margin Delta</div><div class="m-val">+' + delta.toFixed(2) + ' Points</div></div>' +
      '<div class="sandbox-metric-tile ' + (delta < 0.35 ? 'is-warn' : 'is-info') + '"><div class="m-lab">Sensitivity Status</div><div class="m-val">' + (delta < 0.35 ? 'Highly Sensitive : Conduct BAFO' : 'Decisive Sourcing Award') + '</div></div>' +
      '</div>' +
      '<div class="sandbox-forensic-text">' +
      (aWins ?
        '<strong>Commercial Evaluation Insight:</strong> Although Supplier B offered a strong commercial price advantage, Supplier A superior quality rating (9.0 vs 7.5), proven delivery resilience (8.5 vs 7.0), and audited solvency lead to a higher overall weighted score of <strong>' + scoreA.toFixed(2) + ' vs ' + scoreB.toFixed(2) + '</strong>. Awarding to Supplier A minimizes operational failure risks and warranty recall exposures.' :
        '<strong>Commercial Evaluation Insight:</strong> Supplier B dramatic landed price advantage produces an unbeatable composite score of <strong>' + scoreB.toFixed(2) + ' vs ' + scoreA.toFixed(2) + '</strong>. While their quality and solvency scores are slightly lower, the cost savings more than compensate within the defined stakeholder weighting criteria. Ensure strict SLA service credit clauses are inserted into the final contract.') +
      '</div>' +
      '<div class="quiz-tip-box" style="margin-top:14px;">' +
      '<div class="quiz-tip-head"><span class="quiz-tip-badge">&#128161; Tactical Advisor Tip (MCDA Evaluation Rigor)</span></div>' +
      '<div class="quiz-tip-text">Always lock weighting percentages and evaluation scoring rubrics with cross-functional stakeholders before issuing the RFQ. Adjusting weights after bids are received invalidates the governance audit trail.</div>' +
      '</div>';
    resBox.innerHTML = html;

  } else if (type === 'incoterms') {
    var exw = getNum('sb_exw_price', 85);
    var ocean = getNum('sb_ocean_freight', 14);
    var dutyPct = getNum('sb_duty_pct', 6.5);
    var port = getNum('sb_port_cost', 5.5);
    var demurrage = getNum('sb_demurrage', 3.5);
    var ddp = getNum('sb_ddp_price', 112);
    vol = getNum('sb_volume', 5000);

    var dutyVal = exw * (dutyPct / 100);
    var totalLandedExw = exw + ocean + dutyVal + port + demurrage;
    var deltaPerUnit = totalLandedExw - ddp;
    var totalAnnualDelta = deltaPerUnit * vol;
    var domesticWins = totalLandedExw > ddp;

    html = '<span class="sandbox-verdict-tag ' + (domesticWins ? 'verdict-strong' : 'verdict-warn') + '">' +
      (domesticWins ? 'Verdict : Domestic DDP Sourcing Delivers Greater Net Value' : 'Verdict : Overseas Sourcing Delivers Cost Advantage') + '</span>' +
      '<div class="sandbox-metric-row">' +
      '<div class="sandbox-metric-tile"><div class="m-lab">Supplier A True Landed Cost</div><div class="m-val">$' + totalLandedExw.toFixed(2) + '</div></div>' +
      '<div class="sandbox-metric-tile"><div class="m-lab">Supplier B Delivered DDP</div><div class="m-val">$' + ddp.toFixed(2) + '</div></div>' +
      '<div class="sandbox-metric-tile ' + (domesticWins ? 'is-success' : 'is-info') + '"><div class="m-lab">Normalized Unit Advantage</div><div class="m-val">$' + Math.abs(deltaPerUnit).toFixed(2) + '</div></div>' +
      '<div class="sandbox-metric-tile ' + (domesticWins ? 'is-success' : 'is-info') + '"><div class="m-lab">Annual Economic Impact</div><div class="m-val">$' + Math.abs(Math.round(totalAnnualDelta)).toLocaleString() + '</div></div>' +
      '</div>' +
      '<div class="sandbox-forensic-text">' +
      (domesticWins ?
        '<strong>Commercial Finding:</strong> Although the overseas vendor appeared $27/unit cheaper at base EXW ($85 vs $112), customs tariffs ($' + dutyVal.toFixed(2) + '), ocean transit ($' + ocean.toFixed(2) + '), drayage ($' + port.toFixed(2) + '), and risk buffers bring true landed cost to <strong>$' + totalLandedExw.toFixed(2) + '/unit</strong>. Selecting the domestic DDP supplier saves <strong>$' + Math.round(totalAnnualDelta).toLocaleString() + ' annually</strong> while eliminating customs clearance delays and marine transit exposure.' :
        '<strong>Commercial Finding:</strong> Even after full normalization of import tariffs, shipping, and port buffers, overseas sourcing yields <strong>$' + Math.abs(Math.round(totalAnnualDelta)).toLocaleString() + ' in net savings</strong>. Ensure carrier contract terms mandate cargo insurance and assign demurrage penalties to the freight forwarder.') +
      '</div>' +
      '<div class="quiz-tip-box" style="margin-top:14px;">' +
      '<div class="quiz-tip-head"><span class="quiz-tip-badge">&#128161; Tactical Advisor Tip (Incoterms Equalization)</span></div>' +
      '<div class="quiz-tip-text">Nominal EXW pricing ignores port handling, marine insurance, and customs clearance. Always normalize freight and demurrage risk buffers on a DDP basis to uncover true supplier competitiveness.</div>' +
      '</div>';
    resBox.innerHTML = html;

  } else if (type === 'tco') {
    var caPrice = getNum('sb_ca_price', 90000);
    var caEnergy = getNum('sb_ca_energy', 26000);
    var caMaint = getNum('sb_ca_maint', 11000);
    var cbPrice = getNum('sb_cb_price', 130000);
    var cbEnergy = getNum('sb_cb_energy', 11500);
    var cbMaint = getNum('sb_cb_maint', 4500);
    var life = getNum('sb_lifespan', 5);

    var tcoA = caPrice + (life * (caEnergy + caMaint));
    var tcoB = cbPrice + (life * (cbEnergy + cbMaint));
    var netSavings = tcoA - tcoB;
    var capexDelta = cbPrice - caPrice;
    var annualOpexSavings = (caEnergy + caMaint) - (cbEnergy + cbMaint);
    var paybackYears = annualOpexSavings > 0 ? (capexDelta / annualOpexSavings) : 0;

    html = '<span class="sandbox-verdict-tag ' + (netSavings > 0 ? 'verdict-strong' : 'verdict-warn') + '">' +
      (netSavings > 0 ? 'Verdict : Premium Asset Delivers Superior 5-Year Enterprise Value' : 'Verdict : Low Capex Model Is Economical') + '</span>' +
      '<div class="sandbox-metric-row">' +
      '<div class="sandbox-metric-tile"><div class="m-lab">Model A 5-Year TCO</div><div class="m-val">$' + Math.round(tcoA).toLocaleString() + '</div></div>' +
      '<div class="sandbox-metric-tile"><div class="m-lab">Model B 5-Year TCO</div><div class="m-val">$' + Math.round(tcoB).toLocaleString() + '</div></div>' +
      '<div class="sandbox-metric-tile is-success"><div class="m-lab">Net Life-Cycle Savings</div><div class="m-val">$' + Math.round(netSavings).toLocaleString() + '</div></div>' +
      '<div class="sandbox-metric-tile is-info"><div class="m-lab">Capex Payback Horizon</div><div class="m-val">' + paybackYears.toFixed(1) + ' Years</div></div>' +
      '</div>' +
      '<div class="sandbox-forensic-text">' +
      '<strong>Executive Trade-Off:</strong> Model B requires $' + capexDelta.toLocaleString() + ' more capital expenditure today, but generates <strong>$' + annualOpexSavings.toLocaleString() + ' in annual utility and maintenance savings</strong>. The extra upfront investment pays for itself in <strong>' + paybackYears.toFixed(1) + ' years</strong>, producing <strong>$' + Math.round(netSavings).toLocaleString() + ' in net cost avoidance</strong> over the 5-year equipment lifecycle.' +
      '</div>' +
      '<div class="quiz-tip-box" style="margin-top:14px;">' +
      '<div class="quiz-tip-head"><span class="quiz-tip-badge">&#128161; Tactical Advisor Tip (TCO Decision Gating)</span></div>' +
      '<div class="quiz-tip-text">Never allow budget holders to select assets based purely on initial purchase price when operating energy and maintenance exceed 20% of capital cost. Present whole-life TCO to the CFO to justify the premium asset.</div>' +
      '</div>';
    resBox.innerHTML = html;

  } else if (type === 'matching') {
    var poRate = getNum('sb_po_rate', 85);
    var grnQty = getNum('sb_grn_qty', 480);
    var invRate = getNum('sb_inv_rate', 92);
    var invQty = getNum('sb_inv_qty', 600);
    var freight = getNum('sb_inv_freight', 1800);

    var approvedPayable = grnQty * poRate;
    var billedTotal = (invQty * invRate) + freight;
    var priceOvercharge = (invRate - poRate) * grnQty;
    var unreceivedBilled = (invQty - grnQty) * invRate;
    var totalHold = billedTotal - approvedPayable;

    html = '<span class="sandbox-verdict-tag verdict-danger">Audit Alert : SOX 404 Variance Detected &middot; Payment Hold Enforced</span>' +
      '<div class="sandbox-metric-row">' +
      '<div class="sandbox-metric-tile is-success"><div class="m-lab">Approved Payable Amount</div><div class="m-val">$' + Math.round(approvedPayable).toLocaleString() + '</div></div>' +
      '<div class="sandbox-metric-tile is-danger"><div class="m-lab">Invoice Overcharge Hold</div><div class="m-val">$' + Math.round(totalHold).toLocaleString() + '</div></div>' +
      '<div class="sandbox-metric-tile"><div class="m-lab">Price Variance Leakage</div><div class="m-val">+$' + Math.round(priceOvercharge).toLocaleString() + '</div></div>' +
      '<div class="sandbox-metric-tile"><div class="m-lab">Unverified Backorder Invoiced</div><div class="m-val">$' + Math.round(unreceivedBilled).toLocaleString() + '</div></div>' +
      '</div>' +
      '<div class="sandbox-forensic-text">' +
      '<strong>Forensic AP Action:</strong> Issue formal short-payment remittance advice authorizing payment of <strong>$' + approvedPayable.toLocaleString() + '</strong> for the 480 verified units at the contracted PO rate ($' + poRate + '). Withhold <strong>$' + totalHold.toLocaleString() + '</strong> and issue debit notes for unapproved unit price increases ($' + priceOvercharge.toLocaleString() + '), unreceived backorder quantities ($' + unreceivedBilled.toLocaleString() + '), and unauthorized freight ($' + freight.toLocaleString() + ').' +
      '</div>' +
      '<div class="quiz-tip-box" style="margin-top:14px;">' +
      '<div class="quiz-tip-head"><span class="quiz-tip-badge">&#128161; Tactical Advisor Tip (SOX 404 Control Breach)</span></div>' +
      '<div class="quiz-tip-text">Approving pre-billed backorders or uncontracted freight creates immediate audit non-compliance. Issue a short-payment remittance advice for physically verified goods only and log debit notes for variances.</div>' +
      '</div>';
    resBox.innerHTML = html;

  } else if (type === 'negotiation') {
    var spend = getNum('sb_neg_spend', 250000);
    var termDisc = 0;
    var termSelect = document.getElementById('sb_neg_term');
    if (termSelect) {
      var v = termSelect.value;
      if (v === '3') termDisc = 8.0;
      else if (v === '5') termDisc = 12.0;
    }
    var payDisc = getNum('sb_neg_pay', 1.5);
    var caseDisc = getNum('sb_neg_case', 2.0);
    var slaDisc = getNum('sb_neg_sla', 1.5);

    var totalPct = termDisc + payDisc + caseDisc + slaDisc;
    var totalValue = spend * (totalPct / 100);
    var finalSpend = spend - totalValue;

    html = '<span class="sandbox-verdict-tag verdict-strong">Verdict : Concession Strategy Recaptured High Enterprise Value</span>' +
      '<div class="sandbox-metric-row">' +
      '<div class="sandbox-metric-tile"><div class="m-lab">Baseline Spend</div><div class="m-val">$' + Math.round(spend).toLocaleString() + '</div></div>' +
      '<div class="sandbox-metric-tile is-success"><div class="m-lab">Negotiated Agreement Value</div><div class="m-val">$' + Math.round(finalSpend).toLocaleString() + '</div></div>' +
      '<div class="sandbox-metric-tile is-success"><div class="m-lab">Commercial Value Recaptured</div><div class="m-val">$' + Math.round(totalValue).toLocaleString() + '</div></div>' +
      '<div class="sandbox-metric-tile is-info"><div class="m-lab">Total Effective Concession</div><div class="m-val">' + totalPct.toFixed(1) + '%</div></div>' +
      '</div>' +
      '<div class="sandbox-forensic-text">' +
      '<strong>Commercial Position:</strong> By bundling term commitment (+' + termDisc.toFixed(1) + '%), prompt payment working capital (+' + payDisc.toFixed(1) + '%), reference logo rights (+' + caseDisc.toFixed(1) + '%), and contractual SLA credits (+' + slaDisc.toFixed(1) + '%), procurement extracts <strong>$' + Math.round(totalValue).toLocaleString() + ' in measurable financial value</strong> from a supplier that initially refused any baseline unit discount.' +
      '</div>' +
      '<div class="quiz-tip-box" style="margin-top:14px;">' +
      '<div class="quiz-tip-head"><span class="quiz-tip-badge">&#128161; Tactical Advisor Tip (Monopoly Leverage)</span></div>' +
      '<div class="quiz-tip-text">When sole-source vendors refuse price discounts, trade contract term length, referenceability, and prompt payment terms to recapture commercial value without sacrificing core requirements.</div>' +
      '</div>';
    resBox.innerHTML = html;

  } else {
    // Price increase defense
    var base = getNum('sb_base_price', 100);
    var dem = getNum('sb_demanded_price', 118.5);
    var matShare = getNum('sb_mat_share', 45) / 100;
    var matPpi = getNum('sb_mat_ppi', 8.0) / 100;
    var labShare = getNum('sb_lab_share', 25) / 100;
    var labWage = getNum('sb_lab_wage', 3.0) / 100;
    vol = getNum('sb_volume', 10000);

    var justifiedPct = (matShare * matPpi) + (labShare * labWage);
    var justifiedUnit = base * (1 + justifiedPct);
    var demandedPct = ((dem - base) / base) * 100;
    var unjustifiedUnit = dem - justifiedUnit;
    var unjustifiedTotal = unjustifiedUnit * vol;

    html = '<span class="sandbox-verdict-tag ' + (unjustifiedUnit > 0 ? 'verdict-warn' : 'verdict-strong') + '">' +
      (unjustifiedUnit > 0 ? 'Audit Result : Unjustified Margin Expansion Detected' : 'Audit Result : Price Increase Within Justified Index') + '</span>' +
      '<div class="sandbox-metric-row">' +
      '<div class="sandbox-metric-tile"><div class="m-lab">Demanded Increase</div><div class="m-val">+' + demandedPct.toFixed(1) + '% ($' + dem.toFixed(2) + ')</div></div>' +
      '<div class="sandbox-metric-tile is-info"><div class="m-lab">PPI Cost-Justified Price</div><div class="m-val">+' + (justifiedPct * 100).toFixed(1) + '% ($' + justifiedUnit.toFixed(2) + ')</div></div>' +
      '<div class="sandbox-metric-tile is-danger"><div class="m-lab">Unjustified Unit Margin</div><div class="m-val">$' + unjustifiedUnit.toFixed(2) + '</div></div>' +
      '<div class="sandbox-metric-tile is-success"><div class="m-lab">Annual Overcharge Prevented</div><div class="m-val">$' + Math.round(unjustifiedTotal).toLocaleString() + '</div></div>' +
      '</div>' +
      '<div class="sandbox-forensic-text">' +
      '<strong>Procurement Counter-Offer Strategy:</strong> The supplier requested +' + demandedPct.toFixed(1) + '%, but actual raw material and labor indices justify only <strong>+' + (justifiedPct * 100).toFixed(1) + '% ($' + justifiedUnit.toFixed(2) + '/unit)</strong>. Reject the demand in writing citing government PPI data. Offer to settle at <strong>$' + justifiedUnit.toFixed(2) + '</strong> with a 12-month indexation cap, saving the enterprise <strong>$' + Math.round(unjustifiedTotal).toLocaleString() + ' annually</strong>.' +
      '</div>' +
      '<div class="quiz-tip-box" style="margin-top:14px;">' +
      '<div class="quiz-tip-head"><span class="quiz-tip-badge">&#128161; Tactical Advisor Tip (PPI Cost Indexation)</span></div>' +
      '<div class="quiz-tip-text">Never accept supplier price demands based on unverified inflation claims. Counter-offer strictly at the formula-justified rate, demand open-book indexation, or propose a 12-month contract lock to protect operating budget.</div>' +
      '</div>';
    resBox.innerHTML = html;
  }
};

/* Wire sandbox evaluation action */
PS.acts = PS.acts || {};
PS.acts['academy-sandbox-run'] = function (el) {
  var card = el.closest('#academySandboxCard');
  var crisis = card ? card.dataset.crisis : 'price-increase';
  PS.executeAcademySandbox(crisis);
  PS.toast('Commercial model recalculated successfully.', 'ok');
};

PS.acts['academy-mark-done'] = function (el) {
  var funcId = el.dataset.func;
  /* This records study, not mastery. It used to set the completed flag
     and award badges without any quiz being taken, so a learner could
     claim every badge in one click and the transcript showed a mastered
     tick next to "Not taken". Mastery is earned by passing the quiz. */
  PS.academy.markStudied(funcId);
  PS.toast('Marked as studied. Take the quiz to record mastery.', 'ok');
  PS.audit('academy-marked-studied', funcId);
  PS.renderRoute();
};

PS.acts['academy-reset-all'] = function () {
  PS.confirm({
    title: 'Reset all Academy progress?',
    body: '<p>This clears your completion record, scores and badges for every function. Certificates will reflect the empty transcript.</p>',
    okLabel: 'Reset all progress', danger: true,
    onOk: function () {
      PS.academy.reset();
      PS.toast('Academy progress reset.', 'ok');
      PS.audit('academy-reset-all', 'progress cleared');
      PS.renderRoute();
    }
  });
};

