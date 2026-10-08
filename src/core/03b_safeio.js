/* ---------- CSV safety (Section 34: CSV injection protection) ---------- */

/**
 * Sanitize a cell for CSV output (prevents formula injection)
 * @param {*} v - Cell value
 * @returns {string} Sanitized cell
 */
PS.csvCell = function (v) {
  var s = v === null || v === undefined ? '' : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  if (/[",\r\n]/.test(s)) s = '"' + s.replace(/"/g, '""') + '"';
  return s;
};

/**
 * Build CSV string from headers and rows
 * @param {string[]} headers - Column headers
 * @param {Array<Array<*>>} rows - Data rows
 * @returns {string} CSV content with CRLF line endings
 */
PS.toCSV = function (headers, rows) {
  var out = [headers.map(PS.csvCell).join(',')];
  (rows || []).forEach(function (r) { out.push(r.map(PS.csvCell).join(',')); });
  return out.join('\r\n');
};

/**
 * Trigger file download in browser
 * @param {string} filename - Suggested filename
 * @param {string} text - File content
 * @param {string} [mime] - MIME type
 * @returns {boolean} True if download was triggered
 */
PS.download = function (filename, text, mime) {
  try {
    var blob = new Blob([text], { type: (mime || 'text/plain') + ';charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = PS.clean(filename, 120) || 'download.txt';
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(url); if (a.parentNode) a.parentNode.removeChild(a); }, 400);
    return true;
  } catch (e) {
    PS.toast('Download is not available in this browser. Use Print instead.', 'danger');
    return false;
  }
};

/**
 * Copy text to clipboard (modern API with legacy fallback)
 * @param {string} text - Text to copy
 * @param {string} [label] - Context label for toast message
 */
PS.copy = function (text, label) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () { PS.toast((label || 'Copied') + ' to clipboard', 'ok'); },
        function () { PS.legacyCopy(text, label); });
      return;
    }
  } catch (e) { /* fall through to legacy path */ }
  PS.legacyCopy(text, label);
};

/**
 * Legacy copy fallback using execCommand
 * @param {string} text
 * @param {string} [label]
 */
PS.legacyCopy = function (text, label) {
  try {
    var ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', 'readonly');
    ta.style.position = 'fixed'; ta.style.left = '-9999px';
    document.body.appendChild(ta); ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    PS.toast((label || 'Copied') + ' to clipboard', 'ok');
  } catch (e) { PS.toast('Copy is not available in this browser.', 'danger'); }
};

/* ---------- safe JSON parsing for imports (Section 57) ---------- */

/**
 * Parse JSON with size and type validation
 * @param {string} text - JSON string to parse
 * @param {number} [maxBytes] - Maximum allowed size
 * @returns {{ok: boolean, value?: *, error?: string}}
 */
PS.safeJSON = function (text, maxBytes) {
  if (typeof text !== 'string' || !/\S/.test(text)) return { ok: false, error: 'The file is empty.' };
  if (maxBytes && text.length > maxBytes) return { ok: false, error: 'The file is too large to import safely.' };
  try {
    var v = JSON.parse(text);
    if (v === null || typeof v !== 'object') return { ok: false, error: 'The file does not contain a Procure Sherpa object.' };
    return { ok: true, value: v };
  } catch (e) {
    return { ok: false, error: 'This is not valid JSON. Nothing was imported and your data is unchanged.' };
  }
};

/**
 * Encode object for safe URL hash transport
 * @param {*} obj - Object to encode
 * @returns {string} URL-safe base64 string
 */
PS.encodeHashPayload = function (obj) {
  try {
    return encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(obj)))));
  } catch (e) { return ''; }
};

/**
 * Decode URL hash payload back to object
 * @param {string} raw - Encoded string
 * @returns {Object|null} Decoded object or null on failure
 */
PS.decodeHashPayload = function (raw) {
  try {
    var bin = atob(decodeURIComponent(raw));
    var txt;
    try { txt = decodeURIComponent(escape(bin)); } catch (e) { txt = bin; }
    var o = JSON.parse(txt);
    return (o && typeof o === 'object') ? o : null;
  } catch (e) { return null; }
};