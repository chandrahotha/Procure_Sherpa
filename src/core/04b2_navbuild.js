/* Route names that count as "in the Academy" for the sidebar
   footer's progress line (Mastered count vs Saved Drafts count). */
PS.ACADEMY_ROUTE_NAMES = { academy: 1, 'academy-progress': 1, exams: 1, certificate: 1 };

PS.syncNavForRoute = function (r) {
  var app = PS.$('#app');
  if (!app) return;
  var name = (r && r.name) || 'home';

  if (name === 'home') {
    app.classList.add('has-no-sidebar');
    app.classList.remove('has-sidebar');
    return;
  }

  app.classList.remove('has-no-sidebar');
  app.classList.add('has-sidebar');
  PS.updateSidebarFoot(r);
};

/* One persistent sidebar, built once (see PS.boot) and refreshed only
   when its content can actually change (language, profile, restore). */
PS.buildNav = function () {
  var root = PS.$('#navRoot');
  if (!root) return;

  var bMark = PS.$('#sidebarBrandMark');
  var bTitle = PS.$('#sidebarBrandTitle');
  var bVer = PS.$('#brandVersion');
  if (bMark) bMark.textContent = 'PS';
  if (bTitle) bTitle.textContent = 'Procure Sherpa';
  if (bVer) bVer.textContent = 'Navigation';

  var open = PS.prefs().navOpen || {};
  root.innerHTML = PS.NAV_UNIFIED.map(function (g) {
    var isOpen = open[g.sec] === undefined ? (g.defaultClosed ? false : true) : !!open[g.sec];
    var secLabel = (PS.i18n && g.i18n) ? PS.i18n.t(g.i18n) : g.sec;
    return '<div class="nav-sec" data-sec="' + PS.esc(g.sec) + '" data-open="' + (isOpen ? 'true' : 'false') + '">' +
      '<button type="button" class="nav-sec-head" data-navsec="' + PS.esc(g.sec) + '" aria-expanded="' + isOpen + '">' +
      '<span class="sec-ico" aria-hidden="true">' + PS.esc(g.ico || '') + '</span>' +
      '<span>' + PS.esc(secLabel) + '</span>' +
      '<span class="sec-count">' + g.items.length + '</span>' +
      '<span class="chev" aria-hidden="true">▾</span></button>' +
      '<ul class="nav-list">' + g.items.map(function (it) {
        var itLabel = (PS.i18n && it.i18n) ? PS.i18n.t(it.i18n) : it.label;
        return '<li data-label="' + PS.esc((itLabel + ' ' + secLabel).toLowerCase()) + '">' +
          '<a href="' + PS.esc(it.href) + '">' + PS.esc(itLabel) +
          (it.badge ? '<span class="nav-badge" data-count="' + PS.esc(it.badge) + '"></span>' : '') +
          '</a></li>';
      }).join('') + '</ul></div>';
  }).join('');

  PS.updateNavCounts();
  PS.wireNavFilter();
};

/* Sidebar footer (account + progress line) - refreshed on every route
   change since it depends on where you are, not on nav structure. */
PS.updateSidebarFoot = function (r) {
  var foot = PS.$('#sidebarFoot');
  if (!foot || !PS.user) return;
  var prof = PS.user.getProfile();
  var isAcademy = !!(r && PS.ACADEMY_ROUTE_NAMES[r.name]);
  var academyStats = PS.academy ? PS.academy.getStats() : { completedCount: 0, totalCount: 19 };
  var savedCount = (PS.saved && PS.saved.list) ? PS.saved.list().length : 0;
  var subText = isAcademy ?
    (academyStats.completedCount + ' of ' + academyStats.totalCount + ' Mastered') :
    (savedCount + ' Saved Draft' + (savedCount === 1 ? '' : 's'));

  foot.innerHTML = '<div class="sidebar-foot-account" data-act="user-profile-open" title="Click to view Account & Interlinked Profile">' +
    '<div class="sidebar-foot-avatar" style="background:' + PS.esc(prof.avatarBg || 'var(--accent)') + '">' +
    PS.esc(PS.user.getInitials(prof.name)) + '</div>' +
    '<div class="sidebar-foot-meta">' +
    '<div class="sidebar-foot-name">' + PS.esc(prof.name) + '</div>' +
    '<div class="sidebar-foot-sub">' + PS.esc(subText) + ' &bull; View Profile</div>' +
    '</div></div>' +
    '<div class="privacy-note">' +
    '<span aria-hidden="true">&#128274;</span>' +
    '<span>Enterprise Single-Tenant Session &middot; Zero Data Egress</span>' +
    '</div>';
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
  var p = PS.prefs();
  var schedule = p.themeSchedule || 'manual';
  var t;

  if (schedule === 'system' && window.matchMedia) {
    t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } else if (schedule === 'auto') {
    t = PS.getScheduledTheme();
  } else {
    t = theme || p.theme || 'light';
  }

  if (t !== 'light' && t !== 'dark') t = 'light';
  document.documentElement.setAttribute('data-theme', t);
  try {
    var mt = document.querySelector('meta[name="theme-color"]');
    if (mt) mt.setAttribute('content', t === 'dark' ? '#070b16' : '#5346f5');
  } catch (e) { }
  var tb = PS.$('#themeBtn');
  if (tb) tb.textContent = t === 'dark' ? '\u25D1' : '\u25D0';
};

PS.getScheduledTheme = function () {
  var p = PS.prefs();
  var start = p.themeAutoStart || '06:00';
  var end = p.themeAutoEnd || '20:00';
  var now = new Date();
  var currentMinutes = now.getHours() * 60 + now.getMinutes();
  var parseTime = function (str) {
    var parts = str.split(':');
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  };
  var startMin = parseTime(start);
  var endMin = parseTime(end);
  // Light mode during day (start to end), dark mode at night
  if (startMin <= endMin) {
    return (currentMinutes >= startMin && currentMinutes < endMin) ? 'light' : 'dark';
  } else {
    // Overnight schedule (e.g., 22:00 to 06:00)
    return (currentMinutes >= startMin || currentMinutes < endMin) ? 'dark' : 'light';
  }
};

PS.startThemeScheduler = function () {
  if (PS._themeSchedulerInterval) return;
  var check = function () {
    var p = PS.prefs();
    if (p.themeSchedule === 'auto') {
      var scheduled = PS.getScheduledTheme();
      if (scheduled !== p.theme) {
        PS.savePrefs({ theme: scheduled }, true);
        PS.applyTheme(scheduled);
      }
    } else if (p.themeSchedule === 'system' && window.matchMedia) {
      var system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      if (system !== p.theme) {
        PS.savePrefs({ theme: system }, true);
        PS.applyTheme(system);
      }
    }
  };
  // Check immediately
  check();
  // Then check every minute
  PS._themeSchedulerInterval = setInterval(check, 60000);
};

PS.stopThemeScheduler = function () {
  if (PS._themeSchedulerInterval) {
    clearInterval(PS._themeSchedulerInterval);
    PS._themeSchedulerInterval = null;
  }
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
