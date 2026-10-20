/* ==========================================================
   Workbench pages: the registry workbenches

   Supplier register, contract register, catalogue and price book, and
   the approval and policy configuration. All four are the same shape:
   a form, a table, an export and the library tools that belong with
   them. They share the framework in 06f1_workbench.js.
   ========================================================== */

/* Each workbench names the library material that goes with it, so the
   record and the procedure live next to each other. */
PS.WB_LINKS = {
  suppliers: [
    { type: 'sop', id: 'sop-supplier-evaluation' },
    { type: 'cl', id: 'cl-supplier-due-diligence' },
    { type: 'tpl', id: 'tpl-supplier-due-diligence' },
    { type: 'tpl', id: 'tpl-supplier-onboarding' },
    { type: 'calc', id: 'calc-supplier-scorecard' },
    { type: 'calc', id: 'calc-supplier-concentration' },
    { type: 'dec', id: 'supplier-financial-risk' }
  ],
  contracts: [
    { type: 'sop', id: 'sop-contract-review' },
    { type: 'sop', id: 'sop-contract-renewal' },
    { type: 'cl', id: 'cl-contract-review' },
    { type: 'cl', id: 'cl-contract-renewal' },
    { type: 'tpl', id: 'tpl-contract-review-checklist' },
    { type: 'tpl', id: 'tpl-contract-change-request' },
    { type: 'dec', id: 'renew-vs-resource' }
  ],
  catalogue: [
    { type: 'sop', id: 'sop-rfq' },
    { type: 'cl', id: 'cl-quote-comparison' },
    { type: 'tpl', id: 'tpl-bid-comparison' },
    { type: 'calc', id: 'calc-compare-quotes' },
    { type: 'calc', id: 'calc-moq' },
    { type: 'kpi', id: 'kpi-sum' }
  ],
  approvals: [
    { type: 'sop', id: 'sop-procurement-intake' },
    { type: 'cl', id: 'cl-exception-approval' },
    { type: 'cl', id: 'cl-single-source-justification' },
    { type: 'tpl', id: 'tpl-exception-request' },
    { type: 'calc', id: 'calc-po-value-check' },
    { type: 'kb', id: 'delegation-of-authority' }
  ]
};

PS.wb.relatedStrip = function (col) {
  var links = (PS.WB_LINKS[col] || []).map(function (l) {
    var o = l.type === 'kb' ? PS.byId('kb', l.id) : PS.byId(l.type, l.id);
    if (!o) return '';
    var title = o.title || o.term || l.id;
    return '<a class="chip" href="' + PS.routeFor(l.type, l.id) + '">' + PS.esc(PS.typeLabel(l.type) + ': ' + title) + '</a>';
  }).filter(Boolean).join('');
  if (!links) return '';
  return '<div class="card no-print"><div class="card-head"><h2>The procedure that goes with this</h2></div>' +
    '<p class="card-sub">Recording something here does not replace the controlled procedure. Open the matching SOP, checklist, template and calculator to do the work properly.</p>' +
    '<div class="chips">' + links + '</div></div>';
};

PS.wb.exportBtn = function (col, filename, headers) {
  return '<button type="button" class="btn btn-sm btn-ghost" data-act="wb-export" data-col="' + PS.esc(col) + '">Export CSV</button>';
};

PS.acts['wb-export'] = function (el) {
  var col = el.dataset.col;
  var spec = PS.WB_FIELDS[col] || [];
  var recs = PS.wb.list(col);
  var headers = spec.map(function (f) { return f.label; });
  var rows = recs.map(function (r) { return spec.map(function (f) { return r[f.k]; }); });
  PS.wb.csv('procuresherpa-' + col + '-' + new Date().toISOString().slice(0, 10) + '.csv', headers, rows);
};

