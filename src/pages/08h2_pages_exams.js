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
    return '<div class="card exam-bank-card">' +
      '<div class="card-head"><div><h2>' + PS.esc(b.title) + '</h2>' +
      '<p class="card-sub">' + b.pool.length + ' questions in pool \u00B7 pass mark ' + PS.exams.PASS_PCT + '% \u00B7 ' + PS.exams.SECONDS_PER_QUESTION + 's per question</p></div>' +
      '<div class="spacer"></div>' +
      '<a class="btn btn-primary exam-start-link" data-bank="' + PS.escAttr(b.id) + '" id="examStart_' + PS.escAttr(b.id) + '"' +
      ' href="#/exam?bank=' + encodeURIComponent(b.id) + '&n=' + PS.exams.DEFAULT_COUNT + '">Start exam</a></div>' +
      (best ? '<p class="note">Best attempt: <strong>' + best.pct + '%</strong> (' + best.score + '/' + best.total + ') on ' + PS.esc(PS.dateStr(best.date)) + '</p>' : '<p class="note">No attempts yet.</p>') +
      '</div>';
  }).join('');
  var page = PS.reportHead('Practice exams', 'Academy question bank') +
    '<div class="card"><div class="card-head"><div><h1>Practice exams</h1>' +
    '<p class="card-sub">Timed, randomised practice exams built from the Academy knowledge checks. Questions are sampled at random on every attempt; answers are graded locally and history is kept in this browser.</p></div>' +
    '<div class="spacer"></div>' +
    '<button type="button" class="btn btn-sm btn-ghost" data-act="exam-history">Attempt history</button></div>' +
    '<div class="field"><label for="examCount">Questions per exam</label>' +
    '<select id="examCount"><option value="3">3</option><option value="5" selected>5</option><option value="8">8</option><option value="12">12</option></select></div>' +
    '</div>' +
    bankCards +
    '<div id="examRunner"></div>' +
    '<div class="card"><div class="card-head"><h2>Attempt history</h2></div>' + PS.exams.historyHtml() + '</div>' +
    PS.disclaimer('data') +
    PS.disclaimer('credential');
  /* The links are the honest entry point into a session - a button that only
     fires a script leaves the route unreachable by keyboard, by search and by
     the gate that counts inbound links. So they carry a real href, and the
     count selector rewrites them rather than being read at click time.
     pageInit runs after the page is in the DOM, so it is set before the
     return - the router reads it from there, not from after the HTML. */
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
        '<div class="card"><h2>There is no exam to show here</h2>' +
        '<p class="card-sub">This link did not name a bank with questions in it. Pick an exam from the practice exams page.</p>' +
        '<p><a class="btn btn-primary" href="#/exams">Open practice exams</a></p></div>';
    }
  }
  PS.exams.stopTimer();
  /* The runner paints itself, so the route has to ask for it once the page is
     in the DOM - the same hook the calculators use. */
  PS.pageInit = function () { PS.exams.renderExamRunner(); };
  return PS.reportHead('Practice exam', PS.exams.session.bank.title) + '<div id="examRunner"></div>' +
    '<p class="note">Answers and the timer are held in this window only. Submitting records the attempt in this browser; ' +
    'nothing is sent anywhere, and a practice result is not a credential.</p>' +
    PS.disclaimer('credential');
});
