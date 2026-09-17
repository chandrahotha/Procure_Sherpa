/* ==========================================================
   Section M: content registries and data normalisation
   (Section 54: internal content structure)
   Data fragments below push plain objects into these arrays.
   PS.normalizeContent() then registers them, keeps ids unique and
   makes them searchable. Nothing else depends on load order.
   ========================================================== */
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
PS.MATURITY = [];
PS.LIFECYCLE = [];