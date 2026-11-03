/* ==========================================================
   Procure Sherpa v3.0 - Review queue (#/revise)
   The surface that turns a finished lesson into a scheduled
   one. Everything here is computed from the reader's own
   progress record; nothing is invented about when something
   was read, and the honesty of the intervals is stated rather
   than implied.
   ========================================================== */

PS.route('revise', function () {
  PS.pageTitle = 'Review queue';
  var q = PS.revise.queue();
  var dueN = q.due.length;
  var soonN = q.soon.length;

  var day = function (ts) {
    if (!ts) return 'no date recorded';
    var d = new Date(ts);
    var mo = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return d.getDate() + ' ' + mo[d.getMonth()] + ' ' + d.getFullYear();
  };

  var reason = function (it) {
    var bits = [];
    bits.push(it.strong
      ? 'passed at ' + (it.pct < 0 ? 'n/a' : it.pct + '%') + ', so it earns the longer ladder'
      : (it.pct < 0 ? 'no quiz taken yet, so it earns the shorter ladder' : 'last quiz was ' + it.pct + '%, below the 70% mark, so it earns the shorter ladder'));
    bits.push('every ' + it.days + ' days' + (it.reps ? ', review ' + (it.reps + 1) + ' scheduled' : ''));
    bits.push(it.inherited ? 'started today (your record for this lesson has no date on it)' : 'last touched ' + day(it.last));
    return bits;
  };

  var row = function (it, showActions) {
    return '<li class="revise-item">' +
      '<div class="tl-title"><a href="#/academy/' + encodeURIComponent(it.id) + '">' + PS.esc(it.title) + '</a></div>' +
      '<div class="tl-body"><span class="badge">' + PS.esc(PS.revise.whenPhrase(it.due)) + '</span> ' +
      '<span class="eyebrow">' + PS.esc(it.module) + '</span></div>' +
      (showActions ? '<ul>' + reason(it).map(function (b) { return '<li>' + PS.esc(b) + '</li>'; }).join('') + '</ul>' : '') +
      '<div class="chips" style="margin-top:6px">' +
      '<a class="btn btn-sm' + (showActions ? ' btn-primary' : '') + '" href="#/academy/' + encodeURIComponent(it.id) + '?tab=learn">Open lesson</a>' +
      (showActions ? '<button type="button" class="btn btn-sm" data-act="revise-review" data-id="' + PS.escAttr(it.id) + '">Mark reviewed</button>' : '') +
      '</div></li>';
  };

  var html = PS.reportHead('Review queue', 'Spaced revision from your own progress') +
    '<div class="card"><div class="card-head"><div><h1>Review queue</h1>' +
    '<p class="card-sub">A lesson you have read is worth reading again. This page works out when, from the record this browser already holds: a passed quiz earns a longer gap, a shaky one earns a shorter one, and each review you mark pushes the next one further out.</p></div>' +
    '<div class="spacer"></div>' +
    '<span class="badge' + (dueN ? ' badge-primary' : ' badge-ok') + '">' + dueN + (dueN === 1 ? ' lesson due' : ' lessons due') + '</span></div>' +
    '<div class="grid grid-4 mb16">' +
    '<div class="stat"><span class="s-val">' + q.tracked + '</span><span class="s-lab">In the schedule</span></div>' +
    '<div class="stat"><span class="s-val">' + dueN + '</span><span class="s-lab">Due now</span></div>' +
    '<div class="stat"><span class="s-val">' + soonN + '</span><span class="s-lab">Due within 14 days</span></div>' +
    '<div class="stat"><span class="s-val">' + q.later + '</span><span class="s-lab">Not due yet</span></div>' +
    '</div>';

  if (!q.tracked) {
    html += '<div class="empty"><h3>Nothing to schedule yet</h3>' +
      '<p>The queue fills up as you study. Once you have read a lesson or passed its quiz, it gets a review date here, and the interval lengthens each time you mark it reviewed.</p>' +
      '<div class="btn-row" style="justify-content:center">' +
      '<a class="btn btn-primary" href="#/academy">Open the Academy</a>' +
      '<a class="btn" href="#/next-up">What to learn next</a>' +
      '</div></div>';
  } else {
    if (dueN) {
      html += '<div class="card"><div class="card-head"><h2>Due now</h2><div class="spacer"></div>' +
        '<span class="badge">' + dueN + '</span></div>' +
        '<p class="note" style="margin-top:0">These are past their review date. Re-reading the Learn tab and retaking the quiz is the point - the quiz result is what moves a lesson onto the longer ladder.</p>' +
        '<ol class="stepper">' + q.due.map(function (it) { return row(it, true); }).join('') + '</ol></div>';
    } else {
      html += '<div class="card" style="border-left:4px solid var(--ok)">' +
        '<h2>Nothing due today</h2>' +
        '<p>Everything you have studied is inside its review window. ' + (soonN ? 'The next ones arrive within a fortnight.' : 'The next review is more than two weeks away.') + '</p>' +
        '<div class="btn-row"><a class="btn btn-primary" href="#/next-up">What to learn next</a>' +
        '<a class="btn" href="#/academy">Keep reading the curriculum</a></div></div>';
    }

    if (soonN) {
      html += '<div class="card"><div class="card-head"><h2>Coming up</h2><div class="spacer"></div>' +
        '<span class="badge">' + soonN + '</span></div>' +
        '<p class="note" style="margin-top:0">Not due yet, listed so you can see what is around the corner.</p>' +
        '<ol class="stepper">' + q.soon.map(function (it) { return row(it, false); }).join('') + '</ol></div>';
    }

    html += '<div class="card"><h2>How the dates are worked out</h2>' +
      '<ul>' +
      '<li>A passed quiz (70% or more) uses gaps of 7, 21, 60 and 180 days. Anything below that, or a lesson with no quiz yet, uses 3, 14 and 45.</li>' +
      '<li>Marking a review pushes the lesson to the next gap in its ladder, so a lesson you keep returning to is asked about less often, not more.</li>' +
      '<li>The baseline is the most recent thing your record actually says: a review you marked, a quiz you sat, or a completion you confirmed. ' + (q.noDate ?
        q.noDate + ' of the ' + q.tracked + ' lessons in the schedule were completed before dates were recorded at all, so they are measured from today and labelled as such.' :
          'Every lesson in your schedule has a real date behind it.') + '</li>' +
      '<li>These intervals are a teaching convention borrowed from spaced practice, not a measurement of how fast you personally forget. Nothing leaves this browser and no account is involved.</li>' +
      '</ul>' +
      '<div class="btn-row" style="margin-top:12px"><a class="btn btn-sm" href="#/academy-progress">Progress transcript</a>' +
      '<a class="btn btn-sm" href="#/exams">Practice exams</a>' +
      '<a class="btn btn-sm" href="#/reflection">Reflection on your answers</a>' +
      '<a class="btn btn-sm" href="#/next-up">What to learn next</a></div></div>';
  }

  html += PS.disclaimer('data');
  return html;
});

/* Reviewing is recorded, then the page is redrawn so the counts, the
   ladders and the "coming up" list all move together - the same idiom
   the scenario checklist uses. */
PS.acts['revise-review'] = function (el) {
  var id = el && el.dataset ? el.dataset.id : '';
  if (!id || !PS.revise) { PS.toast('That review could not be recorded.', 'warn'); return; }
  var reps = PS.revise.markReviewed(id);
  var next = PS.revise.nextDue(id);
  PS.renderRoute();
  PS.toast('Recorded. ' + (next ? 'Next review ' + PS.revise.whenPhrase(next.due).replace('due ', '') + '.' : 'Next review scheduled.'), 'ok');
  void reps;
};
