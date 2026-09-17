/* ============ Calc: Supplier Concentration / HHI ============ */
PS_CALC.push({
  id: 'calc-supplier-concentration', title: 'Supplier Concentration', cat: 'Supplier Tools', tags: ['concentration', 'hhi', 'dependency', 'single source', 'risk'],
  purpose: 'Measure how dangerously your spend is concentrated in a few suppliers using the Herfindahl-Hirschman Index, so dependency stops being a feeling and becomes a number.',
  desc: 'HHI concentration index from up to five supplier spends, with dependency verdict.',
  disclaimerKind: 'finance',
  assumptions: ['Shares are computed from the spends entered: incomplete category spend understates concentration.',
    'HHI bands follow standard competition thresholds (1500 / 2500) applied as procurement risk signals.',
    'The index measures concentration only, not supplier quality or substitutability.'],
  formula: ['Share = supplier spend / total spend',
    'HHI = sum(share-% squared), on a 0-10000 scale',
    'Below 1500 unconcentrated, 1500-2500 moderate, above 2500 highly concentrated'],
  groups: [PS.G('Annual spend by supplier', 'spend1 spend2 spend3 spend4 spend5')],
  fields: [
    PS.F('spend1', 'Supplier 1 spend', 'curr', 'nn', '850000'),
    PS.F('spend2', 'Supplier 2 spend', 'curr', 'nn', '420000'),
    PS.F('spend3', 'Supplier 3 spend', 'curr', 'nn', '180000'),
    PS.F('spend4', 'Supplier 4 spend', 'curr', 'nn', '90000'),
    PS.F('spend5', 'Supplier 5 spend', 'curr', 'nn', '60000')
  ],
  example: { spend1: 850000, spend2: 420000, spend3: 180000, spend4: 90000, spend5: 60000 },
  handoffTo: ['calc-supplier-scorecard'],
  rel: { sops: ['sop-supplier-performance-management', 'sop-supplier-evaluation'], decisions: ['supplier-concentration', 'dual-source'], kpis: ['kpi-supplier-concentration'], glossary: ['gloss-hhi'], scenarios: ['scn-supplier-risk'] },
  run: function (v) { return PS.calcImpl.concentration(v); }
});
