/* ---------- checklist pages (Section 22, 70) ---------- */
PS.route('cl', function (id) {
  var it = PS.byId('cl', id);
  if (!it) return PS.notFound('checklist', id);
  PS.currentItem = { type: 'cl', id: id, item: it };
  PS.pageTitle = it.title;
  PS.recent.add('cl', id, it.title);
  var st = PS.clState.get(id);
  var total = PS.checklistItemCount(id);
  var done = Object.keys(st.checked).filter(function (k) { return st.checked[k]; }).length;
  var pctv = total ? Math.round(done / total * 100) : 0;
  var html = PS.reportHead(it.title, 'Operational checklist \u00B7 ' + (it.cat || '')) +
    '<div class="card">' +
    '<div class="card-head"><h1>' + PS.esc(it.title) + '</h1><div class="spacer"></div>' +
    PS.badge('cl') + '<span class="badge">' + PS.esc(it.cat || 'General') + '</span></div>' +
    (it.desc ? '<p class="lead">' + PS.esc(it.desc) + '</p>' : '') +
    PS.actionsBar([
      '<button type="button" class="btn btn-primary" data-act="cl-save">Save to workspace</button>',
      '<button type="button" class="btn" data-act="cl-print">Print / PDF</button>',
      '<button type="button" class="btn" data-act="cl-export">Export CSV</button>',
      '<button type="button" class="btn btn-ghost" data-act="cl-complete-all">Mark all complete</button>',
      '<button type="button" class="btn btn-danger" data-act="cl-reset" data-i18n="common.reset">' + (PS.i18n ? PS.i18n.t('common.reset') : 'Reset') + '</button>'
    ]) +
    '<div class="progress-meta"><span id="clCount">' + done + ' of ' + total + ' items complete</span><span id="clPct">' + pctv + '%</span></div>' +
    '<div class="progress"><span id="clBar" style="width:' + pctv + '%"></span></div>' +
    (it.tags ? '<div class="mt8">' + PS.tagsRow(it) + '</div>' : '') +
    '</div>' +
    '<div class="card no-print">' +
    (it.sections || []).map(function (s) {
      return '<h3>' + PS.esc(s.g) + '</h3><div>' + (s.items || []).map(function (x, i) {
        var key = s.g + '|' + i;
        return '<label class="check"><input type="checkbox" data-act="cl-toggle" data-cl="' + PS.esc(id) +
          '" data-item="' + PS.esc(key) + '"' + (st.checked[key] ? ' checked' : '') + '><span>' + PS.esc(x) + '</span></label>';
      }).join('') + '</div>';
    }).join('') + '</div>' +
    '<div class="card"><div class="field"><label for="clNotes">Notes (evidence, exceptions, follow-ups)</label>' +
    '<textarea id="clNotes" rows="4" maxlength="6000" placeholder="Record what you verified, where the evidence is held and any exception that needs approval.">' + PS.esc(st.notes || '') + '</textarea>' +
    '<span class="hint">Notes are saved with the checklist and included when you print or save it.</span></div>' +
    '<div class="btn-row no-print"><button type="button" class="btn" data-act="cl-save">Save notes</button></div></div>' +
    '<div class="print-only"><h3>Checklist status</h3><div class="table-wrap"><table><thead><tr><th>Section</th><th>Item</th><th>Status</th></tr></thead><tbody>' +
    (it.sections || []).map(function (s) {
      return (s.items || []).map(function (x, i) {
        return '<tr><td>' + PS.esc(s.g) + '</td><td>' + PS.esc(x) + '</td><td>' + (st.checked[s.g + '|' + i] ? 'Complete' : 'Open') + '</td></tr>';
      }).join('');
    }).join('') + '</tbody><tfoot><tr><td>Total</td><td>' + total + ' items</td><td>' + done + ' complete (' + pctv + '%)</td></tr></tfoot></table></div>' +
    '<h3>Notes</h3><p>' + PS.esc(st.notes || 'No notes recorded.') + '</p>' + PS.reportFooter() + '</div>' +
    PS.relatedCard('cl', it) +
    PS.disclaimer(it.disclaimerKind || 'data');
  PS.pageInit = function () {
    PS.$$('#clNotes').forEach(function (t) {
      t.addEventListener('input', PS.debounce(function () {
        var s = PS.clState.get(id); s.notes = t.value; PS.clState.save(id, s);
      }, 900));
    });
  };
  return html;
});