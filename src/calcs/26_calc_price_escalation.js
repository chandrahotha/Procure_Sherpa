/* ============ Calc: Price Escalation ============ */
PS_CALC.push({
  id: 'calc-price-escalation', title: 'Price Escalation', cat: 'Negotiation Tools', tags: ['escalation', 'indexation', 'contract'],
  purpose: 'Model how an escalation or indexation clause compounds over a contract term, and show what a cap on escalation is worth in money rather than in words.',
  desc: 'Project escalated prices and total contract cost over the term, with and without a cap.',
  disclaimerKind: 'finance',
  assumptions: ['Escalation applies annually from the start of the contract unless you build in a delay.',
    'Volumes are assumed constant; changes in volume are a separate demand or budget calculation.',
    'The cap is treated as a ceiling on cumulative escalation from the base price.'],
  formula: ['Escalated price in year y (uncapped) = base price x (1 + escalation)^y',
    'Capped price = base price x (1 + min(escalation, cap))^y',
    'Total contract cost = sum of applied price x annual volume for each year',
    'Value of the cap = total cost uncapped - total cost capped'],
  groups: [PS.G('Base position', 'basePrice annualVolume years'),
    PS.G('Escalation and cap', 'escalationPct capPct'),
    PS.G('Application', 'startYear')],
  fields: [
    PS.F('basePrice', 'Base unit price', 'curr', 'req,nn', '18.50'),
    PS.F('annualVolume', 'Annual volume', 'qty', 'req,pos', '10000'),
    PS.F('years', 'Contract term', 'years', 'req,pos,max=25|5'),
    PS.F('escalationPct', 'Annual escalation', 'pct', 'nn,max=50,tip=As_requested_or_contractually_referenced|4'),
    PS.F('capPct', 'Cap on annual escalation (0 = no cap)', 'pct', 'nn,max=50|0'),
    PS.F('startYear', 'First year escalation applies', 'years', 'nn,max=10|2')
  ],
  example: { basePrice: 18.5, annualVolume: 10000, years: 5, escalationPct: 4, capPct: 2.5, startYear: 2 },
  handoffTo: ['calc-multi-year-contract-cost', 'calc-tco', 'calc-price-increase'],
  rel: { sops: ['sop-price-escalation-review', 'sop-contract-review', 'sop-contract-renewal'], cl: ['cl-contract-review'], tpl: ['tpl-contract-review-checklist'], calc: ['calc-multi-year-contract-cost', 'calc-price-increase'], decisions: ['dec-negotiate-or-accept', 'dec-renew-vs-resource'], kb: ['kb-price-escalation', 'kb-indexation'] },
  run: function (v) { return PS.calcImpl.priceEscalation(v); }
});