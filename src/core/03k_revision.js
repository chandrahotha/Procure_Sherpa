/* ==========================================================
   Procure Sherpa v3.0 - Revision scheduling (spaced review)
   The Academy records that a lesson was studied and whether the
   quiz was passed, and then the curriculum behaves like a list:
   a lesson read in September is never mentioned again, which is
   how a learning product loses what it taught. This is the
   forgetting-curve half of the portal - a local, deterministic
   review queue built from the reader's own progress record.

   Two design decisions worth stating:

   * The ladder is short and honest. Intervals of 7/21/60/180
     days after a passed quiz, 3/14/45 after a shaky or missing
     one. These are a teaching convention, not a calibrated
     memory model, and the page says so rather than implying
     that the app knows how fast this particular reader forgets.

   * Nothing is invented about the past. Completions written
     before this feature existed carry no date, because the
     record stored `true`. A lesson in that state is scheduled
     from today and labelled as having no recorded date; it is
     never presented as though it was read last month.
   ========================================================== */

PS.revise = PS.revise || {};

PS.revise.DAY = 86400000;
PS.revise.STRONG = [7, 21, 60, 180];
PS.revise.SHAKY = [3, 14, 45];
PS.revise.PASS = 70;

/* Timestamps live in their own map rather than replacing the boolean
   completion flag, because every other surface - badges, hub rails,
   the transcript, G24 and G27 - reads `completed[id]` as a truthy
   value. Changing that shape to an object would have been a silent
   behavioural change in six places that do not belong to this feature. */
PS.revise.record = function (funcId, kind) {
  if (!funcId || !PS.academy) return;
  var data = PS.academy.getAll();
  data.log = data.log || {};
  var e = data.log[funcId] || {};
  e[kind] = Date.now();
  data.log[funcId] = e;
  PS.academy.save(data);
};

PS.revise.entry = function (funcId) {
  var data = PS.academy.getAll();
  return (data.log || {})[funcId] || {};
};

/* The most recent touch of any kind is what the next interval is
   measured from: re-reading a lesson resets the clock the same way
   passing its quiz does. */
PS.revise.lastTouch = function (e) {
  var keys = ['reviewed', 'quiz', 'completed', 'studied'];
  var best = 0;
  for (var i = 0; i < keys.length; i++) {
    var t = Number(e[keys[i]] || 0);
    if (t > best) best = t;
  }
  return best;
};

PS.revise.ladderFor = function (funcId) {
  var res = PS.academy.getQuizResult ? PS.academy.getQuizResult(funcId) : null;
  var pct = res && typeof res.pct === 'number' ? res.pct : -1;
  return { strong: pct >= PS.revise.PASS, pct: pct, steps: pct >= PS.revise.PASS ? PS.revise.STRONG : PS.revise.SHAKY };
};

/* Quiz attempts already carry an ISO date in the score record, so a
   reader who passed a lesson last month has real history to schedule
   from even though they never wrote a revision log entry. */
PS.revise.scoreDate = function (funcId) {
  var res = PS.academy.getQuizResult ? PS.academy.getQuizResult(funcId) : null;
  if (!res || !res.date) return 0;
  var t = Date.parse(res.date);
  return isNaN(t) ? 0 : t;
};

/* Returns null when there is nothing to schedule: a lesson that was
   never studied or completed has no interval, and it is not "due". */
PS.revise.nextDue = function (funcId) {
  var data = PS.academy.getAll();
  var e = (data.log || {})[funcId] || {};
  var completed = !!(data.completed && data.completed[funcId]);
  var studied = !!(data.studied && data.studied[funcId]);
  if (!completed && !studied) return null;
  var lad = PS.revise.ladderFor(funcId);
  var reps = Number(e.reps || 0);
  var step = Math.min(reps, lad.steps.length - 1);
  var days = lad.steps[step];
  var touch = Math.max(PS.revise.lastTouch(e), PS.revise.scoreDate(funcId));
  var inherited = !touch;
  var base = touch || Date.now();
  return {
    due: base + days * PS.revise.DAY,
    days: days,
    reps: reps,
    strong: lad.strong,
    pct: lad.pct,
    inherited: inherited,
    last: touch || null
  };
};

/* One pass over the curriculum, sorted by urgency: overdue first, then
   what is due, then what is coming inside a fortnight. `later` is a
   count rather than a list because a learner who is caught up does not
   need fourteen rows of lessons they are not due for yet. */
PS.revise.queue = function () {
  var now = Date.now();
  var due = [];
  var soon = [];
  var later = 0;
  var noDate = 0;
  var tracked = 0;
  var funcs = PS.ACADEMY_FUNCTIONS || [];
  for (var i = 0; i < funcs.length; i++) {
    var f = funcs[i];
    var s = PS.revise.nextDue(f.id);
    if (!s) continue;
    tracked++;
    if (s.inherited) noDate++;
    var item = {
      id: f.id,
      title: f.title,
      module: f.module,
      tier: f.tier,
      due: s.due,
      days: s.days,
      reps: s.reps,
      strong: s.strong,
      pct: s.pct,
      inherited: s.inherited,
      last: s.last,
      overdueDays: Math.floor((now - s.due) / PS.revise.DAY)
    };
    if (now >= s.due) due.push(item);
    else if (s.due - now <= 14 * PS.revise.DAY) soon.push(item);
    else later++;
  }
  due.sort(function (a, b) { return a.due - b.due; });
  soon.sort(function (a, b) { return a.due - b.due; });
  return { due: due, soon: soon, later: later, tracked: tracked, noDate: noDate, now: now };
};

/* Reviewing is a recorded act, not a page view: it advances the ladder
   so a lesson that keeps being revisited earns longer intervals rather
   than staying in the queue forever. */
PS.revise.markReviewed = function (funcId) {
  var data = PS.academy.getAll();
  data.log = data.log || {};
  var e = data.log[funcId] || {};
  e.reps = Number(e.reps || 0) + 1;
  e.reviewed = Date.now();
  data.log[funcId] = e;
  PS.academy.save(data);
  return e.reps;
};

PS.revise.whenPhrase = function (ts) {
  var now = Date.now();
  var diff = ts - now;
  var days = Math.round(diff / PS.revise.DAY);
  if (days <= -1) return Math.abs(days) + ' days overdue';
  if (days < 0) return 'overdue today';
  if (days === 0) return 'due today';
  if (days === 1) return 'due tomorrow';
  if (days <= 14) return 'due in ' + days + ' days';
  var months = Math.round(days / 30);
  return 'due in about ' + (months < 1 ? 1 : months) + ' months';
};
