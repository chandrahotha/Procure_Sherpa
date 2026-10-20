/* ==========================================================
   Workbench: receipts and invoicing, budget and spend, analytics

   Three workbenches that read each other and the library.

   The receipt workpaper is a three-way match as a workpaper: the
   purchase order, the goods receipt and the invoice are three numbers
   you hold, and the variance between them is the finding. It does not
   release a payment and it does not assert that a payment was made.

   The budget workbench puts a budget line next to what is committed
   and what is actually spent, and sits on top of the spend model that
   already drives the Pareto and Kraljic views.

   The analytics workbench is the read-only view across all of it.
   ========================================================== */

/* ---------- receipts and the three-way match ---------- */
PS.rcpt = PS.rcpt || {};

PS.rcpt.match = function (r) {
  var poQty = PS.num(r.poQty) || 0;
  var recvQty = PS.num(r.receivedQty) || 0;
  var invQty = PS.num(r.invQty) || 0;
  var poPrice = PS.num(r.poUnitPrice) || 0;
  var invPrice = PS.num(r.invUnitPrice) || 0;
  var freight = PS.num(r.freight) || 0;
  var tax = PS.num(r.tax) || 0;

  var poExtended = poPrice * poQty;
  var invExtended = invPrice * invQty + freight + tax;
  var priceVariance = (invPrice - poPrice) * Math.min(recvQty, invQty);
  var qtyVariance = (invQty - recvQty) * invPrice;
  var uncontracted = freight + tax;
  var total = priceVariance + qtyVariance + uncontracted;

  var issues = [];
  if (Math.abs(priceVariance) > 0.005) issues.push('Price variance');
  if (Math.abs(qtyVariance) > 0.005) issues.push('Quantity variance');
  if (uncontracted > 0.005) issues.push('Uncontracted charges');
  if (recvQty <= 0 && invQty > 0) issues.push('Invoiced with no receipt');

  return {
    poExtended: poExtended, invExtended: invExtended,
    priceVariance: priceVariance, qtyVariance: qtyVariance,
    uncontracted: uncontracted, total: total,
    issues: issues,
    status: issues.length ? issues.join(' + ') : 'Matched'
  };
};

/* Duplicate detection: the same supplier, the same invoice reference
   and the same amount appearing twice is the classic double-payment
   pattern, and it is worth catching by eye before it is caught by
   finance. */
PS.rcpt.duplicates = function () {
  var recs = PS.wb.list('receipts');
  var seen = {}, dupes = [];
  recs.forEach(function (r) {
    var key = (r.supplier || '').toLowerCase() + '|' + (r.invoiceRef || '').toLowerCase() + '|' +
      (PS.num(r.invUnitPrice) * PS.num(r.invQty)).toFixed(2);
    if (!r.invoiceRef) return;
    if (seen[key]) dupes.push({ rec: r, first: seen[key] });
    else seen[key] = r;
  });
  return dupes;
};

