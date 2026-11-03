/* ---------- KPI pages (Section 30) ---------- */
PS.route('kpi', function (id, params) {
  if (!id) return PS.sectionIndex('kpi', params);
  var it = PS.byId('kpi', id);
  if (!it) return PS.notFound('KPI', id);
  PS.currentItem = { type: 'kpi', id: id, item: it };
  PS.pageTitle = it.title;
  PS.recent.add('kpi', id, it.title);
  var html = PS.reportHead(it.title, 'Procurement KPI \u00B7 ' + (it.cat || '')) +
    '<div class="card">' +
    '<div class="card-head"><h1>' + PS.esc(it.title) + '</h1><div class="spacer"></div>' +
    PS.badge('kpi') + '<span class="badge">' + PS.esc(it.cat || 'General') + '</span></div>' +
    '<div class="alert alert-info"><strong>Definition</strong>' + PS.esc(it.def) + '</div>' +
    '<h2>Formula</h2><pre>' + PS.esc(it.formula) + '</pre>' +
    (it.formulaNote ? '<p class="note">' + PS.esc(it.formulaNote) + '</p>' : '') +
    (it.tags ? PS.tagsRow(it) : '') +
    '</div>' +
    '<div class="grid grid-2">' +
    '<div class="card"><h2>Required inputs</h2>' + PS.ul(it.inputs) + '</div>' +
    '<div class="card"><h2>Worked example</h2><div class="alert">' + PS.esc(it.example) + '</div>' + PS.illustrativeNote('calc') + '</div>' +
    '<div class="card"><h2>Interpretation</h2>' + PS.ul(it.interp) + '</div>' +
    '<div class="card"><h2>Limitations</h2>' + PS.ul(it.limits) + '</div>' +
    '</div>' +
    '<div class="card"><h2>Common mistakes</h2>' + PS.ul(it.mistakes) +
    (it.practice ? '<h3>Practical guidance</h3>' + PS.ul(it.practice) : '') +
    (it.target ? '<h3>Targets</h3><p>' + PS.esc(it.target) + '</p>' : '') +
    '</div>' +
    /* A KPI is a number you agree to keep measuring, and the product already
       has the place where it is measured. §78's savings journey ends at the
       dashboard, and a reader who has just read the definition of Savings
       Realisation should be shown where to look at it, not sent back to the
       sidebar to find it. */
    (function () {
      var onSavingsDash = /saving|avoidance|realization|realisation|cost/i.test((it.id || '') + ' ' + (it.cat || '') + ' ' + (it.title || ''));
      return '<div class="card"><div class="card-head"><h2>Where this is reported</h2></div>' +
        '<p class="card-sub">Procure Sherpa keeps the figures you enter in this browser; these are the views that read them back.</p>' +
        '<div class="btn-row no-print">' +
        (onSavingsDash ? '<a class="btn btn-primary" href="#/dash-savings">Open the Savings Dashboard</a>' : '') +
        '<a class="btn" href="#/dash">Open the Analytics dashboard</a>' +
        '<a class="btn btn-ghost" href="#/search?q=' + encodeURIComponent(it.title) + '">Find the work that feeds this number</a>' +
        '</div></div>';
    }()) +
    PS.relatedCard('kpi', it) +
    PS.disclaimer(it.disclaimerKind || 'data');
  return html;
});
/* ---------- glossary (Section 31) ---------- */
PS.glossLinks = function (g) {
  var out = [];
  ['calcs', 'sops', 'concepts', 'templates'].forEach(function (key) {
    var type = PS.REL_TYPE[key];
    (g.rel && g.rel[key] ? g.rel[key] : []).forEach(function (id) {
      var o = PS.byId(type, id);
      if (o) out.push('<a class="chip" href="' + PS.routeFor(type, id) + '">' + PS.esc(o.title) + '</a>');
    });
  });
  return out.length ? out.join(' ') : '<span class="muted">: </span>';
};
PS.route('glossary', function (arg, params) {
  PS.pageTitle = 'Procurement Glossary';
  var term = params && params.term ? String(params.term) : '';
  var all = (PS.data.gloss || []).slice().sort(function (a, b) {
    return String(a.term).localeCompare(String(b.term));
  });
  var focus = term ? PS.glossaryFind(term) : null;
  var html = PS.reportHead('Procurement glossary', all.length + ' terms') +
    '<div class="card"><h1>Procurement glossary</h1>' +
    '<p class="card-sub">Terminology used across Procure Sherpa. Each entry links to the knowledge page, SOP, calculator or template where the term is applied.</p>' +
    '<div class="searchbox no-print">' +
    '<label class="sr-only" for="glossQ">Filter glossary</label>' +
    '<input type="search" id="glossQ" placeholder="Filter terms\u2026" maxlength="60">' +
    '</div>' +
    '<p class="note">' + PS.esc(PS.glossNote || 'Definitions reflect common procurement practice. Terminology varies between organizations; agree local definitions where precision matters.') + '</p>' +
    '</div>';
  if (focus) {
    html += '<div class="card" id="glossFocus"><div class="card-head"><h2>' + PS.esc(focus.term) + '</h2><div class="spacer"></div>' +
      '<span class="badge badge-type">Highlighted term</span></div>' +
      (focus.full ? '<p class="lead">' + PS.esc(focus.full) + '</p>' : '') +
      '<p>' + PS.esc(focus.def) + '</p>' +
      (focus.why ? '<h3>Why it matters</h3>' + PS.ul(focus.why) : '') +
      PS.relatedCard('gloss', focus) + '</div>';
  }
  html += '<div class="card"><div class="table-wrap"><table id="glossTable"><thead><tr><th>Term</th><th>Meaning</th><th>Where to use it</th></tr></thead><tbody>' +
    all.map(function (g) {
      return '<tr data-term="' + PS.esc(String(g.term).toLowerCase()) + '"><td><strong>' + PS.esc(g.term) + '</strong>' +
        (g.full ? '<div class="res-desc">' + PS.esc(g.full) + '</div>' : '') + '</td>' +
        '<td>' + PS.esc(g.def) + '</td>' +
        '<td>' + PS.glossLinks(g) + '</td></tr>';
    }).join('') + '</tbody></table></div></div>' +
    PS.disclaimer('data');
  PS.pageInit = function () {
    var q = PS.$('#glossQ');
    if (q) {
      q.addEventListener('input', PS.debounce(function () {
        var v = PS.clean(q.value, 60).toLowerCase();
        PS.$$('#glossTable tbody tr').forEach(function (tr) {
          tr.style.display = (!v || tr.dataset.term.indexOf(v) >= 0) ? '' : 'none';
        });
      }, 180));
    }
  };
  return html;
});