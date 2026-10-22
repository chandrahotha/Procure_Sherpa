"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/core/ps.ts
var _global, PS2;
var init_ps = __esm({
  "src/core/ps.ts"() {
    "use strict";
    _global = globalThis;
    PS2 = _global.PS = _global.PS || {};
    PS2.APP = "Procurement 360";
    PS2.VERSION = "3.0";
    PS2.SCHEMA = 3;
    PS2.BUILD = "2026-10-17";
    PS2.NS = "ps_";
    PS2.MAX_SAVED = 250;
    PS2.MAX_QUOTE_SAVED = 50;
    PS2.AUDIT_MAX = 100;
    PS2.$ = function(s, r) {
      return (r || document).querySelector(s);
    };
    PS2.$$ = function(s, r) {
      return Array.prototype.slice.call((r || document).querySelectorAll(s));
    };
    PS2.esc = function(v) {
      if (v === null || v === void 0) return "";
      return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    };
    PS2.clean = function(v, max) {
      if (v === null || v === void 0) return "";
      var s = String(v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim();
      if (max && s.length > max) s = s.slice(0, max);
      return s;
    };
    PS2.escAttr = PS2.esc;
    PS2.num = function(v) {
      if (v === null || v === void 0 || v === "") return NaN;
      if (typeof v === "number") return isFinite(v) ? v : NaN;
      var s = String(v).replace(/[\s,\u00A0]/g, "").replace(/[$€£¥₹]/g, "");
      if (/^\(.*\)$/.test(s)) s = "-" + s.slice(1, -1);
      if (s.slice(-1) === "%") s = s.slice(0, -1);
      var n = Number(s);
      return isFinite(n) ? n : NaN;
    };
    PS2.isNum = function(v) {
      return isFinite(PS2.num(v));
    };
    PS2.clamp = function(n, lo, hi) {
      return Math.min(hi, Math.max(lo, n));
    };
    PS2.round = function(n, d) {
      var f = Math.pow(10, d === void 0 ? 2 : d);
      return isFinite(n) ? Math.round((n + Number.EPSILON) * f) / f : NaN;
    };
    PS2.CURRENCIES = [
      { c: "USD", s: "$" },
      { c: "EUR", s: "\u20AC" },
      { c: "GBP", s: "\xA3" },
      { c: "INR", s: "\u20B9" },
      { c: "AED", s: "AED " },
      { c: "AUD", s: "A$" },
      { c: "CAD", s: "C$" },
      { c: "SGD", s: "S$" },
      { c: "ZAR", s: "R" },
      { c: "JPY", s: "\xA5" },
      { c: "CNY", s: "CN\xA5" },
      { c: "CHF", s: "CHF " },
      { c: "SEK", s: "kr " },
      { c: "BRL", s: "R$" },
      { c: "MXN", s: "MX$" },
      { c: "NZD", s: "NZ$" },
      { c: "HKD", s: "HK$" },
      { c: "SAR", s: "SAR " },
      { c: "MYR", s: "RM" },
      { c: "PLN", s: "z\u0142 " },
      { c: "NONE", s: "" }
    ];
    PS2.curSymbol = function(code) {
      var f = PS2.CURRENCIES.filter(function(x) {
        return x.c === code;
      })[0];
      return f ? f.s : code ? code + " " : "";
    };
    PS2.group = function(n, d) {
      if (!isFinite(n)) return "\u2014";
      var neg = n < 0;
      n = Math.abs(n);
      var parts = PS2.round(n, d).toFixed(d === void 0 ? 2 : d).split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return (neg ? "-" : "") + parts.join(".");
    };
    PS2.fmt = function(n, d) {
      return PS2.group(n, d === void 0 ? 2 : d);
    };
    PS2.money = function(n, d) {
      if (!isFinite(n)) return "\u2014";
      var p = PS2.prefs();
      return PS2.curSymbol(p.currency) + PS2.group(n, d === void 0 ? p.decimals : d);
    };
    PS2.moneyR = function(n) {
      if (!isFinite(n)) return "\u2014";
      var a = Math.abs(n);
      return PS2.money(n, a >= 1e4 ? 0 : a >= 100 ? 0 : 2);
    };
    PS2.pct = function(n, d) {
      return isFinite(n) ? PS2.group(n, d === void 0 ? 1 : d) + "%" : "\u2014";
    };
    PS2.qty = function(n) {
      return isFinite(n) ? PS2.group(n, Math.abs(n) < 1e3 ? 2 : 0) : "\u2014";
    };
    PS2.ratio = function(n) {
      return isFinite(n) ? PS2.group(n, 2) : "\u2014";
    };
    PS2.dateStr = function(d) {
      d = d ? new Date(d) : /* @__PURE__ */ new Date();
      if (isNaN(d.getTime())) return "\u2014";
      var p = PS2.prefs(), m = String(d.getMonth() + 1), day = String(d.getDate()), y = d.getFullYear();
      m = m.length < 2 ? "0" + m : m;
      day = day.length < 2 ? "0" + day : day;
      var h = d.getHours(), mi = String(d.getMinutes());
      if (mi.length < 2) mi = "0" + mi;
      var t = (h % 12 === 0 ? 12 : h % 12) + ":" + mi + " " + (h < 12 ? "am" : "pm");
      if (p.dateFormat === "us") return m + "/" + day + "/" + y;
      if (p.dateFormat === "eu") return day + "/" + m + "/" + y;
      return y + "-" + m + "-" + day;
    };
    PS2.dateTime = function(d) {
      return PS2.dateStr(d) + " " + PS2.timeStr(d);
    };
    PS2.timeStr = function(d) {
      d = d ? new Date(d) : /* @__PURE__ */ new Date();
      var h = d.getHours(), mi = String(d.getMinutes());
      if (mi.length < 2) mi = "0" + mi;
      return (h % 12 === 0 ? 12 : h % 12) + ":" + mi + " " + (h < 12 ? "am" : "pm");
    };
    PS2.iso = function(d) {
      d = d ? new Date(d) : /* @__PURE__ */ new Date();
      var m = String(d.getMonth() + 1), day = String(d.getDate());
      if (m.length < 2) m = "0" + m;
      if (day.length < 2) day = "0" + day;
      return d.getFullYear() + "-" + m + "-" + day;
    };
    PS2.uid = function(p) {
      return (p || "id") + "-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7);
    };
    PS2.debounce = function(fn, ms) {
      var t;
      return function(...a) {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, a), ms || 150);
      };
    };
  }
});

