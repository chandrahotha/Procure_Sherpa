PS.acts['storage-info'] = function () {
  var bytes = PS.store.bytes();
  PS.modal({
    title: 'Local storage usage', cancelLabel: null, okLabel: 'Close',
    body: '<dl class="kv"><dt>Keys in use</dt><dd>' + PS.store.rawKeys().length + '</dd>' +
      '<dt>Approximate size</dt><dd>' + PS.esc(PS.group(bytes / 1024, 1)) + ' KB</dd>' +
      '<dt>Saved items</dt><dd>' + PS.saved.count() + ' of ' + PS.MAX_SAVED + '</dd>' +
      '<dt>Quote comparisons</dt><dd>' + PS.saved.count('quote-comparison') + ' of ' + PS.MAX_QUOTE_SAVED + '</dd>' +
      '<dt>Audit events retained</dt><dd>' + PS.auditList().length + ' of ' + PS.AUDIT_MAX + '</dd></dl>' +
      '<p class="note">Only keys beginning with <code>' + PS.NS + '</code> belong to Procure Sherpa, and they exist only in this browser.</p>'
  });
};
PS.acts['clear-data'] = function () {
  var n = PS.saved.count();
  PS.modal({
    title: 'Clear local data', wide: true,
    body: '<p>This removes the following from <strong>this browser only</strong>:</p>' +
      '<div class="table-wrap"><table><thead><tr><th>Item</th><th>What happens</th></tr></thead><tbody>' +
      '<tr><td>Saved work (' + n + ' item' + (n === 1 ? '' : 's') + ')</td><td>Deleted</td></tr>' +
      '<tr><td>Checklist progress (' + Object.keys(PS.clState.all()).length + ')</td><td>Deleted</td></tr>' +
      '<tr><td>Template entries (' + Object.keys(PS.tplState.all()).length + ')</td><td>Deleted</td></tr>' +
      '<tr><td>Favorites (' + PS.fav.list().length + ') and recently used (' + PS.recent.list().length + ')</td><td>Deleted</td></tr>' +
      '<tr><td>Audit log (' + PS.auditList().length + ' events)</td><td>Deleted</td></tr>' +
      '<tr><td>Settings</td><td>Reset to defaults</td></tr>' +
      '</tbody></table></div>' +
      '<p class="note">The application itself is unaffected: it is one HTML file, so all content and tools stay available.</p>' +
      '<div class="btn-row no-print"><button type="button" class="btn" data-act="backup-export">Export a backup first</button></div>' +
      '<label class="check"><input type="checkbox" id="clearConfirm"><span>I understand this cannot be undone and I want to remove this local data.</span></label>',
    okLabel: 'Clear local data', danger: true,
    onOk: function (root) {
      if (!PS.$('#clearConfirm', root).checked) { PS.toast('Tick the confirmation box to continue.', 'danger'); return false; }
      [PS.K.saved, PS.K.cl, PS.K.tpl, PS.K.fav, PS.K.recent, PS.K.audit, PS.K.prefs, PS.K.draft, PS.K.maturity].forEach(function (k) { PS.store.remove(k); });
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