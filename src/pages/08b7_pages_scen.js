/* ---------- scenario library (Section 51) ---------- */
PS.route('scenarios', function () {
  PS.pageTitle = 'Scenario Library';
  var list = PS.data.scen || [];
  return PS.reportHead('Procurement scenario library', list.length + ' scenarios') +
    '<div class="card"><h1>Scenario library</h1>' +
    '<p class="lead">Realistic procurement situations with the full chain of work attached: process, SOP, checklist, calculator, template and report. Use these as worked examples of how Procure Sherpa connects together.</p></div>' +
    (list.length ? '<div class="grid grid-2">' + list.map(function (s) {
      return PS.tile('#/scen/' + encodeURIComponent(s.id), 'Scenario', s.title, s.problem || s.desc,
        { icon: PS.TYPE_META.scen.icon, acc: PS.TYPE_META.scen.acc, meta: (s.steps || []).length + ' steps', cta: 'Open the route' });
    }).join('') + '</div>' : PS.empty('Scenario library is loading.')) +
    PS.disclaimer('data');
});
PS.route('scen', function (id) {
  var it = PS.byId('scen', id);
  if (!it) return PS.notFound('scenario', id);
  PS.currentItem = { type: 'scen', id: id, item: it };
  PS.pageTitle = it.title;
  PS.recent.add('scen', id, it.title);
  var html = PS.reportHead(it.title, 'Scenario') +
    '<div class="card"><div class="card-head"><h1>' + PS.esc(it.title) + '</h1><div class="spacer"></div>' + PS.badge('scen') + '</div>' +
    '<div class="alert alert-info"><strong>Typical situation</strong>' + PS.esc(it.problem) + '</div>' +
    (it.summary ? '<p>' + PS.esc(it.summary) + '</p>' : '') +
    '<div class="btn-row no-print"><button type="button" class="btn" data-act="scenario-jump" data-q="' + PS.esc(it.problem) + '">Run this through &ldquo;What should I do?&rdquo;</button></div>' +
    '</div>' +
    '<div class="card"><h2>The route through Procure Sherpa</h2>' +
    (function () {
      var steps = it.steps || [];
      var done = PS.store.get('scenprog:' + id, []);
      var doneSet = {}; done.forEach(function (i) { doneSet[i] = 1; });
      var doneN = steps.filter(function (s, i) { return doneSet[i]; }).length;
      var current = -1;
      steps.forEach(function (s, i) { if (current < 0 && !doneSet[i]) current = i; });
      var pct = steps.length ? Math.round((doneN / steps.length) * 100) : 0;
      var next = current >= 0 ? steps[current] : null;
      var nextHtml = '';
      if (next) {
        var target = next.type && next.id ? PS.routeFor(next.type, next.id) : '';
        nextHtml = '<div class="alert alert-info no-print" style="margin-bottom:12px"><strong>Continue:</strong> next step is &ldquo;' +
          PS.esc(next.label) + '&rdquo;.' + (target ? ' <a class="btn btn-sm" href="' + PS.esc(target) + '">Open it</a>' : '') + '</div>';
      } else if (steps.length) {
        nextHtml = '<div class="alert alert-ok no-print" style="margin-bottom:12px"><strong>Route complete.</strong> All ' + steps.length +
          ' steps are ticked off. Save any outputs to your workspace, then <a href="#/backup">back up</a>.</div>';
      }
      var bar = '<div class="pbar no-print"><div class="pbar-fill" style="width:' + pct + '%"></div></div>' +
        '<div class="pbar-label no-print">' + doneN + ' of ' + steps.length + ' steps done' +
        (doneN ? ' &middot; <button type="button" class="btn btn-sm" data-act="scen-progress-reset" data-sid="' + PS.esc(id) + '">Reset progress</button>' : '') +
        '</div>';
      var list = '<ol class="stepper">' + steps.map(function (s, i) {
        var isDone = !!doneSet[i];
        var link = '';
        if (s.type && s.id) {
          var o = s.type === 'gloss' ? PS.glossaryById(s.id) : PS.byId(s.type, s.id);
          if (o) link = '<a class="chip" href="' + PS.routeFor(s.type, s.id) + '">' + PS.esc(PS.typeLabel(s.type)) + ': ' + PS.esc(o.title || o.term) + '</a>';
        }
        return '<li class="' + (isDone ? 'is-done' : (i === current ? 'is-current' : '')) + '">' +
          '<div class="tl-title">' + PS.esc(s.label) + '</div>' +
          (s.note ? '<div class="tl-body">' + PS.esc(s.note) + '</div>' : '') +
          '<div class="chips" style="margin-top:6px">' +
          (link || '') +
          '<button type="button" class="btn btn-sm no-print" data-act="scen-step-done" data-sid="' + PS.esc(id) + '" data-idx="' + i + '">' +
          (isDone ? 'Undo' : 'Mark done') + '</button></div></li>';
      }).join('') + '</ol>';
      return (steps.length ? nextHtml + bar : '') + list;
    })() + '</div>' +
    (it.checks ? '<div class="card"><h2>Questions this scenario should answer before you commit</h2>' + PS.ul(it.checks) + '</div>' : '') +
    (it.watchOut ? '<div class="card"><h2>What can go wrong</h2>' + PS.ul(it.watchOut) + '</div>' : '') +
    PS.relatedCard('scen', it) +
    PS.disclaimer(it.disclaimerKind || 'policy');
  return html;
});