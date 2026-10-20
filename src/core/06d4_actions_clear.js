PS.acts['storage-info'] = function () {
  var bytes = PS.store.bytes();
  PS.modal({
    title: 'Local storage usage', cancelLabel: null, okLabel: 'Close',
    body: '<dl class="kv"><dt>Keys in use</dt><dd>' + PS.store.rawKeys().length + '</dd>' +
      '<dt>Approximate size</dt><dd>' + PS.esc(PS.group(bytes / 1024, 1)) + ' KB</dd>' +
      '<dt>Saved items</dt><dd>' + PS.saved.count() + ' of ' + PS.MAX_SAVED + '</dd>' +
      '<dt>Quote comparisons</dt><dd>' + PS.saved.count('quote-comparison') + ' of ' + PS.MAX_QUOTE_SAVED + '</dd>' +
      '<dt>Audit events retained</dt><dd>' + PS.auditList().length + ' of ' + PS.AUDIT_MAX + '</dd></dl>' +
      '<p class="note">All records prefixed with <code>' + PS.NS + '</code> are strictly isolated to this client session.</p>'
  });
};
PS.acts['clear-data'] = function () {
  var n = PS.saved.count();
  var labs = Object.keys(PS.store.get(PS.K.labs, {})).length;
  var packs = (PS.docpack && PS.docpack.list) ? PS.docpack.list().length : 0;
  PS.modal({
    title: 'Purge Workspace Session Data', wide: true,
    body: '<p>This permanently clears the following enterprise records from your <strong>active single-tenant workspace</strong>:</p>' +
      '<div class="table-wrap"><table><thead><tr><th>Item</th><th>What happens</th></tr></thead><tbody>' +
      '<tr><td>Saved work (' + n + ' item' + (n === 1 ? '' : 's') + ')</td><td>Deleted</td></tr>' +
      '<tr><td>Checklist progress (' + Object.keys(PS.clState.all()).length + ')</td><td>Deleted</td></tr>' +
      '<tr><td>Template entries (' + Object.keys(PS.tplState.all()).length + ')</td><td>Deleted</td></tr>' +
      '<tr><td>Favorites (' + PS.fav.list().length + ') and recently used (' + PS.recent.list().length + ')</td><td>Deleted</td></tr>' +
      '<tr><td>Academy progress and badges</td><td>Deleted</td></tr>' +
      '<tr><td>Skill assessment results (' + (PS.store.get(PS.K.assessment, null) ? 1 : 0) + ')</td><td>Deleted</td></tr>' +
      '<tr><td>Certification exam history</td><td>Deleted</td></tr>' +
      '<tr><td>Practice lab progress (' + labs + ')</td><td>Deleted</td></tr>' +
      '<tr><td>Spend data model</td><td>Deleted</td></tr>' +
      '<tr><td>Copilot transcript</td><td>Deleted</td></tr>' +
      '<tr><td>Document packs (' + packs + ')</td><td>Deleted</td></tr>' +
      '<tr><td>Community notes</td><td>Deleted</td></tr>' +
      '<tr><td>Audit log (' + PS.auditList().length + ' events)</td><td>Deleted</td></tr>' +
      '<tr><td>Settings</td><td>Reset to defaults</td></tr>' +
      '</tbody></table></div>' +
      '<p class="note">Platform architecture is unaffected: core modules, calculations, SOPs, and governance frameworks remain intact.</p>' +
      '<div class="btn-row no-print"><button type="button" class="btn" data-act="backup-export">Export a backup first</button></div>' +
      '<label class="check"><input type="checkbox" id="clearConfirm"><span>I understand this action is irreversible and authorize workspace data purge.</span></label>',
    okLabel: 'Purge Session Data', danger: true,
    onOk: function (root) {
      if (!PS.$('#clearConfirm', root).checked) { PS.toast('Tick the confirmation box to continue.', 'danger'); return false; }
      /* Every key the app writes must be listed here. The list used to omit
         the spend model, the copilot transcript, exam results and document
         packs, so "Purge Session Data" left them behind. */
      [PS.K.saved, PS.K.cl, PS.K.tpl, PS.K.fav, PS.K.recent, PS.K.audit, PS.K.prefs, PS.K.draft,
        PS.K.maturity, PS.K.exams, PS.K.spend, PS.K.spendLegacy, PS.K.copilot, PS.K.docpacks,
        PS.K.academy, PS.K.labs, PS.K.assessment, PS.K.community, PS.K.schema, PS.K.user]
        .forEach(function (k) { PS.store.remove(k); });
      PS._prefsCache = null;
      PS.audit('data-cleared', 'All local Procure Sherpa data removed by user');
      PS.applyTheme();
      PS.buildNav();
      PS.updateNavCounts();
      PS.renderRoute();
      PS.toast('Local data cleared.', 'ok');
    }
  });
};
PS.acts['audit-clear'] = function () {
  PS.confirm({
    title: 'Clear the audit log?',
    body: '<p>The local audit log (last ' + PS.AUDIT_MAX + ' events) will be emptied. Saved work and settings are not affected.</p>',
    okLabel: 'Clear log', danger: true,
    onOk: function () { PS.auditClear(); PS.renderRoute(); PS.toast('Audit log cleared.', 'ok'); }
  });
};