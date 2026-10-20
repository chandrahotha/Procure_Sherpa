/* ---------- quick start, favorites, recently used (Section 8, 49) ---------- */
PS.acts['home-what'] = function () {
  var el = PS.$('#homeWhat');
  if (!el) return;
  el.focus();
  if (el.select) el.select();
};
PS.acts['home-what-run'] = function () {
  var v = PS.clean(PS.$('#homeWhat') ? PS.$('#homeWhat').value : '', 200);
  if (!v) { PS.toast('Describe what you need to do first, or pick an example below.'); return; }
  PS.go('what', { q: v });
};
PS.acts['home-search'] = function () {
  var v = PS.clean(PS.$('#homeQ') ? PS.$('#homeQ').value : '', 120);
  if (v) { PS.go('search', { q: v }); return; }
  if (PS.cmdPalette) PS.cmdPalette.open();
};
PS.acts['prefill-what'] = function (el) {
  if (PS.$('#whatQ')) PS.$('#whatQ').value = el.dataset.q || '';
  PS.acts['what-run']();
};
PS.acts['scen-step-done'] = function (el) {
  var sid = el.dataset.sid, idx = parseInt(el.dataset.idx, 10) || 0;
  var key = 'scenprog:' + sid;
  var done = PS.store.get(key, []);
  var i = done.indexOf(idx);
  if (i >= 0) done.splice(i, 1); else done.push(idx);
  PS.store.set(key, done);
  PS.renderRoute();
};
PS.acts['scen-progress-reset'] = function (el) {
  PS.store.set('scenprog:' + el.dataset.sid, []);
  PS.renderRoute();
};
PS.route('quickstart', function () {
  PS.pageTitle = 'Quick Start';
  var walk = [
    { t: '1. Start from your problem, not from a tool', d: 'Open <a href="#/what">What should I do?</a> and describe the situation. You will be routed to the relevant SOP, checklist, calculator and template instead of guessing which tool to open.', i: 'Scenario' },
    { t: '2. Understand the concept first', d: 'Each <a href="#/list/kb">knowledge page</a> answers what it is, why procurement cares, when it is used, the process, an example, the risks and the common mistakes.', i: 'Concept' },
    { t: '3. Follow the SOP', d: 'Open the <a href="#/list/sop">SOP</a> for the work you are doing. Purpose, scope, trigger, steps, decision points, controls, outputs, records and KPIs are on one page.', i: 'SOP' },
    { t: '4. Work the checklist', d: 'Every SOP has an embedded <a href="#/list/cl">checklist</a> you can also use standalone. Progress is saved in this browser.', i: 'Checklist' },
    { t: '5. Quantify with a calculator', d: 'Use the <a href="#/list/calc">procurement calculators</a> for quotes, landed cost, TCO, negotiation savings, escalation, payment terms, suppliers, budget, tax and FX. Every tool shows formula, assumptions and interpretation.', i: 'Calculator' },
    { t: '6. Take the decision deliberately', d: 'Use the <a href="#/list/dec">decision guides</a> to test your reasoning, and record the basis in the calculator notes or a <a href="#/list/tpl">template</a>.', i: 'Decision' },
    { t: '7. Document and report', d: 'Save the analysis, then Print / PDF the report. Reports include inputs, results, interpretation, assumptions, notes and methodology.', i: 'Report' },
    { t: '8. Back up before you rely on it', d: 'Open <a href="#/backup">Backup / Restore</a> regularly. Saved work lives only in this browser profile until you export it.', i: 'Workspace' }
  ];
  var html = '<div class="card"><h1>Quick Start</h1>' +
    '<p class="lead">Eight steps from a business problem to a documented procurement decision. Everything referenced here is inside this one file and works with no internet connection.</p>' +
    '<div class="grid grid-2">' + walk.map(function (w) {
      return '<div class="tile"><div class="t-kicker">' + PS.esc(w.i) + '</div><div class="t-title">' + w.t + '</div><p class="t-desc">' + w.d + '</p></div>';
    }).join('') + '</div>' +
    '<h2>Common first tasks</h2>' +
    '<div class="grid grid-3">' + (PS.QUICK_PROBLEMS || []).map(function (p) {
      return '<button type="button" class="tile" style="text-align:left" data-act="scenario-jump" data-q="' + PS.esc(p) + '">' +
        '<div class="t-kicker">Common task</div><div class="t-title">' + PS.esc(p) + '</div></button>';
    }).join('') + '</div></div>' +
    PS.disclaimer('policy');
  return html;
});
PS.route('fav', function () {
  PS.pageTitle = 'Favorites';
  var favs = PS.fav.list();
  var html = '<div class="card"><h1>Favorites</h1>' +
    '<p class="card-sub">Pinned tools, SOPs, checklists, templates, concepts, and decision guides for rapid access.</p>' +
    (favs.length ? '<ul class="res-list">' + favs.map(function (f) {
      var o = f.type === 'gloss' ? PS.glossaryById(f.id) : PS.byId(f.type, f.id);
      return '<li>' + PS.badge(f.type) +
        '<span><a class="res-title" href="' + PS.routeFor(f.type, f.id) + '">' + PS.esc(f.title || (o ? (o.title || o.term) : f.id)) + '</a>' +
        '<div class="res-desc">' + PS.esc(o ? (o.desc || o.def || '') : 'This item is no longer in the content set.') + '</div></span>' +
        '<button type="button" class="btn btn-sm" data-act="fav-remove" data-type="' + PS.esc(f.type) + '" data-id="' + PS.esc(f.id) + '">Remove</button></li>';
    }).join('') + '</ul>' : '<div class="empty">No favorites yet. Open a page and use the &#9734; star in the top bar to pin it here.</div>') +
    '</div>';
  return html;
});
PS.acts['fav-remove'] = function (el) {
  PS.fav.toggle(el.dataset.type, el.dataset.id);
  PS.updateNavCounts();
  PS.renderRoute();
};
PS.route('recent', function () {
  PS.pageTitle = 'Recently Used';
  var r = PS.recent.list();
  var html = '<div class="card"><div class="card-head"><h1>Recently Used</h1><div class="spacer"></div>' +
    (r.length ? '<button type="button" class="btn btn-sm" data-act="recent-clear">Clear list</button>' : '') + '</div>' +
    '<p class="card-sub">The last ' + r.length + ' operational tools and learning modules you opened, most recent first.</p>' +
    (r.length ? '<ul class="res-list">' + r.map(function (x) {
      return '<li>' + PS.badge(x.type) + '<span><a class="res-title" href="' + PS.routeFor(x.type, x.id) + '">' + PS.esc(x.title || x.id) + '</a>' +
        '<div class="res-desc">' + PS.esc(PS.dateTime(x.t)) + '</div></span></li>';
    }).join('') + '</ul>' : '<div class="empty">Nothing opened yet. Pages you visit are listed here.</div>') + '</div>';
  return html;
});
PS.route('list', function (arg, params) {
  var type = arg || 'kb';
  /* 'library' was a link target in earlier releases; treat it as the
     Knowledge Hub so old bookmarks and stale links still resolve */
  if (type === 'library') type = 'kb';
  var segs = PS.routeMeta.args;
  var cat = segs.slice(1).join('/') || '';
  if (!PS.LIST_META[type] && !PS.data[type]) return PS.notFound('library', type);
  return PS.listPage(type, cat, params);
});