/* ==========================================================
   Section G: shared render helpers (Section 36, 53, 67, 68)
   ========================================================== */
PS.TYPE_META = {
  kb:   { icon: '\uD83D\uDCD6', acc: 'acc-kb' },
  sop:  { icon: '\uD83D\uDCCB', acc: 'acc-sop' },
  cl:   { icon: '\u2705',       acc: 'acc-cl' },
  tpl:  { icon: '\uD83D\uDCC4', acc: 'acc-tpl' },
  calc: { icon: '\uD83E\uDDEE', acc: 'acc-calc' },
  dec:  { icon: '\u2696\uFE0F', acc: 'acc-dec' },
  kpi:  { icon: '\uD83D\uDCC8', acc: 'acc-kpi' },
  scen: { icon: '\uD83E\uDDED', acc: 'acc-scen' },
  gloss:{ icon: '\uD83D\uDD24', acc: 'acc-gloss' },
  help: { icon: '\u2753',       acc: 'acc-help' }
};
PS.badge = function (type, extra) {
  var m = PS.TYPE_META[type] || {};
  return '<span class="badge badge-type ' + (m.acc || '') + '">' + (m.icon ? m.icon + ' ' : '') +
    PS.esc(PS.typeLabel(type)) + (extra ? ' ' + PS.esc(extra) : '') + '</span>';
};
PS.tile = function (href, kicker, title, desc, opts) {
  opts = opts || {};
  var acc = opts.acc || '';
  return '<a class="tile ' + acc + '" href="' + PS.esc(href) + '">' +
    (opts.meta ? '<span class="t-meta">' + PS.esc(opts.meta) + '</span>' : '') +
    (opts.icon ? '<div class="t-icon">' + opts.icon + '</div>' : '') +
    (kicker ? '<div class="t-kicker">' + PS.esc(kicker) + '</div>' : '') +
    '<div class="t-title">' + PS.esc(title) + '</div>' +
    (desc ? '<p class="t-desc">' + PS.esc(desc) + '</p>' : '') +
    (opts.cta ? '<div class="t-cta">' + PS.esc(opts.cta) + ' &rarr;</div>' : '') + '</a>';
};
PS.tileFor = function (type, item) {
  var m = PS.TYPE_META[type] || {};
  return PS.tile(PS.routeFor(type, item.id), PS.typeLabel(type) + (item.cat ? ' \u00B7 ' + item.cat : ''),
    item.title || item.term, item.desc || item.summary || '', { icon: m.icon, acc: m.acc });
};
PS.empty = function (msg, action) {
  return '<div class="empty">' + PS.esc(msg) + (action ? ' ' + action : '') + '</div>';
};
PS.section = function (title, body, opts) {
  opts = opts || {};
  if (!body) return '';
  if (opts.level) return '<h3>' + PS.esc(title) + '</h3>' + body;
  return '<details class="acc"' + (opts.open ? ' open' : '') + '><summary>' + PS.esc(title) + '</summary>' +
    '<div class="acc-body">' + body + '</div></details>';
};
PS.ul = function (items, cls) {
  if (!items) return '';
  if (typeof items === 'string') return '<p>' + PS.esc(items) + '</p>';
  var arr = (Array.isArray(items) ? items : [items]).filter(Boolean);
  if (!arr.length) return '';
  return '<ul' + (cls ? ' class="' + cls + '"' : '') + '>' + arr.map(function (x) { return '<li>' + PS.esc(x) + '</li>'; }).join('') + '</ul>';
};
PS.ol = function (items) { return PS.ul(items).replace('<ul', '<ol').replace('</ul>', '</ol>'); };
PS.kv = function (pairs) {
  var rows = (pairs || []).filter(function (p) { return p && p[1] !== undefined && p[1] !== null && p[1] !== ''; });
  if (!rows.length) return '';
  return '<dl class="kv">' + rows.map(function (p) {
    return '<dt>' + PS.esc(p[0]) + '</dt><dd>' + (p[2] ? p[1] : PS.esc(p[1])) + '</dd>';
  }).join('') + '</dl>';
};
PS.alert = function (kind, title, msg) {
  return '<div class="alert alert-' + kind + '"><strong>' + PS.esc(title) + '</strong>' + (msg || '') + '</div>';
};
PS.disclaimer = function (kind) { return PS.withDisclaimer(kind); };
PS.reportHead = function (title, subtitle) {
  var p = PS.prefs();
  return '<div class="report-head">' +
    '<h1>' + PS.esc(PS.APP) + ' \u2014 ' + PS.esc(title) + '</h1>' +
    '<div class="rh-meta">' + (p.orgName ? PS.esc(p.orgName) + ' \u00B7 ' : '') +
    PS.esc(subtitle || '') + ' \u00B7 Generated ' + PS.esc(PS.dateStr()) + ' ' + PS.esc(PS.timeStr()) + '</div></div>';
};
PS.reportFooter = function (note) {
  var p = PS.prefs();
  return '<div class="print-only"><p class="note">' + PS.esc(p.reportFooter || '') + '</p>' +
    '<p class="note">Prepared with Procure Sherpa v' + PS.esc(PS.VERSION) + ' (offline toolkit). ' +
    PS.esc(note || 'Decision-support output \u2014 validate assumptions before committing funds.') + '</p></div>';
};
PS.tagsRow = function (item) {
  var tags = (item && item.tags) || [];
  if (!tags.length) return '';
  return '<div class="chips">' + tags.map(function (t) {
    return '<a class="chip" href="#/search?q=' + encodeURIComponent(t) + '">#' + PS.esc(t) + '</a>';
  }).join('') + '</div>';
};
/* Related content card built from explicit relations plus reverse links (Section 53) */
PS.relatedCard = function (type, item, opts) {
  opts = opts || {};
  var groups = [];
  Object.keys(PS.REL_LABEL).forEach(function (key) {
    var items = PS.relatedItems(item, key);
    if (!items.length) return;
    groups.push('<div class="mb8"><div class="t-kicker badge">' + PS.esc(PS.REL_LABEL[key]) + '</div>' +
      '<div class="chips" style="margin-top:6px">' + items.map(function (x) {
        if (x.type === 'gloss') return '<a class="chip" href="#/glossary?term=' + encodeURIComponent(x.id) + '">' + PS.esc(x.title) + '</a>';
        return '<a class="chip" href="' + PS.routeFor(x.type, x.id) + '">' + PS.esc(x.title) + '</a>';
      }).join('') + '</div></div>');
  });
  var back = PS.backLinks(type, item.id);
  if (back.length && !opts.hideBack) {
    groups.push('<div class="mb8"><div class="t-kicker badge">Also referenced by</div>' +
      '<div class="chips" style="margin-top:6px">' + back.slice(0, 24).map(function (x) {
        return '<a class="chip" href="' + PS.routeFor(x.type, x.id) + '">' + PS.esc(x.title) + '</a>';
      }).join('') + '</div></div>');
  }
  if (!groups.length) return '';
  return '<div class="card"><div class="card-head"><h2>Related content</h2><div class="spacer"></div>' +
    '<span class="badge">knowledge graph</span></div>' + groups.join('') + '</div>';
};
PS.termLink = function (term, label) {
  var g = PS.glossaryFind(term);
  var t = PS.esc(label || term);
  return g ? '<a href="#/glossary?term=' + encodeURIComponent(g.id) + '" title="' + PS.esc(g.def) + '">' + t + '</a>' : t;
};
PS.actionsBar = function (btns) {
  return '<div class="btn-row no-print mb16">' + btns.join('') + '</div>';
};
PS.iconFor = function (type) {
  return ({ kb: '\u25CB', sop: '\u2699', cl: '\u2611', tpl: '\u2637', dec: '\u2696', kpi: '\u25A6', gloss: 'A\u2013Z', scen: '\u27A4', calc: '\u2211', help: '?' }[type] || '\u2022');
};