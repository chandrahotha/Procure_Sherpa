/* ==========================================================
   Calculator expected-value fixtures (production-grade)
   For each calculator we run the SHIPPED example inputs and
   assert the machine-readable `out.data` payload equals a value
   computed independently here by hand. This catches silent
   regressions that "finite output" tests cannot: wrong formulas,
   inverted signs, broken rounding.

   Each expected block lists the keys of `out.data` and the
   hand-computed value. Tolerance is exact-ish (1e-6 relative)
   because the impl rounds only for display, not in `d.data`.
   ========================================================== */
import { JSDOM, VirtualConsole } from 'jsdom';

const HTML = 'ProcureSherpa-v2.0.html';
const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', () => {});
vc.on('error', () => {});

const dom = await JSDOM.fromFile(HTML, {
  runScripts: 'dangerously', resources: 'usable', pretendToBeVisual: true, virtualConsole: vc,
  beforeParse(window) {
    window.matchMedia = window.matchMedia || (() => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} }));
    window.scrollTo = () => {};
    window.HTMLElement.prototype.scrollIntoView = function () {};
    if (!window.print) window.print = () => {};
  }
});
await new Promise((r) => setTimeout(r, 1200));
const PS = dom.window.PS;

let pass = 0, fail = 0;
const lines = [];

function approx(a, b, relTol) {
  if (a === b) return true;
  if (!isFinite(a) && !isFinite(b)) return true;            // both NaN/Inf
  if (isFinite(a) !== isFinite(b)) return false;
  const tol = relTol || 1e-6;
  const scale = Math.max(Math.abs(a), Math.abs(b), 1e-9);
  return Math.abs(a - b) <= tol * scale;
}

function checkFixture(name, out, expect) {
  if (!out) { lines.push('FAIL ' + name + ': impl returned null'); fail++; return; }
  const d = out.data || {};
  Object.keys(expect).forEach((k) => {
    const got = d[k];
    const want = expect[k];
    if (!approx(got, want)) {
      lines.push('FAIL ' + name + '.' + k + ': got ' + got + ' expected ' + want);
      fail++;
    } else pass++;
  });
  // also check primary result value embeds the headline figure
  const prim = (out.results || []).filter((r) => r.primary)[0];
  if (prim) {
    if (expect.__primaryLabel) {
      if (prim.label !== expect.__primaryLabel) {
        lines.push('FAIL ' + name + '.primaryLabel: got "' + prim.label + '" expected "' + expect.__primaryLabel + '"');
        fail++;
      } else pass++;
    }
    if (expect.__primaryContains && String(prim.value).indexOf(expect.__primaryContains) < 0) {
      lines.push('FAIL ' + name + '.primaryValue: got "' + prim.value + '" does not contain "' + expect.__primaryContains + '"');
      fail++;
    } else pass++;
  }
}

function run(calc, values) {
  try { return calc.run(values); } catch (e) { return null; }
}
function byId(id) { return PS.byId('calc', id); }

/* ---------------- Compare Quotes ----------------
   qty 2500, ins 300, tax recoverable (no tax added)
   A: goods=31000 disc=620 net=30380 freight=1800 duty=6%*32480=1948.8 landed=34428.8 unit=13.77152
   B: goods=29750 disc=0    net=29750 freight=3200 duty=6%*33250=1995   landed=35245   unit=14.098
   C: goods=33125 disc=1656.25 net=31468.75 freight=600 duty=6%*32368.75=1942.125 landed=34310.875 unit=13.72435
   lowest landed = C 34310.875                                        */
{
  const out = run(byId('calc-compare-quotes'), byId('calc-compare-quotes').example);
  checkFixture('calc-compare-quotes', out, { __primaryLabel: 'Best landed cost' });
  const d = out.data;
  const q = d.quotes.filter((x) => x.name === 'Supplier C')[0];
  approx(q.landed, 34310.875) ? pass++ : (lines.push('FAIL compare-quotes SupplierC.landed: got ' + q.landed + ' expected 34310.875'), fail++);
  approx(q.unit, 34310.875 / 2500) ? pass++ : (lines.push('FAIL compare-quotes SupplierC.unit'), fail++);
}

