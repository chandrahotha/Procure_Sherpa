/* ---------- breadcrumbs (Section 48) ---------- */
PS.crumbFor = function (r) {
  var out = [];
  if (r.name === 'home') return [];
  if (r.name === 'list') {
    var mt = PS.LIST_META[r.args[0]] || { title: 'Library' };
    out.push({ label: mt.title, href: '#/list/' + r.args[0] });
    if (r.args[1]) out.push({ label: r.args.slice(1).join('/') });
    return out;
  }
  var map = { k: 'kb', sop: 'sop', cl: 'cl', tpl: 'tpl', dec: 'dec', kpi: 'kpi', calc: 'calc', scen: 'scen' };
  if (map[r.name] && r.arg) {
    var type = map[r.name];
    var mt2 = PS.LIST_META[type] || { title: PS.typeLabel(type) };
    var item = PS.byId(type, r.arg);
    out.push({ label: mt2.title, href: '#/list/' + type });
    out.push({ label: item ? item.title : r.arg });
    return out;
  }
  var labels = {
    search: 'Search', what: 'What should I do?', quickstart: 'Quick Start', fav: 'Favorites', recent: 'Recently used',
    saved: 'Saved work', dash: 'Dashboard', 'dash-savings': 'Savings dashboard', backup: 'Backup and restore',
    audit: 'Audit log', settings: 'Settings', glossary: 'Glossary', scenarios: 'Scenario library',
    maturity: 'Procurement maturity', lifecycle: 'Procurement lifecycle', notfound: 'Not found'
  };
  if (labels[r.name]) return [{ label: labels[r.name] }];
  if (r.name === 'help') return [{ label: 'Help Center', href: '#/help' }].concat(r.arg ? [{ label: PS.clean(r.arg, 40) }] : []);
  return [];
};