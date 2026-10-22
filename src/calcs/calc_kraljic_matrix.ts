/* ==========================================================
   Procurement 360 — Kraljic Portfolio Matrix Calculator
   Segments a category into Strategic, Leverage, Bottleneck
   or Non-Critical, and recommends the sourcing strategy.
   ========================================================== */
import { PS } from '../core/ps.ts';

PS.CALC.push({
  id: 'calc-kraljic-matrix',
  title: 'Kraljic Portfolio Matrix',
  cat: 'Sourcing Tools',
  tags: ['kraljic', 'portfolio', 'segmentation', 'category strategy', 'sourcing'],
  purpose: 'Segment a category by supply risk and profit impact to select the right sourcing strategy.',
  desc: 'Plots a category on the Kraljic 2×2: Strategic (high/high), Leverage (low risk/high impact), Bottleneck (high risk/low impact), Non-Critical (low/low). Recommends the strategy for each quadrant.',
  assumptions: [
    'Supply risk and profit impact can be scored 0-100.',
    'A single category occupies one quadrant; mixed categories should be split.',
    'The quadrant drives the negotiation stance, not the outcome.'
  ],
  formula: [
    'Quadrant = f(supplyRisk, profitImpact)',
    'Strategic: risk > 50 AND impact > 50',
    'Leverage: risk <= 50 AND impact > 50',
    'Bottleneck: risk > 50 AND impact <= 50',
    'Non-critical: risk <= 50 AND impact <= 50'
  ],
  groups: [PS.G('Category position', 'supplyRisk profitImpact annualSpend')],
  fields: [
    PS.F('supplyRisk', 'Supply market risk (0-100)', 'pct', 'req,nn,max=100', '60'),
    PS.F('profitImpact', 'Profit impact (0-100)', 'pct', 'req,nn,max=100', '70'),
    PS.F('annualSpend', 'Annual spend on this category', 'curr', 'req,nn', '500000')
  ],
  example: { supplyRisk: 60, profitImpact: 70, annualSpend: 500000 },
  handoffTo: ['calc-weighted-bid-eval', 'calc-supplier-scorecard'],
  rel: { sops: ['sop-supplier-risk'], checklists: ['cl-category-review'], calcs: ['calc-weighted-bid-eval'] },
  run: function (v) { return PS.calcImpl.kraljicMatrix(v); }
});

PS.calcImpl.kraljicMatrix = function (v: Record<string, unknown>) {
  var risk = PS.num(v.supplyRisk);
  var impact = PS.num(v.profitImpact);
  var spend = PS.num(v.annualSpend);

  var quadrant: string, strategy: string, action: string;
  if (risk > 50 && impact > 50) {
    quadrant = 'Strategic';
    strategy = 'Partner. Long-term relationships, joint development, shared risk.';
    action = 'Build supplier partnerships. Dual-source if possible. Executive sponsorship.';
  } else if (risk <= 50 && impact > 50) {
    quadrant = 'Leverage';
    strategy = 'Exploit. Competitive tension, aggressive negotiation, switchable supply.';
    action = 'Run competitive events. Consolidate volume. Play the market.';
  } else if (risk > 50 && impact <= 50) {
    quadrant = 'Bottleneck';
    strategy = 'Secure. Guarantee supply, qualify alternatives, hold safety stock.';
    action = 'Secure contingency supply. Qualify backups. Hold buffer inventory.';
  } else {
    quadrant = 'Non-critical';
    strategy = 'Automate. Simplify, standardize, reduce transaction cost.';
    action = 'Automate ordering. Use catalogs or P-cards. Minimize touch time.';
  }

  // Supplier posture
  var supplierCount = quadrant === 'Strategic' ? 1 : quadrant === 'Leverage' ? 3 : quadrant === 'Bottleneck' ? 2 : 5;
  var negotiationStance = quadrant === 'Strategic' ? 'Collaborative' : quadrant === 'Leverage' ? 'Aggressive' : quadrant === 'Bottleneck' ? 'Defensive' : 'Transactional';

  return PS.C({
    r: [
      PS.res('Quadrant', quadrant, 'Kraljic classification', '', true),
      PS.res('Strategy', strategy.split('.')[0], 'Sourcing posture'),
      PS.res('Recommended suppliers', String(supplierCount), 'Target count for this quadrant'),
      PS.res('Negotiation stance', negotiationStance, 'How to sit across the table'),
      PS.res('Annual spend', PS.money(spend), 'Category value at stake')
    ],
    t: {
      headers: ['Quadrant', 'Risk', 'Impact', 'Strategy'],
      rows: [
        { cells: ['Strategic', 'High', 'High', 'Partner'] },
        { cells: ['Leverage', 'Low', 'High', 'Exploit'] },
        { cells: ['Bottleneck', 'High', 'Low', 'Secure'] },
        { cells: ['Non-critical', 'Low', 'Low', 'Automate'] },
      ],
      footer: ['This category', risk > 50 ? 'High' : 'Low', impact > 50 ? 'High' : 'Low', quadrant]
    },
    a: '<p>This category sits in the <strong>' + quadrant + '</strong> quadrant with ' +
      'supply risk at <strong>' + PS.pct(risk) + '</strong> and profit impact at <strong>' + PS.pct(impact) + '</strong>.</p>' +
      '<p><strong>Strategy:</strong> ' + PS.esc(strategy) + '</p>' +
      '<p><strong>Action:</strong> ' + PS.esc(action) + '</p>' +
      '<p>The Kraljic matrix is the first question of category strategy: it tells you <em>how</em> to engage the market before you worry about <em>what</em> to negotiate.</p>',
    f: ['Strategic: risk > 50 AND impact > 50',
      'Leverage: risk <= 50 AND impact > 50',
      'Bottleneck: risk > 50 AND impact <= 50',
      'Non-critical: risk <= 50 AND impact <= 50'],
    as: ['Risk and impact scored 0-100.',
      'One category occupies one quadrant.',
      'The quadrant drives the stance, not the outcome.'],
    w: [],
    k: [quadrant + ' quadrant',
      'Strategy: ' + strategy.split('.')[0],
      'Target ' + supplierCount + ' supplier(s)'],
    s: 'Kraljic: ' + quadrant + ' quadrant. ' + strategy.split('.')[0] + '.',
    d: { quadrant: quadrant, strategy: strategy, supplierCount: supplierCount, negotiationStance: negotiationStance, risk: risk, impact: impact }
  });
};
