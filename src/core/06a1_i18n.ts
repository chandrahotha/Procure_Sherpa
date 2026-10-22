/* ==========================================================
   Internationalization architecture (roadmap 6.2)
   PS.i18n provides the t() pattern, locale resolution and a
   string catalog. The app currently ships EN-only content, but
   the chrome (shell, nav, topbar, common actions) routes through
   t() so additional locale catalogs can drop in without touching
   feature code.

   Usage:
     PS.i18n.t('nav.calculators')            -> 'Calculators'
     PS.i18n.t('saved.items', {n: 5})        -> '5 items' (plural-safe)
     PS.i18n.current()                       -> 'en'
   To add a locale: register PS.i18n.CATALOG['fr'] = {...}.
   ========================================================== */

PS.i18n = PS.i18n || {};

/* English is the source-of-truth catalog. Keys are dotted and
   grouped by area so future catalogs mirror this shape exactly. */
PS.i18n.CATALOG = {
  en: {
    'app.name': 'Procure Sherpa',
    'app.tagline': 'Learning Platform',

    'hub.home': 'Command Center',
    'hub.academy': 'Academy',
    'hub.operations': 'Operations',
    'hub.workspace': 'Workspace & Settings',
    'hub.academyTitle': 'Procurement Academy',
    'hub.academySub': 'Interactive Learning',
    'hub.opsTitle': 'Operations Hub',
    'hub.opsSub': 'Practitioner Tools',
    'hub.workspaceTitle': 'Workspace & Settings',
    'hub.workspaceSub': 'User Account & Tools',

    'nav.filter': 'Filter menu\u2026',
    'nav.noMatch': 'No menu items match \u201c{0}\u201d. Try \u201cquotes\u201d, \u201cSOP\u201d or \u201csavings\u201d.',
    'nav.saved': 'Saved Work',
    'nav.fav': 'Favorites',
    'nav.recent': 'Recently Used',
    'nav.help': 'Help Center',

    'topbar.search': 'Search knowledge, SOPs, calculators, checklists, templates, KPIs\u2026',
    'topbar.fav': 'Add or remove this page from favorites',
    'topbar.print': 'Print / save report as PDF',
    'topbar.theme': 'Toggle dark mode',
    'topbar.profile': 'My Account & Role Profile',
    'topbar.account': 'Account',

    'footer.privacy': 'Enterprise Single-Tenant Session \u00B7 Zero Data Egress',
    'footer.note': 'Procure Sherpa. Interactive procurement learning and decision-support platform. Not an ERP. Approval thresholds, tax treatment, and legal requirements vary by organization and jurisdiction: configure Settings and verify locally before operational use.',

    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.reset': 'Reset',
    'common.search': 'Search',
    'common.print': 'Print / PDF',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.add': 'Add',
    'common.remove': 'Remove',
    'common.edit': 'Edit',

    'calc.calculate': 'Calculate',
    'calc.example': 'Load example',
    'calc.reset': 'Reset',
    'calc.save': 'Save to workspace',
    'calc.markdown': 'Copy as Markdown',
    'calc.copySummary': 'Copy summary',
    'calc.whatif': 'What-if analysis',
    'calc.shareStatic': 'Static share page',

    'saved.items': '{n} item(s) stored',
    'audit.events': 'local events',

    'privacy.session': 'Enterprise Single-Tenant Session \u00B7 Zero Data Egress'
  }
};

PS.i18n._locale = null;

PS.i18n.current = function () {
  if (!PS.i18n._locale) {
    var stored = PS.prefs && PS.prefs().locale;
    PS.i18n._locale = (stored && PS.i18n.CATALOG[stored]) ? stored : 'en';
  }
  return PS.i18n._locale;
};

/* Set locale at runtime; persists through prefs when available. */
PS.i18n.setLocale = function (code) {
  if (!PS.i18n.CATALOG[code]) code = 'en';
  PS.i18n._locale = code;
  if (PS.savePrefs) PS.savePrefs({ locale: code }, true);
  document.documentElement.setAttribute('lang', code);
  PS.i18n.applyDom();
  return code;
};

/* Look up a key. Falls back gracefully: exact key -> {n} substitution,
   then the raw key (so missing keys are visibly broken, not silent). */
PS.i18n.t = function (key, vars) {
  var cat = PS.i18n.CATALOG[PS.i18n.current()] || PS.i18n.CATALOG.en;
  var s = cat[key];
  if (s === undefined) {
    s = key;
    if (window.console && console.warn) console.warn('i18n: missing key ' + key);
  }
  if (vars) {
    Object.keys(vars).forEach(function (k) {
      s = s.split('{' + k + '}').join(String(vars[k]));
    });
  }
  return s;
};

/* Rewrite all data-i18n attributes in the live DOM. Used on boot and
   after a locale change so persistent chrome updates without re-render. */
PS.i18n.applyDom = function () {
  PS.$$('[data-i18n]').forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    var plural = el.getAttribute('data-i18n-count');
    var txt;
    if (plural) {
      var n = PS.num(el.getAttribute('data-i18n-n')) || 0;
      txt = PS.i18n.t(key, { n: n });
    } else {
      txt = PS.i18n.t(key);
    }
    el.textContent = txt;
  });
  PS.$$('[data-i18n-placeholder]').forEach(function (el) {
    el.setAttribute('placeholder', PS.i18n.t(el.getAttribute('data-i18n-placeholder')));
  });
  PS.$$('[data-i18n-title]').forEach(function (el) {
    el.setAttribute('title', PS.i18n.t(el.getAttribute('data-i18n-title')));
  });
};