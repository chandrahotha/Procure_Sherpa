/* ---------- backup, restore, clearing, settings (Section 28, 42, 74) ---------- */
PS.backupObject = function () {
  return {
    app: PS.APP, version: PS.VERSION, schema: PS.SCHEMA,
    exported: new Date().toISOString(),
    prefs: PS.prefs(),
    saved: PS.saved.list(),
    favorites: PS.fav.list(),
    recent: PS.recent.list(),
    checklists: PS.clState.all(),
    templates: PS.tplState.all(),
    academy: PS.academy ? PS.academy.getAll() : null,
    audit: PS.auditList(),
    exams: PS.exams ? PS.exams.all() : null,
    spend: PS.spendModel ? PS.spendModel.all() : null,
    copilot: PS.copilot ? PS.copilot.all() : null,
    docpacks: PS.docpack ? PS.docpack.all() : null,
    labs: PS.store.get(PS.K.labs, {}),
    assessment: PS.store.get(PS.K.assessment, null),
    community: PS.store.get(PS.K.community, []),
    /* The workbenches hold the user's own records: suppliers,
       contracts, catalogue items, budget lines, match workpapers,
       sourcing events, bids and sign-offs. They are the thing people
       would be most upset to lose, so they travel in the backup. */
    workbench: PS.wb ? PS.wb.load() : null,
    counts: PS.registrySummary()
  };
};
PS.acts['backup-export'] = function () {
  var obj = PS.backupObject();
  var name = 'ProcureSherpa_Backup_' + PS.iso() + '.json';
  if (PS.download(name, JSON.stringify(obj, null, 2), 'application/json')) {
    PS.audit('backup-exported', name + ' (' + PS.saved.count() + ' saved items)');
    PS.toast('Backup exported as ' + name, 'ok');
  }
};
PS.validateBackup = function (obj) {
  if (!obj || typeof obj !== 'object') return { ok: false, error: 'The file does not contain a backup object.' };
  var looksRight = obj.app === PS.APP || obj.saved !== undefined || obj.prefs !== undefined || obj.checklists !== undefined;
  if (!looksRight) return { ok: false, error: 'This does not look like a Procure Sherpa backup. Nothing was imported.' };
  if (obj.schema !== undefined && PS.num(obj.schema) > PS.SCHEMA) {
    return { ok: false, error: 'This backup was created by a newer version of Procure Sherpa and cannot be restored safely here.' };
  }
  var saved = Array.isArray(obj.saved) ? obj.saved.filter(function (x) { return x && typeof x === 'object' && x.id && x.title; }) : [];
  var summary = {
    saved: saved.length,
    favorites: Array.isArray(obj.favorites) ? obj.favorites.length : 0,
    recent: Array.isArray(obj.recent) ? obj.recent.length : 0,
    checklists: (obj.checklists && typeof obj.checklists === 'object') ? Object.keys(obj.checklists).length : 0,
    templates: (obj.templates && typeof obj.templates === 'object') ? Object.keys(obj.templates).length : 0,
    audit: Array.isArray(obj.audit) ? obj.audit.length : 0,
    hasPrefs: !!obj.prefs,
    exported: obj.exported || 'unknown',
    schema: obj.schema === undefined ? 1 : obj.schema
  };
  return {
    ok: true, summary: summary,
    /* Every branch of `clean` goes through PS.untrustedClone, because this
       is the one place a file from outside the browser becomes data the app
       will merge with. Filtering here covers all of applyRestore's copies,
       Object.assign calls and store writes; filtering in each of those
       instead would leave the next one added to be forgotten. */
    clean: {
      saved: saved.map(function (x) { return PS.untrustedClone(x); }),
      prefs: (obj.prefs && typeof obj.prefs === 'object') ? PS.untrustedClone(obj.prefs) : null,
      favorites: Array.isArray(obj.favorites) ? obj.favorites.filter(function (x) { return x && x.id; }).map(function (x) { return PS.untrustedClone(x); }) : [],
      recent: Array.isArray(obj.recent) ? obj.recent.filter(function (x) { return x && x.id; }).map(function (x) { return PS.untrustedClone(x); }) : [],
      checklists: (obj.checklists && typeof obj.checklists === 'object') ? PS.untrustedClone(obj.checklists) : {},
      templates: (obj.templates && typeof obj.templates === 'object') ? PS.untrustedClone(obj.templates) : {},
      academy: (obj.academy && typeof obj.academy === 'object') ? PS.untrustedClone(obj.academy) : null,
      exams: (obj.exams && typeof obj.exams === 'object') ? PS.untrustedClone(obj.exams) : null,
      spend: (obj.spend && typeof obj.spend === 'object') ? PS.untrustedClone(obj.spend) : null,
      copilot: (obj.copilot && typeof obj.copilot === 'object') ? PS.untrustedClone(obj.copilot) : null,
      docpacks: (obj.docpacks && typeof obj.docpacks === 'object') ? PS.untrustedClone(obj.docpacks) : null,
      labs: (obj.labs && typeof obj.labs === 'object') ? PS.untrustedClone(obj.labs) : null,
      assessment: (obj.assessment && typeof obj.assessment === 'object') ? PS.untrustedClone(obj.assessment) : null,
      community: Array.isArray(obj.community) ? PS.untrustedClone(obj.community) : null,
      workbench: (obj.workbench && typeof obj.workbench === 'object') ? PS.untrustedClone(obj.workbench) : null,
      audit: Array.isArray(obj.audit) ? obj.audit.slice(0, PS.AUDIT_MAX).map(function (x) { return PS.untrustedClone(x); }) : []
    }
  };
};
PS.readJsonFile = function (cb) {
  var inp = document.createElement('input');
  inp.type = 'file';
  inp.accept = '.json,application/json,text/plain';
  inp.style.position = 'fixed'; inp.style.left = '-9999px';
  document.body.appendChild(inp);
  inp.addEventListener('change', function () {
    var f = inp.files && inp.files[0];
    if (!f) { inp.remove(); return; }
    if (f.size > 8 * 1024 * 1024) { PS.toast('That file is too large to import safely.', 'danger'); inp.remove(); return; }
    var fr = new FileReader();
    fr.onload = function () {
      var res = PS.safeJSON(String(fr.result || ''), 8 * 1024 * 1024);
      if (!res.ok) { PS.toast(res.error, 'danger'); inp.remove(); return; }
      cb(res.value, f.name);
      inp.remove();
    };
    fr.onerror = function () { PS.toast('The file could not be read.', 'danger'); inp.remove(); };
    fr.readAsText(f);
  }, { once: true });
  inp.click();
};