/* ---------------- Landed Cost ----------------
   Verify the full identity against the shipped example. */
{
  const c = byId('calc-landed-cost');
  const ex = c.example;
  const out = run(c, ex);
  const d = out.data;
  const goods = ex.unitPrice * ex.qty;
  const discount = goods * (ex.discount / 100);
  const net = goods - discount;
  const customs = net + ex.freight + ex.insurance;
  const duty = customs * (ex.dutyPct / 100);
  const preTax = customs + duty + ex.handling + ex.otherCost;
  const tax = ex.taxRecoverable ? 0 : preTax * (ex.taxPct / 100);
  const landed = preTax + tax;
  checkFixture('calc-landed-cost', out, { __primaryLabel: 'Landed cost per unit' });
  approx(d.landedTotal, landed) ? pass++ : (lines.push('FAIL landedCost.landedTotal: got ' + d.landedTotal + ' expected ' + landed), fail++);
  approx(d.landedUnit, landed / ex.qty) ? pass++ : (lines.push('FAIL landedCost.landedUnit'), fail++);
  approx(d.goodsValue, net) ? pass++ : (lines.push('FAIL landedCost.goodsValue'), fail++);
}

/* ---------------- TCO ----------------
   Verify the full economic identity holds exactly (includes disposal/residual). */
{
  const c = byId('calc-tco');
  const ex = c.example;
  const out = run(c, ex);
  const d = out.data;
  const annual = ex.energy + ex.maintenance + ex.consumables + ex.downtime + ex.otherAnnual;
  const acq = ex.unitPrice * ex.qty + ex.installCost;
  const r = ex.discountRate / 100, n = ex.lifeYears;
  const factor = (1 - Math.pow(1 + r, -n)) / r;
  const npvOpex = annual * factor;
  const tco = acq + npvOpex + ex.disposalCost / Math.pow(1 + r, n) - ex.residualValue / Math.pow(1 + r, n);
  approx(d.acquisition, acq) ? pass++ : (lines.push('FAIL tco.acquisition: got ' + d.acquisition + ' expected ' + acq), fail++);
  approx(d.opexNpv, npvOpex) ? pass++ : (lines.push('FAIL tco.opexNpv: got ' + d.opexNpv + ' expected ' + npvOpex), fail++);
  approx(d.tco, tco) ? pass++ : (lines.push('FAIL tco.tco: got ' + d.tco + ' expected ' + tco), fail++);
  approx(d.undiscounted, acq + annual * n + ex.disposalCost - ex.residualValue) ? pass++ : (lines.push('FAIL tco.undiscounted'), fail++);
}

/* ---------------- Negotiation Savings ----------------
   Need example */
{
  const c = byId('calc-negotiation-savings');
  if (c && c.example) {
    const out = run(c, c.example);
    const d = out.data;
    const perUnit = c.example.baselinePrice - c.example.negotiatedPrice;
    const annual = perUnit * c.example.annualVolume;
    approx(d.annual, annual) ? pass++ : (lines.push('FAIL negSavings.annual: got ' + d.annual + ' expected ' + annual), fail++);
    approx(d.total, annual * c.example.years + c.example.oneOffBenefits - c.example.implementationCost) ? pass++ : (lines.push('FAIL negSavings.total'), fail++);
  }
}

/* ---------------- Should Cost ---------------- */
{
  const c = byId('calc-should-cost');
  if (c && c.example) {
    const out = run(c, c.example);
    const d = out.data;
    const conv = c.example.labour + c.example.machine + c.example.overhead;
    const totalUnit = c.example.material + conv + c.example.packaging + c.example.logistics + c.example.other;
    const margin = totalUnit * (c.example.marginPct / 100);
    const should = totalUnit + margin + c.example.tooling / c.example.qty;
    approx(d.shouldCost, should) ? pass++ : (lines.push('FAIL shouldCost.shouldCost: got ' + d.shouldCost + ' expected ' + should), fail++);
    approx(d.annualGap, (c.example.quotedPrice - should) * c.example.qty) ? pass++ : (lines.push('FAIL shouldCost.annualGap'), fail++);
  }
}

