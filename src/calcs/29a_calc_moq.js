/* ============ Calc: MOQ / Order Quantity Optimizer ============ */
PS_CALC.push({
  id: 'calc-moq', title: 'MOQ / Order Quantity', cat: 'Buying Decision Tools', tags: ['moq', 'eoq', 'order quantity', 'lot size'],
  purpose: 'Find the order quantity that minimises ordering plus holding cost, test a supplier MOQ against it, and price exactly what the MOQ constraint costs you per year.',
  desc: 'Economic order quantity with MOQ constraint costing and current-practice comparison.',
  disclaimerKind: 'finance',
  assumptions: ['Demand is treated as steady through the year; lumpy or seasonal demand needs a separate schedule.',
    'Purchase cost itself is excluded from the optimisation because it does not change with lot size at a fixed price.',
    'Stock-out, obsolescence and warehouse-capacity costs are not modelled.'],
  formula: ['EOQ = sqrt(2 x annual demand x order cost / holding cost per unit)',
    'Annual relevant cost(Q) = (demand / Q) x order cost + (Q / 2) x holding cost',
    'MOQ penalty = relevant cost(MOQ) - relevant cost(EOQ)'],
  groups: [PS.G('Demand and costs', 'annualDemand orderCost holdingCost unitCost'),
    PS.G('Supplier terms and current practice', 'supplierMOQ currentQty')],
  fields: [
    PS.F('annualDemand', 'Annual demand (units)', 'qty', 'req,pos,int', '12000'),
    PS.F('orderCost', 'Cost to place one order', 'curr', 'req,nn', '150'),
    PS.F('holdingCost', 'Holding cost per unit per year', 'curr', 'req,nn', '2.40'),
    PS.F('unitCost', 'Unit purchase price', 'curr', 'nn', '18.50'),
    PS.F('supplierMOQ', 'Supplier MOQ in units (0 = none)', 'qty', 'nn,int', '2000'),
    PS.F('currentQty', 'Current order quantity', 'qty', 'nn,int', '1000')
  ],
  example: { annualDemand: 12000, orderCost: 150, holdingCost: 2.40, unitCost: 18.50, supplierMOQ: 2000, currentQty: 1000 },
  handoffTo: ['calc-landed-cost', 'calc-budget-vs-actual'],
  rel: { sops: ['sop-procurement-intake'], checklists: ['cl-procurement-intake'], calcs: ['calc-landed-cost', 'calc-budget-vs-actual'], decisions: ['unit-or-tco'], glossary: ['gloss-moq', 'gloss-eoq'], scenarios: ['scn-new-purchase'] },
  run: function (v) { return PS.calcImpl.moq(v); }
});
