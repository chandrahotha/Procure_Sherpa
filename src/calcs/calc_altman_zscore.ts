/* ==========================================================
   Procurement 360 — Altman Z-Score Supplier Risk Calculator
   The most-cited supplier solvency model, as a real calculator.
   Z < 1.81 = distress, 1.81-2.99 = grey zone, > 2.99 = safe.
   ========================================================== */
import { PS } from '../core/ps.ts';

PS.CALC.push({
  id: 'calc-altman-zscore',
  title: 'Altman Z-Score (Supplier Risk)',
  cat: 'Supplier Risk Tools',
  tags: ['altman', 'z-score', 'solvency', 'supplier risk', 'financial health', 'bankruptcy'],
  purpose: 'Assess supplier financial health using the Altman Z-Score model. Predicts bankruptcy risk within 2 years.',
  desc: 'Combines five financial ratios into a single score. Z < 1.81 indicates distress, 1.81-2.99 is a grey zone, and > 2.99 indicates safety.',
  assumptions: [
    'The supplier financial statements are accurate and current.',
    'The model is calibrated for manufacturing; service suppliers may need adjustment.',
    'A single score is a screen, not a verdict — combine with qualitative assessment.'
  ],
  formula: [
    'Z = 1.2×X1 + 1.4×X2 + 3.3×X3 + 0.6×X4 + 1.0×X5',
    'X1 = working capital / total assets',
    'X2 = retained earnings / total assets',
    'X3 = EBIT / total assets',
    'X4 = market value equity / total liabilities',
    'X5 = sales / total assets'
  ],
  groups: [PS.G('Balance sheet', 'x1 x2 x3 x4 x5')],
  fields: [
    PS.F('x1', 'X1: Working capital / total assets', 'ratio', 'req,nn', '0.2'),
    PS.F('x2', 'X2: Retained earnings / total assets', 'ratio', 'req,nn', '0.3'),
    PS.F('x3', 'X3: EBIT / total assets', 'ratio', 'req,nn', '0.15'),
    PS.F('x4', 'X4: Market equity / total liabilities', 'ratio', 'req,nn', '1.5'),
    PS.F('x5', 'X5: Sales / total assets', 'ratio', 'req,nn', '1.2')
  ],
  example: { x1: 0.2, x2: 0.3, x3: 0.15, x4: 1.5, x5: 1.2 },
  handoffTo: ['calc-supplier-scorecard', 'calc-supplier-concentration'],
  rel: { sops: ['sop-supplier-risk'], checklists: ['cl-supplier-financial-health'], calcs: ['calc-supplier-scorecard'] },
  run: function (v) { return PS.calcImpl.altmanZScore(v); }
});

PS.calcImpl.altmanZScore = function (v: Record<string, unknown>) {
  var x1 = PS.num(v.x1);
  var x2 = PS.num(v.x2);
  var x3 = PS.num(v.x3);
  var x4 = PS.num(v.x4);
  var x5 = PS.num(v.x5);

  var Z = 1.2 * x1 + 1.4 * x2 + 3.3 * x3 + 0.6 * x4 + 1.0 * x5;

  var zone: string;
  var risk: string;
  var color: string;
  if (Z < 1.81) {
    zone = 'Distress';
    risk = 'High bankruptcy risk within 2 years. Consider dual-sourcing or exit.';
    color = 'danger';
  } else if (Z < 2.99) {
    zone = 'Grey zone';
    risk = 'Uncertain. Monitor closely and require updated financials.';
    color = 'warn';
  } else {
    zone = 'Safe';
    risk = 'Low bankruptcy risk. Standard monitoring applies.';
    color = 'ok';
  }

  // Contribution of each ratio
  var c1 = 1.2 * x1;
  var c2 = 1.4 * x2;
  var c3 = 3.3 * x3;
  var c4 = 0.6 * x4;
  var c5 = 1.0 * x5;

  var w: string[] = [];
  if (Z < 1.81) w.push('Z-Score below 1.81: this supplier is in the distress zone. Do not rely on them as a sole source.');
  if (x3 < 0.1) w.push('EBIT/Assets below 0.10: weak operating profitability. Investigate margin structure.');
  if (x4 < 1) w.push('Market equity below liabilities: negative or thin equity cushion.');
  if (x1 < 0) w.push('Negative working capital: the supplier owes more short-term than it holds.');

  return PS.C({
    r: [
      PS.res('Z-Score', PS.fmt(Z, 2), 'Altman Z-Score', '', true),
      PS.res('Zone', zone, 'Distress < 1.81 < Grey < 2.99 < Safe'),
      PS.res('Risk', risk, 'Interpretation'),
      PS.res('X3 contribution', PS.fmt(c3, 2), 'EBIT/Assets is the heaviest weight (3.3×)')
    ],
    t: {
      headers: ['Ratio', 'Value', 'Weight', 'Contribution'],
      numCols: 2,
      rows: [
        { cells: ['X1: WC/Assets', PS.fmt(x1, 2), '1.2', PS.fmt(c1, 2)] },
        { cells: ['X2: RE/Assets', PS.fmt(x2, 2), '1.4', PS.fmt(c2, 2)] },
        { cells: ['X3: EBIT/Assets', PS.fmt(x3, 2), '3.3', PS.fmt(c3, 2)] },
        { cells: ['X4: Equity/Liab', PS.fmt(x4, 2), '0.6', PS.fmt(c4, 2)] },
        { cells: ['X5: Sales/Assets', PS.fmt(x5, 2), '1.0', PS.fmt(c5, 2)] }
      ],
      footer: ['Z-Score', '', '', PS.fmt(Z, 2)]
    },
    a: '<p>The Altman Z-Score is <strong>' + PS.fmt(Z, 2) + '</strong>, placing this supplier in the <strong>' + PS.esc(zone) + '</strong> zone.</p>' +
      '<p>' + PS.esc(risk) + '</p>' +
      '<p>X3 (EBIT/Assets) carries the heaviest weight at 3.3×. A supplier with weak operating profitability will score poorly even with strong liquidity.</p>' +
      '<p>Use this as a screen, not a verdict. Combine with qualitative assessment, payment terms, and continuity planning.</p>',
    f: ['Z = 1.2×X1 + 1.4×X2 + 3.3×X3 + 0.6×X4 + 1.0×X5',
      'X1 = working capital / total assets',
      'X2 = retained earnings / total assets',
      'X3 = EBIT / total assets',
      'X4 = market value equity / total liabilities',
      'X5 = sales / total assets'],
    as: ['Financial statements are accurate and current.',
      'Model calibrated for manufacturing.',
      'A screen, not a verdict.'],
    w: w,
    k: ['Z-Score ' + PS.fmt(Z, 2) + ' = ' + zone,
      'Heaviest driver: X3 (EBIT/Assets) at ' + PS.fmt(c3, 2),
      risk],
    s: 'Altman Z-Score ' + PS.fmt(Z, 2) + ' (' + zone + '). ' + risk,
    d: { zScore: Z, zone: zone, risk: risk, c1: c1, c2: c2, c3: c3, c4: c4, c5: c5 }
  });
};
