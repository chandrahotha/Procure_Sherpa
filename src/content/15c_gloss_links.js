/* ==========================================================
   Procure Sherpa v2.7 - Glossary link completion
   The 35 glossary records converted from v1.1.0 all ship `rel: {}`, so
   `glossLinks()` renders its muted placeholder and the "Where to use it"
   column on #/glossary is empty for every one of them (§31, roadmap 9.2c).
   The six terms added in v2.6 carry relations and render correctly, which
   shows the renderer was never the problem - the data was.

   This file supplies those relations in one table rather than editing the
   converted seed, so the v1 import stays a faithful record of what was
   converted. G28 asserts every term ends up with at least one relation and
   that every relation resolves to a registered item, so a typo here is a
   build failure rather than a silently empty cell.
   ========================================================== */

PS.GLOSS_LINKS = {
  'gloss-batna': { concepts: ['batna', 'negotiation-leverage'], sops: ['sop-negotiation-preparation'], calcs: ['calc-negotiation-savings'], templates: ['tpl-negotiation-planner'] },
  'gloss-bid': { concepts: ['rfi-rfq-rfp', 'evaluation-criteria'], sops: ['sop-rfq'], calcs: ['calc-compare-quotes'], templates: ['tpl-bid-instructions'] },
  'gloss-blanket-po': { concepts: ['framework-agreement', 'c-procure-to-pay'], sops: ['sop-contract-review'], calcs: ['calc-moq'], templates: ['tpl-contract-review-checklist'] },
  'gloss-capex': { concepts: ['make-or-buy', 'total-cost-of-ownership', 'c-capex'], sops: ['sop-procurement-lifecycle'], calcs: ['calc-tco'], templates: ['tpl-business-case'] },
  'gloss-cost-avoidance': { concepts: ['cost-avoidance', 'savings-types'], sops: ['sop-savings-calculation'], calcs: ['calc-savings-analysis'], templates: ['tpl-cost-avoidance'] },
  'gloss-direct-spend': { concepts: ['direct-indirect-spend', 'spend-analysis', 'c-direct-procurement'], sops: ['sop-procurement-lifecycle'], calcs: ['calc-tco'], templates: ['tpl-rfq'] },
  'gloss-doa': { concepts: ['delegation-of-authority', 'segregation-of-duties'], sops: ['sop-contract-review', 'sop-procurement-audit'], templates: ['tpl-exception-request'] },
  'gloss-eoq': { concepts: ['demand-management', 'total-cost-of-ownership'], calcs: ['calc-moq'], templates: ['tpl-rfq'] },
  'gloss-fx': { concepts: ['currency-fx', 'price-vs-cost'], sops: ['sop-supplier-price-increase-review'], calcs: ['calc-fx-currency'], templates: ['tpl-contract-review-checklist'] },
  'gloss-hhi': { concepts: ['concentration-risk', 'supplier-market-analysis', 'spend-analysis'], sops: ['sop-supplier-performance-management'], calcs: ['calc-supplier-concentration'], templates: ['tpl-supplier-risk-assessment'] },
  'gloss-incoterms': { concepts: ['incoterms', 'customs-and-duty', 'landed-cost-model', 'freight-modes'], sops: ['sop-freight-and-customs'], calcs: ['calc-landed-cost'], templates: ['tpl-rfq'] },
  'gloss-kpi': { concepts: ['savings-measurement', 'supplier-performance'], sops: ['sop-supplier-performance-management'], calcs: ['calc-kpi-calculator'], templates: ['tpl-supplier-scorecard'] },
  'gloss-landed-cost': { concepts: ['landed-cost-model', 'total-cost-of-ownership', 'customs-and-duty'], sops: ['sop-freight-and-customs'], calcs: ['calc-landed-cost'], templates: ['tpl-rfq'] },
  'gloss-moq': { concepts: ['demand-management', 'cost-breakdown'], calcs: ['calc-moq'], templates: ['tpl-rfq'] },
  'gloss-maverick-spend': { concepts: ['c-maverick-spend', 'spend-analysis', 'demand-management'], sops: ['sop-procurement-intake', 'sop-procurement-audit'], calcs: ['calc-budget-vs-actual'], templates: ['tpl-exception-request'] },
  'gloss-opex': { concepts: ['c-opex', 'direct-indirect-spend'], sops: ['sop-procurement-lifecycle'], calcs: ['calc-tco'], templates: ['tpl-business-case'] },
  'gloss-ppv': { concepts: ['savings-measurement', 'price-vs-cost', 'savings-baseline'], sops: ['sop-savings-calculation'], calcs: ['calc-savings-analysis'], templates: ['tpl-savings-calculation'] },
  'gloss-rfi': { concepts: ['rfi-rfq-rfp', 'supplier-market-analysis'], sops: ['sop-rfp'], templates: ['tpl-rfi'] },
  'gloss-rfq': { concepts: ['rfi-rfq-rfp', 'evaluation-criteria'], sops: ['sop-rfq'], calcs: ['calc-compare-quotes'], templates: ['tpl-rfq'] },
  'gloss-rfp': { concepts: ['rfi-rfq-rfp', 'sourcing-strategy', 'evaluation-criteria'], sops: ['sop-rfp'], calcs: ['calc-tco'], templates: ['tpl-rfp'] },
  'gloss-rft': { concepts: ['rfi-rfq-rfp', 'competitive-tension'], sops: ['sop-rfq'], templates: ['tpl-bid-instructions'] },
  'gloss-sla': { concepts: ['service-level-agreement', 'supplier-performance'], sops: ['sop-supplier-performance-management'], calcs: ['calc-kpi-calculator'], templates: ['tpl-contract-performance-review'] },
  'gloss-sow': { concepts: ['statement-of-work', 'specification'], sops: ['sop-contract-review'], calcs: ['calc-should-cost'], templates: ['tpl-rfp'] },
  'gloss-tco': { concepts: ['total-cost-of-ownership', 'landed-cost-model', 'should-cost'], sops: ['sop-contract-review'], calcs: ['calc-tco', 'calc-landed-cost'], templates: ['tpl-bid-comparison'] },
  'gloss-zopa': { concepts: ['zopa', 'batna', 'concession-management'], sops: ['sop-negotiation-preparation'], calcs: ['calc-negotiation-savings'], templates: ['tpl-negotiation-planner'] },
  'gloss-strategic-sourcing': { concepts: ['c-strategic-sourcing', 'sourcing-strategy', 'category-management'], sops: ['sop-rfp', 'sop-procurement-lifecycle'], calcs: ['calc-tco'], templates: ['tpl-business-case'] },
  'gloss-single-source': { concepts: ['competitive-tension', 'supplier-qualification'], sops: ['sop-supplier-evaluation'], calcs: ['calc-compare-quotes'], templates: ['tpl-single-source'] },
  'gloss-sole-source': { concepts: ['concentration-risk', 'supplier-market-analysis'], sops: ['sop-supplier-evaluation'], calcs: ['calc-supplier-concentration'], templates: ['tpl-sole-source'] },
  'gloss-should-cost': { concepts: ['should-cost', 'cost-breakdown', 'price-vs-cost'], sops: ['sop-negotiation-preparation'], calcs: ['calc-should-cost'], templates: ['tpl-business-case'] },
  'gloss-spend-under-management': { concepts: ['spend-analysis', 'category-management', 'c-spend-management'], sops: ['sop-procurement-lifecycle'], calcs: ['calc-kpi-calculator'], templates: ['tpl-business-case'] },
  'gloss-source-to-contract': { concepts: ['c-source-to-contract', 'contract-structure', 'sourcing-strategy'], sops: ['sop-contract-review', 'sop-rfp'], calcs: ['calc-multi-year-contract-cost'], templates: ['tpl-contract-review-checklist'] },
  'gloss-procure-to-pay': { concepts: ['c-procure-to-pay', 'c-three-way-match', 'segregation-of-duties'], sops: ['sop-procurement-lifecycle'], calcs: ['calc-po-value-check'], templates: ['tpl-supplier-onboarding'] },
  'gloss-category-management': { concepts: ['category-management', 'supplier-segmentation', 'spend-analysis'], sops: ['sop-procurement-lifecycle'], calcs: ['calc-supplier-concentration'], templates: ['tpl-business-case'] },
  'gloss-segregation-of-duties': { concepts: ['segregation-of-duties', 'audit-trail', 'conflict-of-interest'], sops: ['sop-procurement-audit'], calcs: ['calc-po-value-check'], templates: ['tpl-exception-request'] },
  'gloss-delegation-of-authority': { concepts: ['delegation-of-authority', 'segregation-of-duties'], sops: ['sop-procurement-audit', 'sop-contract-review'], calcs: ['calc-po-value-check'], templates: ['tpl-exception-request'] }
};

