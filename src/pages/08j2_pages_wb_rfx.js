/* ==========================================================
   Workbench: RFx and Evaluation

   The one workpaper that joins the pieces the library already has:
   the RFQ and RFP templates, the bid comparison matrix, the weighted
   scoring model, the award recommendation record, the quote comparison
   calculator and the supplier scorecard calculator.

   It is a workpaper, not a system of record. The bids are the ones you
   received; you type them in. The evaluation is the one you have to
   be able to defend, so the criteria and the weights are published in
   the event before the bids arrive, and the award recommendation says
   what the numbers say and what they do not.
   ========================================================== */
PS.rfx = PS.rfx || {};

/* ---------- landed cost and scoring ---------- */
PS.rfx.landed = function (bid) {
  var goods = (PS.num(bid.price) || 0) * (PS.num(bid.qty) || 0);
  var freight = PS.num(bid.freight) || 0;
  var duty = goods * (PS.num(bid.dutyPct) || 0) / 100;
  return { goods: goods, freight: freight, duty: duty, total: goods + freight + duty };
};
PS.rfx.weighted = function (event, bid) {
  var crit = (event && event.criteria && event.criteria.length) ? event.criteria : PS.WB_RFX_CRITERIA;
  var totalWeight = crit.reduce(function (a, c) { return a + (PS.num(c.weight) || 0); }, 0);
  var weighted = 0;
  crit.forEach(function (c) {
    var s = PS.num(bid.scores && bid.scores[c.key]) || 0;
    weighted += s * (PS.num(c.weight) || 0);
  });
  /* Divide by the total weight so a set that does not sum to 100 still
     produces a comparable score out of 10. */
  return totalWeight > 0 ? weighted / totalWeight : 0;
};
PS.rfx.rank = function (event) {
  var bids = (event && event.bids) || [];
  return bids.map(function (b) {
    var l = PS.rfx.landed(b);
    return { bid: b, landed: l, score: PS.rfx.weighted(event, b) };
  }).sort(function (a, b) { return b.score - a.score; });
};
/* The commercial spread between the best landed cost and the worst. It
   is the number that tells you how much the evaluation is actually
   choosing between. */
PS.rfx.spread = function (ranked) {
  if (ranked.length < 2) return 0;
  var totals = ranked.map(function (r) { return r.landed.total; });
  return Math.max.apply(null, totals) - Math.min.apply(null, totals);
};

/* ---------- event editing ---------- */
PS.rfx.events = function () { return PS.wb.list('rfx'); };
PS.rfx.current = function () {
  var evs = PS.rfx.events();
  if (!evs.length) return null;
  var id = PS.rfx.currentId;
  return PS.rfx.get(id) || evs[0];
};
PS.rfx.get = function (id) { return PS.wb.get('rfx', id); };

