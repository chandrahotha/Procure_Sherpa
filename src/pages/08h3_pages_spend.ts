/* ==========================================================
   Spend Data Model page (roadmap 11.5)
   ========================================================== */
PS.route('spend-model', function () {
  PS.pageTitle = 'Spend Data Model';
  var m = PS.spendModel.load();
  var total = PS.spendModel.total(m);
  var catHtml = (m.categories || []).map(function (c) {
    var catSpend = (c.suppliers || []).reduce(function (a, s) { return a + (PS.num(s.spend) || 0); }, 0);
    var supHtml = (c.suppliers || []).map(function (s) {
      return '<div class="sup-row" draggable="true" data-sup-row data-sup="' + PS.escAttr(s.id) + '" data-cat="' + PS.escAttr(c.id) + '">' +
        '<span class="drag-handle" title="Drag to reorder">&#8942;</span>' +
        '<input type="text" id="supName_' + PS.escAttr(s.id) + '" value="' + PS.esc(s.name) + '" maxlength="80" aria-label="Supplier name">' +
        '<input type="number" id="supSpend_' + PS.escAttr(s.id) + '" class="sup-spend" value="' + PS.esc(s.spend) + '" step="100" min="0" aria-label="Spend amount">' +
        '<span class="badge">' + PS.esc(PS.curSymbol(PS.prefs().currency)) + '</span>' +
        '<button type="button" class="btn btn-sm btn-ghost" data-act="spend-del-sup" data-id="' + PS.escAttr(s.id) + '" title="Remove supplier">&times;</button>' +
        '</div>';
    }).join('');
    return '<div class="cat-row">' +
      '<div class="cat-head">' +
      '<input type="text" id="catName_' + PS.escAttr(c.id) + '" value="' + PS.esc(c.name) + '" maxlength="80" aria-label="Category name">' +
      '<div class="range-mini"><label for="catImpact_' + PS.escAttr(c.id) + '">Impact</label><input type="range" id="catImpact_' + PS.escAttr(c.id) + '" min="0" max="100" value="' + PS.esc(c.impact || 50) + '"></div>' +
      '<div class="range-mini"><label for="catRisk_' + PS.escAttr(c.id) + '">Risk</label><input type="range" id="catRisk_' + PS.escAttr(c.id) + '" min="0" max="100" value="' + PS.esc(c.risk || 50) + '"></div>' +
      '<span class="badge">' + PS.moneyR(catSpend) + '</span>' +
      '<div class="spacer"></div>' +
      '<button type="button" class="btn btn-sm" data-act="spend-add-sup" data-cat="' + PS.escAttr(c.id) + '">+ Supplier</button>' +
      '<button type="button" class="btn btn-sm btn-danger" data-act="spend-del-cat" data-id="' + PS.escAttr(c.id) + '">Remove</button>' +
      '</div>' + supHtml + '</div>';
  }).join('');
  return PS.reportHead('Spend data model', 'Single source for Pareto & Kraljic') +
    '<div class="card"><div class="card-head"><div><h1>Spend data model</h1>' +
    '<p class="card-sub">Maintain a category &gt; supplier hierarchy here. The Pareto and Kraljic charts below derive directly from this model, so updating spend once keeps every view consistent. Drag supplier rows to reorder.</p></div>' +
    '<div class="spacer"></div>' +
    '<span class="badge">Total ' + PS.moneyR(total) + '</span></div>' +
    '<div class="btn-row no-print">' +
    '<button type="button" class="btn btn-primary" data-act="spend-save">Save model</button>' +
    '<button type="button" class="btn" data-act="spend-add-cat">+ Category</button>' +
    '<button type="button" class="btn btn-ghost" data-act="spend-load-example">Load example</button>' +
    '</div>' +
    '<div class="spend-editor" id="spendEditor">' + catHtml + '</div>' +
    '<p class="note">Changes are saved when you press <strong>Save model</strong>. Sliders set the Kraljic impact and risk for each category.</p>' +
    '</div>' +
    PS.spendModel.chartsHtml(m) +
    PS.disclaimer('data');
  PS.pageInit = function () {
    PS.spendModel.wireDnD(PS.$('#spendEditor'));
  };
  return html;
});