/* ============ Calc logic: Payment Terms ============ */
PS.calcImpl.paymentTerms = function (v) {
  var deltaDays = v.proposedDays - v.currentDays;
  var released = v.annualSpend * deltaDays / 365;
  var termsValue = released * (v.costOfCapital / 100);
  var discountValue = v.annualSpend * (v.discountPct / 100);
  var d = v.discountPct / 100;
  var window = v.netDays - v.discountDays;
  var effectiveRate = (d > 0 && window > 0) ? (d / (1 - d)) * (365 / window) * 100 : NaN;
  var dailySpend = v.annualSpend / 365;
  var earlyCost = dailySpend * v.discountDays * (v.costOfCapital / 100);
  var netDiscount = discountValue - earlyCost;
  var bestOption = Math.max(termsValue, isFinite(netDiscount) ? netDiscount : -Infinity, 0);
  var w = [];
  if (v.annualSpend === 0) w.push('Annual spend is zero, so terms and discounts have no measurable value: both depend on spend multiplied by days.');
  if (window <= 0 && d > 0) w.push('The discount window is longer than the payable period, which is not a meaningful discount. Check the days entered.');
  if (isFinite(effectiveRate) && effectiveRate > v.costOfCapital && v.costOfCapital > 0) w.push('The implicit annual rate of this discount is ' + PS.pct(effectiveRate) + ', above your cost of capital of ' + PS.pct(v.costOfCapital) + ': taking it is better than holding the cash, if the cash is available.');
  if (isFinite(effectiveRate) && effectiveRate < v.costOfCapital && v.costOfCapital > 0) w.push('The implicit annual rate of the discount (' + PS.pct(effectiveRate) + ') is below your cost of capital (' + PS.pct(v.costOfCapital) + '), so holding the cash for the full period is financially better unless the discount matters strategically.');
  return PS.C({
    r: [PS.res('Cash released by the terms change', PS.moneyR(released), (deltaDays >= 0 ? '+' : '') + deltaDays + ' days on ' + PS.moneyR(v.annualSpend) + ' of annual spend', 'ok', true),
      PS.res('Annual value of extended terms', PS.moneyR(termsValue), 'Valued at a ' + PS.pct(v.costOfCapital, 1) + ' cost of capital', '', true),
      PS.res('Value of the early-payment discount', PS.moneyR(discountValue), 'Net of the funding cost of paying early: ' + PS.moneyR(isFinite(netDiscount) ? netDiscount : 0)),
      PS.res('Effective annual rate of the discount', isFinite(effectiveRate) ? PS.pct(effectiveRate) : '\u2014', 'Compare directly with your cost of capital')],
    t: {
      headers: ['Option', 'Value / cash effect', 'Days of credit'], numCols: 1,
      rows: [
        { cells: ['Current terms', PS.moneyR(v.annualSpend) + ' of spend at ' + v.currentDays + ' days', String(v.currentDays)] },
        { cells: ['Proposed terms', PS.moneyR(released) + ' released, worth ' + PS.moneyR(termsValue) + ' a year', String(v.proposedDays)] },
        { cells: ['Take the ' + PS.pct(v.discountPct) + ' discount', PS.moneyR(discountValue) + ' a year, less ' + PS.moneyR(earlyCost) + ' funding cost', String(v.discountDays)] }
      ],
      footer: ['Best financial option', PS.moneyR(bestOption), isFinite(effectiveRate) && effectiveRate > v.costOfCapital ? 'Take the discount if cash allows' : 'Prefer the terms change']
    },
    a: '<p>Moving from ' + v.currentDays + ' to ' + v.proposedDays + ' days releases <strong>' + PS.moneyR(released) + '</strong> of cash, worth ' + PS.moneyR(termsValue) + ' a year at your cost of capital. That is a working-capital effect, not a saving: the money is still owed, it is simply held longer.</p>' +
      '<p>' + (isFinite(effectiveRate)
        ? 'The early-payment discount is worth ' + PS.moneyR(discountValue) + ' a year but costs ' + PS.moneyR(earlyCost) + ' of funding, an implicit annual rate of <strong>' + PS.pct(effectiveRate) + '</strong>. Compare that with your cost of capital: the higher number wins on cash economics.'
        : 'No valid discount was entered, so only the terms position is valued.') +
      ' Two cautions: suppliers often price extended terms back into the rate, and long terms can damage small but critical suppliers - which becomes a supply risk, not a payment issue.</p>',
    f: ['Cash released = annual spend x (proposed days - current days) / 365',
      'Annual value = cash released x cost of capital %',
      'Discount value = annual spend x discount %',
      'Effective annual discount rate = (d / (1 - d)) x (365 / (net days - discount days))'],
    as: ['A 365-day year is assumed; some markets use 360 days for discount calculations.',
      'The cost of capital is your own figure. No tax, FX or financing arrangement is modelled.'],
    w: w,
    k: ['Cash released: ' + PS.moneyR(released) + ' (annual value ' + PS.moneyR(termsValue) + ' at ' + PS.pct(v.costOfCapital, 1) + ')',
      isFinite(effectiveRate) ? 'Effective annual rate of the discount: ' + PS.pct(effectiveRate) + ' against cost of capital ' + PS.pct(v.costOfCapital) : 'No valid discount to assess',
      'Report terms changes as working capital, not as savings'],
    s: 'A move to ' + v.proposedDays + ' days releases ' + PS.moneyR(released) + ' of cash worth ' + PS.moneyR(termsValue) + ' a year' +
      (isFinite(effectiveRate) ? '; the discount carries an implicit annual rate of ' + PS.pct(effectiveRate) + '.' : '.'),
    d: { released: released, termsValue: termsValue, discountValue: discountValue, effectiveRate: effectiveRate }
  });
};