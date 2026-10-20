/* Route names that count as "in the Academy" for the sidebar
   footer's progress line (Mastered count vs Saved Drafts count). */
PS.ACADEMY_ROUTE_NAMES = { academy: 1, 'academy-progress': 1, exams: 1, certificate: 1 };

/* This fragment loads before the action-controller fragment that creates
   PS.acts, so the namespace has to be created here too. Without it the
   assignment below threw and the rest of the file, including the whole
   sidebar build, never ran. */
PS.acts = PS.acts || {};

PS.syncNavForRoute = function (r) {
  var app = PS.$('#app');
  if (!app) return;

  /* The Command Center used to hide the entire sidebar. That made the
     first item in the navigation the one item that removed the
     navigation, and on a phone it left no way to navigate at all,
     because the mobile menu button was hidden by the same rule. The
     sidebar is now present on every route, including the landing page. */
  app.classList.remove('has-no-sidebar');
  app.classList.add('has-sidebar');
  PS.updateSidebarFoot(r);
};

/* ---------- The view the navigation is scoped to ----------
   The profile has carried a two-option track since it was added, and
   until now it changed one line of text on the Command Center. It is
   the selection the menu follows: 'academy' shows the learning
   navigation, 'operations' shows the working navigation, and the
   shared sections are always there.

   This is not a second source of truth. The switch in the sidebar
   writes the same profile.track field that the profile modal writes,
   and both read it from the same place. */
PS.navCurrentView = function () {
  var p = (PS.user && PS.user.getProfile) ? PS.user.getProfile() : null;
  return (p && p.track === 'operations') ? 'operations' : 'academy';
};
/* The section object that owns a route, whether or not the current
   view would show it. */
PS.navOwnerSection = function (name) {
  var href = PS.navHrefForRoute(name);
  for (var i = 0; i < PS.NAV_UNIFIED.length; i++) {
    var items = PS.NAV_UNIFIED[i].items || [];
    for (var j = 0; j < items.length; j++) {
      if (items[j].href === href) return PS.NAV_UNIFIED[i];
    }
  }
  return null;
};
/* The sections the sidebar shows right now: the shared ones, the ones
   this view owns, and - if the current route lives in a section this
   view hides - that section as well. The current route always wins, so
   the navigation is never a dead end, and the extra section does not
   persist, so the menu does not creep back to everything over time. */
PS.navVisibleSections = function () {
  var view = PS.navCurrentView();
  var list = PS.NAV_UNIFIED.filter(function (g) {
    return g.views === 'both' || g.views === view;
  });
  var currentName = (PS.routeMeta && PS.routeMeta.name) ? PS.routeMeta.name : 'home';
  var owner = PS.navOwnerSection(currentName);
  if (owner && list.indexOf(owner) < 0) {
    var at = list.length;
    var ownerIdx = PS.NAV_UNIFIED.indexOf(owner);
    for (var k = 0; k < list.length; k++) {
      if (PS.NAV_UNIFIED.indexOf(list[k]) > ownerIdx) { at = k; break; }
    }
    list = list.slice();
    list.splice(at, 0, owner);
  }
  return list;
};

/* Which section owns a given route. Used to open only the relevant
   section by default, instead of expanding all thirty-three items on
   every page. */
PS.navHrefForRoute = function (name) {
  return PS.NAV_ROUTE_OWNER[name] || ('#/' + name);
};
PS.navSectionFor = function (name) {
  var href = PS.navHrefForRoute(name);
  for (var i = 0; i < PS.NAV_UNIFIED.length; i++) {
    var items = PS.NAV_UNIFIED[i].items || [];
    for (var j = 0; j < items.length; j++) {
      if (items[j].href === href) return PS.NAV_UNIFIED[i].sec;
    }
  }
  return null;
};

/* One persistent sidebar, built once (see PS.boot) and refreshed only
   when its content can actually change (language, profile, restore). */
