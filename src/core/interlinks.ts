/* ==========================================================
   Procurement 360 — Interlinking Engine
   Connects lessons to calculators, calculators to SOPs,
   and both to examples. The learning loop:
   SEE → UNDERSTAND → CONNECT → PRACTICE → APPLY
   ========================================================== */
import { PS } from '../core/ps.js';

/* Build the interlinking map from content registrations.
   Each academy function references calcs, SOPs, checklists,
   and KB articles. Each calc references back to the lessons
   that teach it. This makes the whole product navigable. */
PS.buildInterlinks = function () {
  var links: Record<string, { lesson: string; calcs: string[]; sops: string[]; examples: string[] }> = {};

  // From academy functions: what each lesson teaches
  (PS.ACADEMY_FUNCTIONS || []).forEach(function (fn) {
    links[fn.id] = {
      lesson: fn.title,
      calcs: fn.calcs || [],
      sops: fn.sops || [],
      examples: (fn.questionBank || []).slice(0, 3).map(function (q) { return q.q; })
    };
  });

  // From calculators: which lesson teaches this calc
  (PS.CALC || []).forEach(function (calc) {
    if (!links[calc.id]) {
      links[calc.id] = { lesson: '', calcs: [], sops: [], examples: [] };
    }
    // Find the lesson that references this calc
    var teachingLesson = '';
    (PS.ACADEMY_FUNCTIONS || []).forEach(function (fn) {
      if ((fn.calcs || []).indexOf(calc.id) >= 0) teachingLesson = fn.title;
    });
    links[calc.id].lesson = teachingLesson;
    links[calc.id].sops = (calc.rel && calc.rel.sops) || [];
  });

  return links;
};

/* Render the "related" section for a calculator page:
   the lesson that teaches it, the SOPs that explain it,
   and a worked example. */
PS.renderCalcInterlinks = function (calcId: string): string {
  var calc = (PS.CALC || []).find(function (c) { return c.id === calcId; });
  if (!calc) return '';

  var links = PS.buildInterlinks();
  var link = links[calcId];
  if (!link) return '';

  var html = '<div class="card" style="margin-top:20px"><div class="card-head"><h3>Learn this tool</h3></div>';

  // The lesson that teaches this calculator
  if (link.lesson) {
    var lessonFn = (PS.ACADEMY_FUNCTIONS || []).find(function (fn) { return fn.title === link.lesson; });
    if (lessonFn) {
      html += '<p style="margin:0 0 12px"><span class="badge badge-type">Lesson</span> ' +
        '<a href="#/academy/' + lessonFn.slug + '">' + PS.esc(link.lesson) + '</a>' +
        ' — the concept behind this calculator.</p>';
    }
  }

  // SOPs that explain the process
  if (link.sops && link.sops.length) {
    html += '<p style="margin:0 0 12px"><span class="badge badge-sop">SOP</span> ' +
      link.sops.map(function (sopId) {
        var sop = (PS.SOPS || []).find(function (s) { return s.id === sopId; });
        return sop ? '<a href="#/sop/' + sop.slug + '">' + PS.esc(sop.title) + '</a>' : '';
      }).filter(Boolean).join(', ') +
      ' — the procedure that uses this tool.</p>';
  }

  // Related calculators
  var relatedCalcs = (calc.handoffTo || []).map(function (id) {
    var c = (PS.CALC || []).find(function (x) { return x.id === id; });
    return c ? '<a href="#/calc/' + c.id + '">' + PS.esc(c.title) + '</a>' : '';
  }).filter(Boolean);
  if (relatedCalcs.length) {
    html += '<p style="margin:0 0 12px"><span class="badge badge-calc">Next</span> ' +
      relatedCalcs.join(', ') + ' — where this leads.</p>';
  }

  // Worked example
  if (calc.example) {
    html += '<details class="acc" style="margin-top:12px"><summary>Worked example</summary>' +
      '<div class="acc-body"><p>This calculator ships with a worked example. ' +
      'Open it, change the inputs, and see how the result moves. ' +
      'Then check your own numbers against the same steps.</p></div></details>';
  }

  html += '</div>';
  return html;
};

/* Render the "practice" section for a lesson page:
   the calculators that apply the lesson, the SOPs that
   use it, and a self-check question. */
PS.renderLessonInterlinks = function (lessonId: string): string {
  var fn = (PS.ACADEMY_FUNCTIONS || []).find(function (f) { return f.id === lessonId; });
  if (!fn) return '';

  var html = '<div class="card" style="margin-top:20px"><div class="card-head"><h3>Practice this lesson</h3></div>';

  // Calculators that apply this lesson
  if (fn.calcs && fn.calcs.length) {
    html += '<p style="margin:0 0 12px"><span class="badge badge-calc">Calculator</span> ' +
      fn.calcs.map(function (calcId) {
        var c = (PS.CALC || []).find(function (x) { return x.id === calcId; });
        return c ? '<a href="#/calc/' + c.id + '">' + PS.esc(c.title) + '</a>' : '';
      }).filter(Boolean).join(', ') +
      ' — apply this lesson.</p>';
  }

  // SOPs that use this lesson
  if (fn.sops && fn.sops.length) {
    html += '<p style="margin:0 0 12px"><span class="badge badge-sop">SOP</span> ' +
      fn.sops.map(function (sopId) {
        var sop = (PS.SOPS || []).find(function (s) { return s.id === sopId; });
        return sop ? '<a href="#/sop/' + sop.slug + '">' + PS.esc(sop.title) + '</a>' : '';
      }).filter(Boolean).join(', ') +
      ' — use this lesson.</p>';
  }

  // Self-check from the question bank
  if (fn.questionBank && fn.questionBank.length) {
    var q = fn.questionBank[0];
    html += '<details class="acc" style="margin-top:12px"><summary>Self-check</summary>' +
      '<div class="acc-body"><p><strong>' + PS.esc(q.q) + '</strong></p>' +
      '<ol type="A">' + q.options.map(function (o) { return '<li>' + PS.esc(o) + '</li>'; }).join('') + '</ol>' +
      '<p class="note">Answer: ' + PS.esc(q.options[q.answer]) + ' — ' + PS.esc(q.why) + '</p></div></details>';
  }

  html += '</div>';
  return html;
};
