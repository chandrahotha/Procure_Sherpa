/* ==========================================================
   Procurement 360 — Addressable Spend Cube Calculator
   How much of your spend can procurement actually touch?
   The denominator of every savings claim.
   ========================================================== */
import { PS } from '../core/ps.ts';

PS.CALC.push({
  id: 'calc-addressable-spend',
  title: 'Addressable Spend Cube',
  cat: 'Sourcing Tools',
  tags: ['addressable spend', 'spend cube', 'coverage', 'tail spend', 'sourcing opportunity'],
  purpose: 'Quantify how much spend procurement can influence, how much is under contract, and how much sits in the unmanaged tail.',
  desc: 'Total spend is not the same as influenceable spend. This calculator splits spend into addressable, contracted, and tail — the honest denominator for any savings target.',
  assumptions: [
    'Addressable spend excludes items procurement cannot influence (e.g., taxes, intercompany, payroll).',
    'Contract coverage means spend flowing through a negotiated agreement, not just a PO.',
    'The tail is where maverick spend hides.'
  ],
  formula: [
    'Addressable spend = total spend × addressable %',
    'Contracted spend = addressable spend × coverage %',
    'Tail spend = addressable spend − contracted spend',
    'Sourcing opportunity = (tail spend + uncontracted addressable) × savings target %'
  ],
  groups: [PS.G('Spend profile', 'totalSpend addressablePct contractCoveragePct tailSpendPct savingsTargetPct')],
  fields: [
    PS.F('totalSpend', 'Total spend', 'curr', 'req,nn', '50000000'),
    PS.F('addressablePct', 'Addressable spend %', 'pct', 'req,nn,max=100', '80'),
    PS.F('contractCoveragePct', 'Contract coverage %', 'pct', 'req,nn,max=100', '60'),
    PS.F('tailSpendPct', 'Tail spend % of addressable', 'pct', 'req,nn,max=100', '20'),
    PS.F('savingsTargetPct', 'Savings target %', 'pct', 'req,nn', '5')
  ],
  example: { totalSpend: 50000000, addressablePct: 80, contractCoveragePct: 60, tailSpendPct: 20, savingsTargetPct: 5 },
  handoffTo: ['calc-pareto-analysis', 'calc-rfx-event-roi'],
  rel: { sops: ['sop-inventory-management'], checklists: ['cl-category-review'], calcs: ['calc-pareto-analysis'] },
  run: function (v) { return PS.calcImpl.addressableSpend(v); }
});

