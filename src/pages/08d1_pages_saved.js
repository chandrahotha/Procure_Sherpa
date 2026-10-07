/* ---------- saved workspace (Section 27, 67) ---------- */
PS.savedView = { q: '', type: '', sort: 'modified' };
PS.savedTypes = function () {
  var seen = {}, out = [];
  PS.saved.list().forEach(function (r) { if (!seen[r.type]) { seen[r.type] = 1; out.push(r.type); } });
  return out.sort();
};
PS.route('saved', function (arg, params) {
  PS.pageTitle = 'Saved Work';
  var q = params && params.q ? params.q : '';
  var type = params && params.type ? params.type : '';
  PS.savedView = { q: q, type: type, sort: (params && params.sort) || 'modified' };
  var html = PS.reportHead('Saved work', 'Local workspace') +
    '<div class="card"><h1>Saved work</h1>' +
    '<p class="card-sub">Everything you save lives in this browser profile only. Use Backup / Restore to move it, and clear it from Settings.</p>' +
    '<div class="searchbox no-print">' +
    '<label class="sr-only" for="savedQ">Filter saved work</label>' +
    '<input type="search" id="savedQ" value="' + PS.esc(q) + '" placeholder="Filter by title, note or tag\u2026" maxlength="120">' +
    '<label class="sr-only" for="savedType">Filter by type</label>' +
    '<select id="savedType" style="max-width:190px"><option value="">All types</option>' +
    PS.savedTypes().map(function (t) {
      return '<option value="' + PS.esc(t) + '"' + (t === type ? ' selected' : '') + '>' + PS.esc(t) + '</option>';
    }).join('') + '</select>' +
    '<label class="sr-only" for="savedSort">Sort</label>' +
    '<select id="savedSort" style="max-width:180px">' +
    ['modified', 'created', 'title', 'type'].map(function (s) {
      return '<option value="' + s + '"' + (s === PS.savedView.sort ? ' selected' : '') + '>Sort: ' + s + '</option>';
    }).join('') + '</select>' +
    '<button type="button" class="btn btn-primary" data-act="saved-filter">Apply</button>' +
    '</div>' +
    '<div class="btn-row no-print">' +
    '<button type="button" class="btn" data-act="saved-import">Import item or backup</button>' +
    '<button type="button" class="btn" data-act="backup-export">Export backup</button>' +
    '<button type="button" class="btn" data-act="saved-clear">Delete all saved work</button>' +
    '<button type="button" class="btn btn-ghost" data-act="print">Print list</button>' +
    '</div>' +
    '<p class="note">' + (PS.i18n ? PS.i18n.t('saved.items', { n: PS.saved.count() }) : (PS.saved.count() + ' items stored')) + ' &middot; maximum ' + PS.MAX_SAVED + ' items, of which up to ' + PS.MAX_QUOTE_SAVED + ' can be quote comparisons.</p>' +
    '</div><div id="savedList">' + PS.renderSavedList() + '</div>';
  PS.pageInit = function () {
    var qEl = PS.$('#savedQ');
    if (qEl) qEl.addEventListener('input', PS.debounce(function () { PS.acts['saved-filter'](); }, 260));
    ['#savedType', '#savedSort'].forEach(function (sel) {
      var el = PS.$(sel);
      if (el) el.addEventListener('change', function () { PS.acts['saved-filter'](); });
    });
    // Event delegation for checkboxes
    var list = PS.$('#savedList');
    if (list) {
      list.addEventListener('change', function (e) {
        var cb = e.target.closest('.saved-item-checkbox');
        if (cb) PS.acts['saved-item-toggle'](cb);
        var sa = e.target.closest('#savedSelectAll');
        if (sa) PS.acts['saved-select-all'](sa);
      });
    }
  };
  return html;
});
PS.acts['saved-filter'] = function () {
  PS.savedView = {
    q: PS.$('#savedQ') ? PS.$('#savedQ').value : '',
    type: PS.$('#savedType') ? PS.$('#savedType').value : '',
    sort: PS.$('#savedSort') ? PS.$('#savedSort').value : 'modified'
  };
  var box = PS.$('#savedList');
  if (box) box.innerHTML = PS.renderSavedList();
};