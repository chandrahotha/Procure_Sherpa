/* ============ Calc logic: Should Cost ============ */
PS.calcImpl.shouldCost = function (v) {
  var conversion = v.labour + v.machine + v.overhead;
  var totalUnit = v.material + conversion + v.packaging + v.logistics + v.other;
  var margin = totalUnit * (v.marginPct / 100);
  var toolingUnit = v.qty ? v.tooling / v.qty : 0;
  var should = totalUnit + margin + toolingUnit;
  var gap = v.quotedPrice - should;
  var gapPct = should ? gap / should * 100 : 0;
  var annualGap = gap * v.qty;
  var materialShare = should ? v.material / should * 100 : 0;
  var w = [];
  if (gap <= 0) w.push('The quoted price is below the should-cost model. That is not automatically good news: check for missing cost elements, hidden charges, specification differences or a supplier buying the business and planning recovery later.');
  if (gapPct > 25) w.push('The quoted price is ' + PS.pct(gapPct) + ' above the model. Confirm the model includes everything the supplier must provide - certification, warranty, tooling, freight, service, risk - before treating the gap as pure margin.');
  if (v.marginPct > 40) w.push('A margin of ' + PS.pct(v.marginPct) + ' is high for most manufactured goods. Verify it reflects the real risk and investment profile of this supply.');
  var rows = [
    { cells: ['Material', PS.money(v.material, 2), PS.pct(totalUnit ? v.material / totalUnit * 100 : 0)] },
    { cells: ['Direct labour', PS.money(v.labour, 2), PS.pct(totalUnit ? v.labour / totalUnit * 100 : 0)] },
    { cells: ['Machine / process', PS.money(v.machine, 2), PS.pct(totalUnit ? v.machine / totalUnit * 100 : 0)] },
    { cells: ['Overhead absorption', PS.money(v.overhead, 2), PS.pct(totalUnit ? v.overhead / totalUnit * 100 : 0)] },
    { cells: ['Packaging', PS.money(v.packaging, 2), PS.pct(totalUnit ? v.packaging / totalUnit * 100 : 0)] },
    { cells: ['Logistics per unit', PS.money(v.logistics, 2), PS.pct(totalUnit ? v.logistics / totalUnit * 100 : 0)] },
    { cells: ['Other direct cost', PS.money(v.other, 2), PS.pct(totalUnit ? v.other / totalUnit * 100 : 0)] },
    { cells: ['Total unit cost', PS.money(totalUnit, 2), '100.0%'] },
    { cells: ['Supplier margin at ' + PS.pct(v.marginPct, 1), PS.money(margin, 2), PS.pct(totalUnit ? margin / totalUnit * 100 : 0)] },
    { cells: ['Tooling / setup per unit (' + PS.moneyR(v.tooling) + ' over ' + PS.qty(v.qty) + ')', PS.money(toolingUnit, 2), PS.pct(totalUnit ? toolingUnit / totalUnit * 100 : 0)] }
  ];
  return PS.C({
    r: [PS.res('Should-cost price', PS.money(should, 2), 'Independent bottom-up estimate per unit', 'ok', true),
      PS.res('Quoted price', PS.money(v.quotedPrice, 2), gap > 0 ? 'Above the model by ' + PS.pct(gapPct) : 'Below the model by ' + PS.pct(Math.abs(gapPct)), gap > 0 ? 'warn' : '', true),
      PS.res('Gap per unit', PS.money(gap, 2), gap > 0 ? 'Potential annual value ' + PS.moneyR(annualGap) : 'Verify the model is complete'),
      PS.res('Material share of should cost', PS.pct(materialShare), materialShare > 60 ? 'Material is dominant: volume, specification and index terms matter most' : 'Conversion cost matters: labour, process and overhead are negotiable levers')],
    t: { headers: ['Cost element', 'Per unit', 'Share of unit cost'], numCols: 2, rows: rows,
      footer: ['Should cost', PS.money(should, 2), 'Quoted ' + PS.money(v.quotedPrice, 2)] },
    a: '<p>The bottom-up model gives a should-cost of <strong>' + PS.money(should, 2) + ' per unit</strong> against a quoted ' + PS.money(v.quotedPrice, 2) +
      '. The difference is ' + PS.money(gap, 2) + ' per unit (' + PS.pct(gapPct) + '), or ' + PS.moneyR(annualGap) + ' a year at the volume entered.</p>' +
      '<p>' + (gap > 0
        ? 'Use the gap as a discussion structure rather than a demand. Ask the supplier to explain each driver - material, labour, overhead, margin - and identify which element is different from your model. Price reductions that come from the supplier&rsquo;s own cost base are sustainable; those squeezed out of margin are usually recovered later.'
        : 'A quoted price below your model usually means one of three things: the model is incomplete, the specification differs, or the price is not sustainable. Test all three before treating it as a win.') + '</p>' +
      '<p>Document the cost drivers, sources and assumptions you used. An undocumented should-cost gets challenged quickly in a negotiation.</p>',
    f: ['Conversion cost = direct labour + machine cost + overhead', 'Total unit cost = material + conversion + packaging + logistics + other',
      'Should-cost price = total unit cost x (1 + margin %) + one-off tooling / quantity',
      'Gap % = (quoted price - should-cost price) / should-cost price x 100'],
    as: ['Cost drivers are your own estimates; they are not market data.',
      'Margin is applied to total unit cost; one-off tooling is added separately on a per-unit basis.',
      'Volume entered is assumed to be the full annual requirement, used to amortise tooling.'],
    w: w,
    k: ['Should-cost price: ' + PS.money(should, 2) + ' per unit', 'Quoted price: ' + PS.money(v.quotedPrice, 2) + ' per unit',
      'Gap: ' + PS.money(gap, 2) + ' per unit (' + PS.pct(gapPct) + '), annual ' + PS.moneyR(annualGap),
      'Largest cost element: ' + (materialShare > 50 ? 'material' : 'conversion cost') + ' - focus the negotiation there'],
    s: 'Should cost ' + PS.money(should, 2) + ' per unit against a quote of ' + PS.money(v.quotedPrice, 2) + ': a gap of ' + PS.money(gap, 2) + ' (' + PS.pct(gapPct) + ').',
    d: { shouldCost: should, quoted: v.quotedPrice, gap: gap, annualGap: annualGap }
  });
};