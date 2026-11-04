/* ==========================================================
   Section G: reusable UI components
   ==========================================================
   Every screen builds its HTML by concatenation, and the same handful of
   shapes - a card, a card head, a stat, a note, a button row, a section
   head, a pill - were written out by hand in more than thirty files. They
   drifted: one stat label was a heading, one note was a paragraph and
   another a div, one pill was accent-coloured whatever it actually meant.

   These are the shapes. They return markup rather than elements, because
   the application has no framework and no virtual DOM: a component that
   returned a node would cost more than the duplication it removes. Each
   one owns exactly one piece of markup so that a change to the design
   system lands once, here, and every screen follows.
   ========================================================== */
PS.ui = (function () {
  function withClass(base, extra) {
    return extra ? base + ' ' + extra : base;
  }
  return {
    /* A content block on paper. `opts.class` adds modifiers, `opts.style`
       the inline style a few callers still carry. */
    card: function (body, opts) {
      opts = opts || {};
      return '<div class="' + withClass('card', opts.class) + '"' +
        (opts.style ? ' style="' + opts.style + '"' : '') + '>' + body + '</div>';
    },

    /* The head of a card: a title, and whatever sits on the other end of
       the rule - a badge, a spacer, a count. */
    cardHead: function (title, right) {
      return '<div class="card-head"><h2>' + title + '</h2>' + (right || '') + '</div>';
    },
    cardSub: function (text) {
      return '<p class="card-sub">' + text + '</p>';
    },

    /* A figure with its label. The kind carries the state colour:
       ok, warn, danger, info - the same words the state tokens use. */
    stat: function (value, label, kind) {
      return '<div class="' + withClass('stat', kind ? 'is-' + kind : '') + '">' +
        '<div class="s-lab">' + label + '</div><div class="s-val">' + value + '</div></div>';
    },
    statGrid: function (stats) {
      return '<div class="grid stat-grid">' + stats.join('') + '</div>';
    },

    /* A quiet aside. The tag is a parameter because the two callers that
       want a block note and the many that want a paragraph note were
       writing the same sentence twice. The content is HTML: a note may
       carry a link, and the caller has already escaped its own text. */
    note: function (html, tag) {
      var t = tag || 'p';
      return '<' + t + ' class="note">' + html + '</' + t + '>';
    },

    btnRow: function (html, extra) {
      return '<div class="' + withClass('btn-row', extra) + '">' + html + '</div>';
    },

    /* The heading of a section: a serif title and, under it, the honest
       count of what the section holds. */
    sectionHead: function (title, sub) {
      return '<div class="section-head"><h2>' + title + '</h2>' +
        (sub ? '<p class="section-sub">' + sub + '</p>' : '') + '</div>';
    },

    /* Altitude, named in the tier colour: Foundation, Practitioner,
       Executive. The same three colours on every screen that names one. */
    tierPill: function (tier, text) {
      return '<span class="level-pill lv-' + tier + '">' + text + '</span>';
    },
    startPill: function (text) {
      return '<span class="level-pill is-start">' + text + '</span>';
    }
  };
})();
