/* ==========================================================
   Section M: content registries and data normalisation
   (Section 54: internal content structure)
   Data fragments below push plain objects into these arrays.
   PS.normalizeContent() then registers them, keeps ids unique and
   makes them searchable. Nothing else depends on load order.
   ========================================================== */

/* This file is the single declaration site for the content registries.
   Roughly 30 other fragments push into them and src/core/90_normalize.js
   reads them, but the build concatenates every fragment into one <script>
   so that all happens in this same global scope - which ESLint, linting
   one file at a time, cannot see. The names are listed as shared globals
   in eslint.config.mjs; this disable covers the declaration itself.
   If you add a registry, add it there too. */
/* eslint-disable no-unused-vars */
var PS_KB = [];
var PS_SOPS = [];
var PS_CL = [];
var PS_TPL = [];
var PS_DEC = [];
var PS_KPI = [];
var PS_GLOSS = [];
var PS_SCEN = [];
var PS_CALC = [];
var PS_HELP = [];
/* eslint-enable no-unused-vars */

PS.MATURITY = [];
PS.LIFECYCLE = [];
PS.ACADEMY_FUNCTIONS = [];