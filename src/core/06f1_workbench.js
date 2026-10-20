/* ==========================================================
   Workbench framework (Section 27, 50, 65)

   The library is a reference. The workbenches are where the work
   happens: they let a procurement professional record their own
   suppliers, contracts, catalogue, bids, receipts and budgets in the
   browser, and then analyse what they recorded.

   Everything here is local. There is no server, no account and no
   sync. The records are the user's own work papers, and they live in
   the same localStorage as everything else.

   The framework exists so that eight workbenches share one store, one
   form language, one table renderer, one export path and one sign-off
   mechanism, rather than eight copies of them.
   ========================================================== */
PS.wb = PS.wb || {};

PS.wb.KEY = 'ps_workbench';

/* ---------- the store ---------- */
PS.wb.load = function () {
  var d = PS.store.get(PS.wb.KEY, null);
  if (!d || typeof d !== 'object') d = {};
  PS.wb.data = d;
  return d;
};
PS.wb.save = function () {
  if (!PS.wb.data) PS.wb.load();
  PS.store.set(PS.wb.KEY, PS.wb.data);
};
PS.wb.list = function (col) {
  if (!PS.wb.data) PS.wb.load();
  var a = PS.wb.data[col];
  return Array.isArray(a) ? a : [];
};
PS.wb.get = function (col, id) {
  return PS.wb.list(col).filter(function (x) { return x.id === id; })[0] || null;
};
PS.wb.upsert = function (col, rec) {
  if (!PS.wb.data) PS.wb.load();
  /* The collection has to exist in the store before it is pushed into.
     PS.wb.list returns a fresh empty array when the collection is not
     there yet, and pushing into that temporary array silently discarded
     the record. */
  if (!Array.isArray(PS.wb.data[col])) PS.wb.data[col] = [];
  var list = PS.wb.data[col];
  var i = -1;
  for (var n = 0; n < list.length; n++) { if (list[n].id === rec.id) { i = n; break; } }
  rec.modified = new Date().toISOString();
  if (i >= 0) { list[i] = rec; } else { rec.created = rec.modified; list.push(rec); }
  PS.wb.save();
  return rec;
};
PS.wb.remove = function (col, id) {
  if (!PS.wb.data) PS.wb.load();
  PS.wb.data[col] = PS.wb.list(col).filter(function (x) { return x.id !== id; });
  PS.wb.save();
};
PS.wb.newId = function (col) { return PS.uid(col.slice(0, 3)); };
PS.wb.count = function (col) { return PS.wb.list(col).length; };

/* ---------- the form language ----------
   A field is { k, label, type, opts, req, hint, min, max, step, width }.
   Types: text, textarea, number, money, date, select. */
PS.wb.fieldHtml = function (f, value) {
  var id = 'wb_' + f.k;
  var v = value === undefined || value === null ? '' : value;
  var common = 'id="' + id + '" data-wbk="' + f.k + '"';
  var control;
  if (f.type === 'textarea') {
    control = '<textarea ' + common + ' rows="' + (f.rows || 3) + '" maxlength="4000">' + PS.esc(v) + '</textarea>';
  } else if (f.type === 'select') {
    control = '<select ' + common + '>' + (f.opts || []).map(function (o) {
      var ov = typeof o === 'string' ? o : o.v;
      var ol = typeof o === 'string' ? o : o.l;
      return '<option value="' + PS.esc(ov) + '"' + (String(v) === String(ov) ? ' selected' : '') + '>' + PS.esc(ol) + '</option>';
    }).join('') + '</select>';
  } else if (f.type === 'number' || f.type === 'money') {
    control = '<input type="number" ' + common + ' value="' + PS.esc(v) + '" step="' + (f.step || (f.type === 'money' ? '0.01' : 'any')) + '"' +
      (f.min !== undefined ? ' min="' + f.min + '"' : '') + (f.max !== undefined ? ' max="' + f.max + '"' : '') + '>';
  } else if (f.type === 'date') {
    control = '<input type="date" ' + common + ' value="' + PS.esc(v) + '">';
  } else {
    control = '<input type="text" ' + common + ' value="' + PS.esc(v) + '" maxlength="240">';
  }
  return '<div class="field" style="margin-bottom:12px">' +
    '<label for="' + id + '">' + PS.esc(f.label) + (f.req ? ' <span class="req" title="Required">*</span>' : '') + '</label>' +
    control +
    (f.hint ? '<span class="hint">' + PS.esc(f.hint) + '</span>' : '') +
    '</div>';
};

