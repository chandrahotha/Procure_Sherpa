/* ============ Calc logic: Savings Analysis ============ */
PS.calcImpl.savingsAnalysis = function (v) {
  var w = [];
  var gross = v.baselineAnnual - v.newAnnual;
  var grossPct = v.baselineAnnual !== 0 ? gross / v.baselineAnnual * 100 : (gross === 0 ? 0 : NaN);
  var years = v.contractMonths / 12;
  var oneOffs = v.oneOffCost + v.implementationCost;
  var termGross = gross * years;
  var net = termGross - oneOffs;
  var netAnn = years > 0 ? net / years : NaN;
  var monthly = gross / 12;
  var payback = monthly > 0 ? oneOffs / monthly : (oneOffs === 0 ? 0 : NaN);
  var status = !isFinite(grossPct) ? '' : grossPct >= 10 ? 'ok' : grossPct >= 3 ? 'warn' : grossPct >= 0 ? 'warn' : 'danger';
  if (gross < 0) w.push('The new cost sits ABOVE the baseline: this is a cost increase of ' + PS.moneyR(-gross) + ' a year, not a saving. Report it as avoidance at best, and only with finance agreement.');
  if (gross === 0) w.push('Baseline equals new cost: there is no saving to report.');
  if (isFinite(payback) && isFinite(v.contractMonths) && payback > v.contractMonths) w.push('Payback (' + PS.qty(payback) + ' months) runs past the contract term: the deal never pays for itself inside this agreement.');
  if (oneOffs > 0 && isFinite(termGross) && termGross > 0 && oneOffs / termGross > 0.5) w.push('One-off costs eat ' + PS.pct(oneOffs / termGross * 100) + ' of the term benefit: the headline saving flatters a thin net result.');
  return PS.C({
    r: [PS.res('Net saving (term)', PS.moneyR(net), 'After ' + PS.moneyR(oneOffs) + ' of one-off costs', status, true),
      PS.res('Gross annual saving', PS.moneyR(gross), isFinite(grossPct) ? PS.pct(grossPct) + ' of baseline' : '', '', true),
      PS.res('Net annualised', PS.moneyR(netAnn), 'Over ' + v.contractMonths + ' months'),
      PS.res('Payback', isFinite(payback) ? (payback < 0.05 ? 'Immediate' : PS.qty(payback) + ' months') : '\u2014', 'One-offs vs monthly benefit')],
    t: {
      headers: ['Line', 'Amount'], numCols: 1,
      rows: [
        { cells: ['Baseline annual cost', PS.moneyR(v.baselineAnnual)] },
        { cells: ['New annual cost', PS.moneyR(v.newAnnual)] },
        { cells: ['Gross annual saving', PS.moneyR(gross)] },
        { cells: ['Term gross (' + v.contractMonths + ' months)', PS.moneyR(termGross)] },
        { cells: ['Less one-off costs', PS.moneyR(oneOffs)] },
        { cells: ['Net saving (term)', PS.moneyR(net)] }
      ],
      footer: ['Net annualised', PS.moneyR(netAnn)]
    },
    a: '<p>The deal saves <strong>' + PS.moneyR(gross) + ' a year (' + (isFinite(grossPct) ? PS.pct(grossPct) : ': ') + ')</strong>, worth <strong>' + PS.moneyR(net) + ' net over ' + v.contractMonths + ' months</strong> after ' + PS.moneyR(oneOffs) + ' of one-off costs, paying back in ' + (isFinite(payback) ? PS.qty(payback) + ' months' : 'an uncomputable period') + '.</p>' +
      '<p>Report the net annualised figure (' + PS.moneyR(netAnn) + '), never the gross, and keep the baseline record attached: finance signs savings against baselines, not against enthusiasm. Track realisation in actuals, because reported savings that never land destroy the next business case.</p>',
    f: ['Gross annual = baseline annual - new annual',
      'Term gross = gross annual x years; net = term gross - one-offs',
      'Net annualised = net / years; payback = one-offs / monthly gross'],
    as: ['Baseline is taken as locked and agreed.',
      'One-offs are spread for annualisation but hit cash in year one.',
      'Flat volumes across the term are assumed.'],
    w: w,
    k: ['Gross: ' + PS.moneyR(gross) + ' a year (' + (isFinite(grossPct) ? PS.pct(grossPct) : ': ') + ')',
      'Net over term: ' + PS.moneyR(net) + ' (' + PS.moneyR(netAnn) + ' annualised)',
      'Payback: ' + (isFinite(payback) ? PS.qty(payback) + ' months' : ': ') + ' :  report net, track in actuals'],
    s: 'Net saving ' + PS.moneyR(net) + ' over ' + v.contractMonths + ' months (' + PS.moneyR(netAnn) + ' annualised), payback ' + (isFinite(payback) ? PS.qty(payback) + ' months' : ': ') + '.',
    d: {
      /* The savings dashboard reads this. Without it, a saved Savings
         Analysis produced an empty dashboard, and the dashboard's own
         empty-state text told the user to run this calculator. */
      initiatives: [{
        name: (v.supplier ? v.supplier + ' ' : '') + 'savings analysis',
        baseline: v.baselineAnnual, newCost: v.newAnnual,
        savings: gross > 0 ? gross : 0,
        avoidance: gross < 0 ? -gross : 0,
        category: v.category || 'Uncategorised savings',
        supplier: v.supplier || 'Unspecified supplier',
        kind: gross >= 0 ? 'Savings' : 'Cost avoidance'
      }],
      gross: gross, grossPct: grossPct, net: net, netAnn: netAnn, payback: payback
    }
  });
};
