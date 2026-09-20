/* ---------- PWA: intentionally not implemented ----------
   An earlier build registered a service worker and injected a web app
   manifest here. Both were dead code, and are removed rather than left
   in place looking like a feature:

     * The Content-Security-Policy in src/base/01a_head.html sets
       default-src 'none' and connect-src 'none', so the fetch('sw.js')
       probe and the blob: manifest link were blocked by our own policy
       on every hosted load. A catch swallowed the failures, so nothing
       ever surfaced.
     * No sw.js has ever existed in this repository, so even without the
       CSP the probe could only 404.
     * It contradicted the "no network calls at runtime" claim in the
       README - the one property this project most needs to be literally
       true, and the reason connect-src is 'none' in the first place.

   Installability is not worth loosening the CSP or shipping a second
   file that breaks the single-file premise: the app is already fully
   offline because it IS one file. If a PWA is ever genuinely wanted it
   needs a real sw.js, an explicit manifest-src and connect-src 'self',
   and a README change - not a silent probe. */

/* ---------- boot ---------- */
PS.boot = function () {
  try {
    PS.migrate();
    PS.applyTheme();
    PS.startThemeScheduler();
    if (PS.i18n && PS.i18n.applyDom) PS.i18n.applyDom();
    if (PS.user && PS.user.updateTopbar) PS.user.updateTopbar();
    PS.buildNav();
    PS.wireEvents();
    PS.updateNavCounts();
    PS.bindGlobalKeys();
    PS.renderRoute();
    if (!PS.storageOK) PS.audit('storage-unavailable', 'Browser storage is blocked; running in session-only mode');
    PS.audit('app-opened', 'Procure Sherpa v' + PS.VERSION + (PS.storageOK ? '' : ' (session-only)'));
  } catch (e) {
    if (window.console && console.error) console.error(e);
    var main = PS.$('#main');
    if (main) {
      main.innerHTML = '<div class="alert alert-danger"><strong>Procure Sherpa could not start completely.</strong>' +
        'Reload the page to try again. If the problem continues, open the file in an up-to-date browser such as Chrome, Edge, Firefox or Safari. Locally saved data is not affected.</div>';
    }
  }
};
/* deferral guarantees the data fragments have all executed before first render */
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', PS.boot);
else setTimeout(PS.boot, 0);