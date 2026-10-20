/* ============ Calc logic: Budget vs Actual ============ */
PS.calcImpl.budgetActual = function (v) {
  var w = [];
  var expected = v.annualBudget * v.monthsElapsed / 12;
  var variance = v.actualToDate - expected;
  var varPct = expected !== 0 ? variance / expected * 100 : (variance === 0 ? 0 : NaN);
  var forecast = v.monthsElapsed > 0 ? v.actualToDate / v.monthsElapsed * 12 : NaN;
  var forecastVar = isFinite(forecast) ? forecast - v.annualBudget : NaN;
  var forecastPct = v.annualBudget !== 0 && isFinite(forecastVar) ? forecastVar / v.annualBudget * 100 : NaN;
  var burn = v.monthsElapsed > 0 ? v.actualToDate / v.monthsElapsed : NaN;
  var av = isFinite(varPct) ? Math.abs(varPct) : NaN;
  var status = !isFinite(av) ? ['', ''] : av <= 3 ? ['On track', 'ok'] : av <= 7 ? ['Watch', 'warn'] : ['At risk', 'danger'];
  if (v.priorYear > 0 && isFinite(forecast)) {
    var vsPrior = (forecast - v.priorYear) / v.priorYear * 100;
    if (vsPrior > 5) w.push('The run-rate points ' + PS.pct(vsPrior) + ' above last year (' + PS.moneyR(v.priorYear) + '): confirm whether growth is demand-driven or price-driven before explaining it away.');
  }
  if (status[0] === 'At risk') w.push('Forecast overspend of ' + PS.moneyR(Math.abs(forecastVar)) + ': freeze discretionary spend, re-phase planned buys and reforecast with budget-holder sign-off.');
  else if (status[0] === 'Watch') w.push('Drift, not disaster yet: identify the two or three lines driving the variance before month-end.');
  if (v.monthsElapsed >= 12 && variance > 0) w.push('The year is closed and spend finished above budget: record the cause so next year budgets from evidence, not hope.');
  return PS.C({
    r: [PS.res('Budget status', status[0] || '\u2014', isFinite(varPct) ? PS.pct(Math.abs(varPct)) + ' off pro-rata' : '', status[1], true),
      PS.res('Variance to date', (variance >= 0 ? '+' : '') + PS.moneyR(variance), 'Against ' + PS.moneyR(expected) + ' expected', variance > 0 ? 'warn' : 'ok', true),
      PS.res('Forecast outturn', PS.moneyR(forecast), isFinite(forecastPct) ? (forecastPct >= 0 ? '+' : '') + PS.pct(forecastPct) + ' vs budget' : ''),
      PS.res('Monthly burn rate', PS.moneyR(burn), PS.moneyR(v.actualToDate) + ' over ' + v.monthsElapsed + ' months')],
    t: {
      headers: ['Measure', 'Amount', 'Vs budget'], numCols: 1,
      rows: [
        { cells: ['Annual budget', PS.moneyR(v.annualBudget), '\u2014'] },
        { cells: ['Expected after ' + v.monthsElapsed + ' months', PS.moneyR(expected), '\u2014'] },
        { cells: ['Actual to date', PS.moneyR(v.actualToDate), (variance >= 0 ? '+' : '') + PS.moneyR(variance)] },
        { cells: ['Forecast outturn', PS.moneyR(forecast), isFinite(forecastVar) ? (forecastVar >= 0 ? '+' : '') + PS.moneyR(forecastVar) : '\u2014'] },
        { cells: ['Prior full year', v.priorYear > 0 ? PS.moneyR(v.priorYear) : 'Unknown', v.priorYear > 0 && isFinite(forecast) ? (forecast - v.priorYear >= 0 ? '+' : '') + PS.moneyR(forecast - v.priorYear) : '\u2014'] }
      ],
      footer: ['Headroom / overhang', isFinite(forecastVar) ? PS.moneyR(-forecastVar) : '\u2014', status[0]]
    },
    a: '<p>After ' + v.monthsElapsed + ' months, spend is <strong>' + (variance >= 0 ? '' : '') + PS.moneyR(Math.abs(variance)) + ' ' + (variance >= 0 ? 'over' : 'under') + ' pro-rata (' + (isFinite(varPct) ? PS.pct(Math.abs(varPct)) : ': ') + ')</strong>, and the run-rate forecasts <strong>' + PS.moneyR(forecast) + '</strong> against a ' + PS.moneyR(v.annualBudget) + ' budget: status <strong>' + (status[0] || 'unknown') + '</strong>.</p>' +
      '<p>Before reacting, split the variance into price, volume and phasing. Phasing reverses by itself, volume needs a demand conversation, and only price is procurement performance. Acting on the total without the split punishes the wrong cause.</p>',
    f: ['Expected to date = budget x months elapsed / 12',
      'Variance = actual - expected; variance % = variance / expected',
      'Forecast = actual / months elapsed x 12'],
    as: ['Budget is spread evenly across months: apply manual phasing for seasonal spend.',
      'The forecast extends today run-rate; known step-changes are not modelled.',
      'Status bands are early-warning defaults, not policy.'],
    w: w,
    k: ['To date: ' + PS.moneyR(v.actualToDate) + ' vs ' + PS.moneyR(expected) + ' expected (' + (isFinite(varPct) ? (varPct >= 0 ? '+' : '') + PS.pct(varPct) : ': ') + ')',
      'Forecast outturn: ' + PS.moneyR(forecast) + ' :  ' + (status[0] || 'unknown').toLowerCase(),
      'Split variance into price, volume and phasing before acting'],
    s: 'Spend is ' + PS.moneyR(Math.abs(variance)) + ' ' + (variance >= 0 ? 'over' : 'under') + ' pro-rata; run-rate forecasts ' + PS.moneyR(forecast) + ' (' + (status[0] || 'unknown').toLowerCase() + ').',
    d: {
      /* A favourable variance is a saving signal, and an overspend is a
         cost-avoidance gap. Both belong on the savings dashboard, or
         the dashboard only ever shows negotiated savings and never the
         money the budget position itself revealed. */
      initiatives: [{
        name: 'Budget position',
        baseline: v.annualBudget, newCost: isFinite(forecast) ? forecast : v.annualBudget,
        savings: variance < 0 ? -variance : 0,
        avoidance: variance > 0 ? variance : 0,
        category: 'Budget control',
        supplier: 'Portfolio',
        kind: variance < 0 ? 'Savings' : 'Cost avoidance'
      }],
      variance: variance, varPct: varPct, forecast: forecast, forecastVar: forecastVar, status: status[0]
    }
  });
};