/* ---------- Supplier register ---------- */
PS.route('suppliers', function () {
  PS.pageTitle = 'Supplier Register';
  var recs = PS.wb.list('suppliers');
  var totalSpend = recs.reduce(function (a, r) { return a + (PS.num(r.spend) || 0); }, 0);
  var byRisk = { Low: 0, Medium: 0, High: 0, Critical: 0 };
  recs.forEach(function (r) { if (byRisk[r.risk] !== undefined) byRisk[r.risk]++; });
  var approved = recs.filter(function (r) { return r.status === 'Approved'; }).length;

  var html = PS.wb.header('Supplier register', recs.length + ' suppliers on record', [
    PS.wb.exportBtn('suppliers', 'suppliers')
  ]);

  html += '<div class="grid grid-4 mb16">' +
    '<div class="stat"><span class="s-val">' + recs.length + '</span><span class="s-lab">Suppliers</span></div>' +
    '<div class="stat"><span class="s-val">' + PS.moneyR(totalSpend) + '</span><span class="s-lab">Recorded spend</span></div>' +
    '<div class="stat"><span class="s-val">' + approved + '</span><span class="s-lab">Approved</span></div>' +
    '<div class="stat"><span class="s-val">' + (byRisk.High + byRisk.Critical) + '</span><span class="s-lab">High or critical risk</span></div>' +
    '</div>';

  html += PS.wb.editorCard('suppliers', recs.length ? 'Add or edit a supplier' : 'Add your first supplier');

  html += '<div class="card"><div class="card-head"><h2>Suppliers</h2><div class="spacer"></div>' +
    '<span class="badge">' + recs.length + ' records</span></div>' +
    PS.wb.tableHtml('suppliers', [
      { k: 'name', label: 'Supplier' },
      { k: 'category', label: 'Category' },
      { k: 'country', label: 'Country' },
      { k: 'spend', label: 'Spend', num: true, render: function (r) { return PS.moneyR(r.spend); } },
      { k: 'score', label: 'Score', num: true },
      { k: 'risk', label: 'Risk' },
      { k: 'status', label: 'Status' }
    ], recs, 'No suppliers recorded yet. Add the first one above, or work through the supplier due diligence record and bring the result across.') +
    '</div>';

  html += PS.wb.relatedStrip('suppliers');
  html += PS.disclaimer('data');
  return html;
});

/* ---------- Contract register ---------- */
PS.route('contracts', function () {
  PS.pageTitle = 'Contract Register';
  var recs = PS.wb.list('contracts');
  var today = new Date();
  var total = recs.reduce(function (a, r) { return a + (PS.num(r.value) || 0); }, 0);
  var expiring = [], autoRenew = [];
  recs.forEach(function (r) {
    if (r.end && r.notice) {
      var n = new Date(r.notice);
      if (n >= today) {
        var days = Math.round((n - today) / 86400000);
        if (days <= 180) expiring.push({ r: r, days: days });
      }
    }
    if (r.auto === 'Yes') autoRenew.push(r);
  });
  expiring.sort(function (a, b) { return a.days - b.days; });

  var html = PS.wb.header('Contract register', recs.length + ' contracts on record', [
    PS.wb.exportBtn('contracts', 'contracts')
  ]);

  html += '<div class="grid grid-4 mb16">' +
    '<div class="stat"><span class="s-val">' + recs.length + '</span><span class="s-lab">Contracts</span></div>' +
    '<div class="stat"><span class="s-val">' + PS.moneyR(total) + '</span><span class="s-lab">Recorded value</span></div>' +
    '<div class="stat"><span class="s-val">' + expiring.length + '</span><span class="s-lab">Notice due within 180 days</span></div>' +
    '<div class="stat"><span class="s-val">' + autoRenew.length + '</span><span class="s-lab">Auto-renewing</span></div>' +
    '</div>';

  if (expiring.length) {
    html += '<div class="card"><div class="card-head"><h2>Notice deadlines approaching</h2></div>' +
      '<p class="card-sub">These are the dates on which you have to say something if you want to stop the renewal. A missed notice date is the most common way a good contract becomes a bad one.</p>' +
      PS.wb.tableHtml('contracts', [
        { k: 'title', label: 'Contract' },
        { k: 'supplier', label: 'Supplier' },
        { k: 'end', label: 'Expires' },
        { k: 'notice', label: 'Notice by' },
        { k: 'auto', label: 'Auto-renews' }
      ], expiring.map(function (x) { return x.r; }), '') +
      '</div>';
  }

  html += PS.wb.editorCard('contracts', 'Add or edit a contract');
  html += '<div class="card"><div class="card-head"><h2>Contracts</h2><div class="spacer"></div><span class="badge">' + recs.length + ' records</span></div>' +
    PS.wb.tableHtml('contracts', [
      { k: 'title', label: 'Contract' },
      { k: 'supplier', label: 'Supplier' },
      { k: 'category', label: 'Category' },
      { k: 'value', label: 'Value', num: true, render: function (r) { return PS.moneyR(r.value); } },
      { k: 'end', label: 'Expires' },
      { k: 'notice', label: 'Notice by' },
      { k: 'owner', label: 'Owner' }
    ], recs, 'No contracts recorded yet. Add one above, then work through the contract review checklist.') +
    '</div>';

  html += PS.wb.relatedStrip('contracts');
  html += PS.disclaimer('policy');
  return html;
});

