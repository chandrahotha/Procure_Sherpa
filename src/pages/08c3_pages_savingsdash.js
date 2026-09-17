/* ---------- savings dashboard (Section 65) ---------- */
PS.savingsInitiatives = function () {
  var out = [];
  PS.saved.list().forEach(function (rec) {
    var p = rec.data && rec.data.payload;
    if (p && Array.isArray(p.initiatives)) {
      p.initiatives.forEach(function (x) {
        out.push({
          source: rec.data.calcTitle || rec.title, savedId: rec.id, savedTitle: rec.title, modified: rec.modified,
          name: x.name || 'Initiative', baseline: PS.num(x.baseline) || 0, newCost: PS.num(x.newCost) || 0,
          savings: PS.num(x.savings) || 0, avoidance: PS.num(x.avoidance) || 0,
          category: x.category || 'Uncategorised', supplier: x.supplier || 'Unspecified',
          kind: x.avoidance ? 'Cost avoidance' : 'Savings'
        });
      });
    }
  });
  return out;
};
PS.route('dash-savings', function () {
  PS.pageTitle = 'Savings Dashboard';
  var ini = PS.savingsInitiatives();
  return PS.reportHead('Savings dashboard', 'Built from your saved analyses') + PS.savingsDashBody(ini) + PS.disclaimer('finance');
});