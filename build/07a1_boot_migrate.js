/* ==========================================================
   Section K: fallback page, migration, boot (Section 45, 55, 57)
   ========================================================== */
PS.notFound = function (kind, id) {
  var route = PS.TYPE_ROUTE[kind] || kind;
  return '<div class="card"><h1>Not found</h1>' +
    '<p>Procure Sherpa has no ' + PS.esc(kind || 'page') + ' with the reference <strong>' + PS.esc(PS.clean(id, 60)) + '</strong>.</p>' +
    '<p>The reference may have changed, or the link may have been typed with a small difference.</p>' +
    PS.actionsBar([
      '<a class="btn btn-primary" href="#/home">Go to Home</a>',
      '<a class="btn" href="#/search?q=' + encodeURIComponent(id || '') + '">Search instead</a>',
      '<a class="btn btn-ghost" href="#/list/' + PS.esc(route) + '">Browse the library</a>'
    ]) + '</div>';
};
PS.route('notfound', function () {
  return '<div class="card"><h1>Page not found</h1><p>That address does not match any Procure Sherpa page.</p>' +
    '<p>Use the search box above, or start from the <a href="#/home">Home</a> page.</p></div>';
});

/* ---------- schema migration and saved-record validation (Section 55, 56) ---------- */
PS.normalizeSaved = function (arr) {
  if (!Array.isArray(arr)) return [];
  return arr.filter(function (x) { return x && typeof x === 'object'; }).map(function (x) {
    var now = new Date().toISOString();
    return {
      id: PS.clean(x.id, 60) || PS.uid('sv'),
      type: PS.clean(x.type, 40) || 'calculation',
      title: PS.clean(x.title || x.name || 'Untitled saved item', 140),
      created: x.created || x.date || now,
      modified: x.modified || x.updated || x.created || now,
      tags: Array.isArray(x.tags) ? x.tags.slice(0, 10) : [],
      notes: PS.clean(x.notes, 4000),
      data: (x.data && typeof x.data === 'object') ? x.data
        : (x.values ? { values: x.values, calc: x.calc, calcTitle: x.calcTitle } : {}),
      v: x.v || 1
    };
  });
};
PS.migrate = function () {
  var sv = PS.num(PS.store.get(PS.K.schema, 0));
  if (!isFinite(sv) || sv === 0) {
    var imported = [];
    PS.LEGACY.forEach(function (key) {
      var raw = PS.store.get(key, null);
      if (!raw) return;
      var arr = Array.isArray(raw) ? raw : (raw && Array.isArray(raw.items) ? raw.items : null);
      if (!arr) return;
      arr.forEach(function (x) { if (x && typeof x === 'object') imported.push(x); });
    });
    if (imported.length) {
      var norm = PS.normalizeSaved(imported);
      PS.store.set(PS.K.saved, PS.saved.list().concat(norm).slice(0, PS.MAX_SAVED));
      PS.audit('legacy-migration', norm.length + ' items carried over from Procure Sherpa v1.x');
      setTimeout(function () {
        PS.toast(norm.length + ' saved item' + (norm.length > 1 ? 's were' : ' was') + ' carried over from an earlier Procure Sherpa version.', 'ok');
      }, 1000);
    }
  } else if (sv < PS.SCHEMA) {
    PS.store.set(PS.K.saved, PS.normalizeSaved(PS.store.get(PS.K.saved, [])));
    PS.audit('schema-migration', 'Saved work upgraded from schema v' + sv + ' to v' + PS.SCHEMA);
  } else {
    PS.store.set(PS.K.saved, PS.normalizeSaved(PS.store.get(PS.K.saved, [])));
  }
  PS.store.set(PS.K.schema, PS.SCHEMA);
};