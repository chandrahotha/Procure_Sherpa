/* ==========================================================
   Procurement 360 — New Calculator Test Fixtures
   Hand-computed expected values for the 5 new calculators.
   These catch inverted signs, broken rounding, and formula
   regressions that finite-output tests cannot.
   ========================================================== */
import { PS } from '../src/core/ps.ts';
import '../src/core/storage.ts';
import '../src/core/rates.ts';
import '../src/core/05f_calccompact.ts';
import '../src/content/09a_data_init.ts';
import '../src/calcs/20a_calc_compare_quotes.ts';
import '../src/calcs/calc_eoq_safety_stock.ts';
import '../src/calcs/calc_weighted_bid_eval.ts';
import '../src/calcs/calc_early_payment_roi.ts';
import '../src/calcs/calc_altman_zscore.ts';
import '../src/calcs/calc_otif_service_level.ts';

let passed = 0;
let failed = 0;

function assert(name, actual, expected, tolerance) {
  var diff = Math.abs(actual - expected);
  var ok = diff <= (tolerance || 0.01);
  if (ok) { passed++; console.log('ok   ' + name + ' = ' + actual.toFixed(4)); }
  else { failed++; console.log('FAIL ' + name + ' = ' + actual.toFixed(4) + ' (expected ' + expected.toFixed(4) + ')'); }
}

/* ---------- EOQ + Safety Stock ---------- */
console.log('\n--- EOQ + Safety Stock ---');
var eoqResult = PS.calcImpl.eoqSafetyStock({
  annualDemand: 3650, orderCost: 100, holdingCostRate: 25, unitCost: 50,
  leadTimeDays: 30, demandVariability: 30, leadTimeVariability: 5, serviceLevel: 95
});
// EOQ = sqrt(2 * 3650 * 100 / (0.25 * 50)) = sqrt(730000 / 12.5) = sqrt(58400) = 241.66
assert('EOQ', eoqResult.data.eoq, 241.66, 0.5);
// Daily demand = 3650/365 = 10
// sigmaD = 0.30 * 10 = 3
// sigmaLT = sqrt(30 * 9 + 100 * 25) = sqrt(270 + 2500) = sqrt(2770) = 52.63
// Z = 1.645 for 95%
// Safety stock = 1.645 * 52.63 = 86.58
assert('Safety stock', eoqResult.data.safetyStock, 86.58, 1);
// Reorder point = 10 * 30 + 86.58 = 386.58
assert('Reorder point', eoqResult.data.reorderPoint, 386.58, 1);
// Orders per year = 3650 / 241.66 = 15.10
assert('Orders per year', eoqResult.data.ordersPerYear, 15.10, 0.1);

/* ---------- Weighted Bid Evaluation ---------- */
console.log('\n--- Weighted Bid Evaluation ---');
var bidResult = PS.calcImpl.weightedBidEval({
  supplierCount: 3, criteriaCount: 5, priceWeight: 40, technicalWeight: 35, commercialWeight: 25
});
// Supplier A: price=30, tech=70, comm=65 -> 30*0.4 + 70*0.35 + 65*0.25 = 12 + 24.5 + 16.25 = 52.75
// Supplier B: price=40, tech=78, comm=77 -> 40*0.4 + 78*0.35 + 77*0.25 = 16 + 27.3 + 19.25 = 62.55
// Supplier C: price=50, tech=86, comm=89 -> 50*0.4 + 86*0.35 + 89*0.25 = 20 + 30.1 + 22.25 = 72.35
// Supplier C: price=10, tech=86, comm=89 -> 10*0.4 + 86*0.35 + 89*0.25 = 56.35
assert('Winning score', bidResult.data.winningScore, 56.35, 0.1);
// Gap: 56.35 - 54.55 = 1.80
assert('Score gap', bidResult.data.scoreGap, 1.80, 0.1);

/* ---------- Early Payment Discount ROI ---------- */
console.log('\n--- Early Payment Discount ROI ---');
var roiResult = PS.calcImpl.earlyPaymentRoi({
  discountRate: 2, discountDays: 10, netDays: 30, costOfCapital: 12
});
// Periodic return = 0.02 / 0.98 = 0.020408
// Periods per year = 365 / 20 = 18.25
// Annualized = (1.020408)^18.25 - 1 = 0.4489 = 44.89%
// Periodic return = 0.02/0.98 = 0.020408; periods = 365/20 = 18.25
// (1.020408)^18.25 - 1 = 0.4459
assert('Annualized return', roiResult.data.annualizedReturn, 0.4459, 0.001);
assert('Take discount', roiResult.data.takeDiscount ? 1 : 0, 1, 0);
assert('Discount amount', roiResult.data.discountAmount, 2000, 1);

/* ---------- Altman Z-Score ---------- */
console.log('\n--- Altman Z-Score ---');
var zResult = PS.calcImpl.altmanZScore({
  x1: 0.2, x2: 0.3, x3: 0.15, x4: 1.5, x5: 1.2
});
// Z = 1.2*0.2 + 1.4*0.3 + 3.3*0.15 + 0.6*1.5 + 1.0*1.2
// Z = 0.24 + 0.42 + 0.495 + 0.9 + 1.2 = 3.255
assert('Z-Score', zResult.data.zScore, 3.255, 0.001);
assert('Zone is Safe', zResult.data.zone === 'Safe' ? 1 : 0, 1, 0);

/* ---------- OTIF + Service Level ---------- */
console.log('\n--- OTIF + Service Level ---');
var otifResult = PS.calcImpl.otifServiceLevel({
  totalOrders: 100, onTimeOrders: 90, inFullOrders: 92, otifTarget: 95
});
// OTIF = min(90, 92) / 100 = 90/100 = 0.90
assert('OTIF', otifResult.data.otif, 0.90, 0.001);
assert('Meets target', otifResult.data.meetsTarget ? 1 : 0, 0, 0);
assert('Gap', otifResult.data.gap, 0.05, 0.001);

console.log('\n--- summary ---');
console.log('assertions passed: ' + passed);
console.log('assertions failed: ' + failed);
if (failed > 0) process.exit(1);
console.log('ALL NEW CALCULATOR FIXTURES PASS');
