/* ============ Calc logic: Price Escalation ============ */
PS.calcImpl.priceEscalation = function (v) {
  var rows = [], total = 0, totalUncapped = 0, totalFlat = 0;
  var maxYears = Math.min(v.years, 10);
  var applied = Math.min(v.escalationPct, v.capPct > 0 && v.capPct < v.escalationPct ? v.capPct : v.escalationPct);
  for (var y = 1; y <= maxYears; y++) {
    var n = Math.max(0, y - (v.startYear - 1));
    var uncapped = v.basePrice * Math.pow(1 + v.escalationPct / 100, n);
    var capped = v.capPct > 0 ? v.basePrice * Math.pow(1 + applied / 100, n) : uncapped;
    var price = Math.min(uncapped, capped);
    total += price * v.annualVolume;
    totalUncapped += uncapped * v.annualVolume;
    totalFlat += v.basePrice * v.annualVolume;
    rows.push({ cells: ['Year ' + y, PS.money(uncapped, 2), PS.money(price, 2), PS.moneyR(price * v.annualVolume)] });
  }
  var finalApplied, finalUncapped;
  var nEnd = Math.max(0, v.years - (v.startYear - 1));
  if (v.years > maxYears) {
    var remaining = v.years - maxYears;
    var nLast = Math.max(0, v.years - (v.startYear - 1));
    var priceLast = v.capPct > 0 ? v.basePrice * Math.pow(1 + applied / 100, nLast) : v.basePrice * Math.pow(1 + v.escalationPct / 100, nLast);
    var uncappedLast = v.basePrice * Math.pow(1 + v.escalationPct / 100, nLast);
    total += priceLast * v.annualVolume * remaining;
    totalUncapped += uncappedLast * v.annualVolume * remaining;
    totalFlat += v.basePrice * v.annualVolume * remaining;
    rows.push({ cells: ['Years ' + (maxYears + 1) + '-' + v.years, PS.money(uncappedLast, 2), PS.money(priceLast, 2), PS.moneyR(priceLast * v.annualVolume * remaining)] });
  }
  finalUncapped = v.basePrice * Math.pow(1 + v.escalationPct / 100, nEnd);
  finalApplied = v.capPct > 0 ? v.basePrice * Math.pow(1 + applied / 100, nEnd) : finalUncapped;
  var capValue = totalUncapped - total;
  var escalationCost = total - totalFlat;
  var effectiveAnnual = v.years ? Math.pow((total / v.annualVolume) / v.basePrice, 1 / v.years) - 1 : 0;
  var w = [];
  if (v.escalationPct > 8) w.push('Escalation of ' + PS.pct(v.escalationPct) + ' a year compounds quickly: over ' + v.years + ' years it adds ' + PS.moneyR(escalationCost) + '. Test whether a shorter term, a fixed-price period or a specification change would serve better.');
  if (v.capPct === 0) w.push('There is no cap on escalation. A cap is usually easier to negotiate than a lower rate, and it protects the budget against index spikes.');
  if (v.capPct > 0 && v.capPct < v.escalationPct) w.push('The ' + PS.pct(v.capPct) + ' cap reduces the requested ' + PS.pct(v.escalationPct) + ' escalation by ' + PS.moneyR(capValue) + ' over the term - usually more valuable than a small reduction in the headline rate.');
  if (v.years > 5) w.push('Beyond a five-year term, small escalation differences dominate the award decision. Compare offers on escalated total cost, not on year-one price.');
  return PS.C({
    r: [PS.res('Total contract cost to term', PS.moneyR(total), v.years + ' years at ' + PS.qty(v.annualVolume) + ' per year', 'ok', true),
      PS.res('Final-year unit price', PS.money(finalApplied, 2), 'Against a base price of ' + PS.money(v.basePrice, 2), '', true),
      PS.res('Cost of escalation', PS.moneyR(escalationCost), 'Above a fixed-price assumption of ' + PS.moneyR(totalFlat)),
      PS.res('Value of the cap', PS.moneyR(capValue), v.capPct > 0 ? 'Cap of ' + PS.pct(v.capPct) + ' against ' + PS.pct(v.escalationPct) + ' requested' : 'No cap entered')],
    t: {
      headers: ['Year', 'Price uncapped', 'Price applied', 'Annual cost'], numCols: 3, rows: rows,
      footer: ['Total to term', PS.moneyR(totalUncapped), PS.moneyR(total), 'Effective escalation ' + PS.pct(effectiveAnnual * 100, 2) + ' a year']
    },
    a: '<p>Over ' + v.years + ' year' + (v.years === 1 ? '' : 's') + ' the contract costs <strong>' + PS.moneyR(total) + '</strong> at an applied escalation of ' + PS.pct(applied) + ', ending at ' + PS.money(finalApplied, 2) + ' per unit. A fixed price would cost ' + PS.moneyR(totalFlat) + ', so escalation adds ' + PS.moneyR(escalationCost) + ' (' + PS.pct(effectiveAnnual * 100, 2) + ' a year compounded).</p>' +
      '<p>Escalation matters more than the starting price beyond a two-year term. When you review a clause, check the index referenced, whether it is capped, whether it is symmetrical, when it first applies, the notice required and whether it stacks with other increases.</p>' +
      (v.capPct > 0 && v.capPct < v.escalationPct ? '<p>A ' + PS.pct(v.capPct) + ' cap instead of ' + PS.pct(v.escalationPct) + ' is worth ' + PS.moneyR(capValue) + ' across the term. Suppliers concede caps more readily than rate reductions.</p>' : ''),
    f: ['Escalated price in year y = base price x (1 + escalation)^(y - start + 1)',
      'Capped price = base price x (1 + min(escalation, cap))^(y - start + 1)',
      'Total contract cost = sum of applied price x annual volume per year',
      'Value of the cap = total cost uncapped - total cost capped'],
    as: ['Volume is constant across the term and no volume rebate is applied.',
      'Escalation starts in the year you enter; earlier years are billed at the base price.'],
    w: w,
    k: ['Total cost to term: ' + PS.moneyR(total) + ' against ' + PS.moneyR(totalFlat) + ' at a fixed price',
      'Escalation adds ' + PS.moneyR(escalationCost) + ' (' + PS.pct(effectiveAnnual * 100, 2) + ' a year compounded)',
      v.capPct > 0 ? 'Cap value: ' + PS.moneyR(capValue) : 'No cap entered - consider negotiating one'],
    s: 'Total ' + PS.moneyR(total) + ' over ' + v.years + ' years with escalation of ' + PS.pct(applied) + (v.capPct > 0 ? ' under a ' + PS.pct(v.capPct) + ' cap' : '') + '.',
    d: { total: total, flat: totalFlat, escalationCost: escalationCost, capValue: capValue, effectiveAnnualPct: effectiveAnnual * 100 }
  });
};