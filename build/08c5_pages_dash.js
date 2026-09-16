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
    '<div class="card"><h1>Dashboard</h1>' +
    '<p class="lead">A summary of the analysis you have saved in this browser. These are your own working figures - they are not enterprise KPIs, they are not benchmarks and they exclude anything you have not entered here.</p>' +
    '<div class="grid grid-4">' +
    '<div class="stat"><div class="s-lab">Saved analyses</div><div class="s-val">' + saved.length + '</div></div>' +
    '<div class="stat is-ok"><div class="s-lab">Savings analysed</div><div class="s-val">' + PS.moneyR(sumS) + '</div></div>' +
    '<div class="stat is-warn"><div class="s-lab">Cost avoidance recorded</div><div class="s-val">' + PS.moneyR(sumA) + '</div></div>' +
    '<div class="stat"><div class="s-lab">Supplier assessments</div><div class="s-val">' + supAssess + '</div></div>' +
    '<div class="stat"><div class="s-lab">Open checklists</div><div class="s-val">' + openCl.length + '</div></div>' +
    '<div class="stat"><div class="s-lab">Favorites</div><div class="s-val">' + PS.fav.list().length + '</div></div>' +
    '<div class="stat"><div class="s-lab">Local storage used</div><div class="s-val">' + PS.group(kb / 1024, 0) + ' KB</div></div>' +
    '<div class="stat"><div class="s-lab">Audit events kept</div><div class="s-val">' + PS.auditList().length + '</div></div>' +
    '</div>' +
    '<div class="btn-row no-print"><a class="btn btn-primary" href="#/saved">Open saved work</a>' +
    '<a class="btn" href="#/dash-savings">Savings dashboard</a>' +
    '<button type="button" class="btn" data-act="backup-export">Export backup</button>' +
    '<button type="button" class="btn btn-ghost" data-act="storage-info">Storage details</button></div></div>' +
    '<div class="grid grid-2">' +
    '<div class="card"><h2>Saved work by type</h2>' +
    (saved.length ? '<div class="table-wrap"><table><thead><tr><th>Type</th><th class="num">Items</th><th class="num">Most recent</th></tr></thead><tbody>' +
      Object.keys(byType).sort().map(function (t) {
        var latest = saved.filter(function (r) { return r.type === t; })[0];
        return '<tr><td><a href="#/saved?type=' + encodeURIComponent(t) + '">' + PS.esc(t) + '</a></td>' +
          '<td class="num">' + byType[t] + '</td><td class="num">' + PS.esc(latest ? PS.dateStr(latest.modified) : '') + '</td></tr>';
      }).join('') + '</tbody></table></div>' : '<p class="note">Nothing saved yet. Calculations, checklists, templates and decisions you save appear here.</p>') +
    '</div>' +
    '<div class="card"><h2>Open checklists</h2>' +
    (openCl.length ? '<ul class="res-list">' + openCl.map(function (c) {
      return '<li><span><a class="res-title" href="#/cl/' + encodeURIComponent(c.id) + '">' + PS.esc(c.title) + '</a>' +
        '<div class="res-desc">' + c.done + ' of ' + c.total + ' items complete</div></span></li>';
    }).join('') + '</ul>' : '<p class="note">No checklist is part-complete. Open a checklist from the sidebar to start one.</p>') +
    '</div>' +
    '<div class="card"><h2>Recent activity</h2>' +
    (audit.length ? '<ul class="res-list">' + audit.map(function (a) {
      return '<li><span><span class="res-title">' + PS.esc(a.e.replace(/-/g, ' ')) + '</span>' +
        '<div class="res-desc">' + PS.esc(a.d) + ' &middot; ' + PS.esc(PS.dateTime(a.t)) + '</div></span></li>';
    }).join('') + '</ul>' : '<p class="note">No activity recorded yet.</p>') +
    '<p class="note">The audit log keeps the last ' + PS.AUDIT_MAX + ' local events and is never transmitted anywhere. <a href="#/audit">Open full log</a>.</p></div>' +
    '<div class="card"><h2>Favourite tools and recent SOPs</h2>' +
    (favs.length ? '<h3>Favorites</h3><div class="chips">' + favs.map(function (f) {
      return '<a class="chip" href="' + PS.routeFor(f.type, f.id) + '">' + PS.esc(f.title || f.id) + '</a>';
    }).join('') + '</div>' : '<p class="note">No favorites yet - use the &#9734; star in the top bar.</p>') +
    (recentSops.length ? '<h3>Recently opened SOPs</h3><div class="chips">' + recentSops.map(function (f) {
      return '<a class="chip" href="' + PS.routeFor(f.type, f.id) + '">' + PS.esc(f.title || f.id) + '</a>';
    }).join('') + '</div>' : '') +
    '</div></div>' +
    PS.disclaimer('finance');
  return html;
});