/* ---------- decision guide pages (Section 21, 39) ---------- */
PS.route('dec', function (id) {
  var it = PS.byId('dec', id);
  if (!it) return PS.notFound('decision guide', id);
  PS.currentItem = { type: 'dec', id: id, item: it };
  PS.pageTitle = it.title;
  PS.recent.add('dec', id, it.title);
  PS.decisionResult = null;
  var html = PS.reportHead(it.title, 'Decision guide \u00B7 ' + (it.cat || '')) +
    '<div class="card">' +
    '<div class="card-head"><h1>' + PS.esc(it.title) + '</h1><div class="spacer"></div>' +
    PS.badge('dec') + '<span class="badge">' + PS.esc(it.cat || 'General') + '</span></div>' +
    (it.intro ? '<p class="lead">' + PS.esc(it.intro) + '</p>' : '') +
    '<p class="card-sub">' + PS.esc(it.question) + '</p>' +
    PS.actionsBar([
      '<button type="button" class="btn btn-primary" data-act="dec-run">Show guidance</button>',
      '<button type="button" class="btn" data-act="dec-reset">Reset answers</button>',
      '<button type="button" class="btn btn-ghost" data-act="dec-save">Save assessment</button>'
    ]) +
    (it.tags ? PS.tagsRow(it) : '') +
    '</div>' +
    '<div class="grid grid-2">' +
    '<div class="card"><h2>Questions to answer</h2><form id="decForm">' +
    (it.factors || []).map(function (f, i) {
      return '<div class="field"><label>' + PS.esc(f.q) + '</label>' +
        (f.hint ? '<span class="hint">' + PS.esc(f.hint) + '</span>' : '') +
        '<div class="chips">' + ['yes', 'no', 'unsure'].map(function (v, vi) {
          return '<label class="chip"><input type="radio" name="f' + i + '" value="' + v + '"' + (vi === 2 ? ' checked' : '') +
            '> ' + PS.esc(v === 'yes' ? 'Yes' : (v === 'no' ? 'No' : 'Not sure')) + '</label>';
        }).join('') + '</div></div>';
    }).join('') + '</form></div>' +
    '<div><div id="decResult" class="results" aria-live="polite" aria-atomic="true"><div class="results-empty">Answer the questions, then choose <strong>Show guidance</strong>.</div></div>' +
    '<div class="card"><h2>Reasoning</h2><p>' + PS.esc(it.explain) + '</p>' +
    (it.consider ? PS.ul(it.consider) : '') +
    '<div class="alert alert-warn"><strong>Not a policy decision</strong>This guidance reflects general procurement practice and the factors you entered. It does not know your organization&rsquo;s rules, thresholds, contracts or risk appetite. Confirm against your own policy before acting.</div>' +
    '</div></div></div>' +
    PS.relatedCard('dec', it) +
    PS.disclaimer(it.disclaimerKind || 'policy');
  /* Restore a saved assessment. The saved answers were written but never
     re-applied, so reopening a decision guide reset every question to
     "Not sure" and produced a different (and wrong) recommendation. */
  PS.pageInit = function () {
    var rec = PS.pendingSaved;
    if (!rec || rec.type !== 'decision') return;
    var d = rec.data || {};
    if (d.decision !== id || !d.answers) return;
    PS.pendingSaved = null;
    var answers = d.answers;
    PS.$$('#decForm input[type=radio]').forEach(function (r) {
      if (answers[r.name] !== undefined) r.checked = (r.value === answers[r.name]);
    });
    PS.acts['dec-run']();
    var box = PS.$('#decResult');
    if (box) {
      var note = document.createElement('div');
      note.className = 'alert alert-info no-print';
      note.innerHTML = '<strong>Reopened from your saved work: ' + PS.esc(rec.title) + '</strong>' +
        'Your saved answers have been restored and the guidance recalculated.';
      box.parentNode.insertBefore(note, box);
    }
    PS.toast('Saved assessment reopened.', 'ok');
  };
  return html;
});
PS.renderDecisionResult = function (dec, out, answers) {
  var top = out.top || {}, second = out.second || {};
  var html = '<div class="card"><div class="card-head"><h2>Likely approach</h2><div class="spacer"></div>' +
    '<span class="badge badge-type">Guidance</span></div>' +
    '<div class="res-grid"><div class="res-item pp"><div class="r-lab">Recommended</div><div class="r-val" style="font-size:1.25rem">' + PS.esc(top.label || '-') + '</div>' +
    '<div class="r-note">score ' + PS.esc(String(top.score || 0)) + '</div></div>' +
    (second ? '<div class="res-item"><div class="r-lab">Alternative</div><div class="r-val" style="font-size:1.05rem">' + PS.esc(second.label) + '</div>' +
      '<div class="r-note">score ' + PS.esc(String(second.score || 0)) + '</div></div>' : '') + '</div>' +
    (top.desc ? '<p>' + PS.esc(top.desc) + '</p>' : '') +
    '<h3>Why this came out on top</h3>' +
    '<div class="table-wrap"><table><thead><tr><th>Option</th><th class="num">Weighted score</th><th>What it means</th></tr></thead><tbody>' +
    out.ranked.map(function (o) {
      return '<tr' + (o.k === top.k ? ' class="is-best"' : '') + '><td>' + PS.esc(o.label) + '</td><td class="num">' + o.score + '</td>' +
        '<td>' + PS.esc(o.desc || '') + '</td></tr>';
    }).join('') + '</tbody></table></div>' +
    '<p class="note">Scores are the sum of the weights attached to your yes/no answers. They express the strength of the pattern, not a threshold from any particular organization.</p>' +
    '<h3>Your answers</h3>' + '<ul>' + (dec.factors || []).map(function (f, i) {
      var a = answers['f' + i] || 'unsure';
      return '<li>' + PS.esc(f.q) + ' :  <strong>' + PS.esc(a === 'yes' ? 'yes' : (a === 'no' ? 'no' : 'not sure')) + '</strong>' +
        (a === 'unsure' ? ' <span class="muted">(answers left as not sure carry no weight - revisit them)</span>' : '') + '</li>';
    }).join('') + '</ul>';
  if (dec.followThrough) html += '<h3>Next steps to document</h3>' + PS.ul(dec.followThrough);
  html += '</div>';
  return html;
};