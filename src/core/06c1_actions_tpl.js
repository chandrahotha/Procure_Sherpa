/* ---------- template actions (Section 69) ---------- */
PS.templateValues = function (tpl) {
  var v = {};
  PS.$$('#tplForm [data-tkey]').forEach(function (el) {
    v[el.dataset.tkey] = el.type === 'checkbox' ? el.checked : PS.clean(el.value, 4000);
  });
  PS.$$('#tplForm [data-tcheck]').forEach(function (el) { v['chk_' + el.dataset.tcheck] = el.checked; });
  return v;
};
PS.templateText = function (tpl, values, notes) {
  var p = PS.prefs(), lines = [];
  lines.push(PS.APP + ' - ' + tpl.title);
  if (p.orgName) lines.push('Organisation: ' + p.orgName);
  if (p.deptName) lines.push('Department: ' + p.deptName);
  lines.push('Date: ' + PS.dateStr());
  lines.push('');
  (tpl.sections || []).forEach(function (sec) {
    lines.push('== ' + sec.g.toUpperCase() + ' ==');
    (sec.fields || []).forEach(function (f) {
      var val = values[f.k];
      lines.push(f.label + ': ' + (val === undefined || val === null || val === '' ? '________________' : val));
    });
    lines.push('');
  });
  if (tpl.checklist) {
    lines.push('== CHECKS ==');
    tpl.checklist.forEach(function (c) { lines.push('[' + (values['chk_' + c.k] ? 'x' : ' ') + '] ' + c.label); });
    lines.push('');
  }
  lines.push('== NOTES ==');
  lines.push(notes || '(none recorded)');
  lines.push('');
  lines.push('Generated with Procure Sherpa. This is a procurement working template, not legal advice.');
  if (p.reportFooter) lines.push(p.reportFooter);
  return lines.join('\n');
};
PS.acts['tpl-save'] = function () {
  var c = PS.currentItem;
  if (!c || c.type !== 'tpl') return;
  var values = PS.templateValues(c.item);
  var notes = PS.$('#tplNotes') ? PS.$('#tplNotes').value : '';
  PS.tplState.save(c.id, { values: values, notes: notes });
  var rec = PS.saved.add({
    type: 'template', title: c.item.title + ' - ' + PS.dateStr(), notes: notes,
    data: { template: c.id, values: values }
  });
  PS.toast(rec ? 'Template saved to your workspace.' : 'Template draft saved locally.', 'ok');
  PS.updateNavCounts();
};
PS.acts['tpl-copy'] = function () {
  var c = PS.currentItem;
  if (!c || c.type !== 'tpl') return;
  PS.copy(PS.templateText(c.item, PS.templateValues(c.item), PS.$('#tplNotes') ? PS.$('#tplNotes').value : ''), c.item.title);
  PS.audit('template-copied', c.item.title);
};
PS.acts['tpl-download'] = function () {
  var c = PS.currentItem;
  if (!c || c.type !== 'tpl') return;
  PS.download('ProcureSherpa_' + c.id + '_' + PS.iso() + '.txt',
    PS.templateText(c.item, PS.templateValues(c.item), PS.$('#tplNotes') ? PS.$('#tplNotes').value : ''), 'text/plain');
  PS.audit('template-exported', c.item.title);
};
PS.acts['tpl-print'] = function () {
  var c = PS.currentItem;
  if (!c || c.type !== 'tpl') return;
  var holder = PS.$('#tplPrintText');
  if (holder) holder.textContent = PS.templateText(c.item, PS.templateValues(c.item), PS.$('#tplNotes') ? PS.$('#tplNotes').value : '');
  try { window.print(); } catch (e) { PS.toast('Printing is not available in this browser.', 'danger'); }
};
PS.acts['tpl-reset'] = function () {
  var c = PS.currentItem;
  if (!c || c.type !== 'tpl') return;
  PS.confirm({
    title: 'Clear this template?',
    body: '<p>Your entries for <strong>' + PS.esc(c.item.title) + '</strong> will be cleared from this form. Copies saved in your workspace are kept.</p>',
    okLabel: 'Clear template', danger: true,
    onOk: function () { PS.tplState.reset(c.id); PS.toast('Template cleared.', 'ok'); PS.renderRoute(); }
  });
};