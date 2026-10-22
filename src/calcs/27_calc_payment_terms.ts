/* ============ Calc: Payment Terms ============ */
PS.CALC.push({
  id: 'calc-payment-terms', title: 'Payment Terms', cat: 'Negotiation Tools', tags: ['payment', 'working capital', 'terms'],
  purpose: 'Value a change in payment terms in money and cash, and compare it with early-payment discounts so you negotiate the option that is actually worth more.',
  desc: 'Working-capital value of extended terms and the effective annual rate of an early-payment discount.',
  disclaimerKind: 'finance',
  assumptions: ['Cash released is calculated as spend x days change / 365 and is not a saving: it is a balance-sheet effect.',
    'The cost of capital is yours, from Settings or entered here, and is the rate at which released cash is valued.',
    'Discounts are assessed against the later payment date, which is the correct comparison for a cash decision.'],
  formula: ['Cash released = annual spend x (proposed days - current days) / 365',
    'Annual value of extended terms = cash released x cost of capital %',
    'Annual value of an early-payment discount = annual spend x discount %',
    'Effective annual rate of a discount = (d / (1 - d)) x (365 / (net days - discount days)), where d is the discount as a decimal'],
  groups: [PS.G('Spend and terms position', 'annualSpend currentDays proposedDays costOfCapital'),
    PS.G('Early payment discount', 'discountPct discountDays netDays')],
  fields: [
    PS.F('annualSpend', 'Annual spend with this supplier', 'curr', 'req,nn', '2400000'),
    PS.F('currentDays', 'Current payment terms', 'days', 'req,nn|30'),
    PS.F('proposedDays', 'Proposed payment terms', 'days', 'req,nn|60'),
    PS.F('costOfCapital', 'Your cost of capital', 'pct', 'nn,max=40,tip=Used_to_value_released_cash|9'),
    PS.F('discountPct', 'Early-payment discount offered %', 'pct', 'nn,max=20|2'),
    PS.F('discountDays', 'Pay within', 'days', 'nn|10'),
    PS.F('netDays', 'Otherwise payable within', 'days', 'nn|30')
  ],
  example: { annualSpend: 2400000, currentDays: 30, proposedDays: 60, costOfCapital: 9, discountPct: 2, discountDays: 10, netDays: 30 },
  handoffTo: ['calc-tco', 'calc-negotiation-savings'],
  rel: { sops: ['sop-negotiation-preparation', 'sop-contract-review'], cl: ['cl-negotiation-preparation'], tpl: ['tpl-negotiation-planner'], calc: ['calc-tco', 'calc-negotiation-savings'], decisions: ['dec-negotiate-or-accept'], kpis: ['kpi-payment-terms', 'kpi-working-capital'] },
  run: function (v) { return PS.calcImpl.paymentTerms(v); }
});