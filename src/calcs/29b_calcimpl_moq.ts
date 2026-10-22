/* ============ Calc logic: MOQ / Order Quantity ============ */
PS.calcImpl.moq = function (v) {
  var D = v.annualDemand, S = v.orderCost, H = v.holdingCost;
  var w = [];
  var eoq = (H > 0 && D > 0 && S >= 0) ? Math.sqrt(2 * D * S / H) : NaN;
  var eoqR = isFinite(eoq) ? Math.max(1, Math.round(eoq)) : NaN;
  function rel(Q) {
    if (!(Q > 0) || !isFinite(eoq)) return { ord: NaN, hold: NaN, total: NaN };
    var ord = D / Q * S, hold = Q / 2 * H;
    return { ord: ord, hold: hold, total: ord + hold };
  }
  var atEoq = rel(eoqR), atMoq = rel(v.supplierMOQ), atCur = rel(v.currentQty);
  var purchase = (isFinite(v.unitCost) && v.unitCost > 0 && D > 0) ? D * v.unitCost : NaN;
  var orders = isFinite(eoqR) ? D / eoqR : NaN;
  if (!(H > 0)) w.push('Holding cost must be above zero: with no carrying cost the formula recommends a single giant order, which is not a usable answer. Enter the true per-unit carrying cost.');
  if (!(S >= 0) || !isFinite(S)) w.push('Order cost is missing, so the trade-off cannot be computed.');
  var moqNote;
  if (!(v.supplierMOQ > 0)) moqNote = 'No MOQ entered: the optimum is fully achievable.';
  else if (!isFinite(atMoq.total) || !isFinite(atEoq.total)) moqNote = 'MOQ effect could not be valued with these inputs.';
  else if (v.supplierMOQ <= eoqR) moqNote = 'The MOQ sits below the optimum, so it constrains nothing.';
  else {
    var extra = atMoq.total - atEoq.total;
    moqNote = 'The MOQ costs an extra ' + PS.moneyR(extra) + ' a year versus the optimum.';
    if (extra > 0) w.push('Negotiate the MOQ down, consolidate deliveries across sites, or price the ' + PS.moneyR(extra) + ' yearly penalty into the award decision.');
  }
  var curNote = '';
  if (v.currentQty > 0 && isFinite(atCur.total) && isFinite(atEoq.total)) {
    var gap = atCur.total - atEoq.total;
    curNote = gap > 0.005
      ? ' Current practice costs ' + PS.moneyR(gap) + ' a year more than the optimum.'
      : ' Current practice is already at the optimum.';
  }
  return PS.C({
    r: [PS.res('Economic order quantity', isFinite(eoqR) ? PS.qty(eoqR) + ' units' : '\u2014', 'Balances ordering against holding cost', '', true),
      PS.res('Relevant cost at EOQ', PS.moneyR(atEoq.total), 'Ordering plus holding, purchase cost excluded', '', true),
      PS.res('Orders per year', isFinite(orders) ? PS.qty(orders) : '\u2014', 'At the optimum lot size'),
      PS.res('MOQ verdict', moqNote, v.supplierMOQ > 0 ? 'MOQ of ' + PS.qty(v.supplierMOQ) + ' units' : 'No MOQ')],
    t: {
      headers: ['Policy', 'Lot size', 'Orders / year', 'Ordering', 'Holding', 'Relevant total'], numCols: 4,
      rows: [
        { cells: ['Optimum (EOQ)', isFinite(eoqR) ? PS.qty(eoqR) : '\u2014', isFinite(orders) ? PS.qty(orders) : '\u2014', PS.moneyR(atEoq.ord), PS.moneyR(atEoq.hold), PS.moneyR(atEoq.total)] },
        { cells: ['Supplier MOQ', v.supplierMOQ > 0 ? PS.qty(v.supplierMOQ) : 'None', v.supplierMOQ > 0 ? PS.qty(D / v.supplierMOQ) : '\u2014', PS.moneyR(atMoq.ord), PS.moneyR(atMoq.hold), PS.moneyR(atMoq.total)] },
        { cells: ['Current practice', v.currentQty > 0 ? PS.qty(v.currentQty) : '\u2014', v.currentQty > 0 ? PS.qty(D / v.currentQty) : '\u2014', PS.moneyR(atCur.ord), PS.moneyR(atCur.hold), PS.moneyR(atCur.total)] }
      ],
      footer: ['Annual purchase value', '', '', '', '', isFinite(purchase) ? PS.moneyR(purchase) : '\u2014']
    },
    a: '<p>At ' + PS.qty(D) + ' units a year, the cost-minimising lot size is <strong>' + (isFinite(eoqR) ? PS.qty(eoqR) + ' units' : 'not computable') + '</strong>, costing ' + PS.moneyR(atEoq.total) + ' a year in ordering plus holding.' + curNote + '</p>' +
      '<p>' + moqNote + ' Remember the model assumes steady demand and ignores stock-out risk, obsolescence and warehouse limits: treat the EOQ as the centre of a sensible range, not a law of physics.</p>',
    f: ['EOQ = sqrt(2 x demand x order cost / holding cost)',
      'Relevant cost(Q) = (demand / Q) x order cost + (Q / 2) x holding cost',
      'MOQ penalty = relevant cost(MOQ) minus relevant cost(EOQ)'],
    as: ['Steady demand through the year is assumed; seasonality needs its own schedule.',
      'Purchase cost is excluded from the optimisation (fixed price assumption).',
      'Stock-out, obsolescence and capacity costs are not modelled.'],
    w: w,
    k: ['Optimum lot size: ' + (isFinite(eoqR) ? PS.qty(eoqR) + ' units (' + PS.qty(orders) + ' orders a year)' : 'not computable'),
      'Relevant cost at optimum: ' + PS.moneyR(atEoq.total) + ' a year',
      moqNote],
    s: 'Order ' + (isFinite(eoqR) ? PS.qty(eoqR) + ' units at a time' : 'per the computed optimum') + ' for a relevant cost of ' + PS.moneyR(atEoq.total) + ' a year. ' + moqNote,
    d: { eoq: eoqR, costAtEoq: atEoq.total, ordersPerYear: orders, moqExtra: (v.supplierMOQ > 0 && isFinite(atMoq.total) && isFinite(atEoq.total)) ? atMoq.total - atEoq.total : NaN }
  });
};