PS.acts['rfx-new'] = function () {
  PS.rfx.currentId = null;
  PS.rfx.editing = 'event';
  PS.renderRoute();
};
PS.acts['rfx-save-event'] = function (el) {
  var form = el.closest('#rfxEventForm');
  if (!form) return;
  var title = PS.clean(form.querySelector('[data-rf="title"]').value, 140);
  if (!title) { PS.toast('Give the event a name.', 'danger'); return; }
  var rec = PS.rfx.get(form.dataset.id) || { id: PS.wb.newId('rfx'), bids: [], criteria: [] };
  rec.title = title;
  rec.method = form.querySelector('[data-rf="method"]').value;
  rec.category = PS.clean(form.querySelector('[data-rf="category"]').value, 80);
  rec.deadline = form.querySelector('[data-rf="deadline"]').value;
  rec.budget = PS.num(form.querySelector('[data-rf="budget"]').value);
  rec.notes = PS.clean(form.querySelector('[data-rf="notes"]').value, 4000);
  if (!rec.criteria || !rec.criteria.length) {
    rec.criteria = PS.WB_RFX_CRITERIA.map(function (c) { return { key: c.key, label: c.label, weight: c.weight }; });
  }
  rec.bids = rec.bids || [];
  PS.wb.upsert('rfx', rec);
  PS.rfx.currentId = rec.id;
  PS.toast('Event saved.', 'ok');
  PS.renderRoute();
};
PS.acts['rfx-set-weights'] = function (el) {
  var ev = PS.rfx.current();
  if (!ev) return;
  var form = el.closest('#rfxWeightForm');
  if (!form) return;
  (ev.criteria || []).forEach(function (c) {
    var i = form.querySelector('[data-rw="' + c.key + '"]');
    if (i) c.weight = PS.num(i.value);
  });
  var total = (ev.criteria || []).reduce(function (a, c) { return a + (PS.num(c.weight) || 0); }, 0);
  PS.wb.upsert('rfx', ev);
  PS.toast('Weights updated. Total ' + total + '.', total === 100 ? 'ok' : 'danger');
  PS.renderRoute();
};
PS.acts['rfx-delete-event'] = function (el) {
  var ev = PS.rfx.get(el.dataset.id);
  if (!ev) return;
  PS.confirm({
    title: 'Delete this event?',
    body: '<p><strong>' + PS.esc(ev.title) + '</strong> and its ' + ((ev.bids || []).length) + ' recorded bids will be removed from this browser.</p>',
    okLabel: 'Delete', danger: true,
    onOk: function () { PS.wb.remove('rfx', ev.id); PS.rfx.currentId = null; PS.toast('Deleted.', 'ok'); PS.renderRoute(); }
  });
};
PS.acts['rfx-save-bid'] = function (el) {
  var ev = PS.rfx.current();
  if (!ev) { PS.toast('Create the event first.', 'danger'); return; }
  var form = el.closest('#rfxBidForm');
  if (!form) return;
  var supplier = PS.clean(form.querySelector('[data-rb="supplier"]').value, 120);
  if (!supplier) { PS.toast('Name the supplier.', 'danger'); return; }
  var rec = PS.wb.get('rfxBids', form.dataset.id);
  if (!rec) {
    rec = { id: PS.uid('bd'), eventId: ev.id, scores: {} };
  }
  rec.eventId = ev.id;
  rec.supplier = supplier;
  rec.qty = PS.num(form.querySelector('[data-rb="qty"]').value);
  rec.price = PS.num(form.querySelector('[data-rb="price"]').value);
  rec.freight = PS.num(form.querySelector('[data-rb="freight"]').value);
  rec.dutyPct = PS.num(form.querySelector('[data-rb="dutyPct"]').value);
  rec.lead = PS.num(form.querySelector('[data-rb="lead"]').value);
  rec.notes = PS.clean(form.querySelector('[data-rb="notes"]').value, 1000);
  (ev.criteria || []).forEach(function (c) {
    var i = form.querySelector('[data-rs="' + c.key + '"]');
    rec.scores = rec.scores || {};
    rec.scores[c.key] = i ? PS.num(i.value) : 0;
  });
  var list = PS.wb.list('rfxBids').filter(function (b) { return b.eventId !== ev.id; });
  list.push(rec);
  PS.wb.data.rfxBids = list;
  PS.wb.save();
  PS.toast('Bid saved.', 'ok');
  PS.renderRoute();
};
PS.acts['rfx-delete-bid'] = function (el) {
  var ev = PS.rfx.current();
  if (!ev) return;
  var id = el.dataset.id;
  PS.wb.data.rfxBids = PS.wb.list('rfxBids').filter(function (b) { return b.id !== id; });
  PS.wb.save();
  PS.toast('Bid removed.', 'ok');
  PS.renderRoute();
};
PS.acts['rfx-export'] = function () {
  var ev = PS.rfx.current();
  if (!ev) return;
  var crit = ev.criteria || [];
  var headers = ['Supplier', 'Quantity', 'Unit price', 'Freight', 'Duty %', 'Landed total', 'Lead time (days)']
    .concat(crit.map(function (c) { return c.label + ' (' + c.weight + '%)'; }))
    .concat(['Weighted score /10']);
  var rows = PS.rfx.rank(ev).map(function (r) {
    return [r.bid.supplier, r.bid.qty, r.bid.price, r.bid.freight, r.bid.dutyPct, r.landed.total, r.bid.lead]
      .concat(crit.map(function (c) { return PS.num(r.bid.scores && r.bid.scores[c.key]) || 0; }))
      .concat([Math.round(r.score * 100) / 100]);
  });
  PS.wb.csv('rfx-' + ev.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase() + '.csv', headers, rows);
};

