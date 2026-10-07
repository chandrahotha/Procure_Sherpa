PS.renderSavedList = function () {
  var v = PS.savedView;
  var items = PS.saved.list();
  if (v.type) items = items.filter(function (r) { return r.type === v.type; });
  if (PS.clean(v.q)) {
    var q = v.q.toLowerCase();
    items = items.filter(function (r) {
      return (r.title + ' ' + (r.notes || '') + ' ' + (r.tags || []).join(' ')).toLowerCase().indexOf(q) >= 0;
    });
  }
  items.sort(function (a, b) {
    if (v.sort === 'title') return String(a.title).localeCompare(String(b.title));
    if (v.sort === 'type') return String(a.type).localeCompare(String(b.type)) || String(a.title).localeCompare(String(b.title));
    if (v.sort === 'created') return String(b.created).localeCompare(String(a.created));
    return String(b.modified).localeCompare(String(a.modified));
  });
  if (!items.length) {
    return PS.empty(PS.saved.count()
      ? 'No saved items match this filter.'
      : 'Nothing saved yet. Save a calculation, checklist, template or decision and it appears here with search, rename, duplicate, export and delete.');
  }

  // Bulk actions state
  var sel = PS.savedView.selected || {};
  var hasSelection = Object.keys(sel).length > 0;

  var html = '<div class="card">';
  if (hasSelection) {
    html += '<div class="saved-bulk-bar no-print" style="display:flex;align-items:center;gap:12px;padding:8px 12px;background:var(--accent-soft);border:1px solid var(--accent);border-radius:var(--r-sm);margin:-16px -16px 16px;border-radius:var(--r) var(--r) 0 0">' +
      '<span class="flex items-center gap8"><input type="checkbox" id="savedSelectAll" ' + (Object.keys(sel).length === items.length ? 'checked' : '') + ' aria-label="Select all visible"><label for="savedSelectAll" style="font-weight:600">' + Object.keys(sel).length + ' selected</label></span>' +
      '<div class="spacer"></div>' +
      '<div class="btn-row tight">' +
      '<button type="button" class="btn btn-sm" data-act="saved-bulk-export">Export selected</button>' +
      '<button type="button" class="btn btn-sm btn-danger" data-act="saved-bulk-delete">Delete selected</button>' +
      '<button type="button" class="btn btn-sm btn-ghost" data-act="saved-clear-selection">Clear selection</button>' +
      '</div></div>';
  }
  html += items.map(function (r) {
    var d = r.data || {}, summary = '', isHtml = false;
    var isSelected = !!sel[r.id];
    if (Array.isArray(d.results) && d.results.length) {
      summary = d.results.slice(0, 4).map(function (x) { return PS.esc(x.label) + ': ' + PS.esc(x.value); }).join(' &middot; ');
      isHtml = true;
    } else if (d.calcTitle) {
      summary = 'From ' + PS.esc(d.calcTitle);
      isHtml = true;
    } else if (d.total) {
      summary = PS.esc(String(d.done)) + ' of ' + PS.esc(String(d.total)) + ' checklist items complete (' + PS.esc(String(d.pct)) + '%)';
      isHtml = true;
    } else if (d.average) {
      summary = 'Average maturity level ' + PS.esc(PS.round(d.average, 2)) + ' of 5';
      isHtml = true;
    }
    return '<div class="card card-tight" style="background:' + (isSelected ? 'var(--accent-soft)' : 'var(--panel-2)') + ';border-color:' + (isSelected ? 'var(--accent)' : 'var(--border)') + '">' +
      '<div class="card-head"><div><input type="checkbox" class="saved-item-checkbox" data-id="' + PS.esc(r.id) + '"' + (isSelected ? ' checked' : '') + ' aria-label="Select ' + PS.esc(r.title) + '"><strong>' + PS.esc(r.title) + '</strong> ' + PS.badge(r.type) +
      '<div class="res-desc">Created ' + PS.esc(PS.dateStr(r.created)) + ' &middot; modified ' + PS.esc(PS.dateStr(r.modified)) +
      ((r.tags || []).length ? ' &middot; tags: ' + PS.esc(r.tags.join(', ')) : '') + '</div></div>' +
      '<div class="spacer"></div>' +
      '<div class="btn-row tight no-print">' +
      '<button type="button" class="btn btn-sm btn-primary" data-act="saved-open" data-id="' + PS.esc(r.id) + '">Open</button>' +
      '<button type="button" class="btn btn-sm" data-act="saved-rename" data-id="' + PS.esc(r.id) + '">Rename</button>' +
      '<button type="button" class="btn btn-sm" data-act="saved-duplicate" data-id="' + PS.esc(r.id) + '">Duplicate</button>' +
      '<button type="button" class="btn btn-sm" data-act="saved-export" data-id="' + PS.esc(r.id) + '">Export JSON</button>' +
      '<button type="button" class="btn btn-sm" data-act="saved-copy" data-id="' + PS.esc(r.id) + '">Copy summary</button>' +
      '<button type="button" class="btn btn-sm btn-danger" data-act="saved-delete" data-id="' + PS.esc(r.id) + '" data-i18n="common.delete">' + (PS.i18n ? PS.i18n.t('common.delete') : 'Delete') + '</button>' +
      '</div></div>' +
      (summary ? '<div class="res-sub">' + summary + '</div>' : '') +
      '<div class="field no-print"><label for="notes_' + PS.esc(r.id) + '">Notes</label>' +
      '<textarea id="notes_' + PS.esc(r.id) + '" rows="2" maxlength="4000">' + PS.esc(r.notes || '') + '</textarea>' +
      '<div class="btn-row tight"><button type="button" class="btn btn-sm" data-act="save-notes" data-id="' + PS.esc(r.id) + '">Save notes</button></div></div>' +
      '<div class="print-only"><p>' + (isHtml ? summary.replace(/&middot;/g, ' | ') : PS.esc(summary)) + '</p><p>' + PS.esc(r.notes || '') + '</p></div>' +
      '</div>';
  }).join('') + '</div>';
  return html;
};