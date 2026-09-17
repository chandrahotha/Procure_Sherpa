/* ============ Calc logic: Landed Cost ============ */
PS.calcImpl.landedCost = function (v) {
  var goods = v.unitPrice * v.qty;
  var discount = goods * (v.discount / 100);
  var net = goods - discount;
  var customs = net + v.freight + v.insurance;
  var duty = customs * (v.dutyPct / 100);
  var logi = v.freight + v.insurance;
  var preTax = customs + duty + v.handling + v.otherCost;
  var tax = v.taxRecoverable ? 0 : preTax * (v.taxPct / 100);
  var landed = preTax + tax, unit = landed / v.qty;
  var uplift = net ? (landed - net) / net * 100 : 0;
  var w = [];
  if (v.dutyPct === 0) w.push('Duty is zero. If the goods cross a customs border, confirm the tariff treatment: duty is often the largest addition to invoice price.');
  if (!v.taxRecoverable && v.taxPct === 0) w.push('Tax is marked non-recoverable but the rate is zero. Enter the applicable rate or tick recoverable.');
  if (uplift > 40) w.push('Landed cost is ' + PS.pct(uplift) + ' above goods value. Check that freight and duty are not already inside the quoted price - paying twice is a common error.');
  var row = function (label, amt) {
    return { cells: [label, PS.moneyR(amt), PS.money(amt / v.qty, 2), PS.pct(landed ? amt / landed * 100 : 0)] };
  };
  return PS.C({
    r: [PS.res('Landed cost per unit', PS.money(unit, 2), 'The comparable figure across suppliers', 'ok', true),
      PS.res('Total landed cost', PS.moneyR(landed), PS.qty(v.qty) + ' units', '', true),
      PS.res('Added above goods value', PS.moneyR(landed - net) + ' (' + PS.pct(uplift) + ')', 'Freight, insurance, duty, handling, other')],
    t: {
      headers: ['Cost element', 'Amount', 'Per unit', 'Share'], numCols: 3,
      rows: [row('Goods value at list price', goods),
        { cells: ['Discount', '-' + PS.moneyR(discount), '-' + PS.money(discount / v.qty, 2), PS.pct(-discount / landed * 100)] },
        row('Freight and insurance', logi), row('Duty at ' + PS.pct(v.dutyPct, 2), duty),
        row('Handling and clearance', v.handling), row('Other costs', v.otherCost),
        row(v.taxRecoverable ? 'Purchase tax (recoverable, excluded)' : 'Purchase tax (non-recoverable)', tax)],
      footer: ['Landed cost', PS.moneyR(landed), PS.money(unit, 2), '100.0%']
    },
    a: '<p>Delivered cost is <strong>' + PS.money(unit, 2) + ' per unit</strong> (' + PS.moneyR(landed) + ' total). Invoice price was ' + PS.money(net / v.qty, 2) + ' per unit, so logistics, duty and handling add ' + PS.pct(uplift) + '.</p>' +
      '<p>' + (duty >= logi
        ? 'Duty is the largest addition here, and it follows tariff classification, origin and specification - those can sometimes be changed legitimately, so check them before negotiating price.'
        : 'Freight is the largest addition here, and it is usually negotiable through consolidation, mode choice or different delivery terms.') +
      ' Compare suppliers on landed cost per unit and state the Incoterm behind each figure.</p>',
    f: ['Customs value = goods value - discount + freight + insurance', 'Duty = customs value x duty %',
      'Landed cost = customs value + duty + handling + other (+ non-recoverable tax); per unit = landed cost / quantity'],
    as: ['Duty is calculated on goods value plus freight and insurance, the usual ad valorem basis.',
      'Recoverable purchase tax is excluded from landed cost.'],
    w: w,
    k: ['Landed cost per unit: ' + PS.money(unit, 2), 'Total landed cost: ' + PS.moneyR(landed),
      'Logistics, duty and handling add ' + PS.pct(uplift) + ' above goods value'],
    s: 'Landed cost ' + PS.money(unit, 2) + ' per unit (' + PS.moneyR(landed) + ' total): ' + PS.pct(uplift) + ' above the discounted goods value.',
    d: { landedUnit: unit, landedTotal: landed, goodsValue: net }
  });
};