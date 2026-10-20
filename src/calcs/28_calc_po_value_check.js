/* ============ Calc: PO Value Check ============ */
PS_CALC.push({
  id: 'calc-po-value-check', title: 'PO Value Check', cat: 'Buying Decision Tools', tags: ['approval', 'governance', 'po'],
  purpose: 'Check a purchase value against the approval thresholds and the competitive-bidding threshold you configured, and see which documentation the file still needs.',
  desc: 'Approval level, competitive-bidding expectation and outstanding documentation checks for a purchase value.',
  disclaimerKind: 'policy',
  assumptions: ['Approval levels and the competitive-bidding threshold come from Settings - Procure Sherpa has no built-in thresholds and assumes no universal rules.',
    'The check identifies the level whose limit covers the value; your policy may also consider supplier risk, category, contract status or urgency.'],
  formula: ['Applicable approval level = the first level in your threshold table whose limit is greater than or equal to the purchase value',
    'A level with a limit of 0 is treated as having no upper bound',
    'Competitive bidding expected = value > your configured competitive-bidding threshold (when a threshold is set)'],
  groups: [PS.G('Purchase', 'poValue spendType supplier'),
    PS.G('Process already followed', 'quotesObtained soleSource contractInPlace budgetApproved'),
    PS.G('Risk and nature', 'riskLevel')],
  fields: [
    PS.F('poValue', 'Purchase value (total)', 'curr', 'req,nn', '74000'),
    PS.F('spendType', 'Spend type', 'sel', 'opts=Direct_material;Indirect_goods_or_services;CAPEX;Services|1'),
    PS.F('supplier', 'Supplier name (optional, for the report)', 'text'),
    PS.F('quotesObtained', 'Quotations obtained', 'qty', 'nn,int|2'),
    PS.F('soleSource', 'Single or sole source award', 'bool', 'check'),
    PS.F('contractInPlace', 'Contract or framework already in place', 'bool', 'check'),
    PS.F('budgetApproved', 'Budget confirmed by the budget holder', 'bool', 'check'),
    PS.F('riskLevel', 'Assessed risk level', 'sel', 'opts=Low;Medium;High|1')
  ],
  example: { poValue: 74000, spendType: 'Indirect_goods_or_services', supplier: 'Northwind Supplies', quotesObtained: 2, soleSource: false, contractInPlace: false, budgetApproved: true, riskLevel: 'Medium' },
  handoffTo: ['calc-budget-vs-actual'],
  rel: { sops: ['sop-purchase-requisition', 'sop-purchase-order', 'sop-single-source', 'sop-procurement-exception'], cl: ['cl-single-source-justification', 'cl-exception-approval'], tpl: ['tpl-single-source-justification', 'tpl-exception-request'], calc: ['calc-compare-quotes'], decisions: ['dec-approve-exception', 'dec-competitive-vs-single'], kb: ['kb-delegation-of-authority', 'kb-approval-matrix'] },
  run: function (v) { return PS.calcImpl.poValueCheck(v); }
});