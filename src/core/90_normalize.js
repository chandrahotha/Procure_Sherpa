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
PS.normRelId = function (t, id) {
  if (typeof id !== 'string' || !id) return id;
  if (t === 'calc') {
    var CALC_LEGACY = /^(calc-)?(savings-analysis|budget-vs-actual|supplier-scorecard|supplier-concentration|make-vs-buy|moq|multi-year-contract|gst|currency|kpi-calculator)$/i;
    var CALC_MAP = {
      'savings-analysis': 'calc-savings-analysis', 'budget-vs-actual': 'calc-budget-vs-actual',
      'supplier-scorecard': 'calc-supplier-scorecard', 'supplier-concentration': 'calc-supplier-concentration',
      'make-vs-buy': 'calc-make-vs-buy', 'moq': 'calc-moq', 'multi-year-contract': 'calc-multi-year-contract-cost',
      'gst': 'calc-gst-tax', 'currency': 'calc-fx-currency', 'kpi-calculator': 'calc-kpi-calculator'
    };
    var m = CALC_LEGACY.exec(id);
    if (m) return CALC_MAP[m[2].toLowerCase()] || id;
  }
  var SOP_MAP = {
    'sop-quote-comparison': 'sop-rfq', 'sop-bid-normalization': 'sop-rfq',
    'sop-commercial-evaluation': 'sop-supplier-evaluation', 'sop-award-recommendation': 'sop-rfp',
    'sop-negotiation-savings': 'sop-savings-calculation', 'sop-savings-validation': 'sop-savings-calculation',
    'sop-price-escalation-review': 'sop-supplier-price-increase-review', 'sop-purchase-requisition': 'sop-procurement-intake',
    'sop-purchase-order': 'sop-procurement-intake', 'sop-single-source': 'sop-procurement-intake',
    'sop-procurement-exception': 'sop-emergency-procurement', 'sop-requirement-definition': 'sop-procurement-intake',
    'sop-sourcing-strategy': 'sop-rfq', 'sop-supplier-identification': 'sop-supplier-evaluation',
    'sop-rfi': 'sop-rfp', 'sop-competitive-bid': 'sop-rfq', 'sop-contract-award': 'sop-contract-review',
    'sop-supplier-prequalification': 'sop-supplier-evaluation', 'sop-supplier-due-diligence': 'sop-supplier-evaluation',
    'sop-supplier-segmentation': 'sop-supplier-performance-management', 'sop-supplier-corrective-action': 'sop-supplier-performance-management',
    'sop-negotiation-execution': 'sop-negotiation-preparation', 'sop-contract-performance-review': 'sop-supplier-performance-management',
    'sop-landed-cost': 'sop-supplier-price-increase-review', 'sop-contract-change-control': 'sop-contract-review',
    'sop-compliance-review': 'sop-procurement-audit', 'sop-documentation': 'sop-procurement-audit',
    'sop-supplier-exit': 'sop-contract-renewal', 'sop-supplier-qualification': 'sop-supplier-evaluation'
  };
  if (t === 'sop') return SOP_MAP[id] || id;
  if (t === 'dec') return (id.indexOf('dec-') === 0) ? id.slice(4) : id;
  if (t === 'kpi') {
    if (id === 'kpi-payment-terms' || id === 'kpi-working-capital') return 'kpi-working-capital-impact';
    if (id === 'kpi-supplier-performance') return 'kpi-otif';
  }
  if (t === 'kb') {
    if (id === 'kb-cost-drivers') return 'cost-breakdown';
    if (id === 'kb-price-escalation') return 'should-cost';
    if (id === 'kb-indexation') return 'currency-fx';
    if (id === 'kb-delegation-of-authority' || id === 'kb-approval-matrix') return 'delegation-of-authority';
    if (id.indexOf('kb-') === 0) return id.slice(3);
  }
  if (t === 'tpl') {
    if (id === 'tpl-price-increase-assessment') return 'tpl-contract-change-request';
    if (id === 'tpl-single-source-justification') return 'tpl-single-source';
    if (id === 'tpl-statement-of-work') return 'tpl-contract-review-checklist';
  }
  if (t === 'cl') {
    if (id === 'cl-negotiation-preparation') return 'cl-negotiation';
    if (id === 'cl-price-increase-review') return 'cl-contract-renewal';
    if (id === 'cl-supplier-qualification') return 'cl-supplier-evaluation';
  }
  return id;
};

PS.pruneRels = function () {
  var dropped = 0, droppedKeys = 0;
  Object.keys(PS.data).forEach(function (type) {
    (PS.data[type] || []).forEach(function (item) {
      var rel = item.rel || {}, clean = {};
      Object.keys(rel).forEach(function (key) {
        var ak = PS.relKey(key);
        if (!PS.REL_TYPE[ak]) { droppedKeys++; return; }
        var ids = (Array.isArray(rel[key]) ? rel[key] : []).map(function (id) {
          var t = PS.REL_TYPE[ak];
          return PS.normRelId(t, id);
        }).filter(function (id) {
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