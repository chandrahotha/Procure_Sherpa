/* ==========================================================
   Canonical legacy id map (Section 54, 77)

   One source of truth for translating an old content id into the id that
   is actually registered. This used to exist twice: once in
   PS.normRelId at runtime and once, richer, in tools/check_rels.mjs.
   The checker knew about mappings the runtime did not, so it reported
   "broken refs: 0" while the app silently pruned three live links at
   boot. Both sides now read this file.

   Keys are "<type>:<id>"; values are the registered id. The object is
   written as strict JSON so tools/check_rels.mjs can parse it without
   evaluating anything.
   ========================================================== */
PS.LEGACY_ID_MAP = {
  "calc:savings-analysis": "calc-savings-analysis",
  "calc:calc-savings-analysis": "calc-savings-analysis",
  "calc:budget-vs-actual": "calc-budget-vs-actual",
  "calc:calc-budget-vs-actual": "calc-budget-vs-actual",
  "calc:supplier-scorecard": "calc-supplier-scorecard",
  "calc:calc-supplier-scorecard": "calc-supplier-scorecard",
  "calc:supplier-concentration": "calc-supplier-concentration",
  "calc:calc-supplier-concentration": "calc-supplier-concentration",
  "calc:make-vs-buy": "calc-make-vs-buy",
  "calc:calc-make-vs-buy": "calc-make-vs-buy",
  "calc:moq": "calc-moq",
  "calc:calc-moq": "calc-moq",
  "calc:multi-year-contract": "calc-multi-year-contract-cost",
  "calc:calc-multi-year-contract": "calc-multi-year-contract-cost",
  "calc:gst": "calc-gst-tax",
  "calc:calc-gst-tax": "calc-gst-tax",
  "calc:currency": "calc-fx-currency",
  "calc:calc-fx-currency": "calc-fx-currency",
  "calc:kpi-calculator": "calc-kpi-calculator",
  "calc:calc-kpi-calculator": "calc-kpi-calculator",

  "sop:sop-quote-comparison": "sop-rfq",
  "sop:sop-bid-normalization": "sop-rfq",
  "sop:sop-commercial-evaluation": "sop-supplier-evaluation",
  "sop:sop-award-recommendation": "sop-rfp",
  "sop:sop-negotiation-savings": "sop-savings-calculation",
  "sop:sop-savings-validation": "sop-savings-calculation",
  "sop:sop-price-escalation-review": "sop-supplier-price-increase-review",
  "sop:sop-purchase-requisition": "sop-procurement-intake",
  "sop:sop-purchase-order": "sop-procurement-intake",
  "sop:sop-single-source": "sop-procurement-intake",
  "sop:sop-procurement-exception": "sop-emergency-procurement",
  "sop:sop-requirement-definition": "sop-procurement-intake",
  "sop:sop-sourcing-strategy": "sop-rfq",
  "sop:sop-supplier-identification": "sop-supplier-evaluation",
  "sop:sop-rfi": "sop-rfp",
  "sop:sop-competitive-bid": "sop-rfq",
  "sop:sop-contract-award": "sop-contract-review",
  "sop:sop-supplier-prequalification": "sop-supplier-evaluation",
  "sop:sop-supplier-due-diligence": "sop-supplier-evaluation",
  "sop:sop-supplier-segmentation": "sop-supplier-performance-management",
  "sop:sop-supplier-corrective-action": "sop-supplier-performance-management",
  "sop:sop-negotiation-execution": "sop-negotiation-preparation",
  "sop:sop-contract-performance-review": "sop-supplier-performance-management",
  "sop:sop-landed-cost": "sop-supplier-price-increase-review",
  "sop:sop-contract-change-control": "sop-contract-review",
  "sop:sop-compliance-review": "sop-procurement-audit",
  "sop:sop-documentation": "sop-procurement-audit",
  "sop:sop-supplier-exit": "sop-contract-renewal",
  "sop:sop-supplier-qualification": "sop-supplier-evaluation",

  "dec:dec-unit-price-vs-tco": "unit-or-tco",
  "dec:dec-unit-or-tco": "unit-or-tco",
  "dec:dec-negotiate-or-accept": "negotiate-or-accept",
  "dec:dec-accept-price-increase": "accept-price-increase",
  "dec:dec-renew-vs-resource": "renew-vs-resource",
  "dec:dec-approve-exception": "approve-exception",
  "dec:dec-competitive-vs-single": "competitive-vs-single",
  "dec:dec-make-or-buy": "make-or-buy",
  "dec:dec-rfq-or-rfp": "rfq-or-rfp",
  "dec:dec-rfi-or-rfq": "rfi-or-rfq",
  "dec:dec-competitive-or-single": "competitive-or-single",
  "dec:dec-framework-agreement": "framework-agreement",
  "dec:dec-consolidate-suppliers": "consolidate-suppliers",
  "dec:dec-re-source": "re-source",
  "dec:dec-supplier-concentration": "supplier-concentration",
  "dec:dec-dual-source": "dual-source",
  "dec:dec-supplier-financial-risk": "supplier-financial-risk",
  "dec:dec-sourcing-method": "sourcing-method",

  "kpi:kpi-payment-terms": "kpi-working-capital-impact",
  "kpi:kpi-working-capital": "kpi-working-capital-impact",
  "kpi:kpi-supplier-performance": "kpi-otif",

  "kb:kb-cost-drivers": "cost-breakdown",
  "kb:kb-price-escalation": "should-cost",
  "kb:kb-indexation": "currency-fx",
  "kb:kb-delegation-of-authority": "delegation-of-authority",
  "kb:kb-approval-matrix": "delegation-of-authority",

  "tpl:tpl-price-increase-assessment": "tpl-contract-change-request",
  "tpl:tpl-single-source-justification": "tpl-single-source",
  "tpl:tpl-statement-of-work": "tpl-contract-review-checklist",

  "cl:cl-negotiation-preparation": "cl-negotiation",
  "cl:cl-price-increase-review": "cl-contract-renewal",
  "cl:cl-supplier-qualification": "cl-supplier-evaluation"
};
