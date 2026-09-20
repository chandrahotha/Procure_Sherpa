/* ==========================================================
   Phase 11 - Certification Exams (roadmap 11.4)
   Timed, randomised exam banks assembled from the Academy
   question pool, with pass/fail thresholds and retake history.
   ========================================================== */

PS.exams = PS.exams || {};

PS.exams.KEY = 'ps_exams';
PS.exams.PASS_PCT = 70;
PS.exams.DEFAULT_COUNT = 5;
PS.exams.SECONDS_PER_QUESTION = 60;

PS.exams.all = function () {
  var e = PS.store.get(PS.exams.KEY, {});
  return (e && typeof e === 'object') ? e : {};
};
PS.exams.save = function (e) { PS.store.set(PS.exams.KEY, e); };
PS.exams.history = function () { return PS.exams.all().attempts || []; };
PS.exams.recordAttempt = function (rec) {
  var e = PS.exams.all();
  e.attempts = e.attempts || [];
  e.attempts.unshift(rec);
  e.attempts = e.attempts.slice(0, 30);
  PS.exams.save(e);
};
PS.exams.clearHistory = function () {
  var e = PS.exams.all();
  e.attempts = [];
  PS.exams.save(e);
};

/* Question pool derived from the Academy curriculum quiz banks. */
PS.exams.pool = function () {
  var pool = [];
  (PS.ACADEMY_FUNCTIONS || []).forEach(function (f) {
    (f.quizzes || []).forEach(function (q, idx) {
      if (!q.options || !q.options.length) return;
      pool.push({ func: f.id, funcTitle: f.title, module: f.module || 'Curriculum', q: q.q, options: q.options, diff: PS.academyQuiz.getDifficulty(f, q, idx) });
    });
  });
  return pool;
};

/* Exam banks: full certification + one per academy module. */
PS.exams.banks = function () {
  var pool = PS.exams.pool();
  var banks = [{ id: 'cert-full', title: 'Full Certification Exam', desc: 'All academy knowledge checks, sampled at random.', pool: pool }];
  var byMod = {};
  pool.forEach(function (p) { if (!byMod[p.module]) byMod[p.module] = []; byMod[p.module].push(p); });
  Object.keys(byMod).forEach(function (m) {
    var safe = 'mod-' + m.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48);
    banks.push({ id: safe, title: 'Module Exam: ' + m, desc: m, pool: byMod[m] });
  });
  return banks;
};

/* Sample a random, non-repeating subset from a pool. */
PS.exams.sample = function (pool, n) {
  var copy = pool.slice();
  var out = [];
  n = Math.min(n || PS.exams.DEFAULT_COUNT, copy.length);
  while (out.length < n) {
    var i = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(i, 1)[0]);
  }
  return out;
};

/* ---------- running session state (kept on the page) ---------- */
PS.exams.session = null;

PS.acts['exam-start'] = function (el) {
  var bankId = el.dataset.bank;
  var bank = PS.exams.banks().filter(function (b) { return b.id === bankId; })[0];
  if (!bank || !bank.pool.length) { PS.toast('This exam has no questions yet.', 'warn'); return; }
  var count = PS.num(PS.$('#examCount') ? PS.$('#examCount').value : '') || PS.exams.DEFAULT_COUNT;
  var questions = PS.exams.sample(bank.pool, count);
  PS.exams.session = {
    bank: bank, questions: questions,
    answers: {}, current: 0,
    start: Date.now(),
    timeLimit: questions.length * PS.exams.SECONDS_PER_QUESTION,
    done: false
  };
  PS.exams.renderExamRunner();
};

