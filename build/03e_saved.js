/* ---------- saved work (Section 27, 56) ---------- */
PS.saved = {
  list: function () {
    var s = PS.store.get(PS.K.saved, []);
    return Array.isArray(s) ? s.filter(function (x) { return x && typeof x === 'object' && x.id; }) : [];
  },
  count: function (type) {
    return PS.saved.list().filter(function (x) { return !type || x.type === type; }).length;
  },
  get: function (id) { return PS.saved.list().filter(function (x) { return x.id === id; })[0] || null; },
  add: function (item) {
    var list = PS.saved.list();
    var type = PS.clean(item.type, 40) || 'note';
    if (list.length >= PS.MAX_SAVED) {
      PS.toast('Saved work limit reached (' + PS.MAX_SAVED + ' items). Delete or export items before saving more.', 'danger');
      return null;
    }
    if (type === 'quote-comparison' && PS.saved.count('quote-comparison') >= PS.MAX_QUOTE_SAVED) {
      PS.toast('The limit of ' + PS.MAX_QUOTE_SAVED + ' saved quote comparisons has been reached.', 'danger');
      return null;
    }
    var now = new Date().toISOString();
    var rec = {
      id: PS.uid('sv'), type: type,
      title: PS.clean(item.title, 140) || 'Untitled ' + type,
      created: now, modified: now,
      tags: (item.tags || []).map(function (t) { return PS.clean(t, 30); }).filter(Boolean).slice(0, 10),
      notes: PS.clean(item.notes, 4000),
      data: item.data && typeof item.data === 'object' ? item.data : {},
      v: 1
    };
    list.unshift(rec);
    if (PS.store.set(PS.K.saved, list)) {
      PS.audit('work-saved', type + ': ' + rec.title);
      return rec;
    }
    return null;
  },
  update: function (id, patch) {
    var list = PS.saved.list();
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        if (patch.title !== undefined) list[i].title = PS.clean(patch.title, 140) || list[i].title;
        if (patch.notes !== undefined) list[i].notes = PS.clean(patch.notes, 4000);
        if (patch.tags !== undefined) list[i].tags = (patch.tags || []).map(function (t) { return PS.clean(t, 30); }).filter(Boolean).slice(0, 10);
        if (patch.data !== undefined) list[i].data = patch.data;
        list[i].modified = new Date().toISOString();
        PS.store.set(PS.K.saved, list);
        PS.audit('work-updated', list[i].type + ': ' + list[i].title);
        return list[i];
      }
    }
    return null;
  },
  remove: function (id) {
    var rec = PS.saved.get(id);
    PS.store.set(PS.K.saved, PS.saved.list().filter(function (x) { return x.id !== id; }));
    if (rec) PS.audit('work-deleted', rec.type + ': ' + rec.title);
  },
  duplicate: function (id) {
    var rec = PS.saved.get(id);
    if (!rec) return null;
    return PS.saved.add({ type: rec.type, title: rec.title + ' (copy)', tags: rec.tags, notes: rec.notes, data: rec.data });
  },
  rename: function (id, title) { return PS.saved.update(id, { title: title }); },
  clearAll: function () { PS.store.set(PS.K.saved, []); PS.audit('data-cleared', 'All saved work deleted'); }
};

/* ---------- checklist + template state (Section 22, 69) ---------- */
PS.clState = {
  all: function () { var c = PS.store.get(PS.K.cl, {}); return (c && typeof c === 'object') ? c : {}; },
  get: function (id) {
    var c = PS.clState.all()[id];
    return (c && typeof c === 'object') ? { checked: c.checked || {}, notes: c.notes || '', modified: c.modified || '' } : { checked: {}, notes: '', modified: '' };
  },
  save: function (id, state) {
    var all = PS.clState.all();
    all[id] = { checked: state.checked || {}, notes: PS.clean(state.notes, 6000), modified: new Date().toISOString() };
    var ok = PS.store.set(PS.K.cl, all);
    if (ok) PS.audit('checklist-saved', id);
    return ok;
  },
  reset: function (id) {
    var all = PS.clState.all();
    delete all[id];
    PS.store.set(PS.K.cl, all);
    PS.audit('checklist-reset', id);
  },
  openCount: function () {
    var all = PS.clState.all(), n = 0;
    Object.keys(all).forEach(function (k) {
      var c = all[k];
      var total = PS.checklistItemCount(k);
      var done = c && c.checked ? Object.keys(c.checked).filter(function (x) { return c.checked[x]; }).length : 0;
      if (done > 0 && (!total || done < total)) n++;
    });
    return n;
  }
};
PS.tplState = {
  all: function () { var t = PS.store.get(PS.K.tpl, {}); return (t && typeof t === 'object') ? t : {}; },
  get: function (id) {
    var t = PS.tplState.all()[id];
    return (t && typeof t === 'object') ? { values: t.values || {}, notes: t.notes || '', modified: t.modified || '' } : { values: {}, notes: '', modified: '' };
  },
  save: function (id, state) {
    var all = PS.tplState.all();
    all[id] = { values: state.values || {}, notes: PS.clean(state.notes, 6000), modified: new Date().toISOString() };
    var ok = PS.store.set(PS.K.tpl, all);
    if (ok) PS.audit('template-saved', id);
    return ok;
  },
  reset: function (id) {
    var all = PS.tplState.all();
    delete all[id];
    PS.store.set(PS.K.tpl, all);
    PS.audit('template-reset', id);
  }
};
PS.fmtDate = PS.dateStr;