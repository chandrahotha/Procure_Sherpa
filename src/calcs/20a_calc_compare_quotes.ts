/* ============ Calc: Compare Quotes (metadata) ============ */
PS.calcImpl = PS.calcImpl || {};
PS.CALC.push({
  id: 'calc-compare-quotes', title: 'Compare Quotes', cat: 'Quote Tools', tags: ['quote', 'evaluation', 'landed cost'],
  purpose: 'Compare supplier quotations on one basis so the lowest landed cost - not the lowest headline price - is visible, and show the commercial spread you have to negotiate in.',
  desc: 'Normalise up to three quotations into comparable landed cost and rank them.',
  disclaimerKind: 'finance',
  assumptions: ['Duty and tax percentages apply to the values you enter; no market rates are assumed.',
    'Recoverable purchase tax is shown but excluded from ranking because it should not drive an award decision.',
    'Non-price factors (quality, service, lead time) are not scored here - use the Supplier Scorecard for weighted evaluation.'],
  formula: ['Landed goods = (unit price x quantity) - discount',
    'Duty = (landed goods + freight + insurance) x duty %',
    'Landed cost = landed goods + freight + insurance + duty (+ tax where not recoverable)',
    'Per-unit landed cost = landed cost / quantity'],
  groups: [
    { g: 'Requirement', keys: ['qty', 'insurance', 'taxRecoverable'] },
    { g: 'Supplier A', keys: ['aPrice', 'aFreight', 'aDuty', 'aDiscount'] },
    { g: 'Supplier B', keys: ['bPrice', 'bFreight', 'bDuty', 'bDiscount'] },
    { g: 'Supplier C (optional)', keys: ['cPrice', 'cFreight', 'cDuty', 'cDiscount'], note: 'Leave supplier C blank when only two quotations were received.' }
  ],
  fields: [
    { k: 'qty', label: 'Quantity required', unit: 'qty', req: true, positive: true, def: 1000 },
    { k: 'insurance', label: 'Insurance total (all offers)', unit: 'currency', nonNegative: true, def: 0 },
    { k: 'taxRecoverable', label: 'Purchase tax is recoverable', type: 'check', def: true, help: 'Yes - exclude recoverable tax from the ranking basis' },
    { k: 'aPrice', label: 'A: unit price ex tax', unit: 'currency', req: true, nonNegative: true },
    { k: 'aFreight', label: 'A: freight total', unit: 'currency', nonNegative: true, def: 0 },
    { k: 'aDuty', label: 'A: duty / import %', unit: 'percent', min: 0, max: 100, def: 0 },
    { k: 'aDiscount', label: 'A: discount %', unit: 'percent', min: 0, max: 100, def: 0 },
    { k: 'bPrice', label: 'B: unit price ex tax', unit: 'currency', nonNegative: true },
    { k: 'bFreight', label: 'B: freight total', unit: 'currency', nonNegative: true, def: 0 },
    { k: 'bDuty', label: 'B: duty / import %', unit: 'percent', min: 0, max: 100, def: 0 },
    { k: 'bDiscount', label: 'B: discount %', unit: 'percent', min: 0, max: 100, def: 0 },
    { k: 'cPrice', label: 'C: unit price ex tax', unit: 'currency', nonNegative: true },
    { k: 'cFreight', label: 'C: freight total', unit: 'currency', nonNegative: true, def: 0 },
    { k: 'cDuty', label: 'C: duty / import %', unit: 'percent', min: 0, max: 100, def: 0 },
    { k: 'cDiscount', label: 'C: discount %', unit: 'percent', min: 0, max: 100, def: 0 }
  ],
  example: { qty: 2500, insurance: 300, taxRecoverable: true, aPrice: 12.4, aFreight: 1800, aDuty: 6, aDiscount: 2, bPrice: 11.9, bFreight: 3200, bDuty: 6, bDiscount: 0, cPrice: 13.25, cFreight: 600, cDuty: 6, cDiscount: 5 },
  handoffTo: ['calc-tco', 'calc-negotiation-savings', 'calc-savings-analysis'],
  rel: { sops: ['sop-quote-comparison', 'sop-bid-normalization', 'sop-commercial-evaluation'], cl: ['cl-quote-comparison'], tpl: ['tpl-bid-comparison'], calc: ['calc-landed-cost', 'calc-tco'], decisions: ['dec-unit-price-vs-tco'] },
  run: function (v) { return PS.calcImpl.compareQuotes(v); }
});