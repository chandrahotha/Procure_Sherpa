/* ============ Calc logic: Multi-Year Contract Cost ============ */
PS.calcImpl.multiyear = function (v) {
  var w = [];
  var e = v.escalationPct / 100, r = v.discountRate / 100;
  var rows = [], nominal = 0, npv = 0;
  for (var t = 1; t <= v.termYears; t++) {
    var cost = v.year1Cost * Math.pow(1 + e, t - 1);
    var pv = cost / Math.pow(1 + r, t);
    nominal += cost; npv += pv;
    rows.push({ cells: ['Year ' + t, PS.moneyR(cost), PS.moneyR(pv)] });
  }
  var lastVsFirst = v.termYears > 1 ? (Math.pow(1 + e, v.termYears - 1) - 1) * 100 : 0;
  if (e * 100 > v.discountRate && v.discountRate > 0) w.push('Escalation (' + PS.pct(v.escalationPct) + ') outruns the discount rate (' + PS.pct(v.discountRate) + '): in today money the deal gets dearer every year. Cap it or re-tender the out-years.');
  if (v.termYears > 10) w.push(v.termYears + ' years is a long time to lock pricing: add benchmarking, re-opener or termination-for-convenience rights before signing.');
  if (v.escalationPct === 0) w.push('Zero escalation assumed: confirm it is contractual, not hopeful.');
  return PS.C({
    r: [PS.res('Nominal total', PS.moneyR(nominal), 'Cash committed over ' + v.termYears + ' years', '', true),
      PS.res('Present value (NPV of cost)', PS.moneyR(npv), 'At ' + PS.pct(v.discountRate) + ' discount rate', '', true),
      PS.res('Year-1 cost', PS.moneyR(v.year1Cost), 'Starting point'),
      PS.res('Final-year cost', v.termYears > 0 ? PS.moneyR(v.year1Cost * Math.pow(1 + e, v.termYears - 1)) : '\u2014', (lastVsFirst >= 0 ? '+' : '') + PS.pct(lastVsFirst) + ' vs year 1')],
    t: {
      headers: ['Year', 'Nominal cost', 'Present value'], numCols: 2,
      rows: rows,
      footer: ['Total (' + v.termYears + ' years)', PS.moneyR(nominal), PS.moneyR(npv)]
    },
    a: '<p>The commitment totals <strong>' + PS.moneyR(nominal) + ' nominal</strong>, worth <strong>' + PS.moneyR(npv) + ' in today money</strong> at ' + PS.pct(v.discountRate) + '. Year-one pricing tells you almost nothing about a ' + v.termYears + '-year deal: the last year costs ' + PS.pct(Math.abs(lastVsFirst)) + ' ' + (lastVsFirst >= 0 ? 'more' : 'less') + ' than the first.</p>' +
      '<p>Negotiate the out-years, not just year one: caps, index-linking to a named series and re-openers move this number more than another point off the starting price.</p>',
    f: ['Year-t = year-1 x (1 + escalation)^(t-1)',
      'Nominal total = sum of yearly costs',
      'NPV = sum(year-t / (1 + discount rate)^t)'],
    as: ['Flat escalation every year; model stepped rates manually.',
      'Flat volume and scope across the term.',
      'Single discount rate for the whole term.'],
    w: w,
    k: ['Nominal commitment: ' + PS.moneyR(nominal) + ' over ' + v.termYears + ' years',
      'Present value: ' + PS.moneyR(npv) + ' at ' + PS.pct(v.discountRate),
      'Negotiate escalation mechanics, not just year-one price'],
    s: PS.moneyR(nominal) + ' nominal over ' + v.termYears + ' years (' + PS.moneyR(npv) + ' present value).',
    d: { nominal: nominal, npv: npv, yearly: rows.map(function (x) { return x.cells[1]; }) }
  });
};
