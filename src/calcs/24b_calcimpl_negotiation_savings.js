/* ============ Calc logic: Negotiation Savings ============ */
PS.calcImpl.negotiationSavings = function (v) {
  var type = v.baselineType || 'Last_paid_price';
  var perUnit = v.baselinePrice - v.negotiatedPrice;
  var annual = perUnit * v.annualVolume;
  var recurring = annual * v.years;
  var total = recurring + v.oneOffBenefits - v.implementationCost;
  var pctSave = v.baselinePrice ? perUnit / v.baselinePrice * 100 : 0;
  var firstYear = annual + v.oneOffBenefits - v.implementationCost;
  var payback = annual > 0 ? v.implementationCost / annual : NaN;
  var w = [];
  if (perUnit < 0) w.push('The negotiated price is above the baseline. This is a price increase or a different specification - report it as such rather than as negative savings.');
  if (v.oneOffBenefits > annual && annual > 0) w.push('One-off benefits exceed the annual recurring saving. Do not quote the total as an annual run-rate: report the recurring saving separately so the figure remains credible in later years.');
  if (pctSave > 30) w.push('A reduction of ' + PS.pct(pctSave) + ' against baseline is large. Confirm the baseline was genuinely achievable, that specifications are unchanged, and that the price is sustainable beyond the first term.');
  if (v.baselineType === 'Market_benchmark') w.push('A market benchmark baseline is the most challenged in validation. Document the source, date and comparability of the benchmark.');
  var rows = [];
  var maxYears = Math.min(v.years, 10);
  for (var y = 1; y <= maxYears; y++) {
    var ySaving = annual + (y === 1 ? v.oneOffBenefits - v.implementationCost : 0);
    rows.push({ cells: ['Year ' + y, PS.moneyR(annual), y === 1 ? PS.moneyR(v.oneOffBenefits - v.implementationCost) : '\u2014', PS.moneyR(ySaving)] });
  }
  if (v.years > maxYears) rows.push({ cells: ['Years ' + (maxYears + 1) + '-' + v.years, PS.moneyR(annual * (v.years - maxYears)), '\u2014', PS.moneyR(annual * (v.years - maxYears))] });
  return PS.C({
    r: [PS.res('Annual recurring saving', PS.moneyR(annual), PS.money(perUnit, 2) + ' per unit at ' + PS.qty(v.annualVolume) + ' per year', 'ok', true),
      PS.res('Total value over ' + v.years + ' year' + (v.years === 1 ? '' : 's'), PS.moneyR(total), 'Including one-offs and implementation cost', '', true),
      PS.res('Savings against baseline', PS.pct(pctSave), 'Baseline: ' + type.replace(/_/g, ' ') + ' at ' + PS.money(v.baselinePrice, 2)),
      PS.res('First-year cash effect', PS.moneyR(firstYear), isFinite(payback) && v.implementationCost > 0 ? 'Implementation recovered in ' + PS.round(payback, 2) + ' years of saving' : 'Implementation cost ' + PS.moneyR(v.implementationCost))],
    t: {
      headers: ['Period', 'Recurring saving', 'One-off items', 'Total'], numCols: 3,
      rows: rows,
      footer: ['Total', PS.moneyR(recurring), PS.moneyR(v.oneOffBenefits - v.implementationCost), PS.moneyR(total)]
    },
    a: '<p>The negotiation produces a recurring saving of <strong>' + PS.moneyR(annual) + ' per year</strong> (' + PS.pct(pctSave) + ' against the ' + PS.esc(String(type).replace(/_/g, ' ').toLowerCase()) + ' baseline), or ' + PS.moneyR(total) + ' across ' + v.years + ' year' + (v.years === 1 ? '' : 's') + ' including one-off items.</p>' +
      '<p>Report the recurring saving and the one-off benefits separately. Recurring savings persist and can be tracked year on year; one-off benefits (free tooling, credits, training) land once and must not be presented as an annual run-rate. ' +
      (v.implementationCost > 0 ? 'Implementation cost of ' + PS.moneyR(v.implementationCost) + ' is a real cost of the change and belongs in the savings report. ' : '') +
      'Savings and cost avoidance are different things: if this deal prevented an increase that was never budgeted, it is cost avoidance, and it should be labelled that way.</p>' +
      '<p>Validation will ask three questions: what exactly was the baseline, was it agreed before the negotiation started, and can the volumes be evidenced. Have the answers ready before the number is published.</p>',
    f: ['Saving per unit = baseline unit price - negotiated unit price',
      'Annual saving = saving per unit x annual volume',
      'Total value = (annual saving x contract years) + one-off benefits - implementation cost',
      'Savings % = (baseline - negotiated) / baseline x 100'],
    as: ['The baseline is the price you select, not a market index: changing the baseline changes the saving.',
      'Volumes are assumed to be as entered for every year of the contract and no indexation is applied.',
      'Implementation cost is deducted once, in year one.'],
    w: w,
    k: ['Recurring annual saving: ' + PS.moneyR(annual) + ' (' + PS.pct(pctSave) + ' against baseline)',
      'Total value over the term: ' + PS.moneyR(total),
      'Report recurring and one-off elements separately; classify savings versus cost avoidance explicitly'],
    s: 'Negotiation saving ' + PS.moneyR(annual) + ' per year (' + PS.pct(pctSave) + ' against baseline), ' + PS.moneyR(total) + ' across the term.',
    d: { initiatives: [{ name: (PS.prefs().orgName ? PS.prefs().orgName + ' ' : '') + 'Negotiation saving', baseline: v.baselinePrice * v.annualVolume, newCost: v.negotiatedPrice * v.annualVolume, savings: annual, avoidance: 0, category: v.category || 'Negotiated savings', supplier: v.supplier || 'Unspecified supplier', kind: 'Savings' }], annual: annual, total: total, baselineType: type }
  });
};