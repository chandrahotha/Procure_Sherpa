/* ---------- preferences / settings (Section 42) ---------- */
PS.DEFAULT_PREFS = {
  theme: 'light',
  currency: 'USD',
  orgName: '',
  deptName: '',
  taxRate: 0,
  competitiveBidThreshold: 0,
  thresholds: [
    { label: 'Buyer / routine purchase', max: 10000 },
    { label: 'Procurement manager', max: 50000 },
    { label: 'Head of procurement', max: 250000 },
    { label: 'Executive / board approval', max: 0 }
  ],
  dateFormat: 'iso',
  decimals: 2,
  reportFooter: '',
  defaultAssumptions: '',
  defaults: { discountRate: 8, costOfCapital: 9, holdingRate: 18, inflation: 3 },
  navOpen: {}
};
PS._prefsCache = null;
PS.prefs = function () {
  if (!PS._prefsCache) {
    var stored = PS.store.get(PS.K.prefs, {});
    var p = {};
    Object.keys(PS.DEFAULT_PREFS).forEach(function (k) { p[k] = PS.DEFAULT_PREFS[k]; });
    if (stored && typeof stored === 'object') {
      Object.keys(stored).forEach(function (k) { if (stored[k] !== undefined && stored[k] !== null) p[k] = stored[k]; });
    }
    if (!p.thresholds || !p.thresholds.length) p.thresholds = PS.DEFAULT_PREFS.thresholds;
    if (!p.defaults) p.defaults = PS.DEFAULT_PREFS.defaults;
    PS._prefsCache = p;
  }
  return PS._prefsCache;
};
PS.savePrefs = function (patch, silent) {
  var p = PS.prefs();
  Object.keys(patch || {}).forEach(function (k) { p[k] = patch[k]; });
  PS._prefsCache = p;
  var ok = PS.store.set(PS.K.prefs, p);
  if (!silent) PS.audit('settings-changed', Object.keys(patch || {}).join(', '));
  return ok;
};
PS.resetPrefs = function () {
  PS._prefsCache = null;
  PS.store.remove(PS.K.prefs);
  PS.audit('settings-reset', 'Preferences restored to defaults');
};
PS.orgLine = function () {
  var p = PS.prefs(), bits = [];
  if (p.orgName) bits.push(p.orgName);
  if (p.deptName) bits.push(p.deptName);
  return bits.join(' \u00B7 ');
};

/* ---------- audit log (Section 29) ---------- */
PS.audit = function (event, detail) {
  try {
    var log = PS.store.get(PS.K.audit, []);
    if (!Array.isArray(log)) log = [];
    log.unshift({ t: new Date().toISOString(), e: PS.clean(event, 80), d: PS.clean(detail, 240) });
    if (log.length > PS.AUDIT_MAX) log = log.slice(0, PS.AUDIT_MAX);
    PS.store.set(PS.K.audit, log);
  } catch (e) { /* auditing must never break the app */ }
};
PS.auditList = function () {
  var log = PS.store.get(PS.K.audit, []);
  return Array.isArray(log) ? log : [];
};
PS.auditClear = function () { PS.store.set(PS.K.audit, []); PS.audit('audit-log-cleared', 'Local audit log emptied'); };

/* ---------- favorites + recently used (Section 49) ---------- */
PS.fav = {
  list: function () { var f = PS.store.get(PS.K.fav, []); return Array.isArray(f) ? f : []; },
  has: function (type, id) { return PS.fav.list().some(function (x) { return x.type === type && x.id === id; }); },
  toggle: function (type, id, title) {
    var f = PS.fav.list();
    var i = f.map(function (x) { return x.type + '|' + x.id; }).indexOf(type + '|' + id);
    if (i >= 0) { f.splice(i, 1); PS.audit('favorite-removed', type + ' ' + id); }
    else { f.unshift({ type: type, id: id, title: PS.clean(title, 120), t: new Date().toISOString() }); PS.audit('favorite-added', type + ' ' + id); }
    PS.store.set(PS.K.fav, f.slice(0, 120));
    return PS.fav.has(type, id);
  }
};
PS.recent = {
  list: function () { var r = PS.store.get(PS.K.recent, []); return Array.isArray(r) ? r : []; },
  add: function (type, id, title) {
    if (!id) return;
    var r = PS.recent.list().filter(function (x) { return !(x.type === type && x.id === id); });
    r.unshift({ type: type, id: id, title: PS.clean(title, 120), t: new Date().toISOString() });
    PS.store.set(PS.K.recent, r.slice(0, 24));
  },
  clear: function () { PS.store.set(PS.K.recent, []); PS.audit('recent-cleared', 'Recently used list emptied'); }
};