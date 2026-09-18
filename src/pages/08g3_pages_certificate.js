/* ==========================================================
   Procure Sherpa - Credential & Skill Transcript (DISABLED)

   We are not a legally authorized issuing body for procurement
   credentials, so certificate generation is turned off and
   replaced with an honest placeholder route below. The original
   tiered-transcript implementation (PS.cert, the real route body,
   PS.certTierStep) is preserved in IMPROVEMENT_ROADMAP.md under
   "Certificates (deferred)" as a reference for a possible future
   release IF a real verification/authorization story exists
   (e.g. server-side signing, or partnering with an actual
   accrediting body).
   ========================================================== */

PS.route('certificate', function () {
  PS.pageTitle = 'Credential & Skill Transcript';
  return '<div class="cert-screen-wrapper">' +
    '<div class="card">' +
    '<div class="card-head"><h1>Not available yet</h1></div>' +
    '<p>Procure Sherpa is not a legally authorized issuer of procurement credentials, ' +
    'so certificate/transcript generation is disabled for now rather than presented ' +
    'as something it is not.</p>' +
    '<p class="muted">This is planned as a possible future feature if a real ' +
    'verification or accreditation path is put in place. Your Academy progress and ' +
    'exam scores are still tracked - see <a href="#/academy-progress">My Progress</a> ' +
    'and <a href="#/exams">Certification Exams</a>.</p>' +
    '<p><a class="btn btn-sm" href="#/academy">&larr; Back to Academy</a></p>' +
    '</div>' +
    '</div>';
});
