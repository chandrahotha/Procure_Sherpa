/* ==========================================================
   Procurement 360 — Batch 2 Calculator Test Fixtures
   Hand-computed expected values for Kraljic, Pareto, RFx ROI,
   DPO/CCC, and Addressable Spend. Proves the formulas are
   right before a user ever relies on them.
   ========================================================== */
import { PS } from '../src/core/ps.ts';
import '../src/core/storage.ts';
import '../src/core/rates.ts';
import '../src/core/05f_calccompact.ts';
import '../src/content/09a_data_init.ts';
import '../src/calcs/20a_calc_compare_quotes.ts';
import '../src/calcs/calc_kraljic_matrix.ts';
import '../src/calcs/calc_pareto_analysis.ts';
import '../src/calcs/calc_rfx_event_roi.ts';
import '../src/calcs/calc_dpo_working_capital.ts';
import '../src/calcs/calc_addressable_spend.ts';

let passed = 0;
let failed = 0;

function assert(name, actual, expected, tolerance) {
  var diff = Math.abs(actual - expected);
  var ok = diff <= (tolerance || 0.01);
  if (ok) { passed++; console.log('ok   ' + name + ' = ' + actual.toFixed(4)); }
  else { failed++; console.log('FAIL ' + name + ' = ' + actual.toFixed(4) + ' (expected ' + expected.toFixed(4) + ')'); }
}

/* ---------- Kraljic Portfolio Matrix ---------- */
console.log('\n--- Kraljic Portfolio Matrix ---');
var kraljic = PS.calcImpl.kraljicMatrix({ supplyRisk: 60, profitImpact: 70, annualSpend: 500000 });
// risk=60 > 50 AND impact=70 > 50 => Strategic
console.log('     quadrant = ' + kraljic.data.quadrant);
assert('Quadrant is Strategic', kraljic.data.quadrant === 'Strategic' ? 1 : 0, 1, 0);
assert('Strategic supplier count', kraljic.data.supplierCount, 1, 0);

var kraljicLeverage = PS.calcImpl.kraljicMatrix({ supplyRisk: 30, profitImpact: 80, annualSpend: 1000000 });
assert('Leverage quadrant', kraljicLeverage.data.quadrant === 'Leverage' ? 1 : 0, 1, 0);
assert('Leverage supplier count', kraljicLeverage.data.supplierCount, 3, 0);

var kraljicBottleneck = PS.calcImpl.kraljicMatrix({ supplyRisk: 80, profitImpact: 30, annualSpend: 200000 });
assert('Bottleneck quadrant', kraljicBottleneck.data.quadrant === 'Bottleneck' ? 1 : 0, 1, 0);

var kraljicNonCritical = PS.calcImpl.kraljicMatrix({ supplyRisk: 20, profitImpact: 25, annualSpend: 50000 });
assert('Non-critical quadrant', kraljicNonCritical.data.quadrant === 'Non-critical' ? 1 : 0, 1, 0);

/* ---------- Pareto Analysis ---------- */
console.log('\n--- Pareto Analysis ---');
var pareto = PS.calcImpl.paretoAnalysis({
  supplierCount: 100, totalSpend: 10000000, topSupplierCount: 20, topSupplierSpend: 8000000
});
// topPctSpend = 8000000/10000000 = 80%
assert('Top spend share', pareto.data.topPctSpend, 80, 0.01);
// topPctSuppliers = 20/100 = 20%
assert('Top supplier share', pareto.data.topPctSuppliers, 20, 0.01);
// tail = 100 - 20 = 80 suppliers, tailSpend = 10000000 - 8000000 = 2000000
assert('Tail spend', pareto.data.tailSpend, 2000000, 1);
assert('Tail count', pareto.data.tailCount, 80, 0);
// avgTop = 8000000/20 = 400000; avgTail = 2000000/80 = 25000
// concentrationRatio = 400000/25000 = 16
assert('Concentration ratio', pareto.data.concentrationRatio, 16, 0.01);
// consolidation = 80 * 0.5 * 6 * 500 = 120000
assert('Consolidation savings', pareto.data.consolidationSavings, 120000, 1);