/* ---------------- Price Increase ---------------- */
{
  const c = byId('calc-price-increase');
  if (c && c.example) {
    const out = run(c, c.example);
    const d = out.data;
    const perUnit = c.example.newPrice - c.example.currentPrice;
    const justifiedUnit = c.example.currentPrice * (c.example.indexRate / 100);
    const justified = Math.max(0, Math.min(perUnit, justifiedUnit));
    approx(d.unjustifiedAnnual, (perUnit - justified) * c.example.annualVolume) ? pass++ : (lines.push('FAIL priceIncrease.unjustifiedAnnual'), fail++);
    approx(d.justifiedAnnual, justified * c.example.annualVolume) ? pass++ : (lines.push('FAIL priceIncrease.justifiedAnnual'), fail++);
    approx(d.targetPrice, c.example.currentPrice + justified) ? pass++ : (lines.push('FAIL priceIncrease.targetPrice'), fail++);
  }
}

/* ---------------- Price Escalation ----------------
   Synthetic: base 100, 5% esc, cap 3%, 4y term, 1000/yr, startYear 1.
   Impl uses n = y - (startYear-1); with startYear=1 escalation applies
   from year 1. applied = min(5,3) = 3%.
   prices: y1=103, y2=106.09, y3=109.2727, y4=112.550881
   total = 1000*(103+106.09+109.2727+112.550881) = 430,913.581 */
{
  const c = byId('calc-price-escalation');
  const syn = { basePrice: 100, escalationPct: 5, capPct: 3, years: 4, startYear: 1, annualVolume: 1000 };
  const out = run(c, syn);
  const d = out.data;
  let total = 0, flat = 0, uncappedTotal = 0;
  for (let y = 1; y <= 4; y++) {
    const n = y - (syn.startYear - 1);
    const uncapped = 100 * Math.pow(1.05, n);
    const capped = 100 * Math.pow(1.03, n);
    total += Math.min(uncapped, capped) * 1000;
    uncappedTotal += uncapped * 1000;
    flat += 100 * 1000;
  }
  approx(d.total, total) ? pass++ : (lines.push('FAIL escalation.total: got ' + d.total + ' expected ' + total), fail++);
  approx(d.flat, flat) ? pass++ : (lines.push('FAIL escalation.flat'), fail++);
  approx(d.escalationCost, total - flat, 1e-6) ? pass++ : (lines.push('FAIL escalation.escalationCost'), fail++);
  approx(d.capValue, uncappedTotal - total, 1e-4) ? pass++ : (lines.push('FAIL escalation.capValue: got ' + d.capValue + ' expected ' + (uncappedTotal - total)), fail++);
}

/* ---------------- Payment Terms ---------------- */
{
  const c = byId('calc-payment-terms');
  if (c && c.example) {
    const out = run(c, c.example);
    const d = out.data;
    const delta = c.example.proposedDays - c.example.currentDays;
    approx(d.released, c.example.annualSpend * delta / 365) ? pass++ : (lines.push('FAIL paymentTerms.released'), fail++);
    approx(d.termsValue, d.released * (c.example.costOfCapital / 100)) ? pass++ : (lines.push('FAIL paymentTerms.termsValue'), fail++);
  }
}

/* ---------------- PO Value Check ----------------
   Default prefs thresholds: buyer 10000, manager 50000, head 250000, exec 0 (no limit).
   Value 74000 -> Head of procurement. Competitive threshold unset by default. */
{
  const c = byId('calc-po-value-check');
  const out = run(c, c.example);
  const d = out.data;
  approx(d.poValue, c.example.poValue) ? pass++ : (lines.push('FAIL poValue.poValue'), fail++);
  if (d.approvalLevel) {
    const thr = PS.prefs().thresholds || [];
    const buyer = (thr[0] || {}).label, mgr = (thr[1] || {}).label, head = (thr[2] || {}).label;
    /* default prefs have no competitive threshold -> competitiveExpected null */
    (d.approvalLevel === head) ? pass++ : (lines.push('FAIL poValue.approvalLevel: got "' + d.approvalLevel + '" expected "' + head + '"'), fail++);
    (d.competitiveExpected === null) ? pass++ : (lines.push('FAIL poValue.competitiveExpected: got ' + d.competitiveExpected + ' expected null'), fail++);
  } else {
    lines.push('note: PO Value Check has no configured thresholds in this run');
  }
}

