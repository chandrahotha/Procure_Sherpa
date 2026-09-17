/* ============ Calc logic: Make vs Buy ============ */
PS.calcImpl.makeBuy = function (v) {
  var makeVar = v.matCost + v.labourCost + v.overheadCost;
  var buyVar = v.buyPrice + v.buyLogistics;
  var makeTotal = v.fixedSetup + makeVar * v.volume;
  var buyTotal = buyVar * v.volume;
  var diff = buyTotal - makeTotal;
  var cheaper = diff > 0 ? 'Make in-house' : (diff < 0 ? 'Buy from supplier' : 'Dead heat');
  var status = diff > 0 ? 'ok' : (diff < 0 ? 'warn' : '');
  var be = (buyVar > makeVar && v.fixedSetup > 0) ? v.fixedSetup / (buyVar - makeVar) : NaN;
  var w = [];
  if (v.volume <= 0) w.push('Volume must be above zero for a comparison.');
  if (isFinite(be) && v.volume < be) w.push('At ' + PS.qty(v.volume) + ' units you sit below the break-even of ' + PS.qty(be) + ': buying wins until volume grows past that point.');
  if (!isFinite(be) && v.fixedSetup > 0 && buyVar <= makeVar) w.push('The supplier variable cost matches or beats yours, so buying wins at every volume: making only pays if the variable gap reverses.');
  if (!isFinite(be) && !(v.fixedSetup > 0)) w.push('With no fixed setup cost the cheaper variable cost wins at all volumes.');
  w.push('Numbers only: weigh IP protection, spare capacity, quality control and supply security alongside this result.');
  return PS.C({
    r: [PS.res('Cheaper option', cheaper, 'At ' + PS.qty(v.volume) + ' units a year', status, true),
      PS.res('Annual difference', PS.moneyR(Math.abs(diff)), (diff >= 0 ? 'Making saves ' : 'Buying saves ') + PS.moneyR(Math.abs(diff)) + ' a year', '', true),
      PS.res('Make total', PS.moneyR(makeTotal), PS.moneyR(makeVar) + ' variable + ' + PS.moneyR(v.fixedSetup) + ' fixed'),
      PS.res('Buy total', PS.moneyR(buyTotal), PS.moneyR(buyVar) + ' per unit all-in'),
      PS.res('Break-even volume', isFinite(be) ? PS.qty(be) + ' units' : '\u2014', isFinite(be) ? 'Making wins above this volume' : 'No crossing point in range')],
    t: {
      headers: ['Option', 'Variable / unit', 'Fixed', 'Annual total'], numCols: 3,
      rows: [
        { cells: ['Make in-house', PS.moneyR(makeVar), PS.moneyR(v.fixedSetup), PS.moneyR(makeTotal)] },
        { cells: ['Buy from supplier', PS.moneyR(buyVar), PS.moneyR(0), PS.moneyR(buyTotal)] }
      ],
      footer: ['Advantage', '', '', cheaper + ' by ' + PS.moneyR(Math.abs(diff))]
    },
    a: '<p>Making costs <strong>' + PS.moneyR(makeTotal) + '</strong> a year against buying at <strong>' + PS.moneyR(buyTotal) + '</strong>: <strong>' + cheaper.toLowerCase() + '</strong> by ' + PS.moneyR(Math.abs(diff)) + '.</p>' +
      '<p>' + (isFinite(be)
        ? 'The fixed setup of ' + PS.moneyR(v.fixedSetup) + ' pays back once volume passes ' + PS.qty(be) + ' units, so the decision hinges on how confident the volume forecast is.'
        : 'There is no volume at which the dearer option catches up, so the decision rests on cost confidence and the strategic factors below.') +
      ' Re-run this with pessimistic volumes before committing to fixed investment.</p>',
    f: ['Make total = fixed setup + variable per unit x volume',
      'Buy total = (supplier price + logistics) x volume',
      'Break-even = fixed setup / (buy variable - make variable)'],
    as: ['Variable unit costs are treated as constant across the volume range.',
      'Setup cost is counted once against the full volume.',
      'IP, capacity, quality and security factors are not priced here.'],
    w: w,
    k: ['Make: ' + PS.moneyR(makeTotal) + ' vs buy: ' + PS.moneyR(buyTotal) + ' at ' + PS.qty(v.volume) + ' units',
      isFinite(be) ? 'Break-even at ' + PS.qty(be) + ' units' : 'No break-even in range',
      'Confirm the volume forecast before committing fixed investment'],
    s: cheaper + ' by ' + PS.moneyR(Math.abs(diff)) + ' a year at ' + PS.qty(v.volume) + ' units' + (isFinite(be) ? ' (break-even ' + PS.qty(be) + ' units).' : '.'),
    d: { makeTotal: makeTotal, buyTotal: buyTotal, diff: diff, breakeven: be }
  });
};
