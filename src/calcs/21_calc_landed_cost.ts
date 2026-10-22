/* ============ Calc: Landed Cost ============ */
PS.CALC.push({
  id: 'calc-landed-cost', title: 'Landed Cost', cat: 'Cost Tools', tags: ['landed cost', 'quote', 'import'],
  purpose: 'Add freight, insurance, duty and handling to the invoice price so suppliers are compared on the cost of having the goods in place, not on the quoted price.',
  desc: 'Landed cost per unit and in total, with a full cost breakdown.',
  disclaimerKind: 'finance',
  assumptions: ['Duty and tax rates are jurisdiction and product specific: verify the tariff classification before relying on the result.',
    'Recoverable tax is excluded. Incoterms decide who pays freight and duty, so confirm what each quote includes.'],
  formula: ['Customs value = goods value - discount + freight + insurance',
    'Duty = customs value x duty %',
    'Landed cost = customs value + duty + handling + other (+ non-recoverable tax); per unit = landed cost / quantity'],
  groups: [PS.G('Purchase', 'unitPrice qty discount'),
    PS.G('Logistics, duty and handling', 'freight insurance dutyPct handling otherCost'),
    PS.G('Tax treatment', 'taxRecoverable taxPct')],
  fields: [
    PS.F('unitPrice|Unit price|curr|req,nn|12.4'),
    PS.F('qty|Quantity|qty|req,pos|2500'),
    PS.F('discount|Discount %|pct|nn,max=100|0'),
    PS.F('freight|Freight total|curr|nn|1800'),
    PS.F('insurance|Insurance total|curr|nn|240'),
    PS.F('dutyPct|Duty / import %|pct|nn,max=100,tip=Applied_to_goods_value_plus_freight_and_insurance|6'),
    PS.F('handling|Handling and clearance|curr|nn|350'),
    PS.F('otherCost|Other costs|curr|nn,tip=Inland_transport,_unpacking,_inspection|400'),
    PS.F('taxRecoverable|Purchase tax recoverable|bool|check|1'),
    PS.F('taxPct|Purchase tax %|pct|nn,max=60|0')
  ],
  example: { unitPrice: 12.4, qty: 2500, discount: 2, freight: 1800, insurance: 240, dutyPct: 6, handling: 350, otherCost: 400, taxRecoverable: true, taxPct: 0 },
  handoffTo: ['calc-tco', 'calc-compare-quotes', 'calc-make-vs-buy'],
  rel: { sops: ['sop-commercial-evaluation', 'sop-quote-comparison'], cl: ['cl-commercial-evaluation'], tpl: ['tpl-commercial-evaluation'], calc: ['calc-compare-quotes', 'calc-tco'], decisions: ['dec-unit-price-vs-tco'], kpis: ['kpi-ppv'] },
  run: function (v) { return PS.calcImpl.landedCost(v); }
});