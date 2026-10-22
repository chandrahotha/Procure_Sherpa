/* ---------- backup, restore, audit (Section 28, 29, 75) ---------- */
PS.route('backup', function () {
  PS.pageTitle = 'Backup and Restore';
  var bytes = PS.store.bytes();
  var html = PS.reportHead('Backup and restore', 'Local data management') +
    '<div class="card"><h1>Backup and restore</h1>' +
    '<p class="lead">Enterprise backup generates a standardized JSON archive containing your saved analyses, checklist audit trails, template records, favorites, custom parameters, and compliance logs.</p>' +
    '<div class="grid grid-4">' +
    '<div class="stat"><div class="s-lab">Saved items</div><div class="s-val">' + PS.saved.count() + '</div></div>' +
    '<div class="stat"><div class="s-lab">Checklists with progress</div><div class="s-val">' + Object.keys(PS.clState.all()).length + '</div></div>' +
    '<div class="stat"><div class="s-lab">Templates with entries</div><div class="s-val">' + Object.keys(PS.tplState.all()).length + '</div></div>' +
    '<div class="stat"><div class="s-lab">Workspace Data Footprint</div><div class="s-val">' + PS.group(bytes / 1024, 1) + ' KB</div></div>' +
    '</div>' +
    '<div class="btn-row no-print">' +
    '<button type="button" class="btn btn-primary btn-lg" data-act="backup-export">Export backup now</button>' +
    '<button type="button" class="btn btn-lg" data-act="backup-import">Restore from backup file</button>' +
    '<button type="button" class="btn btn-ghost" data-act="storage-info">Storage details</button>' +
    '<button type="button" class="btn btn-danger" data-act="clear-data">Clear workspace data</button>' +
    '</div>' +
    '<p class="note">Suggested filename: <code>ProcureSherpa_Backup_' + PS.esc(PS.iso()) + '.json</code>. Exporting backups enables seamless migration across workstations, audit handoffs, and disaster recovery preservation.</p>' +
    '</div>' +
    '<div class="grid grid-2">' +
    '<div class="card"><h2>What is inside a backup</h2>' + PS.ul([
      'Saved work: calculations, quote comparisons, checklists, templates, decisions and assessments.',
      'Checklist progress and notes for every checklist you have touched.',
      'Template entries and notes.',
      'Favorites and the recently used list.',
      'Settings: currency, organisation details, approval thresholds, formatting and default assumptions.',
      'The local audit log (most recent ' + PS.AUDIT_MAX + ' events).'
    ]) + '<p class="note">Backups do not contain anything from other websites or applications, and Procure Sherpa cannot read data you did not create here.</p></div>' +
    '<div class="card"><h2>How restore behaves</h2>' + PS.ul([
      'The file is parsed and validated before anything is written; invalid or unrelated JSON is rejected without changing your data.',
      'A summary is shown first so you can compare what the backup holds against what you currently have.',
      'Merge keeps your current data and adds items that are not already present.',
      'Replace deletes current saved work and uses the backup instead.',
      'A backup created by a newer major version is refused rather than partly applied.'
    ]) + '<p class="note">Practical habit: export a backup before any bulk delete, before clearing local data and whenever you finish a significant piece of analysis.</p></div>' +
    '</div>' +
    PS.disclaimer('data');
  return html;
});
PS.route('audit', function () {
  PS.pageTitle = 'Audit Log';
  var log = PS.auditList();
  var html = PS.reportHead('Local audit log', log.length + ' events retained') +
    '<div class="card"><h1>Local audit log</h1>' +
    '<p class="card-sub">The last ' + PS.AUDIT_MAX + ' events recorded by Procure Sherpa in this browser: calculators used and saved, checklists completed, templates created, backups exported or restored, settings changed and data cleared. It is a local working record only and is never transmitted anywhere.</p>' +
    '<div class="btn-row no-print">' +
    '<button type="button" class="btn" data-act="audit-export">Export log as CSV</button>' +
    '<button type="button" class="btn btn-danger" data-act="audit-clear">Clear log</button>' +
    '<button type="button" class="btn btn-ghost" data-act="print">Print log</button>' +
    '</div>' +
    '<p class="note">This log is not a compliance system of record. It cannot prove who did what on a shared device, and it does not capture work performed outside this platform.</p></div>' +
    (log.length ? '<div class="card"><div class="table-wrap"><table><thead><tr><th>When</th><th>Event</th><th>Detail</th></tr></thead><tbody>' +
      log.map(function (a) {
        return '<tr><td class="nowrap">' + PS.esc(PS.dateTime(a.t)) + '</td><td>' + PS.esc(String(a.e).replace(/-/g, ' ')) + '</td><td>' + PS.esc(a.d) + '</td></tr>';
      }).join('') + '</tbody></table></div></div>'
      : PS.empty('No events recorded yet. Use a calculator or save some work and the log will fill automatically.')) +
    PS.disclaimer('data');
  return html;
});
PS.acts['audit-export'] = function () {
  var rows = PS.auditList().map(function (a) { return [PS.dateTime(a.t), a.e, a.d]; });
  PS.download('ProcureSherpa_AuditLog_' + PS.iso() + '.csv', PS.toCSV(['When', 'Event', 'Detail'], rows), 'text/csv');
  PS.audit('audit-log-exported', rows.length + ' events');
};