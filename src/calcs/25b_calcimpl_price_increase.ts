/* ============ Calc logic: Price Increase ============ */
PS.calcImpl.priceIncrease = function (v) {
  var perUnit = v.newPrice - v.currentPrice;
  var incPct = v.currentPrice ? perUnit / v.currentPrice * 100 : 0;
  var annual = perUnit * v.annualVolume;
  var justifiedUnit = v.currentPrice * (v.indexRate / 100);
  var justified = Math.max(0, Math.min(perUnit, justifiedUnit));
  var unjustified = perUnit - justified;
  var unjustifiedAnnual = unjustified * v.annualVolume;
  var justifiedAnnual = justified * v.annualVolume;
  var newSpend = v.newPrice * v.annualVolume;
  var currentSpend = v.currentPrice * v.annualVolume;
  var target = v.currentPrice + justified;
  var targetSaving = unjustified * v.annualVolume;
  var w = [];
  if (perUnit <= 0) w.push('The new price is not higher than the current price. This is a reduction or an unchanged price - use the Negotiation Savings tool instead.');
  if (!v.contractAllows && perUnit > 0) w.push('Your contract is marked as not permitting a price change. Check the price, escalation and variation clauses before responding: an increase may be a contractual matter, not a commercial negotiation.');
  if (v.justifyType === 'No_evidence' && perUnit > 0) w.push('No cost evidence was provided. Ask for the cost drivers behind the increase (material, labour, energy, freight, currency) before discussing any change.');
  if (v.justifyType === 'Index_reference_only') w.push('An index reference alone does not prove this product&rsquo;s cost moved by that amount. Verify the index, the base period and whether it actually applies to this material or service.');
  if (incPct > 15) w.push('An increase of ' + PS.pct(incPct) + ' is large. Request a full cost breakdown, compare against alternatives and cost the switching option before agreeing.');
  return PS.C({
    r: [PS.res('Price increase', PS.pct(incPct), PS.money(perUnit, 2) + ' per unit on ' + PS.money(v.currentPrice, 2), incPct > 10 ? 'warn' : '', true),
      PS.res('Annual cost impact', PS.moneyR(annual), 'Additional annual spend at the requested price', '', true),
      PS.res('Justifiable element', PS.moneyR(justifiedAnnual), 'At the ' + PS.pct(v.indexRate) + ' index movement you accept'),
      PS.res('Negotiation target', PS.moneyR(unjustifiedAnnual), 'Unjustified element to challenge \u00B7 target unit price ' + PS.money(target, 2), 'ok')],
    t: {
      headers: ['Position', 'Unit price', 'Annual spend', 'Difference to current'], numCols: 2,
      rows: [
        { cells: ['Current price', PS.money(v.currentPrice, 2), PS.moneyR(currentSpend), '\u2014'] },
        { cells: ['Index-based position at ' + PS.pct(v.indexRate), PS.money(target, 2), PS.moneyR(target * v.annualVolume), '+' + PS.moneyR(justifiedAnnual)] },
        { cells: ['Supplier request', PS.money(v.newPrice, 2), PS.moneyR(newSpend), '+' + PS.moneyR(annual)] },
        { cells: ['Gap between request and index position', PS.money(unjustified, 2), PS.moneyR(unjustifiedAnnual), '+' + PS.moneyR(unjustifiedAnnual)] }
      ],
      footer: ['Negotiation range', PS.money(target, 2) + ' to ' + PS.money(v.newPrice, 2), PS.moneyR(target * v.annualVolume) + ' to ' + PS.moneyR(newSpend), PS.moneyR(unjustifiedAnnual)]
    },
    a: '<p>The request is a <strong>' + PS.pct(incPct) + ' increase</strong>, worth ' + PS.moneyR(annual) + ' a year at current volumes. Of that, ' + PS.moneyR(justifiedAnnual) + ' is defensible against the index movement you accept and <strong>' + PS.moneyR(unjustifiedAnnual) + '</strong> is not.</p>' +
      '<p>Approach this as a validation exercise rather than a rejection. Ask for the cost build-up, test the material, labour, energy and freight elements against what you can verify, and ask what the supplier is doing to take cost out of the process. ' +
      'If the increase is justified, negotiate how it is applied - effective date, phasing, volume thresholds, index caps - rather than arguing about whether it happens.</p>' +
      '<p>' + (v.contractAllows ? 'Because the contract permits price changes, check the notice period and the mechanism: a permitted increase that was applied incorrectly or without notice is still challengeable.' :
        'Because the contract does not permit a price change, respond in writing and reference the clause. Commercial pressure without contractual entitlement is a request, not a right.') + '</p>',
    f: ['Increase per unit = new price - current price', 'Increase % = increase per unit / current price x 100',
      'Annual impact = increase per unit x annual volume', 'Index position = current price x (1 + index rate); gap = supplier request - index position'],
    as: ['Voume is held constant at the level entered.', 'The index rate is the one you accept as legitimate evidence, not a market data feed.',
      'No switching cost or market alternative is modelled here - use Make vs Buy or a competitive process to test the alternative.'],
    w: w,
    k: ['Increase of ' + PS.pct(incPct) + ' equals ' + PS.moneyR(annual) + ' a year',
      'Justifiable at ' + PS.pct(v.indexRate) + ': ' + PS.moneyR(justifiedAnnual),
      'Negotiation target (unjustified element): ' + PS.moneyR(unjustifiedAnnual) + ' at a target price of ' + PS.money(target, 2)],
    s: 'Price increase of ' + PS.pct(incPct) + ' (' + PS.moneyR(annual) + ' a year), of which ' + PS.moneyR(unjustifiedAnnual) + ' is not justified by the index position.',
    d: { increasePct: incPct, annualImpact: annual, justifiedAnnual: justifiedAnnual, unjustifiedAnnual: unjustifiedAnnual, targetPrice: target }
  });
};