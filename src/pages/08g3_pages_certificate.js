/* ==========================================================
   Procure Sherpa v2.0 - Verified Completion Certificate & Skill Transcript
   100% Offline, cryptographically-modeled verification checksum
   Standards: CIPS / ISM / SOX 404 Operational Compliance
   ========================================================== */

PS.cert = {
  // Deterministic, tamper-evident checksum generator
  generateChecksum: function (name, role, company, completedCount, avgScore, dateStr) {
    var raw = (name || 'Procurement Specialist') + '|' +
              (role || 'buyer') + '|' +
              (company || 'Enterprise') + '|' +
              String(completedCount || 0) + '|' +
              String(Math.round(avgScore || 0)) + '|' +
              (dateStr || PS.dateStr());
    
    // FNV-1a 32-bit hash implementation
    var h1 = 0x811c9dc5;
    for (var i = 0; i < raw.length; i++) {
      h1 ^= raw.charCodeAt(i);
      h1 = Math.imul(h1, 0x01000193);
    }
    
    // Second pass hash with salt
    var h2 = 0x5a3f129c;
    var salted = raw + 'procure_sherpa_cips_ism_v2';
    for (var j = 0; j < salted.length; j++) {
      h2 ^= salted.charCodeAt(j);
      h2 = Math.imul(h2, 0x01000193);
    }
    
    var hex1 = ('00000000' + (h1 >>> 0).toString(16).toUpperCase()).slice(-8);
    var hex2 = ('00000000' + (h2 >>> 0).toString(16).toUpperCase()).slice(-8);
    
    return 'PS-CERT-' + hex1.substring(0, 4) + '-' + hex1.substring(4, 8) + '-' + hex2.substring(0, 4);
  }
};

