/* ============ Calc narrative: TCO ============ */
PS.tcoNarrative = function (c) {
  var v = c.v, n = c.n;
  return '<p>Over ' + n + ' year' + (n === 1 ? '' : 's') + ' the asset costs <strong>' + PS.moneyR(c.tco) + '</strong> in today&rsquo;s money, or ' + PS.moneyR(c.annualised) + ' per year. Undiscounted it reads ' + PS.moneyR(c.undiscounted) + ', which overstates cost because it treats year-' + n + ' spending as if it happened today.</p>' +
    '<p>Acquisition is ' + PS.pct(c.acqShare) + ' of ownership cost and operation ' + PS.pct(c.opexShare) + '. ' +
    (c.opexShare > 40
      ? 'Because operating cost dominates, selection should hinge on energy efficiency, reliability, service cost and spares availability rather than on purchase price.'
      : 'Because acquisition dominates, negotiate price, installation, warranty and commissioning - but still model the running cost, because that is where surprises appear.') +
    (isFinite(c.perOutput) ? ' Cost per output unit is <strong>' + PS.money(c.perOutput, 2) + '</strong>, the cleanest basis for an award recommendation.' : '') + '</p>' +
    '<p>Sensitivity: at a discount rate two points higher, TCO would be ' + PS.moneyR(c.tcoAt(v.discountRate + 2)) + '; two points lower, ' + PS.moneyR(c.tcoAt(Math.max(0, v.discountRate - 2))) + '. If the ranking of offers changes across that range, the decision rests on the finance assumption rather than on the offers - say so in the business case.</p>';
};
PS.tcoFindings = function (c) {
  return ['Total cost of ownership: ' + PS.moneyR(c.tco) + ' over ' + c.n + ' years (annualised ' + PS.moneyR(c.annualised) + ')',
    'Acquisition ' + PS.pct(c.acqShare) + ' versus operation ' + PS.pct(c.opexShare) + ' of total cost',
    isFinite(c.perOutput) ? 'Cost per output unit: ' + PS.money(c.perOutput, 2) : 'Enter annual output to obtain cost per output unit'];
};