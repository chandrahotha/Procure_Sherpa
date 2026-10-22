/* ==========================================================
   Procure Sherpa v2.0 - Interactive Quiz & Assessment Engine
   Section: Escalating Difficulty Curve & Tactical Tip on First Mistake
   Standards: CIPS / ISM / SOX 404 Operational Practice
   ========================================================== */
PS.academyQuiz = PS.academyQuiz || {};

PS.academyQuiz.diffMeta = {
  'foundational': { label: 'Level 1: Operational Basic', cls: 'diff-lvl-1' },
  'intermediate': { label: 'Level 2: Commercial Decision', cls: 'diff-lvl-2' },
  'complicated': { label: 'Level 3: Complicated Trade-Off', cls: 'diff-lvl-3' },
  'expert': { label: 'Level 4: High-Stakes Forensic Crisis', cls: 'diff-lvl-4' }
};

PS.academyQuiz.getDifficulty = function (func, q, idx) {
  if (q.difficulty) return q.difficulty;
  var funcs = PS.ACADEMY_FUNCTIONS || [];
  var fIdx = 0;
  for (var i = 0; i < funcs.length; i++) {
    if (funcs[i].id === func.id) { fIdx = i; break; }
  }
  // Escalating stage-by-stage learning curve
  if (q.type === 'red_flag' || fIdx >= 12) {
    return (idx === 2 || q.type === 'red_flag') ? 'expert' : 'complicated';
  }
  if (q.type === 'scenario' || q.type === 'calc' || fIdx >= 8) {
    return 'complicated';
  }
  if (fIdx >= 4 || idx >= 1) {
    return 'intermediate';
  }
  return 'foundational';
};

PS.academyQuiz.getTip = function (q, func) {
  if (q.tip) return q.tip;
  if (q.principle) {
    return 'Key Operational Principle: ' + q.principle;
  }
  if (q.type === 'calc') {
    return 'Commercial Math Heuristic: Compare the total whole-life landed costs or calculate index-weighted cost shares before accepting supplier claims.';
  }
  if (q.type === 'red_flag') {
    return 'Red Flag Heuristic: Check for conflict of interest, single-source bypass of tender thresholds, order splitting, or lack of independent approvals.';
  }
  return 'Strategic Heuristic: Look beyond baseline purchase price. Verify who bears transit risk, whether segregation of duties is maintained under SOX 404, and whether unbundled cost drivers justify the variance.';
};

PS.academyQuiz.renderSection = function (func) {
  var quizzes = func.quizzes || [];
  if (!quizzes.length) return '';

  var res = PS.academy.getQuizResult(func.id);
  var html = '<div class="quiz-section">' +
    '<div class="card-head">' +
    '<div>' +
    '<span class="badge" style="margin-bottom:6px;display:inline-block;">Escalating Competency Curve</span>' +
    '<h2 style="margin:0;">Interactive Knowledge Checks &amp; Scenarios</h2>' +
    '</div>' +
    '<div class="spacer"></div>' +
    (res ? '<span class="badge badge-primary">Last Score: ' + res.pct + '% (' + res.score + '/' + res.total + ')</span>' : '') +
    '</div>' +
    '<p class="card-sub">Test your practical judgement on realistic procurement dilemmas. The curriculum becomes progressively more complex at every stage. For complicated scenarios, making 1 mistake unlocks an expert tactical tip to guide your second decision attempt.</p>';

  quizzes.forEach(function (q, idx) {
    html += PS.academyQuiz.renderCard(func, q, idx, res);
  });

  html += '</div>';
  return html;
};

