/* ============ Calc: Multi-Year Contract Cost ============ */
PS_CALC.push({
  id: 'calc-multi-year-contract-cost', title: 'Multi-Year Contract Cost', cat: 'Contract Tools', tags: ['multi-year', 'escalation', 'npv', 'total cost', 'renewal'],
  purpose: 'Price the whole deal, not year one: escalate each year, total the nominal commitment and discount it back to today money for an honest renewal comparison.',
  desc: 'Year-by-year escalation schedule with nominal total and net present value.',
  disclaimerKind: 'finance',
  assumptions: ['The same escalation rate applies every year unless you model steps manually.',
    'Volumes and scope are treated as flat: growth or scope change needs its own line.',
    'NPV uses a single discount rate across the term.'],
  formula: ['Year-t cost = year-1 cost x (1 + escalation)^(t-1)',
    'Nominal total = sum of yearly costs',
    'NPV = sum(year-t cost / (1 + discount rate)^t)'],
  groups: [PS.G('Deal shape', 'year1Cost escalationPct termYears discountRate')],
  fields: [
    PS.F('year1Cost', 'Year 1 cost', 'curr', 'req,nn', '500000'),
    PS.F('escalationPct', 'Annual escalation %', 'pct', 'nn,max=50', '3.50'),
    PS.F('termYears', 'Term (years)', 'qty', 'req,pos,int,max=25', '5'),
    PS.F('discountRate', 'Discount rate %', 'pct', 'nn,max=50,tip=Your_cost_of_capital_for_present_value|8')
  ],
  example: { year1Cost: 500000, escalationPct: 3.50, termYears: 5, discountRate: 8 },
  handoffTo: ['calc-tco', 'calc-price-escalation'],
  rel: { sops: ['sop-contract-renewal'], templates: ['tpl-award-recommendation'], calcs: ['calc-tco', 'calc-price-escalation'], decisions: ['renew-vs-resource', 're-source'], scenarios: ['scn-contract-renewal'] },
  run: function (v) { return PS.calcImpl.multiyear(v); }
});
