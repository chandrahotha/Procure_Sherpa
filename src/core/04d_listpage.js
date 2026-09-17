/* ==========================================================
   Section H: library index pages (Section 48)
   ========================================================== */
PS.LIST_META = {
  kb: { title: 'Procurement Knowledge Hub', desc: 'Practical procurement concepts. Each page answers: what is it, why does procurement care, when is it used, what do I actually do, what can go wrong and which tool helps.' },
  sop: { title: 'SOP Library', desc: 'Standard operating procedures with purpose, scope, trigger, step-by-step process, decision points, controls, outputs, records, KPIs and an embedded checklist.' },
  cl: { title: 'Checklist Library', desc: 'Operational checklists that can be used independently or alongside an SOP. Progress is saved locally.' },
  tpl: { title: 'Template Library', desc: 'Practical procurement documents with editable fields, notes, copy, print and local save.' },
  dec: { title: 'Decision Center', desc: 'Interactive decision guides that explain the reasoning behind a recommendation. They do not pretend to know your company policy - thresholds are configurable.' },
  kpi: { title: 'KPI Library', desc: 'Definitions, formulas, inputs, interpretation, limitations and common mistakes for procurement KPIs.' },
  calc: { title: 'Calculator Toolkit', desc: 'Every calculator shows its inputs, validation, formula, assumptions, interpretation and a printable report.' }
};
PS.listFilterState = { q: '', sort: 'cat' };

PS.itemMatches = function (item, q) {
  if (!q) return true;
  var t = PS.clean(q, 80).toLowerCase();
  var hay = [item.title, item.term, item.cat, item.desc, (item.tags || []).join(' '), item.purpose, item.def, item.question]
    .join(' ').toLowerCase();
  return t.split(/\s+/).every(function (tok) { return hay.indexOf(tok) >= 0; });
};
PS.listSortItems = function (items, sort) {
  var arr = items.slice();
  arr.sort(function (a, b) {
    if (sort === 'title') return (a.title || '').localeCompare(b.title || '');
    if (sort === 'new') return 0;
    var c = (a.cat || '').localeCompare(b.cat || '');
    return c !== 0 ? c : (a.title || '').localeCompare(b.title || '');
  });
  return arr;
};
PS.listItemsHtml = function (type, items, groupByCat) {
  if (!items.length) return PS.empty('No items match. Try a different search term or category.');
  if (!groupByCat) {
    return '<div class="grid grid-3">' + items.map(function (x) { return PS.tileFor(type, x); }).join('') + '</div>';
  }
  var byCat = {}, order = [];
  items.forEach(function (x) {
    var c = x.cat || 'General';
    if (!byCat[c]) { byCat[c] = []; order.push(c); }
    byCat[c].push(x);
  });
  return order.map(function (c) {
    return '<h3 class="mb8">' + PS.esc(c) + ' <span class="badge">' + byCat[c].length + '</span></h3>' +
      '<div class="grid grid-3 mb16">' + byCat[c].map(function (x) { return PS.tileFor(type, x); }).join('') + '</div>';
  }).join('');
};
PS.listPage = function (type, cat, params) {
  var meta = PS.LIST_META[type] || { title: PS.typeLabel(type) + ' library', desc: '' };
  var items = (PS.data[type] || []).filter(function (x) { return PS.inCat(x, cat); });
  var state = { q: (params && params.q) || '', sort: (params && params.sort) || 'cat' };
  PS.pageTitle = meta.title + (cat ? ' \u00B7 ' + cat : '');
  PS.currentList = { type: type, cat: cat || '' };
  var cats = PS.catList(type);
  var html = PS.reportHead(meta.title + (cat ? ' - ' + cat : ''), items.length + ' items') +
    '<div class="card">' +
    '<div class="card-head"><h1>' + PS.esc(meta.title) + (cat ? ' \u00B7 ' + PS.esc(cat) : '') + '</h1>' +
    '<div class="spacer"></div><span class="badge">' + items.length + ' items</span></div>' +
    '<p class="card-sub">' + PS.esc(meta.desc) + '</p>' +
    '<div class="searchbox no-print">' +
    '<label class="sr-only" for="listQ">Filter within this library</label>' +
    '<input type="search" id="listQ" placeholder="Filter ' + PS.esc(meta.title.toLowerCase()) + '\u2026" value="' + PS.esc(state.q) + '" data-act="list-filter">' +
    '<label class="sr-only" for="listSort">Sort</label>' +
    '<select id="listSort" data-act="list-sort" style="max-width:190px">' +
    '<option value="cat"' + (state.sort === 'cat' ? ' selected' : '') + '>Sort: category</option>' +
    '<option value="title"' + (state.sort === 'title' ? ' selected' : '') + '>Sort: title</option>' +
    '</select></div>' +
    (type === 'calc' ? '<p class="note">Every calculator opens with Load example, Calculate, Reset, Save, Print, Export and cross-tool handoffs.</p>' : '') +
    '</div>' +
    (cats.length > 1 ? '<div class="filters no-print"><a class="chip' + (!cat ? ' is-on' : '') + '" href="#/list/' + type + '">All</a>' +
      cats.map(function (c) {
        return '<a class="chip' + (c === cat ? ' is-on' : '') + '" href="#/list/' + type + '/' + encodeURIComponent(c) + '">' + PS.esc(c) + '</a>';
      }).join('') + '</div>' : '') +
    '<div id="listWrap">' + PS.listItemsHtml(type, PS.listSortItems(items.filter(function (x) { return PS.itemMatches(x, state.q); }), state.sort), !cat) + '</div>' +
    PS.reportFooter('Library index generated from the embedded Procure Sherpa content set.');
  return html;
};
PS.refreshList = function () {
  var c = PS.currentList;
  if (!c) return;
  var wrap = PS.$('#listWrap');
  if (!wrap) return;
  var items = (PS.data[c.type] || []).filter(function (x) { return PS.inCat(x, c.cat); });
  var q = PS.$('#listQ') ? PS.$('#listQ').value : '';
  var sort = PS.$('#listSort') ? PS.$('#listSort').value : 'cat';
  items = items.filter(function (x) { return PS.itemMatches(x, q); });
  wrap.innerHTML = PS.listItemsHtml(c.type, PS.listSortItems(items, sort), !c.cat);
};