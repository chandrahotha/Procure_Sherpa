/* ---------- normalise all embedded content into the registries (Section 54, 77) ---------- */
PS.normalizeContent = function () {
  var map = {
    kb: PS_KB, sop: PS_SOPS, cl: PS_CL, tpl: PS_TPL,
    dec: PS_DEC, kpi: PS_KPI, gloss: PS_GLOSS, scen: PS_SCEN, calc: PS_CALC
  };
  Object.keys(map).forEach(function (type) {
    (map[type] || []).forEach(function (item) { PS.register(type, item); });
  });
  PS.HELP = PS_HELP;
};
/* ---------- hardening: prune dead relationship links at boot ----------
   Content authors may reference items planned for future releases.
   Rather than rendering dead chips, drop unresolvable refs (keeping
   '!'-prefixed forward references) and surface one console warning. */
PS.pruneRels = function () {
  var dropped = 0, droppedKeys = 0;
  Object.keys(PS.data).forEach(function (type) {
    (PS.data[type] || []).forEach(function (item) {
      var rel = item.rel || {}, clean = {};
      Object.keys(rel).forEach(function (key) {
        var ak = PS.relKey(key);
        if (!PS.REL_TYPE[ak]) { droppedKeys++; return; }
        var ids = (Array.isArray(rel[key]) ? rel[key] : []).filter(function (id) {
          if (typeof id !== 'string' || !id) return false;
          if (id.charAt(0) === '!') return true;
          var t = PS.REL_TYPE[ak];
          var found = (t === 'gloss') ? PS.glossaryById(id) : PS.byId(t, id);
          if (!found) { dropped++; return false; }
          return true;
        });
        if (ids.length) {
          var prev = clean[ak] || [];
          clean[ak] = prev.concat(ids.filter(function (x) { return prev.indexOf(x) < 0; }));
        }
      });
      item.rel = clean;
    });
  });
  PS.PRUNED_REFS = dropped;
  PS.DROPPED_REL_KEYS = droppedKeys;
  return dropped + droppedKeys;
};
PS.contentReport = function () {
  var lines = [], total = 0;
  Object.keys(PS.data).forEach(function (t) {
    if (!PS.data[t] || !PS.data[t].length) return;
    lines.push(PS.typeLabel(t) + ': ' + PS.data[t].length);
    total += PS.data[t].length;
  });
  return { text: lines.join(' \u00B7 '), total: total };
};
/* content integrity check used by the built-in quality report (Section 77) */
PS.contentQA = function () {
  var problems = [];
  Object.keys(PS.data).forEach(function (type) {
    (PS.data[type] || []).forEach(function (item) {
      if (!item.title && !item.term) problems.push('Missing title: ' + type + ' ' + item.id);
      if (!item.desc && !item.def && !item.purpose) problems.push('Missing description: ' + type + ' ' + item.id);
      Object.keys(item.rel || {}).forEach(function (key) {
        var target = PS.REL_TYPE[key];
        (item.rel[key] || []).forEach(function (id) {
          if (typeof id === 'string' && id.charAt(0) === '!') return;
          var found = (target === 'gloss') ? PS.glossaryById(id) : PS.byId(target, id);
          if (!found) problems.push('Broken relation: ' + type + ' ' + item.id + ' -> ' + key + ' ' + id);
        });
      });
    });
  });
  return problems;
};
PS.normalizeContent();
PS.pruneRels();
PS.CONTENT_STATUS = PS.contentReport();
if (window.console && console.log) {
  console.log('Procure Sherpa v' + PS.VERSION + ' content loaded - ' + PS.CONTENT_STATUS.text);
  var qa = PS.contentQA();
  if (qa.length) console.warn('Content QA: ' + qa.length + ' issues', qa.slice(0, 12));
  if (PS.PRUNED_REFS) console.info('Link hygiene: ' + PS.PRUNED_REFS + ' forward reference(s) hidden from view until that content ships.');
}