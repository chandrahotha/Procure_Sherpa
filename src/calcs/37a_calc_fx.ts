/* ============ Calc: Currency / FX ============ */
PS.CALC.push({
  id: 'calc-fx-currency', title: 'Currency / FX', cat: 'Tax & FX Tools', tags: ['fx', 'currency', 'exchange', 'spread', 'conversion'],
  purpose: 'Convert a foreign-currency amount at your real rate :  market rate less the bank spread, less fixed fees :  so the effective rate, not the quoted rate, drives the comparison.',
  desc: 'Conversion with spread and fee stripped out into an effective rate.',
  disclaimerKind: 'finance',
  assumptions: ['The rate entered is your dealt or quoted rate for the value date, not a mid-market reference.',
    'Spread and fee are treated as certain costs; rate movement between quote and settlement is not modelled.'],
  formula: ['Gross home = foreign amount x rate (home per 1 foreign)',
    'Spread cost = gross home x spread %; total cost = spread cost + fixed fee',
    'Net received = gross home - total cost; effective rate = net / foreign amount'],
  groups: [PS.G('Conversion', 'foreignAmount exchangeRate spreadPct feeFixed')],
  fields: [
    PS.F('foreignAmount', 'Foreign amount', 'curr', 'req,nn', '250000'),
    PS.F('exchangeRate', 'Rate (1 foreign = X home)', 'qty', 'req,pos', '0.62'),
    PS.F('spreadPct', 'Bank spread / margin %', 'pct', 'nn,max=20', '1.20'),
    PS.F('feeFixed', 'Fixed fee (home currency)', 'curr', 'nn', '350')
  ],
  example: { foreignAmount: 250000, exchangeRate: 0.62, spreadPct: 1.20, feeFixed: 350 },
  handoffTo: ['calc-landed-cost', 'calc-tco'],
  rel: { sops: ['sop-contract-review'], calcs: ['calc-landed-cost', 'calc-tco'], glossary: ['gloss-fx'] },
  run: function (v) { return PS.calcImpl.fxConvert(v); }
});
