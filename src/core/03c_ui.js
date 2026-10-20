/* ---------- toast + modal framework ---------- */
PS.toast = function (msg, kind) {
  var container = PS.$('#toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  var t = document.createElement('div');
  t.className = 'toast' + (kind ? ' is-' + kind : '');
  t.textContent = PS.clean(msg, 400);
  t.setAttribute('role', 'alert');
  t.setAttribute('aria-live', 'polite');
  container.appendChild(t);
  clearTimeout(t._toastT);
  t._toastT = setTimeout(function () {
    t.style.animation = 'toast-out .18s ease-in forwards';
    setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 180);
  }, 3400);
};

PS.toastContainer = function () {
  var container = PS.$('#toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  return container;
};

/* Keyboard shortcuts help panel */
PS.kbdHelp = {
  isOpen: false,
  sections: [
    { title: 'Global Navigation', items: [
      { kbd: 'Ctrl+K / /', desc: 'Open Command Palette' },
      { kbd: 'Ctrl+Shift+K', desc: 'Open Keyboard Shortcuts Help' },
      { kbd: 'Esc', desc: 'Close modals, palettes, sidebars' },
      { kbd: 'Alt+Left / Alt+Right', desc: 'Navigate history back/forward' }
    ]},
    { title: 'Sidebar & Search', items: [
      { kbd: 'Ctrl+B', desc: 'Toggle sidebar' },
      { kbd: 'Ctrl+F', desc: 'Focus global search' },
      { kbd: '/', desc: 'Focus command palette (when not in input)' }
    ]},
    { title: 'Command Palette', items: [
      { kbd: '↑ / ↓', desc: 'Navigate results' },
      { kbd: 'Enter', desc: 'Open selected item' },
      { kbd: 'Tab', desc: 'Switch filter chips' },
      { kbd: '1-6', desc: 'Quick filter: 1=All, 2=Academy, 3=SOPs, 4=Calculators, 5=Checklists, 6=Templates' }
    ]},
    { title: 'Calculators', items: [
      { kbd: 'Enter', desc: 'Calculate (when in input field)' },
      { kbd: 'Ctrl+Enter', desc: 'Calculate from anywhere in calculator' },
      { kbd: 'Ctrl+R', desc: 'Reset calculator' },
      { kbd: 'Ctrl+E', desc: 'Load example data' },
      { kbd: 'Ctrl+S', desc: 'Save calculation' },
      { kbd: 'Ctrl+P', desc: 'Print report' }
    ]},
    { title: 'Academy & Learning', items: [
      { kbd: 'G A', desc: 'Go to Academy hub' },
      { kbd: 'G P', desc: 'Go to Progress/Transcript' },
      { kbd: 'G C', desc: 'Go to Certificate' },
      { kbd: 'Tab / Shift+Tab', desc: 'Navigate quiz options' },
      { kbd: 'Enter', desc: 'Submit quiz answer' }
    ]},
    { title: 'Quick Go (G + key)', items: [
      { kbd: 'G H', desc: 'Home / Command Center' },
      { kbd: 'G O', desc: 'Operations Hub' },
      { kbd: 'G A', desc: 'Academy Hub' },
      { kbd: 'G S', desc: 'Saved Work' },
      { kbd: 'G B', desc: 'Backup / Restore' },
      { kbd: 'G T', desc: 'Settings' }
    ]}
  ],

  open: function () {
    var self = this;
    if (self.isOpen) return;
    self.isOpen = true;

    var backdrop = document.createElement('div');
    backdrop.className = 'kbd-help-backdrop';
    backdrop.id = 'kbdHelpBackdrop';
    document.body.appendChild(backdrop);

    var panel = document.createElement('div');
    panel.className = 'kbd-help-panel';
    panel.id = 'kbdHelpPanel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-labelledby', 'kbdHelpTitle');

    var html = '<div class="kbd-help-header">' +
      '<h2 id="kbdHelpTitle">Keyboard Shortcuts</h2>' +
      '<div style="display:flex;gap:8px;align-items:center">' +
      '<button type="button" class="btn btn-ghost btn-sm" data-act="print-kbd">Print Cheat Sheet</button>' +
      '<button type="button" class="kbd-help-close" aria-label="' + (PS.i18n ? PS.i18n.t('common.close') : 'Close') + '" title="' + (PS.i18n ? PS.i18n.t('common.close') : 'Close') + '" data-i18n-title="common.close">&times;</button>' +
      '</div>' +
      '</div><div class="kbd-help-body">';

    self.sections.forEach(function (sec) {
      html += '<div class="kbd-help-section"><h3>' + PS.esc(sec.title) + '</h3><div class="kbd-help-grid">';
      sec.items.forEach(function (item) {
        html += '<kbd>' + PS.esc(item.kbd) + '</kbd><span>' + PS.esc(item.desc) + '</span>';
      });
      html += '</div></div>';
    });

    html += '</div>';
    panel.innerHTML = html;
    document.body.appendChild(panel);

    // Animate in
    requestAnimationFrame(function () {
      backdrop.classList.add('is-open');
      panel.classList.add('is-open');
    });

    // Close handlers
    var close = function () {
      backdrop.classList.remove('is-open');
      panel.classList.remove('is-open');
      setTimeout(function () {
        if (backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
        if (panel.parentNode) panel.parentNode.removeChild(panel);
        self.isOpen = false;
      }, 160);
    };

    backdrop.addEventListener('click', close);
    panel.querySelector('.kbd-help-close').addEventListener('click', close);
    document.addEventListener('keydown', function onKey(e) {
      if (e.key === 'Escape') {
        close();
        document.removeEventListener('keydown', onKey);
      }
    });
  },

  close: function () {
    var backdrop = PS.$('#kbdHelpBackdrop');
    var panel = PS.$('#kbdHelpPanel');
    if (backdrop) backdrop.classList.remove('is-open');
    if (panel) panel.classList.remove('is-open');
    this.isOpen = false;
  },

  toggle: function () {
    if (this.isOpen) this.close(); else this.open();
  },

  /* Printable cheat sheet */
  printCheatSheet: function () {
    var self = this;
    var html = '<!DOCTYPE html><html><head><title>Procure Sherpa - Keyboard Shortcuts Cheat Sheet</title>' +
      '<style>' +
      '@page { margin: 12mm; size: A4; }' +
      'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 11pt; line-height: 1.5; color: #000; }' +
      'h1 { font-size: 18pt; margin: 0 0 4pt; border-bottom: 2px solid #333; padding-bottom: 4pt; }' +
      'h2 { font-size: 13pt; margin: 16pt 0 6pt; color: #333; border-bottom: 1px solid #999; padding-bottom: 2pt; }' +
      'table { width: 100%; border-collapse: collapse; margin-bottom: 12pt; font-size: 10pt; }' +
      'th, td { border: 1px solid #ccc; padding: 4pt 6pt; text-align: left; vertical-align: top; }' +
      'th { background: #f0f0f0; font-weight: bold; width: 30%; }' +
      'kbd { font-family: "SF Mono", "Fira Code", Consolas, monospace; background: #f5f5f5; border: 1px solid #ddd; border-radius: 3px; padding: 1px 5px; font-size: 9.5pt; white-space: nowrap; }' +
      '.footer { margin-top: 24pt; font-size: 8pt; color: #666; text-align: center; }' +
      '@media print { .no-print { display: none !important; } }' +
      '</style></head><body>' +
      '<h1>Procure Sherpa — Keyboard Shortcuts Cheat Sheet</h1>' +
      '<p style="margin: 4pt 0 16pt; color: #666;">Offline-first procurement toolkit | <span id="printDate"></span></p>';

    self.sections.forEach(function (sec) {
      html += '<h2>' + PS.esc(sec.title) + '</h2><table><tbody>';
      sec.items.forEach(function (item) {
        html += '<tr><td><kbd>' + PS.esc(item.kbd) + '</kbd></td><td>' + PS.esc(item.desc) + '</td></tr>';
      });
      html += '</tbody></table>';
    });

    html += '<div class="footer">Generated from Procure Sherpa | ' +
      'Press Ctrl+P to print/save as PDF | All shortcuts work offline</div>' +
      '<scr' + 'ipt>document.getElementById("printDate").textContent = new Date().toLocaleString();</scr' + 'ipt>' +
      '</body></html>';

    var win = window.open('', '_blank');
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(function () { win.print(); }, 300);
  }
};

/* Global keyboard shortcuts */
PS.bindGlobalKeys = function () {
  if (PS._globalKeysBound) return;
  PS._globalKeysBound = true;

  document.addEventListener('keydown', function (e) {
    // Ignore when in input/textarea/select
    var target = e.target;
    var isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.isContentEditable);

    /* Ctrl+K and "/" are handled once, in the boot wiring (07a2). Two
       independent listeners opened the command palette twice per press. */

    // Ctrl+Shift+K - Keyboard shortcuts help
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'K') {
      e.preventDefault();
      PS.kbdHelp.toggle();
    }

    // Alt+Left/Right - History navigation
    if (e.altKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
      e.preventDefault();
      if (e.key === 'ArrowLeft') window.history.back();
      else window.history.forward();
    }

    // Ctrl+B - Toggle sidebar
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      /* Go through PS.toggleNav so the scrim and aria-expanded stay in
         step. Toggling the class alone left the scrim hidden and the
         button's state stale, and did nothing at all on desktop. */
      PS.toggleNav();
    }

    // Quick Go shortcuts (G + key) - only when not in input
    if (!isInput && e.key.toLowerCase() === 'g') {
      // We'll handle the next key in a keyup handler
      PS._goMode = true;
      setTimeout(function () { PS._goMode = false; }, 1000);
    } else if (PS._goMode && !isInput) {
      var goMap = {
        'h': '#/home', 'o': '#/operations', 'a': '#/academy',
        'p': '#/academy-progress', 'c': '#/certificate',
        's': '#/saved', 'b': '#/backup', 't': '#/settings',
        'w': '#/what', 'd': '#/dash-savings', 'm': '#/maturity'
      };
      var route = goMap[e.key.toLowerCase()];
      if (route) {
        e.preventDefault();
        window.location.hash = route;
        PS._goMode = false;
      }
    }
  });
};