PS.buildNav = function () {
  var root = PS.$('#navRoot');
  if (!root) return;

  var bMark = PS.$('#sidebarBrandMark');
  var bTitle = PS.$('#sidebarBrandTitle');
  var bVer = PS.$('#brandVersion');
  if (bMark) {
    /* the embedded emblem is mounted here (and by PS.applyLogo on boot);
       re-check rather than overwrite so a nav refresh never wipes it */
    if (PS.LOGO_DATA && !bMark.querySelector('img')) {
      bMark.innerHTML = '<img src="' + PS.LOGO_DATA + '" alt="">';
    } else if (!PS.LOGO_DATA) {
      bMark.textContent = 'PS';
    }
  }
  if (bTitle) bTitle.textContent = 'Procure Sherpa';
  if (bVer) bVer.textContent = 'Navigation';

  var open = PS.prefs().navOpen || {};
  /* Default: only the section that owns the current route is open. The
     previous build opened all five sections on every page, which put
     thirty-three items in a column that is roughly a viewport tall. */
  var currentName = (PS.routeMeta && PS.routeMeta.name) ? PS.routeMeta.name : 'home';
  var ownerSec = PS.navSectionFor(currentName) || PS.NAV_UNIFIED[0].sec;
  var visible = PS.navVisibleSections();
  root.innerHTML = visible.map(function (g) {
    var isOpen = open[g.sec] === undefined ? (g.sec === ownerSec) : !!open[g.sec];
    var secLabel = (PS.i18n && g.i18n) ? PS.i18n.t(g.i18n) : g.sec;
    var listId = 'navlist-' + g.sec.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
    return '<div class="nav-sec" data-sec="' + PS.esc(g.sec) + '" data-open="' + (isOpen ? 'true' : 'false') + '">' +
      '<button type="button" class="nav-sec-head" data-navsec="' + PS.esc(g.sec) + '" aria-expanded="' + isOpen + '" aria-controls="' + listId + '">' +
      '<span class="sec-ico" aria-hidden="true">' + PS.esc(g.ico || '') + '</span>' +
      '<span>' + PS.esc(secLabel) + '</span>' +
      '<span class="sec-count">' + g.items.length + '</span>' +
      '<span class="chev" aria-hidden="true">▾</span></button>' +
      '<ul class="nav-list" id="' + listId + '">' + g.items.map(function (it) {
        var itLabel = (PS.i18n && it.i18n) ? PS.i18n.t(it.i18n) : it.label;
        return '<li data-label="' + PS.esc((itLabel + ' ' + secLabel).toLowerCase()) + '">' +
          '<a href="' + PS.esc(it.href) + '"' + (it.i18n ? ' data-i18n="' + PS.esc(it.i18n) + '"' : '') + '>' + PS.esc(itLabel) +
          (it.badge ? '<span class="nav-badge" data-count="' + PS.esc(it.badge) + '"></span>' : '') +
          '</a></li>';
      }).join('') + '</ul></div>';
  }).join('');

  PS.updateNavCounts();
  PS.wireNavFilter();
  PS.syncNavToggle();
  PS.renderViewSwitch();
};

/* ---------- The Learn / Work switch ----------
   This writes profile.track, the same field the profile modal writes.
   It is a view of that field, not a second mode, so there is only
   ever one answer to the question 'which view is this person in'.

   Switching navigates only when it has to: if the page you are on
   belongs to a section the new view hides, you go to that view's
   landing page. If you are on a shared page, such as an SOP, you stay
   where you are. Moving somebody off a page they deliberately opened
   would be worse than leaving the menu briefly out of step. */
PS.NAV_VIEW_LANDING = { academy: '#/academy', operations: '#/operations' };
PS.renderViewSwitch = function () {
  var box = PS.$('#navViewSwitch');
  if (!box) return;
  var view = PS.navCurrentView();
  /* PS.i18n.t is called with the literal key so the i18n audit can see
     the wiring; the fallback keeps the English label if a locale is
     missing the key. */
  var t = function (key, fallback) {
    if (PS.i18n && PS.i18n.t) {
      var v = null;
      if (key === 'nav.view.learn') v = PS.i18n.t('nav.view.learn');
      else if (key === 'nav.view.work') v = PS.i18n.t('nav.view.work');
      else if (key === 'nav.view.label') v = PS.i18n.t('nav.view.label');
      if (v) return v;
    }
    return fallback;
  };
  var opts = [
    { id: 'academy', label: t('nav.view.learn', 'Learn') },
    { id: 'operations', label: t('nav.view.work', 'Work') }
  ];
  box.innerHTML = '<div class="nav-view-label">' + PS.esc(t('nav.view.label', 'What you see in the menu')) + '</div>' +
    '<div class="nav-view-group" role="group" aria-label="' + PS.esc(t('nav.view.label', 'What you see in the menu')) + '">' +
    opts.map(function (o) {
      var on = o.id === view;
      return '<button type="button" class="nav-view-btn' + (on ? ' is-on' : '') + '" data-act="nav-view" ' +
        'data-view="' + o.id + '" aria-pressed="' + (on ? 'true' : 'false') + '">' + PS.esc(o.label) + '</button>';
    }).join('') + '</div>';
};
PS.acts['nav-view'] = function (el) {
  var view = el.dataset.view;
  if (view !== 'academy' && view !== 'operations') return;
  if (!PS.user || !PS.user.saveProfile) return;
  var cur = PS.navCurrentView();
  if (cur === view) return;
  var currentName = (PS.routeMeta && PS.routeMeta.name) ? PS.routeMeta.name : 'home';
  var owner = PS.navOwnerSection(currentName);
  var ownerViews = owner ? (owner.views || 'both') : 'both';
  var landing = PS.NAV_VIEW_LANDING[view] || '#/home';
  PS.user.saveProfile({ track: view });
  if (ownerViews !== 'both' && ownerViews !== view) {
    location.hash = landing;
  } else {
    PS.renderRoute();
  }
  PS.toast(view === 'academy' ? 'Learning view.' : 'Working view.', 'ok');
};

