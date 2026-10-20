/* ==========================================================
   Phase 11 - Spend Data Model (roadmap 11.5)
   Drag-drop category > supplier hierarchy that feeds the
   Pareto and Kraljic visualisations from a single source.
   ========================================================== */

PS.spendModel = PS.spendModel || {};

PS.spendModel.KEY = PS.K.spend;

PS.spendModel.all = function () {
  var s = PS.store.get(PS.spendModel.KEY, {});
  if ((!s || !Object.keys(s).length) && PS.K.spendLegacy) {
    /* One-time migration: a build that restored a backup wrote the model
       to ps_spend_model, which this code never read. */
    var legacy = PS.store.get(PS.K.spendLegacy, null);
    if (legacy && typeof legacy === 'object' && Object.keys(legacy).length) {
      PS.store.set(PS.spendModel.KEY, legacy);
      PS.store.remove(PS.K.spendLegacy);
      return legacy;
    }
  }
  return (s && typeof s === 'object') ? s : {};
};
PS.spendModel.save = function (s) { PS.store.set(PS.spendModel.KEY, s); };

PS.spendModel.example = function () {
  return {
    categories: [
      { id: 'cat-raw', name: 'Raw Materials', suppliers: [
        { id: 'sup-steel', name: 'Steel Co', spend: 1200000 },
        { id: 'sup-alum', name: 'Aluminium Works', spend: 640000 }
      ], impact: 85, risk: 70 },
      { id: 'cat-pack', name: 'Packaging', suppliers: [
        { id: 'sup-box', name: 'Box Right', spend: 480000 }
      ], impact: 55, risk: 25 },
      { id: 'cat-log', name: 'Logistics', suppliers: [
        { id: 'sup-freight', name: 'Freightline', spend: 320000 }
      ], impact: 40, risk: 55 },
      { id: 'cat-mro', name: 'MRO & Facilities', suppliers: [
        { id: 'sup-maint', name: 'FacilityCare', spend: 150000 },
        { id: 'sup-spares', name: 'SparesCo', spend: 90000 }
      ], impact: 30, risk: 20 }
    ]
  };
};

PS.spendModel.load = function () {
  var m = PS.spendModel.all();
  if (!m.categories || !m.categories.length) return PS.spendModel.example();
  return m;
};

/* ---------- helpers ---------- */
PS.spendModel.suppliers = function (m) {
  var out = [];
  (m.categories || []).forEach(function (c) {
    (c.suppliers || []).forEach(function (s) {
      out.push({ cat: c.name, catId: c.id, name: s.name, spend: PS.num(s.spend) || 0 });
    });
  });
  out.sort(function (a, b) { return b.spend - a.spend; });
  return out;
};
PS.spendModel.total = function (m) {
  return PS.spendModel.suppliers(m).reduce(function (a, b) { return a + b.spend; }, 0);
};

/* ---------- editor page ---------- */
/* Every mutation reads the live form first. These handlers used to load the
   model back out of storage, which silently discarded any edit the user had
   typed but not yet saved: adding a supplier reverted a renamed category and
   a changed spend figure. */
PS.acts['spend-add-cat'] = function () {
  var m = PS.spendModel.collect();
  m.categories.push({ id: PS.uid('cat'), name: 'New category', suppliers: [], impact: 50, risk: 50 });
  PS.spendModel.save(m);
  PS.renderRoute();
};
PS.acts['spend-del-cat'] = function (el) {
  var id = el.dataset.id;
  var m = PS.spendModel.collect();
  m.categories = m.categories.filter(function (c) { return c.id !== id; });
  PS.spendModel.save(m);
  PS.renderRoute();
};
PS.acts['spend-add-sup'] = function (el) {
  var catId = el.dataset.cat;
  var m = PS.spendModel.collect();
  m.categories.forEach(function (c) {
    if (c.id === catId) c.suppliers.push({ id: PS.uid('sup'), name: 'New supplier', spend: 0 });
  });
  PS.spendModel.save(m);
  PS.renderRoute();
};
PS.acts['spend-del-sup'] = function (el) {
  var supId = el.dataset.id;
  var m = PS.spendModel.collect();
  m.categories.forEach(function (c) { c.suppliers = c.suppliers.filter(function (s) { return s.id !== supId; }); });
  PS.spendModel.save(m);
  PS.renderRoute();
};
PS.acts['spend-load-example'] = function () {
  PS.spendModel.save(PS.spendModel.example());
  PS.renderRoute();
  PS.toast('Example spend model loaded.', 'ok');
};