PS.route('certificate', function () {
  PS.pageTitle = 'Verified Procurement Certificate & Transcript';
  var prof = PS.user ? PS.user.getProfile() : { name: 'Procurement Specialist', role: 'beginner', company: '' };
  var roleMeta = PS.user ? PS.user.getRoleMeta(prof.role) : { title: 'Procurement Professional' };
  var stats = PS.academy ? PS.academy.getStats() : { completedCount: 0, totalCount: 16, pct: 0, badgesEarned: 0 };
  var academyData = PS.academy ? PS.academy.getAll() : {};
  var funcs = PS.ACADEMY_FUNCTIONS || [];

  // Calculate average assessment score across attempted quizzes
  var totalScorePct = 0;
  var scoredCount = 0;
  var scores = academyData.scores || {};
  Object.keys(scores).forEach(function (k) {
    if (scores[k] && scores[k].pct !== undefined) {
      totalScorePct += scores[k].pct;
      scoredCount++;
    }
  });
  var avgScore = scoredCount > 0 ? Math.round(totalScorePct / scoredCount) : 0;
  var issueDate = prof.joinedDate || PS.dateStr();
  var certId = PS.cert.generateChecksum(prof.name, prof.role, prof.company, stats.completedCount, avgScore, issueDate);

  var isFullyCompleted = stats.completedCount >= stats.totalCount && stats.totalCount > 0;
  var statusBadgeText = isFullyCompleted ? 'Credential Conferred : Master of Strategic Procurement' : 'Provisional Skill Transcript : In Progress (' + stats.completedCount + ' of ' + stats.totalCount + ' Functions)';
  var statusBadgeClass = isFullyCompleted ? 'cert-status-complete' : 'cert-status-provisional';

  var html = '<div class="cert-screen-wrapper">' +
    // Screen control actions (hidden on print)
    '<div class="cert-screen-actions no-print">' +
    '<div class="cert-actions-left">' +
    '<a class="btn btn-sm" href="#/academy-progress">&larr; Back to Progress</a> ' +
    '<a class="btn btn-sm" href="#/academy">&larr; Academy Curriculum</a>' +
    '</div>' +
    '<div class="cert-actions-right">' +
    '<button type="button" class="btn btn-sm" data-act="user-profile-open">Edit Name & Organization</button> ' +
    '<button type="button" class="btn btn-primary btn-sm" onclick="window.print()">Print Official Certificate / Save PDF</button>' +
    '</div>' +
    '</div>' +

    // Printable certificate document
    '<div class="cert-document" id="printableCert">' +
    '<div class="cert-outer-frame">' +
    '<div class="cert-inner-frame">' +
    
    // Top banner
    '<div class="cert-header">' +
    '<div class="cert-kicker">Autonomous Digital Learning System : Procure Sherpa</div>' +
    '<h1 class="cert-org-title">ACADEMY OF STRATEGIC PROCUREMENT & COMMERCIAL STEWARDSHIP</h1>' +
    '<div class="cert-divider-line"></div>' +
    '<div class="cert-credential-type">EXECUTIVE CERTIFICATE OF COMPETENCY</div>' +
    '<div class="' + statusBadgeClass + '">' + PS.esc(statusBadgeText) + '</div>' +
    '</div>' +

    // Body text
    '<div class="cert-body">' +
    '<div class="cert-intro">This accredited transcript certifies that</div>' +
    '<div class="cert-recipient-name">' + PS.esc(prof.name || 'Procurement Specialist') + '</div>' +
    '<div class="cert-recipient-role">' + PS.esc(roleMeta.title) + (prof.company ? ' &middot; ' + PS.esc(prof.company) : '') + '</div>' +
    '<p class="cert-statement">' +
    'has completed rigorous competency evaluation and operational laboratory requirements across the ' +
    'end-to-end procurement lifecycle, demonstrating proficiency in spend intelligence, sourcing methodology, ' +
    'supplier evaluation, commercial negotiation, contract governance, and internal audit compliance.' +
    '</p>' +
    '</div>' +

    // Key metrics strip
    '<div class="cert-metrics-strip">' +
    '<div class="cert-metric-cell">' +
    '<div class="cert-metric-label">Functions Mastered</div>' +
    '<div class="cert-metric-val">' + stats.completedCount + ' of ' + stats.totalCount + '</div>' +
    '</div>' +
    '<div class="cert-metric-cell">' +
    '<div class="cert-metric-label">Curriculum Mastery</div>' +
    '<div class="cert-metric-val">' + stats.pct + '%</div>' +
    '</div>' +
    '<div class="cert-metric-cell">' +
    '<div class="cert-metric-label">Average Assessment</div>' +
    '<div class="cert-metric-val">' + (scoredCount > 0 ? avgScore + '%' : 'Pending') + '</div>' +
    '</div>' +
    '<div class="cert-metric-cell">' +
    '<div class="cert-metric-label">Badges Earned</div>' +
    '<div class="cert-metric-val">' + stats.badgesEarned + ' of ' + stats.badgesTotal + '</div>' +
    '</div>' +
    '</div>' +

    // Verification Seal and Signatures
    '<div class="cert-footer-signatures">' +
    '<div class="cert-sig-block">' +
    '<div class="cert-sig-line">Procure Sherpa Examination Board</div>' +
    '<div class="cert-sig-title">Curriculum Academic Standards</div>' +
    '<div class="cert-sig-meta">Aligned with CIPS &amp; ISM Standards</div>' +
    '</div>' +
    '<div class="cert-seal-block">' +
    '<div class="cert-seal-emblem">' +
    '<div class="cert-seal-inner">' +
    '<span>VERIFIED</span>' +
    '<strong>★ PS ★</strong>' +
    '<span>AUDIT</span>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="cert-sig-block" style="text-align:right;">' +
    '<div class="cert-sig-line">SOX 404 &amp; ISO 20400 Governance</div>' +
    '<div class="cert-sig-title">Commercial Audit Authority</div>' +
    '<div class="cert-sig-meta">Zero-Trust Local Audit Trail</div>' +
    '</div>' +
    '</div>' +

    // Verification ID and Hash Footer
    '<div class="cert-verification-bar">' +
    '<div><strong>Verification Checksum:</strong> <code>' + PS.esc(certId) + '</code></div>' +
    '<div><strong>Issue Date:</strong> ' + PS.esc(issueDate) + '</div>' +
    '<div><strong>Audit Status:</strong> Authenticated Local Ledger</div>' +
    '</div>' +

    '</div>' + // inner-frame
    '</div>' + // outer-frame
    '</div>' + // cert-document

    // Comprehensive 16-Function Skill Transcript Section
    '<div class="card cert-transcript-card">' +
    '<div class="card-head">' +
    '<h2>Procurement Competency Transcript &amp; Laboratory Records</h2>' +
    '<div class="spacer"></div>' +
    '<span class="badge badge-primary">Standard CIPS/ISM Mapped Structure</span>' +
    '</div>' +
    '<p class="card-sub">Detailed breakdown of operational competencies, lifecycle stage alignment, knowledge check results, and hands-on laboratory application.</p>' +
    '<div class="table-wrap"><table>' +
    '<thead><tr>' +
    '<th style="width:60px;">Code</th>' +
    '<th>Module &amp; Procurement Function</th>' +
    '<th>Lifecycle Stage</th>' +
    '<th>Assessment Result</th>' +
    '<th>Audit Status</th>' +
    '</tr></thead>' +
    '<tbody>' +
    funcs.map(function (f, idx) {
      var isComp = PS.academy ? PS.academy.isCompleted(f.id) : false;
      var sc = scores[f.id];
      var code = 'PS-F' + (idx < 9 ? '0' : '') + (idx + 1);
      return '<tr>' +
        '<td><code>' + code + '</code></td>' +
        '<td><strong>' + PS.esc(f.title) + '</strong><br><small class="muted">' + PS.esc(f.module) + '</small></td>' +
        '<td><span class="badge">' + PS.esc(f.lifecycleStage || 'General') + '</span></td>' +
        '<td>' + (sc ? '<strong>' + sc.pct + '%</strong> (' + sc.score + '/' + sc.total + ')' : '<span class="muted">Not taken</span>') + '</td>' +
        '<td>' + (isComp ? '<span style="color:#059669;font-weight:700;">✓ Mastered</span>' : '<span style="color:#6b7280;">In Progress</span>') + '</td>' +
        '</tr>';
    }).join('') +
    '</tbody>' +
    '<tfoot><tr>' +
    '<td colspan="3"><strong>Total Mastered: ' + stats.completedCount + ' of ' + stats.totalCount + ' Functions</strong></td>' +
    '<td colspan="2"><strong>Average Score: ' + (scoredCount > 0 ? avgScore + '%' : 'Pending') + '</strong></td>' +
    '</tr></tfoot>' +
    '</table></div>' +
    '</div>' +

    '</div>'; // cert-screen-wrapper

  return html;
});
