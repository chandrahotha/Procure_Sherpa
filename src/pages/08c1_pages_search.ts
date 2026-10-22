/* ---------- search page (Section 9) ---------- */
PS.QUICK_PROBLEMS = [
  'I need to source a supplier',
  'I received multiple quotations',
  'My supplier increased prices',
  'I need to negotiate',
  'I need to evaluate suppliers',
  'I need to renew a contract',
  'I need to justify a single-source purchase',
  'I need to calculate savings',
  'I need to assess supplier risk',
  'I need to compare total cost',
  'I need to prepare for an audit',
  'A contract is expiring',
  'I need approval for a purchase',
  'Payment terms need to change'
];
PS.route('search', function (arg, params) {
  PS.pageTitle = 'Search';
  var q = params && params.q ? params.q : '';
  var type = params && params.type ? params.type : '';
  var html = PS.reportHead('Search', 'Cross-application search') +
    '<div class="card"><h1>Search Procure Sherpa</h1>' +
    '<p class="card-sub">One search covers SOPs, concepts, calculators, checklists, templates, KPIs, decision guides, scenarios, glossary entries and help pages. Partial words and common terminology are matched, and results identify their content type.</p>' +
    '<div class="searchbox no-print">' +
    '<label class="sr-only" for="searchQ">Search term</label>' +
    '<input type="search" id="searchQ" value="' + PS.esc(q) + '" placeholder="Search for example: price increase, RFQ, TCO, savings, concentration\u2026" maxlength="120">' +
    '<label class="sr-only" for="searchType">Filter by content type</label>' +
    '<select id="searchType" style="max-width:210px">' +
    '<option value="">All content types</option>' +
    Object.keys(PS.TYPE_LABEL).filter(function (t) { return PS.data[t] && PS.data[t].length; }).map(function (t) {
      return '<option value="' + t + '"' + (type === t ? ' selected' : '') + '>' + PS.esc(PS.TYPE_LABEL[t]) + '</option>';
    }).join('') + '</select>' +
    '<button type="button" class="btn btn-primary" data-act="search-run">Search</button>' +
    '</div>' +
    '<div class="chips no-print">' + (PS.suggestTerms || []).map(function (t) {
      return '<button type="button" class="chip" data-act="search-chip" data-q="' + PS.esc(t) + '">' + PS.esc(t) + '</button>';
    }).join('') + '</div>' +
    '<p class="cmdk-hint">Shortcuts: <kbd>Ctrl</kbd>+<kbd>K</kbd> to search, <kbd>/</kbd> to focus, <kbd>Esc</kbd> to close the sidebar.</p>' +
    '</div><div id="searchResults"></div>';
  PS.pageInit = function () {
    var inp = PS.$('#searchQ');
    if (inp) {
      inp.addEventListener('input', PS.debounce(function () { PS.renderSearch(); }, 260));
      if (!q) inp.focus();
    }
    var sel = PS.$('#searchType');
    if (sel) sel.addEventListener('change', function () { PS.renderSearch(); });
    PS.renderSearch();
  };
  return html;
});
PS.renderSearch = function () {
  var box = PS.$('#searchResults');
  if (!box) return;
  var q = PS.$('#searchQ') ? PS.$('#searchQ').value : '';
  var type = PS.$('#searchType') ? PS.$('#searchType').value : '';
  if (!PS.clean(q)) {
    box.innerHTML = '<div class="card"><h2>Search tips</h2>' + PS.ul([
      'Search by the problem in your own words: "supplier increased price by 12%", "compare three quotes", "contract expiring".',
      'Search by document: RFQ, RFP, award recommendation, negotiation plan, single source justification.',
      'Search by measure: TCO, landed cost, HHI, PPV, OTIF, spend under management.',
      'Search by process: intake, prequalification, bid normalization, change control, closeout.'
    ]) + '</div>';
    return;
  }
  var res = PS.search(q, { type: type || undefined, limit: 80 });
  if (!res.results.length) {
    box.innerHTML = '<div class="card"><h2>No matches for &ldquo;' + PS.esc(q) + '&rdquo;</h2>' +
      '<p>Try a shorter phrase, a single keyword, or a document name. If you were looking for guidance on a situation, use <a href="#/what?q=' + encodeURIComponent(q) + '">What should I do?</a></p>' +
      PS.ul(['Check the spelling of specialised terms such as Incoterms, HHI or RFI.',
        'Search the glossary for terminology used in your organization.',
        'Open the nearest library from the sidebar and browse its categories.']) + '</div>';
    return;
  }
  var groups = {}, order = [];
  res.results.forEach(function (r) {
    if (!groups[r.type]) { groups[r.type] = []; order.push(r.type); }
    groups[r.type].push(r);
  });
  var html = '<div class="card"><div class="card-head"><h2>' + res.total + ' result' + (res.total === 1 ? '' : 's') + ' for &ldquo;' + PS.esc(res.query) + '&rdquo;</h2>' +
    '<div class="spacer"></div>' + (type ? '<span class="badge">filtered: ' + PS.esc(PS.typeLabel(type)) + '</span>' : '') + '</div>' +
    '<p class="card-sub">Results are ranked by title match, category and keyword relevance. Saved work is searched separately in the Workspace area.</p>';
  order.forEach(function (t) {
    html += '<h3>' + PS.esc(PS.TYPE_LABEL[t] || t) + ' <span class="badge">' + groups[t].length + '</span></h3>' +
      '<ul class="res-list">' + groups[t].slice(0, 20).map(function (r) {
        return '<li><span class="res-type">' + PS.badge(r.type) + '</span>' +
          '<span><a class="res-title" href="' + r.route + '">' + PS.highlight(r.title, res.query) + '</a>' +
          '<div class="res-desc">' + (r.cat ? PS.esc(r.cat) + ' &middot; ' : '') + PS.highlight(r.desc || '', res.query) + '</div></span></li>';
      }).join('') + '</ul>';
  });
  html += '</div>';
  box.innerHTML = html;
  PS.audit('search-run', res.query + ' (' + res.total + ' results)');
};