PS.wb.formHtml = function (col, rec) {
  var spec = PS.WB_FIELDS[col] || [];
  return '<form class="wb-form" id="wbForm" data-col="' + PS.esc(col) + '" data-id="' + PS.esc(rec && rec.id ? rec.id : '') + '">' +
    spec.map(function (f) { return PS.wb.fieldHtml(f, rec ? rec[f.k] : ''); }).join('') +
    '<div class="btn-row no-print" style="margin-top:8px">' +
    '<button type="button" class="btn btn-primary" data-act="wb-save">' + (rec && rec.id ? 'Save changes' : 'Add record') + '</button>' +
    (rec && rec.id ? '<button type="button" class="btn btn-ghost" data-act="wb-new" data-col="' + PS.esc(col) + '">Add another</button>' : '') +
    '</div></form>';
};

PS.wb.readForm = function (col, root) {
  var spec = PS.WB_FIELDS[col] || [];
  var out = {};
  spec.forEach(function (f) {
    var el = root.querySelector('[data-wbk="' + f.k + '"]');
    if (!el) return;
    if (f.type === 'number' || f.type === 'money') {
      var n = PS.num(el.value);
      out[f.k] = isFinite(n) ? n : null;
    } else {
      out[f.k] = PS.clean(el.value, f.type === 'textarea' ? 4000 : 240);
    }
  });
  return out;
};

/* ---------- table ---------- */
PS.wb.tableHtml = function (col, cols, recs, emptyMsg) {
  if (!recs.length) return PS.empty(emptyMsg || 'Nothing recorded yet.');
  var head = '<tr>' + cols.map(function (c) { return '<th' + (c.num ? ' class="num"' : '') + '>' + PS.esc(c.label) + '</th>'; }).join('') + '<th></th></tr>';
  var body = recs.map(function (r) {
    var cells = cols.map(function (c) {
      var v = c.render ? c.render(r) : r[c.k];
      if (v === undefined || v === null) v = '';
      return '<td' + (c.num ? ' class="num"' : '') + '>' + (c.html ? v : PS.esc(String(v))) + '</td>';
    }).join('');
    return '<tr>' + cells +
      '<td class="num"><button type="button" class="btn btn-sm btn-ghost" data-act="wb-edit" data-col="' + PS.esc(col) + '" data-id="' + PS.esc(r.id) + '">Edit</button>' +
      '<button type="button" class="btn btn-sm btn-danger" data-act="wb-delete" data-col="' + PS.esc(col) + '" data-id="' + PS.esc(r.id) + '">Delete</button></td></tr>';
  }).join('');
  return '<div class="table-wrap"><table><thead>' + head + '</thead><tbody>' + body + '</tbody></table></div>';
};

