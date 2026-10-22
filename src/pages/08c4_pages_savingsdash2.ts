PS.savingsDashBody = function (ini) {
  var savings = ini.filter(function (x) { return !x.avoidance; });
  var avoid = ini.filter(function (x) { return x.avoidance > 0; });
  var sumS = savings.reduce(function (a, b) { return a + b.savings; }, 0);
  var sumA = avoid.reduce(function (a, b) { return a + b.avoidance; }, 0);
  var base = ini.reduce(function (a, b) { return a + b.baseline; }, 0);
  var byCat = {}, bySup = {};
  ini.forEach(function (x) {
    byCat[x.category] = byCat[x.category] || { s: 0, a: 0, n: 0 };
    byCat[x.category].s += x.savings; byCat[x.category].a += x.avoidance; byCat[x.category].n++;
    bySup[x.supplier] = bySup[x.supplier] || { s: 0, a: 0, n: 0 };
    bySup[x.supplier].s += x.savings; bySup[x.supplier].a += x.avoidance; bySup[x.supplier].n++;
  });
  var html = '<div class="card"><h1>Savings dashboard</h1>' +
    '<p class="lead">Aggregated from the savings and cost-avoidance analyses you saved in this browser. Savings and cost avoidance are reported separately because they are different things: savings reduce a cost that was already committed or budgeted, while cost avoidance prevents a cost that was never incurred.</p>' +
    '<div class="grid grid-4">' +
    '<div class="stat"><div class="s-lab">Initiatives</div><div class="s-val">' + ini.length + '</div></div>' +
    '<div class="stat is-ok"><div class="s-lab">Savings</div><div class="s-val">' + PS.moneyR(sumS) + '</div></div>' +
    '<div class="stat is-warn"><div class="s-lab">Cost avoidance</div><div class="s-val">' + PS.moneyR(sumA) + '</div></div>' +
    '<div class="stat"><div class="s-lab">Savings as % of baseline</div><div class="s-val">' + (base ? PS.pct(sumS / base * 100) : '\u2014') + '</div></div>' +
    '</div>' +
    '<p class="note">These figures come only from work you saved here. They are not enterprise KPIs, they are not audited and they exclude anything you have not analysed in Procure Sherpa.</p></div>';
  if (!ini.length) {
    return html + PS.empty('No savings analyses found yet. Run the Savings Analysis calculator (or Negotiation Savings), then save the result to your workspace.',
      '<a class="btn btn-sm" href="#/calc/calc-savings-analysis">Open Savings Analysis</a>');
  }
  html += '<div class="card"><h2>Initiatives</h2><div class="table-wrap"><table>' +
    '<thead><tr><th>Initiative</th><th>Category</th><th>Supplier</th><th>Type</th><th class="num">Baseline</th><th class="num">New cost</th><th class="num">Savings</th><th class="num">Avoidance</th><th class="num">Savings %</th><th>Source</th></tr></thead><tbody>' +
    ini.map(function (x) {
      return '<tr><td>' + PS.esc(x.name) + '</td><td>' + PS.esc(x.category) + '</td><td>' + PS.esc(x.supplier) + '</td>' +
        '<td>' + PS.esc(x.kind) + '</td>' +
        '<td class="num">' + PS.moneyR(x.baseline) + '</td><td class="num">' + PS.moneyR(x.newCost) + '</td>' +
        '<td class="num">' + PS.moneyR(x.savings) + '</td><td class="num">' + PS.moneyR(x.avoidance) + '</td>' +
        '<td class="num">' + (x.baseline ? PS.pct(x.savings / x.baseline * 100) : '\u2014') + '</td>' +
        '<td><a href="#/saved?q=' + encodeURIComponent(x.savedTitle) + '">' + PS.esc(x.source) + '</a></td></tr>';
    }).join('') + '</tbody><tfoot><tr><td colspan="6">Total</td><td class="num">' + PS.moneyR(sumS) + '</td>' +
    '<td class="num">' + PS.moneyR(sumA) + '</td><td class="num">' + (base ? PS.pct(sumS / base * 100) : '\u2014') + '</td><td></td></tr></tfoot></table></div></div>' +
    '<div class="grid grid-2">' + PS.aggCard('Savings by category', byCat) + PS.aggCard('Savings by supplier', bySup) + '</div>' +
    '<div class="card"><h2>How to report this honestly</h2>' + PS.ul([
      'State the baseline definition and the period it covers - a baseline without a period is not verifiable.',
      'Keep cost avoidance separate and label it as avoidance, never as savings.',
      'Distinguish negotiated price reduction from volume or specification change, payment-term effect and total-cost effect.',
      'Record the assumptions and data sources behind each baseline.',
      'Do not claim savings you cannot evidence. Validation is what makes a savings figure survive review.'
    ]) + '<div class="btn-row no-print"><a class="btn" href="#/sop/sop-savings-validation">Savings validation SOP</a>' +
    '<a class="btn" href="#/cl/cl-savings-validation">Savings validation checklist</a>' +
    '<a class="btn" href="#/tpl/tpl-savings-validation">Savings validation template</a>' +
    '<button type="button" class="btn btn-ghost" data-act="print">Print dashboard</button></div></div>';
  return html;
};
PS.aggCard = function (title, map) {
  var keys = Object.keys(map).sort(function (a, b) { return (map[b].s + map[b].a) - (map[a].s + map[a].a); });
  if (!keys.length) return '';
  var colLabel = title.indexOf(' by ') >= 0 ? title.split(' by ')[1] : 'Group';
  return '<div class="card"><h2>' + PS.esc(title) + '</h2><div class="table-wrap"><table>' +
    '<thead><tr><th>' + PS.esc(colLabel) + '</th><th class="num">Initiatives</th><th class="num">Savings</th><th class="num">Avoidance</th><th class="num">Total value</th></tr></thead><tbody>' +
    keys.map(function (k) {
      return '<tr><td>' + PS.esc(k) + '</td><td class="num">' + map[k].n + '</td><td class="num">' + PS.moneyR(map[k].s) + '</td>' +
        '<td class="num">' + PS.moneyR(map[k].a) + '</td><td class="num">' + PS.moneyR(map[k].s + map[k].a) + '</td></tr>';
    }).join('') + '</tbody></table></div></div>';
};