/* ---------- breadcrumbs (Section 48) ---------- */
PS.crumbFor = function (r) {
  var out = [];
  if (r.name === 'home') return [];

  // Academy Hub
  if (r.name === 'academy') {
    out.push({ label: 'Procurement Academy', href: '#/academy' });
    if (r.arg) {
      var allFuncs = PS.ACADEMY_FUNCTIONS || [];
      var f = allFuncs.filter(function (x) { return x.id === r.arg; })[0];
      out.push({ label: f ? f.title : r.arg });
    }
    return out;
  }
  if (r.name === 'academy-progress') {
    return [
      { label: 'Procurement Academy', href: '#/academy' },
      { label: 'My Progress & Badges' }
    ];
  }
  if (r.name === 'certificate') {
    return [
      { label: 'Procurement Academy', href: '#/academy' },
      { label: 'Credential Transcript (Future)' }
    ];
  }

  // Operations Hub Gateway
  if (r.name === 'operations') {
    return [{ label: 'Operations Hub' }];
  }

  // Operations Hub Libraries & Items
  if (r.name === 'list') {
    var mt = PS.LIST_META[r.args[0]] || { title: 'Library' };
    out.push({ label: 'Operations Hub', href: '#/operations' });
    out.push({ label: mt.title, href: '#/list/' + r.args[0] });
    if (r.args[1]) out.push({ label: r.args.slice(1).join('/') });
    return out;
  }
  var map = { k: 'kb', sop: 'sop', cl: 'cl', tpl: 'tpl', dec: 'dec', kpi: 'kpi', calc: 'calc', scen: 'scen' };
  if (map[r.name] && r.arg) {
    var type = map[r.name];
    var mt2 = PS.LIST_META[type] || { title: PS.typeLabel(type) };
    var item = PS.byId(type, r.arg);
    out.push({ label: 'Operations Hub', href: '#/operations' });
    out.push({ label: mt2.title, href: '#/list/' + type });
    out.push({ label: item ? item.title : r.arg });
    return out;
  }

  // Operational Tools
  var opLabels = {
    what: 'What Should I Do?',
    glossary: 'Procurement Glossary',
    scenarios: 'Scenario Library',
    maturity: 'Procurement Maturity Assessment',
    lifecycle: 'Procurement Lifecycle Map',
    dash: 'Operations Dashboard',
    'dash-savings': 'Savings Dashboard'
  };
  if (opLabels[r.name]) {
    return [
      { label: 'Operations Hub', href: '#/operations' },
      { label: opLabels[r.name] }
    ];
  }

  // Workspace & Settings
  var wsLabels = {
    saved: 'Saved Work & Reports',
    fav: 'Favorites',
    recent: 'Recently Used',
    backup: 'Backup & Restore',
    audit: 'Audit Log',
    settings: 'Application Settings',
    search: 'Search',
    quickstart: 'Quick Start'
  };
  if (wsLabels[r.name]) {
    return [
      { label: 'Workspace', href: '#/saved' },
      { label: wsLabels[r.name] }
    ];
  }

  if (r.name === 'help') {
    return [{ label: 'Help Center', href: '#/help' }].concat(r.arg ? [{ label: PS.clean(r.arg, 40) }] : []);
  }

  return [];
};