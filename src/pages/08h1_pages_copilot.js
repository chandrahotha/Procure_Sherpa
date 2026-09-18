/* ==========================================================
   Copilot page - local offline assistant (roadmap 11.1)
   ========================================================== */
PS.route('copilot', function () {
  PS.pageTitle = 'Procurement Copilot';
  var trans = PS.copilot.transcript();
  var chatBody = '<div class="copilot-msg"><div class="cp-avatar" aria-hidden="true">PS</div>' +
    '<div class="cp-bubble">Hello. I am a local knowledge assistant, not a generative AI model. Every answer is retrieved from the bundled library on this device, with citations you can open. I mark my confidence so you can judge when to verify.</div></div>';
  if (trans.length) {
    trans.slice().reverse().forEach(function (x) {
      var cites = (x.hits || []).map(function (h) {
        var t = PS.byId(h.type, h.id);
        if (!t && h.type === 'gloss') { t = PS.glossaryById(h.id); }
        var route = h.type === 'gloss' ? '#/glossary?term=' + encodeURIComponent(h.id) : PS.routeFor(h.type, h.id);
        return '<a class="cp-cite" href="' + PS.esc(route) + '"><span class="tick">' + (h.type === 'gloss' ? 'G' : '') + '</span>' +
          PS.esc(t ? (t.title || t.term) : h.title) + ' <span class="badge">' + PS.esc(PS.typeLabel(h.type)) + '</span></a>';
      }).join('');
      chatBody += '<div class="copilot-msg is-user"><div class="cp-avatar" aria-hidden="true">You</div><div class="cp-bubble">' + PS.esc(x.q) + '</div></div>' +
        '<div class="copilot-msg"><div class="cp-avatar" aria-hidden="true">PS</div><div class="cp-bubble">' +
        PS.copilot.confidenceTag(x.confidence) + ' ' + PS.esc(x.a) + (cites ? '<div class="cp-cites">' + cites + '</div>' : '') + '</div></div>';
    });
  }
  return PS.reportHead('Procurement Copilot', 'Local knowledge assistant') +
    '<div class="copilot-shell"><div class="card"><div class="card-head"><div><h1>Ask the Copilot</h1>' +
    '<p class="card-sub">Local retrieval answers with inline citations and an honest confidence signal. Nothing leaves this browser.</p></div>' +
    '<div class="spacer"></div>' +
    '<button type="button" class="btn btn-sm btn-ghost" data-act="copilot-clear">Clear transcript</button></div>' +
    '<div class="copilot-chat" id="copilotChat" style="max-height:520px;overflow-y:auto">' + chatBody + '</div>' +
    '<div class="copilot-input-row">' +
    '<label class="sr-only" for="copilotInput">Ask the copilot a question</label>' +
    '<input type="text" id="copilotInput" placeholder="Ask e.g. What is TCO, or how do I handle a price increase?" maxlength="200">' +
    '<button type="button" class="btn btn-primary" data-act="copilot-ask">Ask</button>' +
    '</div>' +
    '<div class="cp-suggest">' + PS.copilot.suggestions(4) + '</div>' +
    '<p class="note">The Copilot is a keyword-based retrieval tool over bundled content only - it is not connected to any model or server, and it cannot reason. Treat "High match" as worth reading, "Low confidence" as worth verifying. Always validate figures before acting.</p>' +
    '</div></div>' +
    PS.disclaimer('data');
  PS.pageInit = function () {
    var input = PS.$('#copilotInput');
    if (input) {
      input.focus();
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); PS.acts['copilot-ask'](); }
      });
    }
  };
  return html;
});