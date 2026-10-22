/* ==========================================================
   Procure Sherpa - Honest Credential & Skill Transcript
   Tiered, non-accredited credentials that state exactly what
   was done, who issued them and what they do NOT claim.

   Tiers:
     1 = Learning Transcript (always available)
     2 = Certificate of Program Completion (all functions done)
     3 = Certified Procurement Professional - Exam-Verified
         (completion + pass of the timed certification exam)
   ========================================================== */

PS.cert = {
  /* Deterministic, tamper-evident checksum generator.
     Includes the tier key + exam score so a lower-tier or forged
     credential does not verify against a higher tier. */
  generateChecksum: function (name, role, company, completedCount, avgScore, tierKey, examScore, dateStr) {
    var raw = (name || 'Procurement Specialist') + '|' +
              (role || 'buyer') + '|' +
              (company || 'Enterprise') + '|' +
              String(completedCount || 0) + '|' +
              String(Math.round(avgScore || 0)) + '|' +
              (tierKey || 'transcript') + '|' +
              String(Math.round(examScore || 0)) + '|' +
              (dateStr || PS.dateStr());

    var h1 = 0x811c9dc5;
    for (var i = 0; i < raw.length; i++) {
      h1 ^= raw.charCodeAt(i);
      h1 = Math.imul(h1, 0x01000193);
    }

    var h2 = 0x5a3f129c;
    var salted = raw + 'procure_sherpa_local_v2';
    for (var j = 0; j < salted.length; j++) {
      h2 ^= salted.charCodeAt(j);
      h2 = Math.imul(h2, 0x01000193);
    }

    var hex1 = ('00000000' + (h1 >>> 0).toString(16).toUpperCase()).slice(-8);
    var hex2 = ('00000000' + (h2 >>> 0).toString(16).toUpperCase()).slice(-8);

    return 'PS-CERT-' + hex1.substring(0, 4) + '-' + hex1.substring(4, 8) + '-' + hex2.substring(0, 4);
  },

  /* Resolve the current credential tier from live progress + exam history. */
  tier: function (stats, examBestPct) {
    var allDone = stats.totalCount > 0 && stats.completedCount >= stats.totalCount;
    if (allDone && examBestPct >= 70) {
      return { key: 'certified', level: 3, label: 'Certified Procurement Professional', sub: 'Exam-Verified' };
    }
    if (allDone) {
      return { key: 'completion', level: 2, label: 'Certificate of Program Completion', sub: 'Self-directed curriculum' };
    }
    return { key: 'transcript', level: 1, label: 'Procurement Learning Transcript', sub: 'Progress record' };
  },

  /* Best exam score across the full certification exam, or 0. */
  bestExamScore: function () {
    var best = 0;
    (PS.exams ? PS.exams.history() : []).forEach(function (a) {
      if (a.bank === 'cert-full' && a.pct > best) best = a.pct;
    });
    return best;
  },

  /* Honest statement of exactly what was done - no invented honors. */
  statementFor: function (tier, stats, avgScore, examBest) {
    if (tier.key === 'transcript') {
      return 'This record shows learning activity in the Procure Sherpa Academy: functions completed, assessment scores and laboratory practice. It is a progress transcript, not a certification.';
    }
    if (tier.key === 'completion') {
      return 'has completed the self-directed Procure Sherpa Academy curriculum, covering ' + stats.completedCount +
        ' procurement functions with an average assessment score of ' + (avgScore > 0 ? avgScore + '%' : 'n/a') +
        '. This confirms completion of the course material; it is not an independently accredited qualification.';
    }
    return 'has completed the Procure Sherpa Academy curriculum (' + stats.completedCount +
      ' functions, average assessment ' + (avgScore > 0 ? avgScore + '%' : 'n/a') +
      ') AND passed the timed certification examination with a score of ' + examBest +
      '%. This is a platform-issued, exam-verified record; it is not an externally accredited qualification.';
  }
};