/* ---------------- MOQ ---------------- */
{
  const c = byId('calc-moq');
  if (c && c.example) {
    const out = run(c, c.example);
    const d = out.data;
    const eoq = Math.sqrt(2 * c.example.annualDemand * c.example.orderCost / c.example.holdingCost);
    approx(d.eoq, Math.max(1, Math.round(eoq))) ? pass++ : (lines.push('FAIL moq.eoq: got ' + d.eoq + ' expected ' + Math.max(1, Math.round(eoq))), fail++);
    approx(d.costAtEoq, (c.example.annualDemand / d.eoq) * c.example.orderCost + (d.eoq / 2) * c.example.holdingCost) ? pass++ : (lines.push('FAIL moq.costAtEoq'), fail++);
  }
}

/* ---------------- Make vs Buy ---------------- */
{
  const c = byId('calc-make-vs-buy');
  if (c && c.example) {
    const out = run(c, c.example);
    const d = out.data;
    const mv = c.example.matCost + c.example.labourCost + c.example.overheadCost;
    const bv = c.example.buyPrice + c.example.buyLogistics;
    approx(d.makeTotal, c.example.fixedSetup + mv * c.example.volume) ? pass++ : (lines.push('FAIL makeBuy.makeTotal'), fail++);
    approx(d.buyTotal, bv * c.example.volume) ? pass++ : (lines.push('FAIL makeBuy.buyTotal'), fail++);
    approx(d.diff, d.buyTotal - d.makeTotal) ? pass++ : (lines.push('FAIL makeBuy.diff'), fail++);
  }
}

/* ---------------- Supplier Scorecard ---------------- */
{
  const c = byId('calc-supplier-scorecard');
  if (c && c.example) {
    const out = run(c, c.example);
    const d = out.data;
    const crit = [
      ['Quality', c.example.wQuality, c.example.aQuality, c.example.bQuality],
      ['Delivery', c.example.wDelivery, c.example.aDelivery, c.example.bDelivery],
      ['Price', c.example.wPrice, c.example.aPrice, c.example.bPrice],
      ['Service', c.example.wService, c.example.aService, c.example.bService],
      ['Risk', c.example.wRisk, c.example.aRisk, c.example.bRisk]
    ];
    const sumW = crit.reduce((t, x) => t + x[1], 0);
    const tA = crit.reduce((t, x) => t + x[1] * x[2], 0) / sumW;
    const tB = crit.reduce((t, x) => t + x[1] * x[3], 0) / sumW;
    approx(d.totalA, tA) ? pass++ : (lines.push('FAIL scorecard.totalA'), fail++);
    approx(d.totalB, tB) ? pass++ : (lines.push('FAIL scorecard.totalB'), fail++);
  }
}

/* ---------------- Concentration / HHI ---------------- */
{
  const c = byId('calc-supplier-concentration');
  if (c && c.example) {
    const out = run(c, c.example);
    const d = out.data;
    const spends = [c.example.spend1, c.example.spend2, c.example.spend3, c.example.spend4, c.example.spend5];
    const total = spends.reduce((t, x) => t + x, 0);
    const hhi = spends.reduce((t, x) => t + (x / total * 100) ** 2, 0);
    approx(d.hhi, hhi) ? pass++ : (lines.push('FAIL concentration.hhi: got ' + d.hhi + ' expected ' + hhi), fail++);
    approx(d.total, total) ? pass++ : (lines.push('FAIL concentration.total'), fail++);
  }
}