/* Calculator loading state */
PS.setCalcLoading = function (isLoading) {
  var form = PS.$('#calcForm');
  var results = PS.$('.calc-panel-results, #calcResults');
  if (form) form.classList.toggle('calc-loading', isLoading);
  if (results) results.classList.toggle('calc-loading', isLoading);
};
PS.modal = function (opts) {
  opts = opts || {};
  var root = PS.$('#modalRoot');
  var prevFocus = document.activeElement;
  root.innerHTML = '<div class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modalTitle">' +
    '<div class="modal' + (opts.wide ? ' modal-wide' : '') + '">' +
    '<h2 id="modalTitle">' + PS.esc(opts.title || 'Confirm') + '</h2>' +
    '<div class="modal-body" id="modalBody">' + (opts.body || '') + '</div>' +
    '<div class="modal-actions">' +
    (opts.cancelLabel === null ? '' : '<button type="button" class="btn" data-modal="cancel" data-i18n="common.cancel">' + PS.esc(opts.cancelLabel || (PS.i18n ? PS.i18n.t('common.cancel') : 'Cancel')) + '</button>') +
    '<button type="button" class="btn ' + (opts.danger ? 'btn-danger' : 'btn-primary') + '" data-modal="ok" data-i18n="common.confirm">' + PS.esc(opts.okLabel || (PS.i18n ? PS.i18n.t('common.confirm') : 'Confirm')) + '</button>' +
    '</div></div></div>';
  var back = PS.$('.modal-backdrop', root);
  var modal = PS.$('.modal', root);
  
  // Focus trap
  var focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  var getFocusable = function () { return Array.from(modal.querySelectorAll(focusableSelector)).filter(function (el) { return el.offsetWidth > 0 || el.offsetHeight > 0; }); };
  
  function close() {
    root.innerHTML = '';
    document.removeEventListener('keydown', onKey);
    if (prevFocus && prevFocus.focus) { try { prevFocus.focus(); } catch (e) { } }
  }
  function onKey(e) { 
    if (e.key === 'Escape') { close(); if (opts.onCancel) opts.onCancel(); }
    else if (e.key === 'Tab') { trapFocus(e); }
  }
  function trapFocus(e) {
    var focusable = getFocusable();
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }
  document.addEventListener('keydown', onKey);
  back.addEventListener('click', function (e) {
    if (e.target === back) { close(); if (opts.onCancel) opts.onCancel(); }
  });
  var cab = PS.$('[data-modal="cancel"]', root);
  if (cab) cab.addEventListener('click', function () { close(); if (opts.onCancel) opts.onCancel(); });
  PS.$('[data-modal="ok"]', root).addEventListener('click', function () {
    if (opts.onOk && opts.onOk(back) === false) return;
    close();
  });
  var first = PS.$('#modalBody input, #modalBody select, #modalBody textarea', root) || PS.$('.modal-actions .btn-primary', root);
  if (first) { try { first.focus(); if (first.select && first.type !== 'checkbox') first.select(); } catch (e) { } }
  return { el: back, close: close };
};
PS.closeModal = function () {
  var root = PS.$('#modalRoot');
  if (root) root.innerHTML = '';
};
PS.confirm = function (o) {
  o = o || {};
  return PS.modal({
    title: o.title || 'Please confirm',
    body: o.body || '',
    okLabel: o.okLabel || 'Confirm',
    cancelLabel: o.cancelLabel || 'Cancel',
    danger: o.danger, wide: o.wide, onOk: o.onOk, onCancel: o.onCancel
  });
};
PS.promptText = function (o) {
  o = o || {};
  return PS.modal({
    title: o.title || 'Enter a value',
    body: '<div class="field"><label for="promptVal">' + PS.esc(o.label || 'Value') + '</label>' +
      '<input type="text" id="promptVal" value="' + PS.esc(o.value || '') + '" maxlength="160"></div>' +
      (o.hint ? '<p class="note">' + PS.esc(o.hint) + '</p>' : ''),
    okLabel: o.okLabel || (PS.i18n ? PS.i18n.t('common.save') : 'Save'),
    onOk: function (root) {
      var v = PS.clean(PS.$('#promptVal', root).value, 160);
      if (!v) { PS.toast('A value is required.', 'danger'); return false; }
      if (o.onOk) o.onOk(v);
    }
  });
};
/* footer note helper used by many pages */
PS.withDisclaimer = function (kind) {
  var D = {
    policy: 'Approval thresholds and procurement requirements vary by organization. Configure Procure Sherpa in Settings to match your company policy before operational use.',
    tax: 'Tax treatment varies by jurisdiction and transaction type. Verify applicable tax rules before using results for accounting or compliance decisions.',
    legal: 'Contract and legal guidance on this platform is general procurement information and is not a substitute for qualified legal advice.',
    finance: 'Financial calculations are decision-support estimates. Validate assumptions before committing funds.',
    data: 'Results depend entirely on the figures you enter. Procure Sherpa does not verify or benchmark supplier data.'
  };
  return '<p class="disclaimer">' + PS.esc(D[kind] || D.data) + '</p>';
};