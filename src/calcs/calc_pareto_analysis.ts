/* ==========================================================
   Procurement 360 — Pareto Analysis (80/20) Calculator
   Identifies the Class A suppliers that drive 80% of spend,
   and the tail that dissipates effort.
   ========================================================== */
import { PS } from '../core/ps.ts';

PS.CALC.push({
  id: 'calc-pareto-analysis',
  title: 'Pareto Analysis (80/20)',
  cat: 'Sourcing Tools',
  tags: ['pareto', '80/20', 'spend analysis', 'class a', 'tail spend', 'consolidation'],
  purpose: 'Identify the small number of suppliers that consume most of the spend, and quantify the tail-spend consolidation opportunity.',
  desc: 'The Pareto principle applied to spend: typically 20% of suppliers account for 80% of spend. This calculator quantifies the split and the consolidation opportunity in the tail.',
  assumptions: [
    'Supplier spend is known and categorizable.',
    'The 80/20 rule is an observation, not a law; your split may differ.',
    'Tail consolidation saves transaction cost, not necessarily unit price.'
  ],
  formula: [
    'Class A = suppliers that cumulatively account for 80% of spend',
    'Class B = next 15% of cumulative spend',
    'Class C (tail) = final 5%',
    'Consolidation opportunity = tail supplier count × avg transaction saving'
  ],
  groups: [PS.G('Spend data', 'supplierCount totalSpend topSupplierCount topSupplierSpend')],
  fields: [
    PS.F('supplierCount', 'Total suppliers', 'num', 'req,nn,int', '100'),
    PS.F('totalSpend', 'Total spend', 'curr', 'req,nn', '10000000'),
    PS.F('topSupplierCount', 'Suppliers in top 80% of spend', 'num', 'req,nn,int', '20'),
    PS.F('topSupplierSpend', 'Spend with top suppliers', 'curr', 'req,nn', '8000000')
  ],
  example: { supplierCount: 100, totalSpend: 10000000, topSupplierCount: 20, topSupplierSpend: 8000000 },
  handoffTo: ['calc-supplier-concentration', 'calc-savings-analysis'],
  rel: { sops: ['sop-inventory-management'], checklists: ['cl-category-review'], calcs: ['calc-supplier-concentration'] },
  run: function (v) { return PS.calcImpl.paretoAnalysis(v); }
});

PS.calcImpl.paretoAnalysis = function (v: Record<string, unknown>) {
  var totalSuppliers = PS.num(v.supplierCount);
  var totalSpend = PS.num(v.totalSpend);
  var topCount = PS.num(v.topSupplierCount);
  var topSpend = PS.num(v.topSupplierSpend);

  var tailCount = totalSuppliers - topCount;
  var tailSpend = totalSpend - topSpend;
  var topPctSpend = totalSpend > 0 ? topSpend / totalSpend * 100 : 0;
  var topPctSuppliers = totalSuppliers > 0 ? topCount / totalSuppliers * 100 : 0;
  var tailPctSpend = totalSpend > 0 ? tailSpend / totalSpend * 100 : 0;
  var tailPctSuppliers = totalSuppliers > 0 ? tailCount / totalSuppliers * 100 : 0;

  // Average spend per supplier
  var avgTop = topCount > 0 ? topSpend / topCount : 0;
  var avgTail = tailCount > 0 ? tailSpend / tailCount : 0;
  var concentrationRatio = avgTail > 0 ? avgTop / avgTail : 0;

  // Consolidation opportunity: assume 50% of tail suppliers can be removed,
  // saving a conservative transaction cost per supplier per year
  var transactionCost = 500; // cost to administer one PO
  var annualOrdersPerTailSupplier = 6;
  var consolidatable = tailCount * 0.5;
  var consolidationSavings = consolidatable * annualOrdersPerTailSupplier * transactionCost;

  var w: string[] = [];
  if (topPctSpend < 70) w.push('Top suppliers account for less than 70% of spend. Your distribution is flatter than typical — consolidation may be less effective.');
  if (tailPctSuppliers > 70) w.push('More than 70% of your suppliers are in the tail. This is a governance burden: consider catalogs, P-cards or a tail-spend agency.');

  return PS.C({
    r: [
      PS.res('Top supplier share of spend', PS.pct(topPctSpend), topCount + ' suppliers of ' + totalSuppliers, '', true),
      PS.res('Tail share of suppliers', PS.pct(tailPctSuppliers), tailCount + ' suppliers'),
      PS.res('Tail share of spend', PS.pct(tailPctSpend), PS.money(tailSpend)),
      PS.res('Concentration ratio', PS.ratio(concentrationRatio), 'Top avg vs tail avg spend per supplier'),
      PS.res('Consolidation opportunity', PS.money(consolidationSavings), 'Per year, at 50% tail reduction')
    ],
    t: {
      headers: ['Segment', 'Suppliers', '% Suppliers', 'Spend', '% Spend', 'Avg / supplier'],
      numCols: 3,
      rows: [
        { cells: ['Class A (top)', String(topCount), PS.pct(topPctSuppliers), PS.money(topSpend), PS.pct(topPctSpend), PS.money(avgTop)] },
        { cells: ['Class C (tail)', String(tailCount), PS.pct(tailPctSuppliers), PS.money(tailSpend), PS.pct(tailPctSpend), PS.money(avgTail)] },
      ],
      footer: ['Total', String(totalSuppliers), '100%', PS.money(totalSpend), '100%', PS.money(totalSpend / totalSuppliers)]
    },
    a: '<p><strong>' + topCount + '</strong> suppliers (<strong>' + PS.pct(topPctSuppliers) + '</strong> of the base) account for <strong>' +
      PS.money(topSpend) + '</strong> (<strong>' + PS.pct(topPctSpend) + '</strong> of spend).</p>' +
      '<p>The remaining <strong>' + tailCount + '</strong> suppliers carry only <strong>' + PS.pct(tailPctSpend) + '</strong> of spend. ' +
      'Each tail supplier costs roughly the same to administer as a Class A supplier, so the tail is where transaction cost hides.</p>' +
      '<p>Consolidating half the tail could save roughly <strong>' + PS.money(consolidationSavings) + '</strong> a year in transaction cost alone, ' +
      'before any unit-price benefit from volume consolidation.</p>',
    f: ['Class A = suppliers covering 80% of cumulative spend',
      'Concentration ratio = avg Class A spend / avg tail spend',
      'Consolidation = (tail suppliers × 50%) × orders/year × cost/order'],
    as: ['Spend is known and categorized.',
      '80/20 is an observation, not a law.',
      'Tail consolidation saves transaction cost.'],
    w: w,
    k: [topPctSuppliers.toFixed(0) + '% of suppliers hold ' + topPctSpend.toFixed(0) + '% of spend',
      'Tail: ' + tailCount + ' suppliers, ' + PS.money(tailSpend),
      'Consolidation worth ~' + PS.money(consolidationSavings) + '/year'],
    s: 'Pareto: ' + topPctSuppliers.toFixed(0) + '% of suppliers = ' + topPctSpend.toFixed(0) + '% of spend. Tail of ' + tailCount + ' suppliers worth consolidating.',
    d: { topPctSpend: topPctSpend, topPctSuppliers: topPctSuppliers, tailPctSpend: tailPctSpend, tailPctSuppliers: tailPctSuppliers, concentrationRatio: concentrationRatio, consolidationSavings: consolidationSavings, tailCount: tailCount, tailSpend: tailSpend }
  });
};
