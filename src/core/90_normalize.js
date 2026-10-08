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
  PS.validateCalculators();
};

PS.validateCalculators = function () {
  var calcs = PS.data.calc || [];
  var problems = [];
  calcs.forEach(function (calc) {
    if (!calc.id) problems.push('Calculator missing id');
    if (!calc.title) problems.push('Calculator ' + calc.id + ' missing title');
    if (!calc.run || typeof calc.run !== 'function') problems.push('Calculator ' + calc.id + ' missing run function');
    if (!calc.fields || !calc.fields.length) problems.push('Calculator ' + calc.id + ' has no fields');
    if (calc.example) {
      var errs = PS.validateCalc(calc, calc.example);
      if (errs && Object.keys(errs).length) {
        problems.push('Calculator ' + calc.id + ' example fails validation: ' + Object.keys(errs).join(', '));
      }
    }
  });
  if (problems.length && window.console && console.warn) {
    console.warn('Calculator validation: ' + problems.length + ' issue(s) found');
    problems.forEach(function (p) { console.warn('  - ' + p); });
  }
  return problems;
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
/* Which field actually carries the human-readable description, per type.
   Each content type is expanded by its own helper in 09b_expand.js and
   they do not agree on a name: a decision guide's description lives in
   `intro`, a scenario's in `problem`, a KPI's in `def`. An earlier version
   of this check only looked at desc/def/purpose, so it reported all 20
   decision guides and all 6 scenarios as "missing description" when every
   one of them had a perfectly good description under a name it did not
   know about - 26 false positives that made the whole check ignorable.
   Any new content type must be added here, or it will not be checked. */
PS.DESC_FIELDS = {
  kb: ['def', 'full'],
  sop: ['desc', 'purpose'],
  cl: ['desc'],
  tpl: ['purpose'],
  dec: ['intro', 'question'],
  kpi: ['def'],
  gloss: ['def'],
  scen: ['problem', 'summary'],
  calc: ['desc', 'purpose']
};
/* content integrity check used by the built-in quality report (Section 77) */
PS.contentQA = function () {
  var problems = [];
  /* PS.register records every id collision in PS.dupIds. That list was
     collected and then never read by anything, so two items sharing an id
     was invisible: both get pushed into the registry, PS.byId always
     returns the first, and the second becomes unreachable content that
     still passes every test. Surfacing it here makes it a build failure. */
  (PS.dupIds || []).forEach(function (d) {
    problems.push('Duplicate id (second copy is unreachable): ' + d);
  });
  Object.keys(PS.data).forEach(function (type) {
    var fields = PS.DESC_FIELDS[type];
    (PS.data[type] || []).forEach(function (item) {
      if (!item.title && !item.term) problems.push('Missing title: ' + type + ' ' + item.id);
      if (!fields) {
        problems.push('Unchecked content type (add it to PS.DESC_FIELDS): ' + type);
      } else {
        var described = fields.some(function (f) {
          return typeof item[f] === 'string' && item[f].trim().length > 0;
        });
        if (!described) problems.push('Missing description (' + fields.join('/') + '): ' + type + ' ' + item.id);
      }
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
/* IIFE, not bare statements: every fragment in this build shares one
   global scope, so a top-level `var qa` here would be an application-wide
   global named `qa`. */
(function () {
  if (!window.console || !console.log) return;
  console.log('Procure Sherpa v' + PS.VERSION + ' content loaded - ' + PS.CONTENT_STATUS.text);
  var qa = PS.contentQA();
  if (qa.length) console.warn('Content QA: ' + qa.length + ' issues', qa.slice(0, 12));
  if (PS.PRUNED_REFS) console.info('Link hygiene: ' + PS.PRUNED_REFS + ' forward reference(s) hidden from view until that content ships.');
}());