PS.academyQuiz.renderCard = function (func, q, idx, res) {
  var funcId = func.id;
  var savedAns = (res && res.answers && res.answers[idx] !== undefined) ? res.answers[idx] : null;
  var cardId = 'quiz_' + funcId + '_' + idx;
  var isSubmitted = savedAns !== null;
  var isCorrect = isSubmitted && q.options[savedAns] && q.options[savedAns].isCorrect;
  var isRecovered = res && res.recovered && res.recovered[idx];

  var diffKey = PS.academyQuiz.getDifficulty(func, q, idx);
  var diff = PS.academyQuiz.diffMeta[diffKey] || PS.academyQuiz.diffMeta.intermediate;
  var isComplicated = (diffKey === 'complicated' || diffKey === 'expert');

  var mistakeState = PS.academy.getMistakeState ? PS.academy.getMistakeState(funcId, idx) : { count: 0, wrongOptions: [] };
  var mistakeCount = mistakeState.count || 0;
  var wrongOptions = mistakeState.wrongOptions || [];

  var typeLabels = {
    'mcq': 'Knowledge Check',
    'scenario': 'What Would You Do?',
    'red_flag': 'Spot the Red Flag',
    'calc': 'Commercial Math Check'
  };

  var html = '<div class="quiz-card" id="' + cardId + '" data-func="' + PS.esc(funcId) + '" data-qidx="' + idx + '" data-diff="' + PS.esc(diffKey) + '">' +
    '<div class="quiz-card-head">' +
    '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
    '<span class="quiz-type-tag ' + PS.esc(q.type || 'mcq') + '">' + PS.esc(typeLabels[q.type] || 'Challenge') + '</span>' +
    '<span class="quiz-diff-tag ' + PS.esc(diff.cls) + '">' + PS.esc(diff.label) + '</span>' +
    '</div>' +
    '<span class="muted" style="font-size:0.78rem">Question ' + (idx + 1) + ' of ' + (func.quizzes.length || 3) + '</span>' +
    '</div>';

  if (q.context) {
    html += '<div class="quiz-scenario-context"><strong>Enterprise Situation:</strong> ' + PS.esc(q.context) + '</div>';
  }

  html += '<div class="quiz-question-text">' + PS.esc(q.q) + '</div>';

  // Render Tactical Tip after 1 mistake on a complicated question
  if (!isSubmitted && isComplicated && mistakeCount === 1) {
    var tipText = PS.academyQuiz.getTip(q, func);
    html += '<div class="quiz-tip-box">' +
      '<div class="quiz-tip-head">' +
      '<span class="quiz-tip-badge">&#9888; 1 Mistake Detected : Strategic Coaching Tip Unlocked</span>' +
      '<span class="quiz-tip-attempt">Attempt 1 of 2</span>' +
      '</div>' +
      '<div class="quiz-tip-title">Your chosen approach introduces critical enterprise risk or audit liability.</div>' +
      '<div class="quiz-tip-text">' + PS.esc(tipText) + '</div>' +
      '<div class="quiz-tip-cta">Review the remaining choices below, apply this heuristic, and submit your corrected decision.</div>' +
      '</div>';
  }

  html += '<div class="quiz-options-list">';
  q.options.forEach(function (opt, optIdx) {
    var isSelected = savedAns === optIdx;
    var isFlawed = !isSubmitted && wrongOptions.indexOf(optIdx) !== -1;
    var optClass = 'quiz-option';

    if (isSubmitted) {
      if (opt.isCorrect) optClass += ' is-correct-reveal';
      else if (isSelected && !opt.isCorrect) optClass += ' is-incorrect-reveal';
    } else if (isFlawed) {
      optClass += ' is-flawed-attempt';
    } else if (isSelected) {
      optClass += ' is-selected';
    }

    html += '<label class="' + optClass + '">' +
      '<input type="radio" name="' + cardId + '_opt" value="' + optIdx + '" ' +
      (isSelected ? 'checked ' : '') + ((isSubmitted || isFlawed) ? 'disabled ' : '') + '>' +
      '<div>' +
      '<span>' + PS.esc(opt.text) + '</span>' +
      (isFlawed ? '<span class="flawed-choice-label">&#9888; Flawed Choice (Attempt 1) : Critical Risk Identified</span>' : '') +
      '</div>' +
      '</label>';
  });
  html += '</div>';

  if (!isSubmitted) {
    var btnLabel = (isComplicated && mistakeCount === 1) ?
      'Apply Strategic Tip &amp; Submit Corrected Decision (Attempt 2 of 2) &rarr;' :
      'Submit &amp; Evaluate Decision';

    html += '<div class="btn-row">' +
      '<button type="button" class="btn btn-primary btn-sm" data-act="academy-quiz-submit" data-func="' + PS.esc(funcId) + '" data-qidx="' + idx + '">' + btnLabel + '</button>' +
      '</div>';
  } else {
    html += '<div class="quiz-feedback ' + (isCorrect ? 'is-correct' : 'is-incorrect') + '">' +
      '<div class="feedback-headline">';

    if (isCorrect && isRecovered) {
      html += '<span>&#10003; Great Recovery! You applied the tactical coaching tip and eliminated the commercial risk.</span>';
    } else if (isCorrect) {
      html += '<span>&#10003; Flawless Decision! Direct hit on first attempt without coaching.</span>';
    } else {
      html += '<span>&#10007; Critical Risk Identified : 2 Attempts Exhausted</span>';
    }
    html += '</div>';

    var correctOpt = q.options.filter(function (o) { return o.isCorrect; })[0];
    html += '<div class="feedback-rationale"><strong>The Real-World Rationale:</strong> ' + PS.esc(correctOpt ? correctOpt.rationale : '') + '</div>';

    var distractorNotes = q.options.filter(function (o) { return !o.isCorrect && o.rationale; });
    if (distractorNotes.length) {
      html += '<div class="feedback-distractors">' +
        '<strong>Why alternative options are dangerous or flawed:</strong>' +
        '<ul>' + distractorNotes.map(function (d) {
          return '<li><em>"' + PS.esc(d.text) + '"</em> &rarr; ' + PS.esc(d.rationale) + '</li>';
        }).join('') + '</ul></div>';
    }

    if (q.calcWork) {
      html += '<div class="alert alert-info" style="margin-top:10px"><strong>Step-by-step Calculation:</strong><br>' + PS.esc(q.calcWork) + '</div>';
    }

    if (q.principle) {
      html += '<div class="procurement-principle-callout">' +
        '<strong>Golden Procurement Principle:</strong> ' + PS.esc(q.principle) +
        '</div>';
    }

    html += '<div class="btn-row" style="margin-top:14px">' +
      '<button type="button" class="btn btn-sm btn-ghost" data-act="academy-quiz-retry" data-func="' + PS.esc(funcId) + '" data-qidx="' + idx + '">Reset &amp; Re-Test Decision</button>' +
      '</div></div>';
  }

  html += '</div>';
  return html;
};

