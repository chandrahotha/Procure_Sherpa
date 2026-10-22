/* ============ Calc logic: TCO ============ */
PS.calcImpl.tco = function (v) {
  var acquisition = v.unitPrice * v.qty + v.installCost;
  var annual = v.energy + v.maintenance + v.consumables + v.downtime + v.otherAnnual;
  var n = v.lifeYears, r = v.discountRate / 100;
  var factor = r > 0 ? (1 - Math.pow(1 + r, -n)) / r : n;
  var npvOpex = annual * factor;
  var disc = Math.pow(1 + r, n);
  var pvDisposal = v.disposalCost / disc, pvResidual = v.residualValue / disc;
  var tco = acquisition + npvOpex + pvDisposal - pvResidual;
  var undiscounted = acquisition + annual * n + v.disposalCost - v.residualValue;
  var annualised = n ? tco / n : tco;
  var perOutput = (v.annualOutput && n) ? tco / (v.annualOutput * n) : NaN;
  var opexShare = tco ? npvOpex / tco * 100 : 0;
  var acqShare = tco ? acquisition / tco * 100 : 0;
  function tcoAt(rate) {
    var rr = rate / 100, ff = rr > 0 ? (1 - Math.pow(1 + rr, -n)) / rr : n, dd = Math.pow(1 + rr, n);
    return acquisition + annual * ff + v.disposalCost / dd - v.residualValue / dd;
  }
  var w = [];
  if (opexShare > 50) w.push('Operating cost is ' + PS.pct(opexShare) + ' of ownership cost. Here the running cost - not the purchase price - decides which offer is cheapest. Verify energy, maintenance and downtime assumptions with the people who will operate the asset.');
  if (v.discountRate === 0) w.push('A zero discount rate treats future cost as equal to today&rsquo;s money. Use your cost of capital for a realistic comparison.');
  if (!v.annualOutput) w.push('No annual output entered, so cost per output unit could not be calculated - usually the most defensible comparison basis.');
  if (v.residualValue > v.unitPrice * v.qty) w.push('Residual value exceeds the purchase price. Confirm it is realistic: optimistic residuals routinely flatter TCO comparisons.');
  var share = function (x) { return PS.pct(tco ? x / tco * 100 : 0); };
  var ctx = { tco: tco, annualised: annualised, acquisition: acquisition, npvOpex: npvOpex, annual: annual,
    opexShare: opexShare, acqShare: acqShare, perOutput: perOutput, undiscounted: undiscounted, tcoAt: tcoAt, v: v, n: n, share: share };
  return PS.C({
    r: [PS.res('Total cost of ownership (NPV)', PS.moneyR(tco), 'Discounted at ' + PS.pct(v.discountRate, 1) + ' over ' + n + ' year' + (n === 1 ? '' : 's'), 'ok', true),
      PS.res('Annualised TCO', PS.moneyR(annualised), 'Equivalent cost per year of ownership', '', true),
      PS.res('Acquisition cost', PS.moneyR(acquisition), PS.pct(acqShare) + ' of TCO'),
      PS.res('Operating cost (NPV)', PS.moneyR(npvOpex), PS.pct(opexShare) + ' of TCO \u00B7 ' + PS.moneyR(annual) + ' per year')],
    t: {
      headers: ['Cost element', 'Amount (NPV)', 'Per year', 'Share of TCO'], numCols: 3,
      rows: [
        { cells: ['Purchase price and installation', PS.moneyR(acquisition), PS.moneyR(acquisition / n), share(acquisition)] },
        { cells: ['Energy and consumables', PS.moneyR((v.energy + v.consumables) * factor), PS.moneyR(v.energy + v.consumables), share((v.energy + v.consumables) * factor)] },
        { cells: ['Maintenance and service', PS.moneyR(v.maintenance * factor), PS.moneyR(v.maintenance), share(v.maintenance * factor)] },
        { cells: ['Downtime and other annual cost', PS.moneyR((v.downtime + v.otherAnnual) * factor), PS.moneyR(v.downtime + v.otherAnnual), share((v.downtime + v.otherAnnual) * factor)] },
        { cells: ['Disposal and residual value (net)', PS.moneyR(pvDisposal - pvResidual), PS.moneyR((pvDisposal - pvResidual) / n), share(pvDisposal - pvResidual)] }
      ],
      footer: ['Total cost of ownership', PS.moneyR(tco), PS.moneyR(annualised), '100.0%']
    },
    a: PS.tcoNarrative(ctx),
    f: ['Acquisition = (unit price x quantity) + installation and commissioning',
      'Annual operating cost = energy + maintenance + consumables + downtime + other',
      'Annuity factor = (1 - (1 + r)^-n) / r, where r = discount rate and n = life in years',
      'TCO = acquisition + (annual operating cost x annuity factor) + PV disposal - PV residual; annualised TCO = TCO / life'],
    as: ['Operating costs are incurred at the end of each year; no inflation is applied unless you build it into the annual figures.',
      'Residual value and disposal are discounted at the same rate. No tax, depreciation or financing structure is modelled - this is an economic comparison, not an accounting calculation.'],
    w: w,
    k: PS.tcoFindings(ctx),
    s: 'TCO ' + PS.moneyR(tco) + ' over ' + n + ' years (annualised ' + PS.moneyR(annualised) + '), with operating cost at ' + PS.pct(opexShare) + '.',
    d: { tco: tco, annualised: annualised, acquisition: acquisition, opexNpv: npvOpex, undiscounted: undiscounted }
  });
};