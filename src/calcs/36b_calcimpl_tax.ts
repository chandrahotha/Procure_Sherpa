/* ============ Calc logic: GST / Tax ============ */
PS.calcImpl.gstTax = function (v) {
  var w = [];
  var rate = v.taxRate / 100;
  var exclusive = String(v.taxMode || '').indexOf('exclusive') >= 0;
  var net, tax, gross;
  if (exclusive) { net = v.amount; tax = net * rate; gross = net + tax; }
  else { gross = v.amount; net = gross / (1 + rate); tax = gross - net; }
  if (v.taxRate === 0) w.push('Zero rate entered: the split is trivial. Confirm exemption or zero-rating applies rather than assuming it.');
  return PS.C({
    r: [PS.res('Net (ex-tax)', PS.moneyR(net), exclusive ? 'As entered' : 'Extracted from gross', '', true),
      PS.res('Tax', PS.moneyR(tax), 'At ' + PS.pct(v.taxRate), '', true),
      PS.res('Gross (inc-tax)', PS.moneyR(gross), exclusive ? 'Net plus tax' : 'As entered', '', true)],
    t: {
      headers: ['Component', 'Amount'], numCols: 1,
      rows: [
        { cells: ['Net', PS.moneyR(net)] },
        { cells: ['Tax (' + PS.pct(v.taxRate) + ')', PS.moneyR(tax)] },
        { cells: ['Gross', PS.moneyR(gross)] }
      ],
      footer: ['Check: net + tax', PS.moneyR(net + tax)]
    },
    a: '<p>' + PS.moneyR(v.amount) + (exclusive ? ' plus ' : ' includes ') + PS.pct(v.taxRate) + ' tax: <strong>net ' + PS.moneyR(net) + ', tax ' + PS.moneyR(tax) + ', gross ' + PS.moneyR(gross) + '</strong>.</p>' +
      '<p>Always compare supplier quotes on the same basis: a lower gross can hide a higher net once recoverable and non-recoverable tax are separated. Whether this tax is recoverable decides which line the award should be ranked on.</p>',
    f: ['Exclusive: tax = net x rate; gross = net + tax',
      'Inclusive: net = gross / (1 + rate); tax = gross - net'],
    as: ['Single flat rate; mixed or exempt lines need separate treatment.',
      'Arithmetic only: applicability and recovery depend on jurisdiction and contract.'],
    w: w,
    k: ['Net ' + PS.moneyR(net) + ' + tax ' + PS.moneyR(tax) + ' = gross ' + PS.moneyR(gross),
      'Rank awards on the comparable basis for your tax position'],
    s: PS.moneyR(v.amount) + (exclusive ? ' ex-tax' : ' inc-tax') + ' at ' + PS.pct(v.taxRate) + ': net ' + PS.moneyR(net) + ', tax ' + PS.moneyR(tax) + ', gross ' + PS.moneyR(gross) + '.',
    d: { net: net, tax: tax, gross: gross }
  });
};
