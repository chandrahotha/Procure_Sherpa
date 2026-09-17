/* ============ Calc logic: Supplier Scorecard ============ */
PS.calcImpl.scorecard = function (v) {
  var crit = [
    { k: 'Quality', w: v.wQuality, a: v.aQuality, b: v.bQuality },
    { k: 'Delivery', w: v.wDelivery, a: v.aDelivery, b: v.bDelivery },
    { k: 'Price', w: v.wPrice, a: v.aPrice, b: v.bPrice },
    { k: 'Service', w: v.wService, a: v.aService, b: v.bService },
    { k: 'Risk', w: v.wRisk, a: v.aRisk, b: v.bRisk }
  ];
  var w = [];
  var sumW = crit.reduce(function (t, c) { return t + (isFinite(c.w) && c.w > 0 ? c.w : 0); }, 0);
  if (!(sumW > 0)) w.push('All weights are zero: scores cannot be weighted. Give the criteria some relative importance.');
  if (isFinite(sumW) && sumW > 0 && Math.abs(sumW - 100) > 0.001) w.push('Weights sum to ' + PS.qty(sumW) + ', not 100: scores are normalised, so only the ratios matter.');
  function total(get) {
    if (!(sumW > 0)) return NaN;
    return crit.reduce(function (t, c) { return t + c.w * get(c); }, 0) / sumW;
  }
  var tA = total(function (c) { return c.a; }), tB = total(function (c) { return c.b; });
  var margin = (isFinite(tA) && isFinite(tB)) ? tA - tB : NaN;
  var winner = !isFinite(margin) ? 'No result' : (margin > 0.005 ? 'Supplier A' : (margin < -0.005 ? 'Supplier B' : 'Dead heat'));
  var decRows = crit.map(function (c) {
    var lead = c.a > c.b ? 'A +' + (c.a - c.b) : (c.b > c.a ? 'B +' + (c.b - c.a) : 'Tie');
    return { cells: [c.k, String(c.w) + '%', String(c.a), String(c.b), lead] };
  });
  if (isFinite(margin) && Math.abs(margin) < 0.2) w.push('The margin is under 0.2 points: this is a tie in practical terms. Decide on price, risk or references, and sensitivity-check one weight change.');
  var swing = crit.slice().sort(function (x, y) { return (y.w * Math.abs(y.a - y.b)) - (x.w * Math.abs(x.a - x.b)); })[0];
  return PS.C({
    r: [PS.res('Recommended', winner, isFinite(margin) ? 'Margin ' + PS.qty(Math.abs(margin)) + ' points' : 'Check the inputs', winner === 'No result' ? 'danger' : 'ok', true),
      PS.res('Supplier A total', isFinite(tA) ? PS.qty(tA) : '\u2014', 'Weighted out of 5', '', true),
      PS.res('Supplier B total', isFinite(tB) ? PS.qty(tB) : '\u2014', 'Weighted out of 5', '', true),
      PS.res('Decisive criterion', swing ? swing.k : '\u2014', swing ? 'Largest weighted gap' : '')],
    t: {
      headers: ['Criterion', 'Weight', 'A', 'B', 'Leads'], numCols: 4,
      rows: decRows,
      footer: ['Weighted total', PS.qty(sumW) + '%', isFinite(tA) ? PS.qty(tA) : '\u2014', isFinite(tB) ? PS.qty(tB) : '\u2014', winner]
    },
    a: '<p><strong>' + winner + '</strong>' + (isFinite(margin) ? ' leads by ' + PS.qty(Math.abs(margin)) + ' points (' + PS.qty(tA) + ' vs ' + PS.qty(tB) + ')' : '') + '. The contest was decided mainly on <strong>' + (swing ? swing.k.toLowerCase() : 'no single criterion') + '</strong>, where the weighted gap is widest.</p>' +
      '<p>Before awarding, evidence the two or three scores that swung it and confirm the loser was scored by the same people on the same evidence. A scorecard nobody challenges in moderation is just arithmetic cover for a decision already made.</p>',
    f: ['Weighted total = sum(weight x score) / sum(weights), scale 1-5'],
    as: ['Scores are evidenced judgements, not measurements: garbage scores in, gospel numbers out.',
      'Weights express relative importance and are normalised automatically.'],
    w: w,
    k: ['Supplier A ' + (isFinite(tA) ? PS.qty(tA) : '—') + ' vs supplier B ' + (isFinite(tB) ? PS.qty(tB) : '—') + ': ' + winner,
      'Decisive criterion: ' + (swing ? swing.k : '—'),
      'Evidence the swinging scores before award'],
    s: winner + ' (' + (isFinite(tA) ? PS.qty(tA) : '—') + ' vs ' + (isFinite(tB) ? PS.qty(tB) : '—') + '), decided on ' + (swing ? swing.k : 'no criterion') + '.',
    d: { totalA: tA, totalB: tB, margin: margin, winner: winner }
  });
};
