/* ==========================================================
   Procurement 360 — RFx Event ROI Calculator
   Does the sourcing event pay for itself? Compares event
   cost against addressable spend and expected savings.
   ========================================================== */
import { PS } from '../core/ps.ts';

PS.CALC.push({
  id: 'calc-rfx-event-roi',
  title: 'RFx Event ROI',
  cat: 'Sourcing Tools',
  tags: ['rfx', 'event', 'roi', 'sourcing', 'tender', 'bid', 'savings'],
  purpose: 'Compare the cost of running a sourcing event against the savings it produces, with payback period.',
  desc: 'Takes event cost (effort + platform + legal), addressable spend, and expected savings % to produce net savings, ROI, and payback period.',
  assumptions: [
    'Savings are annualized against the new contract term.',
    'Event cost is fully loaded: salaries, platform, legal, evaluation time.',
    'Savings percentage reflects a realistic target, not a wish.'
  ],
  formula: [
    'Gross savings = addressable spend × savings %',
    'Net savings = gross savings − event cost',
    'ROI = net savings / event cost',
    'Payback (months) = event cost / (net savings / 12)'
  ],
  groups: [PS.G('Event economics', 'eventCost addressableSpend expectedSavingsPct contractYears')],
  fields: [
    PS.F('eventCost', 'Total event cost', 'curr', 'req,nn', '25000'),
    PS.F('addressableSpend', 'Addressable spend under the event', 'curr', 'req,nn', '1000000'),
    PS.F('expectedSavingsPct', 'Expected savings %', 'pct', 'req,nn', '8'),
    PS.F('contractYears', 'Contract term (years)', 'num', 'req,nn,int,min=1', '3')
  ],
  example: { eventCost: 25000, addressableSpend: 1000000, expectedSavingsPct: 8, contractYears: 3 },
  handoffTo: ['calc-savings-analysis', 'calc-weighted-bid-eval'],
  rel: { sops: ['sop-supplier-risk'], checklists: ['cl-bid-completeness'], calcs: ['calc-savings-analysis'] },
  run: function (v) { return PS.calcImpl.rfxEventRoi(v); }
});

PS.calcImpl.rfxEventRoi = function (v: Record<string, unknown>) {
  var cost = PS.num(v.eventCost);
  var spend = PS.num(v.addressableSpend);
  var pct = PS.num(v.expectedSavingsPct) / 100;
  var years = PS.num(v.contractYears);

  var grossAnnual = spend * pct;
  var grossTerm = grossAnnual * years;
  var netAnnual = grossAnnual; // cost is one-time
  var netTerm = grossTerm - cost;
  var roi = cost > 0 ? netTerm / cost : 0;
  var paybackMonths = grossAnnual > 0 ? cost / (grossAnnual / 12) : 0;

  var w: string[] = [];
  if (pct > 0.15) w.push('Expected savings above 15% is aggressive for a first event. Benchmark against your category history before committing.');
  if (paybackMonths > 12) w.push('Payback exceeds 12 months. Verify the event is worth it, or increase the addressable spend in scope.');
  if (spend < cost * 10) w.push('Event cost exceeds 10% of addressable spend. Consider a simpler 3-quote process.');

  var verdict = roi > 5 ? 'Strong case' : roi > 2 ? 'Good case' : roi > 0 ? 'Marginal' : 'Not worth it';

  return PS.C({
    r: [
      PS.res('Gross savings (annual)', PS.money(grossAnnual), PS.pct(pct * 100) + ' of ' + PS.moneyR(spend), '', true),
      PS.res('Net savings over term', PS.money(netTerm), 'After event cost'),
      PS.res('ROI', PS.pct(roi * 100) + '×', 'Return on event cost'),
      PS.res('Payback period', PS.fmt(paybackMonths, 1) + ' months', 'Time to recover event cost'),
      PS.res('Verdict', verdict, 'Should you run the event?')
    ],
    t: {
      headers: ['Component', 'Value', 'Note'],
      numCols: 1,
      rows: [
        { cells: ['Event cost (one-time)', PS.money(cost), 'Fully loaded'] },
        { cells: ['Addressable spend', PS.money(spend), 'In scope'] },
        { cells: ['Expected savings', PS.pct(pct * 100), 'Target rate'] },
        { cells: ['Gross savings / year', PS.money(grossAnnual), 'Spend × rate'] },
        { cells: ['Gross savings / term', PS.money(grossTerm), years + ' years'] },
        { cells: ['Net savings / term', PS.money(netTerm), 'Gross − cost'] },
        { cells: ['ROI', PS.fmt(roi, 1) + '×', 'Net / cost'] },
        { cells: ['Payback', PS.fmt(paybackMonths, 1) + ' mo', 'Cost ÷ monthly savings'] },
      ],
      footer: ['Verdict', verdict, '']
    },
    a: '<p>A ' + PS.pct(pct * 100) + ' saving on ' + PS.moneyR(spend) + ' yields <strong>' + PS.money(grossAnnual) + '</strong> per year.</p>' +
      '<p>Over a ' + years + '-year term that is <strong>' + PS.money(grossTerm) + '</strong> gross. After a one-time event cost of <strong>' +
      PS.money(cost) + '</strong>, net savings are <strong>' + PS.money(netTerm) + '</strong>.</p>' +
      '<p><strong>ROI: ' + PS.fmt(roi, 1) + '×</strong> with payback in <strong>' + PS.fmt(paybackMonths, 1) + ' months</strong>. ' + verdict + '.</p>' +
      '<p>An RFx is an investment. This calculator tells you whether the investment clears the bar before you spend six weeks on it.</p>',
    f: ['Gross = spend × savings %',
      'Net over term = gross × years − event cost',
      'ROI = net / event cost',
      'Payback months = event cost / (gross / 12)'],
    as: ['Savings annualized over the contract term.',
      'Event cost fully loaded.',
      'Savings target is realistic, not aspirational.'],
    w: w,
    k: ['Net savings ' + PS.moneyR(netTerm) + ' over ' + years + ' years',
      'ROI ' + PS.fmt(roi, 1) + '×',
      'Payback ' + PS.fmt(paybackMonths, 1) + ' months'],
    s: 'RFx ROI: ' + PS.fmt(roi, 1) + '× on ' + PS.moneyR(spend) + ' spend. Payback ' + PS.fmt(paybackMonths, 1) + ' months. ' + verdict + '.',
    d: { grossAnnual: grossAnnual, grossTerm: grossTerm, netTerm: netTerm, roi: roi, paybackMonths: paybackMonths, verdict: verdict }
  });
};
