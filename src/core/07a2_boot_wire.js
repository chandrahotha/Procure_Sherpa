/* ---------- event delegation (Section 45: minimal listeners) ---------- */
PS.CHANGE_ACTS = { 'cl-toggle': 1, 'list-sort': 1 };
PS.on = function (sel, ev, fn) { var el = PS.$(sel); if (el) el.addEventListener(ev, fn); };
PS.wireEvents = function () {
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    var actEl = t.closest('[data-act]');
    if (actEl) {
      var act = actEl.dataset.act;
      if (!PS.CHANGE_ACTS[act]) {
        var fn = PS.acts[act];
        if (fn) { fn(actEl, e); } else { PS.toast('That action is not available on this page.'); }
        return;
      }
    }
    var sec = t.closest('[data-navsec]');
    if (sec) {
      PS.setNavOpen(sec.dataset.navsec, sec.parentNode.dataset.open !== 'true');
      return;
    }
    if (t.closest && t.closest('#navRoot a') && window.innerWidth <= 900) PS.closeNav();
  });
  document.addEventListener('change', function (e) {
    var el = e.target;
    if (!el || !el.dataset) return;
    if (el.dataset.act === 'cl-toggle') { PS.acts['cl-toggle'](el); return; }
    if (el.dataset.act === 'list-sort') { PS.refreshList(); return; }
    if (el.dataset.tkey) {
      var c = PS.currentItem;
      if (c && c.type === 'tpl') {
        clearTimeout(PS._tplT);
        PS._tplT = setTimeout(function () {
          var st = PS.tplState.get(c.id);
          st.values = PS.templateValues(c.item);
          st.notes = PS.$('#tplNotes') ? PS.$('#tplNotes').value : st.notes;
          PS.tplState.save(c.id, st);
        }, 800);
      }
    }
  });
  var q = PS.$('#q');
  if (q) {
    q.addEventListener('input', PS.debounce(function () {
      if (PS.clean(q.value).length >= 3) PS.go('search', { q: q.value });
    }, 450));
  }
  PS.on('#menuBtn', 'click', function () { PS.toggleNav(); });
  PS.on('#sidebarClose', 'click', function () { PS.closeNav(); });
  PS.on('#scrim', 'click', function () { PS.closeNav(); });
  PS.on('#themeBtn', 'click', function () { PS.toggleTheme(); });
  PS.on('#printBtn', 'click', function () { PS.acts.print(); });
  PS.on('#homeBtn', 'click', function () { PS.closeNav(); });
  PS.on('#favBtn', 'click', function () { PS.acts.fav(); });
  PS.on('#userProfileBtn', 'click', function () { if (PS.user) PS.user.openModal(); });
  window.addEventListener('hashchange', function () { PS.renderRoute(); });
  window.addEventListener('beforeprint', function () {
    if (PS.calcState && PS.calcState.result && PS.$('#calcForm')) PS.runCalc(true);
  });
  // Wire topbar search input to launch instant Command Palette
  var topSearch = PS.$('#q');
  if (topSearch) {
    topSearch.addEventListener('focus', function (e) {
      e.preventDefault();
      topSearch.blur();
      if (PS.cmdPalette) PS.cmdPalette.open();
    });
  }

  document.addEventListener('keydown', function (e) {
    var tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (PS.cmdPalette) PS.cmdPalette.open();
      return;
    }
    if (e.key === '/' && tag !== 'input' && tag !== 'textarea' && tag !== 'select') {
      e.preventDefault();
      if (PS.cmdPalette) PS.cmdPalette.open();
      return;
    }
    if (e.key === 'Escape') {
      if (PS.cmdPalette && PS.cmdPalette.isOpen) {
        PS.cmdPalette.close();
      } else {
        PS.closeNav();
      }
    }
  });
};