/* ---------- decision guide actions (Section 21, 39) ---------- */
PS.evalDecision = function (dec, answers) {
  var scores = {};
  (dec.options || []).forEach(function (o) { scores[o.k] = 0; });
  (dec.factors || []).forEach(function (f, i) {
    var a = answers['f' + i] || 'unsure';
    if (a === 'yes') { Object.keys(f.w || {}).forEach(function (k) { if (scores[k] !== undefined) scores[k] += f.w[k]; }); }
    else if (a === 'no') { Object.keys(f.w || {}).forEach(function (k) { if (scores[k] !== undefined) scores[k] -= f.w[k]; }); }
  });
  var ranked = (dec.options || []).map(function (o) {
    return { k: o.k, label: o.label, desc: o.desc, score: scores[o.k] || 0 };
  }).sort(function (a, b) { return b.score - a.score; });
  return { ranked: ranked, top: ranked[0], second: ranked[1] };
};
PS.acts['dec-run'] = function () {
  var c = PS.currentItem;
  if (!c || c.type !== 'dec') return;
  var answers = {};
  (c.item.factors || []).forEach(function (f, i) {
    var sel = PS.$('input[name="f' + i + '"]:checked');
    answers['f' + i] = sel ? sel.value : 'unsure';
  });
  var out = PS.evalDecision(c.item, answers);
  PS.decisionResult = { dec: c.id, answers: answers, out: out };
  var box = PS.$('#decResult');
  if (box) box.innerHTML = PS.renderDecisionResult(c.item, out, answers);
  PS.audit('decision-guide-used', c.item.title);
  try { box.scrollIntoView({ block: 'nearest' }); } catch (e) { }
};
PS.acts['dec-reset'] = function () {
  PS.$$('#decForm input[type=radio]').forEach(function (r) { if (r.value === 'unsure') r.checked = true; });
  PS.decisionResult = null;
  var box = PS.$('#decResult');
  if (box) box.innerHTML = '<div class="results-empty">Answer the questions and choose <strong>Show guidance</strong>.</div>';
};
PS.acts['dec-save'] = function () {
  var c = PS.currentItem;
  if (!c || c.type !== 'dec') return;
  if (!PS.decisionResult) PS.acts['dec-run']();
  if (!PS.decisionResult) return;
  var out = PS.decisionResult.out;
  var rec = PS.saved.add({
    type: 'decision', title: c.item.title + ' - ' + PS.dateStr(),
    data: { decision: c.id, answers: PS.decisionResult.answers, ranking: out.ranked }
  });
  if (rec) PS.toast('Decision assessment saved to your workspace.', 'ok');
};
/* ---------- procurement maturity assessment (Section 63) ---------- */
PS.acts['maturity-run'] = function () {
  var rows = [], total = 0;
  (PS.MATURITY || []).forEach(function (a, i) {
    var sel = PS.$('#mat_' + i);
    var v = sel ? PS.num(sel.value) : 1;
    var lvl = Math.max(1, Math.min(5, Math.round(v)));
    rows.push({ area: a.area, score: lvl, note: a.levels[lvl - 1], focus: a.focus });
    total += lvl;
  });
  var avg = rows.length ? total / rows.length : 0;
  PS.maturityResult = { rows: rows, avg: avg };
  var box = PS.$('#matResult');
  if (box) box.innerHTML = PS.renderMaturityResult(rows, avg);
  PS.audit('maturity-assessment-run', 'Average level ' + PS.round(avg, 2) + ' of 5');
  try { box.scrollIntoView({ block: 'nearest' }); } catch (e) { }
};
PS.acts['maturity-save'] = function () {
  if (!PS.maturityResult) PS.acts['maturity-run']();
  if (!PS.maturityResult) return;
  var rec = PS.saved.add({
    type: 'assessment', title: 'Procurement maturity assessment - ' + PS.dateStr(),
    data: { rows: PS.maturityResult.rows, average: PS.maturityResult.avg }
  });
  if (rec) PS.toast('Maturity assessment saved.', 'ok');
};
/* ---------- what should I do (Section 50) ---------- */
PS.acts['what-run'] = function () {
  var q = PS.$('#whatQ') ? PS.$('#whatQ').value : '';
  if (!PS.clean(q)) { PS.toast('Describe what you need to do first.'); return; }
  var box = PS.$('#whatResult');
  if (box) box.innerHTML = PS.renderWhatResult(q);
  PS.audit('what-should-i-do', PS.clean(q, 120));
  try { box.scrollIntoView({ block: 'nearest' }); } catch (e) { }
};
PS.acts['scenario-jump'] = function (el) {
  var q = el.dataset.q || '';
  PS.go('what', { q: q });
};