/* ---------------- Budget vs Actual ---------------- */
{
  const c = byId('calc-budget-vs-actual');
  if (c && c.example) {
    const out = run(c, c.example);
    const d = out.data;
    const expected = c.example.annualBudget * c.example.monthsElapsed / 12;
    approx(d.variance, c.example.actualToDate - expected) ? pass++ : (lines.push('FAIL budgetActual.variance'), fail++);
    approx(d.forecast, c.example.actualToDate / c.example.monthsElapsed * 12) ? pass++ : (lines.push('FAIL budgetActual.forecast'), fail++);
  }
}

/* ---------------- Savings Analysis ---------------- */
{
  const c = byId('calc-savings-analysis');
  if (c && c.example) {
    const out = run(c, c.example);
    const d = out.data;
    const gross = c.example.baselineAnnual - c.example.newAnnual;
    approx(d.gross, gross) ? pass++ : (lines.push('FAIL savingsAnalysis.gross'), fail++);
    approx(d.net, gross * (c.example.contractMonths / 12) - c.example.oneOffCost - c.example.implementationCost) ? pass++ : (lines.push('FAIL savingsAnalysis.net'), fail++);
  }
}

/* ---------------- Multi-Year Contract ---------------- */
{
  const c = byId('calc-multi-year-contract-cost');
  if (c && c.example) {
    const out = run(c, c.example);
    const d = out.data;
    const e = c.example.escalationPct / 100, r = c.example.discountRate / 100;
    let nominal = 0, npv = 0;
    for (let t = 1; t <= c.example.termYears; t++) {
      const cost = c.example.year1Cost * Math.pow(1 + e, t - 1);
      nominal += cost; npv += cost / Math.pow(1 + r, t);
    }
    approx(d.nominal, nominal) ? pass++ : (lines.push('FAIL multiyear.nominal: got ' + d.nominal + ' expected ' + nominal), fail++);
    approx(d.npv, npv) ? pass++ : (lines.push('FAIL multiyear.npv: got ' + d.npv + ' expected ' + npv), fail++);
  }
}

/* ---------------- GST / Tax ---------------- */
{
  const c = byId('calc-gst-tax');
  if (c && c.example) {
    const out = run(c, c.example);
    const d = out.data;
    const exclusive = String(c.example.taxMode || '').indexOf('exclusive') >= 0;
    const rate = c.example.taxRate / 100;
    const expNet = exclusive ? c.example.amount : c.example.amount / (1 + rate);
    const expTax = exclusive ? c.example.amount * rate : c.example.amount - expNet;
    approx(d.net, expNet) ? pass++ : (lines.push('FAIL tax.net: got ' + d.net + ' expected ' + expNet), fail++);
    approx(d.tax, expTax) ? pass++ : (lines.push('FAIL tax.tax'), fail++);
  }
}

/* ---------------- FX ---------------- */
{
  const c = byId('calc-fx-currency');
  if (c && c.example) {
    const out = run(c, c.example);
    const d = out.data;
    const gross = c.example.foreignAmount * c.example.exchangeRate;
    const totalCost = gross * (c.example.spreadPct / 100) + c.example.feeFixed;
    approx(d.gross, gross) ? pass++ : (lines.push('FAIL fx.gross'), fail++);
    approx(d.net, gross - totalCost) ? pass++ : (lines.push('FAIL fx.net'), fail++);
  }
}

/* ---------------- KPI ---------------- */
{
  const c = byId('calc-kpi-calculator');
  if (c && c.example) {
    const out = run(c, c.example);
    const d = out.data;
    const higher = String(c.example.kpiDirection || '').indexOf('Higher') >= 0;
    const achievement = higher ? c.example.actual / c.example.target * 100 : c.example.target / c.example.actual * 100;
    approx(d.achievement, achievement) ? pass++ : (lines.push('FAIL kpi.achievement'), fail++);
  }
}

console.log('--- calculator expected-value fixtures ---');
lines.forEach((l) => console.log(l));
console.log('--- summary ---');
console.log('assertions passed: ' + pass);
console.log('assertions failed: ' + fail);
console.log('runtime errors: ' + errors.length);
process.exit(fail ? 1 : 0);