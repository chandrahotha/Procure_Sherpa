/* ============ Calc: Should Cost ============ */
PS_CALC.push({
  id: 'calc-should-cost', title: 'Should Cost', cat: 'Cost Tools', tags: ['should cost', 'negotiation', 'cost'],
  purpose: 'Build an independent estimate of what a product or service should cost from its cost drivers, so a supplier quotation can be tested against a bottom-up model rather than accepted or rejected on instinct.',
  desc: 'Estimate a should-cost price from material, labour, overhead, margin and other drivers, then compare it with the quoted price.',
  disclaimerKind: 'finance',
  assumptions: ['Cost drivers are entered by the user; no market or index data is assumed.',
    'Margin is applied on the cost base you define, so state whether it is on total cost or on conversion cost.',
    'Should cost is an estimate for negotiation preparation, not an accounting standard cost.'],
  formula: ['Conversion cost = labour + machine + overhead',
    'Total cost = material + conversion + packaging + logistics + other',
    'Should-cost price = total cost x (1 + margin %) + amortised tooling / setup',
    'Gap = quoted price - should-cost price; gap % = gap / should-cost price x 100'],
  groups: [PS.G('Requirement', 'qty quotedPrice'),
    PS.G('Cost drivers', 'material labour machine overhead packaging logistics other'),
    PS.G('Margin and one-off costs', 'marginPct tooling')],
  fields: [
    PS.F('qty', 'Annual quantity', 'qty', 'req,pos', '10000'),
    PS.F('quotedPrice', 'Quoted unit price', 'curr', 'req,nn', '18.50'),
    PS.F('material', 'Material cost per unit', 'curr', 'nn', '6.20'),
    PS.F('labour', 'Direct labour per unit', 'curr', 'nn', '2.40'),
    PS.F('machine', 'Machine / process cost per unit', 'curr', 'nn', '1.10'),
    PS.F('overhead', 'Overhead absorption per unit', 'curr', 'nn', '1.80'),
    PS.F('packaging', 'Packaging per unit', 'curr', 'nn', '0.45'),
    PS.F('logistics', 'Inbound/outbound logistics per unit', 'curr', 'nn', '0.60'),
    PS.F('other', 'Other direct cost per unit', 'curr', 'nn', '0.25'),
    PS.F('marginPct', 'Supplier margin %', 'pct', 'nn,max=200,tip=Applied_to_total_unit_cost|12'),
    PS.F('tooling', 'One-off tooling or setup', 'curr', 'nn|2500')
  ],
  example: { qty: 10000, quotedPrice: 18.5, material: 6.2, labour: 2.4, machine: 1.1, overhead: 1.8, packaging: 0.45, logistics: 0.6, other: 0.25, marginPct: 12, tooling: 2500 },
  handoffTo: ['calc-negotiation-savings', 'calc-price-increase', 'calc-tco'],
  rel: { sops: ['sop-negotiation-preparation', 'sop-commercial-evaluation'], cl: ['cl-negotiation-preparation'], tpl: ['tpl-negotiation-planner'], calc: ['calc-negotiation-savings', 'calc-tco'], decisions: ['dec-negotiate-or-accept'], kb: ['kb-cost-drivers'] },
  run: function (v) { return PS.calcImpl.shouldCost(v); }
});