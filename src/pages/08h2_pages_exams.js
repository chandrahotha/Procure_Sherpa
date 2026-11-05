/* ==========================================================
   Practice Exams page (roadmap 11.4)
   ========================================================== */
PS.route('exams', function () {
  PS.pageTitle = 'Practice Exams';
  PS.exams.stopTimer();
  PS.exams.session = null;
  var banks = PS.exams.banks();
  var bankCards = banks.map(function (b) {
    var h = PS.exams.history().filter(function (a) { return a.bank === b.id; });
    var best = h.length ? h.reduce(function (a, x) { return x.pct > a.pct ? x : a; }) : null;
    return PS.ui.card(
      '<div class="inst-card-head"><div><h2 class="inst-title">' + PS.esc(b.title) + '</h2>' +
      '<p class="inst-read">' + b.pool.length + ' questions in pool \u00B7 pass mark ' + PS.exams.PASS_PCT + '% \u00B7 ' + PS.exams.SECONDS_PER_QUESTION + 's per question</p></div>' +
      '<div class="spacer"></div>' +
      '<a class="inst-home-btn inst-home-btn--primary exam-start-link" data-bank="' + PS.escAttr(b.id) + '" id="examStart_' + PS.escAttr(b.id) + '"' +
      ' href="#/exam?bank=' + encodeURIComponent(b.id) + '&n=' + PS.exams.DEFAULT_COUNT + '">Start exam</a>' +
      (best ? '<p class="inst-note">Best attempt: <strong>' + best.pct + '%</strong> (' + best.score + '/' + best.total + ') on ' + PS.esc(PS.dateStr(best.date)) + '</p>' : '<p class="inst-note">No attempts yet.</p>'),
      { class: 'inst-card', style: 'max-width: 100%; box-sizing: border-box;' }
    );
  }).join('');
  var page = PS.reportHead('Practice exams', 'Academy question bank') +
    PS.ui.card(
      '<div class="inst-card-head"><div><h1 class="inst-title">Practice exams</h1>' +
      '<p class="inst-read">Timed, randomised practice exams built from the Academy knowledge checks. Questions are sampled at random on every attempt; answers are graded locally and history is kept in this browser.</p></div>' +
      '<div class="spacer"></div>' +
      '<button type="button" class="inst-home-btn inst-home-btn--ghost inst-home-btn--sm" data-act="exam-history">Attempt history</button>',
      { class: 'inst-dash-header', style: 'overflow: visible;' }
    ) +
    PS.ui.card(
      '<div class="inst-field"><label for="examCount">Questions per exam</label>' +
      '<select id="examCount"><option value="3">3</option><option value="5" selected>5</option><option value="8">8</option><option value="12">12</option></select></div>'
    ) +
    '<div class="inst-page" style="padding-right: 32px;">' + bankCards + '</div>' +
    '<div id="examRunner"></div>' +
    PS.ui.card(
      '<h2 class="inst-title">Attempt history</h2>' + PS.exams.historyHtml()
    ) +
    PS.disclaimer('data') +
    PS.disclaimer('credential');
  PS.pageInit = function () {
    var sel = PS.$('#examCount');
    if (!sel) return;
    sel.addEventListener('change', function () {
      var n = PS.num(sel.value) || PS.exams.DEFAULT_COUNT;
      PS.$$('.exam-start-link').forEach(function (a) {
        var bank = a.getAttribute('data-bank');
        a.setAttribute('href', '#/exam?bank=' + encodeURIComponent(bank) + '&n=' + n);
      });
    });
  };
  return page;
});
PS.acts['exam-history'] = function () {
  PS.modal({
    title: 'Exam attempt history',
    wide: true,
    body: PS.exams.historyHtml() +
      '<div class="inst-btn-row" style="margin-top:var(--space-3)"><button type="button" class="inst-home-btn inst-home-btn--ghost inst-home-btn--sm inst-home-btn--danger" data-act="exam-history-clear">Clear all history</button></div>',
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

/* The exam gets its own route, not just a panel on the list page: an attempt
   under a clock should not share a viewport with a menu, a search box and a
   breadcrumb. #/exam?bank=...&n=... is also what the popped-out window loads,
   so the same session can run in a separate window if the reader wants the
   list page kept open beside it. */
PS.route('exam', function (arg, params) {
  PS.pageTitle = 'Practice exam';
  var bankId = (params && params.bank) || arg || 'cert-full';
  var count = (params && params.n) ? PS.num(params.n) : PS.exams.DEFAULT_COUNT;
  if (!PS.exams.session || PS.exams.session.bank.id !== bankId || PS.exams.session.done) {
    if (!PS.exams.start(bankId, count)) {
      return PS.reportHead('Practice exam', 'No exam running') +
        PS.ui.card(
          '<h2 class="inst-title">There is no exam to show here</h2>' +
          '<p class="inst-read">This link did not name a bank with questions in it. Pick an exam from the practice exams page.</p>' +
          '<p><a class="inst-home-btn inst-home-btn--primary" href="#/exams">Open practice exams</a></p>'
        );
    }
  }
  PS.exams.stopTimer();
  PS.pageInit = function () { PS.exams.renderExamRunner(); };
  return PS.reportHead('Practice exam', PS.exams.session.bank.title) + '<div id="examRunner"></div>' +
    '<p class="inst-note">Answers and the timer are held in this window only. Submitting records the attempt in this browser; ' +
    'nothing is sent anywhere, and a practice result is not a credential.</p>' +
    PS.disclaimer('credential');
});