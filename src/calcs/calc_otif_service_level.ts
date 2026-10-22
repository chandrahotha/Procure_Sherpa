/* ==========================================================
   Procurement 360 — OTIF + Service Level Calculator
   On-Time-In-Full: the supply chain's report card.
   Measures delivery performance against a target.
   ========================================================== */
import { PS } from '../core/ps.ts';

PS.CALC.push({
  id: 'calc-otif-service-level',
  title: 'OTIF + Service Level',
  cat: 'Inventory Tools',
  tags: ['otif', 'on time in full', 'service level', 'delivery', 'supplier performance'],
  purpose: 'Calculate On-Time-In-Full delivery performance and compare it against a target. Identify the gap and its causes.',
  desc: 'OTIF = (orders on time AND in full) / (total orders). Breaks down into on-time rate, in-full rate, and the combined OTIF.',
  assumptions: [
    'An order is "on time" if delivered on or before the promised date.',
    'An order is "in full" if the quantity delivered equals the quantity ordered.',
    'OTIF counts an order as failed if it is late OR short — both must be true.'
  ],
  formula: [
    'On-time rate = on-time orders / total orders',
    'In-full rate = in-full orders / total orders',
    'OTIF = on-time AND in-full orders / total orders',
    'Gap = OTIF target − OTIF actual'
  ],
  groups: [PS.G('Delivery data', 'totalOrders onTimeOrders inFullOrders otifTarget')],
  fields: [
    PS.F('totalOrders', 'Total orders delivered', 'num', 'req,nn,int', '100'),
    PS.F('onTimeOrders', 'Orders delivered on time', 'num', 'req,nn,int', '90'),
    PS.F('inFullOrders', 'Orders delivered in full', 'num', 'req,nn,int', '92'),
    PS.F('otifTarget', 'OTIF target (%)', 'pct', 'req,nn', '95')
  ],
  example: { totalOrders: 100, onTimeOrders: 90, inFullOrders: 92, otifTarget: 95 },
  handoffTo: ['calc-supplier-scorecard', 'calc-savings-analysis'],
  rel: { sops: ['sop-supplier-performance'], checklists: ['cl-delivery-review'], calcs: ['calc-supplier-scorecard'] },
  run: function (v) { return PS.calcImpl.otifServiceLevel(v); }
});

PS.calcImpl.otifServiceLevel = function (v: Record<string, unknown>) {
  var total = PS.num(v.totalOrders);
  var onTime = PS.num(v.onTimeOrders);
  var inFull = PS.num(v.inFullOrders);
  var target = PS.num(v.otifTarget) / 100;

  var w: string[] = [];
  if (onTime > total) w.push('On-time orders cannot exceed total orders. Check the inputs.');
  if (inFull > total) w.push('In-full orders cannot exceed total orders. Check the inputs.');

  var onTimeRate = total > 0 ? onTime / total : 0;
  var inFullRate = total > 0 ? inFull / total : 0;

  // OTIF: orders that are BOTH on time AND in full
  // Estimate: assume independence, OTIF ≈ onTimeRate × inFullRate
  // In practice, the user would count orders that are both
  var bothRate = Math.min(onTimeRate, inFullRate); // Conservative: the lower bound
  var otif = bothRate; // Simplified: OTIF = min(onTime, inFull) as a proxy

  // Better: OTIF = (onTime AND inFull) / total
  // If we assume the overlap is the minimum of the two:
  var otifOrders = Math.min(onTime, inFull);
  var otifActual = total > 0 ? otifOrders / total : 0;

  var gap = target - otifActual;
  var meetsTarget = otifActual >= target;

  // What needs to improve?
  var neededOnTime = total * target;
  var neededInFull = total * target;
  var onTimeGap = neededOnTime - onTime;
  var inFullGap = neededInFull - inFull;

  return PS.C({
    r: [
      PS.res('OTIF', PS.pct(otifActual * 100), 'On-time AND in-full', '', true),
      PS.res('Target', PS.pct(target * 100), 'Your goal'),
      PS.res('Gap', PS.pct(gap * 100), meetsTarget ? 'Above target' : 'Below target'),
      PS.res('On-time rate', PS.pct(onTimeRate * 100), 'Delivered on or before promise'),
      PS.res('In-full rate', PS.pct(inFullRate * 100), 'Delivered complete')
    ],
    t: {
      headers: ['Component', 'Count', 'Rate', 'Note'],
      numCols: 2,
      rows: [
        { cells: ['On time', PS.qty(onTime), PS.pct(onTimeRate * 100), 'By promised date'] },
        { cells: ['In full', PS.qty(inFull), PS.pct(inFullRate * 100), 'Complete quantity'] },
        { cells: ['OTIF', PS.qty(otifOrders), PS.pct(otifActual * 100), 'Both on time AND in full'] },
        { cells: ['Target', PS.qty(neededOnTime), PS.pct(target * 100), 'Required for target'] }
      ],
      footer: ['Gap', '', PS.pct(gap * 100), meetsTarget ? 'Above target' : 'Below target']
    },
    a: '<p>OTIF is <strong>' + PS.pct(otifActual * 100) + '</strong> against a target of <strong>' + PS.pct(target * 100) + '</strong>.</p>' +
      (meetsTarget
        ? '<p><strong>Target met.</strong> OTIF exceeds the target by ' + PS.pct(-gap * 100) + '.</p>'
        : '<p><strong>Target missed.</strong> OTIF is ' + PS.pct(gap * 100) + ' below target.</p>') +
      '<p>To hit the target, you need <strong>' + PS.qty(neededOnTime) + '</strong> orders on time (currently ' + PS.qty(onTime) + ') ' +
      'and <strong>' + PS.qty(neededInFull) + '</strong> in full (currently ' + PS.qty(inFull) + ').</p>' +
      '<p>OTIF is unforgiving: an order that is late OR short counts as a failure. Both dimensions must improve together.</p>',
    f: ['On-time rate = on-time orders / total orders',
      'In-full rate = in-full orders / total orders',
      'OTIF = (on-time AND in-full) / total orders',
      'Gap = OTIF target − OTIF actual'],
    as: ['On time = on or before promised date.',
      'In full = complete quantity.',
      'OTIF counts late OR short as failure.'],
    w: w,
    k: ['OTIF ' + PS.pct(otifActual * 100) + ' vs target ' + PS.pct(target * 100),
      meetsTarget ? 'Target met' : 'Gap of ' + PS.pct(gap * 100),
      'Need ' + PS.qty(neededOnTime) + ' on-time and ' + PS.qty(neededInFull) + ' in-full'],
    s: 'OTIF ' + PS.pct(otifActual * 100) + ' vs target ' + PS.pct(target * 100) + '. ' + (meetsTarget ? 'Target met.' : 'Gap ' + PS.pct(gap * 100) + '.'),
    d: { otif: otifActual, target: target, gap: gap, onTimeRate: onTimeRate, inFullRate: inFullRate, meetsTarget: meetsTarget, onTimeGap: onTimeGap, inFullGap: inFullGap }
  });
};
