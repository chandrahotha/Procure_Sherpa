/* ============ Calc: KPI Quick Calculator ============ */
PS_CALC.push({
  id: 'calc-kpi-calculator', title: 'KPI Quick Calculator', cat: 'KPI Tools', tags: ['kpi', 'achievement', 'variance', 'rag', 'target'],
  purpose: 'Turn any actual-vs-target KPI reading into achievement, variance, trend and a RAG status you can defend :  for higher-better and lower-better measures alike.',
  desc: 'Achievement %, variance, prior-period trend and RAG for any KPI.',
  disclaimerKind: 'data',
  assumptions: ['Direction matters: set whether higher or lower readings are better before reading the RAG.',
    'Thresholds (100% / 95%) are working defaults for routine KPIs; safety or compliance measures deserve tighter bands.',
    'One reading never tells the story: always pair it with the trend.'],
  formula: ['Achievement % = actual / target x 100 (higher-better) or target / actual x 100 (lower-better)',
    'Gap = actual - target, in native points',
    'Trend = actual - prior period, in native points'],
  groups: [PS.G('Reading', 'kpiName actual target priorPeriod kpiDirection')],
  fields: [
    PS.F('kpiName', 'KPI name (for the report)', 'text', '', 'On-time delivery %'),
    PS.F('actual', 'Actual reading', 'qty', 'req,nn', '94.50'),
    PS.F('target', 'Target', 'qty', 'req,pos', '98'),
    PS.F('priorPeriod', 'Prior-period reading', 'qty', 'nn', '92'),
    PS.F('kpiDirection', 'Better direction', 'sel', 'opts=Higher_is_better;Lower_is_better|0')
  ],
  example: { kpiName: 'On-time delivery %', actual: 94.50, target: 98, priorPeriod: 92, kpiDirection: 'Higher is better' },
  handoffTo: ['calc-savings-analysis', 'calc-budget-vs-actual'],
  rel: { sops: ['sop-supplier-performance-management'], kpis: ['kpi-savings', 'kpi-otd', 'kpi-contract-compliance'] },
  run: function (v) { return PS.calcImpl.kpiQuick(v); }
});