/* ---------- RFx Event ROI ---------- */
console.log('\n--- RFx Event ROI ---');
var rfx = PS.calcImpl.rfxEventRoi({
  eventCost: 25000, addressableSpend: 1000000, expectedSavingsPct: 8, contractYears: 3
});
// grossAnnual = 1000000 * 0.08 = 80000
assert('Gross annual savings', rfx.data.grossAnnual, 80000, 1);
// grossTerm = 80000 * 3 = 240000
assert('Gross term savings', rfx.data.grossTerm, 240000, 1);
// netTerm = 240000 - 25000 = 215000
assert('Net term savings', rfx.data.netTerm, 215000, 1);
// roi = 215000/25000 = 8.6
assert('ROI', rfx.data.roi, 8.6, 0.01);
// paybackMonths = 25000 / (80000/12) = 25000/6666.67 = 3.75
assert('Payback months', rfx.data.paybackMonths, 3.75, 0.01);

/* ---------- DPO & Cash Conversion Cycle ---------- */
console.log('\n--- DPO & Cash Conversion Cycle ---');
var dpo = PS.calcImpl.dpoWorkingCapital({
  accountsPayable: 2000000, cogs: 16000000, inventory: 3000000,
  accountsReceivable: 2500000, revenue: 25000000, costOfCapital: 12, targetDpo: 60
});
// dpo = 2000000/16000000 * 365 = 45.625
assert('DPO', dpo.data.dpo, 45.625, 0.01);
// dso = 2500000/25000000 * 365 = 36.5
assert('DSO', dpo.data.dso, 36.5, 0.01);
// dio = 3000000/16000000 * 365 = 68.4375
assert('DIO', dpo.data.dio, 68.4375, 0.01);
// ccc = 36.5 + 68.4375 - 45.625 = 59.3125
assert('CCC', dpo.data.ccc, 59.3125, 0.01);
// deltaDpo = 60 - 45.625 = 14.375
// dailyCogs = 16000000/365 = 43835.616...
// wcReleased = 14.375 * 43835.616 = 630137.0 (approximately)
// Let me compute: 16000000/365 = 43835.6164384
// 14.375 * 43835.6164384 = 630137.049...
assert('Working capital released', dpo.data.wcReleased, 630137.05, 1);
// annualValue = 630137.05 * 0.12 = 75616.45
assert('Annual value', dpo.data.annualValue, 75616.45, 1);

/* ---------- Addressable Spend Cube ---------- */
console.log('\n--- Addressable Spend Cube ---');
var addr = PS.calcImpl.addressableSpend({
  totalSpend: 50000000, addressablePct: 80, contractCoveragePct: 60, tailSpendPct: 20, savingsTargetPct: 5
});
// addressable = 50000000 * 0.80 = 40000000
assert('Addressable spend', addr.data.addressable, 40000000, 1);
// contracted = 40000000 * 0.60 = 24000000
assert('Contracted spend', addr.data.contracted, 24000000, 1);
// coverageGap = 40000000 - 24000000 = 16000000
assert('Coverage gap', addr.data.coverageGap, 16000000, 1);
// tail = 40000000 * 0.20 = 8000000
assert('Tail spend', addr.data.tail, 8000000, 1);
// maverickEstimate = 8000000 * 0.5 = 4000000
assert('Maverick estimate', addr.data.maverickEstimate, 4000000, 1);
// opportunityBase = tail + coverageGap = 8000000 + 16000000 = 24000000
assert('Opportunity base', addr.data.opportunityBase, 24000000, 1);
// opportunity = 24000000 * 0.05 = 1200000
assert('Sourcing opportunity', addr.data.opportunity, 1200000, 1);

console.log('\n--- summary ---');
console.log('assertions passed: ' + passed);
console.log('assertions failed: ' + failed);
if (failed > 0) process.exit(1);
console.log('ALL BATCH 2 CALCULATOR FIXTURES PASS');
