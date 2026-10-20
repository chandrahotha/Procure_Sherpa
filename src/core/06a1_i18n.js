/* ==========================================================
   Internationalization architecture (roadmap 6.2)
   Provides multi-locale chrome interface translation:
     - 2 locales registered (en, es).
     - Full catalog keys defined and wired to data-i18n,
       data-i18n-placeholder, and data-i18n-title attributes.
     - Settings language switcher with live DOM re-apply on switch.
     - Plural-safe {n} substitution and preference persistence.
     - Run `npm run audit:i18n` for an automated coverage audit.

   Usage:
     PS.i18n.t('nav.saved')                  -> 'Saved Work' / 'Trabajo guardado'
     PS.i18n.t('saved.items', {n: 5})        -> '5 items stored'
     PS.i18n.current()                       -> 'en'
   ========================================================== */

PS.i18n = PS.i18n || {};

/* English is the source-of-truth catalog. Keys are dotted and
   grouped by area so future catalogs mirror this shape exactly. */
PS.i18n.CATALOG = {
  en: {
    'app.name': 'Procure Sherpa',
    'app.tagline': 'Navigation',

    'nav.filter': 'Filter menu\u2026',
    'nav.view.label': 'What you see in the menu',
  'nav.view.learn': 'Learn',
  'nav.view.work': 'Work',
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
  'calc.random': 'Random values',
    'calc.reset': 'Reset',
    'calc.save': 'Save to workspace',
    'calc.markdown': 'Copy as Markdown',
    'calc.copySummary': 'Copy summary',
    'calc.whatif': 'What-if analysis',
    'calc.shareStatic': 'Static share page',

    'saved.items': '{n} item(s) stored',
    'audit.events': 'local events',

    'privacy.session': 'Enterprise Single-Tenant Session \u00B7 Zero Data Egress'
  },

  es: {
    'nav.view.label': 'Lo que ve en el menú',
    'nav.view.learn': 'Aprender',
    'nav.view.work': 'Trabajar',
    'app.name': 'Procure Sherpa',
    'app.tagline': 'Navegaci\u00F3n',

    'nav.filter': 'Filtrar men\u00FA\u2026',
    'nav.noMatch': 'No hay elementos de men\u00FA que coincidan con \u201C{0}\u201D. Pruebe con \u201Ccotizaciones\u201D, \u201CSOP\u201D o \u201Cahorros\u201D.',
    'nav.saved': 'Trabajo guardado',
    'nav.fav': 'Favoritos',
    'nav.recent': 'Usados recientemente',
    'nav.help': 'Centro de ayuda',

    'topbar.search': 'Buscar conocimientos, SOPs, calculadoras, listas de control, plantillas, KPIs\u2026',
    'topbar.fav': 'A\u00F1adir o quitar esta p\u00E1gina de favoritos',
    'topbar.print': 'Imprimir / guardar informe en PDF',
    'topbar.theme': 'Alternar modo oscuro',
    'topbar.profile': 'Mi cuenta y perfil de rol',
    'topbar.account': 'Cuenta',

    'footer.privacy': 'Sesi\u00F3n Empresarial de Inquilino \u00DAnico \u00B7 Cero Salida de Datos',
    'footer.note': 'Procure Sherpa. Plataforma interactiva de aprendizaje y apoyo a decisiones en compras. No es un ERP. Umbrales de aprobaci\u00F3n, tratamiento fiscal y requisitos legales var\u00EDan seg\u00FAn la organizaci\u00F3n: configure Ajustes y verifique localmente antes del uso operativo.',

    'common.cancel': 'Cancelar',
    'common.confirm': 'Confirmar',
    'common.close': 'Cerrar',
    'common.save': 'Guardar',
    'common.delete': 'Eliminar',
    'common.reset': 'Restablecer',
    'common.search': 'Buscar',
    'common.print': 'Imprimir / PDF',
    'common.back': 'Atr\u00E1s',
    'common.next': 'Siguiente',
    'common.add': 'A\u00F1adir',
    'common.remove': 'Quitar',
    'common.edit': 'Editar',

    'calc.calculate': 'Calcular',
    'calc.example': 'Cargar ejemplo',
  'calc.random': 'Valores aleatorios',
    'calc.reset': 'Restablecer',
    'calc.save': 'Guardar en espacio de trabajo',
    'calc.markdown': 'Copiar como Markdown',
    'calc.copySummary': 'Copiar resumen',
    'calc.whatif': 'An\u00E1lisis hipot\u00E9tico',
    'calc.shareStatic': 'P\u00E1gina est\u00E1tica compartible',

    'saved.items': '{n} elemento(s) guardado(s)',
    'audit.events': 'eventos locales',

    'privacy.session': 'Sesi\u00F3n Empresarial de Inquilino \u00DAnico \u00B7 Cero Salida de Datos'
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