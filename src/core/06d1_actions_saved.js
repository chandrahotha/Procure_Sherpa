/* ---------- saved work actions (Section 27) ---------- */
PS.pendingSaved = null;
PS.acts['saved-open'] = function (el) {
  var rec = PS.saved.get(el.dataset.id);
  if (!rec) { PS.toast('That saved item is no longer available.', 'danger'); return; }
  var d = rec.data || {};
  if (rec.type === 'calculation' && d.calc && PS.byId('calc', d.calc)) {
    PS.pendingSaved = rec;
    PS.go('calc', null, d.calc);
  } else if (rec.type === 'quote-comparison' && PS.byId('calc', 'calc-compare-quotes')) {
    PS.pendingSaved = rec; PS.go('calc', null, 'calc-compare-quotes');
  } else if (rec.type === 'checklist' && d.checklist && PS.byId('cl', d.checklist)) {
    PS.clState.save(d.checklist, { checked: d.checked || {}, notes: rec.notes || '' });
    PS.go('cl', null, d.checklist);
  } else if (rec.type === 'template' && d.template && PS.byId('tpl', d.template)) {
    PS.tplState.save(d.template, { values: d.values || {}, notes: rec.notes || '' });
    PS.go('tpl', null, d.template);
  } else if (rec.type === 'decision' && d.decision && PS.byId('dec', d.decision)) {
    PS.pendingSaved = rec; PS.go('dec', null, d.decision);
  } else {
    PS.modal({
      title: rec.title, okLabel: 'Close', cancelLabel: null,
      body: '<dl class="kv">' + [['Type', PS.esc(rec.type)], ['Created', PS.esc(PS.dateTime(rec.created))],
        ['Modified', PS.esc(PS.dateTime(rec.modified))], ['Tags', PS.esc((rec.tags || []).join(', ') || 'none')],
        ['Source tool', PS.esc(d.calcTitle || d.calc || d.template || d.checklist || d.decision || 'n/a')]]
        .map(function (p) { return '<dt>' + p[0] + '</dt><dd>' + p[1] + '</dd>'; }).join('') + '</dl>' +
        '<pre>' + PS.esc(JSON.stringify(d, null, 2).slice(0, 4000)) + '</pre>'
    });
  }
};
PS.acts['saved-duplicate'] = function (el) {
  var rec = PS.saved.duplicate(el.dataset.id);
  if (rec) { PS.toast('Duplicated as "' + rec.title + '".', 'ok'); PS.renderRoute(); PS.updateNavCounts(); }
  else PS.toast('The item could not be duplicated (storage limit reached).', 'danger');
};
PS.acts['saved-rename'] = function (el) {
  var rec = PS.saved.get(el.dataset.id);
  if (!rec) return;
  PS.promptText({
    title: 'Rename saved item', label: 'New title', value: rec.title, okLabel: 'Rename',
    onOk: function (v) { PS.saved.update(rec.id, { title: v }); PS.renderRoute(); PS.toast('Renamed.', 'ok'); }
  });
};
PS.acts['saved-delete'] = function (el) {
  var rec = PS.saved.get(el.dataset.id);
  if (!rec) return;
  PS.confirm({
    title: 'Delete saved item?',
    body: '<p><strong>' + PS.esc(rec.title) + '</strong> will be removed from this browser. This cannot be undone. ' +
      'Export a backup first if you may need it later.</p>',
    okLabel: 'Delete', danger: true,
    onOk: function () { PS.saved.remove(rec.id); PS.renderRoute(); PS.updateNavCounts(); PS.toast('Deleted.', 'ok'); }
  });
};
PS.acts['saved-export'] = function (el) {
  var rec = PS.saved.get(el.dataset.id);
  if (!rec) return;
  PS.download('ProcureSherpa_' + rec.type + '_' + PS.iso() + '.json', JSON.stringify(rec, null, 2), 'application/json');
  PS.audit('work-exported', rec.title);
};
PS.acts['saved-copy'] = function (el) {
  var rec = PS.saved.get(el.dataset.id);
  if (!rec) return;
  var d = rec.data || {}, lines = [PS.APP + ' - ' + rec.title, 'Type: ' + rec.type, 'Modified: ' + PS.dateTime(rec.modified), ''];
  (d.results || []).forEach(function (r) { lines.push(r.label + ': ' + r.value); });
  if (d.summaryText) lines.push('', d.summaryText);
  if (rec.notes) lines.push('', 'NOTES', rec.notes);
  PS.copy(lines.join('\n'), 'Saved item');
};
PS.acts['saved-import'] = function () {
  PS.readJsonFile(function (obj, filename) {
    if (obj.app || obj.saved || obj.prefs) {
      PS.importBackup(obj, filename);
      return;
    }
    if (!obj.title || !obj.type) { PS.toast('That file does not look like a Procure Sherpa saved item.', 'danger'); return; }
    var rec = PS.saved.add({
      type: PS.clean(obj.type, 40), title: PS.clean(obj.title, 140),
      tags: obj.tags || [], notes: PS.clean(obj.notes, 4000),
      data: (obj.data && typeof obj.data === 'object') ? obj.data : {}
    });
    if (rec) { PS.toast('Saved item imported.', 'ok'); PS.renderRoute(); PS.updateNavCounts(); }
  });
};
PS.acts['saved-clear'] = function () {
  var n = PS.saved.count();
  if (!n) { PS.toast('There is no saved work to delete.'); return; }
  PS.confirm({
    title: 'Delete all saved work?',
    body: '<p>This deletes <strong>' + n + '</strong> saved item' + (n > 1 ? 's' : '') + ' from this browser. Checklists progress, templates, favorites, settings and the audit log are separate and will not be touched.</p>' +
      '<p class="note">Export a backup first if you may need this work later.</p>',
    okLabel: 'Delete all saved work', danger: true,
    onOk: function () { PS.saved.clearAll(); PS.renderRoute(); PS.updateNavCounts(); PS.toast('All saved work deleted.', 'ok'); }
  });
};