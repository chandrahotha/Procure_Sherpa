/* ==========================================================
   Certification Exams page (roadmap 11.4)
   ========================================================== */
PS.route('exams', function () {
  PS.pageTitle = 'Certification Exams';
  PS.exams.stopTimer();
  var banks = PS.exams.banks();
  var bankCards = banks.map(function (b) {
    var h = PS.exams.history().filter(function (a) { return a.bank === b.id; });
    var best = h.length ? h.reduce(function (a, x) { return x.pct > a.pct ? x : a; }) : null;
    return '<div class="card exam-bank-card">' +
      '<div class="card-head"><div><h2>' + PS.esc(b.title) + '</h2>' +
      '<p class="card-sub">' + b.pool.length + ' questions in pool \u00B7 pass mark ' + PS.exams.PASS_PCT + '% \u00B7 ' + PS.exams.SECONDS_PER_QUESTION + 's per question</p></div>' +
      '<div class="spacer"></div>' +
      '<button type="button" class="btn btn-primary" data-act="exam-start" data-bank="' + PS.escAttr(b.id) + '" id="examStart_' + PS.escAttr(b.id) + '">Start exam</button></div>' +
      (best ? '<p class="note">Best attempt: <strong>' + best.pct + '%</strong> (' + best.score + '/' + best.total + ') on ' + PS.esc(PS.dateStr(best.date)) + '</p>' : '<p class="note">No attempts yet.</p>') +
      '</div>';
  }).join('');
  return PS.reportHead('Certification exams', 'Academy question bank') +
    '<div class="card"><div class="card-head"><div><h1>Certification exams</h1>' +
    '<p class="card-sub">Timed, randomised exams built from the Academy knowledge checks. Questions are sampled at random on every attempt; answers are graded locally and history is kept in this browser.</p></div>' +
    '<div class="spacer"></div>' +
    '<button type="button" class="btn btn-sm btn-ghost" data-act="exam-history">Attempt history</button></div>' +
    '<div class="field"><label for="examCount">Questions per exam</label>' +
    '<select id="examCount"><option value="3">3</option><option value="5" selected>5</option><option value="8">8</option><option value="12">12</option></select></div>' +
    '</div>' +
    bankCards +
    '<div id="examRunner"></div>' +
    '<div class="card"><div class="card-head"><h2>Attempt history</h2></div>' + PS.exams.historyHtml() + '</div>' +
    PS.disclaimer('data');
});
PS.acts['exam-history'] = function () {
  PS.modal({
    title: 'Exam attempt history',
    wide: true,
    body: PS.exams.historyHtml() +
      '<div class="btn-row" style="margin-top:12px"><button type="button" class="btn btn-sm btn-danger" data-act="exam-history-clear">Clear all history</button></div>',
    okLabel: 'Close', cancelLabel: null
  });
};
PS.acts['exam-history-clear'] = function () {
  PS.confirm({
    title: 'Clear exam history?',
    body: '<p>All recorded exam attempts will be removed from this browser.</p>',
    okLabel: 'Clear history', danger: true,
    onOk: function () { PS.exams.clearHistory(); PS.closeModal(); PS.renderRoute(); PS.toast('Exam history cleared.', 'ok'); }
  });
};