PS.calcImpl.addressableSpend = function (v: Record<string, unknown>) {
  var total = PS.num(v.totalSpend);
  var addrPct = PS.num(v.addressablePct) / 100;
  var covPct = PS.num(v.contractCoveragePct) / 100;
  var tailPct = PS.num(v.tailSpendPct) / 100;
  var savPct = PS.num(v.savingsTargetPct) / 100;

  var addressable = total * addrPct;
  var contracted = addressable * covPct;
  var tail = addressable * tailPct;
  var uncontractedAddressable = addressable - contracted;

  // Opportunity: the tail (no contract leverage) plus uncontracted addressable spend
  var opportunityBase = tail + uncontractedAddressable;
  var opportunity = opportunityBase * savPct;

  // Coverage gap: addressable spend not under contract
  var coverageGap = addressable - contracted;
  var coverageGapPct = addressable > 0 ? coverageGap / addressable * 100 : 0;

  // Maverick spend estimate: tail spend is a proxy
  var maverickEstimate = tail * 0.5; // conservative: half the tail is maverick

  var w: string[] = [];
  if (covPct < 0.5) w.push('Contract coverage below 50%: more spend flows outside negotiated agreements than through them. This is the first thing to fix.');
  if (tailPct > 0.3) w.push('Tail spend above 30% of addressable: a large share of spend is unmanaged. Consider catalogs, P-cards or a tail-spend agency.');
  if (addrPct < 0.6) w.push('Addressable spend below 60% of total: verify the exclusion list. Some "unaddressable" spend may be movable.');

  return PS.C({
    r: [
      PS.res('Addressable spend', PS.money(addressable), PS.pct(addrPct * 100) + ' of ' + PS.moneyR(total), '', true),
      PS.res('Under contract', PS.money(contracted), PS.pct(covPct * 100) + ' coverage'),
      PS.res('Uncontracted (coverage gap)', PS.money(coverageGap), PS.pct(coverageGapPct) + ' of addressable'),
      PS.res('Tail spend', PS.money(tail), PS.pct(tailPct * 100) + ' of addressable'),
      PS.res('Sourcing opportunity', PS.money(opportunity), 'At ' + PS.pct(savPct * 100) + ' on the opportunity base'),
      PS.res('Maverick spend (est.)', PS.money(maverickEstimate), 'Half the tail, conservatively')
    ],
    t: {
      headers: ['Segment', 'Value', '% of total', 'Note'],
      numCols: 1,
      rows: [
        { cells: ['Total spend', PS.money(total), '100%', 'Everything the business buys'] },
        { cells: ['Addressable', PS.money(addressable), PS.pct(addrPct * 100), 'Procurement can influence'] },
        { cells: ['Under contract', PS.money(contracted), PS.pct(total > 0 ? contracted / total * 100 : 0), 'Through negotiated agreements'] },
        { cells: ['Uncontracted', PS.money(coverageGap), PS.pct(total > 0 ? coverageGap / total * 100 : 0), 'Addressable but not contracted'] },
        { cells: ['Tail', PS.money(tail), PS.pct(total > 0 ? tail / total * 100 : 0), 'Low-value, high-count suppliers'] },
        { cells: ['Sourcing opportunity', PS.money(opportunity), PS.pct(total > 0 ? opportunity / total * 100 : 0), 'Savings at ' + PS.pct(savPct * 100) + ' on opportunity base'] },
      ],
      footer: ['Opportunity base', PS.money(opportunityBase), PS.pct(total > 0 ? opportunityBase / total * 100 : 0), 'Tail + uncontracted']
    },
    a: '<p>Of <strong>' + PS.moneyR(total) + '</strong> total spend, <strong>' + PS.money(addressable) + '</strong> (' +
      PS.pct(addrPct * 100) + ') is addressable by procurement.</p>' +
      '<p>Only <strong>' + PS.pct(covPct * 100) + '</strong> of that flows through contracts: <strong>' + PS.money(coverageGap) + '</strong> of addressable spend sits outside any negotiated agreement.</p>' +
      '<p>The tail — <strong>' + PS.money(tail) + '</strong> — is where maverick spend hides. An estimated <strong>' +
      PS.money(maverickEstimate) + '</strong> bypasses procurement entirely.</p>' +
      '<p>At a ' + PS.pct(savPct * 100) + ' savings target on the opportunity base of <strong>' + PS.money(opportunityBase) +
      '</strong>, the realistic prize is <strong>' + PS.money(opportunity) + '</strong>.</p>' +
      '<p>Every savings claim needs this denominator. "5% of total spend" is a slogan; "5% of addressable spend" is a number you can defend.</p>',
    f: ['Addressable = total × addressable %',
      'Contracted = addressable × coverage %',
      'Tail = addressable × tail %',
      'Opportunity = (tail + uncontracted) × savings %'],
    as: ['Addressable excludes taxes, intercompany, payroll.',
      'Coverage means through a negotiated agreement.',
      'The tail is where maverick spend hides.'],
    w: w,
    k: ['Addressable: ' + PS.money(addressable) + ' (' + PS.pct(addrPct * 100) + ')',
      'Coverage gap: ' + PS.money(coverageGap),
      'Sourcing opportunity: ' + PS.money(opportunity)],
    s: 'Addressable spend ' + PS.money(addressable) + ' of ' + PS.moneyR(total) + '. Coverage gap ' + PS.money(coverageGap) + '. Opportunity ' + PS.money(opportunity) + '.',
    d: { addressable: addressable, contracted: contracted, coverageGap: coverageGap, tail: tail, opportunity: opportunity, maverickEstimate: maverickEstimate, opportunityBase: opportunityBase }
  });
};