/* ---------- Catalogue and price book ---------- */
PS.route('catalogue', function () {
  PS.pageTitle = 'Catalogue & Price Book';
  var recs = PS.wb.list('catalogue');
  var over = 0, total = 0;
  recs.forEach(function (r) {
    var p = PS.num(r.price) || 0, b = PS.num(r.benchmark) || 0;
    total += p;
    if (b > 0 && p > b) over++;
  });

  var html = PS.wb.header('Catalogue and price book', recs.length + ' items on the book', [
    PS.wb.exportBtn('catalogue', 'catalogue')
  ]);

  html += '<div class="grid grid-4 mb16">' +
    '<div class="stat"><span class="s-val">' + recs.length + '</span><span class="s-lab">Items</span></div>' +
    '<div class="stat"><span class="s-val">' + PS.moneyR(total) + '</span><span class="s-lab">Unit price total</span></div>' +
    '<div class="stat"><span class="s-val">' + over + '</span><span class="s-lab">Above benchmark</span></div>' +
    '<div class="stat"><span class="s-val">' + recs.filter(function (r) { return !r.spec; }).length + '</span><span class="s-lab">No specification recorded</span></div>' +
    '</div>';

  html += PS.wb.editorCard('catalogue', 'Add or edit an item');
  html += '<div class="card"><div class="card-head"><h2>Items</h2><div class="spacer"></div><span class="badge">' + recs.length + ' records</span></div>' +
    PS.wb.tableHtml('catalogue', [
      { k: 'item', label: 'Item' },
      { k: 'category', label: 'Category' },
      { k: 'uom', label: 'UoM' },
      { k: 'price', label: 'Unit price', num: true, render: function (r) { return PS.moneyR(r.price); } },
      { k: 'benchmark', label: 'Benchmark', num: true, render: function (r) { return PS.moneyR(r.benchmark); } },
      { k: 'supplier', label: 'Supplier' },
      { k: 'spec', label: 'Specification' }
    ], recs, 'No items recorded yet. Add one above.') +
    '</div>';

  html += PS.wb.relatedStrip('catalogue');
  html += PS.disclaimer('data');
  return html;
});

/* ---------- Approvals and policy ---------- */
PS.route('approvals', function () {
  PS.pageTitle = 'Approvals & Policy';
  var recs = PS.wb.list('approvals');
  var thresholds = recs.filter(function (r) { return r.kind === 'Approval threshold'; })
    .sort(function (a, b) { return (PS.num(a.limit) || 0) - (PS.num(b.limit) || 0); });

  var html = PS.wb.header('Approvals and policy', recs.length + ' rules configured', [
    PS.wb.exportBtn('approvals', 'approvals')
  ]);

  html += '<div class="card"><div class="card-head"><h2>How this works</h2></div>' +
    '<p class="card-sub">This is your own delegation of authority and your own policy rules, recorded so that the decisions you make can be shown to be consistent. It is not a workflow engine: nothing here routes an approval, notifies anyone, or blocks a purchase. It is the reference a buyer, a budget holder and an auditor will all read, and it is only worth anything if it is written down before the argument rather than after it.</p>' +
    '<p class="note">Set the default thresholds in <a href="#/settings">Settings</a> as well, because the PO Value Check calculator reads them from there.</p></div>';

  html += PS.wb.editorCard('approvals', 'Add or edit a rule');
  html += '<div class="card"><div class="card-head"><h2>Rules</h2><div class="spacer"></div><span class="badge">' + recs.length + ' records</span></div>' +
    PS.wb.tableHtml('approvals', [
      { k: 'name', label: 'Rule' },
      { k: 'kind', label: 'Type' },
      { k: 'role', label: 'Role or approver' },
      { k: 'limit', label: 'Value limit', num: true, render: function (r) { return r.limit ? PS.moneyR(r.limit) : 'no limit'; } },
      { k: 'scope', label: 'Applies to' }
    ], recs, 'No rules recorded yet. Add the first threshold above.') +
    '</div>';

  if (thresholds.length) {
    html += '<div class="card"><div class="card-head"><h2>Approval ladder</h2><div class="spacer"></div>' +
      '<span class="badge">lowest limit first</span></div>' +
      PS.renderSimpleTable({
        headers: ['Value up to', 'Approved by', 'Applies to'],
        rows: thresholds.map(function (r) {
          return [r.limit ? PS.moneyR(r.limit) : 'No limit', r.role || 'Not stated', r.scope || 'All spend'];
        })
      }) + '</div>';
  }

  html += PS.wb.relatedStrip('approvals');
  html += PS.disclaimer('policy');
  return html;
});