/* ---------- export ---------- */
PS.wb.csv = function (filename, headers, rows) {
  var esc = function (v) {
    var s = v === undefined || v === null ? '' : String(v);
    /* A leading =, +, - or @ is a formula injection in a spreadsheet. */
    if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
    if (s.indexOf('"') >= 0) s = '"' + s.replace(/"/g, '""') + '"';
    return s;
  };
  var out = [headers.map(esc).join(',')];
  rows.forEach(function (r) { out.push(r.map(esc).join(',')); });
  PS.download(filename, out.join('\r\n'), 'text/csv');
  PS.audit('workbench-exported', filename);
};

/* ---------- sign-off records ----------
   A local approval record: who approved, when, against which value, and
   on what basis. It is not a workflow engine and it does not enforce
   anything; it is the evidence that a decision was taken by a person
   with a named authority. */
PS.wb.signoff = function (col, id, approver, note) {
  if (!PS.wb.data) PS.wb.load();
  if (!PS.wb.data.signoffs) PS.wb.data.signoffs = [];
  var rec = {
    id: PS.uid('so'), col: col, ref: id,
    approver: PS.clean(approver, 120) || 'Unnamed approver',
    note: PS.clean(note, 1000),
    at: new Date().toISOString()
  };
  PS.wb.data.signoffs.push(rec);
  PS.wb.save();
  PS.audit('workbench-signoff', col + '/' + id + ' by ' + rec.approver);
  return rec;
};
PS.wb.signoffsFor = function (col, id) {
  return PS.wb.list('signoffs').filter(function (s) { return s.col === col && s.ref === id; });
};
PS.wb.signedOff = function (col, id) {
  return PS.wb.signoffsFor(col, id).length > 0;
};

/* ---------- the shared actions ---------- */
PS.acts['wb-save'] = function (el) {
  var form = el.closest ? el.closest('#wbForm') : null;
  if (!form) return;
  var col = form.dataset.col;
  var spec = PS.WB_FIELDS[col] || [];
  var vals = PS.wb.readForm(col, form);
  /* required fields are enforced here rather than by the browser, so the
     same rule applies to every workbench and to a record restored from
     a backup */
  var missing = spec.filter(function (f) { return f.req && !String(vals[f.k] || '').trim(); });
  if (missing.length) {
    PS.toast('Fill in: ' + missing.map(function (f) { return f.label; }).join(', '), 'danger');
    return;
  }
  var rec = PS.wb.get(col, form.dataset.id) || { id: PS.wb.newId(col) };
  Object.keys(vals).forEach(function (k) { rec[k] = vals[k]; });
  PS.wb.upsert(col, rec);
  PS.toast('Saved.', 'ok');
  PS.renderRoute();
};
PS.acts['wb-new'] = function (el) {
  PS.wb.editing = { col: el.dataset.col, id: null };
  PS.renderRoute();
};
PS.acts['wb-edit'] = function (el) {
  PS.wb.editing = { col: el.dataset.col, id: el.dataset.id };
  PS.renderRoute();
  var f = PS.$('#wbForm');
  if (f && f.scrollIntoView) { try { f.scrollIntoView({ block: 'center' }); } catch (e) { } }
};
PS.acts['wb-delete'] = function (el) {
  var col = el.dataset.col, id = el.dataset.id;
  var rec = PS.wb.get(col, id);
  if (!rec) return;
  var label = rec.name || rec.title || rec.supplier || rec.item || rec.ref || 'this record';
  PS.confirm({
    title: 'Delete this record?',
    body: '<p><strong>' + PS.esc(label) + '</strong> will be removed from this browser. This cannot be undone. Export a backup first if you may need it.</p>',
    okLabel: 'Delete', danger: true,
    onOk: function () {
      PS.wb.remove(col, id);
      PS.toast('Deleted.', 'ok');
      PS.renderRoute();
    }
  });
};
PS.acts['wb-cancel-edit'] = function () {
  PS.wb.editing = null;
  PS.renderRoute();
};
PS.acts['wb-signoff'] = function (el) {
  var col = el.dataset.col, id = el.dataset.id;
  PS.promptText({
    title: 'Record a sign-off',
    label: 'Approved by', value: '', okLabel: 'Record',
    hint: 'This records who took the decision, when, and on what basis. It does not notify anyone and it does not enforce anything: it is the evidence you can show later.',
    onOk: function (v) {
      PS.wb.signoff(col, id, v, el.dataset.note || '');
      PS.toast('Sign-off recorded.', 'ok');
      PS.renderRoute();
    }
  });
};

/* ---------- shared page chrome ---------- */
PS.wb.header = function (title, sub, extraBtns) {
  return PS.reportHead(title, sub) +
    '<div class="card"><div class="card-head"><h1>' + PS.esc(title) + '</h1><div class="spacer"></div>' +
    (extraBtns || []).join('') + '</div>' +
    '<p class="card-sub">Everything on this page is stored in this browser only. Nothing is uploaded, and there is no account. Export a backup from <a href="#/backup">Backup &amp; Restore</a> before you clear your browser data.</p></div>';
};
PS.wb.editorCard = function (col, title) {
  var ed = PS.wb.editing || {};
  var rec = (ed.col === col && ed.id) ? PS.wb.get(col, ed.id) : null;
  var head = '<div class="card-head"><h2>' + PS.esc(title) + '</h2><div class="spacer"></div>' +
    (rec ? '<button type="button" class="btn btn-sm btn-ghost" data-act="wb-cancel-edit">Cancel</button>' : '') + '</div>';
  return '<div class="card">' + head + PS.wb.formHtml(col, rec) + '</div>';
};
PS.wb.emptyMsg = function (col) {
  return 'No records yet. Use the form above to add the first one.';
};
