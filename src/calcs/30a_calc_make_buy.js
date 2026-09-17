/* ============ Calc: Make vs Buy ============ */
PS_CALC.push({
  id: 'calc-make-vs-buy', title: 'Make vs Buy', cat: 'Buying Decision Tools', tags: ['make or buy', 'insource', 'outsourcing', 'breakeven'],
  purpose: 'Compare the whole-life cost of making in-house against buying from a supplier at a given volume, and find the volume where the answer flips.',
  desc: 'In-house fixed plus variable cost versus supplier price, with break-even volume.',
  disclaimerKind: 'finance',
  assumptions: ['In-house variable cost per unit is treated as constant over the volume range entered.',
    'One-off setup or tooling is counted once against the full volume, not amortised by accounting rules.',
    'Strategic factors (IP, capacity, quality control, supply security) are not priced: weigh them alongside the numbers.'],
  formula: ['Make total = fixed setup + variable cost per unit x volume',
    'Buy total = (supplier price + logistics per unit) x volume',
    'Break-even volume = fixed setup / (buy variable - make variable)'],
  groups: [PS.G('In-house cost', 'volume matCost labourCost overheadCost fixedSetup'),
    PS.G('Supplier offer', 'buyPrice buyLogistics')],
  fields: [
    PS.F('volume', 'Annual volume (units)', 'qty', 'req,pos,int', '10000'),
    PS.F('matCost', 'Material per unit', 'curr', 'nn', '6.20'),
    PS.F('labourCost', 'Direct labour per unit', 'curr', 'nn', '2.40'),
    PS.F('overheadCost', 'Overhead absorption per unit', 'curr', 'nn', '1.80'),
    PS.F('fixedSetup', 'One-off setup or tooling retained in-house', 'curr', 'nn', '25000'),
    PS.F('buyPrice', 'Supplier unit price', 'curr', 'req,nn', '12.80'),
    PS.F('buyLogistics', 'Inbound logistics per bought unit', 'curr', 'nn', '0.60')
  ],
  example: { volume: 10000, matCost: 6.20, labourCost: 2.40, overheadCost: 1.80, fixedSetup: 25000, buyPrice: 12.80, buyLogistics: 0.60 },
  handoffTo: ['calc-tco', 'calc-should-cost'],
  rel: { sops: ['sop-procurement-intake'], templates: ['tpl-award-recommendation'], calcs: ['calc-tco', 'calc-should-cost'], decisions: ['make-or-buy'], concepts: ['make-or-buy'], scenarios: ['scn-new-purchase'] },
  run: function (v) { return PS.calcImpl.makeBuy(v); }
});