// src/core/storage.ts
var require_storage = __commonJS({
  "src/core/storage.ts"() {
    "use strict";
    init_ps();
    PS2.K = {
      prefs: "ps_prefs",
      saved: "ps_saved_work",
      fav: "ps_favorites",
      recent: "ps_recent",
      cl: "ps_checklists",
      tpl: "ps_templates",
      audit: "ps_audit",
      schema: "ps_schema_version",
      nav: "ps_nav_state",
      draft: "ps_draft",
      maturity: "ps_maturity",
      exams: "ps_exams",
      spend: "ps_spend_model",
      copilot: "ps_copilot",
      docpacks: "ps_docpacks",
      rates: "ps_rates"
    };
    PS2.LEGACY = [
      "ps_saved",
      "ps_savedQuotes",
      "ps_savedCalculations",
      "ps_calculations",
      "ps_quoteComparison",
      "ps_savedComparisons",
      "ps_settings",
      "ps_preferences",
      "ps_savedChecklists"
    ];
    PS2._mem = {};
    PS2.storageOK = (function() {
      try {
        var k = PS2.NS + "__test";
        var store = globalThis.localStorage;
        if (!store) return false;
        store.setItem(k, "1");
        store.removeItem(k);
        return true;
      } catch (e) {
        return false;
      }
    })();
    PS2.store = {
      get: function(key, fallback) {
        try {
          var raw = PS2.storageOK ? window.localStorage.getItem(key) : PS2._mem[key];
          if (raw === null || raw === void 0) return fallback;
          var v = JSON.parse(raw);
          return v === null || v === void 0 ? fallback : v;
        } catch (e) {
          PS2.warnOnce("storage-read", "Some saved local data could not be read. Procurement 360 continued with safe defaults.");
          return fallback;
        }
      },
      set: function(key, value) {
        var raw;
        try {
          raw = JSON.stringify(value);
        } catch (e) {
          PS2.toast("This item could not be saved.", "danger");
          return false;
        }
        try {
          if (PS2.storageOK) window.localStorage.setItem(key, raw);
          else PS2._mem[key] = raw;
          return true;
        } catch (e) {
          var quota = e && (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED" || e.code === 22);
          PS2.toast(quota ? "Local storage is full. Export a backup, delete some saved items, then try again." : "Local storage is unavailable in this browser, so this item was kept for this session only.", "danger");
          PS2._mem[key] = raw;
          return false;
        }
      },
      remove: function(key) {
        try {
          if (PS2.storageOK) window.localStorage.removeItem(key);
        } catch (e) {
        }
        delete PS2._mem[key];
      },
      rawKeys: function() {
        var out = [];
        try {
          for (var i = 0; i < window.localStorage.length; i++) {
            var k = window.localStorage.key(i);
            if (k && k.indexOf(PS2.NS) === 0) out.push(k);
          }
        } catch (e) {
        }
        return out;
      },
      bytes: function() {
        var n = 0;
        PS2.store.rawKeys().forEach(function(k) {
          try {
            n += (window.localStorage.getItem(k) || "").length;
          } catch (e) {
          }
        });
        return n;
      }
    };
    PS2.warnOnce = function(tag, msg) {
      PS2._warned = PS2._warned || {};
      if (PS2._warned[tag]) return;
      PS2._warned[tag] = 1;
      PS2.toast(msg, "danger");
    };
    var DEFAULT_PREFS = { currency: "USD", decimals: 2, dateFormat: "iso", theme: "light" };
    PS2.prefs = function() {
      return Object.assign({}, DEFAULT_PREFS, PS2.store.get(PS2.K.prefs, {}));
    };
    PS2.setPrefs = function(p) {
      var cur = PS2.prefs();
      PS2.store.set(PS2.K.prefs, Object.assign({}, cur, p));
    };
  }
});

// src/core/05f_calccompact.ts
var require_f_calccompact = __commonJS({
  "src/core/05f_calccompact.ts"() {
    "use strict";
    PS.F = function(spec, label, unit, flags, def) {
      if (arguments.length > 1) {
        var u = unit || "", fl = flags || "";
        if (u === "text" || u === "sel") {
          fl = fl ? u + "," + fl : u;
          u = "";
        }
        var parts = [spec, label === void 0 || label === null || label === "" ? spec : label, u, fl];
        if (def !== void 0 && def !== null && def !== "") parts.push(String(def));
        return PS.F(parts.join("|"));
      }
      var p = String(spec).split("|");
      var f = { k: p[0], label: p[1] || p[0] };
      var unit = p[2] || "";
      if (unit === "curr") unit = "currency";
      if (unit === "pct") unit = "percent";
      if (unit === "bool") {
        f.type = "check";
        unit = "";
      }
      if (unit && unit !== "text") f.unit = unit;
      (p[3] || "").split(",").forEach(function(fl2) {
        var v;
        if (fl2 === "req") f.req = true;
        else if (fl2 === "pos") f.positive = true;
        else if (fl2 === "nn") f.nonNegative = true;
        else if (fl2 === "int") f.int = true;
        else if (fl2 === "check") f.type = "check";
        else if (fl2 === "sel") f.type = "select";
        else if (fl2 === "date") f.type = "date";
        else if (fl2 === "text") f.type = "text";
        else if (fl2.indexOf("min=") === 0) f.min = PS.num(fl2.slice(4));
        else if (fl2.indexOf("max=") === 0) f.max = PS.num(fl2.slice(4));
        else if (fl2.indexOf("step=") === 0) f.step = PS.num(fl2.slice(5));
        else if (fl2.indexOf("tip=") === 0) f.tip = fl2.slice(4).replace(/_/g, " ");
        else if (fl2.indexOf("ph=") === 0) f.ph = fl2.slice(3).replace(/_/g, " ");
        else if (fl2.indexOf("opts=") === 0) {
          f.options = fl2.slice(5).split(";").map(function(o) {
            return o.replace(/_/g, " ");
          });
        } else if (fl2) f.help = fl2.replace(/_/g, " ");
      });
      if (p[4] !== void 0 && p[4] !== "") {
        if (f.type === "check") f.def = p[4] === "1" || p[4] === "true";
        else if (f.type === "select" || f.unit === void 0 && f.type === "text") f.def = p[4];
        else f.def = PS.num(p[4]);
      }
      if (f.type === "sel") f.type = "select";
      return f;
    };
    PS.G = function(name, keys, note) {
      return { g: name, keys: String(keys).split(" "), note };
    };
    PS.C = function(o) {
      return {
        results: o.r || [],
        table: o.t || null,
        analysis: o.a || "",
        formula: o.f || null,
        assumptions: o.as || null,
        warnings: o.w || [],
        keyFindings: o.k || null,
        summaryText: o.s || "",
        data: o.d || null
      };
    };
    PS.res = function(label, value, note, status, primary) {
      return { label, value, note: note || "", status: status || "", primary: !!primary };
    };
  }
});

// src/content/09a_data_init.ts
var require_a_data_init = __commonJS({
  "src/content/09a_data_init.ts"() {
    "use strict";
    PS.KB = [];
    PS.SOPS = [];
    PS.CL = [];
    PS.TPL = [];
    PS.DEC = [];
    PS.KPI = [];
    PS.GLOSS = [];
    PS.SCEN = [];
    PS.CALC = [];
    PS.HELP = [];
    PS.MATURITY = [];
    PS.LIFECYCLE = [];
    PS.ACADEMY_FUNCTIONS = [];
  }
});

// src/calcs/20a_calc_compare_quotes.ts
var require_a_calc_compare_quotes = __commonJS({
  "src/calcs/20a_calc_compare_quotes.ts"() {
    "use strict";
    PS.calcImpl = PS.calcImpl || {};
    PS.CALC.push({
      id: "calc-compare-quotes",
      title: "Compare Quotes",
      cat: "Quote Tools",
      tags: ["quote", "evaluation", "landed cost"],
      purpose: "Compare supplier quotations on one basis so the lowest landed cost - not the lowest headline price - is visible, and show the commercial spread you have to negotiate in.",
      desc: "Normalise up to three quotations into comparable landed cost and rank them.",
      disclaimerKind: "finance",
      assumptions: [
        "Duty and tax percentages apply to the values you enter; no market rates are assumed.",
        "Recoverable purchase tax is shown but excluded from ranking because it should not drive an award decision.",
        "Non-price factors (quality, service, lead time) are not scored here - use the Supplier Scorecard for weighted evaluation."
      ],
      formula: [
        "Landed goods = (unit price x quantity) - discount",
        "Duty = (landed goods + freight + insurance) x duty %",
        "Landed cost = landed goods + freight + insurance + duty (+ tax where not recoverable)",
        "Per-unit landed cost = landed cost / quantity"
      ],
      groups: [
        { g: "Requirement", keys: ["qty", "insurance", "taxRecoverable"] },
        { g: "Supplier A", keys: ["aPrice", "aFreight", "aDuty", "aDiscount"] },
        { g: "Supplier B", keys: ["bPrice", "bFreight", "bDuty", "bDiscount"] },
        { g: "Supplier C (optional)", keys: ["cPrice", "cFreight", "cDuty", "cDiscount"], note: "Leave supplier C blank when only two quotations were received." }
      ],
      fields: [
        { k: "qty", label: "Quantity required", unit: "qty", req: true, positive: true, def: 1e3 },
        { k: "insurance", label: "Insurance total (all offers)", unit: "currency", nonNegative: true, def: 0 },
        { k: "taxRecoverable", label: "Purchase tax is recoverable", type: "check", def: true, help: "Yes - exclude recoverable tax from the ranking basis" },
        { k: "aPrice", label: "A: unit price ex tax", unit: "currency", req: true, nonNegative: true },
        { k: "aFreight", label: "A: freight total", unit: "currency", nonNegative: true, def: 0 },
        { k: "aDuty", label: "A: duty / import %", unit: "percent", min: 0, max: 100, def: 0 },
        { k: "aDiscount", label: "A: discount %", unit: "percent", min: 0, max: 100, def: 0 },
        { k: "bPrice", label: "B: unit price ex tax", unit: "currency", nonNegative: true },
        { k: "bFreight", label: "B: freight total", unit: "currency", nonNegative: true, def: 0 },
        { k: "bDuty", label: "B: duty / import %", unit: "percent", min: 0, max: 100, def: 0 },
        { k: "bDiscount", label: "B: discount %", unit: "percent", min: 0, max: 100, def: 0 },
        { k: "cPrice", label: "C: unit price ex tax", unit: "currency", nonNegative: true },
        { k: "cFreight", label: "C: freight total", unit: "currency", nonNegative: true, def: 0 },
        { k: "cDuty", label: "C: duty / import %", unit: "percent", min: 0, max: 100, def: 0 },
        { k: "cDiscount", label: "C: discount %", unit: "percent", min: 0, max: 100, def: 0 }
      ],
      example: { qty: 2500, insurance: 300, taxRecoverable: true, aPrice: 12.4, aFreight: 1800, aDuty: 6, aDiscount: 2, bPrice: 11.9, bFreight: 3200, bDuty: 6, bDiscount: 0, cPrice: 13.25, cFreight: 600, cDuty: 6, cDiscount: 5 },
      handoffTo: ["calc-tco", "calc-negotiation-savings", "calc-savings-analysis"],
      rel: { sops: ["sop-quote-comparison", "sop-bid-normalization", "sop-commercial-evaluation"], cl: ["cl-quote-comparison"], tpl: ["tpl-bid-comparison"], calc: ["calc-landed-cost", "calc-tco"], decisions: ["dec-unit-price-vs-tco"] },
      run: function(v) {
        return PS.calcImpl.compareQuotes(v);
      }
    });
  }
});

// src/calcs/calc_kraljic_matrix.ts
var require_calc_kraljic_matrix = __commonJS({
  "src/calcs/calc_kraljic_matrix.ts"() {
    "use strict";
    init_ps();
    PS2.CALC.push({
      id: "calc-kraljic-matrix",
      title: "Kraljic Portfolio Matrix",
      cat: "Sourcing Tools",
      tags: ["kraljic", "portfolio", "segmentation", "category strategy", "sourcing"],
      purpose: "Segment a category by supply risk and profit impact to select the right sourcing strategy.",
      desc: "Plots a category on the Kraljic 2\xD72: Strategic (high/high), Leverage (low risk/high impact), Bottleneck (high risk/low impact), Non-Critical (low/low). Recommends the strategy for each quadrant.",
      assumptions: [
        "Supply risk and profit impact can be scored 0-100.",
        "A single category occupies one quadrant; mixed categories should be split.",
        "The quadrant drives the negotiation stance, not the outcome."
      ],
      formula: [
        "Quadrant = f(supplyRisk, profitImpact)",
        "Strategic: risk > 50 AND impact > 50",
        "Leverage: risk <= 50 AND impact > 50",
        "Bottleneck: risk > 50 AND impact <= 50",
        "Non-critical: risk <= 50 AND impact <= 50"
      ],
      groups: [PS2.G("Category position", "supplyRisk profitImpact annualSpend")],
      fields: [
        PS2.F("supplyRisk", "Supply market risk (0-100)", "pct", "req,nn,max=100", "60"),
        PS2.F("profitImpact", "Profit impact (0-100)", "pct", "req,nn,max=100", "70"),
        PS2.F("annualSpend", "Annual spend on this category", "curr", "req,nn", "500000")
      ],
      example: { supplyRisk: 60, profitImpact: 70, annualSpend: 5e5 },
      handoffTo: ["calc-weighted-bid-eval", "calc-supplier-scorecard"],
      rel: { sops: ["sop-supplier-risk"], checklists: ["cl-category-review"], calcs: ["calc-weighted-bid-eval"] },
      run: function(v) {
        return PS2.calcImpl.kraljicMatrix(v);
      }
    });
    PS2.calcImpl.kraljicMatrix = function(v) {
      var risk = PS2.num(v.supplyRisk);
      var impact = PS2.num(v.profitImpact);
      var spend = PS2.num(v.annualSpend);
      var quadrant, strategy, action;
      if (risk > 50 && impact > 50) {
        quadrant = "Strategic";
        strategy = "Partner. Long-term relationships, joint development, shared risk.";
        action = "Build supplier partnerships. Dual-source if possible. Executive sponsorship.";
      } else if (risk <= 50 && impact > 50) {
        quadrant = "Leverage";
        strategy = "Exploit. Competitive tension, aggressive negotiation, switchable supply.";
        action = "Run competitive events. Consolidate volume. Play the market.";
      } else if (risk > 50 && impact <= 50) {
        quadrant = "Bottleneck";
        strategy = "Secure. Guarantee supply, qualify alternatives, hold safety stock.";
        action = "Secure contingency supply. Qualify backups. Hold buffer inventory.";
      } else {
        quadrant = "Non-critical";
        strategy = "Automate. Simplify, standardize, reduce transaction cost.";
        action = "Automate ordering. Use catalogs or P-cards. Minimize touch time.";
      }
      var supplierCount = quadrant === "Strategic" ? 1 : quadrant === "Leverage" ? 3 : quadrant === "Bottleneck" ? 2 : 5;
      var negotiationStance = quadrant === "Strategic" ? "Collaborative" : quadrant === "Leverage" ? "Aggressive" : quadrant === "Bottleneck" ? "Defensive" : "Transactional";
      return PS2.C({
        r: [
          PS2.res("Quadrant", quadrant, "Kraljic classification", "", true),
          PS2.res("Strategy", strategy.split(".")[0], "Sourcing posture"),
          PS2.res("Recommended suppliers", String(supplierCount), "Target count for this quadrant"),
          PS2.res("Negotiation stance", negotiationStance, "How to sit across the table"),
          PS2.res("Annual spend", PS2.money(spend), "Category value at stake")
        ],
        t: {
          headers: ["Quadrant", "Risk", "Impact", "Strategy"],
          rows: [
            { cells: ["Strategic", "High", "High", "Partner"] },
            { cells: ["Leverage", "Low", "High", "Exploit"] },
            { cells: ["Bottleneck", "High", "Low", "Secure"] },
            { cells: ["Non-critical", "Low", "Low", "Automate"] }
          ],
          footer: ["This category", risk > 50 ? "High" : "Low", impact > 50 ? "High" : "Low", quadrant]
        },
        a: "<p>This category sits in the <strong>" + quadrant + "</strong> quadrant with supply risk at <strong>" + PS2.pct(risk) + "</strong> and profit impact at <strong>" + PS2.pct(impact) + "</strong>.</p><p><strong>Strategy:</strong> " + PS2.esc(strategy) + "</p><p><strong>Action:</strong> " + PS2.esc(action) + "</p><p>The Kraljic matrix is the first question of category strategy: it tells you <em>how</em> to engage the market before you worry about <em>what</em> to negotiate.</p>",
        f: [
          "Strategic: risk > 50 AND impact > 50",
          "Leverage: risk <= 50 AND impact > 50",
          "Bottleneck: risk > 50 AND impact <= 50",
          "Non-critical: risk <= 50 AND impact <= 50"
        ],
        as: [
          "Risk and impact scored 0-100.",
          "One category occupies one quadrant.",
          "The quadrant drives the stance, not the outcome."
        ],
        w: [],
        k: [
          quadrant + " quadrant",
          "Strategy: " + strategy.split(".")[0],
          "Target " + supplierCount + " supplier(s)"
        ],
        s: "Kraljic: " + quadrant + " quadrant. " + strategy.split(".")[0] + ".",
        d: { quadrant, strategy, supplierCount, negotiationStance, risk, impact }
      });
    };
  }
});

// src/calcs/calc_pareto_analysis.ts
var require_calc_pareto_analysis = __commonJS({
  "src/calcs/calc_pareto_analysis.ts"() {
    "use strict";
    init_ps();
    PS2.CALC.push({
      id: "calc-pareto-analysis",
      title: "Pareto Analysis (80/20)",
      cat: "Sourcing Tools",
      tags: ["pareto", "80/20", "spend analysis", "class a", "tail spend", "consolidation"],
      purpose: "Identify the small number of suppliers that consume most of the spend, and quantify the tail-spend consolidation opportunity.",
      desc: "The Pareto principle applied to spend: typically 20% of suppliers account for 80% of spend. This calculator quantifies the split and the consolidation opportunity in the tail.",
      assumptions: [
        "Supplier spend is known and categorizable.",
        "The 80/20 rule is an observation, not a law; your split may differ.",
        "Tail consolidation saves transaction cost, not necessarily unit price."
      ],
      formula: [
        "Class A = suppliers that cumulatively account for 80% of spend",
        "Class B = next 15% of cumulative spend",
        "Class C (tail) = final 5%",
        "Consolidation opportunity = tail supplier count \xD7 avg transaction saving"
      ],
      groups: [PS2.G("Spend data", "supplierCount totalSpend topSupplierCount topSupplierSpend")],
      fields: [
        PS2.F("supplierCount", "Total suppliers", "num", "req,nn,int", "100"),
        PS2.F("totalSpend", "Total spend", "curr", "req,nn", "10000000"),
        PS2.F("topSupplierCount", "Suppliers in top 80% of spend", "num", "req,nn,int", "20"),
        PS2.F("topSupplierSpend", "Spend with top suppliers", "curr", "req,nn", "8000000")
      ],
      example: { supplierCount: 100, totalSpend: 1e7, topSupplierCount: 20, topSupplierSpend: 8e6 },
      handoffTo: ["calc-supplier-concentration", "calc-savings-analysis"],
      rel: { sops: ["sop-inventory-management"], checklists: ["cl-category-review"], calcs: ["calc-supplier-concentration"] },
      run: function(v) {
        return PS2.calcImpl.paretoAnalysis(v);
      }
    });
    PS2.calcImpl.paretoAnalysis = function(v) {
      var totalSuppliers = PS2.num(v.supplierCount);
      var totalSpend = PS2.num(v.totalSpend);
      var topCount = PS2.num(v.topSupplierCount);
      var topSpend = PS2.num(v.topSupplierSpend);
      var tailCount = totalSuppliers - topCount;
      var tailSpend = totalSpend - topSpend;
      var topPctSpend = totalSpend > 0 ? topSpend / totalSpend * 100 : 0;
      var topPctSuppliers = totalSuppliers > 0 ? topCount / totalSuppliers * 100 : 0;
      var tailPctSpend = totalSpend > 0 ? tailSpend / totalSpend * 100 : 0;
      var tailPctSuppliers = totalSuppliers > 0 ? tailCount / totalSuppliers * 100 : 0;
      var avgTop = topCount > 0 ? topSpend / topCount : 0;
      var avgTail = tailCount > 0 ? tailSpend / tailCount : 0;
      var concentrationRatio = avgTail > 0 ? avgTop / avgTail : 0;
      var transactionCost = 500;
      var annualOrdersPerTailSupplier = 6;
      var consolidatable = tailCount * 0.5;
      var consolidationSavings = consolidatable * annualOrdersPerTailSupplier * transactionCost;
      var w = [];
      if (topPctSpend < 70) w.push("Top suppliers account for less than 70% of spend. Your distribution is flatter than typical \u2014 consolidation may be less effective.");
      if (tailPctSuppliers > 70) w.push("More than 70% of your suppliers are in the tail. This is a governance burden: consider catalogs, P-cards or a tail-spend agency.");
      return PS2.C({
        r: [
          PS2.res("Top supplier share of spend", PS2.pct(topPctSpend), topCount + " suppliers of " + totalSuppliers, "", true),
          PS2.res("Tail share of suppliers", PS2.pct(tailPctSuppliers), tailCount + " suppliers"),
          PS2.res("Tail share of spend", PS2.pct(tailPctSpend), PS2.money(tailSpend)),
          PS2.res("Concentration ratio", PS2.ratio(concentrationRatio), "Top avg vs tail avg spend per supplier"),
          PS2.res("Consolidation opportunity", PS2.money(consolidationSavings), "Per year, at 50% tail reduction")
        ],
        t: {
          headers: ["Segment", "Suppliers", "% Suppliers", "Spend", "% Spend", "Avg / supplier"],
          numCols: 3,
          rows: [
            { cells: ["Class A (top)", String(topCount), PS2.pct(topPctSuppliers), PS2.money(topSpend), PS2.pct(topPctSpend), PS2.money(avgTop)] },
            { cells: ["Class C (tail)", String(tailCount), PS2.pct(tailPctSuppliers), PS2.money(tailSpend), PS2.pct(tailPctSpend), PS2.money(avgTail)] }
          ],
          footer: ["Total", String(totalSuppliers), "100%", PS2.money(totalSpend), "100%", PS2.money(totalSpend / totalSuppliers)]
        },
        a: "<p><strong>" + topCount + "</strong> suppliers (<strong>" + PS2.pct(topPctSuppliers) + "</strong> of the base) account for <strong>" + PS2.money(topSpend) + "</strong> (<strong>" + PS2.pct(topPctSpend) + "</strong> of spend).</p><p>The remaining <strong>" + tailCount + "</strong> suppliers carry only <strong>" + PS2.pct(tailPctSpend) + "</strong> of spend. Each tail supplier costs roughly the same to administer as a Class A supplier, so the tail is where transaction cost hides.</p><p>Consolidating half the tail could save roughly <strong>" + PS2.money(consolidationSavings) + "</strong> a year in transaction cost alone, before any unit-price benefit from volume consolidation.</p>",
        f: [
          "Class A = suppliers covering 80% of cumulative spend",
          "Concentration ratio = avg Class A spend / avg tail spend",
          "Consolidation = (tail suppliers \xD7 50%) \xD7 orders/year \xD7 cost/order"
        ],
        as: [
          "Spend is known and categorized.",
          "80/20 is an observation, not a law.",
          "Tail consolidation saves transaction cost."
        ],
        w,
        k: [
          topPctSuppliers.toFixed(0) + "% of suppliers hold " + topPctSpend.toFixed(0) + "% of spend",
          "Tail: " + tailCount + " suppliers, " + PS2.money(tailSpend),
          "Consolidation worth ~" + PS2.money(consolidationSavings) + "/year"
        ],
        s: "Pareto: " + topPctSuppliers.toFixed(0) + "% of suppliers = " + topPctSpend.toFixed(0) + "% of spend. Tail of " + tailCount + " suppliers worth consolidating.",
        d: { topPctSpend, topPctSuppliers, tailPctSpend, tailPctSuppliers, concentrationRatio, consolidationSavings, tailCount, tailSpend }
      });
    };
  }
});

// src/calcs/calc_rfx_event_roi.ts
var require_calc_rfx_event_roi = __commonJS({
  "src/calcs/calc_rfx_event_roi.ts"() {
    "use strict";
    init_ps();
    PS2.CALC.push({
      id: "calc-rfx-event-roi",
      title: "RFx Event ROI",
      cat: "Sourcing Tools",
      tags: ["rfx", "event", "roi", "sourcing", "tender", "bid", "savings"],
      purpose: "Compare the cost of running a sourcing event against the savings it produces, with payback period.",
      desc: "Takes event cost (effort + platform + legal), addressable spend, and expected savings % to produce net savings, ROI, and payback period.",
      assumptions: [
        "Savings are annualized against the new contract term.",
        "Event cost is fully loaded: salaries, platform, legal, evaluation time.",
        "Savings percentage reflects a realistic target, not a wish."
      ],
      formula: [
        "Gross savings = addressable spend \xD7 savings %",
        "Net savings = gross savings \u2212 event cost",
        "ROI = net savings / event cost",
        "Payback (months) = event cost / (net savings / 12)"
      ],
      groups: [PS2.G("Event economics", "eventCost addressableSpend expectedSavingsPct contractYears")],
      fields: [
        PS2.F("eventCost", "Total event cost", "curr", "req,nn", "25000"),
        PS2.F("addressableSpend", "Addressable spend under the event", "curr", "req,nn", "1000000"),
        PS2.F("expectedSavingsPct", "Expected savings %", "pct", "req,nn", "8"),
        PS2.F("contractYears", "Contract term (years)", "num", "req,nn,int,min=1", "3")
      ],
      example: { eventCost: 25e3, addressableSpend: 1e6, expectedSavingsPct: 8, contractYears: 3 },
      handoffTo: ["calc-savings-analysis", "calc-weighted-bid-eval"],
      rel: { sops: ["sop-supplier-risk"], checklists: ["cl-bid-completeness"], calcs: ["calc-savings-analysis"] },
      run: function(v) {
        return PS2.calcImpl.rfxEventRoi(v);
      }
    });
    PS2.calcImpl.rfxEventRoi = function(v) {
      var cost = PS2.num(v.eventCost);
      var spend = PS2.num(v.addressableSpend);
      var pct = PS2.num(v.expectedSavingsPct) / 100;
      var years = PS2.num(v.contractYears);
      var grossAnnual = spend * pct;
      var grossTerm = grossAnnual * years;
      var netAnnual = grossAnnual;
      var netTerm = grossTerm - cost;
      var roi = cost > 0 ? netTerm / cost : 0;
      var paybackMonths = grossAnnual > 0 ? cost / (grossAnnual / 12) : 0;
      var w = [];
      if (pct > 0.15) w.push("Expected savings above 15% is aggressive for a first event. Benchmark against your category history before committing.");
      if (paybackMonths > 12) w.push("Payback exceeds 12 months. Verify the event is worth it, or increase the addressable spend in scope.");
      if (spend < cost * 10) w.push("Event cost exceeds 10% of addressable spend. Consider a simpler 3-quote process.");
      var verdict = roi > 5 ? "Strong case" : roi > 2 ? "Good case" : roi > 0 ? "Marginal" : "Not worth it";
      return PS2.C({
        r: [
          PS2.res("Gross savings (annual)", PS2.money(grossAnnual), PS2.pct(pct * 100) + " of " + PS2.moneyR(spend), "", true),
          PS2.res("Net savings over term", PS2.money(netTerm), "After event cost"),
          PS2.res("ROI", PS2.pct(roi * 100) + "\xD7", "Return on event cost"),
          PS2.res("Payback period", PS2.fmt(paybackMonths, 1) + " months", "Time to recover event cost"),
          PS2.res("Verdict", verdict, "Should you run the event?")
        ],
        t: {
          headers: ["Component", "Value", "Note"],
          numCols: 1,
          rows: [
            { cells: ["Event cost (one-time)", PS2.money(cost), "Fully loaded"] },
            { cells: ["Addressable spend", PS2.money(spend), "In scope"] },
            { cells: ["Expected savings", PS2.pct(pct * 100), "Target rate"] },
            { cells: ["Gross savings / year", PS2.money(grossAnnual), "Spend \xD7 rate"] },
            { cells: ["Gross savings / term", PS2.money(grossTerm), years + " years"] },
            { cells: ["Net savings / term", PS2.money(netTerm), "Gross \u2212 cost"] },
            { cells: ["ROI", PS2.fmt(roi, 1) + "\xD7", "Net / cost"] },
            { cells: ["Payback", PS2.fmt(paybackMonths, 1) + " mo", "Cost \xF7 monthly savings"] }
          ],
          footer: ["Verdict", verdict, ""]
        },
        a: "<p>A " + PS2.pct(pct * 100) + " saving on " + PS2.moneyR(spend) + " yields <strong>" + PS2.money(grossAnnual) + "</strong> per year.</p><p>Over a " + years + "-year term that is <strong>" + PS2.money(grossTerm) + "</strong> gross. After a one-time event cost of <strong>" + PS2.money(cost) + "</strong>, net savings are <strong>" + PS2.money(netTerm) + "</strong>.</p><p><strong>ROI: " + PS2.fmt(roi, 1) + "\xD7</strong> with payback in <strong>" + PS2.fmt(paybackMonths, 1) + " months</strong>. " + verdict + ".</p><p>An RFx is an investment. This calculator tells you whether the investment clears the bar before you spend six weeks on it.</p>",
        f: [
          "Gross = spend \xD7 savings %",
          "Net over term = gross \xD7 years \u2212 event cost",
          "ROI = net / event cost",
          "Payback months = event cost / (gross / 12)"
        ],
        as: [
          "Savings annualized over the contract term.",
          "Event cost fully loaded.",
          "Savings target is realistic, not aspirational."
        ],
        w,
        k: [
          "Net savings " + PS2.moneyR(netTerm) + " over " + years + " years",
          "ROI " + PS2.fmt(roi, 1) + "\xD7",
          "Payback " + PS2.fmt(paybackMonths, 1) + " months"
        ],
        s: "RFx ROI: " + PS2.fmt(roi, 1) + "\xD7 on " + PS2.moneyR(spend) + " spend. Payback " + PS2.fmt(paybackMonths, 1) + " months. " + verdict + ".",
        d: { grossAnnual, grossTerm, netTerm, roi, paybackMonths, verdict }
      });
    };
  }
});

// src/calcs/calc_dpo_working_capital.ts
var require_calc_dpo_working_capital = __commonJS({
  "src/calcs/calc_dpo_working_capital.ts"() {
    "use strict";
    init_ps();
    PS2.CALC.push({
      id: "calc-dpo-working-capital",
      title: "DPO & Cash Conversion Cycle",
      cat: "Finance Tools",
      tags: ["dpo", "days payable", "cash conversion cycle", "working capital", "dso", "dio"],
      purpose: "Calculate Days Payable Outstanding and the Cash Conversion Cycle. Quantify the working capital released by improving payment terms.",
      desc: "DPO measures how long you take to pay suppliers. Combined with DSO (how long customers take to pay you) and DIO (how long inventory sits), it gives the Cash Conversion Cycle: the days your cash is trapped.",
      assumptions: [
        "Cost of goods sold (COGS) is used for DPO and DIO; revenue for DSO.",
        "A shorter CCC is better: cash returns to the bank sooner.",
        "Extending DPO shifts cost to suppliers \u2014 expect price consequences."
      ],
      formula: [
        "DPO = (accounts payable / COGS) \xD7 365",
        "DSO = (accounts receivable / revenue) \xD7 365",
        "DIO = (inventory / COGS) \xD7 365",
        "CCC = DSO + DIO \u2212 DPO",
        "Working capital released = \u0394DPO \xD7 (COGS / 365)"
      ],
      groups: [PS2.G("Balance sheet inputs", "accountsPayable cogs inventory accountsReceivable revenue costOfCapital targetDpo")],
      fields: [
        PS2.F("accountsPayable", "Accounts payable", "curr", "req,nn", "2000000"),
        PS2.F("cogs", "Annual COGS", "curr", "req,nn", "16000000"),
        PS2.F("inventory", "Inventory value", "curr", "req,nn", "3000000"),
        PS2.F("accountsReceivable", "Accounts receivable", "curr", "req,nn", "2500000"),
        PS2.F("revenue", "Annual revenue", "curr", "req,nn", "25000000"),
        PS2.F("costOfCapital", "Cost of capital %", "pct", "req,nn", "12"),
        PS2.F("targetDpo", "Target DPO (days)", "num", "req,nn", "60")
      ],
      example: { accountsPayable: 2e6, cogs: 16e6, inventory: 3e6, accountsReceivable: 25e5, revenue: 25e6, costOfCapital: 12, targetDpo: 60 },
      handoffTo: ["calc-early-payment-roi", "calc-payment-terms"],
      rel: { sops: ["sop-payment-terms"], checklists: ["cl-invoice-processing"], calcs: ["calc-early-payment-roi"] },
      run: function(v) {
        return PS2.calcImpl.dpoWorkingCapital(v);
      }
    });
    PS2.calcImpl.dpoWorkingCapital = function(v) {
      var ap = PS2.num(v.accountsPayable);
      var cogs = PS2.num(v.cogs);
      var inv = PS2.num(v.inventory);
      var ar = PS2.num(v.accountsReceivable);
      var rev = PS2.num(v.revenue);
      var coc = PS2.num(v.costOfCapital) / 100;
      var target = PS2.num(v.targetDpo);
      var dpo2 = cogs > 0 ? ap / cogs * 365 : 0;
      var dso = rev > 0 ? ar / rev * 365 : 0;
      var dio = cogs > 0 ? inv / cogs * 365 : 0;
      var ccc = dso + dio - dpo2;
      var dailyCogs = cogs / 365;
      var deltaDpo = target - dpo2;
      var wcReleased = deltaDpo * dailyCogs;
      var annualValue = wcReleased * coc;
      var cccAtTarget = dso + dio - target;
      var w = [];
      if (deltaDpo < 0) w.push("Target DPO is below current DPO: you would be giving away working capital. Verify this is intentional (e.g., for a discount).");
      if (dpo2 > 90) w.push("DPO above 90 days is aggressive. Suppliers will price the delay into their rates.");
      if (ccc < 0) w.push("Negative CCC: suppliers fund your operation. Excellent if sustainable and not abusive.");
      if (deltaDpo > 30) w.push("A 30+ day DPO extension in one negotiation is rarely achievable. Phase it.");
      var verdict = ccc < 0 ? "Suppliers fund you" : ccc < 30 ? "Efficient" : ccc < 60 ? "Typical" : "Cash trapped";
      return PS2.C({
        r: [
          PS2.res("DPO", PS2.fmt(dpo2, 0) + " days", "How long you take to pay", "", true),
          PS2.res("DSO", PS2.fmt(dso, 0) + " days", "How long customers take to pay you"),
          PS2.res("DIO", PS2.fmt(dio, 0) + " days", "How long inventory sits"),
          PS2.res("Cash Conversion Cycle", PS2.fmt(ccc, 0) + " days", verdict),
          PS2.res("Working capital released", PS2.money(wcReleased), "From moving DPO to " + PS2.fmt(target, 0) + " days"),
          PS2.res("Annual value of release", PS2.money(annualValue), "At " + PS2.pct(coc * 100) + " cost of capital")
        ],
        t: {
          headers: ["Metric", "Value", "Meaning"],
          numCols: 1,
          rows: [
            { cells: ["DPO", PS2.fmt(dpo2, 1) + " days", "AP / COGS \xD7 365"] },
            { cells: ["DSO", PS2.fmt(dso, 1) + " days", "AR / Revenue \xD7 365"] },
            { cells: ["DIO", PS2.fmt(dio, 1) + " days", "Inventory / COGS \xD7 365"] },
            { cells: ["CCC", PS2.fmt(ccc, 1) + " days", "DSO + DIO \u2212 DPO"] },
            { cells: ["CCC at target DPO", PS2.fmt(cccAtTarget, 1) + " days", "If DPO reaches " + PS2.fmt(target, 0)] },
            { cells: ["Working capital released", PS2.money(wcReleased), "\u0394DPO \xD7 daily COGS"] },
            { cells: ["Annual value", PS2.money(annualValue), "Released \xD7 cost of capital"] }
          ],
          footer: ["Verdict", verdict, ""]
        },
        a: "<p>Your DPO is <strong>" + PS2.fmt(dpo2, 0) + " days</strong>. The Cash Conversion Cycle is <strong>" + PS2.fmt(ccc, 0) + " days</strong> \u2014 " + verdict.toLowerCase() + ".</p><p>Moving DPO to <strong>" + PS2.fmt(target, 0) + " days</strong> releases <strong>" + PS2.money(wcReleased) + "</strong> of working capital, worth <strong>" + PS2.money(annualValue) + "</strong> a year at your " + PS2.pct(coc * 100) + " cost of capital.</p><p>CCC = DSO + DIO \u2212 DPO. The three levers: collect faster (DSO), hold less inventory (DIO), pay slower (DPO). Procurement owns the third lever and influences the second.</p><p>Every day of DPO extension is a day of supplier credit. It is a negotiation, not a right \u2014 expect the price to reflect it.</p>",
        f: [
          "DPO = (AP / COGS) \xD7 365",
          "DSO = (AR / Revenue) \xD7 365",
          "DIO = (Inventory / COGS) \xD7 365",
          "CCC = DSO + DIO \u2212 DPO",
          "Working capital released = \u0394DPO \xD7 (COGS / 365)"
        ],
        as: [
          "COGS for DPO and DIO; revenue for DSO.",
          "Shorter CCC is better.",
          "Extending DPO shifts cost to suppliers."
        ],
        w,
        k: [
          "DPO " + PS2.fmt(dpo2, 0) + " days, CCC " + PS2.fmt(ccc, 0) + " days",
          "Releasing " + PS2.money(wcReleased) + " by moving DPO to " + PS2.fmt(target, 0),
          "Worth " + PS2.money(annualValue) + "/year at " + PS2.pct(coc * 100) + " CoC"
        ],
        s: "DPO " + PS2.fmt(dpo2, 0) + " days, CCC " + PS2.fmt(ccc, 0) + " days (" + verdict + "). Extending DPO to " + PS2.fmt(target, 0) + " releases " + PS2.money(annualValue) + "/year.",
        d: { dpo: dpo2, dso, dio, ccc, cccAtTarget, wcReleased, annualValue, verdict }
      });
    };
  }
});

// src/calcs/calc_addressable_spend.ts
var require_calc_addressable_spend = __commonJS({
  "src/calcs/calc_addressable_spend.ts"() {
    "use strict";
    init_ps();
    PS2.CALC.push({
      id: "calc-addressable-spend",
      title: "Addressable Spend Cube",
      cat: "Sourcing Tools",
      tags: ["addressable spend", "spend cube", "coverage", "tail spend", "sourcing opportunity"],
      purpose: "Quantify how much spend procurement can influence, how much is under contract, and how much sits in the unmanaged tail.",
      desc: "Total spend is not the same as influenceable spend. This calculator splits spend into addressable, contracted, and tail \u2014 the honest denominator for any savings target.",
      assumptions: [
        "Addressable spend excludes items procurement cannot influence (e.g., taxes, intercompany, payroll).",
        "Contract coverage means spend flowing through a negotiated agreement, not just a PO.",
        "The tail is where maverick spend hides."
      ],
      formula: [
        "Addressable spend = total spend \xD7 addressable %",
        "Contracted spend = addressable spend \xD7 coverage %",
        "Tail spend = addressable spend \u2212 contracted spend",
        "Sourcing opportunity = (tail spend + uncontracted addressable) \xD7 savings target %"
      ],
      groups: [PS2.G("Spend profile", "totalSpend addressablePct contractCoveragePct tailSpendPct savingsTargetPct")],
      fields: [
        PS2.F("totalSpend", "Total spend", "curr", "req,nn", "50000000"),
        PS2.F("addressablePct", "Addressable spend %", "pct", "req,nn,max=100", "80"),
        PS2.F("contractCoveragePct", "Contract coverage %", "pct", "req,nn,max=100", "60"),
        PS2.F("tailSpendPct", "Tail spend % of addressable", "pct", "req,nn,max=100", "20"),
        PS2.F("savingsTargetPct", "Savings target %", "pct", "req,nn", "5")
      ],
      example: { totalSpend: 5e7, addressablePct: 80, contractCoveragePct: 60, tailSpendPct: 20, savingsTargetPct: 5 },
      handoffTo: ["calc-pareto-analysis", "calc-rfx-event-roi"],
      rel: { sops: ["sop-inventory-management"], checklists: ["cl-category-review"], calcs: ["calc-pareto-analysis"] },
      run: function(v) {
        return PS2.calcImpl.addressableSpend(v);
      }
    });
    PS2.calcImpl.addressableSpend = function(v) {
      var total = PS2.num(v.totalSpend);
      var addrPct = PS2.num(v.addressablePct) / 100;
      var covPct = PS2.num(v.contractCoveragePct) / 100;
      var tailPct = PS2.num(v.tailSpendPct) / 100;
      var savPct = PS2.num(v.savingsTargetPct) / 100;
      var addressable = total * addrPct;
      var contracted = addressable * covPct;
      var tail = addressable * tailPct;
      var uncontractedAddressable = addressable - contracted;
      var opportunityBase = tail + uncontractedAddressable;
      var opportunity = opportunityBase * savPct;
      var coverageGap = addressable - contracted;
      var coverageGapPct = addressable > 0 ? coverageGap / addressable * 100 : 0;
      var maverickEstimate = tail * 0.5;
      var w = [];
      if (covPct < 0.5) w.push("Contract coverage below 50%: more spend flows outside negotiated agreements than through them. This is the first thing to fix.");
      if (tailPct > 0.3) w.push("Tail spend above 30% of addressable: a large share of spend is unmanaged. Consider catalogs, P-cards or a tail-spend agency.");
      if (addrPct < 0.6) w.push('Addressable spend below 60% of total: verify the exclusion list. Some "unaddressable" spend may be movable.');
      return PS2.C({
        r: [
          PS2.res("Addressable spend", PS2.money(addressable), PS2.pct(addrPct * 100) + " of " + PS2.moneyR(total), "", true),
          PS2.res("Under contract", PS2.money(contracted), PS2.pct(covPct * 100) + " coverage"),
          PS2.res("Uncontracted (coverage gap)", PS2.money(coverageGap), PS2.pct(coverageGapPct) + " of addressable"),
          PS2.res("Tail spend", PS2.money(tail), PS2.pct(tailPct * 100) + " of addressable"),
          PS2.res("Sourcing opportunity", PS2.money(opportunity), "At " + PS2.pct(savPct * 100) + " on the opportunity base"),
          PS2.res("Maverick spend (est.)", PS2.money(maverickEstimate), "Half the tail, conservatively")
        ],
        t: {
          headers: ["Segment", "Value", "% of total", "Note"],
          numCols: 1,
          rows: [
            { cells: ["Total spend", PS2.money(total), "100%", "Everything the business buys"] },
            { cells: ["Addressable", PS2.money(addressable), PS2.pct(addrPct * 100), "Procurement can influence"] },
            { cells: ["Under contract", PS2.money(contracted), PS2.pct(total > 0 ? contracted / total * 100 : 0), "Through negotiated agreements"] },
            { cells: ["Uncontracted", PS2.money(coverageGap), PS2.pct(total > 0 ? coverageGap / total * 100 : 0), "Addressable but not contracted"] },
            { cells: ["Tail", PS2.money(tail), PS2.pct(total > 0 ? tail / total * 100 : 0), "Low-value, high-count suppliers"] },
            { cells: ["Sourcing opportunity", PS2.money(opportunity), PS2.pct(total > 0 ? opportunity / total * 100 : 0), "Savings at " + PS2.pct(savPct * 100) + " on opportunity base"] }
          ],
          footer: ["Opportunity base", PS2.money(opportunityBase), PS2.pct(total > 0 ? opportunityBase / total * 100 : 0), "Tail + uncontracted"]
        },
        a: "<p>Of <strong>" + PS2.moneyR(total) + "</strong> total spend, <strong>" + PS2.money(addressable) + "</strong> (" + PS2.pct(addrPct * 100) + ") is addressable by procurement.</p><p>Only <strong>" + PS2.pct(covPct * 100) + "</strong> of that flows through contracts: <strong>" + PS2.money(coverageGap) + "</strong> of addressable spend sits outside any negotiated agreement.</p><p>The tail \u2014 <strong>" + PS2.money(tail) + "</strong> \u2014 is where maverick spend hides. An estimated <strong>" + PS2.money(maverickEstimate) + "</strong> bypasses procurement entirely.</p><p>At a " + PS2.pct(savPct * 100) + " savings target on the opportunity base of <strong>" + PS2.money(opportunityBase) + "</strong>, the realistic prize is <strong>" + PS2.money(opportunity) + '</strong>.</p><p>Every savings claim needs this denominator. "5% of total spend" is a slogan; "5% of addressable spend" is a number you can defend.</p>',
        f: [
          "Addressable = total \xD7 addressable %",
          "Contracted = addressable \xD7 coverage %",
          "Tail = addressable \xD7 tail %",
          "Opportunity = (tail + uncontracted) \xD7 savings %"
        ],
        as: [
          "Addressable excludes taxes, intercompany, payroll.",
          "Coverage means through a negotiated agreement.",
          "The tail is where maverick spend hides."
        ],
        w,
        k: [
          "Addressable: " + PS2.money(addressable) + " (" + PS2.pct(addrPct * 100) + ")",
          "Coverage gap: " + PS2.money(coverageGap),
          "Sourcing opportunity: " + PS2.money(opportunity)
        ],
        s: "Addressable spend " + PS2.money(addressable) + " of " + PS2.moneyR(total) + ". Coverage gap " + PS2.money(coverageGap) + ". Opportunity " + PS2.money(opportunity) + ".",
        d: { addressable, contracted, coverageGap, tail, opportunity, maverickEstimate, opportunityBase }
      });
    };
  }
});

// tools/test_batch2_calcs.mjs
init_ps();
var import_storage = __toESM(require_storage(), 1);

// src/core/rates.ts
init_ps();
PS2.RATES = [
  {
    key: "gstRate",
    label: "GST / VAT rate",
    category: "Tax",
    unit: "pct",
    defaultValue: 10,
    note: "Single flat rate for arithmetic only. Tiered, exempt or zero-rated lines need separate treatment.",
    source: "Verify against your tax authority schedule"
  },
  {
    key: "dutyRate",
    label: "Customs duty rate",
    category: "Trade",
    unit: "pct",
    defaultValue: 5,
    note: "Applied to CIF value. Preferential rates may apply under FTAs \u2014 check the HS code schedule.",
    source: "Verify against your customs tariff"
  },
  {
    key: "freightRate",
    label: "Freight & insurance %",
    category: "Trade",
    unit: "pct",
    defaultValue: 8,
    note: "Added to EXW/FOB to reach CIF. Varies by lane, mode and Incoterm.",
    source: "Verify against current carrier quotes"
  },
  {
    key: "costOfCapital",
    label: "Cost of capital (annual)",
    category: "Finance",
    unit: "pct",
    defaultValue: 12,
    note: "The rate at which the business can borrow or invest. Drives early-payment and TCO decisions.",
    source: "Verify against your treasury or WACC"
  },
  {
    key: "carryingCost",
    label: "Inventory carrying cost",
    category: "Inventory",
    unit: "pct",
    defaultValue: 25,
    note: "Annual cost to hold one unit of inventory: capital, storage, insurance, obsolescence.",
    source: "Verify against your finance team standard"
  },
  {
    key: "stockoutCost",
    label: "Cost per stockout event",
    category: "Inventory",
    unit: "curr",
    defaultValue: 500,
    note: "Lost sales, expediting, reputational damage per occurrence. Drives safety stock.",
    source: "Verify against your operations standard"
  },
  {
    key: "orderCost",
    label: "Cost per order (S)",
    category: "Inventory",
    unit: "curr",
    defaultValue: 100,
    note: "Fixed cost to place and receive one order: admin, processing, inspection.",
    source: "Verify against your procurement standard"
  },
  {
    key: "dpoTarget",
    label: "DPO target (days)",
    category: "Finance",
    unit: "days",
    defaultValue: 45,
    note: "Days Payable Outstanding target. Drives payment-terms negotiations.",
    source: "Verify against your cash management policy"
  },
  {
    key: "discountRate",
    label: "Early payment discount %",
    category: "Finance",
    unit: "pct",
    defaultValue: 2,
    note: 'The discount offered for early payment, e.g. 2 in "2/10 net 30".',
    source: "Verify against the supplier terms"
  },
  {
    key: "discountDays",
    label: "Discount period (days)",
    category: "Finance",
    unit: "days",
    defaultValue: 10,
    note: 'Days within which payment earns the discount, e.g. 10 in "2/10 net 30".',
    source: "Verify against the supplier terms"
  },
  {
    key: "netDays",
    label: "Net payment terms (days)",
    category: "Finance",
    unit: "days",
    defaultValue: 30,
    note: "Full payment due this many days after invoice. The baseline for DPO.",
    source: "Verify against the supplier terms"
  },
  {
    key: "inflationRate",
    label: "Annual inflation / index rate",
    category: "Negotiation",
    unit: "pct",
    defaultValue: 3,
    note: "Drives price-escalation clauses. Use the relevant CPI/PPI index for the category.",
    source: "Verify against the published index"
  },
  {
    key: "fxHedgeCost",
    label: "FX hedging cost %",
    category: "Trade",
    unit: "pct",
    defaultValue: 2,
    note: "Cost to hedge currency exposure via forward cover.",
    source: "Verify against your treasury"
  },
  {
    key: "qualityCost",
    label: "Quality / inspection cost %",
    category: "Inventory",
    unit: "pct",
    defaultValue: 3,
    note: "Incoming inspection, testing and rejection handling as % of material cost.",
    source: "Verify against your quality standard"
  },
  {
    key: "scrapRate",
    label: "Scrap / waste rate",
    category: "Inventory",
    unit: "pct",
    defaultValue: 5,
    note: "Material lost to scrap, waste or yield loss in production.",
    source: "Verify against your production standard"
  },
  {
    key: "leadTimeDays",
    label: "Average lead time (days)",
    category: "Inventory",
    unit: "days",
    defaultValue: 30,
    note: "Average supplier lead time. Drives reorder point and safety stock.",
    source: "Verify against actual supplier performance"
  },
  {
    key: "demandVariability",
    label: "Demand variability (\u03C3/\u03BC)",
    category: "Inventory",
    unit: "ratio",
    defaultValue: 0.3,
    note: "Coefficient of variation of demand. Drives safety stock for a target service level.",
    source: "Verify against your demand history"
  },
  {
    key: "serviceLevel",
    label: "Target service level",
    category: "Inventory",
    unit: "pct",
    defaultValue: 95,
    note: "Probability of not stocking out. 95% is common; 99% for critical items.",
    source: "Verify against your inventory policy"
  },
  {
    key: "altmanX1",
    label: "Altman Z: working capital / total assets",
    category: "Supplier Risk",
    unit: "ratio",
    defaultValue: 0.2,
    note: "Liquidity ratio. Part of the Z-score solvency model.",
    source: "Compute from the supplier balance sheet"
  },
  {
    key: "altmanX2",
    label: "Altman Z: retained earnings / total assets",
    category: "Supplier Risk",
    unit: "ratio",
    defaultValue: 0.3,
    note: "Profitability ratio. Part of the Z-score solvency model.",
    source: "Compute from the supplier balance sheet"
  },
  {
    key: "altmanX3",
    label: "Altman Z: EBIT / total assets",
    category: "Supplier Risk",
    unit: "ratio",
    defaultValue: 0.15,
    note: "Operating efficiency. Part of the Z-score solvency model.",
    source: "Compute from the supplier balance sheet"
  },
  {
    key: "altmanX4",
    label: "Altman Z: market equity / total liabilities",
    category: "Supplier Risk",
    unit: "ratio",
    defaultValue: 1.5,
    note: "Leverage ratio. Part of the Z-score solvency model.",
    source: "Compute from the supplier balance sheet"
  },
  {
    key: "altmanX5",
    label: "Altman Z: sales / total assets",
    category: "Supplier Risk",
    unit: "ratio",
    defaultValue: 1.2,
    note: "Asset turnover. Part of the Z-score solvency model.",
    source: "Compute from the supplier balance sheet"
  },
  {
    key: "slaCreditRate",
    label: "SLA credit % per breach",
    category: "Contracts",
    unit: "pct",
    defaultValue: 5,
    note: "Contract value credited back per SLA breach. Drives the penalty calculator.",
    source: "Verify against the contract terms"
  },
  {
    key: "liabilityCap",
    label: "Liability cap % of contract",
    category: "Contracts",
    unit: "pct",
    defaultValue: 100,
    note: "Maximum liability as % of contract value. Drives the clause redline audit.",
    source: "Verify against the contract terms"
  },
  {
    key: "paymentTermsDays",
    label: "Standard payment terms (days)",
    category: "Finance",
    unit: "days",
    defaultValue: 30,
    note: "Baseline payment terms for DPO and working-capital calculations.",
    source: "Verify against your payment policy"
  },
  {
    key: "budgetVarianceThreshold",
    label: "Budget variance alert %",
    category: "Budget",
    unit: "pct",
    defaultValue: 10,
    note: "Variance from budget that triggers an alert or review.",
    source: "Verify against your finance policy"
  },
  {
    key: "savingsTarget",
    label: "Savings target %",
    category: "Budget",
    unit: "pct",
    defaultValue: 5,
    note: "Target savings as % of addressable spend. Drives the savings waterfall.",
    source: "Verify against your category strategy"
  },
  {
    key: "maverickThreshold",
    label: "Maverick spend alert %",
    category: "Governance",
    unit: "pct",
    defaultValue: 15,
    note: "Spend outside contracted suppliers that triggers a governance review.",
    source: "Verify against your procurement policy"
  },
  {
    key: "concentrationLimit",
    label: "Single-supplier concentration limit %",
    category: "Supplier Risk",
    unit: "pct",
    defaultValue: 30,
    note: "Maximum share of category spend with one supplier before dual-sourcing is required.",
    source: "Verify against your risk policy"
  },
  {
    key: "otifTarget",
    label: "OTIF target %",
    category: "Inventory",
    unit: "pct",
    defaultValue: 95,
    note: "On-Time-In-Full target. Drives the service-level calculator.",
    source: "Verify against your operations standard"
  },
  {
    key: "leadTimeVariability",
    label: "Lead time variability (\u03C3 days)",
    category: "Inventory",
    unit: "days",
    defaultValue: 5,
    note: "Standard deviation of lead time. Drives safety stock alongside demand variability.",
    source: "Verify against actual supplier performance"
  },
  {
    key: "reviewPeriodDays",
    label: "Supplier review period (days)",
    category: "Supplier Risk",
    unit: "days",
    defaultValue: 90,
    note: "How often supplier risk is reassessed. Drives the risk scorecard.",
    source: "Verify against your SRM policy"
  },
  {
    key: "esgWeight",
    label: "ESG weight in scorecard %",
    category: "Supplier Risk",
    unit: "pct",
    defaultValue: 15,
    note: "Weight given to ESG criteria in supplier evaluation.",
    source: "Verify against your sustainability policy"
  },
  {
    key: "qualityWeight",
    label: "Quality weight in scorecard %",
    category: "Supplier Risk",
    unit: "pct",
    defaultValue: 30,
    note: "Weight given to quality criteria in supplier evaluation.",
    source: "Verify against your evaluation standard"
  },
  {
    key: "priceWeight",
    label: "Price weight in scorecard %",
    category: "Supplier Risk",
    unit: "pct",
    defaultValue: 30,
    note: "Weight given to price criteria in supplier evaluation.",
    source: "Verify against your evaluation standard"
  },
  {
    key: "deliveryWeight",
    label: "Delivery weight in scorecard %",
    category: "Supplier Risk",
    unit: "pct",
    defaultValue: 20,
    note: "Weight given to delivery criteria in supplier evaluation.",
    source: "Verify against your evaluation standard"
  },
  {
    key: "innovationWeight",
    label: "Innovation weight in scorecard %",
    category: "Supplier Risk",
    unit: "pct",
    defaultValue: 5,
    note: "Weight given to innovation criteria in supplier evaluation.",
    source: "Verify against your evaluation standard"
  },
  {
    key: "rfxSavingsTarget",
    label: "RFx event savings target %",
    category: "Sourcing",
    unit: "pct",
    defaultValue: 8,
    note: "Expected savings from a sourcing event. Drives the event ROI calculator.",
    source: "Verify against your category strategy"
  },
  {
    key: "addressableSpendPct",
    label: "Addressable spend %",
    category: "Sourcing",
    unit: "pct",
    defaultValue: 80,
    note: "Share of total spend that is addressable through sourcing initiatives.",
    source: "Verify against your spend cube"
  },
  {
    key: "tailSpendPct",
    label: "Tail spend %",
    category: "Sourcing",
    unit: "pct",
    defaultValue: 20,
    note: "Share of spend in the long tail. Drives the Pareto analysis.",
    source: "Verify against your spend cube"
  },
  {
    key: "contractCoverageTarget",
    label: "Contract coverage target %",
    category: "Contracts",
    unit: "pct",
    defaultValue: 90,
    note: "Target % of addressable spend under contract.",
    source: "Verify against your procurement policy"
  },
  {
    key: "renewalNoticeDays",
    label: "Renewal notice period (days)",
    category: "Contracts",
    unit: "days",
    defaultValue: 60,
    note: "Days before expiry that a contract renewal must be initiated.",
    source: "Verify against your contract policy"
  },
  {
    key: "negotiationRounds",
    label: "Expected negotiation rounds",
    category: "Negotiation",
    unit: "ratio",
    defaultValue: 3,
    note: "Typical number of rounds in a strategic negotiation. Drives the savings waterfall.",
    source: "Verify against your negotiation playbook"
  },
  {
    key: "walkAwayPoint",
    label: "Walk-away point % of target",
    category: "Negotiation",
    unit: "pct",
    defaultValue: 110,
    note: "The point at which the deal is worse than no deal. Drives the BATNA calculator.",
    source: "Verify against your negotiation mandate"
  },
  {
    key: "totalCostPremium",
    label: "TCO premium over price %",
    category: "Cost",
    unit: "pct",
    defaultValue: 40,
    note: "Typical premium of total cost over unit price. Drives the TCO calculator.",
    source: "Verify against your cost models"
  },
  {
    key: "warrantyPeriodYears",
    label: "Warranty period (years)",
    category: "Contracts",
    unit: "ratio",
    defaultValue: 1,
    note: "Standard warranty period. Drives the TCO and clause audit calculators.",
    source: "Verify against the contract terms"
  },
  {
    key: "maintenanceCostPct",
    label: "Annual maintenance % of capex",
    category: "Cost",
    unit: "pct",
    defaultValue: 5,
    note: "Annual maintenance as % of capital cost. Drives the TCO calculator.",
    source: "Verify against your asset standard"
  },
  {
    key: "energyCostPct",
    label: "Annual energy % of capex",
    category: "Cost",
    unit: "pct",
    defaultValue: 8,
    note: "Annual energy cost as % of capital cost. Drives the TCO calculator.",
    source: "Verify against your utility rates"
  },
  {
    key: "downtimeCostPerHour",
    label: "Downtime cost per hour",
    category: "Cost",
    unit: "curr",
    defaultValue: 500,
    note: "Cost of production downtime per hour. Drives the TCO and make-vs-buy calculators.",
    source: "Verify against your operations standard"
  },
  {
    key: "laborRate",
    label: "Fully loaded labor rate / hour",
    category: "Cost",
    unit: "curr",
    defaultValue: 50,
    note: "Fully loaded labor rate. Drives the should-cost and make-vs-buy calculators.",
    source: "Verify against your HR standard"
  },
  {
    key: "machineRate",
    label: "Machine overhead rate / hour",
    category: "Cost",
    unit: "curr",
    defaultValue: 30,
    note: "Machine overhead rate. Drives the should-cost calculator.",
    source: "Verify against your production standard"
  },
  {
    key: "sgaRate",
    label: "SG&A overhead rate %",
    category: "Cost",
    unit: "pct",
    defaultValue: 15,
    note: "Selling, general and administrative overhead as % of direct cost. Drives should-cost.",
    source: "Verify against your finance standard"
  },
  {
    key: "supplierMargin",
    label: "Fair supplier margin %",
    category: "Cost",
    unit: "pct",
    defaultValue: 10,
    note: "A sustainable margin for the supplier. Drives the should-cost and negotiation calculators.",
    source: "Verify against your category strategy"
  },
  {
    key: "rawMaterialIndex",
    label: "Raw material index (base=100)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 100,
    note: "Index for raw material cost escalation. Drives the price-escalation calculator.",
    source: "Verify against the published commodity index"
  },
  {
    key: "laborIndex",
    label: "Labor index (base=100)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 100,
    note: "Index for labor cost escalation. Drives the price-escalation calculator.",
    source: "Verify against the published wage index"
  },
  {
    key: "fxRate",
    label: "FX rate (local per USD)",
    category: "Trade",
    unit: "ratio",
    defaultValue: 1,
    note: "Exchange rate for landed-cost and TCO calculations.",
    source: "Verify against the current market rate"
  },
  {
    key: "fxVolatility",
    label: "FX volatility (annual \u03C3 %)",
    category: "Trade",
    unit: "pct",
    defaultValue: 10,
    note: "Annualized FX volatility. Drives the hedging calculator.",
    source: "Verify against the market data"
  },
  {
    key: "containerCost",
    label: "Container shipping cost",
    category: "Trade",
    unit: "curr",
    defaultValue: 2e3,
    note: "Cost to ship one container. Drives the landed-cost calculator.",
    source: "Verify against current carrier quotes"
  },
  {
    key: "containerVolume",
    label: "Container volume (CBM)",
    category: "Trade",
    unit: "ratio",
    defaultValue: 28,
    note: "Usable volume of a standard container. Drives the landed-cost calculator.",
    source: "Verify against the container spec"
  },
  {
    key: "portDrayage",
    label: "Port drayage cost",
    category: "Trade",
    unit: "curr",
    defaultValue: 500,
    note: "Cost to move goods from port to warehouse. Drives the landed-cost calculator.",
    source: "Verify against current carrier quotes"
  },
  {
    key: "demurragePerDay",
    label: "Demurrage cost per day",
    category: "Trade",
    unit: "curr",
    defaultValue: 150,
    note: "Cost per day of container demurrage. Drives the landed-cost calculator.",
    source: "Verify against the port tariff"
  },
  {
    key: "insuranceRate",
    label: "Marine insurance rate %",
    category: "Trade",
    unit: "pct",
    defaultValue: 0.5,
    note: "Insurance as % of CIF value. Drives the landed-cost calculator.",
    source: "Verify against your insurance policy"
  },
  {
    key: "handlingCostPerUnit",
    label: "Handling cost per unit",
    category: "Trade",
    unit: "curr",
    defaultValue: 2,
    note: "Inbound handling cost per unit. Drives the landed-cost calculator.",
    source: "Verify against your warehouse standard"
  },
  {
    key: "customsBrokerFee",
    label: "Customs broker fee",
    category: "Trade",
    unit: "curr",
    defaultValue: 200,
    note: "Fee for customs clearance. Drives the landed-cost calculator.",
    source: "Verify against your broker contract"
  },
  {
    key: "bankFeePct",
    label: "Bank fee % of transaction",
    category: "Trade",
    unit: "pct",
    defaultValue: 0.5,
    note: "Bank charges for letters of credit and transfers. Drives the landed-cost calculator.",
    source: "Verify against your bank tariff"
  },
  {
    key: "riskWeight",
    label: "Risk weight in scorecard %",
    category: "Supplier Risk",
    unit: "pct",
    defaultValue: 20,
    note: "Weight given to risk criteria in supplier evaluation.",
    source: "Verify against your evaluation standard"
  },
  {
    key: "serviceWeight",
    label: "Service weight in scorecard %",
    category: "Supplier Risk",
    unit: "pct",
    defaultValue: 10,
    note: "Weight given to service criteria in supplier evaluation.",
    source: "Verify against your evaluation standard"
  },
  {
    key: "complianceWeight",
    label: "Compliance weight in scorecard %",
    category: "Supplier Risk",
    unit: "pct",
    defaultValue: 10,
    note: "Weight given to compliance criteria in supplier evaluation.",
    source: "Verify against your evaluation standard"
  },
  {
    key: "financialWeight",
    label: "Financial weight in scorecard %",
    category: "Supplier Risk",
    unit: "pct",
    defaultValue: 20,
    note: "Weight given to financial criteria in supplier evaluation.",
    source: "Verify against your evaluation standard"
  },
  {
    key: "strategicWeight",
    label: "Strategic weight in scorecard %",
    category: "Supplier Risk",
    unit: "pct",
    defaultValue: 10,
    note: "Weight given to strategic criteria in supplier evaluation.",
    source: "Verify against your evaluation standard"
  },
  {
    key: "bidWeightPrice",
    label: "Bid weight: price %",
    category: "Sourcing",
    unit: "pct",
    defaultValue: 40,
    note: "Weight given to price in bid evaluation.",
    source: "Verify against your evaluation standard"
  },
  {
    key: "bidWeightTechnical",
    label: "Bid weight: technical %",
    category: "Sourcing",
    unit: "pct",
    defaultValue: 35,
    note: "Weight given to technical criteria in bid evaluation.",
    source: "Verify against your evaluation standard"
  },
  {
    key: "bidWeightCommercial",
    label: "Bid weight: commercial %",
    category: "Sourcing",
    unit: "pct",
    defaultValue: 25,
    note: "Weight given to commercial criteria in bid evaluation.",
    source: "Verify against your evaluation standard"
  },
  {
    key: "auctionStartingDiscount",
    label: "Auction starting discount %",
    category: "Sourcing",
    unit: "pct",
    defaultValue: 5,
    note: "Expected starting discount in an e-auction. Drives the auction calculator.",
    source: "Verify against your auction strategy"
  },
  {
    key: "auctionLotSize",
    label: "Auction lot size",
    category: "Sourcing",
    unit: "ratio",
    defaultValue: 1e5,
    note: "Value of one auction lot. Drives the auction calculator.",
    source: "Verify against your sourcing strategy"
  },
  {
    key: "savingsLeakagePct",
    label: "Savings leakage %",
    category: "Budget",
    unit: "pct",
    defaultValue: 20,
    note: "Share of negotiated savings that leaks before realization. Drives the savings waterfall.",
    source: "Verify against your savings tracking"
  },
  {
    key: "savingsRealizationPct",
    label: "Savings realization %",
    category: "Budget",
    unit: "pct",
    defaultValue: 80,
    note: "Share of negotiated savings actually realized. Drives the savings waterfall.",
    source: "Verify against your savings tracking"
  },
  {
    key: "hardSavingsPct",
    label: "Hard savings % of total",
    category: "Budget",
    unit: "pct",
    defaultValue: 70,
    note: "Share of savings that is hard (P&L) vs soft (cost avoidance).",
    source: "Verify against your savings policy"
  },
  {
    key: "softSavingsPct",
    label: "Soft savings % of total",
    category: "Budget",
    unit: "pct",
    defaultValue: 30,
    note: "Share of savings that is soft (cost avoidance) vs hard (P&L).",
    source: "Verify against your savings policy"
  },
  {
    key: "budgetCycleMonths",
    label: "Budget cycle (months)",
    category: "Budget",
    unit: "ratio",
    defaultValue: 12,
    note: "Months in the budget cycle. Drives the budget-vs-actual calculator.",
    source: "Verify against your finance calendar"
  },
  {
    key: "forecastAccuracy",
    label: "Forecast accuracy %",
    category: "Inventory",
    unit: "pct",
    defaultValue: 80,
    note: "Forecast accuracy. Drives the safety stock and OTIF calculators.",
    source: "Verify against your demand planning"
  },
  {
    key: "reviewFrequency",
    label: "Inventory review frequency (days)",
    category: "Inventory",
    unit: "days",
    defaultValue: 7,
    note: "How often inventory is reviewed. Drives the EOQ and reorder point calculators.",
    source: "Verify against your inventory policy"
  },
  {
    key: "productionRate",
    label: "Production rate (units/day)",
    category: "Inventory",
    unit: "ratio",
    defaultValue: 100,
    note: "Daily production rate. Drives the EPQ and reorder point calculators.",
    source: "Verify against your production schedule"
  },
  {
    key: "setupCost",
    label: "Production setup cost",
    category: "Inventory",
    unit: "curr",
    defaultValue: 500,
    note: "Cost to set up a production run. Drives the EPQ calculator.",
    source: "Verify against your production standard"
  },
  {
    key: "holdingCostPerUnit",
    label: "Holding cost per unit / year",
    category: "Inventory",
    unit: "curr",
    defaultValue: 5,
    note: "Annual cost to hold one unit. Drives the EOQ calculator.",
    source: "Verify against your finance standard"
  },
  {
    key: "stockoutCostPerUnit",
    label: "Stockout cost per unit",
    category: "Inventory",
    unit: "curr",
    defaultValue: 20,
    note: "Cost of a stockout per unit. Drives the safety stock calculator.",
    source: "Verify against your operations standard"
  },
  {
    key: "backorderCost",
    label: "Backorder cost per unit",
    category: "Inventory",
    unit: "curr",
    defaultValue: 10,
    note: "Cost of a backorder per unit. Drives the service level calculator.",
    source: "Verify against your operations standard"
  },
  {
    key: "fillRateTarget",
    label: "Fill rate target %",
    category: "Inventory",
    unit: "pct",
    defaultValue: 98,
    note: "Target fill rate. Drives the service level and safety stock calculators.",
    source: "Verify against your operations standard"
  },
  {
    key: "cycleServiceLevel",
    label: "Cycle service level %",
    category: "Inventory",
    unit: "pct",
    defaultValue: 95,
    note: "Probability of not stocking out in a replenishment cycle.",
    source: "Verify against your inventory policy"
  },
  {
    key: "zScore95",
    label: "Z-score for 95% service level",
    category: "Inventory",
    unit: "ratio",
    defaultValue: 1.645,
    note: "Z-score for 95% service level. Drives the safety stock calculator.",
    source: "Standard normal distribution table"
  },
  {
    key: "zScore99",
    label: "Z-score for 99% service level",
    category: "Inventory",
    unit: "ratio",
    defaultValue: 2.326,
    note: "Z-score for 99% service level. Drives the safety stock calculator.",
    source: "Standard normal distribution table"
  },
  {
    key: "leadTimeReviewPeriod",
    label: "Lead time + review period (days)",
    category: "Inventory",
    unit: "days",
    defaultValue: 37,
    note: "Total lead time plus review period. Drives the reorder point calculator.",
    source: "Verify against actual supplier performance"
  },
  {
    key: "averageDailyDemand",
    label: "Average daily demand (units)",
    category: "Inventory",
    unit: "ratio",
    defaultValue: 10,
    note: "Average daily demand. Drives the reorder point and EOQ calculators.",
    source: "Verify against your demand history"
  },
  {
    key: "standardDeviationDemand",
    label: "Std dev of daily demand",
    category: "Inventory",
    unit: "ratio",
    defaultValue: 3,
    note: "Standard deviation of daily demand. Drives the safety stock calculator.",
    source: "Verify against your demand history"
  },
  {
    key: "standardDeviationLeadTime",
    label: "Std dev of lead time (days)",
    category: "Inventory",
    unit: "days",
    defaultValue: 5,
    note: "Standard deviation of lead time. Drives the safety stock calculator.",
    source: "Verify against actual supplier performance"
  },
  {
    key: "unitCost",
    label: "Unit cost",
    category: "Inventory",
    unit: "curr",
    defaultValue: 50,
    note: "Cost per unit. Drives the EOQ and TCO calculators.",
    source: "Verify against your cost models"
  },
  {
    key: "annualDemand",
    label: "Annual demand (units)",
    category: "Inventory",
    unit: "ratio",
    defaultValue: 3650,
    note: "Annual demand in units. Drives the EOQ calculator.",
    source: "Verify against your demand history"
  },
  {
    key: "orderingCost",
    label: "Ordering cost per order",
    category: "Inventory",
    unit: "curr",
    defaultValue: 100,
    note: "Fixed cost per order. Drives the EOQ calculator.",
    source: "Verify against your procurement standard"
  },
  {
    key: "holdingCostRate",
    label: "Holding cost rate % of unit cost",
    category: "Inventory",
    unit: "pct",
    defaultValue: 25,
    note: "Annual holding cost as % of unit cost. Drives the EOQ calculator.",
    source: "Verify against your finance standard"
  },
  {
    key: "purchasePrice",
    label: "Purchase price per unit",
    category: "Cost",
    unit: "curr",
    defaultValue: 100,
    note: "Purchase price per unit. Drives the TCO and should-cost calculators.",
    source: "Verify against your cost models"
  },
  {
    key: "operatingCostPerYear",
    label: "Annual operating cost",
    category: "Cost",
    unit: "curr",
    defaultValue: 2e4,
    note: "Annual operating cost. Drives the TCO calculator.",
    source: "Verify against your cost models"
  },
  {
    key: "maintenanceCostPerYear",
    label: "Annual maintenance cost",
    category: "Cost",
    unit: "curr",
    defaultValue: 5e3,
    note: "Annual maintenance cost. Drives the TCO calculator.",
    source: "Verify against your asset standard"
  },
  {
    key: "energyCostPerYear",
    label: "Annual energy cost",
    category: "Cost",
    unit: "curr",
    defaultValue: 8e3,
    note: "Annual energy cost. Drives the TCO calculator.",
    source: "Verify against your utility rates"
  },
  {
    key: "downtimeCostPerYear",
    label: "Annual downtime cost",
    category: "Cost",
    unit: "curr",
    defaultValue: 3e3,
    note: "Annual downtime cost. Drives the TCO calculator.",
    source: "Verify against your operations standard"
  },
  {
    key: "disposalCost",
    label: "Disposal / salvage value",
    category: "Cost",
    unit: "curr",
    defaultValue: 5e3,
    note: "End-of-life disposal or salvage value. Drives the TCO calculator.",
    source: "Verify against your asset standard"
  },
  {
    key: "lifeYears",
    label: "Asset life (years)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 5,
    note: "Expected asset life in years. Drives the TCO calculator.",
    source: "Verify against your asset standard"
  },
  {
    key: "discountRateTCO",
    label: "Discount rate for TCO %",
    category: "Cost",
    unit: "pct",
    defaultValue: 10,
    note: "Discount rate for NPV calculations in TCO.",
    source: "Verify against your finance standard"
  },
  {
    key: "taxRateTCO",
    label: "Tax rate for TCO %",
    category: "Cost",
    unit: "pct",
    defaultValue: 25,
    note: "Tax rate for TCO calculations.",
    source: "Verify against your tax authority"
  },
  {
    key: "depreciationRate",
    label: "Depreciation rate %",
    category: "Cost",
    unit: "pct",
    defaultValue: 20,
    note: "Annual depreciation rate. Drives the TCO calculator.",
    source: "Verify against your finance standard"
  },
  {
    key: "insuranceCostPerYear",
    label: "Annual insurance cost",
    category: "Cost",
    unit: "curr",
    defaultValue: 2e3,
    note: "Annual insurance cost. Drives the TCO calculator.",
    source: "Verify against your insurance policy"
  },
  {
    key: "trainingCost",
    label: "Training cost (one-time)",
    category: "Cost",
    unit: "curr",
    defaultValue: 3e3,
    note: "One-time training cost. Drives the TCO calculator.",
    source: "Verify against your HR standard"
  },
  {
    key: "installationCost",
    label: "Installation cost (one-time)",
    category: "Cost",
    unit: "curr",
    defaultValue: 5e3,
    note: "One-time installation cost. Drives the TCO calculator.",
    source: "Verify against your project budget"
  },
  {
    key: "decommissioningCost",
    label: "Decommissioning cost",
    category: "Cost",
    unit: "curr",
    defaultValue: 4e3,
    note: "Cost to decommission at end of life. Drives the TCO calculator.",
    source: "Verify against your asset standard"
  },
  {
    key: "opportunityCost",
    label: "Opportunity cost %",
    category: "Cost",
    unit: "pct",
    defaultValue: 8,
    note: "Opportunity cost of capital tied up. Drives the TCO calculator.",
    source: "Verify against your finance standard"
  },
  {
    key: "riskPremium",
    label: "Risk premium %",
    category: "Cost",
    unit: "pct",
    defaultValue: 2,
    note: "Risk premium for uncertainty. Drives the TCO calculator.",
    source: "Verify against your risk policy"
  },
  {
    key: "inflationRateTCO",
    label: "Inflation rate for TCO %",
    category: "Cost",
    unit: "pct",
    defaultValue: 3,
    note: "Inflation rate for TCO calculations.",
    source: "Verify against the published index"
  },
  {
    key: "exchangeRateTCO",
    label: "Exchange rate for TCO",
    category: "Cost",
    unit: "ratio",
    defaultValue: 1,
    note: "Exchange rate for TCO calculations.",
    source: "Verify against the current market rate"
  },
  {
    key: "tariffRate",
    label: "Tariff rate %",
    category: "Trade",
    unit: "pct",
    defaultValue: 5,
    note: "Tariff rate for TCO calculations.",
    source: "Verify against your customs tariff"
  },
  {
    key: "logisticsCostTCO",
    label: "Logistics cost % of price",
    category: "Trade",
    unit: "pct",
    defaultValue: 8,
    note: "Logistics cost as % of purchase price. Drives the TCO calculator.",
    source: "Verify against your logistics standard"
  },
  {
    key: "qualityCostTCO",
    label: "Quality cost % of price",
    category: "Trade",
    unit: "pct",
    defaultValue: 3,
    note: "Quality cost as % of purchase price. Drives the TCO calculator.",
    source: "Verify against your quality standard"
  },
  {
    key: "inventoryCostTCO",
    label: "Inventory cost % of price",
    category: "Trade",
    unit: "pct",
    defaultValue: 5,
    note: "Inventory cost as % of purchase price. Drives the TCO calculator.",
    source: "Verify against your inventory standard"
  },
  {
    key: "adminCostTCO",
    label: "Admin cost % of price",
    category: "Trade",
    unit: "pct",
    defaultValue: 2,
    note: "Admin cost as % of purchase price. Drives the TCO calculator.",
    source: "Verify against your admin standard"
  },
  {
    key: "warrantyCostTCO",
    label: "Warranty cost % of price",
    category: "Trade",
    unit: "pct",
    defaultValue: 2,
    note: "Warranty cost as % of purchase price. Drives the TCO calculator.",
    source: "Verify against the contract terms"
  },
  {
    key: "financingCostTCO",
    label: "Financing cost % of price",
    category: "Trade",
    unit: "pct",
    defaultValue: 1,
    note: "Financing cost as % of purchase price. Drives the TCO calculator.",
    source: "Verify against your finance standard"
  },
  {
    key: "environmentalCostTCO",
    label: "Environmental cost % of price",
    category: "Trade",
    unit: "pct",
    defaultValue: 1,
    note: "Environmental cost as % of purchase price. Drives the TCO calculator.",
    source: "Verify against your sustainability standard"
  },
  {
    key: "socialCostTCO",
    label: "Social cost % of price",
    category: "Trade",
    unit: "pct",
    defaultValue: 0.5,
    note: "Social cost as % of purchase price. Drives the TCO calculator.",
    source: "Verify against your sustainability standard"
  },
  {
    key: "totalCostTCO",
    label: "Total cost of ownership",
    category: "Cost",
    unit: "curr",
    defaultValue: 0,
    note: "Calculated total cost of ownership. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "costPerUnitTCO",
    label: "Cost per unit (TCO)",
    category: "Cost",
    unit: "curr",
    defaultValue: 0,
    note: "Calculated cost per unit over the asset life. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "npvTCO",
    label: "Net present value (TCO)",
    category: "Cost",
    unit: "curr",
    defaultValue: 0,
    note: "Calculated NPV of total cost of ownership. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "irrTCO",
    label: "Internal rate of return (TCO)",
    category: "Cost",
    unit: "pct",
    defaultValue: 0,
    note: "Calculated IRR of total cost of ownership. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "paybackPeriodTCO",
    label: "Payback period (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated payback period. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "roiTCO",
    label: "Return on investment (TCO)",
    category: "Cost",
    unit: "pct",
    defaultValue: 0,
    note: "Calculated ROI of total cost of ownership. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "benefitCostRatioTCO",
    label: "Benefit-cost ratio (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated benefit-cost ratio. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "totalBenefitsTCO",
    label: "Total benefits (TCO)",
    category: "Cost",
    unit: "curr",
    defaultValue: 0,
    note: "Calculated total benefits. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "totalCostsTCO",
    label: "Total costs (TCO)",
    category: "Cost",
    unit: "curr",
    defaultValue: 0,
    note: "Calculated total costs. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "netBenefitTCO",
    label: "Net benefit (TCO)",
    category: "Cost",
    unit: "curr",
    defaultValue: 0,
    note: "Calculated net benefit. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "costBreakdownTCO",
    label: "Cost breakdown (TCO)",
    category: "Cost",
    unit: "curr",
    defaultValue: 0,
    note: "Calculated cost breakdown. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "sensitivityTCO",
    label: "Sensitivity analysis (TCO)",
    category: "Cost",
    unit: "pct",
    defaultValue: 0,
    note: "Calculated sensitivity. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "scenarioTCO",
    label: "Scenario analysis (TCO)",
    category: "Cost",
    unit: "curr",
    defaultValue: 0,
    note: "Calculated scenario. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "monteCarloTCO",
    label: "Monte Carlo simulation (TCO)",
    category: "Cost",
    unit: "curr",
    defaultValue: 0,
    note: "Calculated Monte Carlo result. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "decisionTCO",
    label: "Decision recommendation (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated decision recommendation. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "riskAssessmentTCO",
    label: "Risk assessment (TCO)",
    category: "Cost",
    unit: "pct",
    defaultValue: 0,
    note: "Calculated risk assessment. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "confidenceLevelTCO",
    label: "Confidence level (TCO)",
    category: "Cost",
    unit: "pct",
    defaultValue: 0,
    note: "Calculated confidence level. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "probabilityTCO",
    label: "Probability (TCO)",
    category: "Cost",
    unit: "pct",
    defaultValue: 0,
    note: "Calculated probability. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "expectedValueTCO",
    label: "Expected value (TCO)",
    category: "Cost",
    unit: "curr",
    defaultValue: 0,
    note: "Calculated expected value. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "standardDeviationTCO",
    label: "Standard deviation (TCO)",
    category: "Cost",
    unit: "curr",
    defaultValue: 0,
    note: "Calculated standard deviation. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "varianceTCO",
    label: "Variance (TCO)",
    category: "Cost",
    unit: "curr",
    defaultValue: 0,
    note: "Calculated variance. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "coefficientOfVariationTCO",
    label: "Coefficient of variation (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated coefficient of variation. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "skewnessTCO",
    label: "Skewness (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated skewness. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "kurtosisTCO",
    label: "Kurtosis (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated kurtosis. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "correlationTCO",
    label: "Correlation (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated correlation. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "regressionTCO",
    label: "Regression (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated regression. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "trendTCO",
    label: "Trend (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated trend. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "seasonalityTCO",
    label: "Seasonality (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated seasonality. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "cyclicalityTCO",
    label: "Cyclicality (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated cyclicality. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "randomnessTCO",
    label: "Randomness (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated randomness. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "volatilityTCO",
    label: "Volatility (TCO)",
    category: "Cost",
    unit: "pct",
    defaultValue: 0,
    note: "Calculated volatility. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "stabilityTCO",
    label: "Stability (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated stability. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "predictabilityTCO",
    label: "Predictability (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated predictability. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "reliabilityTCO",
    label: "Reliability (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated reliability. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "availabilityTCO",
    label: "Availability (TCO)",
    category: "Cost",
    unit: "pct",
    defaultValue: 0,
    note: "Calculated availability. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "maintainabilityTCO",
    label: "Maintainability (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated maintainability. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "supportabilityTCO",
    label: "Supportability (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated supportability. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "testabilityTCO",
    label: "Testability (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated testability. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "flexibilityTCO",
    label: "Flexibility (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated flexibility. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "scalabilityTCO",
    label: "Scalability (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated scalability. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "portabilityTCO",
    label: "Portability (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated portability. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "interoperabilityTCO",
    label: "Interoperability (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated interoperability. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "compatibilityTCO",
    label: "Compatibility (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated compatibility. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "usabilityTCO",
    label: "Usability (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated usability. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "accessibilityTCO",
    label: "Accessibility (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated accessibility. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "securityTCO",
    label: "Security (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated security. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "privacyTCO",
    label: "Privacy (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated privacy. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "complianceTCO",
    label: "Compliance (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated compliance. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "auditabilityTCO",
    label: "Auditability (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated auditability. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "traceabilityTCO",
    label: "Traceability (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated traceability. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "transparencyTCO",
    label: "Transparency (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated transparency. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "accountabilityTCO",
    label: "Accountability (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated accountability. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "integrityTCO",
    label: "Integrity (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated integrity. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "authenticityTCO",
    label: "Authenticity (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated authenticity. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "nonRepudiationTCO",
    label: "Non-repudiation (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated non-repudiation. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "confidentialityTCO",
    label: "Confidentiality (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated confidentiality. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "availability2TCO",
    label: "Availability 2 (TCO)",
    category: "Cost",
    unit: "pct",
    defaultValue: 0,
    note: "Calculated availability 2. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "integrity2TCO",
    label: "Integrity 2 (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated integrity 2. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "authenticity2TCO",
    label: "Authenticity 2 (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated authenticity 2. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "nonRepudiation2TCO",
    label: "Non-repudiation 2 (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated non-repudiation 2. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  },
  {
    key: "confidentiality2TCO",
    label: "Confidentiality 2 (TCO)",
    category: "Cost",
    unit: "ratio",
    defaultValue: 0,
    note: "Calculated confidentiality 2. Output of the TCO calculator.",
    source: "Calculated by the TCO calculator"
  }
];
var RATES_KEY = "ps_rates";
function loadRates() {
  try {
    var raw = window.localStorage.getItem(RATES_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
  }
  return { values: {}, verified: {} };
}
function saveRates(store) {
  try {
    window.localStorage.setItem(RATES_KEY, JSON.stringify(store));
  } catch (e) {
    PS2.toast("Rates could not be saved to local storage.", "danger");
  }
}
PS2.rate = function(key) {
  var def = PS2.RATES.find(function(r) {
    return r.key === key;
  });
  if (!def) return NaN;
  var store = loadRates();
  return store.values[key] !== void 0 ? store.values[key] : def.defaultValue;
};
PS2.rateEntry = function(key) {
  var def = PS2.RATES.find(function(r) {
    return r.key === key;
  });
  if (!def) return null;
  var store = loadRates();
  var isDefault = store.values[key] === void 0;
  return Object.assign({}, def, {
    value: isDefault ? def.defaultValue : store.values[key],
    lastVerified: store.verified[key] || "",
    isDefault
  });
};
PS2.setRate = function(key, value, verifiedDate) {
  var store = loadRates();
  store.values[key] = value;
  if (verifiedDate) store.verified[key] = verifiedDate;
  saveRates(store);
};
PS2.resetRate = function(key) {
  var store = loadRates();
  delete store.values[key];
  delete store.verified[key];
  saveRates(store);
};
PS2.resetRates = function() {
  saveRates({ values: {}, verified: {} });
};
PS2.allRates = function() {
  return PS2.RATES.map(function(r) {
    return PS2.rateEntry(r.key);
  });
};
PS2.ratePrefill = function(key) {
  var entry = PS2.rateEntry(key);
  return entry ? String(entry.value) : "";
};

// tools/test_batch2_calcs.mjs
var import_f_calccompact = __toESM(require_f_calccompact(), 1);
var import_a_data_init = __toESM(require_a_data_init(), 1);
var import_a_calc_compare_quotes = __toESM(require_a_calc_compare_quotes(), 1);
var import_calc_kraljic_matrix = __toESM(require_calc_kraljic_matrix(), 1);
var import_calc_pareto_analysis = __toESM(require_calc_pareto_analysis(), 1);
var import_calc_rfx_event_roi = __toESM(require_calc_rfx_event_roi(), 1);
var import_calc_dpo_working_capital = __toESM(require_calc_dpo_working_capital(), 1);
var import_calc_addressable_spend = __toESM(require_calc_addressable_spend(), 1);
var passed = 0;
var failed = 0;
function assert(name, actual, expected, tolerance) {
  var diff = Math.abs(actual - expected);
  var ok = diff <= (tolerance || 0.01);
  if (ok) {
    passed++;
    console.log("ok   " + name + " = " + actual.toFixed(4));
  } else {
    failed++;
    console.log("FAIL " + name + " = " + actual.toFixed(4) + " (expected " + expected.toFixed(4) + ")");
  }
}
console.log("\n--- Kraljic Portfolio Matrix ---");
var kraljic = PS2.calcImpl.kraljicMatrix({ supplyRisk: 60, profitImpact: 70, annualSpend: 5e5 });
console.log("     quadrant = " + kraljic.data.quadrant);
assert("Quadrant is Strategic", kraljic.data.quadrant === "Strategic" ? 1 : 0, 1, 0);
assert("Strategic supplier count", kraljic.data.supplierCount, 1, 0);
var kraljicLeverage = PS2.calcImpl.kraljicMatrix({ supplyRisk: 30, profitImpact: 80, annualSpend: 1e6 });
assert("Leverage quadrant", kraljicLeverage.data.quadrant === "Leverage" ? 1 : 0, 1, 0);
assert("Leverage supplier count", kraljicLeverage.data.supplierCount, 3, 0);
var kraljicBottleneck = PS2.calcImpl.kraljicMatrix({ supplyRisk: 80, profitImpact: 30, annualSpend: 2e5 });
assert("Bottleneck quadrant", kraljicBottleneck.data.quadrant === "Bottleneck" ? 1 : 0, 1, 0);
var kraljicNonCritical = PS2.calcImpl.kraljicMatrix({ supplyRisk: 20, profitImpact: 25, annualSpend: 5e4 });
assert("Non-critical quadrant", kraljicNonCritical.data.quadrant === "Non-critical" ? 1 : 0, 1, 0);
console.log("\n--- Pareto Analysis ---");
var pareto = PS2.calcImpl.paretoAnalysis({
  supplierCount: 100,
  totalSpend: 1e7,
  topSupplierCount: 20,
  topSupplierSpend: 8e6
});
assert("Top spend share", pareto.data.topPctSpend, 80, 0.01);
assert("Top supplier share", pareto.data.topPctSuppliers, 20, 0.01);
assert("Tail spend", pareto.data.tailSpend, 2e6, 1);
assert("Tail count", pareto.data.tailCount, 80, 0);
assert("Concentration ratio", pareto.data.concentrationRatio, 16, 0.01);
assert("Consolidation savings", pareto.data.consolidationSavings, 12e4, 1);
console.log("\n--- RFx Event ROI ---");
var rfx = PS2.calcImpl.rfxEventRoi({
  eventCost: 25e3,
  addressableSpend: 1e6,
  expectedSavingsPct: 8,
  contractYears: 3
});
assert("Gross annual savings", rfx.data.grossAnnual, 8e4, 1);
assert("Gross term savings", rfx.data.grossTerm, 24e4, 1);
assert("Net term savings", rfx.data.netTerm, 215e3, 1);
assert("ROI", rfx.data.roi, 8.6, 0.01);
assert("Payback months", rfx.data.paybackMonths, 3.75, 0.01);
console.log("\n--- DPO & Cash Conversion Cycle ---");
var dpo = PS2.calcImpl.dpoWorkingCapital({
  accountsPayable: 2e6,
  cogs: 16e6,
  inventory: 3e6,
  accountsReceivable: 25e5,
  revenue: 25e6,
  costOfCapital: 12,
  targetDpo: 60
});
assert("DPO", dpo.data.dpo, 45.625, 0.01);
assert("DSO", dpo.data.dso, 36.5, 0.01);
assert("DIO", dpo.data.dio, 68.4375, 0.01);
assert("CCC", dpo.data.ccc, 59.3125, 0.01);
assert("Working capital released", dpo.data.wcReleased, 630137.05, 1);
assert("Annual value", dpo.data.annualValue, 75616.45, 1);
console.log("\n--- Addressable Spend Cube ---");
var addr = PS2.calcImpl.addressableSpend({
  totalSpend: 5e7,
  addressablePct: 80,
  contractCoveragePct: 60,
  tailSpendPct: 20,
  savingsTargetPct: 5
});
assert("Addressable spend", addr.data.addressable, 4e7, 1);
assert("Contracted spend", addr.data.contracted, 24e6, 1);
assert("Coverage gap", addr.data.coverageGap, 16e6, 1);
assert("Tail spend", addr.data.tail, 8e6, 1);
assert("Maverick estimate", addr.data.maverickEstimate, 4e6, 1);
assert("Opportunity base", addr.data.opportunityBase, 24e6, 1);
assert("Sourcing opportunity", addr.data.opportunity, 12e5, 1);
console.log("\n--- summary ---");
console.log("assertions passed: " + passed);
console.log("assertions failed: " + failed);
if (failed > 0) process.exit(1);
console.log("ALL BATCH 2 CALCULATOR FIXTURES PASS");
