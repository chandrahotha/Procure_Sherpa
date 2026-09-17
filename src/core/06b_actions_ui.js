/* ---------- UI-level actions ---------- */
PS.acts.theme = function () { PS.toggleTheme(); };
PS.acts.print = function () { try { window.print(); } catch (e) { PS.toast('Printing is not available in this browser.', 'danger'); } };
PS.acts.fav = function () {
  var c = PS.currentItem;
  if (!c) { PS.toast('Open a page before adding it to favorites.'); return; }
  var on = PS.fav.toggle(c.type, c.id, c.item.title || c.item.term);
  PS.updateFavBtn(PS.routeMeta);
  PS.updateNavCounts();
  PS.toast(on ? 'Added to favorites.' : 'Removed from favorites.', 'ok');
};
PS.acts['list-filter'] = function () { PS.refreshList(); };
PS.acts['list-sort'] = function () { PS.refreshList(); };
PS.acts['search-run'] = function (el) {
  var q = PS.$('#searchQ') ? PS.$('#searchQ').value : '';
  PS.go('search', { q: q });
};
PS.acts['search-chip'] = function (el) {
  var q = el.dataset.q || '';
  if (PS.$('#searchQ')) PS.$('#searchQ').value = q;
  PS.go('search', { q: q });
};
PS.acts['search-type'] = function (el) {
  var t = el.dataset.type || '';
  if (PS.$('#searchType')) PS.$('#searchType').value = t;
  if (PS.$('#searchQ')) PS.$('#searchQ').value = PS.$('#searchQ').value;
  PS.renderSearch();
};
PS.acts['recent-clear'] = function () {
  PS.confirm({
    title: 'Clear recently used items?',
    body: '<p>This only clears the recently used list. Saved work, checklists and favorites are not affected.</p>',
    okLabel: 'Clear list',
    onOk: function () { PS.recent.clear(); PS.renderRoute(); PS.toast('Recently used list cleared.', 'ok'); }
  });
};
PS.acts['save-notes'] = function (el) {
  var id = el.dataset.id;
  var ta = PS.$('#notes_' + id);
  if (!ta) return;
  PS.saved.update(id, { notes: ta.value });
  PS.toast('Notes saved.', 'ok');
  PS.renderRoute();
};
PS.acts['global-print'] = function () { window.print(); };
PS.acts['dismiss'] = function (el) { if (el.parentNode) el.parentNode.remove(); };

/* ---------- checklist actions (Section 22, 70) ---------- */
PS.acts['cl-toggle'] = function (el) {
  var cl = PS.byId('cl', el.dataset.cl);
  if (!cl) return;
  var st = PS.clState.get(cl.id);
  st.checked[el.dataset.item] = !!el.checked;
  PS.clState.save(cl.id, st);
  PS.updateClProgress(cl);
  if (el.checked) {
    var total = PS.checklistItemCount(cl.id);
    var done = Object.keys(st.checked).filter(function (k) { return st.checked[k]; }).length;
    if (total && done === total) {
      PS.audit('checklist-completed', cl.title);
      PS.toast('Checklist complete: ' + cl.title, 'ok');
    }
  }
  PS.updateNavCounts();
};
PS.updateClProgress = function (cl) {
  var total = PS.checklistItemCount(cl.id);
  var st = PS.clState.get(cl.id);
  var done = Object.keys(st.checked).filter(function (k) { return st.checked[k]; }).length;
  var pctv = total ? Math.round(done / total * 100) : 0;
  var bar = PS.$('#clBar'), lab = PS.$('#clPct'), cnt = PS.$('#clCount');
  if (bar) bar.style.width = pctv + '%';
  if (lab) lab.textContent = pctv + '%';
  if (cnt) cnt.textContent = done + ' of ' + total + ' items complete';
};
PS.acts['cl-save'] = function () {
  var c = PS.currentItem;
  if (!c || c.type !== 'cl') return;
  var st = PS.clState.get(c.id);
  st.notes = PS.$('#clNotes') ? PS.$('#clNotes').value : '';
  PS.clState.save(c.id, st);
  var total = PS.checklistItemCount(c.id), done = Object.keys(st.checked).filter(function (k) { return st.checked[k]; }).length;
  var rec = PS.saved.add({
    type: 'checklist', title: c.item.title + ' - ' + PS.dateStr(),
    notes: st.notes,
    data: { checklist: c.id, checked: st.checked, done: done, total: total, pct: total ? Math.round(done / total * 100) : 0 }
  });
  PS.toast(rec ? 'Checklist saved to your workspace.' : 'Checklist progress saved locally.', 'ok');
  PS.updateNavCounts();
};
PS.acts['cl-reset'] = function () {
  var c = PS.currentItem;
  if (!c || c.type !== 'cl') return;
  PS.confirm({
    title: 'Reset this checklist?',
    body: '<p>All tick marks and notes for <strong>' + PS.esc(c.item.title) + '</strong> will be cleared. Saved copies in your workspace are not affected.</p>',
    okLabel: 'Reset checklist', danger: true,
    onOk: function () {
      PS.clState.reset(c.id);
      PS.toast('Checklist reset.', 'ok');
      PS.renderRoute();
    }
  });
};
PS.acts['cl-complete-all'] = function () {
  var c = PS.currentItem;
  if (!c || c.type !== 'cl') return;
  var st = PS.clState.get(c.id);
  (c.item.sections || []).forEach(function (s) {
    (s.items || []).forEach(function (it, i) { st.checked[s.g + '|' + i] = true; });
  });
  PS.clState.save(c.id, st);
  PS.audit('checklist-completed', c.item.title);
  PS.renderRoute();
  PS.toast('All items marked complete.', 'ok');
};
PS.acts['cl-print'] = function () {
  var c = PS.currentItem;
  if (c && c.type === 'cl' && PS.$('#clNotes')) {
    var st = PS.clState.get(c.id);
    st.notes = PS.$('#clNotes').value;
    PS.clState.save(c.id, st);
  }
  try { window.print(); } catch (e) { PS.toast('Printing is not available in this browser.', 'danger'); }
};
PS.acts['cl-export'] = function () {
  var c = PS.currentItem;
  if (!c || c.type !== 'cl') return;
  var st = PS.clState.get(c.id);
  var rows = [];
  (c.item.sections || []).forEach(function (s) {
    (s.items || []).forEach(function (it, i) {
      rows.push([s.g, it, st.checked[s.g + '|' + i] ? 'Complete' : 'Open']);
    });
  });
  PS.download('ProcureSherpa_Checklist_' + c.id + '_' + PS.iso() + '.csv',
    PS.toCSV(['Section', 'Item', 'Status'], rows), 'text/csv');
  PS.audit('checklist-exported', c.item.title);
};