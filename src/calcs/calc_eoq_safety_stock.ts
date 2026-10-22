/* ==========================================================
   Procurement 360 — EOQ + Safety Stock Calculator
   Economic Order Quantity with demand variability, service
   level, and reorder point. The inventory depth that was
   completely missing from the toolkit.
   ========================================================== */
import { PS } from '../core/ps.ts';

PS.CALC.push({
  id: 'calc-eoq-safety-stock',
  title: 'EOQ + Safety Stock',
  cat: 'Inventory Tools',
  tags: ['eoq', 'safety stock', 'reorder point', 'inventory', 'service level'],
  purpose: 'Find the optimal order quantity and the safety stock needed to hit a target service level, given demand and lead-time variability.',
  desc: 'Balances ordering cost against holding cost (EOQ), then adds safety stock for demand and lead-time uncertainty. Outputs reorder point, total inventory cost, and the service level achieved.',
  assumptions: [
    'Demand is approximately normal. For highly skewed demand, use a different model.',
    'Lead time is variable. The reorder point covers demand during lead time plus safety stock.',
    'Ordering cost and holding cost are constant. Volume discounts need a different model.'
  ],
  formula: [
    'EOQ = sqrt(2 × D × S / H)',
    'Safety stock = Z × σ(LT) where σ(LT) = sqrt(LT × σD² + D² × σLT²)',
    'Reorder point = D × LT + safety stock',
    'Total cost = (D/Q) × S + (Q/2 + SS) × H'
  ],
  groups: [PS.G('Demand and costs', 'annualDemand orderCost holdingCostRate unitCost leadTimeDays')],
  fields: [
    PS.F('annualDemand', 'Annual demand (units)', 'num', 'req,nn', '3650'),
    PS.F('orderCost', 'Ordering cost per order (S)', 'curr', 'req,nn', '100'),
    PS.F('holdingCostRate', 'Holding cost rate (% of unit cost)', 'pct', 'req,nn', '25'),
    PS.F('unitCost', 'Unit cost', 'curr', 'req,nn', '50'),
    PS.F('leadTimeDays', 'Average lead time (days)', 'num', 'req,nn', '30'),
    PS.F('demandVariability', 'Demand variability (σ/μ)', 'pct', 'req,nn', '30'),
    PS.F('leadTimeVariability', 'Lead time variability (σ days)', 'num', 'req,nn', '5'),
    PS.F('serviceLevel', 'Target service level (%)', 'pct', 'req,nn', '95')
  ],
  example: { annualDemand: 3650, orderCost: 100, holdingCostRate: 25, unitCost: 50, leadTimeDays: 30, demandVariability: 30, leadTimeVariability: 5, serviceLevel: 95 },
  handoffTo: ['calc-moq', 'calc-make-vs-buy'],
  rel: { sops: ['sop-inventory-management'], checklists: ['cl-inventory-review'], calcs: ['calc-moq'] },
  run: function (v) { return PS.calcImpl.eoqSafetyStock(v); }
});