/* Persist edits from the live editor fields back into the store. */
PS.spendModel.collect = function () {
  var m = PS.spendModel.load();
  m.categories.forEach(function (c) {
    var nameEl = PS.$('#catName_' + c.id);
    if (nameEl) c.name = PS.clean(nameEl.value, 80) || c.name;
    var impEl = PS.$('#catImpact_' + c.id);
    if (impEl) c.impact = PS.clamp(PS.num(impEl.value) || 50, 0, 100);
    var riskEl = PS.$('#catRisk_' + c.id);
    if (riskEl) c.risk = PS.clamp(PS.num(riskEl.value) || 50, 0, 100);
    c.suppliers.forEach(function (s) {
      var supName = PS.$('#supName_' + s.id);
      if (supName) s.name = PS.clean(supName.value, 80) || s.name;
      var supSpend = PS.$('#supSpend_' + s.id);
      if (supSpend) s.spend = Math.max(0, PS.num(supSpend.value) || 0);
    });
  });
  return m;
};
PS.acts['spend-save'] = function () {
  var m = PS.spendModel.collect();
  PS.spendModel.save(m);
  PS.toast('Spend model saved locally.', 'ok');
  PS.audit('spend-model-saved', m.categories.length + ' categories');
  PS.renderRoute();
};

/* ---------- drag-drop reorder ---------- */
PS.spendModel._drag = null;
PS.spendModel.wireDnD = function (root) {
  if (!root || root.dataset.wired) return;
  root.dataset.wired = '1';

  function rowOf(el) { return el && el.closest ? el.closest('[data-sup-row]') : null; }
  root.addEventListener('dragstart', function (e) {
    var row = rowOf(e.target);
    if (!row) return;
    PS.spendModel._drag = { supId: row.dataset.sup, catId: row.dataset.cat };
    e.dataTransfer.effectAllowed = 'move';
    try { e.dataTransfer.setData('text/plain', row.dataset.sup); } catch (err) { }
  });
  root.addEventListener('dragover', function (e) {
    if (!PS.spendModel._drag) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    var target = rowOf(e.target);
    if (target && target.dataset.sup !== PS.spendModel._drag.supId) {
      target.classList.add('drag-over');
    }
  });
  root.addEventListener('dragleave', function (e) {
    var target = rowOf(e.target);
    if (target) target.classList.remove('drag-over');
  });
  root.addEventListener('drop', function (e) {
    e.preventDefault();
    PS.$$('.drag-over', root).forEach(function (el) { el.classList.remove('drag-over'); });
    var d = PS.spendModel._drag;
    PS.spendModel._drag = null;
    var target = rowOf(e.target);
    if (!d || !target || target.dataset.sup === d.supId) return;
    var m = PS.spendModel.collect();
    var moved = null;
    m.categories.forEach(function (c) {
      if (c.id === d.catId) {
        c.suppliers.forEach(function (s, i) { if (s.id === d.supId) moved = c.suppliers.splice(i, 1)[0]; });
      }
    });
    if (!moved) return;
    m.categories.forEach(function (c) {
      if (c.id === target.dataset.cat) {
        var idx = -1;
        for (var i = 0; i < c.suppliers.length; i++) {
          if (c.suppliers[i].id === target.dataset.sup) { idx = i; break; }
        }
        c.suppliers.splice(idx >= 0 ? idx : c.suppliers.length, 0, moved);
      }
    });
    PS.spendModel.save(m);
    PS.renderRoute();
  });
};

/* Render a chart row from the current model (Pareto + Kraljic). */
PS.spendModel.chartsHtml = function (m) {
  var suppliers = PS.spendModel.suppliers(m);
  var total = suppliers.reduce(function (a, b) { return a + b.spend; }, 0);
  var html = '<div class="spend-chart-grid">';
  if (suppliers.length) {
    html += '<div class="card"><h3>Pareto spend concentration</h3>' +
      PS.chart.pareto(suppliers.map(function (s) { return { name: s.name, spend: s.spend }; }), { width: 520, height: 260 }) +
      '<p class="note">' + suppliers.length + ' suppliers \u00B7 total ' + PS.moneyR(total) + '</p></div>';
  } else {
    html += '<div class="card"><h3>Pareto spend concentration</h3><p class="note">Add suppliers to see the 80/20 curve.</p></div>';
  }
  var kraljic = (m.categories || []).map(function (c) {
    var catSpend = (c.suppliers || []).reduce(function (a, s) { return a + (PS.num(s.spend) || 0); }, 0);
    return { name: c.name, impact: c.impact || 50, risk: c.risk || 50, spend: '$' + PS.group(catSpend, 0), spendRatio: total ? Math.max(0.4, (catSpend / total) * 3) : 0.6, color: '#6366f1' };
  });
  html += '<div class="card"><h3>Kraljic portfolio</h3>' +
    (kraljic.length ? PS.chart.kraljic(kraljic, { width: 460, height: 400 }) : '<p class="note">Add categories to map the 2x2 matrix.</p>') +
    '</div></div>';
  return html;
};