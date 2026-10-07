/* ---------- procurement maturity assessment (Section 63) ---------- */
PS.route('maturity', function () {
  PS.pageTitle = 'Procurement Maturity Check';
  PS.maturityResult = null;
  var html = PS.reportHead('Procurement maturity assessment', 'Self-assessment') +
    '<div class="card"><h1>Procurement maturity check</h1>' +
    '<p class="lead">Rate nine areas of your procurement function from 1 to 5. The result is a descriptive profile of where the function is strong and where it is exposed - not a benchmark against other companies, because maturity depends on category, scale, regulation and risk appetite.</p>' +
    '<p class="note">Rate honestly. The value of a maturity check comes from naming the weakest area and deciding what to do about it, not from the average score.</p>' +
    '<div class="btn-row no-print">' +
    '<button type="button" class="btn btn-primary btn-lg" data-act="maturity-run">Assess maturity</button>' +
    '<button type="button" class="btn" data-act="maturity-save">Save assessment</button>' +
    '<button type="button" class="btn btn-ghost" data-act="print">Print / PDF</button>' +
    '</div></div>' +
    '<form id="matForm" class="card"><h2>Rating levels</h2>' +
    PS.renderSimpleTable({ headers: ['Level', 'Meaning'], rows: [
      ['1 - Ad hoc', 'Activity depends on individuals. Little documentation, no consistent process, spend visibility limited.'],
      ['2 - Emerging', 'Basic process exists and is sometimes followed. Documentation is inconsistent.'],
      ['3 - Defined', 'Documented process followed for most spend, with defined roles and records.'],
      ['4 - Managed', 'Process measured with KPIs, category strategies in place, supplier performance managed.'],
      ['5 - Optimised', 'Continuous improvement, integrated data, risk-based governance and evidence-based decisions across categories.']
    ] }) +
    '<h2 style="margin-top:16px">Areas</h2>' +
    (PS.MATURITY || []).map(function (a, i) {
      return '<div class="field"><label for="mat_' + i + '">' + PS.esc(a.area) + '</label>' +
        '<span class="hint">' + PS.esc(a.question) + '</span>' +
        '<select id="mat_' + i + '">' + [1, 2, 3, 4, 5].map(function (v) {
          return '<option value="' + v + '"' + (v === 3 ? ' selected' : '') + '>' + v + ' - ' + PS.esc(a.labels[v - 1]) + '</option>';
        }).join('') + '</select></div>';
    }).join('') + '</form>' +
    '<div id="matResult" class="results" aria-live="polite" aria-atomic="true"><div class="results-empty">Set your ratings and choose <strong>Assess maturity</strong> to see the profile, the weakest areas and the corresponding actions.</div></div>' +
    PS.disclaimer('policy');
  PS.pageInit = function () {
    // no live recompute: assessment is deliberate so users read each level definition
  };
  return html;
});
PS.renderMaturityResult = function (rows, avg) {
  var weakest = rows.slice().sort(function (a, b) { return a.score - b.score; }).slice(0, 3);
  var strongest = rows.slice().sort(function (a, b) { return b.score - a.score; }).slice(0, 3);
  var band = avg >= 4.2 ? 'Optimised' : avg >= 3.4 ? 'Managed' : avg >= 2.6 ? 'Defined' : avg >= 1.8 ? 'Emerging' : 'Ad hoc';
  return '<div class="card"><div class="card-head"><h2>Maturity profile</h2><div class="spacer"></div>' +
    '<span class="badge badge-type">' + PS.esc(band) + '</span></div>' +
    '<div class="res-grid"><div class="res-item pp"><div class="r-lab">Average level</div><div class="r-val">' + PS.round(avg, 2) + ' / 5</div>' +
    '<div class="r-note">' + PS.esc(band) + '</div></div>' +
    '<div class="res-item is-warn"><div class="r-lab">Weakest area</div><div class="r-val" style="font-size:1rem">' + PS.esc(weakest[0].area) + '</div>' +
    '<div class="r-note">level ' + weakest[0].score + '</div></div>' +
    '<div class="res-item is-ok"><div class="r-lab">Strongest area</div><div class="r-val" style="font-size:1rem">' + PS.esc(strongest[0].area) + '</div>' +
    '<div class="r-note">level ' + strongest[0].score + '</div></div></div>' +
    PS.renderTable({
      headers: ['Area', 'Level', 'What that level looks like', 'Suggested focus'],
      rows: rows.map(function (r) { return { cells: [r.area, String(r.score), r.note, r.focus] }; })
    }) +
    '<h3>Where to focus first</h3>' + PS.ul(weakest.map(function (w) {
      return w.area + ' (level ' + w.score + '): ' + w.focus;
    })) +
    '<p class="note">A maturity profile is descriptive. A lower score in one area is not automatically a defect: it may reflect deliberate prioritisation, a small team or a low-risk category mix. Decide which gaps actually matter to your organization, then sequence the work.</p>' +
    '<div class="btn-row no-print"><button type="button" class="btn btn-primary" data-act="maturity-save">Save assessment</button>' +
    '<button type="button" class="btn" data-act="print">Print / PDF</button></div></div>';
};