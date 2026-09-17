/* ==========================================================
   Section G: shared render helpers (Section 36, 53, 67, 68)
   ========================================================== */
PS.SVG = function (paths) {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths + '</svg>';
};
PS.TYPE_META = {
  kb:   { icon: PS.SVG('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4a2 2 0 0 0-2-2H6.5A2.5 2.5 0 0 0 4 4.5v15z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>'), acc: 'acc-kb' },
  sop:  { icon: PS.SVG('<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>'), acc: 'acc-sop' },
  cl:   { icon: PS.SVG('<path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>'), acc: 'acc-cl' },
  tpl:  { icon: PS.SVG('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h6"/>'), acc: 'acc-tpl' },
  calc: { icon: PS.SVG('<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8"/><path d="M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01"/>'), acc: 'acc-calc' },
  dec:  { icon: PS.SVG('<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3"/><path d="M1 14h6M9 8h6M17 16h6"/>'), acc: 'acc-dec' },
  kpi:  { icon: PS.SVG('<path d="M3 3v18h18"/><path d="M7 15v3M12 10v8M17 6v12"/>'), acc: 'acc-kpi' },
  scen: { icon: PS.SVG('<circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M9 19h6.5a3.5 3.5 0 0 0 0-7h-7a3.5 3.5 0 0 1 0-7H15"/>'), acc: 'acc-scen' },
  gloss:{ icon: PS.SVG('<path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.4 8.6 8.6 0 0 1-3.8-.9L3 21l2-5.4a8.3 8.3 0 0 1-1-4A8.4 8.4 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5z"/>'), acc: 'acc-gloss' },
  help: { icon: PS.SVG('<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.6-3 4"/><path d="M12 17h.01"/>'), acc: 'acc-help' }
};
PS.badge = function (type, extra) {
  var m = PS.TYPE_META[type] || {};
  return '<span class="badge badge-type ' + (m.acc || '') + '">' + (m.icon ? m.icon + ' ' : '') +
    PS.esc(PS.typeLabel(type)) + (extra ? ' ' + PS.esc(extra) : '') + '</span>';
};
PS.tile = function (href, kicker, title, desc, opts) {
  opts = opts || {};
  var acc = opts.acc || '';
  var top = (opts.icon || opts.meta) ?
    '<div class="tile-top">' +
    (opts.icon ? '<span class="t-ico" aria-hidden="true">' + opts.icon + '</span>' : '') +
    (kicker ? '<span class="t-kicker">' + PS.esc(kicker) + '</span>' : '') +
    (opts.meta ? '<span class="t-meta">' + PS.esc(opts.meta) + '</span>' : '') + '</div>'
    : (kicker ? '<div class="t-kicker" style="margin-bottom:9px">' + PS.esc(kicker) + '</div>' : '');
  return '<a class="tile ' + acc + (opts.cls ? ' ' + opts.cls : '') + '" href="' + PS.esc(href) + '">' +
    top +
    '<div class="t-title">' + PS.esc(title) + '</div>' +
    (desc ? '<p class="t-desc">' + PS.esc(desc) + '</p>' : '') +
    (opts.cta ? '<div class="t-cta">' + PS.esc(opts.cta) + ' <span aria-hidden="true">&rarr;</span></div>' : '') + '</a>';
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