/* ==========================================================
   Procure Sherpa v3.0 - Reflection page (#/reflection)
   Reads the answer record back to the learner as judgement gaps:
   which principles they have not settled, and which lessons to
   go back to. Nothing here is a score for its own sake - the
   point is the next thing to do.
   ========================================================== */

PS.route('reflection', function () {
  PS.pageTitle = 'Reflection';
  var s = PS.reflection.summary();
  var t = s.totals;

  var html = PS.reportHead('Reflection', 'Where your judgement is weakest') +
    '<div class="card"><div class="card-head"><div><h1>Reflection</h1>' +
    '<p class="card-sub">Every quiz answer is recorded with the option you chose, so this page can show what you have not settled rather than only what you finished. It ranks the principles you got wrong or needed the coaching tip for, and points back at the lesson that teaches each one.</p></div>' +
    '<div class="spacer"></div>' +
    '<span class="badge' + (t.wrong ? ' badge-warn' : ' badge-ok') + '">' + t.wrong + (t.wrong === 1 ? ' answer still wrong' : ' answers still wrong') + '</span></div>';

  if (!t.answered) {
    html += '<div class="empty"><h3>Nothing to reflect on yet</h3>' +
      '<p>This page needs quiz answers, not reading. Work through a lesson, take its quiz in the Practice tab, and your choices start showing up here - including the ones you only got right after a coaching tip.</p>' +
      '<div class="btn-row" style="justify-content:center">' +
      '<a class="btn btn-primary" href="#/academy">Open the Academy</a>' +
      '<a class="btn" href="#/exams">Sit a practice exam</a></div></div>';
  } else {
    html += '<div class="grid grid-4 mb16">' +
      '<div class="stat"><span class="s-val">' + t.answered + '</span><span class="s-lab">Questions answered</span></div>' +
      '<div class="stat"><span class="s-val">' + t.clean + '</span><span class="s-lab">Right first time</span></div>' +
      '<div class="stat"><span class="s-val">' + t.coached + '</span><span class="s-lab">Got there with the tip</span></div>' +
      '<div class="stat"><span class="s-val">' + t.wrong + '</span><span class="s-lab">Still wrong</span></div>' +
      '</div>';

    if (s.principles.length) {
      html += '<div class="card"><div class="card-head"><h2>Principles you have not settled</h2>' +
        '<div class="spacer"></div><span class="badge">' + s.principles.length + '</span></div>' +
        '<p class="note" style="margin-top:0">Each question in the Academy names the principle it tests. These are the ones your answers have not yet demonstrated - a wrong answer counts twice, needing the tip counts once.</p>' +
        '<ol class="stepper">' + s.principles.slice(0, 8).map(function (p) {
          return '<li>' +
            '<div class="tl-title">' + PS.esc(p.principle) + '</div>' +
            '<div class="tl-body"><span class="badge' + (p.wrong ? ' badge-warn' : '') + '">' +
            p.wrong + (p.wrong === 1 ? ' wrong' : ' wrong') + (p.coached ? ' &middot; ' + p.coached + ' coached' : '') + '</span></div>' +
            '<div class="chips" style="margin-top:6px">' + p.lessonIds.slice(0, 3).map(function (id) {
              return '<a class="chip" href="#/academy/' + encodeURIComponent(id) + '?tab=practice">' + PS.esc(p.lessons[id]) + '</a>';
            }).join('') + '</div></li>';
        }).join('') + '</ol>' +
        (s.principles.length > 8 ? '<p class="note">and ' + (s.principles.length - 8) + ' more below the first eight.</p>' : '') +
        '</div>';
    }

    if (s.lessons.length) {
      html += '<div class="card"><div class="card-head"><h2>Lessons to revisit</h2>' +
        '<div class="spacer"></div><span class="badge">' + s.lessons.length + '</span></div>' +
        '<p class="note" style="margin-top:0">Ranked by what is still open in them. Reading the Core Concept tab again before retaking the quiz is what changes a wrong answer into a coached one, and a coached one into a clean hit.</p>' +
        '<div class="table-wrap"><table><thead><tr><th>Lesson</th><th>Quiz</th><th>Still wrong</th><th>Coached</th><th></th></tr></thead><tbody>' +
        s.lessons.slice(0, 12).map(function (l) {
          return '<tr><td><a href="#/academy/' + encodeURIComponent(l.id) + '">' + PS.esc(l.title) + '</a>' +
            '<div class="eyebrow" style="margin-top:2px">' + PS.esc(l.module) + '</div></td>' +
            '<td>' + (l.report.pct === null ? 'not scored' : l.report.pct + '%') + '</td>' +
            '<td>' + l.report.wrong + '</td><td>' + l.report.coached + '</td>' +
            '<td><a class="btn btn-sm" href="#/academy/' + encodeURIComponent(l.id) + '?tab=practice">Practice</a></td></tr>';
        }).join('') + '</tbody></table></div></div>';
    } else {
      html += '<div class="card" style="border-left:4px solid var(--ok)"><h2>No open gaps</h2>' +
        '<p>Every question you have answered is either right first time or was corrected with the tip and then answered correctly. Go on to the next lesson, or put the curriculum under timed pressure with a practice exam.</p>' +
        '<div class="btn-row"><a class="btn btn-primary" href="#/next-up">What to learn next</a>' +
        '<a class="btn" href="#/exams">Practice exams</a></div></div>';
    }

    html += '<div class="card"><h2>How this is worked out</h2>' +
      '<ul><li>The Academy stores which option you chose on each question, so a weakness is read from your answers rather than from a score alone.</li>' +
      '<li><strong>Coached</strong> means you chose wrong, took the tactical tip, and then chose correctly. That is counted as progress, not as a failure, and it is kept separate from an answer that is still wrong.</li>' +
      '<li>Unanswered questions are not treated as weaknesses - they are simply not attempted yet, and the count is shown so you can see the difference.</li>' +
      '<li>All of this is computed in this browser from your own record. Resetting progress on the transcript clears it, and none of it leaves the machine.</li></ul>' +
      '<div class="btn-row" style="margin-top:12px"><a class="btn btn-sm" href="#/academy-progress">Progress transcript</a>' +
      '<a class="btn btn-sm" href="#/revise">Review queue</a>' +
      '<a class="btn btn-sm" href="#/academy">Academy</a></div></div>';
  }

  html += PS.disclaimer('credential');
  return html;
});
