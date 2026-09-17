/* ============ Calc logic: Currency / FX ============ */
PS.calcImpl.fxConvert = function (v) {
  var w = [];
  var gross = v.foreignAmount * v.exchangeRate;
  var spreadCost = gross * (v.spreadPct / 100);
  var totalCost = spreadCost + v.feeFixed;
  var net = gross - totalCost;
  var eff = v.foreignAmount !== 0 ? net / v.foreignAmount : NaN;
  var drag = gross !== 0 ? totalCost / gross * 100 : NaN;
  if (v.spreadPct > 3) w.push('A ' + PS.pct(v.spreadPct) + ' spread is expensive money: get a competing quote from a second dealer or a specialist before dealing.');
  if (v.feeFixed > 0 && gross > 0 && v.feeFixed / gross > 0.02) w.push('The fixed fee alone eats ' + PS.pct(v.feeFixed / gross * 100) + ' of this conversion: batch smaller payments or renegotiate the fee.');
  if (v.exchangeRate <= 0) w.push('The rate must be above zero and in the stated direction (home currency per 1 foreign).');
  return PS.C({
    r: [PS.res('Net received (home)', PS.moneyR(net), 'After spread and fee', '', true),
      PS.res('Effective rate', isFinite(eff) ? PS.qty(eff) : '\u2014', 'Quoted ' + PS.qty(v.exchangeRate), '', true),
      PS.res('Total conversion cost', PS.moneyR(totalCost), isFinite(drag) ? PS.pct(drag) + ' of gross' : ''),
      PS.res('Gross at quoted rate', PS.moneyR(gross), 'Before costs')],
    t: {
      headers: ['Line', 'Amount'], numCols: 1,
      rows: [
        { cells: ['Foreign amount', PS.moneyR(v.foreignAmount)] },
        { cells: ['Gross at ' + PS.qty(v.exchangeRate), PS.moneyR(gross)] },
        { cells: ['Less spread (' + PS.pct(v.spreadPct) + ')', PS.moneyR(spreadCost)] },
        { cells: ['Less fixed fee', PS.moneyR(v.feeFixed)] },
        { cells: ['Net received', PS.moneyR(net)] }
      ],
      footer: ['Effective rate', isFinite(eff) ? PS.qty(eff) : '\u2014']
    },
    a: '<p>' + PS.moneyR(v.foreignAmount) + ' at ' + PS.qty(v.exchangeRate) + ' converts to <strong>' + PS.moneyR(net) + ' net</strong> after ' + PS.moneyR(totalCost) + ' of spread and fees — an effective rate of <strong>' + (isFinite(eff) ? PS.qty(eff) : '—') + '</strong>.</p>' +
      '<p>Compare dealers on the effective rate for your exact amount, never on the spread quote alone: wide spreads hide in round numbers and fixed fees punish small tickets. For recurring flows, fix the conversion mechanics in the contract instead of re-shopping every payment.</p>',
    f: ['Gross home = foreign x rate',
      'Spread cost = gross x spread %; total cost = spread + fee',
      'Net = gross - total cost; effective rate = net / foreign'],
    as: ['Entered rate is the dealt rate for the value date.',
      'Rate movement between quote and settlement is not modelled.'],
    w: w,
    k: ['Net ' + PS.moneyR(net) + ' at effective rate ' + (isFinite(eff) ? PS.qty(eff) : '—'),
      'Conversion drag: ' + (isFinite(drag) ? PS.pct(drag) : '—') + ' (' + PS.moneyR(totalCost) + ')',
      'Compare dealers on effective rate for the exact amount'],
    s: PS.moneyR(v.foreignAmount) + ' converts to ' + PS.moneyR(net) + ' net at effective rate ' + (isFinite(eff) ? PS.qty(eff) : '—') + ' (cost ' + PS.moneyR(totalCost) + ').',
    d: { gross: gross, spreadCost: spreadCost, totalCost: totalCost, net: net, effRate: eff }
  });
};
