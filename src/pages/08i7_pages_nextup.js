/* ==========================================================
   Procure Sherpa - What to Learn Next
   Suggestions drawn from the skill assessment, Academy progress
   and lab completions. Changes as the user learns.
   ========================================================== */

PS.nextUp = PS.nextUp || {};

PS.nextUp.getRecommendation = function () {
  var recs = [];
  var funcs = PS.ACADEMY_FUNCTIONS || [];
  var assessment = PS.skillAssessment ? PS.skillAssessment.getLastResult() : null;
  var stats = PS.academy.getStats();

  var incomplete = funcs.filter(function (f) { return !PS.academy.isCompleted(f.id); });

  if (!incomplete.length) {
    return { state: 'complete', recs: [] };
  }

  var labProgress = PS.store.get('practice_labs', {});
  var labsDone = Object.keys(labProgress).length;
  var labsTotal = PS.practiceLabs ? PS.practiceLabs.LABS.length : 4;

  if (!assessment) {
    recs.push({
      kind: 'assessment',
      title: 'Take the skill assessment',
      why: 'Three minutes. It places you on a 1-5 level across sourcing, negotiation, contracts and risk, and makes the rest of this page specific.',
      href: '#/assessment',
      cta: 'Start'
    });
  }

  if (stats.completedCount === 0) {
    recs.push({
      kind: 'start',
      title: 'Start with the foundations',
      why: 'No module completed yet. Procurement Foundations starts from zero: what procurement is, cost basics and spend visibility.',
      href: '#/learning-paths',
      cta: 'Learning paths'
    });
  } else {
    var nextModule = null;
    if (PS.learningPaths && PS.learningPaths.sortPaths) PS.learningPaths.sortPaths();
  var paths = PS.learningPaths ? PS.learningPaths.PATHS : [];
    for (var p = 0; p < paths.length && !nextModule; p++) {
      nextModule = PS.learningPaths.getNextModule(paths[p].id);
    }
    if (nextModule) {
      var fn = PS.byId('academy', nextModule);
      if (fn) {
        recs.push({
          kind: 'continue',
          title: 'Continue: ' + fn.title,
          why: 'The next module in your path. Scoring 70% or more on its quiz moves the path forward.',
          href: '#/academy/' + encodeURIComponent(fn.id),
          cta: 'Open'
        });
      }
    }

    var scores = PS.academy.getAll().scores || {};
    var weakestId = null;
    var weakestPct = 100;
    Object.keys(scores).forEach(function (fid) {
      var sc = scores[fid];
      if (sc && sc.pct < 70 && sc.pct < weakestPct) {
        weakestPct = sc.pct;
        weakestId = fid;
      }
    });
    if (weakestId) {
      var weakFn = PS.byId('academy', weakestId);
      if (weakFn) {
        recs.push({
          kind: 'retry',
          title: 'Revisit: ' + weakFn.title,
          why: 'Your last quiz here was ' + weakestPct + '%, below the 70% mastery mark. Read the lesson again, then retake the quiz.',
          href: '#/academy/' + encodeURIComponent(weakestId),
          cta: 'Revisit'
        });
      }
    }
  }

  if (labsDone < labsTotal) {
    recs.push({
      kind: 'lab',
      title: 'Try a practice lab (' + labsDone + '/' + labsTotal + ' done)',
      why: 'Reading builds knowledge; the labs build judgment. The supplier evaluation and negotiation ones are the place to start.',
      href: '#/labs',
      cta: 'Labs'
    });
  }

  if (assessment && assessment.score >= 75) {
    recs.push({
      kind: 'stretch',
      title: 'Sit a certification exam',
      why: 'Your assessment score was ' + assessment.score + '%. The timed exams are the strongest test of what has stuck.',
      href: '#/exams',
      cta: 'Exams'
    });
  }

  recs.push({
    kind: 'habit',
    title: 'Read today\'s tip',
    why: 'One procurement idea a day adds up over weeks. This week\'s challenge is on the same page.',
    href: '#/daily-tip',
    cta: "Today's tip"
  });

  return { state: 'active', recs: recs };
};

PS.route('next-up', function () {
  PS.pageTitle = 'What to learn next';
  var result = PS.nextUp.getRecommendation();

  var html = '<div class="card">' +
    '<div class="card-head"><h1>What to learn next</h1></div>' +
    '<p class="lead">Suggestions drawn from your assessment, module progress and lab work. They change as you learn.</p>' +
    '</div>';

  if (result.state === 'complete') {
    html += '<div class="card" style="border-left:4px solid var(--ok)">' +
      '<h2>Curriculum complete</h2>' +
      '<p>You have finished every module in the Academy. Keep sharp with the exams, the labs and the daily tips:</p>' +
      '<div class="btn-row" style="margin-top:12px">' +
      '<a class="btn" href="#/exams">Exams</a>' +
      '<a class="btn" href="#/labs">Labs</a>' +
      '<a class="btn" href="#/daily-tip">Daily tip</a>' +
      '</div></div>';
  } else {
    result.recs.forEach(function (r, i) {
      var primary = i === 0;
      html += '<div class="card" style="' + (primary ? 'border-left:4px solid var(--accent)' : '') + '">' +
        '<div class="card-head"><h2>' + PS.esc(r.title) + '</h2>' +
        (primary ? '<span class="badge" style="background:var(--accent-soft);color:var(--accent)">Start here</span>' : '') + '</div>' +
        '<p class="note" style="margin:8px 0">' + PS.esc(r.why) + '</p>' +
        '<a class="btn ' + (primary ? 'btn-primary' : '') + '" href="' + r.href + '">' + PS.esc(r.cta) + '</a>' +
        '</div>';
    });
  }

  var stats = PS.academy.getStats();
  var labProgress = PS.store.get('practice_labs', {});
  var assessment = PS.skillAssessment ? PS.skillAssessment.getLastResult() : null;

  html += '<div class="card">' +
    '<h2>Progress</h2>' +
    '<div class="grid grid-3 mb16" style="margin-top:12px">' +
    '<div class="stat"><span class="s-val">' + stats.completedCount + '/' + stats.totalCount + '</span><span class="s-lab">Modules mastered</span></div>' +
    '<div class="stat"><span class="s-val">' + Object.keys(labProgress).length + '/' + (PS.practiceLabs ? PS.practiceLabs.LABS.length : 4) + '</span><span class="s-lab">Labs done</span></div>' +
    '<div class="stat"><span class="s-val">' + (assessment ? assessment.score + '%' : '\u2014') + '</span><span class="s-lab">Assessment</span></div>' +
    '</div>' +
    '<div class="btn-row"><a class="btn btn-sm" href="#/academy-progress">Transcript</a>' +
    '<a class="btn btn-sm" href="#/portfolio">Skill portfolio</a>' +
    '<a class="btn btn-sm" href="#/learning-paths">Learning paths</a></div>' +
    '</div>';

  return html;
});
