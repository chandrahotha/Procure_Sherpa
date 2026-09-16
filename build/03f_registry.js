/* ==========================================================
   Section C: content registries + relationship model
   (Section 53, 54, 55, 66)
   ========================================================== */
PS.data = { kb: [], sop: [], cl: [], tpl: [], dec: [], kpi: [], gloss: [], scen: [], calc: [], help: [] };
PS.TYPE_LABEL = {
  kb: 'Concept', sop: 'SOP', cl: 'Checklist', tpl: 'Template', dec: 'Decision Guide',
  kpi: 'KPI', gloss: 'Glossary', scen: 'Scenario', calc: 'Calculator', help: 'Help', saved: 'Saved'
};
PS.TYPE_ROUTE = { kb: 'k', sop: 'sop', cl: 'cl', tpl: 'tpl', dec: 'dec', kpi: 'kpi', gloss: 'glossary', scen: 'scen', calc: 'calc', help: 'help' };
PS.typeLabel = function (t) { return PS.TYPE_LABEL[t] || t; };
PS.routeFor = function (type, id) {
  if (type === 'glossary') return '#/glossary';
  return '#/' + (PS.TYPE_ROUTE[type] || type) + '/' + encodeURIComponent(id || '');
};
PS.register = function (type, item) {
  if (!PS.data[type]) PS.data[type] = [];
  if (!item || !item.id) return item;
  var it = item;
  it.type = type;
  it.title = PS.clean(it.title, 160);
  it.cat = it.cat || 'General';
  if (!it.desc) it.desc = it.summary || '';
  if (typeof it.tags === 'string') it.tags = it.tags.split(/[,\s]+/).filter(Boolean);
  it.tags = (it.tags || []).map(function (t) { return String(t).toLowerCase(); }).slice(0, 12);
  it.rel = it.rel || {};
  var dup = PS.data[type].filter(function (x) { return x.id === it.id; })[0];
  if (dup) { PS.dupIds = PS.dupIds || []; PS.dupIds.push(type + ':' + it.id); }
  PS.data[type].push(it);
  return it;
};
PS.byId = function (type, id) {
  if (!id) return null;
  var idn = String(id);
  var list = PS.data[type] || [];
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === idn) return list[i];
    if ((list[i].alias || []).indexOf(idn) >= 0) return list[i];
  }
  return null;
};
PS.titleOf = function (type, id) { var o = PS.byId(type, id); return o ? o.title : id; };
PS.catList = function (type) {
  var seen = {}, out = [];
  (PS.data[type] || []).forEach(function (x) { if (!seen[x.cat]) { seen[x.cat] = 1; out.push(x.cat); } });
  return out;
};
PS.catsOf = function (item) {
  var out = [];
  (item.cats || (item.cat ? [item.cat] : [])).forEach(function (c) { if (out.indexOf(c) < 0) out.push(c); });
  return out;
};
PS.inCat = function (item, cat) {
  return !cat || PS.catsOf(item).indexOf(cat) >= 0;
};
PS.REL_LABEL = {
  concepts: 'Related concepts', sops: 'Related SOPs', checklists: 'Related checklists',
  templates: 'Related templates', calcs: 'Related calculators', decisions: 'Related decision guides',
  kpis: 'Related KPIs', scenarios: 'Related scenarios', glossary: 'Related terms'
};
PS.REL_TYPE = { concepts: 'kb', sops: 'sop', checklists: 'cl', templates: 'tpl', calcs: 'calc', decisions: 'dec', kpis: 'kpi', scenarios: 'scen', glossary: 'gloss' };
PS.relatedItems = function (item, key) {
  var r = (item && item.rel && item.rel[key]) || [];
  var t = PS.REL_TYPE[key];
  var out = [];
  r.forEach(function (id) {
    if (typeof id === 'string' && id.charAt(0) === '!') return; /* forward reference resolved later */
    var o = (t === 'gloss') ? PS.glossaryById(id) : PS.byId(t, id);
    if (o) out.push({ type: t, id: o.id, title: o.title || o.term, desc: o.desc || o.def || '' });
    else out.push({ type: t, id: id, title: id, missing: true });
  });
  return out;
};
/* reverse relations: find everything that links to a given item */
PS.backLinks = function (type, id) {
  var out = [];
  Object.keys(PS.REL_TYPE).forEach(function (key) {
    if (PS.REL_TYPE[key] !== type) return;
    Object.keys(PS.data).forEach(function (dt) {
      (PS.data[dt] || []).forEach(function (it) {
        var list = (it.rel && it.rel[key]) || [];
        if (list.indexOf(id) >= 0 && !(dt === type && it.id === id)) {
          out.push({ type: dt, id: it.id, title: it.title || it.term, desc: it.desc || '' });
        }
      });
    });
  });
  var seen = {};
  return out.filter(function (x) { if (seen[x.type + x.id]) return false; seen[x.type + x.id] = 1; return true; });
};
/* glossary lookup supports term text as well as id */
PS.glossaryById = function (id) {
  var l = PS.data.gloss || [];
  for (var i = 0; i < l.length; i++) { if (l[i].id === id) return l[i]; }
  return null;
};
PS.glossaryFind = function (term) {
  var t = String(term || '').toLowerCase().trim();
  var l = PS.data.gloss || [];
  for (var i = 0; i < l.length; i++) {
    if (l[i].id === t || String(l[i].term || '').toLowerCase() === t) return l[i];
  }
  return null;
};
PS.checklistItemCount = function (id) {
  var cl = PS.byId('cl', id);
  if (!cl) return 0;
  var n = 0;
  (cl.sections || []).forEach(function (s) { n += (s.items || []).length; });
  return n;
};
PS.registrySummary = function () {
  var out = {};
  Object.keys(PS.data).forEach(function (k) { if (PS.data[k].length) out[k] = PS.data[k].length; });
  return out;
};