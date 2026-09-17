PS.buildNav = function () {
  var root = PS.$('#navRoot');
  if (!root) return;
  var open = PS.prefs().navOpen || {};
  root.innerHTML = PS.NAV.map(function (g) {
    var isOpen = open[g.sec] === undefined ? (g.sec === 'Home') : !!open[g.sec];
    return '<div class="nav-sec" data-sec="' + PS.esc(g.sec) + '" data-open="' + (isOpen ? 'true' : 'false') + '">' +
      '<button type="button" class="nav-sec-head" data-navsec="' + PS.esc(g.sec) + '" aria-expanded="' + isOpen + '">' +
      '<span class="sec-ico" aria-hidden="true">' + PS.esc(g.icon || '•') + '</span>' +
      '<span>' + PS.esc(g.sec) + '</span>' +
      '<span class="sec-count">' + g.items.length + '</span>' +
      '<span class="chev" aria-hidden="true">▾</span></button>' +
      '<ul class="nav-list">' + g.items.map(function (it) {
        return '<li data-label="' + PS.esc((it.label + ' ' + g.sec).toLowerCase()) + '"><a href="' + PS.esc(it.href) + '">' + PS.esc(it.label) +
          (it.badge ? '<span class="nav-badge" data-count="' + PS.esc(it.badge) + '"></span>' : '') + '</a></li>';
      }).join('') + '</ul></div>';
  }).join('');
  PS.updateNavCounts();
  PS.wireNavFilter();
};
PS.setNavOpen = function (sec, isOpen, silent) {
  var el = PS.$$('#navRoot .nav-sec').filter(function (n) { return n.dataset.sec === sec; })[0];
  if (el) {
    el.dataset.open = isOpen ? 'true' : 'false';
    var b = PS.$('.nav-sec-head', el);
    if (b) b.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }
  if (silent) return;
  var p = PS.prefs();
  p.navOpen = p.navOpen || {};
  p.navOpen[sec] = !!isOpen;
  PS.savePrefs({ navOpen: p.navOpen }, true);
};
PS.toggleNav = function (open) {
  var app = PS.$('#app'), btn = PS.$('#menuBtn'), scrim = PS.$('#scrim');
  if (!app) return;
  var isOpen = open === undefined ? !app.classList.contains('nav-open') : !!open;
  app.classList.toggle('nav-open', isOpen);
  if (scrim) scrim.hidden = !isOpen;
  if (btn) btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
};
PS.closeNav = function () { PS.toggleNav(false); };
PS.applyTheme = function (theme) {
  var t = theme || PS.prefs().theme || 'light';
  if (t !== 'light' && t !== 'dark') t = 'light';
  document.documentElement.setAttribute('data-theme', t);
  try {
    var mt = document.querySelector('meta[name="theme-color"]');
    if (mt) mt.setAttribute('content', t === 'dark' ? '#0d1421' : '#1d4ed8');
  } catch (e) { }
  var tb = PS.$('#themeBtn');
  if (tb) tb.textContent = t === 'dark' ? '\u25D1' : '\u25D0';
  var lab = PS.$('#themeLabel');
  if (lab) lab.textContent = t === 'dark' ? 'Dark mode is on' : 'Light mode is on';
};
PS.toggleTheme = function () {
  var cur = PS.prefs().theme === 'dark' ? 'light' : 'dark';
  PS.savePrefs({ theme: cur }, true);
  PS.applyTheme(cur);
  PS.audit('theme-changed', cur);
};
PS.wireNavFilter = function () {
  var box = PS.$('#navFilter');
  if (!box || box.dataset.wired) return;
  box.dataset.wired = '1';
  box.addEventListener('input', PS.debounce(function () {
    var q = PS.clean(box.value, 60).toLowerCase();
    var root = PS.$('#navRoot');
    if (!root) return;
    if (!q) {
      PS.$$('.nav-sec', root).forEach(function (sec) { sec.style.display = ''; });
      PS.$$('.nav-list li', root).forEach(function (li) { li.style.display = ''; });
      var emp = PS.$('.nav-empty', root);
      if (emp) emp.remove();
      return;
    }
    var anyVisible = false;
    PS.$$('.nav-sec', root).forEach(function (sec) {
      var hits = 0;
      PS.$$('.nav-list li', sec).forEach(function (li) {
        var hay = (li.dataset.label || '') + ' ' + (li.textContent || '').toLowerCase();
        var show = hay.indexOf(q) >= 0;
        li.style.display = show ? '' : 'none';
        if (show) hits++;
      });
      sec.style.display = hits ? '' : 'none';
      if (hits) {
        anyVisible = true;
        sec.dataset.open = 'true';
      }
    });
    var old = PS.$('.nav-empty', root);
    if (old) old.remove();
    if (!anyVisible) root.insertAdjacentHTML('beforeend', '<div class="nav-empty">No menu items match “' + PS.esc(box.value) + '”. Try “quotes”, “SOP” or “savings”.</div>');
  }, 120));
};
