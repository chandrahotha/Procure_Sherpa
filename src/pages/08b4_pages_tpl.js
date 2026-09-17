/* ---------- template pages (Section 23, 69) ---------- */
PS.templateFieldHtml = function (f, value) {
  var v = (value === undefined || value === null) ? '' : value;
  var id = 'tf_' + f.k;
  var control;
  if (f.type === 'textarea') {
    control = '<textarea id="' + id + '" data-tkey="' + PS.esc(f.k) + '" rows="' + (f.rows || 3) + '" maxlength="4000" placeholder="' + PS.esc(f.ph || '') + '">' + PS.esc(v) + '</textarea>';
  } else if (f.type === 'select') {
    control = '<select id="' + id + '" data-tkey="' + PS.esc(f.k) + '">' + ['', ].concat(f.options || []).map(function (o) {
      return '<option value="' + PS.esc(o) + '"' + (String(v) === String(o) ? ' selected' : '') + '>' + PS.esc(o || '-- select --') + '</option>';
    }).join('') + '</select>';
  } else if (f.type === 'date') {
    control = '<input type="date" id="' + id + '" data-tkey="' + PS.esc(f.k) + '" value="' + PS.esc(v) + '">';
  } else if (f.type === 'number') {
    control = '<input type="number" step="any" id="' + id + '" data-tkey="' + PS.esc(f.k) + '" value="' + PS.esc(v) + '" placeholder="' + PS.esc(f.ph || '') + '">';
  } else {
    control = '<input type="text" id="' + id + '" data-tkey="' + PS.esc(f.k) + '" value="' + PS.esc(v) + '" maxlength="300" placeholder="' + PS.esc(f.ph || '') + '">';
  }
  return '<div class="field' + (f.type === 'textarea' ? '' : '') + '"><label for="' + id + '">' + PS.esc(f.label) + '</label>' +
    control + (f.hint ? '<span class="hint">' + PS.esc(f.hint) + '</span>' : '') + '</div>';
};
PS.route('tpl', function (id) {
  var it = PS.byId('tpl', id);
  if (!it) return PS.notFound('template', id);
  PS.currentItem = { type: 'tpl', id: id, item: it };
  PS.pageTitle = it.title;
  PS.recent.add('tpl', id, it.title);
  var st = PS.tplState.get(id);
  var values = st.values || {};
  var html = PS.reportHead(it.title, 'Working template \u00B7 ' + (it.cat || '')) +
    '<div class="card">' +
    '<div class="card-head"><h1>' + PS.esc(it.title) + '</h1><div class="spacer"></div>' +
    PS.badge('tpl') + '<span class="badge">' + PS.esc(it.cat || 'General') + '</span></div>' +
    (it.purpose ? '<p class="lead">' + PS.esc(it.purpose) + '</p>' : '') +
    PS.actionsBar([
      '<button type="button" class="btn btn-primary" data-act="tpl-save">Save to workspace</button>',
      '<button type="button" class="btn" data-act="tpl-print">Print / PDF</button>',
      '<button type="button" class="btn" data-act="tpl-copy">Copy as text</button>',
      '<button type="button" class="btn" data-act="tpl-download">Download .txt</button>',
      '<button type="button" class="btn btn-danger" data-act="tpl-reset">Clear</button>'
    ]) +
    (st.modified ? '<p class="note">Last saved locally ' + PS.esc(PS.dateTime(st.modified)) + '</p>' : '') +
    (it.tags ? PS.tagsRow(it) : '') +
    '</div>' +
    '<form id="tplForm" autocomplete="off" onsubmit="return false;">' +
    (it.sections || []).map(function (s) {
      return '<div class="card"><h3>' + PS.esc(s.g) + '</h3>' +
        (s.note ? '<p class="card-sub">' + PS.esc(s.note) + '</p>' : '') +
        (s.fields || []).map(function (f) { return PS.templateFieldHtml(f, values[f.k]); }).join('') + '</div>';
    }).join('') +
    (it.checklist ? '<div class="card"><h3>Confirmations</h3>' + it.checklist.map(function (c) {
      return '<label class="check"><input type="checkbox" data-tcheck="' + PS.esc(c.k) + '"' + (values['chk_' + c.k] ? ' checked' : '') + '>' +
        '<span>' + PS.esc(c.label) + '</span></label>';
    }).join('') + '</div>' : '') +
    '<div class="card"><div class="field"><label for="tplNotes">Notes, assumptions and attachments reference</label>' +
    '<textarea id="tplNotes" rows="4" maxlength="6000" placeholder="Record assumptions, attachments and any clarification received.">' + PS.esc(st.notes || '') + '</textarea></div></div>' +
    '</form>' +
    '<div class="print-only"><h3>' + PS.esc(it.title) + '</h3><pre id="tplPrintText"></pre>' + PS.reportFooter() + '</div>' +
    (it.prompts ? '<div class="card no-print"><h3>Prompts to consider</h3>' + PS.ul(it.prompts) + '</div>' : '') +
    PS.relatedCard('tpl', it) +
    PS.disclaimer(it.disclaimerKind || 'legal');
  PS.pageInit = function () {
    PS.$$('#tplNotes').forEach(function (t) {
      t.addEventListener('input', PS.debounce(function () {
        var s = PS.tplState.get(id); s.notes = t.value; PS.tplState.save(id, s);
      }, 900));
    });
  };
  return html;
});