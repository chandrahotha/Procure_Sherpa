/* ============ Calc logic: KPI Quick Calculator ============ */
PS.calcImpl.kpiQuick = function (v) {
  var w = [];
  var higher = String(v.kpiDirection || '').indexOf('Higher') >= 0;
  var denom = higher ? v.target : v.actual;
  var achievement = denom !== 0 ? (higher ? v.actual / v.target : v.target / v.actual) * 100 : NaN;
  var gap = v.actual - v.target;
  var trend = v.actual - v.priorPeriod;
  var rag = !isFinite(achievement) ? ['No result', ''] :
    achievement >= 100 ? ['Green — on target', 'ok'] :
    achievement >= 95 ? ['Amber — within 5%', 'warn'] : ['Red — off target', 'danger'];
  if (!isFinite(achievement)) w.push('Achievement needs non-zero readings on the correct side of the direction. Check target and actual.');
  if (isFinite(trend) && trend !== 0) {
    var improving = higher ? trend > 0 : trend < 0;
    w.push(improving
      ? 'Trend is improving (' + (trend > 0 ? '+' : '') + PS.qty(trend) + ' points vs prior period): hold the actions driving it.'
      : 'Trend is deteriorating (' + (trend > 0 ? '+' : '') + PS.qty(trend) + ' points vs prior period): a green snapshot over a red trend is still a problem.');
  }
  if (rag[0].charAt(0) === 'R') w.push('Off-target KPIs need a named owner, a dated recovery plan and a review date — not just a red cell in a pack.');
  var name = v.kpiName || 'KPI';
  return PS.C({
    r: [PS.res('Status', rag[0], name, rag[1], true),
      PS.res('Achievement', isFinite(achievement) ? PS.pct(achievement) : '\u2014', 'Against target ' + PS.qty(v.target), '', true),
      PS.res('Gap to target', (gap >= 0 ? '+' : '') + PS.qty(gap) + ' points', higher ? 'Higher is better' : 'Lower is better'),
      PS.res('Trend vs prior', (trend >= 0 ? '+' : '') + PS.qty(trend) + ' points', 'Prior reading ' + PS.qty(v.priorPeriod))],
    t: {
      headers: ['Reading', 'Value'], numCols: 1,
      rows: [
        { cells: ['Actual', PS.qty(v.actual)] },
        { cells: ['Target', PS.qty(v.target)] },
        { cells: ['Prior period', PS.qty(v.priorPeriod)] },
        { cells: ['Gap to target', (gap >= 0 ? '+' : '') + PS.qty(gap)] }
      ],
      footer: ['Achievement', isFinite(achievement) ? PS.pct(achievement) : '\u2014']
    },
    a: '<p><strong>' + PS.esc(name) + '</strong> reads ' + PS.qty(v.actual) + ' against a target of ' + PS.qty(v.target) + ': <strong>' + (isFinite(achievement) ? PS.pct(achievement) + ' achievement (' + rag[0].toLowerCase() + ')' : 'no computable achievement') + '</strong>, with a trend of ' + (trend >= 0 ? '+' : '') + PS.qty(trend) + ' points.</p>' +
      '<p>Report the direction, the gap and the trend together — achievement alone rewards sandbagged targets, and a single green month proves nothing without the run behind it.</p>',
    f: ['Higher-better: achievement = actual / target x 100',
      'Lower-better: achievement = target / actual x 100',
      'Gap = actual - target; trend = actual - prior'],
    as: ['Direction must be set correctly or the RAG inverts.',
      'Bands (100% / 95%) are working defaults, not policy.',
      'Single readings need their trend alongside.'],
    w: w,
    k: [name + ': ' + (isFinite(achievement) ? PS.pct(achievement) : '—') + ' (' + rag[0].toLowerCase() + ')',
      'Gap ' + (gap >= 0 ? '+' : '') + PS.qty(gap) + ' points; trend ' + (trend >= 0 ? '+' : '') + PS.qty(trend) + ' points',
      rag[0].charAt(0) === 'R' ? 'Assign owner, recovery plan and review date' : 'Hold the actions behind the trend'],
    s: name + ': ' + (isFinite(achievement) ? PS.pct(achievement) : '—') + ' of target (' + rag[0].toLowerCase() + '), trend ' + (trend >= 0 ? '+' : '') + PS.qty(trend) + ' points.',
    d: { achievement: achievement, gap: gap, trend: trend, rag: rag[0] }
  });
};
