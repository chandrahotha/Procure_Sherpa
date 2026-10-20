/* ==========================================================
   Section B: local storage, schema versioning, audit, saved work
   (Section 27, 28, 29, 55, 56, 57, 74)
   ========================================================== */
PS.K = {
  prefs: 'ps_prefs',
  saved: 'ps_saved_work',
  fav: 'ps_favorites',
  recent: 'ps_recent',
  cl: 'ps_checklists',
  tpl: 'ps_templates',
  audit: 'ps_audit',
  schema: 'ps_schema_version',
  nav: 'ps_nav_state',
  draft: 'ps_draft',
  maturity: 'ps_maturity',
  exams: 'ps_exams',
  /* The live spend-model key is ps_spend (PS.spendModel.KEY). It used to be
     ps_spend_model here, so a restored backup wrote the spend model to a
     key nothing read and the page silently fell back to example data. */
  spend: 'ps_spend',
  spendLegacy: 'ps_spend_model',
  copilot: 'ps_copilot',
  docpacks: 'ps_docpacks',
  academy: 'academy_progress',
  labs: 'practice_labs',
  assessment: 'skill_assessment',
  community: 'community_posts',
  user: 'ps_user_profile'
};
/* legacy v1.1.0 keys inspected for migration (Section 55) */
PS.LEGACY = ['ps_saved', 'ps_savedQuotes', 'ps_savedCalculations', 'ps_calculations',
  'ps_quoteComparison', 'ps_savedComparisons', 'ps_settings', 'ps_preferences', 'ps_savedChecklists'];

PS._mem = {};
PS.storageOK = (function () {
  try {
    var k = PS.NS + '__test';
    window.localStorage.setItem(k, '1');
    window.localStorage.removeItem(k);
    return true;
  } catch (e) { return false; }
})();

PS.store = {
  /**
   * Get a value from storage (localStorage or in-memory fallback)
   * @param {string} key - Storage key
   * @param {*} [fallback] - Default value if key not found or parse fails
   * @returns {*} Stored value or fallback
   */
  get: function (key, fallback) {
    try {
      var raw = PS.storageOK ? window.localStorage.getItem(key) : PS._mem[key];
      if (raw === null || raw === undefined) return fallback;
      var v = JSON.parse(raw);
      return (v === null || v === undefined) ? fallback : v;
    } catch (e) {
      PS.warnOnce('storage-read', 'Some saved local data could not be read. Procure Sherpa continued with safe defaults.');
      return fallback;
    }
  },

  /**
   * Set a value in storage
   * @param {string} key - Storage key
   * @param {*} value - Value to store
   * @returns {boolean} True if stored successfully
   */
  set: function (key, value) {
    var raw;
    try { raw = JSON.stringify(value); }
    catch (e) { PS.toast('This item could not be saved.', 'danger'); return false; }
    try {
      if (PS.storageOK) window.localStorage.setItem(key, raw);
      else PS._mem[key] = raw;
      return true;
    } catch (e) {
      var quota = e && (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED' || e.code === 22);
      PS.toast(quota
        ? 'Local storage is full. Export a backup, delete some saved items, then try again.'
        : 'Local storage is unavailable in this browser, so this item was kept for this session only.', 'danger');
      PS._mem[key] = raw;
      return false;
    }
  },

  /**
   * Remove a key from storage
   * @param {string} key
   */
  remove: function (key) {
    try { if (PS.storageOK) window.localStorage.removeItem(key); } catch (e) { }
    delete PS._mem[key];
  },

  /**
   * List all Procure Sherpa keys in localStorage
   * @returns {string[]}
   */
  rawKeys: function () {
    var out = [];
    try {
      for (var i = 0; i < window.localStorage.length; i++) {
        var k = window.localStorage.key(i);
        if (k && k.indexOf(PS.NS) === 0) out.push(k);
      }
    } catch (e) { }
    return out;
  },

  /**
   * Calculate total bytes used by Procure Sherpa in localStorage
   * @returns {number} Approximate bytes used
   */
  bytes: function () {
    var n = 0;
    PS.store.rawKeys().forEach(function (k) { try { n += (window.localStorage.getItem(k) || '').length; } catch (e) { } });
    return n;
  }
};

/**
 * Show a toast warning only once per unique tag
 * @param {string} tag - Unique identifier for this warning type
 * @param {string} msg - Warning message
 */
PS.warnOnce = function (tag, msg) {
  PS._warned = PS._warned || {};
  if (PS._warned[tag]) return;
  PS._warned[tag] = 1;
  PS.toast(msg, 'danger');
};