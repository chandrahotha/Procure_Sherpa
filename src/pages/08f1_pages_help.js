/* ---------- help center (Section 75) ---------- */
PS.route('help', function (arg) {
  PS.pageTitle = 'Help Center';
  var topics = PS.HELP || [];
  var sel = PS.clean(arg, 40);
  var chosen = topics.filter(function (t) { return t.id === sel; })[0];
  var html = PS.reportHead('Help Center', topics.length + ' topics') +
    PS.ui.card(
      '<h1 class="inst-title">Help Center</h1>' +
      '<p class="inst-read">How Procure Sherpa works, how your data is handled, and platform guidelines.</p>' +
      '<div class="inst-chips no-print">' + topics.map(function (t) {
        return '<a class="inst-chip' + (t.id === sel ? ' is-on' : '') + '" href="#/help/' + encodeURIComponent(t.id) + '">' + PS.esc(t.title) + '</a>';
      }).join('') + '</div>' +
      '<p class="inst-note">Shortcuts: <kbd>Ctrl</kbd>+<kbd>K</kbd> search, <kbd>/</kbd> focus search, <kbd>Esc</kbd> close the sidebar. Print any page with the printer button - navigation and controls are removed automatically.</p>' +
      /* Quick Start was a sidebar item once. It duplicated the Command
         Center getting-started card, so it came out of the tree rather
         than being left as a page nothing links to. */
      '<div class="inst-chips no-print" style="margin-top:var(--space-2)">' +
      '<a class="inst-chip" href="#/quickstart">Quick Start: the five-minute orientation</a>' +
      '<a class="inst-chip" href="#/what">Help me with a live problem</a>' +
      '<a class="inst-chip" href="#/maturity">Maturity Check</a>' +
      '</div>'
    );
  if (chosen) {
    html += PS.ui.card(
      '<h2 class="inst-title">' + PS.esc(chosen.title) + '</h2>' + PS.helpBody(chosen),
      { id: 'helpTopic' }
    );
  }
  topics.filter(function (t) { return !chosen || t.id !== chosen.id; }).forEach(function (t) {
    html += PS.section(t.title, PS.helpBody(t));
  });
  html += PS.disclaimer('policy');
  PS.pageInit = function () {
    var el = PS.$('#helpTopic');
    if (el) el.scrollIntoView({ block: 'start' });
  };
  return html;
});
PS.helpBody = function (t) {
  var out = '';
  (t.sections || []).forEach(function (s) {
    out += (s.h ? '<h3 class="inst-title">' + PS.esc(s.h) + '</h3>' : '');
    (s.p || []).forEach(function (p) { out += '<p class="inst-read">' + p + '</p>'; });
    if (s.ul) out += PS.ul(s.ul);
    if (s.table) out += PS.renderSimpleTable(s.table);
  });
  if (t.related) {
    out += '<div class="inst-chips">' + t.related.map(function (r) {
      var o = PS.byId(r.t, r.id);
      return o ? '<a class="inst-chip" href="' + PS.routeFor(r.t, r.id) + '">' + PS.esc(PS.typeLabel(r.t) + ': ' + (o.title || o.term)) + '</a>' : '';
    }).join('') + '</div>';
  }
  return out;
};
PS.renderSimpleTable = function (t) {
  return '<div class="table-wrap"><table><thead><tr>' + t.headers.map(function (h) { return '<th>' + PS.esc(h) + '</th>'; }).join('') +
    '</tr></thead><tbody>' + t.rows.map(function (r) {
      return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
    }).join('') + '</tbody></table></div>';
};