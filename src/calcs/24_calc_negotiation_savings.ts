/* ============ Calc: Negotiation Savings ============ */
PS.CALC.push({
  id: 'calc-negotiation-savings', title: 'Negotiation Savings', cat: 'Negotiation Tools', tags: ['savings', 'negotiation'],
  purpose: 'Quantify what a negotiation actually achieved against an agreed baseline, separating recurring price reduction from one-off benefits and implementation costs.',
  desc: 'Savings per unit, per year and across the contract, against a defined baseline.',
  disclaimerKind: 'finance',
  assumptions: ['Savings are measured against the baseline you select; the baseline definition is the single most challenged part of any savings claim.',
    'One-off benefits are counted separately from recurring savings so they cannot be reported as annual run-rate.',
    'Implementation costs are deducted once, in the year they occur, unless you model them differently.'],
  formula: ['Saving per unit = baseline unit price - negotiated unit price',
    'Annual savings = saving per unit x annual volume',
    'Contract savings = annual savings x contract years + one-off benefits - implementation cost',
    'Savings % = (baseline - negotiated) / baseline x 100'],
  groups: [PS.G('Baseline definition', 'baselineType'),
    PS.G('Prices and volume', 'baselinePrice negotiatedPrice annualVolume years'),
    PS.G('One-off items', 'oneOffBenefits implementationCost')],
  fields: [
    PS.F('baselineType', 'Baseline definition', 'sel', 'opts=Last_paid_price;Current_contract_price;Budgeted_price;Market_benchmark;Last_competitive_bid|0'),
    PS.F('baselinePrice', 'Baseline unit price', 'curr', 'req,nn', '18.5'),
    PS.F('negotiatedPrice', 'Negotiated unit price', 'curr', 'req,nn', '16.2'),
    PS.F('annualVolume', 'Annual volume', 'qty', 'req,pos', '10000'),
    PS.F('years', 'Contract years', 'years', 'req,pos,max=25|3'),
    PS.F('oneOffBenefits', 'One-off benefits (tooling, training, credits)', 'curr', 'nn', '4000'),
    PS.F('implementationCost', 'Implementation / switching cost', 'curr', 'nn', '1500')
  ],
  example: { baselineType: 'Last_paid_price', baselinePrice: 18.5, negotiatedPrice: 16.2, annualVolume: 10000, years: 3, oneOffBenefits: 4000, implementationCost: 1500 },
  handoffTo: ['calc-savings-analysis', 'calc-multi-year-contract-cost', 'calc-price-increase'],
  rel: { sops: ['sop-negotiation-savings', 'sop-savings-calculation', 'sop-savings-validation'], cl: ['cl-negotiation-closeout', 'cl-savings-validation'], tpl: ['tpl-savings-calculation'], calc: ['calc-savings-analysis', 'calc-multi-year-contract-cost'], decisions: ['dec-negotiate-or-accept'], kpis: ['kpi-savings'] },
  run: function (v) { return PS.calcImpl.negotiationSavings(v); }
});