/* ---------- the page ---------- */
PS.route('rfx', function () {
  PS.pageTitle = 'RFx & Evaluation';
  var evs = PS.rfx.events();
  var ev = PS.rfx.current();
  var crit = (ev && ev.criteria && ev.criteria.length) ? ev.criteria : PS.WB_RFX_CRITERIA;

  var html = PS.wb.header('RFx and evaluation', ev ? ev.title : 'No event yet', [
    '<button type="button" class="btn btn-sm btn-ghost" data-act="rfx-new">New event</button>',
    (ev ? '<button type="button" class="btn btn-sm btn-ghost" data-act="rfx-export">Export evaluation</button>' : '')
  ]);

  if (evs.length > 1) {
    html += '<div class="card no-print"><div class="card-head"><h2>Events</h2></div><div class="chips">' +
      evs.map(function (e) {
        return '<button type="button" class="chip' + (ev && e.id === ev.id ? ' is-on' : '') + '" data-act="rfx-pick" data-id="' + PS.esc(e.id) + '">' + PS.esc(e.title) + '</button>';
      }).join('') + '</div></div>';
  }

  if (!ev) {
    html += '<div class="card"><div class="card-head"><h2>Start an event</h2></div>' +
      '<p class="card-sub">Create the event, fix the evaluation criteria and their weights, then add the bids you received. The award recommendation at the end is the record you will be asked to defend.</p>' +
      PS.rfx.eventForm(null) + '</div>';
    html += PS.rfx.libraryStrip();
    html += PS.disclaimer('policy');
    return html;
  }

  /* --- event --- */
  html += '<div class="card"><div class="card-head"><h2>The event</h2><div class="spacer"></div>' +
    '<span class="badge">' + PS.esc(ev.method || 'RFQ') + '</span>' +
    (ev.deadline ? '<span class="badge">Closes ' + PS.esc(ev.deadline) + '</span>' : '') +
    '<button type="button" class="btn btn-sm btn-danger" data-act="rfx-delete-event" data-id="' + PS.esc(ev.id) + '">Delete event</button></div>' +
    PS.rfx.eventForm(ev) + '</div>';

  /* --- criteria and weights --- */
  var weightTotal = crit.reduce(function (a, c) { return a + (PS.num(c.weight) || 0); }, 0);
  html += '<div class="card"><div class="card-head"><h2>Evaluation criteria and weights</h2><div class="spacer"></div>' +
    '<span class="badge' + (weightTotal === 100 ? '' : ' badge-warn') + '">total ' + weightTotal + '%</span></div>' +
    '<p class="card-sub">These are the criteria you told the bidders you would use. Set them before the bids come in, and do not change them afterwards: an evaluation weighted after the bids are read is not a process, it is a justification written at the end.</p>' +
    '<form id="rfxWeightForm">' +
    '<div class="grid grid-3">' + crit.map(function (c) {
      return '<div class="field"><label for="rw_' + c.key + '">' + PS.esc(c.label) + ' (%)</label>' +
        '<input type="number" id="rw_' + c.key + '" data-rw="' + c.key + '" value="' + PS.esc(c.weight) + '" min="0" max="100" step="5"></div>';
    }).join('') + '</div>' +
    '<div class="btn-row no-print"><button type="button" class="btn btn-primary" data-act="rfx-set-weights">Save weights</button></div>' +
    '</form></div>';

  /* --- bids --- */
  var bids = PS.wb.list('rfxBids').filter(function (b) { return b.eventId === ev.id; });
  var ranked = PS.rfx.rank(Object.assign({}, ev, { bids: bids }));
  var spread = PS.rfx.spread(ranked);

  html += '<div class="card"><div class="card-head"><h2>Bids</h2><div class="spacer"></div>' +
    '<span class="badge">' + bids.length + ' received</span></div>' +
    (bids.length ? PS.rfx.bidTable(ev, crit, ranked) : '') +
    '<h3 style="margin-top:18px">' + (bids.length ? 'Add or replace a bid' : 'Add the first bid') + '</h3>' +
    PS.rfx.bidForm(ev, crit) + '</div>';

  /* --- result --- */
  if (ranked.length) {
    var top = ranked[0];
    var bestLanded = Math.min.apply(null, ranked.map(function (r) { return r.landed.total; }));
    var cheapest = ranked.filter(function (r) { return r.landed.total === bestLanded; })[0];
    html += '<div class="card"><div class="card-head"><h2>Evaluation result</h2><div class="spacer"></div>' +
      '<span class="badge">' + ranked.length + ' bids scored</span></div>' +
      '<p class="card-sub">The recommended award is the highest weighted score. The commercial spread tells you how much the evaluation is actually choosing between, and whether the score is doing the work or the price is.</p>' +
      PS.renderSimpleTable({
        headers: ['Rank', 'Supplier', 'Landed cost', 'Weighted score', 'Lead time', 'Verdict'],
        rows: ranked.map(function (r, i) {
          var cheapestHere = r.landed.total === bestLanded;
          return [
            String(i + 1),
            r.bid.supplier,
            PS.moneyR(r.landed.total),
            r.score.toFixed(2) + ' / 10',
            (r.bid.lead || 0) + ' days',
            i === 0 ? 'Recommended' : (cheapestHere ? 'Lowest landed cost' : '')
          ];
        })
      }) +
      '<div class="alert alert-info" style="margin-top:14px"><strong>Recommended award: ' + PS.esc(top.bid.supplier) + '</strong>' +
      'Weighted score ' + top.score.toFixed(2) + ' out of 10, landed cost ' + PS.moneyR(top.landed.total) + '. ' +
      (cheapest && cheapest.bid.supplier !== top.bid.supplier
        ? 'Note that ' + PS.esc(cheapest.bid.supplier) + ' is the lowest landed cost at ' + PS.moneyR(cheapest.landed.total) + '. You are choosing to pay ' +
          PS.moneyR(top.landed.total - cheapest.landed.total) + ' more for a score advantage of ' + (top.score - cheapest.score).toFixed(2) + '. That is a reasonable trade, but it should be a decision someone takes and records, not an outcome the spreadsheet produced.'
        : 'This supplier is also the lowest landed cost, so the commercial and the scored positions agree.') +
      (spread > 0 ? ' The spread between the best and worst landed cost across ' + ranked.length + ' bids is ' + PS.moneyR(spread) + '.' : '') +
      '</div>' +
      '<div class="btn-row no-print">' +
      '<a class="btn" href="#/tpl/tpl-award-recommendation">Open the award recommendation record</a>' +
      '<a class="btn" href="#/calc/calc-compare-quotes">Check the quotes on landed cost</a>' +
      '<a class="btn" href="#/tpl/tpl-weighted-scoring">Open the weighted scoring model</a>' +
      '<button type="button" class="btn btn-ghost" data-act="wb-signoff" data-col="rfx" data-id="' + PS.esc(ev.id) + '" data-note="Award recommendation">Record the sign-off</button>' +
      '</div>';
    var sos = PS.wb.signoffsFor('rfx', ev.id);
    if (sos.length) {
      html += '<h3>Sign-offs</h3>' + PS.renderSimpleTable({
        headers: ['Approved by', 'When', 'Note'],
        rows: sos.map(function (s) { return [s.approver, PS.dateTime(s.at), s.note || '']; })
      });
    }
  }

  html += PS.rfx.libraryStrip();
  html += PS.disclaimer('policy');
  return html;
});

