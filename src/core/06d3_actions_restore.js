PS.importBackup = function (obj, filename) {
  var v = PS.validateBackup(obj);
  if (!v.ok) { PS.toast(v.error, 'danger'); return; }
  var s = v.summary;
  PS.modal({
    title: 'Restore backup', wide: true,
    body: '<p>File: <strong>' + PS.esc(filename || 'backup.json') + '</strong> &middot; exported ' + PS.esc(String(s.exported)) + ' &middot; schema v' + PS.esc(String(s.schema)) + '</p>' +
      '<div class="table-wrap"><table><thead><tr><th>Content</th><th class="num">In backup</th><th class="num">Currently stored</th></tr></thead><tbody>' +
      '<tr><td>Saved work</td><td class="num">' + s.saved + '</td><td class="num">' + PS.saved.count() + '</td></tr>' +
      '<tr><td>Checklists with progress</td><td class="num">' + s.checklists + '</td><td class="num">' + Object.keys(PS.clState.all()).length + '</td></tr>' +
      '<tr><td>Templates with entries</td><td class="num">' + s.templates + '</td><td class="num">' + Object.keys(PS.tplState.all()).length + '</td></tr>' +
      '<tr><td>Favorites</td><td class="num">' + s.favorites + '</td><td class="num">' + PS.fav.list().length + '</td></tr>' +
      '<tr><td>Recently used</td><td class="num">' + s.recent + '</td><td class="num">' + PS.recent.list().length + '</td></tr>' +
      '<tr><td>Audit events</td><td class="num">' + s.audit + '</td><td class="num">' + PS.auditList().length + '</td></tr>' +
      '<tr><td>Settings included</td><td class="num">' + (s.hasPrefs ? 'yes' : 'no') + '</td><td class="num">current</td></tr>' +
      '</tbody></table></div>' +
      '<div class="field"><label for="restoreMode">Restore mode</label><select id="restoreMode">' +
      '<option value="merge">Merge - keep current data and add items that are not already present</option>' +
      '<option value="replace">Replace - delete current data and use the backup instead</option>' +
      '</select></div>' +
      '<p class="note">The file is validated before anything is written. Your current data is not changed until you confirm.</p>',
    okLabel: 'Restore now',
    onOk: function (root) {
      var mode = PS.$('#restoreMode', root).value;
      PS.applyRestore(v.clean, mode, filename);
    }
  });
};
PS.applyRestore = function (c, mode, filename) {
  try {
    if (mode === 'replace') {
      PS.store.set(PS.K.saved, c.saved);
      PS.store.set(PS.K.cl, c.checklists);
      PS.store.set(PS.K.tpl, c.templates);
      PS.store.set(PS.K.fav, c.favorites);
      PS.store.set(PS.K.recent, c.recent);
      PS.store.set(PS.K.audit, c.audit);
      if (c.prefs) { PS._prefsCache = null; PS.store.set(PS.K.prefs, c.prefs); }
      if (c.academy && PS.academy) PS.academy.save(c.academy);
      if (c.exams) PS.store.set(PS.K.exams, c.exams);
      if (c.spend) PS.store.set(PS.K.spend, c.spend);
      if (c.copilot) PS.store.set(PS.K.copilot, c.copilot);
      if (c.docpacks) PS.store.set(PS.K.docpacks, c.docpacks);
      if (c.labs) PS.store.set(PS.K.labs, c.labs);
      if (c.assessment) PS.store.set(PS.K.assessment, c.assessment);
      if (c.community) PS.store.set(PS.K.community, c.community);
      /* The workbench records are replaced wholesale in replace mode
         and merged collection by collection in merge mode, so a merge
         does not quietly drop a supplier the user recorded. */
      if (c.workbench) {
        if (mode === 'replace') {
          PS.wb.data = c.workbench;
        } else {
          var cur = PS.wb.load();
          Object.keys(c.workbench).forEach(function (k) {
            if (Array.isArray(c.workbench[k]) && Array.isArray(cur[k])) {
              var have = {};
              cur[k].forEach(function (r) { have[r.id] = 1; });
              c.workbench[k].forEach(function (r) { if (!have[r.id]) cur[k].push(r); });
            } else if (cur[k] === undefined) {
              cur[k] = c.workbench[k];
            }
          });
          PS.wb.data = cur;
        }
        PS.wb.save();
      }
    } else {
      var ids = {};
      PS.saved.list().forEach(function (x) { ids[x.id] = 1; });
      PS.store.set(PS.K.saved, PS.saved.list().concat(c.saved.filter(function (x) { return !ids[x.id]; })).slice(0, PS.MAX_SAVED));
      var cl = PS.clState.all();
      Object.keys(c.checklists).forEach(function (k) { if (!cl[k]) cl[k] = c.checklists[k]; });
      PS.store.set(PS.K.cl, cl);
      var tp = PS.tplState.all();
      Object.keys(c.templates).forEach(function (k) { if (!tp[k]) tp[k] = c.templates[k]; });
      PS.store.set(PS.K.tpl, tp);
      var fav = PS.fav.list(), fk = {};
      fav.forEach(function (x) { fk[x.type + '|' + x.id] = 1; });
      PS.store.set(PS.K.fav, fav.concat(c.favorites.filter(function (x) { return !fk[x.type + '|' + x.id]; })).slice(0, 120));
      if (!PS.recent.list().length) PS.store.set(PS.K.recent, c.recent);
      if (c.prefs) { PS._prefsCache = null; PS.store.set(PS.K.prefs, c.prefs); }
      if (c.academy && PS.academy) {
        var curA = PS.academy.getAll();
        var mergedA = Object.assign({}, curA, c.academy);
        mergedA.completed = Object.assign({}, curA.completed || {}, (c.academy && c.academy.completed) || {});
        mergedA.badges = Object.assign({}, curA.badges || {}, (c.academy && c.academy.badges) || {});
        mergedA.scores = Object.assign({}, curA.scores || {}, (c.academy && c.academy.scores) || {});
        PS.academy.save(mergedA);
      }
      if (c.exams) { var curE = PS.store.get(PS.K.exams, {}); PS.store.set(PS.K.exams, Object.assign({}, curE, c.exams)); }
      if (c.spend) { var curS = PS.store.get(PS.K.spend, {}); PS.store.set(PS.K.spend, Object.assign({}, curS, c.spend)); }
      if (c.copilot) { var curC = PS.store.get(PS.K.copilot, {}); PS.store.set(PS.K.copilot, Object.assign({}, curC, c.copilot)); }
      if (c.docpacks) { var curD = PS.store.get(PS.K.docpacks, {}); PS.store.set(PS.K.docpacks, Object.assign({}, curD, c.docpacks)); }
      if (c.labs) { var curL = PS.store.get(PS.K.labs, {}); PS.store.set(PS.K.labs, Object.assign({}, curL, c.labs)); }
      if (c.assessment) { PS.store.set(PS.K.assessment, c.assessment); }
      if (c.community) { var curC2 = PS.store.get(PS.K.community, []); PS.store.set(PS.K.community, curC2.concat(c.community).slice(-50)); }
      /* Merged collection by collection, so a merge does not quietly
         drop a supplier the user recorded. */
      if (c.workbench) {
        var curW = PS.wb.load();
        Object.keys(c.workbench).forEach(function (k) {
          if (Array.isArray(c.workbench[k]) && Array.isArray(curW[k])) {
            var haveW = {};
            curW[k].forEach(function (r) { haveW[r.id] = 1; });
            c.workbench[k].forEach(function (r) { if (!haveW[r.id]) curW[k].push(r); });
          } else if (curW[k] === undefined) {
            curW[k] = c.workbench[k];
          }
        });
        PS.wb.data = curW;
        PS.wb.save();
      }
    }
    PS.audit('backup-restored', (mode === 'replace' ? 'replace' : 'merge') + ' from ' + PS.clean(filename || 'backup', 80));
    PS.applyTheme();
    PS.prefs();
    PS.buildNav();
    PS.updateNavCounts();
    PS.renderRoute();
    PS.toast('Backup restored (' + mode + ' mode).', 'ok');
  } catch (e) {
    if (window.console && console.error) console.error(e);
    PS.toast('The restore could not be completed. Your existing data was not fully replaced.', 'danger');
  }
};
PS.acts['backup-import'] = function () {
  PS.readJsonFile(function (obj, filename) { PS.importBackup(obj, filename); });
};