/* The relation types the glossary column renders. glossLinks() reads exactly
   these four keys, so a relation written under another name would be silently
   invisible - the table above is limited to what the column can show. */
PS.GLOSS_LINK_KEYS = ['concepts', 'sops', 'calcs', 'templates'];
PS.GLOSS_LINK_TYPE = { concepts: 'kb', sops: 'sop', calcs: 'calc', templates: 'tpl' };

PS.applyGlossLinks = function () {
  var applied = 0;
  Object.keys(PS.GLOSS_LINKS || {}).forEach(function (gid) {
    var g = PS.byId('gloss', gid);
    if (!g) return;
    var rel = g.rel && typeof g.rel === 'object' ? g.rel : {};
    (PS.GLOSS_LINK_KEYS || []).forEach(function (key) {
      var ids = PS.GLOSS_LINKS[gid][key] || [];
      /* Merge rather than replace: a term that already carries a relation
         from the converted seed keeps it, and the completion only adds. */
      var have = rel[key] || [];
      rel[key] = have.concat(ids.filter(function (id) { return have.indexOf(id) < 0; }));
    });
    g.rel = rel;
    applied++;
  });
  return applied;
};

/* Applied at load - but note where "load" is. This fragment is listed after
   src/core/90_normalize.js in src/manifest.txt, because a converted glossary
   record only gains its `id` during normalisation. Run it with the other
   content files and every PS.byId lookup below misses, the function applies
   nothing, returns 0, and the column stays empty while the data looks
   complete to anyone reading the file. G28 is what catches that class of
   ordering mistake rather than letting it ship. */
PS.applyGlossLinks();