PS.acts['rfx-pick'] = function (el) {
  PS.rfx.currentId = el.dataset.id;
  PS.renderRoute();
};

PS.rfx.eventForm = function (ev) {
  ev = ev || {};
  return '<form id="rfxEventForm" data-id="' + PS.esc(ev.id || '') + '">' +
    '<div class="grid grid-2">' +
    '<div class="field"><label for="rfxTitle">Event name</label><input type="text" id="rfxTitle" data-rf="title" value="' + PS.esc(ev.title || '') + '" maxlength="140" placeholder="Packaging supply, 2026"></div>' +
    '<div class="field"><label for="rfxMethod">Method</label><select id="rfxMethod" data-rf="method">' +
    ['RFQ', 'RFP', 'RFI'].map(function (m) { return '<option' + (ev.method === m ? ' selected' : '') + '>' + m + '</option>'; }).join('') + '</select></div>' +
    '<div class="field"><label for="rfxCat">Category</label><input type="text" id="rfxCat" data-rf="category" value="' + PS.esc(ev.category || '') + '" maxlength="80"></div>' +
    '<div class="field"><label for="rfxDeadline">Submission deadline</label><input type="date" id="rfxDeadline" data-rf="deadline" value="' + PS.esc(ev.deadline || '') + '"></div>' +
    '<div class="field"><label for="rfxBudget">Budget or ceiling</label><input type="number" id="rfxBudget" data-rf="budget" value="' + PS.esc(ev.budget === undefined || ev.budget === null ? '' : ev.budget) + '" step="0.01" min="0"></div>' +
    '<div class="field"><label for="rfxNotes">Notes</label><input type="text" id="rfxNotes" data-rf="notes" value="' + PS.esc(ev.notes || '') + '" maxlength="240"></div>' +
    '</div>' +
    '<div class="btn-row no-print"><button type="button" class="btn btn-primary" data-act="rfx-save-event">Save event</button></div>' +
    '</form>';
};

