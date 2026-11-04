/* ---------- KPI pages (Section 30) ---------- */
PS.route('kpi', function (id, params) {
  if (!id) return PS.sectionIndex('kpi', params);
  var it = PS.byId('kpi', id);
  if (!it) return PS.notFound('KPI', id);
  PS.currentItem = { type: 'kpi', id: id, item: it };
  PS.pageTitle = it.title;
  PS.recent.add('kpi', id, it.title);
  var html = PS.reportHead(it.title, 'Procurement KPI \u00B7 ' + (it.cat || '')) +
    '<div class="inst-card">' +
    '<div class="inst-card-head"><h1>' + PS.esc(it.title) + '</h1><div class="spacer"></div>' +
    PS.badge('kpi') + '<span class="inst-badge">' + PS.esc(it.cat || 'General') + '</span></div>' +
    '<div class="inst-alert inst-alert-info"><strong>Definition</strong>' + PS.esc(it.def) + '</div>' +
    '<h2>Formula</h2><pre>' + PS.esc(it.formula) + '</pre>' +
    (it.formulaNote ? '<p class="inst-note">' + PS.esc(it.formulaNote) + '</p>' : '') +
    (it.tags ? PS.tagsRow(it) : '') +
    '</div>' +
    '<div class="inst-grid inst-grid-2">' +
    '<div class="inst-card"><h2>Required inputs</h2>' + PS.ul(it.inputs) + '</div>' +
    '<div class="inst-card"><h2>Worked example</h2><div class="inst-alert">' + PS.esc(it.example) + '</div>' + PS.illustrativeNote('calc') + '</div>' +
    '<div class="inst-card"><h2>Interpretation</h2>' + PS.ul(it.interp) + '</div>' +
    '<div class="inst-card"><h2>Limitations</h2>' + PS.ul(it.limits) + '</div>' +
    '</div>' +
    '<div class="inst-card"><h2>Common mistakes</h2>' + PS.ul(it.mistakes) +
    (it.practice ? '<h3>Practical guidance</h3>' + PS.ul(it.practice) : '') +
    (it.target ? '<h3>Targets</h3><p>' + PS.esc(it.target) + '</p>' : '') +
    '</div>' +
    (function () {
      var onSavingsDash = /saving|avoidance|realization|realisation|cost/i.test((it.id || '') + ' ' + (it.cat || '') + ' ' + (it.title || ''));
      return '<div class="inst-card">' +
        '<div class="inst-card-head"><h2>Where this is reported</h2></div>' +
        '<p class="inst-read">Procure Sherpa keeps the figures you enter in this browser; these are the views that read them back.</p>' +
        '<div class="inst-btn-row no-print">' +
        (onSavingsDash ? '<a class="inst-home-btn inst-home-btn--primary" href="#/dash-savings">Open the Savings Dashboard</a>' : '') +
        '<a class="inst-home-btn inst-home-btn--ghost" href="#/dash">Open the Analytics dashboard</a>' +
        '<a class="inst-home-btn inst-home-btn--ghost" href="#/search?q=' + encodeURIComponent(it.title) + '">Find the work that feeds this number</a>' +
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
      if (o) out.push('<a class="inst-chip" href="' + PS.routeFor(type, id) + '">' + PS.esc(o.title) + '</a>');
    });
  });
  return out.length ? out.join(' ') : '<span class="inst-mute">: </span>';
};
PS.route('glossary', function (arg, params) {
  PS.pageTitle = 'Procurement Glossary';
  var term = params && params.term ? String(params.term) : '';
  var all = (PS.data.gloss || []).slice().sort(function (a, b) {
    return String(a.term).localeCompare(String(b.term));
  });
  var focus = term ? PS.glossaryFind(term) : null;
  var html = PS.reportHead('Procurement glossary', all.length + ' terms') +
    '<div class="inst-card"><h1>Procurement glossary</h1>' +
    '<p class="inst-read">Terminology used across Procure Sherpa. Each entry links to the knowledge page, SOP, calculator or template where the term is applied.</p>' +
    '<div class="inst-searchbox no-print">' +
    '<label class="sr-only" for="glossQ">Filter glossary</label>' +
    '<input type="search" id="glossQ" placeholder="Filter terms\u2026" maxlength="60">' +
    '</div>' +
    '<p class="inst-note">' + PS.esc(PS.glossNote || 'Definitions reflect common procurement practice. Terminology varies between organizations; agree local definitions where precision matters.') + '</p>' +
    '</div>';
  if (focus) {
    html += '<div class="inst-card" id="glossFocus">' +
      '<div class="inst-card-head"><h2>' + PS.esc(focus.term) + '</h2><div class="spacer"></div>' +
      '<span class="inst-badge inst-badge--primary">Highlighted term</span></div>' +
      (focus.full ? '<p class="inst-read">' + PS.esc(focus.full) + '</p>' : '') +
      '<p>' + PS.esc(focus.def) + '</p>' +
      (focus.why ? '<h3>Why it matters</h3>' + PS.ul(focus.why) : '') +
      PS.relatedCard('gloss', focus) + '</div>';
  }
  html += '<div class="inst-card"><div class="table-wrap"><table id="glossTable"><thead><tr><th>Term</th><th>Meaning</th><th>Where to use it</th></tr></thead><tbody>' +
    all.map(function (g) {
      return '<tr data-term="' + PS.esc(String(g.term).toLowerCase()) + '"><td><strong>' + PS.esc(g.term) + '</strong>' +
        (g.full ? '<div class="inst-res-desc">' + PS.esc(g.full) + '</div>' : '') + '</td>' +
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