/* The collapse/expand control reflects the current state of the tree. */
PS.syncNavToggle = function () {
  var btn = PS.$('#navToggleAll');
  if (!btn) return;
  var open = PS.prefs().navOpen || {};
  var anyClosed = PS.navVisibleSections().some(function (g) { return open[g.sec] === false; });
  btn.textContent = anyClosed ? 'Expand all' : 'Collapse all';
  btn.setAttribute('aria-label', anyClosed ? 'Expand every navigation section' : 'Collapse every navigation section');
};
PS.acts['nav-toggle-all'] = function () {
  var open = PS.prefs().navOpen || {};
  var anyClosed = PS.navVisibleSections().some(function (g) { return open[g.sec] === false; });
  var next = {};
  PS.navVisibleSections().forEach(function (g) { next[g.sec] = anyClosed; });
  PS.savePrefs({ navOpen: next }, true);
  PS.buildNav();
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

  /* The system pages live in a permanent footer strip, outside the
     collapsible tree: Settings, Help, Backup and the changelog are
     always one click away and never mixed in with working content. */
  var curHash = '#/' + ((r && r.name) || 'home');
  var footLinks = (PS.NAV_FOOTER || []).map(function (it) {
    var lbl = (PS.i18n && it.i18n) ? PS.i18n.t(it.i18n) : it.label;
    var isCur = it.href.split('?')[0] === curHash;
    return '<a class="sidebar-foot-link' + (isCur ? ' is-current' : '') + '" href="' + PS.esc(it.href) + '"' +
      (isCur ? ' aria-current="page"' : '') +
      (it.i18n ? ' data-i18n="' + PS.esc(it.i18n) + '"' : '') + '>' + PS.esc(lbl) + '</a>';
  }).join('');

  foot.innerHTML = '<div class="sidebar-foot-links"><span class="sidebar-foot-label">System</span>' + footLinks + '</div>' +
    '<div class="sidebar-foot-account" data-act="user-profile-open" title="Click to view Account & Interlinked Profile">' +
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
  /* The filter forces matching sections open so the hits are visible.
     The state it displaced is remembered, so clearing the filter puts the
     tree back the way the user left it rather than leaving every section
     expanded for good. */
  var preFilter = null;
  box.addEventListener('input', PS.debounce(function () {
    var q = PS.clean(box.value, 60).toLowerCase();
    var root = PS.$('#navRoot');
    if (!root) return;
    if (!q) {
      PS.$$('.nav-sec', root).forEach(function (sec) {
        sec.style.display = '';
        if (preFilter && preFilter[sec.dataset.sec] !== undefined) {
          sec.dataset.open = preFilter[sec.dataset.sec] ? 'true' : 'false';
          var hb = sec.querySelector('.nav-sec-head');
          if (hb) hb.setAttribute('aria-expanded', preFilter[sec.dataset.sec] ? 'true' : 'false');
        }
      });
      PS.$$('.nav-list li', root).forEach(function (li) { li.style.display = ''; });
      PS.$$('.sec-count', root).forEach(function (c) {
        var sec = c.closest('.nav-sec');
        if (!sec) return;
        var all = PS.navVisibleSections().filter(function (g) { return g.sec === sec.dataset.sec; })[0];
        if (all) c.textContent = all.items.length;
      });
      var emp = PS.$('.nav-empty', root);
      if (emp) emp.remove();
      preFilter = null;
      return;
    }
    if (!preFilter) {
      preFilter = {};
      PS.$$('.nav-sec', root).forEach(function (sec) { preFilter[sec.dataset.sec] = sec.dataset.open === 'true'; });
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
      var cnt = sec.querySelector('.sec-count');
      if (cnt) cnt.textContent = hits;
      if (hits) {
        anyVisible = true;
        sec.dataset.open = 'true';
        var hb = sec.querySelector('.nav-sec-head');
        if (hb) hb.setAttribute('aria-expanded', 'true');
      }
    });
    var old = PS.$('.nav-empty', root);
    if (old) old.remove();
    if (!anyVisible) {
      var noMatchTxt = (PS.i18n && PS.i18n.t) ? PS.i18n.t('nav.noMatch', { 0: box.value }) : ('No menu items match \u201c' + box.value + '\u201d. Try \u201cquotes\u201d, \u201cSOP\u201d or \u201csavings\u201d.');
      /* The menu is scoped by the track, so something that is in the
         product may not be in this view. The filter says so and offers
         the way out, rather than leaving the reader with a dead end
         and no explanation. */
      var viewName = PS.navCurrentView() === 'operations' ? 'the working view' : 'the learning view';
      root.insertAdjacentHTML('beforeend', '<div class="nav-empty">' + PS.esc(noMatchTxt) +
        '<div class="nav-empty-hint">Nothing here matches in ' + PS.esc(viewName) + '.</div>' +
        '<a class="btn btn-sm btn-ghost" href="#/search?q=' + encodeURIComponent(box.value) + '">Search everything</a></div>');
    }
  }, 120));
};