PS.route('receipts', function () {
  PS.pageTitle = 'Receipts & Invoicing';
  var recs = PS.wb.list('receipts');
  var dupes = PS.rcpt.duplicates();
  var exposure = 0, matched = 0, exceptions = 0;
  recs.forEach(function (r) {
    var m = PS.rcpt.match(r);
    exposure += m.total;
    if (m.issues.length) exceptions++; else matched++;
  });

  var html = PS.wb.header('Receipts and invoicing', recs.length + ' match workpapers', [
    PS.wb.exportBtn('receipts', 'receipts')
  ]);

  html += '<div class="grid grid-4 mb16">' +
    '<div class="stat"><span class="s-val">' + recs.length + '</span><span class="s-lab">Workpapers</span></div>' +
    '<div class="stat"><span class="s-val">' + matched + '</span><span class="s-lab">Matched</span></div>' +
    '<div class="stat"><span class="s-val">' + exceptions + '</span><span class="s-lab">With exceptions</span></div>' +
    '<div class="stat"><span class="s-val">' + PS.moneyR(exposure) + '</span><span class="s-lab">Total exposure</span></div>' +
    '</div>';

  if (dupes.length) {
    html += '<div class="card"><div class="card-head"><h2>Possible duplicate invoices</h2><div class="spacer"></div>' +
      '<span class="badge badge-warn">' + dupes.length + '</span></div>' +
      '<p class="card-sub">The same supplier, invoice reference and amount appear more than once. That is the shape of a double payment, and it is worth a phone call before it is a credit note.</p>' +
      PS.renderSimpleTable({
        headers: ['Supplier', 'Invoice', 'Amount', 'Also recorded as'],
        rows: dupes.map(function (d) {
          return [d.rec.supplier, d.rec.invoiceRef, PS.moneyR((PS.num(d.rec.invUnitPrice) || 0) * (PS.num(d.rec.invQty) || 0)), d.first.id];
        })
      }) + '</div>';
  }

  html += PS.wb.editorCard('receipts', 'Add or edit a match workpaper');
  html += '<div class="card"><div class="card-head"><h2>Workpapers</h2><div class="spacer"></div><span class="badge">' + recs.length + ' records</span></div>' +
    PS.wb.tableHtml('receipts', [
      { k: 'ref', label: 'PO reference' },
      { k: 'supplier', label: 'Supplier' },
      { k: 'invoiceRef', label: 'Invoice' },
      { k: 'poUnitPrice', label: 'PO price', num: true, render: function (r) { return PS.moneyR(r.poUnitPrice); } },
      { k: 'invUnitPrice', label: 'Invoice price', num: true, render: function (r) { return PS.moneyR(r.invUnitPrice); } },
      { k: 'receivedQty', label: 'Received', num: true },
      { k: 'invQty', label: 'Invoiced', num: true },
      { k: 'status', label: 'Result', render: function (r) { return PS.rcpt.match(r).status; } }
    ], recs, 'No match workpapers yet. Add one above: the order, the receipt and the invoice are three numbers, and the variance between them is the finding.') +
    '</div>';

  var withIssues = recs.filter(function (r) { return PS.rcpt.match(r).issues.length; });
  if (withIssues.length) {
    html += '<div class="card"><div class="card-head"><h2>Exceptions</h2><div class="spacer"></div>' +
      '<span class="badge">' + withIssues.length + ' open</span></div>' +
      PS.renderSimpleTable({
        headers: ['PO', 'Supplier', 'Price variance', 'Quantity variance', 'Uncontracted', 'Total'],
        rows: withIssues.map(function (r) {
          var m = PS.rcpt.match(r);
          return [r.ref, r.supplier, PS.moneyR(m.priceVariance), PS.moneyR(m.qtyVariance), PS.moneyR(m.uncontracted), PS.moneyR(m.total)];
        })
      }) + '</div>';
  }

  html += '<div class="card no-print"><div class="card-head"><h2>The procedure that goes with this</h2></div>' +
    '<p class="card-sub">This workpaper finds the variance. It does not release a payment and it does not record that one was made. The controlled process is separate.</p>' +
    '<div class="chips">' +
    '<a class="chip" href="#/sop/sop-procurement-audit">SOP: Procurement Audit</a>' +
    '<a class="chip" href="#/cl/cl-procurement-file-completeness">Checklist: File completeness</a>' +
    '<a class="chip" href="#/tpl/tpl-exception-request">Template: Exception request</a>' +
    '<a class="chip" href="#/kpi/kpi-contract-compliance">KPI: Contract compliance</a>' +
    '</div></div>';
  html += PS.disclaimer('finance');
  return html;
});