PS.exams.renderExamRunner = function () {
  var box = PS.$('#examRunner');
  if (!box || !PS.exams.session) return;
  var s = PS.exams.session;
  var q = s.questions[s.current];
  var answeredCount = Object.keys(s.answers).length;
  var html = '<div class="exam-runner">' +
    '<div class="card"><div class="card-head"><div><h2>' + PS.esc(s.bank.title) + '</h2>' +
    '<p class="card-sub">Question ' + (s.current + 1) + ' of ' + s.questions.length + ' \u00B7 ' + answeredCount + ' answered \u00B7 <strong>Pass mark ' + PS.exams.PASS_PCT + '%</strong></p></div>' +
    '<div class="spacer"></div><span class="badge exam-timer" id="examTimer">' + PS.exams.fmtTime(s.timeLimit) + '</span></div>' +
    '<div class="exam-progress-track"><div class="exam-progress-fill" style="width:' + Math.round(((s.current + 1) / s.questions.length) * 100) + '%"></div></div></div>' +
    '<div class="card"><h3>' + PS.esc(q.q) + '</h3>' +
    '<div class="field"><span class="badge">' + PS.esc(q.funcTitle) + '</span> <span class="badge">' + PS.esc(PS.academyQuiz.diffMeta[q.diff] ? PS.academyQuiz.diffMeta[q.diff].label : '') + '</span></div>' +
    '<div class="exam-options">' +
    q.options.map(function (o, i) {
      var sel = s.answers[s.current] === i;
      return '<label class="exam-option"><input type="radio" name="examOpt" value="' + i + '"' + (sel ? ' checked' : '') + '> ' +
        PS.esc(o.text) + '</label>';
    }).join('') +
    '</div></div>' +
    '<div class="exam-nav">' +
    '<button type="button" class="btn" data-act="exam-prev"' + (s.current === 0 ? ' disabled' : '') + '>&larr; Previous</button>' +
    (s.current < s.questions.length - 1
      ? '<button type="button" class="btn btn-primary" data-act="exam-next">Next &rarr;</button>'
      : '<button type="button" class="btn btn-primary" data-act="exam-submit">Submit exam</button>') +
    '</div></div>';
  box.innerHTML = html;
  box.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  PS.wireExamOptions();
  PS.exams.startExamTimer();
};

PS.acts['exam-next'] = function () {
  var s = PS.exams.session;
  if (!s) return;
  if (s.current < s.questions.length - 1) { s.current++; PS.exams.renderExamRunner(); }
};
PS.acts['exam-prev'] = function () {
  var s = PS.exams.session;
  if (!s) return;
  if (s.current > 0) { s.current--; PS.exams.renderExamRunner(); }
};

PS.wireExamOptions = function () {
  var opts = PS.$$('input[name="examOpt"]');
  var s = PS.exams.session;
  opts.forEach(function (el) {
    el.addEventListener('change', function () {
      if (s) s.answers[s.current] = PS.num(el.value);
    });
  });
};

/* ---------- timer ---------- */
PS.exams._timer = null;
PS.exams.fmtTime = function (sec) {
  sec = Math.max(0, Math.round(sec));
  var m = Math.floor(sec / 60), s = sec % 60;
  return m + ':' + (s < 10 ? '0' : '') + s;
};
PS.exams.startExamTimer = function () {
  PS.exams.stopTimer();
  var s = PS.exams.session;
  if (!s) return;
  var el = PS.$('#examTimer');
  var t = new Date().getTime();
  PS.exams._timer = setInterval(function () {
    if (!PS.exams.session || PS.exams.session.done) { PS.exams.stopTimer(); return; }
    var elapsed = Math.floor((new Date().getTime() - t) / 1000);
    var remain = Math.max(0, s.timeLimit - elapsed);
    if (el) {
      el.textContent = PS.exams.fmtTime(remain);
      el.classList.toggle('is-urgent', remain <= 60);
    }
    if (remain <= 0) { PS.exams.stopTimer(); PS.toast('Time is up - exam submitted automatically.', 'warn'); PS.exams.grade(); }
  }, 1000);
};
PS.exams.stopTimer = function () {
  if (PS.exams._timer) { clearInterval(PS.exams._timer); PS.exams._timer = null; }
};

/* ---------- grading ---------- */
PS.acts['exam-submit'] = function () {
  var s = PS.exams.session;
  if (!s) return;
  PS.confirm({
    title: 'Submit exam?',
    body: '<p>You answered ' + Object.keys(s.answers).length + ' of ' + s.questions.length + ' questions. Once submitted, your score is recorded locally.</p>',
    okLabel: 'Submit & grade',
    onOk: function () { PS.exams.grade(); }
  });
};