PS.rfx.bidTable = function (ev, crit, ranked) {
  var order = {};
  ranked.forEach(function (r, i) { order[r.bid.id] = i; });
  var bids = PS.wb.list('rfxBids').filter(function (b) { return b.eventId === ev.id; })
    .sort(function (a, b) { return (order[a.id] || 99) - (order[b.id] || 99); });
  var head = '<tr><th>Supplier</th><th>Qty</th><th>Unit price</th><th>Landed cost</th>' +
    crit.map(function (c) { return '<th class="num">' + PS.esc(c.label) + '</th>'; }).join('') +
    '<th class="num">Score</th><th></th></tr>';
  var body = bids.map(function (b) {
    var l = PS.rfx.landed(b);
    var sc = PS.rfx.weighted(ev, b);
    return '<tr><td><strong>' + PS.esc(b.supplier) + '</strong></td>' +
      '<td class="num">' + PS.esc(b.qty) + '</td>' +
      '<td class="num">' + PS.moneyR(b.price) + '</td>' +
      '<td class="num"><strong>' + PS.moneyR(l.total) + '</strong></td>' +
      crit.map(function (c) { return '<td class="num">' + PS.esc(PS.num(b.scores && b.scores[c.key]) || 0) + '</td>'; }).join('') +
      '<td class="num"><strong>' + sc.toFixed(2) + '</strong></td>' +
      '<td class="num"><button type="button" class="btn btn-sm btn-danger" data-act="rfx-delete-bid" data-id="' + PS.esc(b.id) + '">Remove</button></td></tr>';
  }).join('');
  return '<div class="table-wrap"><table><thead>' + head + '</thead><tbody>' + body + '</tbody></table></div>' +
    '<p class="note">Score each criterion from 0 to 10. The weighted score is the sum of score times weight, divided by the total weight, so it is always out of ten and stays comparable if the weights are changed.</p>';
};

PS.rfx.bidForm = function (ev, crit) {
  return '<form id="rfxBidForm" data-id=""><div class="grid grid-3">' +
    '<div class="field"><label for="rbSupplier">Supplier</label><input type="text" id="rbSupplier" data-rb="supplier" maxlength="120"></div>' +
    '<div class="field"><label for="rbQty">Quantity</label><input type="number" id="rbQty" data-rb="qty" step="any" min="0"></div>' +
    '<div class="field"><label for="rbPrice">Unit price</label><input type="number" id="rbPrice" data-rb="price" step="0.01" min="0"></div>' +
    '<div class="field"><label for="rbFreight">Freight (total)</label><input type="number" id="rbFreight" data-rb="freight" step="0.01" min="0"></div>' +
    '<div class="field"><label for="rbDuty">Duty %</label><input type="number" id="rbDuty" data-rb="dutyPct" step="0.1" min="0" max="100"></div>' +
    '<div class="field"><label for="rbLead">Lead time (days)</label><input type="number" id="rbLead" data-rb="lead" step="1" min="0"></div>' +
    crit.map(function (c) {
      return '<div class="field"><label for="rs_' + c.key + '">' + PS.esc(c.label) + ' (0-10)</label>' +
        '<input type="number" id="rs_' + c.key + '" data-rs="' + c.key + '" step="0.5" min="0" max="10"></div>';
    }).join('') +
    '<div class="field"><label for="rbNotes">Notes</label><input type="text" id="rbNotes" data-rb="notes" maxlength="240"></div>' +
    '</div>' +
    '<div class="btn-row no-print"><button type="button" class="btn btn-primary" data-act="rfx-save-bid">Add bid</button></div>' +
    '</form>';
};

PS.rfx.libraryStrip = function () {
  var links = [
    { type: 'tpl', id: 'tpl-rfq' }, { type: 'tpl', id: 'tpl-rfp' },
    { type: 'tpl', id: 'tpl-bid-comparison' }, { type: 'tpl', id: 'tpl-weighted-scoring' },
    { type: 'tpl', id: 'tpl-award-recommendation' },
    { type: 'cl', id: 'cl-rfq-preparation' }, { type: 'cl', id: 'cl-technical-evaluation' },
    { type: 'cl', id: 'cl-commercial-evaluation' }, { type: 'cl', id: 'cl-award-recommendation' },
    { type: 'calc', id: 'calc-compare-quotes' }, { type: 'calc', id: 'calc-supplier-scorecard' },
    { type: 'sop', id: 'sop-rfq' }, { type: 'sop', id: 'sop-rfp' }
  ].map(function (l) {
    var o = PS.byId(l.type, l.id);
    if (!o) return '';
    return '<a class="chip" href="' + PS.routeFor(l.type, l.id) + '">' + PS.esc(PS.typeLabel(l.type) + ': ' + (o.title || o.term)) + '</a>';
  }).filter(Boolean).join('');
  return '<div class="card no-print"><div class="card-head"><h2>The procedure that goes with this</h2></div>' +
    '<p class="card-sub">Run the event properly with the controlled documents: the solicitation pack, the evaluation sheets, the scoring model and the award recommendation.</p>' +
    '<div class="chips">' + links + '</div></div>';
};