/* ---------- budget and spend ---------- */
PS.route('budget', function () {
  PS.pageTitle = 'Budget & Spend';
  var lines = PS.wb.list('budget');
  var spend = PS.spendModel ? PS.spendModel.load() : { categories: [] };
  var budgetTotal = 0, committedTotal = 0, actualTotal = 0;
  lines.forEach(function (l) {
    budgetTotal += PS.num(l.budget) || 0;
    committedTotal += PS.num(l.committed) || 0;
    actualTotal += PS.num(l.actual) || 0;
  });
  var available = budgetTotal - committedTotal - actualTotal;

  var html = PS.wb.header('Budget and spend', lines.length + ' budget lines', [
    PS.wb.exportBtn('budget', 'budget'),
    '<a class="btn btn-sm btn-ghost" href="#/spend-model">Edit the spend model</a>'
  ]);

  html += '<div class="grid grid-4 mb16">' +
    '<div class="stat"><span class="s-val">' + PS.moneyR(budgetTotal) + '</span><span class="s-lab">Budget</span></div>' +
    '<div class="stat"><span class="s-val">' + PS.moneyR(committedTotal) + '</span><span class="s-lab">Committed</span></div>' +
    '<div class="stat"><span class="s-val">' + PS.moneyR(actualTotal) + '</span><span class="s-lab">Spent</span></div>' +
    '<div class="stat"><span class="s-val">' + PS.moneyR(available) + '</span><span class="s-lab">Available</span></div>' +
    '</div>';

  html += '<div class="card"><div class="card-head"><h2>Budget position</h2></div>' +
    '<p class="card-sub">Committed is money you have signed for and not yet paid for. Spent is money invoiced and paid. The difference between the two is the number that surprises people at quarter end, because commitments are rarely visible in the same place as spend.</p>' +
    (lines.length ? PS.renderSimpleTable({
      headers: ['Line', 'Category', 'Holder', 'Budget', 'Committed', 'Spent', 'Available', 'Used'],
      rows: lines.map(function (l) {
        var b = PS.num(l.budget) || 0, c = PS.num(l.committed) || 0, a = PS.num(l.actual) || 0;
        return [l.line, l.category || '', l.owner || '', PS.moneyR(b), PS.moneyR(c), PS.moneyR(a),
          PS.moneyR(b - c - a), b > 0 ? Math.round((c + a) / b * 100) + '%' : ''];
      })
    }) : PS.empty('No budget lines yet. Add one above, or work from the spend model below.')) +
    '</div>';

  html += PS.wb.editorCard('budget', 'Add or edit a budget line');

  if (spend && spend.categories && spend.categories.length) {
    var suppliers = PS.spendModel.suppliers(spend);
    html += '<div class="card"><div class="card-head"><h2>Where the spend sits</h2><div class="spacer"></div>' +
      '<a class="btn btn-sm btn-ghost" href="#/spend-model">Edit the spend model</a></div>' +
      '<p class="card-sub">From the spend model: ' + spend.categories.length + ' categories across ' + suppliers.length + ' suppliers, totalling ' + PS.moneyR(PS.spendModel.total(spend)) + '.</p>' +
      PS.spendModel.chartsHtml(spend) +
      '</div>';
  } else {
    html += '<div class="card"><div class="card-head"><h2>Where the spend sits</h2></div>' +
      '<p class="card-sub">There is no spend model yet. The spend model is the category and supplier hierarchy that the Pareto and Kraljic views are drawn from, and it is the input to any budget position.</p>' +
      '<a class="btn btn-primary" href="#/spend-model">Build the spend model</a></div>';
  }

  html += '<div class="card no-print"><div class="card-head"><h2>The procedure that goes with this</h2></div>' +
    '<div class="chips">' +
    '<a class="chip" href="#/calc/calc-budget-vs-actual">Calculator: Budget vs actual</a>' +
    '<a class="chip" href="#/calc/calc-savings-analysis">Calculator: Savings analysis</a>' +
    '<a class="chip" href="#/sop/sop-savings-calculation">SOP: Savings calculation</a>' +
    '<a class="chip" href="#/cl/cl-savings-validation">Checklist: Savings validation</a>' +
    '<a class="chip" href="#/dash-savings">Savings dashboard</a>' +
    '<a class="chip" href="#/kpi/kpi-sum">KPI: Spend under management</a>' +
    '</div></div>';
  html += PS.disclaimer('finance');
  return html;
});

