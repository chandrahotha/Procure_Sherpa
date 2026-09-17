/* ============ Calc: Savings Analysis ============ */
PS_CALC.push({
  id: 'calc-savings-analysis', title: 'Savings Analysis', cat: 'Budget & Savings Tools', tags: ['savings', 'annualised', 'payback', 'validation'],
  purpose: 'Turn a negotiated deal into a finance-grade saving: gross, net of implementation cost, annualised over the term, with payback :  the format finance will actually sign.',
  desc: 'Gross-to-net savings with annualisation and payback over the contract term.',
  disclaimerKind: 'finance',
  assumptions: ['The baseline is taken as agreed and locked: baseline games are the most common source of phantom savings.',
    'One-off costs are spread across the term for annualisation but hit cash in year one.',
    'Volumes are treated as flat across the term unless you annualise manually.'],
  formula: ['Gross annual saving = baseline annual cost - new annual cost',
    'Term gross = gross annual x term years; net = term gross - one-off costs',
    'Net annualised = net / term years; payback months = one-offs / (gross annual / 12)'],
  groups: [PS.G('Baseline and new cost', 'baselineAnnual newAnnual contractMonths'),
    PS.G('Cost to achieve', 'oneOffCost implementationCost')],
  fields: [
    PS.F('baselineAnnual', 'Baseline annual cost', 'curr', 'req,nn', '1200000'),
    PS.F('newAnnual', 'New annual cost', 'curr', 'req,nn', '1040000'),
    PS.F('contractMonths', 'Contract term (months)', 'qty', 'req,pos,int,max=120', '36'),
    PS.F('oneOffCost', 'One-off switching or exit costs', 'curr', 'nn', '45000'),
    PS.F('implementationCost', 'Implementation cost', 'curr', 'nn', '15000')
  ],
  example: { baselineAnnual: 1200000, newAnnual: 1040000, contractMonths: 36, oneOffCost: 45000, implementationCost: 15000 },
  handoffTo: ['calc-budget-vs-actual'],
  rel: { sops: ['sop-savings-calculation'], templates: ['tpl-savings-validation'], calcs: ['calc-negotiation-savings', 'calc-budget-vs-actual'], kpis: ['kpi-savings', 'kpi-savings-realization', 'kpi-cost-avoidance'], concepts: ['savings-baseline'], scenarios: ['scn-savings-report'] },
  run: function (v) { return PS.calcImpl.savingsAnalysis(v); }
});
