/* ==========================================================
   Procure Sherpa v3.0 - Reflection: where the reader judgement is
   weakest, read out of the record that already exists.

   The quiz engine stores, per question, the option the learner
   chose (`scores[funcId].answers[qIdx]`) and whether they reached
   the right answer only after the tactical tip
   (`scores[funcId].recovered[qIdx]`). That is enough to tell three
   states apart without inventing anything new: got it first time,
   got there with coaching, and still wrong. The transient
   `mistakes` map cannot be used for this - it is cleared when a
   question resolves - so the reflection is computed from the
   durable answer record instead.
   ========================================================== */

PS.reflection = PS.reflection || {};

/* clean   - answered and the chosen option is the correct one
   coached - answered correctly, but only after the tactical tip
   wrong   - the recorded answer is not the correct option
   open    - never answered */
PS.reflection.statusOf = function (func, qIdx, answers, recovered) {
  var q = (func.quizzes || [])[qIdx];
  if (!q) return 'unknown';
  var chosen = answers ? answers[qIdx] : undefined;
  if (chosen === undefined || chosen === null || !q.options || !q.options[chosen]) return 'open';
  if (q.options[chosen].isCorrect) return recovered && recovered[qIdx] ? 'coached' : 'clean';
  return 'wrong';
};

PS.reflection.forLesson = function (func) {
  var res = PS.academy.getQuizResult(func.id);
  var answers = (res && res.answers) || {};
  var recovered = (res && res.recovered) || {};
  var out = { clean: 0, coached: 0, wrong: 0, open: 0, total: (func.quizzes || []).length };
  var items = [];
  for (var i = 0; i < out.total; i++) {
    var st = PS.reflection.statusOf(func, i, answers, recovered);
    if (out[st] !== undefined) out[st]++;
    items.push({
      idx: i,
      status: st,
      principle: (func.quizzes[i] && func.quizzes[i].principle) || '',
      question: (func.quizzes[i] && func.quizzes[i].q) || ''
    });
  }
  out.items = items;
  out.pct = res && typeof res.pct === 'number' ? res.pct : null;
  out.taken = !!res;
  return out;
};

/* A weak principle is one the learner has not settled. `wrong` counts
   double against `coached`, which is honest: needing the tip is progress,
   not failure, and it should not be reported as though the concept is
   still lost. */
PS.reflection.summary = function () {
  var funcs = PS.ACADEMY_FUNCTIONS || [];
  var lessons = [];
  var principleMap = {};
  var totals = { clean: 0, coached: 0, wrong: 0, open: 0, answered: 0, attemptedLessons: 0 };

  for (var i = 0; i < funcs.length; i++) {
    var f = funcs[i];
    var r = PS.reflection.forLesson(f);
    if (r.total) {
      totals.clean += r.clean;
      totals.coached += r.coached;
      totals.wrong += r.wrong;
      totals.open += r.open;
      totals.answered += r.clean + r.coached + r.wrong;
    }
    if (r.taken) totals.attemptedLessons++;
    if (r.wrong + r.coached > 0) {
      lessons.push({ id: f.id, title: f.title, module: f.module, report: r });
    }
    for (var j = 0; j < r.items.length; j++) {
      var it = r.items[j];
      if (it.status !== 'wrong' && it.status !== 'coached') continue;
      var key = it.principle || '(the question carries no stated principle)';
      if (!principleMap[key]) principleMap[key] = { principle: key, wrong: 0, coached: 0, lessons: {} };
      if (it.status === 'wrong') principleMap[key].wrong++; else principleMap[key].coached++;
      principleMap[key].lessons[f.id] = f.title;
    }
  }

  var principles = Object.keys(principleMap).map(function (k) {
    var p = principleMap[k];
    p.weight = p.wrong * 2 + p.coached;
    p.lessonIds = Object.keys(p.lessons);
    return p;
  }).sort(function (a, b) { return b.weight - a.weight || a.principle.localeCompare(b.principle); });

  lessons.sort(function (a, b) {
    return (b.report.wrong * 2 + b.report.coached) - (a.report.wrong * 2 + a.report.coached) || a.title.localeCompare(b.title);
  });

  return { totals: totals, lessons: lessons, principles: principles };
};