/* ---------- Quiz Actions with Mistake & Tip Handling ---------- */
PS.acts['academy-quiz-submit'] = function (el) {
  var funcId = el.dataset.func;
  var qIdx = parseInt(el.dataset.qidx, 10);
  var func = (PS.ACADEMY_FUNCTIONS || []).filter(function (f) { return f.id === funcId; })[0];
  if (!func || !func.quizzes || !func.quizzes[qIdx]) return;

  var q = func.quizzes[qIdx];
  var card = PS.$('#quiz_' + funcId + '_' + qIdx);
  if (!card) return;

  var sel = PS.$('input[name="quiz_' + funcId + '_' + qIdx + '_opt"]:checked', card);
  if (!sel) {
    PS.toast('Please select an option before submitting.', 'warn');
    return;
  }
  var chosenIdx = parseInt(sel.value, 10);
  var isOptionCorrect = q.options[chosenIdx] && q.options[chosenIdx].isCorrect;

  var diffKey = PS.academyQuiz.getDifficulty(func, q, qIdx);
  var isComplicated = (diffKey === 'complicated' || diffKey === 'expert');

  var mistakeState = PS.academy.getMistakeState ? PS.academy.getMistakeState(funcId, qIdx) : { count: 0 };
  var mistakeCount = mistakeState.count || 0;

  // Check if first mistake on a complicated scenario
  if (!isOptionCorrect && isComplicated && mistakeCount === 0) {
    PS.academy.recordMistake(funcId, qIdx, chosenIdx);
    PS.toast('⚠️ 1 Mistake Detected. Review the tactical coaching tip below and select your corrected decision.', 'warn');
    PS.renderRoute();
    return;
  }

  // Final submission (either correct, or second mistake, or non-complicated)
  var res = PS.academy.getQuizResult(funcId) || { answers: {} };
  var ans = res.answers || {};
  ans[qIdx] = chosenIdx;

  if (isOptionCorrect && mistakeCount === 1) {
    res.recovered = res.recovered || {};
    res.recovered[qIdx] = true;
    PS.toast('✓ Great recovery! You applied the coaching tip and corrected the commercial risk.', 'ok');
  } else if (isOptionCorrect) {
    PS.toast('✓ Flawless decision! Direct hit on first attempt.', 'ok');
  } else {
    PS.toast('Critical risk identified. Review the full audit rationale.', 'err');
  }

  // Clear mistake count on resolution
  if (PS.academy.clearMistake) {
    PS.academy.clearMistake(funcId, qIdx);
  }

  // Calculate cumulative score
  var score = 0;
  var total = func.quizzes.length;
  func.quizzes.forEach(function (qu, i) {
    if (ans[i] !== undefined && qu.options[ans[i]] && qu.options[ans[i]].isCorrect) {
      score++;
    }
  });

  var newBadges = PS.academy.recordQuiz(funcId, score, total, ans, res.recovered);
  if (newBadges && newBadges.length) {
    newBadges.forEach(function (bId) {
      var badge = PS.academy.BADGES.filter(function (b) { return b.id === bId; })[0];
      if (badge) PS.toast('🏆 Badge Unlocked: ' + badge.name + '!', 'ok');
    });
  }

  PS.renderRoute();
};

PS.acts['academy-quiz-retry'] = function (el) {
  var funcId = el.dataset.func;
  var qIdx = parseInt(el.dataset.qidx, 10);
  if (PS.academy.clearMistake) {
    PS.academy.clearMistake(funcId, qIdx);
  }
  var res = PS.academy.getQuizResult(funcId);
  if (res && res.answers) {
    delete res.answers[qIdx];
    if (res.recovered) delete res.recovered[qIdx];
    var data = PS.academy.getAll();
    if (data.scores && data.scores[funcId]) {
      data.scores[funcId].answers = res.answers;
      data.scores[funcId].recovered = res.recovered;
      PS.academy.save(data);
    }
  }
  PS.renderRoute();
};
