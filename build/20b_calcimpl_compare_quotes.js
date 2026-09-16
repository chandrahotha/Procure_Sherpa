/* ============ Calc logic: Compare Quotes ============ */
PS.calcImpl.compareQuotes = function (v) {
  var p = PS.prefs();
  var sets = [{ key: 'a', name: 'Supplier A' }, { key: 'b', name: 'Supplier B' }, { key: 'c', name: 'Supplier C' }];
  var rows = [], warnings = [];
  sets.forEach(function (s) {
    var unit = PS.num(v[s.key + 'Price']);
    if (!isFinite(unit) || unit <= 0) return;
    var goods = unit * v.qty;
    var discount = goods * ((PS.num(v[s.key + 'Discount']) || 0) / 100);
    var net = goods - discount;
    var freight = PS.num(v[s.key + 'Freight']) || 0;
    var ins = PS.num(v.insurance) || 0;
    var duty = (net + freight + ins) * ((PS.num(v[s.key + 'Duty']) || 0) / 100);
    var tax = v.taxRecoverable ? 0 : (net + freight + ins + duty) * (p.taxRate / 100);
    var landed = net + freight + ins + duty + tax;
    rows.push({ key: s.key, name: s.name, unit: unit, goods: goods, discount: discount, freight: freight, duty: duty, tax: tax, landed: landed, unitLanded: landed / v.qty });
  });
  if (!rows.length) return { results: [{ label: 'Quotations compared', value: '0', primary: true }], analysis: '<p>Enter at least one supplier unit price to compare quotations.</p>' };
  var lowest = rows.reduce(function (a, b) { return b.landed < a.landed ? b : a; });
  var highest = rows.reduce(function (a, b) { return b.landed > a.landed ? b : a; });
  rows.forEach(function (r) {
    r.delta = r.landed - lowest.landed;
    r.deltaPct = lowest.landed ? r.delta / lowest.landed * 100 : 0;
    r.unitDelta = r.unitLanded - lowest.unitLanded;
  });
  var spread = highest.landed - lowest.landed;
  var spreadPct = lowest.landed ? spread / lowest.landed * 100 : 0;
  if (spreadPct > 25) warnings.push('The spread between lowest and highest landed cost is ' + PS.pct(spreadPct) + '. Confirm the bids cover an equivalent specification before treating it as a pure price difference.');
  if (spreadPct > 0 && spreadPct < 2) warnings.push('The offers are within 2% of each other on landed cost. Weight non-price factors heavily here: switching cost and service risk may outweigh the price difference.');
  if (!v.taxRecoverable) warnings.push('Non-recoverable tax was added to landed cost. Confirm the same tax treatment was assumed for every supplier.');
  return {
    results: [
      { label: 'Best landed cost', value: PS.moneyR(lowest.landed), primary: true, note: lowest.name + ' \u00B7 ' + PS.money(lowest.unitLanded, 2) + ' per unit', status: 'ok' },
      { label: 'Highest landed cost', value: PS.moneyR(highest.landed), primary: true, note: highest.name + ' \u00B7 ' + PS.money(highest.unitLanded, 2) + ' per unit' },
      { label: 'Spread (best to worst)', value: PS.moneyR(spread), note: PS.pct(spreadPct) + ' of the lowest offer' },
      { label: 'Unit difference at best offer', value: PS.money(lowest.unitLanded, 2), note: 'Per-unit landed cost of the best bid' }
    ],
    table: {
      headers: ['Supplier', 'Unit price', 'Goods value', 'Discount', 'Freight', 'Duty', 'Landed total', 'Per unit', 'Vs best'],
      numCols: 8,
      rows: rows.map(function (r) {
        return {
          cls: r.key === lowest.key ? 'is-best' : '',
          cells: [r.name, PS.money(r.unit, 2), PS.moneyR(r.goods), PS.money(r.discount), PS.money(r.freight), PS.money(r.duty),
            PS.moneyR(r.landed), PS.money(r.unitLanded, 2), (r.delta === 0 ? '\u2014' : '+' + PS.moneyR(r.delta) + ' (' + PS.pct(r.deltaPct) + ')')]
        };
      })
    },
    analysis: '<p><strong>' + PS.esc(lowest.name) + '</strong> has the lowest landed cost at ' + PS.moneyR(lowest.landed) +
      ', which is ' + PS.money(lowest.unitLanded, 2) + ' per unit. The gap to the most expensive offer is ' + PS.moneyR(spread) + ' (' + PS.pct(spreadPct) + ').</p>' +
      '<p>That gap is your negotiating space, not yet a saving: the same specification, warranty, spares availability and service response must be confirmed for each bid before the comparison is treated as commercial equivalence. ' +
      'Where the offers are close on cost, weight delivery reliability, quality history and switching effort instead of pressing for the last fraction of price.</p>' +
      (v.taxRecoverable
        ? '<p>Recoverable purchase tax was displayed but excluded from the ranking basis, which is correct - recoverable tax should not influence an award decision.</p>'
        : '<p>Non-recoverable tax is included in landed cost, which is correct where the organization cannot reclaim it.</p>'),
    formula: ['Landed goods = (unit price x quantity) - discount', 'Duty = (landed goods + freight + insurance) x duty %',
      'Landed cost = landed goods + freight + insurance + duty (+ tax where not recoverable)', 'Per-unit landed cost = landed cost / quantity',
      'Spread % = (highest landed cost - lowest landed cost) / lowest landed cost x 100'],
    assumptions: ['Insurance is treated as a common cost across all offers unless entered separately per supplier.',
      'Discount is applied to goods value before freight, insurance and duty.',
      'Non-price factors are evaluated in the Supplier Scorecard tool, not here.'],
    warnings: warnings,
    keyFindings: ['Lowest landed cost: ' + lowest.name + ' at ' + PS.moneyR(lowest.landed) + ' (' + PS.money(lowest.unitLanded, 2) + ' per unit)',
      'Highest landed cost: ' + highest.name + ' at ' + PS.moneyR(highest.landed),
      'Spread: ' + PS.moneyR(spread) + ' (' + PS.pct(spreadPct) + ')',
      'Negotiation target: start from ' + lowest.name + ' and verify specification equivalence first'],
    summaryText: 'Best landed cost ' + lowest.name + ' at ' + PS.moneyR(lowest.landed) + ' (' + PS.money(lowest.unitLanded, 2) + ' per unit). Spread to highest offer ' + PS.moneyR(spread) + ' or ' + PS.pct(spreadPct) + '.',
    data: { quotes: rows.map(function (r) { return { name: r.name, landed: r.landed, unit: r.unitLanded }; }) }
  };
};