PS.renderCalcResult = function (calc, values, out) {
  var res = out.results || [];
  var primary = res.filter(function (r) { return r.primary; });
  var rest = res.filter(function (r) { return !r.primary; });
  var html = '<div class="card"><div class="card-head"><h2>Result</h2><div class="spacer"></div>' +
    '<span class="badge badge-type">' + PS.esc(calc.title) + '</span></div>';
  html += '<div class="res-grid">' + (primary.length ? primary : res).map(function (r) {
    var cls = 'res-item' + (r.primary ? ' pp' : '') + (r.status ? ' is-' + r.status : '');
    return '<div class="' + cls + '"><div class="r-lab">' + PS.esc(r.label) + '</div>' +
      '<div class="r-val">' + PS.esc(r.value) + '</div>' +
      (r.note ? '<div class="r-note">' + PS.esc(r.note) + '</div>' : '') + '</div>';
  }).join('') + '</div>';
  if (primary.length && rest.length) {
    html += '<div class="res-grid">' + rest.map(function (r) {
      var cls = 'res-item' + (r.status ? ' is-' + r.status : '');
      return '<div class="' + cls + '"><div class="r-lab">' + PS.esc(r.label) + '</div>' +
        '<div class="r-val" style="font-size:1.02rem">' + PS.esc(r.value) + '</div>' +
        (r.note ? '<div class="r-note">' + PS.esc(r.note) + '</div>' : '') + '</div>';
    }).join('') + '</div>';
  }
  (out.warnings || []).forEach(function (w) {
    html += '<div class="alert alert-warn"><strong>Check this</strong>' + PS.esc(w) + '</div>';
  });
  if (out.analysis) html += '<div class="res-sub"><h3>Interpretation</h3>' + out.analysis + '</div>';
  if (out.table) html += PS.renderTable(out.table);
  if (out.formula) {
    html += '<details class="acc" open><summary>Formula and method</summary><div class="acc-body">' +
      (Array.isArray(out.formula) ? out.formula.map(function (x) { return '<p><code>' + PS.esc(x) + '</code></p>'; }).join('') : '<p><code>' + PS.esc(out.formula) + '</code></p>') +
      (calc.formulaNote ? '<p class="note">' + PS.esc(calc.formulaNote) + '</p>' : '') + '</div></details>';
  }
  var assumptions = (out.assumptions || []).concat(calc.assumptions || []);
  if (assumptions.length) {
    html += '<details class="acc"><summary>Assumptions used</summary><div class="acc-body">' + PS.ul(assumptions) +
      '<p class="note">All values are your own inputs. Change an assumption and recalculate - nothing is hard-coded from a supplier or market feed.</p></div></details>';
  }
  html += '</div>';
  html += PS.printBlock(calc, values, out);
  return html;
};
PS.renderTable = function (t) {
  var num = t.numCols || 0;
  var priorities = t.priorities || []; // 'high', 'medium', 'low'
  function cell(c, i) { return '<td' + (i >= (t.headers.length - num) ? ' class="num"' : '') + (priorities[i] ? ' data-priority="' + priorities[i] + '"' : '') + '>' + PS.esc(c) + '</td>'; }
  return '<div class="table-wrap"><table>' + (t.caption ? '<caption>' + PS.esc(t.caption) + '</caption>' : '') +
    '<thead><tr>' + t.headers.map(function (h, i) {
      var p = priorities[i] ? ' data-priority="' + priorities[i] + '"' : '';
      return '<th' + p + '>' + PS.esc(h) + '</th>';
    }).join('') + '</tr></thead>' +
    '<tbody>' + t.rows.map(function (r) {
      return '<tr' + (r.cls ? ' class="' + r.cls + '"' : '') + '>' + r.cells.map(cell).join('') + '</tr>';
    }).join('') + '</tbody>' +
    (t.footer ? '<tfoot><tr>' + t.footer.map(cell).join('') + '</tr></tfoot>' : '') + '</table></div>';
};
PS.calcCSV = function (calc, values, out) {
  var headers = [], rows = [];
  if (out.table) {
    headers = out.table.headers.slice();
    rows = out.table.rows.map(function (r) { return r.cells.slice(); });
    if (out.table.footer) rows.push(out.table.footer.slice());
  } else {
    headers = ['Item', 'Value'];
    rows = (out.results || []).map(function (r) { return [r.label, r.value]; });
  }
  headers = ['Procure Sherpa', calc.title, PS.dateStr()].concat(headers);
  rows = rows.map(function (r) { return ['', '', ''].concat(r); });
  var inputRows = (calc.fields || []).map(function (f) {
    return ['Input', f.label, values[f.k] === null || values[f.k] === undefined ? '' : values[f.k]];
  });
  return PS.toCSV(headers, inputRows.concat(rows));
};
PS.printBlock = function (calc, values, out) {
  var inputRows = (calc.fields || []).map(function (f) {
    var v = values[f.k];
    var shown = (v === null || v === undefined || v === '') ? '\u2014'
      : (f.type === 'check' ? (v ? 'Yes' : 'No')
        : (f.type === 'number' && f.unit === 'currency' ? PS.money(v)
          : (f.type === 'number' && f.unit === 'percent' ? PS.pct(v) : String(v))));
    return '<tr><td>' + PS.esc(f.label) + '</td><td class="num">' + PS.esc(shown) + '</td></tr>';
  }).join('');
  var resRows = (out.results || []).map(function (r) {
    return '<tr><td>' + PS.esc(r.label) + '</td><td class="num">' + PS.esc(r.value) + '</td></tr>';
  }).join('');
  var notes = PS.$('#calcNotes') ? PS.$('#calcNotes').value : '';
  return '<div class="print-only">' +
    '<h3>Inputs and analysis basis</h3><div class="table-wrap"><table>' + inputRows + '</table></div>' +
    '<h3>Results</h3><div class="table-wrap"><table>' + resRows + '</table></div>' +
    '<h3>Key findings</h3>' + (out.keyFindings ? PS.ul(out.keyFindings)
      : (out.summaryText ? '<p>' + PS.esc(out.summaryText) + '</p>' : '<p>See results above.</p>')) +
    '<h3>Assumptions</h3>' + PS.ul((out.assumptions || []).concat(calc.assumptions || [])) +
    '<h3>Notes</h3><p>' + PS.esc(notes || 'No notes recorded.') + '</p>' +
    '<h3>Related methodology</h3>' + PS.ul(out.formula || []) +
    PS.reportFooter('Decision-support output. Validate assumptions before committing funds.') + '</div>';
};