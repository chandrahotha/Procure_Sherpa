/* ============ Calc: GST / Tax ============ */
PS_CALC.push({
  id: 'calc-gst-tax', title: 'GST / Tax', cat: 'Tax & FX Tools', tags: ['tax', 'gst', 'vat', 'inclusive', 'exclusive'],
  purpose: 'Split any amount into net, tax and gross in one move, in either direction, so quotes with mixed tax treatments become comparable.',
  desc: 'Tax-exclusive add-on and tax-inclusive extraction at any rate.',
  disclaimerKind: 'tax',
  assumptions: ['A single flat rate is applied: tiered, exempt or zero-rated lines need separate treatment.',
    'The tool does arithmetic only. Whether tax applies, at what rate and who bears it depends on your jurisdiction and contract.'],
  formula: ['Exclusive: tax = net x rate; gross = net + tax',
    'Inclusive: net = gross / (1 + rate); tax = gross - net'],
  groups: [PS.G('Amount and rate', 'amount taxRate taxMode')],
  fields: [
    PS.F('amount', 'Amount', 'curr', 'req,nn', '10000'),
    PS.F('taxRate', 'Tax rate %', 'pct', 'req,nn,max=100', '10'),
    PS.F('taxMode', 'The amount entered is', 'sel', 'opts=Tax_exclusive_add_tax_on_top;Tax_inclusive_extract_the_tax|0')
  ],
  example: { amount: 10000, taxRate: 10, taxMode: 'Tax exclusive add tax on top' },
  handoffTo: ['calc-landed-cost'],
  rel: { sops: ['sop-procurement-intake'], checklists: ['cl-procurement-file-completeness'], calcs: ['calc-landed-cost'] },
  run: function (v) { return PS.calcImpl.gstTax(v); }
});
