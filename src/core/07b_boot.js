/* ---------- optional PWA enhancement (Section 44) ---------- */
PS.pwa = function () {
  try {
    if (location.protocol === 'file:') return; /* standalone HTML mode: no service worker, no manifest fetch */
    if (!document.querySelector('link[rel="manifest"]')) {
      var manifest = {
        name: 'Procure Sherpa v2.0', short_name: 'Procure Sherpa',
        start_url: '.', scope: '.', display: 'standalone',
        background_color: '#f2f5fa', theme_color: '#1d4ed8',
        description: 'Procurement digital learning platform: interactive modules, SOPs, decision guides, checklists, templates, calculators, KPIs and reports.'
      };
      var url = URL.createObjectURL(new Blob([JSON.stringify(manifest)], { type: 'application/manifest+json' }));
      var link = document.createElement('link');
      link.rel = 'manifest'; link.href = url;
      document.head.appendChild(link);
    }
    if ('serviceWorker' in navigator) {
      fetch('sw.js', { method: 'HEAD' }).then(function (r) {
        if (r && r.ok) return navigator.serviceWorker.register('sw.js');
      }).catch(function () { /* standalone mode: no sw.js beside the file, which is expected */ });
    }
  } catch (e) { /* optional enhancement only - the app never depends on it */ }
};

/* ---------- boot ---------- */
PS.boot = function () {
  try {
    PS.migrate();
    PS.applyTheme();
    if (PS.user && PS.user.updateTopbar) PS.user.updateTopbar();
    PS.buildNav();
    PS.wireEvents();
    PS.updateNavCounts();
    PS.bindGlobalKeys();
    PS.renderRoute();
    PS.pwa();
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