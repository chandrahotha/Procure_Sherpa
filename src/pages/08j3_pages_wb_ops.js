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

  html += '<div class="inst-grid inst-grid-4 mb16">' +
    '<div class="inst-card"><div class="inst-home-hub-stat"><span class="inst-home-hub-stat-val">' + recs.length + '</span><span class="inst-home-hub-stat-lab">Workpapers</span></div></div>' +
    '<div class="inst-card"><div class="inst-home-hub-stat inst-home-hub-stat--ok"><span class="inst-home-hub-stat-val">' + matched + '</span><span class="inst-home-hub-stat-lab">Matched</span></div></div>' +
    '<div class="inst-card"><div class="inst-home-hub-stat inst-home-hub-stat--warn"><span class="inst-home-hub-stat-val">' + exceptions + '</span><span class="inst-home-hub-stat-lab">With exceptions</span></div></div>' +
    '<div class="inst-card"><div class="inst-home-hub-stat"><span class="inst-home-hub-stat-val">' + PS.moneyR(exposure) + '</span><span class="inst-home-hub-stat-lab">Total exposure</span></div></div>' +
    '</div>';

  if (dupes.length) {
    html += PS.ui.card(
      '<h2 class="inst-title">Possible duplicate invoices</h2>' +
      '<div class="spacer"></div>' +
      '<span class="inst-badge inst-badge--warn">' + dupes.length + '</span>' +
      '<p class="inst-read">The same supplier, invoice reference and amount appear more than once. That is the shape of a double payment, and it is worth a phone call before it is a credit note.</p>' +
      PS.renderSimpleTable({
        headers: ['Supplier', 'Invoice', 'Amount', 'Also recorded as'],
        rows: dupes.map(function (d) {
          return [d.rec.supplier, d.rec.invoiceRef, PS.moneyR((PS.num(d.rec.invUnitPrice) || 0) * (PS.num(d.rec.invQty) || 0)), d.first.id];
        })
      })
    );
  }

  html += PS.wb.editorCard('receipts', 'Add or edit a match workpaper');
  html += PS.ui.card(
    '<h2 class="inst-title">Workpapers</h2>' +
    '<div class="spacer"></div><span class="inst-badge">' + recs.length + ' records</span>' +
    PS.wb.tableHtml('receipts', [
      { k: 'ref', label: 'PO reference' },
      { k: 'supplier', label: 'Supplier' },
      { k: 'invoiceRef', label: 'Invoice' },
      { k: 'poUnitPrice', label: 'PO price', num: true, render: function (r) { return PS.moneyR(r.poUnitPrice); } },
      { k: 'invUnitPrice', label: 'Invoice price', num: true, render: function (r) { return PS.moneyR(r.invUnitPrice); } },
      { k: 'receivedQty', label: 'Received', num: true },
      { k: 'invQty', label: 'Invoiced', num: true },
      { k: 'status', label: 'Result', render: function (r) { return PS.rcpt.match(r).status; } }
    ], recs, 'No match workpapers yet. Add one above: the order, the receipt and the invoice are three numbers, and the variance between them is the finding.')
  );

  var withIssues = recs.filter(function (r) { return PS.rcpt.match(r).issues.length; });
  if (withIssues.length) {
    html += PS.ui.card(
      '<h2 class="inst-title">Exceptions</h2>' +
      '<div class="spacer"></div>' +
      '<span class="inst-badge">' + withIssues.length + ' open</span>' +
      PS.renderSimpleTable({
        headers: ['PO', 'Supplier', 'Price variance', 'Quantity variance', 'Uncontracted', 'Total'],
        rows: withIssues.map(function (r) {
          var m = PS.rcpt.match(r);
          return [r.ref, r.supplier, PS.moneyR(m.priceVariance), PS.moneyR(m.qtyVariance), PS.moneyR(m.uncontracted), PS.moneyR(m.total)];
        })
      })
    );
  }

  html += PS.ui.card(
    '<h2 class="inst-title">The procedure that goes with this</h2>' +
    '<p class="inst-read">This workpaper finds the variance. It does not release a payment and it does not record that one was made. The controlled process is separate.</p>' +
    '<div class="inst-chips">' +
    '<a class="inst-chip" href="#/sop/sop-procurement-audit">SOP: Procurement Audit</a>' +
    '<a class="inst-chip" href="#/cl/cl-procurement-file-completeness">Checklist: File completeness</a>' +
    '<a class="inst-chip" href="#/tpl/tpl-exception-request">Template: Exception request</a>' +
    '<a class="inst-chip" href="#/kpi/kpi-contract-compliance">KPI: Contract compliance</a>' +
    '</div>',
    { class: 'no-print' }
  );
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
    '<a class="inst-home-btn inst-home-btn--ghost inst-home-btn--sm" href="#/spend-model">Edit the spend model</a>'
  ]);

  html += '<div class="inst-grid inst-grid-4 mb16">' +
    '<div class="inst-card"><div class="inst-home-hub-stat"><span class="inst-home-hub-stat-val">' + PS.moneyR(budgetTotal) + '</span><span class="inst-home-hub-stat-lab">Budget</span></div></div>' +
    '<div class="inst-card"><div class="inst-home-hub-stat"><span class="inst-home-hub-stat-val">' + PS.moneyR(committedTotal) + '</span><span class="inst-home-hub-stat-lab">Committed</span></div></div>' +
    '<div class="inst-card"><div class="inst-home-hub-stat"><span class="inst-home-hub-stat-val">' + PS.moneyR(actualTotal) + '</span><span class="inst-home-hub-stat-lab">Spent</span></div></div>' +
    '<div class="inst-card"><div class="inst-home-hub-stat inst-home-hub-stat--ok"><span class="inst-home-hub-stat-val">' + PS.moneyR(available) + '</span><span class="inst-home-hub-stat-lab">Available</span></div></div>' +
    '</div>';

  html += PS.ui.card(
    '<h2 class="inst-title">Budget position</h2>' +
    '<p class="inst-read">Committed is money you have signed for and not yet paid for. Spent is money invoiced and paid. The difference between the two is the number that surprises people at quarter end, because commitments are rarely visible in the same place as spend.</p>' +
    (lines.length ? PS.wb.tableHtml('budget', [
      { label: 'Line', k: 'line' },
      { label: 'Category', k: 'category' },
      { label: 'Holder', k: 'owner' },
      { label: 'Budget', num: true, render: function (l) { return PS.moneyR(PS.num(l.budget) || 0); } },
      { label: 'Committed', num: true, render: function (l) { return PS.moneyR(PS.num(l.committed) || 0); } },
      { label: 'Spent', num: true, render: function (l) { return PS.moneyR(PS.num(l.actual) || 0); } },
      { label: 'Available', num: true, render: function (l) { return PS.moneyR((PS.num(l.budget) || 0) - (PS.num(l.committed) || 0) - (PS.num(l.actual) || 0)); } },
      { label: 'Used', num: true, render: function (l) { var b = PS.num(l.budget) || 0; return b > 0 ? Math.round(((PS.num(l.committed) || 0) + (PS.num(l.actual) || 0)) / b * 100) + '%' : ''; } }
    ], lines, 'No budget lines yet.') : PS.empty('No budget lines yet. Add one above, or work from the spend model below.'))
  );

  html += PS.wb.editorCard('budget', 'Add or edit a budget line');

  if (spend && spend.categories && spend.categories.length) {
    var suppliers = PS.spendModel.suppliers(spend);
    html += PS.ui.card(
      '<h2 class="inst-title">Where the spend sits</h2>' +
      '<div class="spacer"></div>' +
      '<a class="inst-home-btn inst-home-btn--ghost inst-home-btn--sm" href="#/spend-model">Edit the spend model</a>' +
      '<p class="inst-read">From the spend model: ' + spend.categories.length + ' categories across ' + suppliers.length + ' suppliers, totalling ' + PS.moneyR(PS.spendModel.total(spend)) + '.</p>' +
      PS.spendModel.chartsHtml(spend)
    );
  } else {
    html += PS.ui.card(
      '<h2 class="inst-title">Where the spend sits</h2>' +
      '<p class="inst-read">There is no spend model yet. The spend model is the category and supplier hierarchy that the Pareto and Kraljic views are drawn from, and it is the input to any budget position.</p>' +
      '<a class="inst-home-btn inst-home-btn--primary" href="#/spend-model">Build the spend model</a>'
    );
  }

  html += PS.ui.card(
    '<h2 class="inst-title">The procedure that goes with this</h2>' +
    '<div class="inst-chips">' +
    '<a class="inst-chip" href="#/calc/calc-budget-vs-actual">Calculator: Budget vs actual</a>' +
    '<a class="inst-chip" href="#/calc/calc-savings-analysis">Calculator: Savings analysis</a>' +
    '<a class="inst-chip" href="#/sop/sop-savings-calculation">SOP: Savings calculation</a>' +
    '<a class="inst-chip" href="#/cl/cl-savings-validation">Checklist: Savings validation</a>' +
    '<a class="inst-chip" href="#/dash-savings">Savings dashboard</a>' +
    '<a class="inst-chip" href="#/kpi/kpi-sum">KPI: Spend under management</a>' +
    '</div>',
    { class: 'no-print' }
  );
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

  html += '<div class="inst-grid inst-grid-4 mb16">' +
    '<div class="inst-card"><div class="inst-home-hub-stat"><span class="inst-home-hub-stat-val">' + PS.moneyR(spendTotal) + '</span><span class="inst-home-hub-stat-lab">Spend modelled</span></div></div>' +
    '<div class="inst-card"><div class="inst-home-hub-stat"><span class="inst-home-hub-stat-val">' + PS.moneyR(contractValue) + '</span><span class="inst-home-hub-stat-lab">Contract value recorded</span></div></div>' +
    '<div class="inst-card"><div class="inst-home-hub-stat inst-home-hub-stat--ok"><span class="inst-home-hub-stat-val">' + PS.moneyR(savingsTotal) + '</span><span class="inst-home-hub-stat-lab">Savings recorded</span></div></div>' +
    '<div class="inst-card"><div class="inst-home-hub-stat"><span class="inst-home-hub-stat-val">' + (budgetTotal > 0 ? Math.round(spent / budgetTotal * 100) + '%' : '\u2014') + '</span><span class="inst-home-hub-stat-lab">Budget used</span></div></div>' +
    '<div class="inst-card"><div class="inst-home-hub-stat inst-home-hub-stat--warn"><span class="inst-home-hub-stat-val">' + PS.moneyR(exposure) + '</span><span class="inst-home-hub-stat-lab">Match exposure</span></div></div>' +
    '</div>';

  /* spend by category */
  var cats = Object.keys(catTotals).sort(function (a, b) { return catTotals[b] - catTotals[a]; });
  if (cats.length) {
    html += PS.ui.card(
      '<h2 class="inst-title">Spend by category</h2>' +
      '<div class="spacer"></div>' +
      '<span class="inst-badge">' + cats.length + ' categories</span>' +
      PS.renderSimpleTable({
        headers: ['Category', 'Spend', 'Share'],
        rows: cats.map(function (c) {
          return [c, PS.moneyR(catTotals[c]), spendTotal > 0 ? Math.round(catTotals[c] / spendTotal * 100) + '%' : ''];
        })
      })
    );
  }

  /* portfolio position */
  html += '<div class="inst-grid inst-grid-2 mb16">' +
    '<div class="inst-card"><div class="inst-card-head"><h2 class="inst-title">Supplier risk</h2></div>' +
    (suppliers.length ? PS.renderSimpleTable({
      headers: ['Tier', 'Suppliers'],
      rows: Object.keys(risk).map(function (k) { return [k, risk[k]]; })
    }) : PS.empty('No suppliers recorded yet.')) + '</div>' +
    '<div class="inst-card"><div class="inst-card-head"><h2 class="inst-title">Open positions</h2></div>' +
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
    html += PS.ui.card(
      '<h2 class="inst-title">Contracts expiring</h2>' +
      '<div class="spacer"></div>' +
      '<span class="inst-badge inst-badge--warn">' + expiring.length + '</span>' +
      PS.renderSimpleTable({
        headers: ['Contract', 'Supplier', 'Expires', 'Value'],
        rows: expiring.map(function (c) { return [c.title, c.supplier, c.end, PS.moneyR(c.value)]; })
      })
    );
  }
  if (openExceptions.length) {
    html += PS.ui.card(
      '<h2 class="inst-title">Match exceptions</h2>' +
      '<div class="spacer"></div>' +
      '<span class="inst-badge inst-badge--warn">' + openExceptions.length + '</span>' +
      PS.renderSimpleTable({
        headers: ['PO', 'Supplier', 'Exception', 'Amount'],
        rows: openExceptions.map(function (r) {
          var m = PS.rcpt.match(r);
          return [r.ref, r.supplier, m.status, PS.moneyR(m.total)];
        })
      })
    );
  }

  /* pipeline */
  if (events.length) {
    html += PS.ui.card(
      '<h2 class="inst-title">Sourcing pipeline</h2>' +
      PS.renderSimpleTable({
        headers: ['Event', 'Method', 'Closes', 'Bids', 'Budget'],
        rows: events.map(function (e) {
          var n = bids.filter(function (b) { return b.eventId === e.id; }).length;
          return [e.title, e.method || '', e.deadline || '', n, PS.moneyR(e.budget)];
        })
      })
    );
  }

  html += PS.ui.card(
    '<h2 class="inst-title">Where this comes from</h2>' +
    '<p class="inst-read">Every number on this page is computed from records you entered in the workbenches, or from the spend model and the saved work in this browser. Nothing is fetched and nothing is sent.</p>' +
    '<div class="inst-btn-row">' +
    '<a class="inst-home-btn inst-home-btn--primary" href="#/suppliers">Supplier register</a>' +
    '<a class="inst-home-btn inst-home-btn--primary" href="#/contracts">Contract register</a>' +
    '<a class="inst-home-btn inst-home-btn--primary" href="#/rfx">RFx and evaluation</a>' +
    '<a class="inst-home-btn inst-home-btn--primary" href="#/receipts">Receipts and invoicing</a>' +
    '<a class="inst-home-btn inst-home-btn--primary" href="#/budget">Budget and spend</a>' +
    '<a class="inst-home-btn inst-home-btn--primary" href="#/spend-model">Spend data model</a>' +
    '</div>',
    { class: 'no-print' }
  );
  html += PS.disclaimer('data');
  return html;
});