/* ==========================================================
   Link completion (Section 54)

   Forty-seven content items had no inbound reference anywhere in the
   library, which meant they were reachable only by browsing a list and
   never from the thing a reader would actually be reading: a supplier
   asking about should-cost, a buyer preparing an RFQ, a category
   manager building a strategy.

   The links are declared here rather than edited into each content
   fragment, for two reasons. It keeps the intent visible in one place
   instead of scattered across twenty files, and it lets the static
   checker in tools/check_rels.mjs read the same declaration, so the
   two cannot drift apart the way the old id maps did.

   Every target is verified against the registry at runtime. A target
   that does not exist is dropped and reported, never written.
   ========================================================== */
PS.LINK_COMPLETION = {
  'sop-procurement-lifecycle': { concepts: ['c-purchasing', 'c-strategic-procurement', 'c-source-to-contract', 'c-procure-to-pay', 'category-management', 'c-supplier-management', 'procurement-value'], glossary: ['gloss-source-to-contract', 'gloss-procure-to-pay', 'gloss-category-management'] },
  'sop-procurement-intake': { concepts: ['c-purchasing', 'c-direct-procurement', 'c-capex', 'delegation-of-authority', 'segregation-of-duties'], calcs: ['calc-gst-tax', 'calc-kpi-calculator'], glossary: ['gloss-doa', 'gloss-delegation-of-authority', 'gloss-blanket-po', 'gloss-direct-spend', 'gloss-capex'] },
  'sop-rfq': { concepts: ['c-strategic-sourcing', 'supplier-market-analysis', 'framework-agreement'], checklists: ['cl-award-recommendation'], templates: ['tpl-rfi', 'tpl-bid-waiver'], glossary: ['gloss-bid', 'gloss-rfi', 'gloss-rft', 'gloss-strategic-sourcing'] },
  'sop-rfp': { concepts: ['c-strategic-sourcing'], templates: ['tpl-rfi'], glossary: ['gloss-rfi', 'gloss-rft', 'gloss-bid'] },
  'sop-supplier-evaluation': { concepts: ['supplier-market-analysis'], calcs: ['calc-gst-tax', 'calc-kpi-calculator'], glossary: ['gloss-incoterms', 'gloss-landed-cost', 'gloss-tco'] },
  'sop-contract-review': { concepts: ['change-control'], templates: ['tpl-supplier-onboarding'] },
  'sop-savings-calculation': { concepts: ['c-procurement-savings'], glossary: ['gloss-cost-avoidance', 'gloss-spend-under-management'] },
  'sop-supplier-price-increase-review': { concepts: ['procurement-value'] },
  'sop-contract-renewal': { concepts: ['change-control'] },
  'sop-supplier-performance-management': { concepts: ['c-supplier-management'] },
  'sop-procurement-audit': { concepts: ['c-maverick-spend'], glossary: ['gloss-segregation-of-duties'] },
  'cl-sourcing-strategy': { concepts: ['c-direct-procurement', 'framework-agreement'], glossary: ['gloss-direct-spend'] },
  'cl-supplier-identification': { concepts: ['supplier-market-analysis'] },
  'cl-supplier-evaluation': { concepts: ['procurement-value'] },
  'cl-exception-approval': { concepts: ['c-maverick-spend'], templates: ['tpl-bid-waiver'], glossary: ['gloss-maverick-spend', 'gloss-single-source'] },
  'cl-single-source-justification': { templates: ['tpl-sole-source'], glossary: ['gloss-single-source', 'gloss-sole-source'] },
  'cl-supplier-onboarding': { templates: ['tpl-supplier-onboarding'] },
  'cl-rfq-preparation': { templates: ['tpl-rfi'] },
  'cl-contract-renewal': { concepts: ['change-control'] },
  'tpl-award-recommendation': { checklists: ['cl-award-recommendation'] },
  'tpl-bid-comparison': { glossary: ['gloss-bid'] },
  'tpl-business-case': { concepts: ['c-capex'], glossary: ['gloss-capex'] },
  'tpl-contract-change-request': { concepts: ['change-control'] },
  'tpl-single-source': { glossary: ['gloss-sole-source'] },
  'tpl-supplier-onboarding': { concepts: ['c-indirect-procurement'] },
  'tpl-exception-request': { templates: ['tpl-bid-waiver'] },
  'calc-tco': { concepts: ['c-capex'], glossary: ['gloss-tco', 'gloss-ppv', 'gloss-capex'] },
  'calc-landed-cost': { concepts: ['c-indirect-procurement'], glossary: ['gloss-landed-cost', 'gloss-incoterms'] },
  'calc-should-cost': { glossary: ['gloss-should-cost'] },
  'calc-budget-vs-actual': { concepts: ['c-opex'], glossary: ['gloss-opex'] },
  'calc-savings-analysis': { concepts: ['c-procurement-savings'], glossary: ['gloss-cost-avoidance'] },
  'calc-multi-year-contract-cost': { concepts: ['c-opex'] },
  'calc-po-value-check': { concepts: ['c-purchasing'], glossary: ['gloss-doa', 'gloss-blanket-po'] },
  'calc-moq': { glossary: ['gloss-blanket-po'] },
  'calc-supplier-scorecard': { calcs: ['calc-kpi-calculator'], glossary: ['gloss-kpi'] },
  'calc-compare-quotes': { calcs: ['calc-gst-tax'], glossary: ['gloss-bid'] },
  'spend-analysis': { concepts: ['c-direct-procurement', 'c-indirect-procurement'], glossary: ['gloss-direct-spend', 'gloss-spend-under-management'] },
  'category-management': { glossary: ['gloss-category-management'] },
  'kpi-sum': { glossary: ['gloss-spend-under-management'], calcs: ['calc-kpi-calculator'] },
  'kpi-maverick-spend': { concepts: ['c-maverick-spend'], glossary: ['gloss-maverick-spend'] },
  'kpi-otif': { calcs: ['calc-kpi-calculator'] },
  'kpi-ppv': { glossary: ['gloss-ppv'] },
  'kpi-savings': { concepts: ['c-procurement-savings'] }
};

