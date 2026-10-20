/* ==========================================================
   Section E: hash router + page framework (Section 48, 73)
   ========================================================== */
PS.routes = {};
PS.routeMeta = { name: '', arg: '', args: [], params: {} };
PS.pageInit = null;
PS.shareConsumed = false;

PS.route = function (name, fn) { PS.routes[name] = fn; };
PS.parseHash = function (h) {
  h = String(h || location.hash || '').replace(/^#\/?/, '');
  var qs = '';
  var qi = h.indexOf('?');
  if (qi >= 0) { qs = h.slice(qi + 1); h = h.slice(0, qi); }
  var segs = h.split('/').filter(function (s) { return s !== ''; });
  var params = {};
  qs.split('&').forEach(function (pair) {
    if (!pair) return;
    var i = pair.indexOf('=');
    var k = i < 0 ? pair : pair.slice(0, i);
    var v = i < 0 ? '' : pair.slice(i + 1);
    try { params[decodeURIComponent(k)] = decodeURIComponent(v.replace(/\+/g, ' ')); } catch (e) { params[k] = v; }
  });
  var args = segs.slice(1).map(function (s) { try { return decodeURIComponent(s); } catch (e) { return s; } });
  return { name: segs[0] || 'home', args: args, arg: args[0] || '', params: params };
};
PS.go = function (name, params, arg) {
  var h = '#/' + name + (arg !== undefined && arg !== null && arg !== '' ? '/' + encodeURIComponent(arg) : '');
  if (params) {
    var bits = [];
    Object.keys(params).forEach(function (k) {
      if (params[k] === undefined || params[k] === null || params[k] === '') return;
      bits.push(encodeURIComponent(k) + '=' + encodeURIComponent(params[k]));
    });
    if (bits.length) h += '?' + bits.join('&');
  }
  if (location.hash === h) PS.renderRoute();
  else location.hash = h;
};
PS.link = function (type, id, label, cls) {
  return '<a href="' + PS.routeFor(type, id) + '"' + (cls ? ' class="' + cls + '"' : '') + '>' + PS.esc(label) + '</a>';
};
PS.renderRoute = function () {
  var r = PS.parseHash();
  PS.routeMeta = r;
  if (PS.syncNavForRoute) PS.syncNavForRoute(r);
  var fn = PS.routes[r.name] || PS.routes.notfound;
  var html = '';
  PS.pageInit = null;
  try {
    if (r.name === 'calc' && PS.byId('calc', r.arg)) PS.audit('calculator-used', PS.byId('calc', r.arg).title);
    html = fn ? fn(r.arg, r.params) : '';
  } catch (e) {
    html = PS.errPanel('This page could not be displayed', e);
  }
  var main = PS.$('#main');
  main.innerHTML = html || '<div class="empty">Nothing to show here.</div>';
  PS.renderCrumb(r);
  PS.markNav(r);
  PS.updateFavBtn(r);
  PS.closeNav();
  document.title = (PS.pageTitle ? PS.pageTitle + ' | ' : '') + 'Procure Sherpa';
  PS.pageTitle = '';
  if (PS.pageInit) { try { PS.pageInit(); } catch (e) { PS.errPanel('initialise'); } }
  /* Focus moves to the main region on a real navigation. The clicked link
     is removed from the DOM when the route renders, so focus used to fall
     back to <body>: screen readers announced nothing and Tab restarted
     from the top of the document. */
  if (PS._routeFocusPending) {
    PS._routeFocusPending = false;
    try { if (main && main.focus) main.focus({ preventScroll: true }); } catch (e) { }
  }
  /* Scroll to the top on a forward navigation, but restore the previous
     position when the user goes Back. Forcing the top on every render
     broke the browser's own scroll restoration. */
  if (!PS._popState) {
    try { window.scrollTo(0, 0); } catch (e) { }
  }
  PS._popState = false;
  if (PS.onRouteDone) { try { PS.onRouteDone(r); } catch (e) { } }
};
PS.errPanel = function (msg, e) {
  if (window.console && console.error) console.error(e || msg);
  return '<div class="alert alert-danger"><strong>' + PS.esc(msg) + '</strong>' +
    'Something unexpected happened while building this page. Your saved data is safe. ' +
    '<a href="#/home">Return to Home</a> or use Search.</div>';
};
PS.renderCrumb = function (r) {
  var el = PS.$('#crumb');
  if (!el) return;
  var trail = PS.crumbFor ? PS.crumbFor(r) : null;
  if (!trail || !trail.length) { el.innerHTML = ''; return; }
  var html = ['<a href="#/home">Command Center</a>'];
  trail.forEach(function (t) {
    html.push('<span class="sep">\u203A</span>');
    html.push(t.href ? '<a href="' + t.href + '">' + PS.esc(t.label) + '</a>' : '<span>' + PS.esc(t.label) + '</span>');
  });
  el.innerHTML = html.join(' ');
};
PS.updateFavBtn = function (r) {
  var btn = PS.$('#favBtn');
  if (!btn) return;
  var type = (r && r.name === 'k') ? 'kb' : (r && PS.TYPE_ROUTE) ? Object.keys(PS.TYPE_ROUTE).filter(function (k) { return PS.TYPE_ROUTE[k] === r.name; })[0] : null;
  var item = (type && r.arg) ? PS.byId(type, r.arg) : null;
  if (!item) { btn.disabled = true; btn.classList.remove('is-on'); btn.title = 'Open a page to add it to favorites'; return; }
  btn.disabled = false;
  btn.dataset.favType = type; btn.dataset.favId = item.id;
  var on = PS.fav.has(type, item.id);
  btn.classList.toggle('is-on', on);
  btn.textContent = on ? '\u2605' : '\u2606';
  btn.title = on ? 'Remove from favorites' : 'Add to favorites';
};
/* Which sidebar entry owns which detail route. The library pages in the
   sidebar are list routes (#/list/sop) but every item inside them opens a
   detail route (#/sop/sop-rfq). The old matcher compared a list href to a
   detail href, so that branch could never fire and 8 of the 37 navigation
   items never lit up on the pages they lead to. */
PS.NAV_ROUTE_OWNER = {
  sop: '#/list/sop', calc: '#/list/calc', cl: '#/list/cl', tpl: '#/list/tpl',
  k: '#/list/kb', kpi: '#/list/kpi', dec: '#/list/dec', scen: '#/scenarios',
  glossary: '#/glossary', academy: '#/academy', 'academy-progress': '#/academy-progress',
  exams: '#/exams', assessment: '#/assessment', 'learning-paths': '#/learning-paths',
  labs: '#/labs', portfolio: '#/portfolio'
};
PS.markNav = function (r) {
  var hash = (location.hash || '').split('?')[0];
  var owner = PS.NAV_ROUTE_OWNER[r.name] || ('#/' + r.name);
  var active = null;
  PS.$$('#navRoot a').forEach(function (a) {
    var href = (a.getAttribute('href') || '').split('?')[0];
    var isSame = false;
    if (href === hash) isSame = true;
    else if (href === owner) isSame = true;
    else if (r.name === 'list' && r.args && r.args.length && href === '#/list/' + r.args[0]) isSame = true;
    a.classList.toggle('is-current', isSame);
    if (isSame && a.closest) {
      var sec = a.closest('.nav-sec');
      if (sec) {
        active = a;
        /* Open the owning section and remember that, so the state the user
           sees and the state stored in preferences never disagree. */
        if (sec.dataset.open !== 'true') PS.setNavOpen(sec.dataset.sec, true, false);
      }
    }
  });
  if (active && active.scrollIntoView) {
    try { active.scrollIntoView({ block: 'nearest' }); } catch (e) { }
  }
};
PS.updateNavCounts = function () {
  PS.$$('#navRoot .nav-badge').forEach(function (b) {
    var k = b.dataset.count;
    var n = 0;
    if (k === 'saved') n = PS.saved.count();
    else if (k === 'fav') n = PS.fav.list().length;
    else if (k === 'cl') n = PS.clState.openCount();
    b.textContent = n ? n : '';
  });
};