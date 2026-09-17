/* ==========================================================
   Section D: universal search (Section 9, 66)
   ========================================================== */
PS._index = null;
function flat(v, out) {
  if (v === null || v === undefined) return out;
  if (typeof v === 'string' || typeof v === 'number') { out.push(String(v)); return out; }
  if (Array.isArray(v)) { v.forEach(function (x) { flat(x, out); }); return out; }
  if (typeof v === 'object') { Object.keys(v).forEach(function (k) { flat(v[k], out); }); return out; }
  return out;
}
PS.buildIndex = function () {
  if (PS._index) return PS._index;
  var idx = [];
  function add(type, item, extra) {
    if (!item) return;
    var parts = flat(extra || [], []);
    var title = item.title || item.term || '';
    var desc = item.desc || item.summary || item.def || item.purpose || item.question || '';
    idx.push({
      type: type, id: item.id, title: title, cat: item.cat || item.group || '',
      tags: (item.tags || []).join(' '),
      route: PS.routeFor(type, item.id),
      desc: PS.clean(desc, 220),
      text: (title + ' ' + (item.cat || '') + ' ' + (item.tags || []).join(' ') + ' ' + parts.join(' ')).toLowerCase()
    });
  }
  (PS.data.kb || []).forEach(function (x) {
    add('kb', x, [x.def, x.why, x.when, x.how, x.ex, x.risks, x.mistakes]);
  });
  (PS.data.sop || []).forEach(function (x) {
    add('sop', x, [x.purpose, x.scope, x.trigger, x.inputs, (x.steps || []).map(function (s) { return s.s + ' ' + s.d; }), x.outputs, x.records, x.control]);
  });
  (PS.data.cl || []).forEach(function (x) {
    add('cl', x, [(x.sections || []).map(function (s) { return s.g + ' ' + (s.items || []).join(' '); })]);
  });
  (PS.data.tpl || []).forEach(function (x) {
    add('tpl', x, [x.purpose, (x.fields || []).map(function (f) { return f.label + ' ' + (f.hint || ''); }), x.prompts]);
  });
  (PS.data.dec || []).forEach(function (x) {
    add('dec', x, [x.question, (x.factors || []).map(function (f) { return f.q + ' ' + (f.hint || ''); }), x.explain]);
  });
  (PS.data.kpi || []).forEach(function (x) {
    add('kpi', x, [x.def, x.formula, x.inputs, x.interp, x.limits, x.mistakes]);
  });
  (PS.data.gloss || []).forEach(function (x) {
    add('gloss', x, [x.def, x.full, x.term]);
  });
  (PS.data.scen || []).forEach(function (x) {
    add('scen', x, [x.problem, x.summary, (x.steps || []).map(function (s) { return s.label + ' ' + (s.note || ''); })]);
  });
  (PS.data.calc || []).forEach(function (x) {
    add('calc', x, [x.purpose, x.context, (x.fields || []).map(function (f) { return f.label + ' ' + (f.tip || ''); })]);
  });
  (PS.data.help || []).forEach(function (x) { add('help', x, [x.body]); });
  PS._index = idx;
  return idx;
};
PS.invalidateIndex = function () { PS._index = null; };
PS.search = function (q, opts) {
  opts = opts || {};
  var idx = PS.buildIndex();
  var raw = PS.clean(q, 120).toLowerCase();
  if (!raw) return { query: '', results: [], total: 0 };
  var tokens = raw.split(/[\s,;]+/).filter(function (t) { return t.length > 0; });
  var out = [];
  idx.forEach(function (rec) {
    if (opts.type && rec.type !== opts.type) return;
    var score = 0, title = rec.title.toLowerCase(), allHit = true;
    tokens.forEach(function (t) {
      var hit = 0;
      if (title === t) hit = 120;
      else if (title.indexOf(t) === 0) hit = 85;
      else if (title.indexOf(t) > 0) hit = 65;
      else if (rec.tags.indexOf(t) >= 0) hit = 48;
      else if (rec.cat.toLowerCase().indexOf(t) >= 0) hit = 34;
      else if (rec.text.indexOf(t) >= 0) hit = 22;
      else if (t.length > 4 && rec.text.indexOf(t.slice(0, Math.max(4, t.length - 2))) >= 0) hit = 12;
      if (!hit) allHit = false;
      score += hit;
    });
    if (!allHit) return;
    if (score > 0) out.push({ rec: rec, score: score });
  });
  out.sort(function (a, b) {
    if (b.score !== a.score) return b.score - a.score;
    return a.rec.title.localeCompare(b.rec.title);
  });
  var results = out.slice(0, opts.limit || 60).map(function (o) { return o.rec; });
  return { query: PS.clean(q, 120), results: results, total: out.length };
};
PS.highlight = function (text, q) {
  var safe = PS.esc(text);
  var tokens = PS.clean(q, 120).toLowerCase().split(/\s+/).filter(function (t) { return t.length > 1; });
  tokens.forEach(function (t) {
    try {
      var re = new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
      safe = safe.replace(re, '<mark>$1</mark>');
    } catch (e) { }
  });
  return safe;
};
PS.suggestTerms = ['price increase', 'RFQ', 'RFP', 'TCO', 'payment terms', 'supplier risk',
  'savings', 'renewal', 'single source', 'negotiation', 'landed cost', 'HHI', 'exception', 'audit', 'KPI'];