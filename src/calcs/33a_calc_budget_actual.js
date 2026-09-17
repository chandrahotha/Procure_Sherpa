/* ============ Calc: Budget vs Actual ============ */
PS_CALC.push({
  id: 'calc-budget-vs-actual', title: 'Budget vs Actual', cat: 'Budget & Savings Tools', tags: ['budget', 'variance', 'forecast', 'spend control'],
  purpose: 'Turn year-to-date spend into an early warning: pro-rata variance today, full-year forecast, and whether the budget is genuinely at risk or just phasing.',
  desc: 'Pro-rata variance, run-rate forecast and budget status.',
  disclaimerKind: 'finance',
  assumptions: ['The pro-rata comparison spreads the budget evenly: seasonal spend profiles need manual phasing instead.',
    'The forecast is a straight run-rate projection, not a prediction: known step-changes belong in the notes.',
    'Status bands (3% / 7%) are early-warning defaults, not policy.'],
  formula: ['Expected to date = annual budget x months elapsed / 12',
    'Variance = actual to date - expected to date',
    'Forecast outturn = actual to date / months elapsed x 12'],
  groups: [PS.G('Budget position', 'annualBudget actualToDate monthsElapsed priorYear')],
  fields: [
    PS.F('annualBudget', 'Annual budget', 'curr', 'req,nn', '1200000'),
    PS.F('actualToDate', 'Actual spend to date', 'curr', 'req,nn', '720000'),
    PS.F('monthsElapsed', 'Months elapsed', 'qty', 'req,nn,int,min=1,max=12', '7'),
    PS.F('priorYear', 'Prior full-year spend (0 = unknown)', 'curr', 'nn', '1150000')
  ],
  example: { annualBudget: 1200000, actualToDate: 720000, monthsElapsed: 7, priorYear: 1150000 },
  handoffTo: ['calc-savings-analysis'],
  rel: { sops: ['sop-procurement-intake'], templates: ['tpl-savings-validation'], calcs: ['calc-savings-analysis'], kpis: ['kpi-sum'], scenarios: ['scn-savings-report'] },
  run: function (v) { return PS.calcImpl.budgetActual(v); }
});