PS.calcImpl.eoqSafetyStock = function (v: Record<string, unknown>) {
  var D = PS.num(v.annualDemand);
  var S = PS.num(v.orderCost);
  var H = PS.num(v.holdingCostRate) / 100 * PS.num(v.unitCost);
  var LT = PS.num(v.leadTimeDays);
  var sigmaD = PS.num(v.demandVariability) / 100 * (D / 365);
  var sigmaLT = PS.num(v.leadTimeVariability);
  var serviceLevel = PS.num(v.serviceLevel) / 100;

  // Z-score for service level
  var Z = 1.645; // 95% default
  if (serviceLevel >= 0.99) Z = 2.326;
  else if (serviceLevel >= 0.98) Z = 2.054;
  else if (serviceLevel >= 0.97) Z = 1.881;
  else if (serviceLevel >= 0.96) Z = 1.751;
  else if (serviceLevel >= 0.95) Z = 1.645;
  else if (serviceLevel >= 0.90) Z = 1.282;
  else if (serviceLevel >= 0.85) Z = 1.036;
  else if (serviceLevel >= 0.80) Z = 0.842;

  // EOQ
  var EOQ = Math.sqrt(2 * D * S / H);

  // Safety stock: σ(LT) = sqrt(LT × σD² + D² × σLT²)
  var dailyDemand = D / 365;
  var sigmaLT = Math.sqrt(LT * sigmaD * sigmaD + dailyDemand * dailyDemand * sigmaLT * sigmaLT);
  var safetyStock = Z * sigmaLT;

  // Reorder point
  var reorderPoint = dailyDemand * LT + safetyStock;

  // Total annual cost
  var orderCostAnnual = (D / EOQ) * S;
  var holdingCostAnnual = (EOQ / 2 + safetyStock) * H;
  var totalCost = orderCostAnnual + holdingCostAnnual;

  // Orders per year
  var ordersPerYear = D / EOQ;

  // Cycle stock
  var cycleStock = EOQ / 2;

  var w: string[] = [];
  if (serviceLevel < 0.90) w.push('Service level below 90%: stockouts will be frequent. Consider whether this is acceptable for the category.');
  if (sigmaLT > dailyDemand * LT * 0.5) w.push('Lead time variability is high relative to mean demand. Consider dual-sourcing or a more reliable supplier.');
  if (EOQ < 1) w.push('EOQ is less than 1 unit. Check your demand and cost inputs.');

  return PS.C({
    r: [
      PS.res('EOQ (units)', PS.qty(EOQ), 'Optimal order quantity', '', true),
      PS.res('Safety stock (units)', PS.qty(safetyStock), 'Buffer for demand and lead-time variability'),
      PS.res('Reorder point (units)', PS.qty(reorderPoint), 'Order when inventory falls to this level'),
      PS.res('Total annual cost', PS.money(totalCost), 'Ordering + holding'),
      PS.res('Orders per year', PS.qty(ordersPerYear), 'Frequency of replenishment'),
      PS.res('Cycle stock (units)', PS.qty(cycleStock), 'Average inventory from ordering'),
      PS.res('Service level achieved', PS.pct(serviceLevel * 100), 'Probability of not stocking out')
    ],
    t: {
      headers: ['Component', 'Value', 'Note'],
      numCols: 1,
      rows: [
        { cells: ['EOQ', PS.qty(EOQ), 'sqrt(2DS/H)'] },
        { cells: ['Safety stock', PS.qty(safetyStock), 'Z × σ(LT)'] },
        { cells: ['Reorder point', PS.qty(reorderPoint), 'D × LT + SS'] },
        { cells: ['Ordering cost', PS.money(orderCostAnnual), '(D/Q) × S'] },
        { cells: ['Holding cost', PS.money(holdingCostAnnual), '(Q/2 + SS) × H'] },
        { cells: ['Total cost', PS.money(totalCost), 'Ordering + holding'] }
      ],
      footer: ['Check: EOQ × holding rate', PS.money(EOQ * H / 2)]
    },
    a: '<p>Order <strong>' + PS.qty(EOQ) + '</strong> units each time. ' +
      'Keep <strong>' + PS.qty(safetyStock) + '</strong> units as safety stock. ' +
      'Reorder when inventory falls to <strong>' + PS.qty(reorderPoint) + '</strong> units. ' +
      'Total annual inventory cost: <strong>' + PS.money(totalCost) + '</strong>.</p>' +
      '<p>The EOQ balances ordering cost against holding cost. The safety stock covers demand and lead-time uncertainty at your target service level. ' +
      'A higher service level means more safety stock and higher holding cost.</p>',
    f: ['EOQ = sqrt(2 × D × S / H)',
      'Safety stock = Z × σ(LT)',
      'σ(LT) = sqrt(LT × σD² + D² × σLT²)',
      'Reorder point = D × LT + safety stock',
      'Total cost = (D/Q) × S + (Q/2 + SS) × H'],
    as: ['Demand is approximately normal.',
      'Lead time is variable.',
      'Ordering and holding costs are constant.'],
    w: w,
    k: ['Order ' + PS.qty(EOQ) + ' units per cycle',
      'Reorder at ' + PS.qty(reorderPoint) + ' units',
      'Safety stock of ' + PS.qty(safetyStock) + ' units'],
    s: 'EOQ ' + PS.qty(EOQ) + ', safety stock ' + PS.qty(safetyStock) + ', reorder point ' + PS.qty(reorderPoint) + ', total cost ' + PS.money(totalCost) + '.',
    d: { eoq: EOQ, safetyStock: safetyStock, reorderPoint: reorderPoint, totalCost: totalCost, ordersPerYear: ordersPerYear, cycleStock: cycleStock, serviceLevel: serviceLevel }
  });
};