/* ---------- analytics ---------- */
PS.route('analytics', function () {
  PS.pageTitle = 'Analytics';
  var suppliers = PS.wb.list('suppliers');
  var contracts = PS.wb.list('contracts');
  var catalogue = PS.wb.list('catalogue');
  var budget = PS.wb.list('budget');
  var receipts = PS.wb.list('receipts');
  var events = PS.wb.list('rfx');
  var bids = PS.wb.list('rfxBids');
  var spend = PS.spendModel ? PS.spendModel.load() : { categories: [] };
  var today = new Date();

  var spendTotal = 0, catTotals = {};
  if (spend.categories) {
    spend.categories.forEach(function (c) {
      var t = (c.suppliers || []).reduce(function (a, s) { return a + (PS.num(s.spend) || 0); }, 0);
      spendTotal += t;
      catTotals[c.name] = t;
    });
  }
  var budgetTotal = budget.reduce(function (a, l) { return a + (PS.num(l.budget) || 0); }, 0);
  var spent = budget.reduce(function (a, l) { return a + (PS.num(l.committed) || 0) + (PS.num(l.actual) || 0); }, 0);
  var contractValue = contracts.reduce(function (a, c) { return a + (PS.num(c.value) || 0); }, 0);
  var risk = { Low: 0, Medium: 0, High: 0, Critical: 0 };
  suppliers.forEach(function (s) { if (risk[s.risk] !== undefined) risk[s.risk]++; });
  var expiring = contracts.filter(function (c) {
    if (!c.end) return false;
    var d = (new Date(c.end) - today) / 86400000;
    return d >= 0 && d <= 180;
  });
  var openExceptions = receipts.filter(function (r) { return PS.rcpt.match(r).issues.length; });
  var exposure = receipts.reduce(function (a, r) { return a + PS.rcpt.match(r).total; }, 0);
  var savings = PS.savingsInitiatives ? PS.savingsInitiatives() : [];
  var savingsTotal = savings.reduce(function (a, s) { return a + (PS.num(s.savings) || 0) + (PS.num(s.avoidance) || 0); }, 0);

  var html = PS.wb.header('Analytics', 'Everything you have recorded, in one place');

  html += '<div class="grid grid-4 mb16">' +
    '<div class="stat"><span class="s-val">' + PS.moneyR(spendTotal) + '</span><span class="s-lab">Spend modelled</span></div>' +
    '<div class="stat"><span class="s-val">' + PS.moneyR(contractValue) + '</span><span class="s-lab">Contract value recorded</span></div>' +
    '<div class="stat"><span class="s-val">' + PS.moneyR(savingsTotal) + '</span><span class="s-lab">Savings recorded</span></div>' +
    '<div class="stat"><span class="s-val">' + (budgetTotal > 0 ? Math.round(spent / budgetTotal * 100) + '%' : '—') + '</span><span class="s-lab">Budget used</span></div>' +
    '<div class="stat"><span class="s-val">' + PS.moneyR(exposure) + '</span><span class="s-lab">Match exposure</span></div>' +
    '</div>';

  /* spend by category */
  var cats = Object.keys(catTotals).sort(function (a, b) { return catTotals[b] - catTotals[a]; });
  if (cats.length) {
    html += '<div class="card"><div class="card-head"><h2>Spend by category</h2><div class="spacer"></div>' +
      '<span class="badge">' + cats.length + ' categories</span></div>' +
      PS.renderSimpleTable({
        headers: ['Category', 'Spend', 'Share'],
        rows: cats.map(function (c) {
          return [c, PS.moneyR(catTotals[c]), spendTotal > 0 ? Math.round(catTotals[c] / spendTotal * 100) + '%' : ''];
        })
      }) + '</div>';
  }

  /* portfolio position */
  html += '<div class="grid grid-2 mb16">' +
    '<div class="card"><div class="card-head"><h2>Supplier risk</h2></div>' +
    (suppliers.length ? PS.renderSimpleTable({
      headers: ['Tier', 'Suppliers'],
      rows: Object.keys(risk).map(function (k) { return [k, risk[k]]; })
    }) : PS.empty('No suppliers recorded yet.')) + '</div>' +
    '<div class="card"><div class="card-head"><h2>Open positions</h2></div>' +
    PS.renderSimpleTable({
      headers: ['Area', 'Open'],
      rows: [
        ['Contracts expiring within 180 days', expiring.length],
        ['Match exceptions', openExceptions.length],
        ['RFx events open', events.length],
        ['Bids recorded', bids.length],
        ['Catalogue items', catalogue.length]
      ]
    }) + '</div></div>';

  /* exceptions and expiries */
  if (expiring.length) {
    html += '<div class="card"><div class="card-head"><h2>Contracts expiring</h2><div class="spacer"></div>' +
      '<span class="badge badge-warn">' + expiring.length + '</span></div>' +
      PS.renderSimpleTable({
        headers: ['Contract', 'Supplier', 'Expires', 'Value'],
        rows: expiring.map(function (c) { return [c.title, c.supplier, c.end, PS.moneyR(c.value)]; })
      }) + '</div>';
  }
  if (openExceptions.length) {
    html += '<div class="card"><div class="card-head"><h2>Match exceptions</h2><div class="spacer"></div>' +
      '<span class="badge badge-warn">' + openExceptions.length + '</span></div>' +
      PS.renderSimpleTable({
        headers: ['PO', 'Supplier', 'Exception', 'Amount'],
        rows: openExceptions.map(function (r) {
          var m = PS.rcpt.match(r);
          return [r.ref, r.supplier, m.status, PS.moneyR(m.total)];
        })
      }) + '</div>';
  }

  /* pipeline */
  if (events.length) {
    html += '<div class="card"><div class="card-head"><h2>Sourcing pipeline</h2></div>' +
      PS.renderSimpleTable({
        headers: ['Event', 'Method', 'Closes', 'Bids', 'Budget'],
        rows: events.map(function (e) {
          var n = bids.filter(function (b) { return b.eventId === e.id; }).length;
          return [e.title, e.method || '', e.deadline || '', n, PS.moneyR(e.budget)];
        })
      }) + '</div>';
  }

  html += '<div class="card no-print"><div class="card-head"><h2>Where this comes from</h2></div>' +
    '<p class="card-sub">Every number on this page is computed from records you entered in the workbenches, or from the spend model and the saved work in this browser. Nothing is fetched and nothing is sent.</p>' +
    '<div class="btn-row">' +
    '<a class="btn" href="#/suppliers">Supplier register</a>' +
    '<a class="btn" href="#/contracts">Contract register</a>' +
    '<a class="btn" href="#/rfx">RFx and evaluation</a>' +
    '<a class="btn" href="#/receipts">Receipts and invoicing</a>' +
    '<a class="btn" href="#/budget">Budget and spend</a>' +
    '<a class="btn" href="#/spend-model">Spend data model</a>' +
    '</div></div>';
  html += PS.disclaimer('data');
  return html;
});
