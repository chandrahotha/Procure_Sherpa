/* ==========================================================
   Procurement 360 — DPO & Cash Conversion Cycle
   Days Payable Outstanding, Days Sales Outstanding, Days
   Inventory Outstanding, and the CCC that binds them.
   ========================================================== */
import { PS } from '../core/ps.ts';

PS.CALC.push({
  id: 'calc-dpo-working-capital',
  title: 'DPO & Cash Conversion Cycle',
  cat: 'Finance Tools',
  tags: ['dpo', 'days payable', 'cash conversion cycle', 'working capital', 'dso', 'dio'],
  purpose: 'Calculate Days Payable Outstanding and the Cash Conversion Cycle. Quantify the working capital released by improving payment terms.',
  desc: 'DPO measures how long you take to pay suppliers. Combined with DSO (how long customers take to pay you) and DIO (how long inventory sits), it gives the Cash Conversion Cycle: the days your cash is trapped.',
  assumptions: [
    'Cost of goods sold (COGS) is used for DPO and DIO; revenue for DSO.',
    'A shorter CCC is better: cash returns to the bank sooner.',
    'Extending DPO shifts cost to suppliers — expect price consequences.'
  ],
  formula: [
    'DPO = (accounts payable / COGS) × 365',
    'DSO = (accounts receivable / revenue) × 365',
    'DIO = (inventory / COGS) × 365',
    'CCC = DSO + DIO − DPO',
    'Working capital released = ΔDPO × (COGS / 365)'
  ],
  groups: [PS.G('Balance sheet inputs', 'accountsPayable cogs inventory accountsReceivable revenue costOfCapital targetDpo')],
  fields: [
    PS.F('accountsPayable', 'Accounts payable', 'curr', 'req,nn', '2000000'),
    PS.F('cogs', 'Annual COGS', 'curr', 'req,nn', '16000000'),
    PS.F('inventory', 'Inventory value', 'curr', 'req,nn', '3000000'),
    PS.F('accountsReceivable', 'Accounts receivable', 'curr', 'req,nn', '2500000'),
    PS.F('revenue', 'Annual revenue', 'curr', 'req,nn', '25000000'),
    PS.F('costOfCapital', 'Cost of capital %', 'pct', 'req,nn', '12'),
    PS.F('targetDpo', 'Target DPO (days)', 'num', 'req,nn', '60')
  ],
  example: { accountsPayable: 2000000, cogs: 16000000, inventory: 3000000, accountsReceivable: 2500000, revenue: 25000000, costOfCapital: 12, targetDpo: 60 },
  handoffTo: ['calc-early-payment-roi', 'calc-payment-terms'],
  rel: { sops: ['sop-payment-terms'], checklists: ['cl-invoice-processing'], calcs: ['calc-early-payment-roi'] },
  run: function (v) { return PS.calcImpl.dpoWorkingCapital(v); }
});