PS.route('certificate', function () {
  PS.pageTitle = 'Credential & Skill Transcript';
  var prof = PS.user ? PS.user.getProfile() : { name: 'Procurement Specialist', role: 'beginner', company: '' };
  var roleMeta = PS.user ? PS.user.getRoleMeta(prof.role) : { title: 'Procurement Professional' };
  var stats = PS.academy ? PS.academy.getStats() : { completedCount: 0, totalCount: 16, pct: 0, badgesEarned: 0 };
  var academyData = PS.academy ? PS.academy.getAll() : {};
  var funcs = PS.ACADEMY_FUNCTIONS || [];

  var totalScorePct = 0, scoredCount = 0;
  var scores = academyData.scores || {};
  Object.keys(scores).forEach(function (k) {
    if (scores[k] && scores[k].pct !== undefined) { totalScorePct += scores[k].pct; scoredCount++; }
  });
  var avgScore = scoredCount > 0 ? Math.round(totalScorePct / scoredCount) : 0;
  var examBest = PS.cert.bestExamScore();
  var tier = PS.cert.tier(stats, examBest);
  var issueDate = prof.joinedDate || PS.dateStr();
  var certId = PS.cert.generateChecksum(prof.name, prof.role, prof.company, stats.completedCount, avgScore, tier.key, examBest, issueDate);

  var isTranscript = tier.key === 'transcript';
  var statusText = isTranscript
    ? 'Learning transcript \u00B7 ' + stats.completedCount + ' of ' + stats.totalCount + ' functions complete'
    : (tier.key === 'completion' ? 'Program completed' : 'Exam-verified \u00B7 passed at ' + examBest + '%');
  var statusClass = tier.key === 'transcript' ? 'cert-status-provisional' : 'cert-status-complete';

  var html = '<div class="cert-screen-wrapper">' +
    '<div class="cert-screen-actions no-print">' +
    '<div class="cert-actions-left">' +
    '<a class="btn btn-sm" href="#/academy-progress">&larr; Back to Progress</a> ' +
    '<a class="btn btn-sm" href="#/academy">&larr; Academy Curriculum</a>' +
    '</div>' +
    '<div class="cert-actions-right">' +
    '<button type="button" class="btn btn-sm" data-act="user-profile-open">Edit Name & Organization</button> ' +
    '<button type="button" class="btn btn-primary btn-sm" data-act="print">Print / Save PDF</button>' +
    '</div>' +
    '</div>' +

    '<h1 class="cert-page-title">Credential &amp; Skill Transcript</h1>' +

    '<div class="card no-print">' +
    '<div class="card-head"><h2>What this credential means</h2><div class="spacer"></div><span class="badge">Tier ' + tier.level + ' of 3</span></div>' +
    '<div class="tier-strip">' +
    PS.certTierStep(1, 'Transcript', tier.level >= 1, 'Progress + scores are always recorded') +
    PS.certTierStep(2, 'Completion', tier.level >= 2, 'All ' + stats.totalCount + ' functions completed') +
    PS.certTierStep(3, 'Exam-verified', tier.level >= 3, 'Timed exam passed at \u2265 70%') +
    '</div>' +
    '<p class="note">Procure Sherpa is a learning platform, not an accreditation body. Every credential states exactly what was completed and what it does not claim. The verification hash is generated on this device; it is not an external certification and should not be presented as one.</p>' +
    (tier.key !== 'transcript' && tier.level < 3 ? '<div class="alert alert-info"><strong>To reach Tier 3:</strong> open <a href="#/exams">Certification Exams</a> and pass the full certification exam at 70% or higher. Completion alone stops at Tier 2.</div>' : '') +
    '</div>' +

    '<div class="cert-document" id="printableCert">' +
    '<div class="cert-outer-frame"><div class="cert-inner-frame">' +

    '<div class="cert-header">' +
    '<div class="cert-kicker">Procure Sherpa Academy \u00B7 ' + PS.esc(tier.sub) + '</div>' +
    '<h1 class="cert-org-title">' + PS.esc(tier.label) + '</h1>' +
    '<div class="cert-divider-line"></div>' +
    '<div class="cert-credential-type">' + PS.esc(tier.sub) + '</div>' +
    '<div class="' + statusClass + '">' + PS.esc(statusText) + '</div>' +
    '</div>' +

    '<div class="cert-body">' +
    '<div class="cert-intro">This record confirms that</div>' +
    '<div class="cert-recipient-name">' + PS.esc(prof.name || 'Procurement Specialist') + '</div>' +
    '<div class="cert-recipient-role">' + PS.esc(roleMeta.title) + (prof.company ? ' &middot; ' + PS.esc(prof.company) : '') + '</div>' +
    '<p class="cert-statement">' + PS.cert.statementFor(tier, stats, avgScore, examBest) + '</p>' +
    '</div>' +

    '<div class="cert-metrics-strip">' +
    '<div class="cert-metric-cell"><div class="cert-metric-label">Functions Mastered</div><div class="cert-metric-val">' + stats.completedCount + ' of ' + stats.totalCount + '</div></div>' +
    '<div class="cert-metric-cell"><div class="cert-metric-label">Curriculum Mastery</div><div class="cert-metric-val">' + stats.pct + '%</div></div>' +
    '<div class="cert-metric-cell"><div class="cert-metric-label">Average Assessment</div><div class="cert-metric-val">' + (scoredCount > 0 ? avgScore + '%' : 'Pending') + '</div></div>' +
    '<div class="cert-metric-cell"><div class="cert-metric-label">Certification Exam</div><div class="cert-metric-val">' + (examBest > 0 ? examBest + '%' : 'Not taken') + '</div></div>' +
    '</div>' +

    '<div class="cert-footer-signatures">' +
    '<div class="cert-sig-block">' +
    '<div class="cert-sig-line">Procure Sherpa Academy</div>' +
    '<div class="cert-sig-title">Platform issuer</div>' +
    '<div class="cert-sig-meta">Issued by the learning platform</div>' +
    '</div>' +
    '<div class="cert-seal-block"><div class="cert-seal-emblem"><div class="cert-seal-inner"><span>' + (tier.level >= 3 ? 'VERIFIED' : 'RECORD') + '</span><strong>★ PS ★</strong><span>LOCAL</span></div></div></div>' +
    '<div class="cert-sig-block" style="text-align:right;">' +
    '<div class="cert-sig-line">Content reference</div>' +
    '<div class="cert-sig-title">CIPS / ISM frameworks</div>' +
    '<div class="cert-sig-meta">Aligned content, not accreditation</div>' +
    '</div>' +
    '</div>' +

    '<div class="cert-verification-bar">' +
    '<div><strong>Verification ID:</strong> <code>' + PS.esc(certId) + '</code></div>' +
    '<div><strong>Issue Date:</strong> ' + PS.esc(issueDate) + '</div>' +
    '<div><strong>Credential tier:</strong> Tier ' + tier.level + '</div>' +
    '</div>' +

    '</div></div></div>' +

    '<div class="card cert-transcript-card">' +
    '<div class="card-head"><h2>Procurement Competency Transcript</h2><div class="spacer"></div>' +
    '<span class="badge badge-primary">CIPS / ISM referenced structure</span></div>' +
    '<p class="card-sub">Per-function completion, assessment results and audit status. This table is the evidence behind the credential above.</p>' +
    '<div class="table-wrap"><table><thead><tr>' +
    '<th style="width:60px;">Code</th><th>Module &amp; Function</th><th>Lifecycle Stage</th><th>Assessment</th><th>Status</th>' +
    '</tr></thead><tbody>' +
    funcs.map(function (f, idx) {
      var isComp = PS.academy ? PS.academy.isCompleted(f.id) : false;
      var sc = scores[f.id];
      var code = 'PS-F' + (idx < 9 ? '0' : '') + (idx + 1);
      return '<tr>' +
        '<td><code>' + code + '</code></td>' +
        '<td><strong>' + PS.esc(f.title) + '</strong><br><small class="muted">' + PS.esc(f.module) + '</small></td>' +
        '<td><span class="badge">' + PS.esc(f.lifecycleStage || 'General') + '</span></td>' +
        '<td>' + (sc ? '<strong>' + sc.pct + '%</strong> (' + sc.score + '/' + sc.total + ')' : '<span class="muted">Not taken</span>') + '</td>' +
        '<td>' + (isComp ? '<span style="color:#059669;font-weight:700;">✓ Complete</span>' : '<span style="color:#6b7280;">In Progress</span>') + '</td>' +
        '</tr>';
    }).join('') +
    '</tbody><tfoot><tr>' +
    '<td colspan="3"><strong>Total: ' + stats.completedCount + ' of ' + stats.totalCount + ' functions complete</strong></td>' +
    '<td colspan="2"><strong>Average: ' + (scoredCount > 0 ? avgScore + '%' : 'Pending') + '</strong></td>' +
    '</tr></tfoot></table></div>' +
    '<div class="alert alert-warn no-print" style="margin-top:14px"><strong>Honest verification note.</strong> ' +
    'The verification ID is a locally generated checksum of the details shown here. It proves the record has not been altered on this device; it is not issued by, or registered with, CIPS, ISM, SOX or any external body, and it is not a formal qualification. Present it as a learning record, not as an accredited certificate.</div>' +
    '</div>' +

    '</div>';

  return html;
});

/* Small visual step for the tier strip. */
PS.certTierStep = function (n, label, achieved, desc) {
  return '<div class="tier-step' + (achieved ? ' is-achieved' : '') + '">' +
    '<div class="tier-step-num">' + n + '</div>' +
    '<div class="tier-step-body"><div class="tier-step-label">' + PS.esc(label) + '</div>' +
    '<div class="tier-step-desc">' + PS.esc(desc) + '</div></div>' +
    (achieved ? '<div class="tier-step-check">\u2713</div>' : '') +
    '</div>';
};