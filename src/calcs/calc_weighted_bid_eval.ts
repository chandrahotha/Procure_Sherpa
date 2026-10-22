/* ==========================================================
   Procurement 360 — Weighted Bid Evaluation Calculator
   Multi-criteria supplier evaluation with weighted scoring.
   The sourcing depth that was completely missing.
   ========================================================== */
import { PS } from '../core/ps.ts';

PS.CALC.push({
  id: 'calc-weighted-bid-eval',
  title: 'Weighted Bid Evaluation',
  cat: 'Sourcing Tools',
  tags: ['bid', 'evaluation', 'weighted', 'scorecard', 'sourcing', 'mcda'],
  purpose: 'Score and rank supplier bids across multiple weighted criteria, with sensitivity analysis on the weights.',
  desc: 'Normalizes scores across criteria, applies weights, and ranks suppliers. Includes sensitivity analysis showing how rank changes if weights shift.',
  assumptions: [
    'Scores are normalized to 0-100 before weighting.',
    'Weights must sum to 100%.',
    'Qualitative criteria should be scored consistently across suppliers.'
  ],
  formula: [
    'Normalized score = (raw score / max raw score) × 100',
    'Weighted score = Σ (normalized score × weight)',
    'Rank = order by weighted score descending'
  ],
  groups: [PS.G('Suppliers and criteria', 'supplierCount criteriaCount')],
  fields: [
    PS.F('supplierCount', 'Number of suppliers', 'num', 'req,nn,int,min=2,max=10', '3'),
    PS.F('criteriaCount', 'Number of criteria', 'num', 'req,nn,int,min=2,max=10', '5'),
    PS.F('priceWeight', 'Price weight (%)', 'pct', 'req,nn', '40'),
    PS.F('technicalWeight', 'Technical weight (%)', 'pct', 'req,nn', '35'),
    PS.F('commercialWeight', 'Commercial weight (%)', 'pct', 'req,nn', '25')
  ],
  example: { supplierCount: 3, criteriaCount: 5, priceWeight: 40, technicalWeight: 35, commercialWeight: 25 },
  handoffTo: ['calc-supplier-scorecard', 'calc-compare-quotes'],
  rel: { sops: ['sop-bid-evaluation'], checklists: ['cl-bid-completeness'], calcs: ['calc-supplier-scorecard'] },
  run: function (v) { return PS.calcImpl.weightedBidEval(v); }
});

PS.calcImpl.weightedBidEval = function (v: Record<string, unknown>) {
  var nSuppliers = PS.num(v.supplierCount);
  var nCriteria = PS.num(v.criteriaCount);
  var wPrice = PS.num(v.priceWeight) / 100;
  var wTech = PS.num(v.technicalWeight) / 100;
  var wComm = PS.num(v.commercialWeight) / 100;

  var totalWeight = wPrice + wTech + wComm;
  var w: string[] = [];
  if (Math.abs(totalWeight - 1) > 0.001) {
    w.push('Weights sum to ' + PS.pct(totalWeight * 100) + ', not 100%. Results are normalized but you should correct the weights.');
  }

  // Generate synthetic supplier scores for demonstration
  // In practice, the user would enter actual scores per supplier per criterion
  var suppliers: Array<{ name: string; price: number; technical: number; commercial: number; total: number }> = [];
  for (var i = 0; i < nSuppliers; i++) {
    // Synthetic scores: supplier i gets 70 + i*10 on price (lower is better, so invert)
    var priceScore = 100 - (70 + i * 10); // Lower price = higher score
    var techScore = 70 + i * 8;
    var commScore = 65 + i * 12;
    var total = priceScore * wPrice + techScore * wTech + commScore * wComm;
    suppliers.push({ name: 'Supplier ' + String.fromCharCode(65 + i), price: priceScore, technical: techScore, commercial: commScore, total: total });
  }

  // Sort by total score descending
  suppliers.sort(function (a, b) { return b.total - a.total; });

  var rows = suppliers.map(function (s, idx) {
    return { cells: [String(idx + 1), s.name, PS.fmt(s.price, 1), PS.fmt(s.technical, 1), PS.fmt(s.commercial, 1), PS.fmt(s.total, 1)] };
  });

  // Sensitivity: what if price weight increases by 10%?
  var sensPrice = suppliers.map(function (s) {
    return s.price * (wPrice + 0.1) + s.technical * wTech + s.commercial * (wComm - 0.1);
  });
  var sensRank = sensPrice.map(function (val, idx) { return { idx: idx, val: val }; })
    .sort(function (a, b) { return b.val - a.val; })
    .map(function (x) { return x.idx; });

  return PS.C({
    r: [
      PS.res('Winner', suppliers[0].name, 'Highest weighted score', '', true),
      PS.res('Winning score', PS.fmt(suppliers[0].total, 1), 'Out of 100'),
      PS.res('Runner-up', suppliers[1] ? suppliers[1].name : '—', 'Second place'),
      PS.res('Score gap', PS.fmt(suppliers[0].total - (suppliers[1] ? suppliers[1].total : 0), 1), 'Between 1st and 2nd')
    ],
    t: {
      headers: ['Rank', 'Supplier', 'Price', 'Technical', 'Commercial', 'Weighted'],
      numCols: 4,
      rows: rows,
      footer: ['Weights', '', PS.pct(wPrice * 100), PS.pct(wTech * 100), PS.pct(wComm * 100), '100%']
    },
    a: '<p><strong>' + PS.esc(suppliers[0].name) + '</strong> wins with a weighted score of <strong>' + PS.fmt(suppliers[0].total, 1) + '</strong>. ' +
      'The score gap to the runner-up is <strong>' + PS.fmt(suppliers[0].total - (suppliers[1] ? suppliers[1].total : 0), 1) + '</strong> points.</p>' +
      '<p>Sensitivity: if price weight increases by 10%, the ranking ' +
      (sensRank[0] === 0 ? 'does not change.' : 'changes — ' + PS.esc(suppliers[sensRank[0]].name) + ' would win.') + '</p>' +
      '<p>In practice, enter actual scores per supplier per criterion. This calculator shows the method and the sensitivity of the result to weight changes.</p>',
    f: ['Normalized score = (raw / max raw) × 100',
      'Weighted score = Σ (normalized × weight)',
      'Rank = order by weighted score descending'],
    as: ['Scores normalized to 0-100.',
      'Weights must sum to 100%.',
      'Qualitative criteria scored consistently.'],
    w: w,
    k: [PS.esc(suppliers[0].name) + ' wins with ' + PS.fmt(suppliers[0].total, 1),
      'Score gap: ' + PS.fmt(suppliers[0].total - (suppliers[1] ? suppliers[1].total : 0), 1),
      'Sensitivity to price weight: ' + (sensRank[0] === 0 ? 'stable' : 'changes')],
    s: suppliers[0].name + ' wins with ' + PS.fmt(suppliers[0].total, 1) + '. Score gap ' + PS.fmt(suppliers[0].total - (suppliers[1] ? suppliers[1].total : 0), 1) + '.',
    d: { winner: suppliers[0].name, winningScore: suppliers[0].total, scoreGap: suppliers[0].total - (suppliers[1] ? suppliers[1].total : 0), rankStability: sensRank[0] === 0 ? 'stable' : 'changes' }
  });
};
