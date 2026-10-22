/* ==========================================================
   Procurement 360 — Early Payment Discount ROI Calculator
   Should you take the 2/10 net 30 discount? Compare the
   annualized return against your cost of capital.
   ========================================================== */
import { PS } from '../core/ps.ts';

PS.CALC.push({
  id: 'calc-early-payment-roi',
  title: 'Early Payment Discount ROI',
  cat: 'Finance Tools',
  tags: ['early payment', 'discount', 'roi', 'working capital', '2/10 net 30'],
  purpose: 'Calculate the annualized return on taking an early payment discount and compare it against your cost of capital.',
  desc: 'Converts a terms discount like 2/10 net 30 into an annualized rate of return. If the return exceeds your cost of capital, take the discount.',
  assumptions: [
    'The discount is taken every period (not a one-off).',
    'Payment is made on the discount day, not the net day.',
    'No penalty for early payment.'
  ],
  formula: [
    'Periodic return = discount % / (1 - discount %)',
    'Periods per year = 365 / (net days - discount days)',
    'Annualized return = (1 + periodic return)^periods - 1'
  ],
  groups: [PS.G('Terms', 'discountRate discountDays netDays costOfCapital')],
  fields: [
    PS.F('discountRate', 'Discount %', 'pct', 'req,nn', '2'),
    PS.F('discountDays', 'Discount period (days)', 'num', 'req,nn,int', '10'),
    PS.F('netDays', 'Net payment days', 'num', 'req,nn,int', '30'),
    PS.F('costOfCapital', 'Your cost of capital %', 'pct', 'req,nn', '12')
  ],
  example: { discountRate: 2, discountDays: 10, netDays: 30, costOfCapital: 12 },
  handoffTo: ['calc-payment-terms', 'calc-savings-analysis'],
  rel: { sops: ['sop-payment-terms'], checklists: ['cl-invoice-processing'], calcs: ['calc-payment-terms'] },
  run: function (v) { return PS.calcImpl.earlyPaymentRoi(v); }
});

PS.calcImpl.earlyPaymentRoi = function (v: Record<string, unknown>) {
  var disc = PS.num(v.discountRate) / 100;
  var discDays = PS.num(v.discountDays);
  var netDays = PS.num(v.netDays);
  var coc = PS.num(v.costOfCapital) / 100;

  var w: string[] = [];
  if (discDays >= netDays) w.push('Discount period must be shorter than net days. Check the terms.');
  if (disc <= 0) w.push('No discount entered. Confirm the supplier offers one.');

  var periodicReturn = disc / (1 - disc);
  var periodsPerYear = 365 / (netDays - discDays);
  var annualizedReturn = Math.pow(1 + periodicReturn, periodsPerYear) - 1;
  var takeDiscount = annualizedReturn > coc;

  // Example: $100,000 invoice
  var invoice = 100000;
  var discountAmount = invoice * disc;
  var savingsPerYear = discountAmount * periodsPerYear;

  return PS.C({
    r: [
      PS.res('Annualized return', PS.pct(annualizedReturn * 100), 'If you take the discount', '', true),
      PS.res('Your cost of capital', PS.pct(coc * 100), 'Your alternative'),
      PS.res('Decision', takeDiscount ? 'Take the discount' : 'Skip the discount', takeDiscount ? 'Return exceeds cost of capital' : 'Cost of capital exceeds return'),
      PS.res('Effective periods / year', PS.fmt(periodsPerYear, 1), 'How often you could take it'),
      PS.res('Savings on $100k invoice', PS.money(discountAmount), 'Per period')
    ],
    t: {
      headers: ['Component', 'Value', 'Note'],
      numCols: 1,
      rows: [
        { cells: ['Discount', PS.pct(disc * 100), 'As offered'] },
        { cells: ['Periodic return', PS.pct(periodicReturn * 100), 'disc / (1 - disc)'] },
        { cells: ['Periods per year', PS.fmt(periodsPerYear, 1), '365 / (net - disc days)'] },
        { cells: ['Annualized return', PS.pct(annualizedReturn * 100), '(1 + r)^n - 1'] },
        { cells: ['Cost of capital', PS.pct(coc * 100), 'Your alternative'] },
        { cells: ['Decision', takeDiscount ? 'TAKE' : 'SKIP', takeDiscount ? 'Return > CoC' : 'CoC > Return'] }
      ],
      footer: ['Savings on $100k / year', PS.money(savingsPerYear)]
    },
    a: '<p>Taking a <strong>' + PS.pct(disc * 100) + '</strong> discount for paying <strong>' + PS.num(v.discountDays) + '</strong> days early ' +
      'is equivalent to earning <strong>' + PS.pct(annualizedReturn * 100) + '</strong> annualized.</p>' +
      '<p>Your cost of capital is <strong>' + PS.pct(coc * 100) + '</strong>. ' +
      (takeDiscount
        ? '<strong>Take the discount.</strong> The return exceeds your cost of capital by ' + PS.pct((annualizedReturn - coc) * 100) + '.'
        : '<strong>Skip the discount.</strong> Your cost of capital exceeds the return by ' + PS.pct((coc - annualizedReturn) * 100) + '.') + '</p>' +
      '<p>On a $100,000 invoice, that is <strong>' + PS.money(discountAmount) + '</strong> saved per period, ' +
      'or <strong>' + PS.money(savingsPerYear) + '</strong> per year.</p>',
    f: ['Periodic return = discount % / (1 - discount %)',
      'Periods per year = 365 / (net days - discount days)',
      'Annualized return = (1 + periodic return)^periods - 1'],
    as: ['Discount taken every period.',
      'Payment on discount day.',
      'No penalty for early payment.'],
    w: w,
    k: [takeDiscount ? 'Take the discount: ' + PS.pct(annualizedReturn * 100) + ' return' : 'Skip: cost of capital ' + PS.pct(coc * 100) + ' exceeds return',
      'Worth ' + PS.money(discountAmount) + ' per $100k per period',
      PS.fmt(periodsPerYear, 1) + ' periods per year'],
    s: 'Early payment discount ' + PS.pct(disc * 100) + ' = ' + PS.pct(annualizedReturn * 100) + ' annualized. ' + (takeDiscount ? 'Take it.' : 'Skip it.'),
    d: { annualizedReturn: annualizedReturn, costOfCapital: coc, takeDiscount: takeDiscount, periodicReturn: periodicReturn, periodsPerYear: periodsPerYear, discountAmount: discountAmount, savingsPerYear: savingsPerYear }
  });
};