PS.exams.grade = function () {
  var s = PS.exams.session;
  if (!s || s.done) return;
  s.done = true;
  PS.exams.stopTimer();
  var score = 0, review = [];
  s.questions.forEach(function (q, i) {
    var ans = s.answers[i];
    var correct = ans !== undefined && q.options[ans] && q.options[ans].isCorrect;
    if (correct) score++;
    var correctOpt = q.options.filter(function (o) { return o.isCorrect; })[0];
    review.push({ q: q, chosen: ans, correct: correct, correctText: correctOpt ? correctOpt.text : '' });
  });
  var total = s.questions.length;
  var pct = total ? Math.round((score / total) * 100) : 0;
  var passed = pct >= PS.exams.PASS_PCT;
  PS.exams.recordAttempt({
    bank: s.bank.id, bankTitle: s.bank.title, score: score, total: total, pct: pct,
    passed: passed, date: new Date().toISOString(), seconds: Math.round((Date.now() - s.start) / 1000)
  });
  PS.audit(passed ? 'exam-passed' : 'exam-failed', s.bank.title + ' ' + score + '/' + total);
  var box = PS.$('#examRunner');
  if (!box) { PS.renderRoute(); return; }
  box.innerHTML = '<div class="exam-runner"><div class="card"><div class="card-head"><div><h2>Exam complete</h2>' +
    '<p class="card-sub">' + PS.esc(s.bank.title) + '</p></div><div class="spacer"></div>' +
    '<span class="badge ' + (passed ? 'badge-ok' : '') + '">' + (passed ? 'PASSED' : 'NOT PASSED') + '</span></div>' +
    '<div class="grid grid-4">' +
    '<div class="stat"><div class="s-val">' + score + '/' + total + '</div><div class="s-lab">Correct</div></div>' +
    '<div class="stat"><div class="s-val">' + pct + '%</div><div class="s-lab">Score</div></div>' +
    '<div class="stat"><div class="s-val">' + PS.exams.fmtTime(Math.round((Date.now() - s.start) / 1000)) + '</div><div class="s-lab">Time</div></div>' +
    '<div class="stat ' + (passed ? 'is-ok' : 'is-warn') + '"><div class="s-val">' + PS.exams.PASS_PCT + '%</div><div class="s-lab">Pass mark</div></div>' +
    '</div>' +
    (passed ? '<p class="note" style="color:var(--ok)">Congratulations - you reached the pass mark. Retake any time to improve your score.</p>'
      : '<p class="note">You did not reach the ' + PS.exams.PASS_PCT + '% pass mark this time. Review the answers below and study the linked Academy modules before retaking.</p>') +
    '<div class="btn-row"><button type="button" class="btn btn-primary" data-act="exam-retake" data-bank="' + PS.escAttr(s.bank.id) + '">Retake exam</button>' +
    '<button type="button" class="btn btn-ghost" data-act="exam-toggle-review">Review answers</button></div>' +
    '<div id="examReview" hidden>' + PS.exams.renderReview(review) + '</div>' +
    '</div></div>';
  box.scrollIntoView({ block: 'start', behavior: 'smooth' });
};

PS.exams.renderReview = function (review) {
  var rows = review.map(function (r, i) {
    var chosen = r.chosen !== undefined && r.q.options[r.chosen] ? r.q.options[r.chosen].text : '(not answered)';
    return '<tr><td>' + (i + 1) + '</td><td>' + PS.esc(r.q.q) + '</td>' +
      '<td>' + PS.esc(PS.typeLabel ? r.q.funcTitle : r.q.funcTitle) + '</td>' +
      '<td>' + (r.correct ? '\u2713' : '\u2717') + ' ' + PS.esc(chosen) + '</td>' +
      '<td>' + PS.esc(r.correctText) + '</td></tr>';
  }).join('');
  return '<div class="table-wrap"><table><thead><tr><th>#</th><th>Question</th><th>Module</th><th>Your answer</th><th>Correct answer</th></tr></thead><tbody>' + rows + '</tbody></table></div>';
};

PS.acts['exam-toggle-review'] = function () {
  var el = PS.$('#examReview');
  if (el) el.hidden = !el.hidden;
};
PS.acts['exam-retake'] = function (el) {
  PS.exams.session = null;
  PS.exams.stopTimer();
  var box = PS.$('#examRunner');
  if (box) box.innerHTML = '<div class="card"><p class="note">Choose an exam below to begin.</p></div>';
  var startBtn = PS.$('#examStart_' + el.dataset.bank);
  if (startBtn) startBtn.click();
};

PS.exams.historyHtml = function () {
  var h = PS.exams.history();
  if (!h.length) return '<p class="note">No exam attempts recorded yet.</p>';
  var rows = h.map(function (a) {
    return '<tr><td>' + PS.esc(PS.dateTime(a.date)) + '</td><td>' + PS.esc(a.bankTitle || a.bank) + '</td>' +
      '<td class="num">' + a.score + '/' + a.total + ' (' + a.pct + '%)</td>' +
      '<td>' + (a.passed ? '<span style="color:var(--ok);font-weight:700">Passed</span>' : '<span style="color:var(--danger)">Not passed</span>') + '</td>' +
      '<td class="num">' + PS.exams.fmtTime(a.seconds || 0) + '</td></tr>';
  }).join('');
  return '<div class="table-wrap"><table><thead><tr><th>Date</th><th>Exam</th><th class="num">Score</th><th>Result</th><th class="num">Time</th></tr></thead><tbody>' + rows + '</tbody></table></div>';
};

/* Stop any running exam timer when leaving the exams route. */
(function () {
  var prev = PS.onRouteDone;
  PS.onRouteDone = function (r) {
    if (r && r.name !== 'exams') PS.exams.stopTimer();
    if (prev) { try { prev(r); } catch (e) { } }
  };
})();