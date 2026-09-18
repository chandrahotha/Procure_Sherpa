/* ==========================================================
   Phase 11 - Static Share Pages (roadmap 11.2)
   Export any route as a self-contained, read-only HTML
   snapshot for Confluence / SharePoint / email / wiki.
   ========================================================== */

PS.staticShare = {
  lastTitle: '',
  lastHtml: '',

  /* Build a standalone HTML document from the current page. */
  build: function (title) {
    var main = PS.$('#main');
    if (!main) return '';
    var clone = main.cloneNode(true);
    /* strip interactive / session-only furniture */
    PS.$$('.no-print, [data-act], form, input, select, textarea, button, .calc-sheet-trigger, .calc-sheet-backdrop', clone)
      .forEach(function (el) { if (el.parentNode) el.parentNode.removeChild(el); });
    /* inline app styles so the snapshot renders identically offline */
    var css = PS.$$('style').map(function (s) { return s.textContent || ''; }).join('\n');
    var body = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1">' +
      '<title>' + PS.esc(title || document.title || 'Procure Sherpa') + '</title>' +
      '<style>' + css + '</style></head><body>' +
      '<div class="share-static-note">Static snapshot of "' + PS.esc(title || '') + '" - generated ' +
      PS.esc(PS.dateTime()) + ' from Procure Sherpa ' + PS.esc(PS.VERSION) + '. Interactive controls were removed; figures are as shown.</div>' +
      '<main class="main">' + clone.innerHTML + '</main>' +
      '<div class="footer" style="text-align:center;padding:20px;color:var(--mute);font-size:.8rem">Prepared with Procure Sherpa - ' +
      PS.esc(PS.dateTime()) + '</div></body></html>';
    return body;
  },

  open: function () {
    var title = (PS.pageTitle || '').replace(/ \|.*$/, '') || document.title || 'Procure Sherpa';
    var html = PS.staticShare.build(title);
    if (!html) { PS.toast('Nothing to share on this page yet.', 'danger'); return; }
    PS.staticShare.lastTitle = title;
    PS.staticShare.lastHtml = html;
    PS.modal({
      title: 'Create a static share page',
      body: '<p>A read-only, self-contained HTML snapshot of this page will be created. It can be pasted into a wiki, SharePoint, Confluence or an email, or saved as a file for archival.</p>' +
        '<p class="note">The snapshot keeps text, tables, charts and figures, but removes buttons, inputs and session controls. It contains the values currently on screen - do not share commercially sensitive figures through unsecured channels.</p>' +
        '<div class="btn-row">' +
        '<button type="button" class="btn btn-primary" data-act="static-share-copy">Copy HTML</button>' +
        '<button type="button" class="btn" data-act="static-share-download">Download .html</button>' +
        '<button type="button" class="btn btn-ghost" data-act="static-share-preview">Preview</button>' +
        '</div>',
      okLabel: 'Close',
      cancelLabel: null
    });
  }
};

PS.acts['share-static'] = function () { PS.staticShare.open(); };
PS.acts['static-share-copy'] = function () {
  if (!PS.staticShare.lastHtml) PS.staticShare.open();
  if (!PS.staticShare.lastHtml) return;
  PS.copy(PS.staticShare.lastHtml, 'Static share HTML');
  PS.audit('static-share-copied', PS.staticShare.lastTitle || document.title);
};
PS.acts['static-share-download'] = function () {
  if (!PS.staticShare.lastHtml) PS.staticShare.open();
  if (!PS.staticShare.lastHtml) return;
  var base = PS.clean((PS.staticShare.lastTitle || 'ProcureSherpa').replace(/[^\w]+/g, '_'), 60);
  PS.download(base + '_' + PS.iso() + '.html', PS.staticShare.lastHtml, 'text/html');
  PS.audit('static-share-downloaded', PS.staticShare.lastTitle || 'page');
};
PS.acts['static-share-preview'] = function () {
  if (!PS.staticShare.lastHtml) PS.staticShare.open();
  if (!PS.staticShare.lastHtml) return;
  try {
    var win = window.open('', '_blank');
    win.document.write(PS.staticShare.lastHtml);
    win.document.close();
    win.focus();
    PS.audit('static-share-previewed', PS.staticShare.lastTitle || 'page');
  } catch (e) { PS.toast('Preview could not be opened.', 'danger'); }
};