/* ---------- CSV safety (Section 34: CSV injection protection) ---------- */
PS.csvCell = function (v) {
  var s = v === null || v === undefined ? '' : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  if (/[",\r\n]/.test(s)) s = '"' + s.replace(/"/g, '""') + '"';
  return s;
};
PS.toCSV = function (headers, rows) {
  var out = [headers.map(PS.csvCell).join(',')];
  (rows || []).forEach(function (r) { out.push(r.map(PS.csvCell).join(',')); });
  return out.join('\r\n');
};
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
PS.encodeHashPayload = function (obj) {
  try {
    return encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(obj)))));
  } catch (e) { return ''; }
};
PS.decodeHashPayload = function (raw) {
  try {
    var bin = atob(decodeURIComponent(raw));
    var txt;
    try { txt = decodeURIComponent(escape(bin)); } catch (e) { txt = bin; }
    var o = JSON.parse(txt);
    return (o && typeof o === 'object') ? o : null;
  } catch (e) { return null; }
};