/* ============ Calc: Price Increase ============ */
PS_CALC.push({
  id: 'calc-price-increase', title: 'Price Increase', cat: 'Negotiation Tools', tags: ['price increase', 'negotiation', 'contract'],
  purpose: 'Quantify a supplier price increase, split it into the part your contract or an index can justify and the part it cannot, and turn the difference into a negotiation target.',
  desc: 'Size a supplier price increase, test it against index or contract terms and price the impact.',
  disclaimerKind: 'finance',
  assumptions: ['The index rate you enter is the contractually referenced rate (or the published index movement you accept); Procure yourself does not supply market indices.',
    'Volumes are held constant at the level entered, so a quantity change is a separate calculation.'],
  formula: ['Increase per unit = new price - current price',
    'Increase % = increase per unit / current price x 100',
    'Annual impact = increase per unit x annual volume',
    'Justified element = current price x index rate %; unjustified element = increase per unit - justified element'],
  groups: [PS.G('Prices and volume', 'currentPrice newPrice annualVolume'),
    PS.G('Contract basis', 'contractAllows indexRate noticeDays'),
    { g: 'Supplier justification', keys: ['justifyType'], note: 'Your assessment of the evidence the supplier provided.' }],
  fields: [
    PS.F('currentPrice', 'Current unit price', 'curr', 'req,nn', '18.50'),
    PS.F('newPrice', 'New unit price requested', 'curr', 'req,nn', '20.72'),
    PS.F('annualVolume', 'Annual volume', 'qty', 'req,pos', '10000'),
    PS.F('contractAllows', 'Contract permits a price change', 'bool', 'check'),
    PS.F('indexRate', 'Contractual index movement', 'pct', 'nn,max=100,tip=Rate_you_accept_as_legitimate,_0_if_none|3'),
    PS.F('noticeDays', 'Notice given by supplier', 'days', 'nn|30'),
    PS.F('justifyType', 'Evidence provided by supplier', 'sel', 'opts=Cost_breakdown_provided;Partial_evidence;Index_reference_only;No_evidence|2')
  ],
  example: { currentPrice: 18.5, newPrice: 20.72, annualVolume: 10000, contractAllows: false, indexRate: 3, noticeDays: 30, justifyType: 'Partial_evidence' },
  handoffTo: ['calc-negotiation-savings', 'calc-tco', 'calc-price-escalation', 'calc-multi-year-contract-cost'],
  rel: { sops: ['sop-supplier-price-increase-review', 'sop-price-escalation-review', 'sop-negotiation-preparation'], cl: ['cl-price-increase-review'], tpl: ['tpl-price-increase-assessment'], calc: ['calc-negotiation-savings', 'calc-price-escalation'], decisions: ['dec-accept-price-increase'], kpis: ['kpi-ppv'] },
  run: function (v) { return PS.calcImpl.priceIncrease(v); }
});