PS.calcImpl.dpoWorkingCapital = function (v: Record<string, unknown>) {
  var ap = PS.num(v.accountsPayable);
  var cogs = PS.num(v.cogs);
  var inv = PS.num(v.inventory);
  var ar = PS.num(v.accountsReceivable);
  var rev = PS.num(v.revenue);
  var coc = PS.num(v.costOfCapital) / 100;
  var target = PS.num(v.targetDpo);

  var dpo = cogs > 0 ? ap / cogs * 365 : 0;
  var dso = rev > 0 ? ar / rev * 365 : 0;
  var dio = cogs > 0 ? inv / cogs * 365 : 0;
  var ccc = dso + dio - dpo;

  var dailyCogs = cogs / 365;
  var deltaDpo = target - dpo;
  var wcReleased = deltaDpo * dailyCogs;
  var annualValue = wcReleased * coc;
  var cccAtTarget = dso + dio - target;

  var w: string[] = [];
  if (deltaDpo < 0) w.push('Target DPO is below current DPO: you would be giving away working capital. Verify this is intentional (e.g., for a discount).');
  if (dpo > 90) w.push('DPO above 90 days is aggressive. Suppliers will price the delay into their rates.');
  if (ccc < 0) w.push('Negative CCC: suppliers fund your operation. Excellent if sustainable and not abusive.');
  if (deltaDpo > 30) w.push('A 30+ day DPO extension in one negotiation is rarely achievable. Phase it.');

  var verdict = ccc < 0 ? 'Suppliers fund you' : ccc < 30 ? 'Efficient' : ccc < 60 ? 'Typical' : 'Cash trapped';

  return PS.C({
    r: [
      PS.res('DPO', PS.fmt(dpo, 0) + ' days', 'How long you take to pay', '', true),
      PS.res('DSO', PS.fmt(dso, 0) + ' days', 'How long customers take to pay you'),
      PS.res('DIO', PS.fmt(dio, 0) + ' days', 'How long inventory sits'),
      PS.res('Cash Conversion Cycle', PS.fmt(ccc, 0) + ' days', verdict),
      PS.res('Working capital released', PS.money(wcReleased), 'From moving DPO to ' + PS.fmt(target, 0) + ' days'),
      PS.res('Annual value of release', PS.money(annualValue), 'At ' + PS.pct(coc * 100) + ' cost of capital')
    ],
    t: {
      headers: ['Metric', 'Value', 'Meaning'],
      numCols: 1,
      rows: [
        { cells: ['DPO', PS.fmt(dpo, 1) + ' days', 'AP / COGS × 365'] },
        { cells: ['DSO', PS.fmt(dso, 1) + ' days', 'AR / Revenue × 365'] },
        { cells: ['DIO', PS.fmt(dio, 1) + ' days', 'Inventory / COGS × 365'] },
        { cells: ['CCC', PS.fmt(ccc, 1) + ' days', 'DSO + DIO − DPO'] },
        { cells: ['CCC at target DPO', PS.fmt(cccAtTarget, 1) + ' days', 'If DPO reaches ' + PS.fmt(target, 0)] },
        { cells: ['Working capital released', PS.money(wcReleased), 'ΔDPO × daily COGS'] },
        { cells: ['Annual value', PS.money(annualValue), 'Released × cost of capital'] },
      ],
      footer: ['Verdict', verdict, '']
    },
    a: '<p>Your DPO is <strong>' + PS.fmt(dpo, 0) + ' days</strong>. The Cash Conversion Cycle is <strong>' + PS.fmt(ccc, 0) + ' days</strong> — ' + verdict.toLowerCase() + '.</p>' +
      '<p>Moving DPO to <strong>' + PS.fmt(target, 0) + ' days</strong> releases <strong>' + PS.money(wcReleased) + '</strong> of working capital, ' +
      'worth <strong>' + PS.money(annualValue) + '</strong> a year at your ' + PS.pct(coc * 100) + ' cost of capital.</p>' +
      '<p>CCC = DSO + DIO − DPO. The three levers: collect faster (DSO), hold less inventory (DIO), pay slower (DPO). ' +
      'Procurement owns the third lever and influences the second.</p>' +
      '<p>Every day of DPO extension is a day of supplier credit. It is a negotiation, not a right — expect the price to reflect it.</p>',
    f: ['DPO = (AP / COGS) × 365',
      'DSO = (AR / Revenue) × 365',
      'DIO = (Inventory / COGS) × 365',
      'CCC = DSO + DIO − DPO',
      'Working capital released = ΔDPO × (COGS / 365)'],
    as: ['COGS for DPO and DIO; revenue for DSO.',
      'Shorter CCC is better.',
      'Extending DPO shifts cost to suppliers.'],
    w: w,
    k: ['DPO ' + PS.fmt(dpo, 0) + ' days, CCC ' + PS.fmt(ccc, 0) + ' days',
      'Releasing ' + PS.money(wcReleased) + ' by moving DPO to ' + PS.fmt(target, 0),
      'Worth ' + PS.money(annualValue) + '/year at ' + PS.pct(coc * 100) + ' CoC'],
    s: 'DPO ' + PS.fmt(dpo, 0) + ' days, CCC ' + PS.fmt(ccc, 0) + ' days (' + verdict + '). Extending DPO to ' + PS.fmt(target, 0) + ' releases ' + PS.money(annualValue) + '/year.',
    d: { dpo: dpo, dso: dso, dio: dio, ccc: ccc, cccAtTarget: cccAtTarget, wcReleased: wcReleased, annualValue: annualValue, verdict: verdict }
  });
};
