/* ---------- local dashboard (Section 64) ---------- */
PS.route('dash', function () {
  PS.pageTitle = 'Dashboard';
  var saved = PS.saved.list();
  var ini = PS.savingsInitiatives();
  var sumS = ini.reduce(function (a, b) { return a + b.savings; }, 0);
  var sumA = ini.reduce(function (a, b) { return a + b.avoidance; }, 0);
  var byType = {};
  saved.forEach(function (r) { byType[r.type] = (byType[r.type] || 0) + 1; });
  var supAssess = saved.filter(function (r) {
    return r.data && /supplier|concentration|scorecard/i.test(r.data.calc || '');
  }).length;
  var openCl = [];
  var clAll = PS.clState.all();
  Object.keys(clAll).forEach(function (k) {
    var cl = PS.byId('cl', k);
    var total = PS.checklistItemCount(k);
    var done = Object.keys(clAll[k].checked || {}).filter(function (x) { return clAll[k].checked[x]; }).length;
    if (done > 0 && (!total || done < total)) openCl.push({ id: k, title: cl ? cl.title : k, done: done, total: total });
  });
  var audit = PS.auditList().slice(0, 10);
  var favs = PS.fav.list().slice(0, 8);
  var recentSops = PS.recent.list().filter(function (r) { return r.type === 'sop'; }).slice(0, 5);
  var kb = PS.store.bytes();
  var html = PS.reportHead('Dashboard', 'Your local work') +
    PS.ui.card(
      '<h1 class="inst-title">Dashboard</h1>' +
      '<p class="inst-read">A summary of the analysis you have saved in this browser. These are your own working figures - they are not enterprise KPIs, they are not benchmarks and they exclude anything you have not entered here.</p>' +
      PS.ui.statGrid([
        PS.ui.stat(saved.length, 'Saved analyses'),
        PS.ui.stat(PS.moneyR(sumS), 'Savings analysed', 'ok'),
        PS.ui.stat(PS.moneyR(sumA), 'Cost avoidance recorded', 'warn'),
        PS.ui.stat(supAssess, 'Supplier assessments'),
        PS.ui.stat(openCl.length, 'Open checklists'),
        PS.ui.stat(PS.fav.list().length, 'Favorites'),
        PS.ui.stat(PS.group(kb / 1024, 0) + ' KB', 'Workspace Footprint'),
        PS.ui.stat(PS.auditList().length, 'Audit events kept')
      ]) +
      PS.ui.btnRow('<a class="inst-home-btn inst-home-btn--primary" href="#/saved">Open saved work</a>' +
      '<a class="inst-home-btn inst-home-btn--ghost" href="#/dash-savings">Savings dashboard</a>' +
      '<button type="button" class="inst-home-btn inst-home-btn--ghost" data-act="backup-export">Export backup</button>' +
      '<button type="button" class="inst-home-btn inst-home-btn--ghost" data-act="storage-info">Storage details</button>', 'no-print'),
      { class: 'inst-dash-header' }
    ) +
    '<div class="inst-grid inst-grid-2">' +
    PS.ui.card(
      '<h2 class="inst-title">Saved work by type</h2>' +
      (saved.length ? '<div class="table-wrap"><table><thead><tr><th>Type</th><th class="num">Items</th><th class="num">Most recent</th></tr></thead><tbody>' +
        Object.keys(byType).sort().map(function (t) {
          var latest = saved.filter(function (r) { return r.type === t; })[0];
          return '<tr><td><a href="#/saved?type=' + encodeURIComponent(t) + '">' + PS.esc(t) + '</a></td>' +
            '<td class="num">' + byType[t] + '</td><td class="num">' + PS.esc(latest ? PS.dateStr(latest.modified) : '') + '</td></tr>';
        }).join('') + '</tbody></table></div>' : PS.ui.note('Nothing saved yet. Calculations, checklists, templates and decisions you save appear here.'))
    ) +
    PS.ui.card(
      '<h2 class="inst-title">Open checklists</h2>' +
      (openCl.length ? '<ul class="inst-res-list">' + openCl.map(function (c) {
        return '<li><span><a class="inst-res-title" href="#/cl/' + encodeURIComponent(c.id) + '">' + PS.esc(c.title) + '</a>' +
          '<div class="inst-res-desc">' + c.done + ' of ' + c.total + ' items complete</div></span></li>';
      }).join('') + '</ul>' : PS.ui.note('No checklist is part-complete. Open a checklist from the sidebar to start one.'))
    ) +
    PS.ui.card(
      '<h2 class="inst-title">Recent activity</h2>' +
      (audit.length ? '<ul class="inst-res-list">' + (function () {
        var rows = [], prev = null;
        audit.forEach(function (a) {
          var L = PS.auditLabel(a);
          var key = L.event + '|' + L.detail;
          if (prev && prev.key === key) { prev.n++; prev.timeEnd = a.t; return; }
          prev = { key: key, n: 1, label: L.event, detail: L.detail, timeStart: a.t, timeEnd: a.t };
          rows.push(prev);
        });
        return rows.map(function (r) {
          return '<li><span><span class="inst-res-title">' + PS.esc(r.label) +
            (r.n > 1 ? ' <span class="inst-badge">&times;' + r.n + '</span>' : '') + '</span>' +
            '<div class="inst-res-desc">' + PS.esc(r.detail) + ' &middot; ' + PS.esc(PS.dateTime(r.timeStart)) +
            (r.n > 1 ? ' to ' + PS.esc(PS.dateTime(r.timeEnd)) : '') + '</div></span></li>';
        }).join('');
      })() + '</ul>' : PS.ui.note('No activity recorded yet.')) +
      PS.ui.note('The audit log keeps the last ' + PS.AUDIT_MAX + ' ' + (PS.i18n ? PS.i18n.t('audit.events') : 'local events') + ' and is never transmitted anywhere. <a href="#/audit">Open full log</a>.')
    ) +
    PS.ui.card(
      '<h2 class="inst-title">Favourite tools and recent SOPs</h2>' +
      (favs.length ? '<h3 class="inst-title">Favorites</h3><div class="inst-chips">' + favs.map(function (f) {
        return '<a class="inst-chip" href="' + PS.routeFor(f.type, f.id) + '">' + PS.esc(f.title || f.id) + '</a>';
      }).join('') + '</div>' : PS.ui.note('No favorites yet - use the &#9734; star in the top bar.')) +
      (recentSops.length ? '<h3 class="inst-title">Recently opened SOPs</h3><div class="inst-chips">' + recentSops.map(function (f) {
        return '<a class="inst-chip" href="' + PS.routeFor(f.type, f.id) + '">' + PS.esc(f.title || f.id) + '</a>';
      }).join('') + '</div>' : '')
    ) +
    '</div>' +
    PS.disclaimer('finance');
  return html;
});