/* Apply the declared links to the registered content. A target that is
   not registered is reported and skipped rather than written, so a
   typo here cannot create a dead chip in the product. */
PS.completeLinks = function () {
  var added = 0, skipped = [];
  var typeOf = {};
  Object.keys(PS.data).forEach(function (t) { typeOf[t] = t; });
  var relToType = PS.REL_TYPE;
  var canon = PS.relKey;
  Object.keys(PS.LINK_COMPLETION || {}).forEach(function (srcId) {
    var src = null;
    Object.keys(PS.data).forEach(function (t) {
      if (!src) src = (PS.data[t] || []).filter(function (x) { return x.id === srcId; })[0] || null;
    });
    if (!src) { skipped.push(srcId + ' (source not registered)'); return; }
    var rel = PS.LINK_COMPLETION[srcId];
    Object.keys(rel).forEach(function (k) {
      var tk = relToType[canon(k)];
      if (!tk) { skipped.push(srcId + ' -> unknown rel key ' + k); return; }
      var list = rel[k];
      var valid = list.filter(function (id) {
        var found = (PS.data[tk] || []).filter(function (x) { return x.id === id; })[0];
        if (!found) { skipped.push(srcId + ' -> ' + tk + ':' + id + ' (target not registered)'); return false; }
        return true;
      });
      if (!valid.length) return;
      src.rel = src.rel || {};
      src.rel[k] = src.rel[k] || [];
      valid.forEach(function (id) {
        if (src.rel[k].indexOf(id) < 0) { src.rel[k].push(id); added++; }
      });
    });
  });
  PS.LINK_COMPLETION_REPORT = { added: added, skipped: skipped };
  if (skipped.length && window.console && console.warn) {
    console.warn('Link completion skipped ' + skipped.length + ' unresolved target(s): ' + skipped.slice(0, 8).join('; '));
  }
  return added;
};
