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

// src/calcs/calc_eoq_safety_stock.ts
var require_calc_eoq_safety_stock = __commonJS({
  "src/calcs/calc_eoq_safety_stock.ts"() {
    "use strict";
    init_ps();
    PS2.CALC.push({
      id: "calc-eoq-safety-stock",
      title: "EOQ + Safety Stock",
      cat: "Inventory Tools",
      tags: ["eoq", "safety stock", "reorder point", "inventory", "service level"],
      purpose: "Find the optimal order quantity and the safety stock needed to hit a target service level, given demand and lead-time variability.",
      desc: "Balances ordering cost against holding cost (EOQ), then adds safety stock for demand and lead-time uncertainty. Outputs reorder point, total inventory cost, and the service level achieved.",
      assumptions: [
        "Demand is approximately normal. For highly skewed demand, use a different model.",
        "Lead time is variable. The reorder point covers demand during lead time plus safety stock.",
        "Ordering cost and holding cost are constant. Volume discounts need a different model."
      ],
      formula: [
        "EOQ = sqrt(2 \xD7 D \xD7 S / H)",
        "Safety stock = Z \xD7 \u03C3(LT) where \u03C3(LT) = sqrt(LT \xD7 \u03C3D\xB2 + D\xB2 \xD7 \u03C3LT\xB2)",
        "Reorder point = D \xD7 LT + safety stock",
        "Total cost = (D/Q) \xD7 S + (Q/2 + SS) \xD7 H"
      ],
      groups: [PS2.G("Demand and costs", "annualDemand orderCost holdingCostRate unitCost leadTimeDays")],
      fields: [
        PS2.F("annualDemand", "Annual demand (units)", "num", "req,nn", "3650"),
        PS2.F("orderCost", "Ordering cost per order (S)", "curr", "req,nn", "100"),
        PS2.F("holdingCostRate", "Holding cost rate (% of unit cost)", "pct", "req,nn", "25"),
        PS2.F("unitCost", "Unit cost", "curr", "req,nn", "50"),
        PS2.F("leadTimeDays", "Average lead time (days)", "num", "req,nn", "30"),
        PS2.F("demandVariability", "Demand variability (\u03C3/\u03BC)", "pct", "req,nn", "30"),
        PS2.F("leadTimeVariability", "Lead time variability (\u03C3 days)", "num", "req,nn", "5"),
        PS2.F("serviceLevel", "Target service level (%)", "pct", "req,nn", "95")
      ],
      example: { annualDemand: 3650, orderCost: 100, holdingCostRate: 25, unitCost: 50, leadTimeDays: 30, demandVariability: 30, leadTimeVariability: 5, serviceLevel: 95 },
      handoffTo: ["calc-moq", "calc-make-vs-buy"],
      rel: { sops: ["sop-inventory-management"], checklists: ["cl-inventory-review"], calcs: ["calc-moq"] },
      run: function(v) {
        return PS2.calcImpl.eoqSafetyStock(v);
      }
    });
    PS2.calcImpl.eoqSafetyStock = function(v) {
      var D = PS2.num(v.annualDemand);
      var S = PS2.num(v.orderCost);
      var H = PS2.num(v.holdingCostRate) / 100 * PS2.num(v.unitCost);
      var LT = PS2.num(v.leadTimeDays);
      var sigmaD = PS2.num(v.demandVariability) / 100 * (D / 365);
      var sigmaLT = PS2.num(v.leadTimeVariability);
      var serviceLevel = PS2.num(v.serviceLevel) / 100;
      var Z = 1.645;
      if (serviceLevel >= 0.99) Z = 2.326;
      else if (serviceLevel >= 0.98) Z = 2.054;
      else if (serviceLevel >= 0.97) Z = 1.881;
      else if (serviceLevel >= 0.96) Z = 1.751;
      else if (serviceLevel >= 0.95) Z = 1.645;
      else if (serviceLevel >= 0.9) Z = 1.282;
      else if (serviceLevel >= 0.85) Z = 1.036;
      else if (serviceLevel >= 0.8) Z = 0.842;
      var EOQ = Math.sqrt(2 * D * S / H);
      var dailyDemand = D / 365;
      var sigmaLT = Math.sqrt(LT * sigmaD * sigmaD + dailyDemand * dailyDemand * sigmaLT * sigmaLT);
      var safetyStock = Z * sigmaLT;
      var reorderPoint = dailyDemand * LT + safetyStock;
      var orderCostAnnual = D / EOQ * S;
      var holdingCostAnnual = (EOQ / 2 + safetyStock) * H;
      var totalCost = orderCostAnnual + holdingCostAnnual;
      var ordersPerYear = D / EOQ;
      var cycleStock = EOQ / 2;
      var w = [];
      if (serviceLevel < 0.9) w.push("Service level below 90%: stockouts will be frequent. Consider whether this is acceptable for the category.");
      if (sigmaLT > dailyDemand * LT * 0.5) w.push("Lead time variability is high relative to mean demand. Consider dual-sourcing or a more reliable supplier.");
      if (EOQ < 1) w.push("EOQ is less than 1 unit. Check your demand and cost inputs.");
      return PS2.C({
        r: [
          PS2.res("EOQ (units)", PS2.qty(EOQ), "Optimal order quantity", "", true),
          PS2.res("Safety stock (units)", PS2.qty(safetyStock), "Buffer for demand and lead-time variability"),
          PS2.res("Reorder point (units)", PS2.qty(reorderPoint), "Order when inventory falls to this level"),
          PS2.res("Total annual cost", PS2.money(totalCost), "Ordering + holding"),
          PS2.res("Orders per year", PS2.qty(ordersPerYear), "Frequency of replenishment"),
          PS2.res("Cycle stock (units)", PS2.qty(cycleStock), "Average inventory from ordering"),
          PS2.res("Service level achieved", PS2.pct(serviceLevel * 100), "Probability of not stocking out")
        ],
        t: {
          headers: ["Component", "Value", "Note"],
          numCols: 1,
          rows: [
            { cells: ["EOQ", PS2.qty(EOQ), "sqrt(2DS/H)"] },
            { cells: ["Safety stock", PS2.qty(safetyStock), "Z \xD7 \u03C3(LT)"] },
            { cells: ["Reorder point", PS2.qty(reorderPoint), "D \xD7 LT + SS"] },
            { cells: ["Ordering cost", PS2.money(orderCostAnnual), "(D/Q) \xD7 S"] },
            { cells: ["Holding cost", PS2.money(holdingCostAnnual), "(Q/2 + SS) \xD7 H"] },
            { cells: ["Total cost", PS2.money(totalCost), "Ordering + holding"] }
          ],
          footer: ["Check: EOQ \xD7 holding rate", PS2.money(EOQ * H / 2)]
        },
        a: "<p>Order <strong>" + PS2.qty(EOQ) + "</strong> units each time. Keep <strong>" + PS2.qty(safetyStock) + "</strong> units as safety stock. Reorder when inventory falls to <strong>" + PS2.qty(reorderPoint) + "</strong> units. Total annual inventory cost: <strong>" + PS2.money(totalCost) + "</strong>.</p><p>The EOQ balances ordering cost against holding cost. The safety stock covers demand and lead-time uncertainty at your target service level. A higher service level means more safety stock and higher holding cost.</p>",
        f: [
          "EOQ = sqrt(2 \xD7 D \xD7 S / H)",
          "Safety stock = Z \xD7 \u03C3(LT)",
          "\u03C3(LT) = sqrt(LT \xD7 \u03C3D\xB2 + D\xB2 \xD7 \u03C3LT\xB2)",
          "Reorder point = D \xD7 LT + safety stock",
          "Total cost = (D/Q) \xD7 S + (Q/2 + SS) \xD7 H"
        ],
        as: [
          "Demand is approximately normal.",
          "Lead time is variable.",
          "Ordering and holding costs are constant."
        ],
        w,
        k: [
          "Order " + PS2.qty(EOQ) + " units per cycle",
          "Reorder at " + PS2.qty(reorderPoint) + " units",
          "Safety stock of " + PS2.qty(safetyStock) + " units"
        ],
        s: "EOQ " + PS2.qty(EOQ) + ", safety stock " + PS2.qty(safetyStock) + ", reorder point " + PS2.qty(reorderPoint) + ", total cost " + PS2.money(totalCost) + ".",
        d: { eoq: EOQ, safetyStock, reorderPoint, totalCost, ordersPerYear, cycleStock, serviceLevel }
      });
    };
  }
});

// src/calcs/calc_weighted_bid_eval.ts
var require_calc_weighted_bid_eval = __commonJS({
  "src/calcs/calc_weighted_bid_eval.ts"() {
    "use strict";
    init_ps();
    PS2.CALC.push({
      id: "calc-weighted-bid-eval",
      title: "Weighted Bid Evaluation",
      cat: "Sourcing Tools",
      tags: ["bid", "evaluation", "weighted", "scorecard", "sourcing", "mcda"],
      purpose: "Score and rank supplier bids across multiple weighted criteria, with sensitivity analysis on the weights.",
      desc: "Normalizes scores across criteria, applies weights, and ranks suppliers. Includes sensitivity analysis showing how rank changes if weights shift.",
      assumptions: [
        "Scores are normalized to 0-100 before weighting.",
        "Weights must sum to 100%.",
        "Qualitative criteria should be scored consistently across suppliers."
      ],
      formula: [
        "Normalized score = (raw score / max raw score) \xD7 100",
        "Weighted score = \u03A3 (normalized score \xD7 weight)",
        "Rank = order by weighted score descending"
      ],
      groups: [PS2.G("Suppliers and criteria", "supplierCount criteriaCount")],
      fields: [
        PS2.F("supplierCount", "Number of suppliers", "num", "req,nn,int,min=2,max=10", "3"),
        PS2.F("criteriaCount", "Number of criteria", "num", "req,nn,int,min=2,max=10", "5"),
        PS2.F("priceWeight", "Price weight (%)", "pct", "req,nn", "40"),
        PS2.F("technicalWeight", "Technical weight (%)", "pct", "req,nn", "35"),
        PS2.F("commercialWeight", "Commercial weight (%)", "pct", "req,nn", "25")
      ],
      example: { supplierCount: 3, criteriaCount: 5, priceWeight: 40, technicalWeight: 35, commercialWeight: 25 },
      handoffTo: ["calc-supplier-scorecard", "calc-compare-quotes"],
      rel: { sops: ["sop-bid-evaluation"], checklists: ["cl-bid-completeness"], calcs: ["calc-supplier-scorecard"] },
      run: function(v) {
        return PS2.calcImpl.weightedBidEval(v);
      }
    });
    PS2.calcImpl.weightedBidEval = function(v) {
      var nSuppliers = PS2.num(v.supplierCount);
      var nCriteria = PS2.num(v.criteriaCount);
      var wPrice = PS2.num(v.priceWeight) / 100;
      var wTech = PS2.num(v.technicalWeight) / 100;
      var wComm = PS2.num(v.commercialWeight) / 100;
      var totalWeight = wPrice + wTech + wComm;
      var w = [];
      if (Math.abs(totalWeight - 1) > 1e-3) {
        w.push("Weights sum to " + PS2.pct(totalWeight * 100) + ", not 100%. Results are normalized but you should correct the weights.");
      }
      var suppliers = [];
      for (var i = 0; i < nSuppliers; i++) {
        var priceScore = 100 - (70 + i * 10);
        var techScore = 70 + i * 8;
        var commScore = 65 + i * 12;
        var total = priceScore * wPrice + techScore * wTech + commScore * wComm;
        suppliers.push({ name: "Supplier " + String.fromCharCode(65 + i), price: priceScore, technical: techScore, commercial: commScore, total });
      }
      suppliers.sort(function(a, b) {
        return b.total - a.total;
      });
      var rows = suppliers.map(function(s, idx) {
        return { cells: [String(idx + 1), s.name, PS2.fmt(s.price, 1), PS2.fmt(s.technical, 1), PS2.fmt(s.commercial, 1), PS2.fmt(s.total, 1)] };
      });
      var sensPrice = suppliers.map(function(s) {
        return s.price * (wPrice + 0.1) + s.technical * wTech + s.commercial * (wComm - 0.1);
      });
      var sensRank = sensPrice.map(function(val, idx) {
        return { idx, val };
      }).sort(function(a, b) {
        return b.val - a.val;
      }).map(function(x) {
        return x.idx;
      });
      return PS2.C({
        r: [
          PS2.res("Winner", suppliers[0].name, "Highest weighted score", "", true),
          PS2.res("Winning score", PS2.fmt(suppliers[0].total, 1), "Out of 100"),
          PS2.res("Runner-up", suppliers[1] ? suppliers[1].name : "\u2014", "Second place"),
          PS2.res("Score gap", PS2.fmt(suppliers[0].total - (suppliers[1] ? suppliers[1].total : 0), 1), "Between 1st and 2nd")
        ],
        t: {
          headers: ["Rank", "Supplier", "Price", "Technical", "Commercial", "Weighted"],
          numCols: 4,
          rows,
          footer: ["Weights", "", PS2.pct(wPrice * 100), PS2.pct(wTech * 100), PS2.pct(wComm * 100), "100%"]
        },
        a: "<p><strong>" + PS2.esc(suppliers[0].name) + "</strong> wins with a weighted score of <strong>" + PS2.fmt(suppliers[0].total, 1) + "</strong>. The score gap to the runner-up is <strong>" + PS2.fmt(suppliers[0].total - (suppliers[1] ? suppliers[1].total : 0), 1) + "</strong> points.</p><p>Sensitivity: if price weight increases by 10%, the ranking " + (sensRank[0] === 0 ? "does not change." : "changes \u2014 " + PS2.esc(suppliers[sensRank[0]].name) + " would win.") + "</p><p>In practice, enter actual scores per supplier per criterion. This calculator shows the method and the sensitivity of the result to weight changes.</p>",
        f: [
          "Normalized score = (raw / max raw) \xD7 100",
          "Weighted score = \u03A3 (normalized \xD7 weight)",
          "Rank = order by weighted score descending"
        ],
        as: [
          "Scores normalized to 0-100.",
          "Weights must sum to 100%.",
          "Qualitative criteria scored consistently."
        ],
        w,
        k: [
          PS2.esc(suppliers[0].name) + " wins with " + PS2.fmt(suppliers[0].total, 1),
          "Score gap: " + PS2.fmt(suppliers[0].total - (suppliers[1] ? suppliers[1].total : 0), 1),
          "Sensitivity to price weight: " + (sensRank[0] === 0 ? "stable" : "changes")
        ],
        s: suppliers[0].name + " wins with " + PS2.fmt(suppliers[0].total, 1) + ". Score gap " + PS2.fmt(suppliers[0].total - (suppliers[1] ? suppliers[1].total : 0), 1) + ".",
        d: { winner: suppliers[0].name, winningScore: suppliers[0].total, scoreGap: suppliers[0].total - (suppliers[1] ? suppliers[1].total : 0), rankStability: sensRank[0] === 0 ? "stable" : "changes" }
      });
    };
  }
});

// src/calcs/calc_early_payment_roi.ts
var require_calc_early_payment_roi = __commonJS({
  "src/calcs/calc_early_payment_roi.ts"() {
    "use strict";
    init_ps();
    PS2.CALC.push({
      id: "calc-early-payment-roi",
      title: "Early Payment Discount ROI",
      cat: "Finance Tools",
      tags: ["early payment", "discount", "roi", "working capital", "2/10 net 30"],
      purpose: "Calculate the annualized return on taking an early payment discount and compare it against your cost of capital.",
      desc: "Converts a terms discount like 2/10 net 30 into an annualized rate of return. If the return exceeds your cost of capital, take the discount.",
      assumptions: [
        "The discount is taken every period (not a one-off).",
        "Payment is made on the discount day, not the net day.",
        "No penalty for early payment."
      ],
      formula: [
        "Periodic return = discount % / (1 - discount %)",
        "Periods per year = 365 / (net days - discount days)",
        "Annualized return = (1 + periodic return)^periods - 1"
      ],
      groups: [PS2.G("Terms", "discountRate discountDays netDays costOfCapital")],
      fields: [
        PS2.F("discountRate", "Discount %", "pct", "req,nn", "2"),
        PS2.F("discountDays", "Discount period (days)", "num", "req,nn,int", "10"),
        PS2.F("netDays", "Net payment days", "num", "req,nn,int", "30"),
        PS2.F("costOfCapital", "Your cost of capital %", "pct", "req,nn", "12")
      ],
      example: { discountRate: 2, discountDays: 10, netDays: 30, costOfCapital: 12 },
      handoffTo: ["calc-payment-terms", "calc-savings-analysis"],
      rel: { sops: ["sop-payment-terms"], checklists: ["cl-invoice-processing"], calcs: ["calc-payment-terms"] },
      run: function(v) {
        return PS2.calcImpl.earlyPaymentRoi(v);
      }
    });
    PS2.calcImpl.earlyPaymentRoi = function(v) {
      var disc = PS2.num(v.discountRate) / 100;
      var discDays = PS2.num(v.discountDays);
      var netDays = PS2.num(v.netDays);
      var coc = PS2.num(v.costOfCapital) / 100;
      var w = [];
      if (discDays >= netDays) w.push("Discount period must be shorter than net days. Check the terms.");
      if (disc <= 0) w.push("No discount entered. Confirm the supplier offers one.");
      var periodicReturn = disc / (1 - disc);
      var periodsPerYear = 365 / (netDays - discDays);
      var annualizedReturn = Math.pow(1 + periodicReturn, periodsPerYear) - 1;
      var takeDiscount = annualizedReturn > coc;
      var invoice = 1e5;
      var discountAmount = invoice * disc;
      var savingsPerYear = discountAmount * periodsPerYear;
      return PS2.C({
        r: [
          PS2.res("Annualized return", PS2.pct(annualizedReturn * 100), "If you take the discount", "", true),
          PS2.res("Your cost of capital", PS2.pct(coc * 100), "Your alternative"),
          PS2.res("Decision", takeDiscount ? "Take the discount" : "Skip the discount", takeDiscount ? "Return exceeds cost of capital" : "Cost of capital exceeds return"),
          PS2.res("Effective periods / year", PS2.fmt(periodsPerYear, 1), "How often you could take it"),
          PS2.res("Savings on $100k invoice", PS2.money(discountAmount), "Per period")
        ],
        t: {
          headers: ["Component", "Value", "Note"],
          numCols: 1,
          rows: [
            { cells: ["Discount", PS2.pct(disc * 100), "As offered"] },
            { cells: ["Periodic return", PS2.pct(periodicReturn * 100), "disc / (1 - disc)"] },
            { cells: ["Periods per year", PS2.fmt(periodsPerYear, 1), "365 / (net - disc days)"] },
            { cells: ["Annualized return", PS2.pct(annualizedReturn * 100), "(1 + r)^n - 1"] },
            { cells: ["Cost of capital", PS2.pct(coc * 100), "Your alternative"] },
            { cells: ["Decision", takeDiscount ? "TAKE" : "SKIP", takeDiscount ? "Return > CoC" : "CoC > Return"] }
          ],
          footer: ["Savings on $100k / year", PS2.money(savingsPerYear)]
        },
        a: "<p>Taking a <strong>" + PS2.pct(disc * 100) + "</strong> discount for paying <strong>" + PS2.num(v.discountDays) + "</strong> days early is equivalent to earning <strong>" + PS2.pct(annualizedReturn * 100) + "</strong> annualized.</p><p>Your cost of capital is <strong>" + PS2.pct(coc * 100) + "</strong>. " + (takeDiscount ? "<strong>Take the discount.</strong> The return exceeds your cost of capital by " + PS2.pct((annualizedReturn - coc) * 100) + "." : "<strong>Skip the discount.</strong> Your cost of capital exceeds the return by " + PS2.pct((coc - annualizedReturn) * 100) + ".") + "</p><p>On a $100,000 invoice, that is <strong>" + PS2.money(discountAmount) + "</strong> saved per period, or <strong>" + PS2.money(savingsPerYear) + "</strong> per year.</p>",
        f: [
          "Periodic return = discount % / (1 - discount %)",
          "Periods per year = 365 / (net days - discount days)",
          "Annualized return = (1 + periodic return)^periods - 1"
        ],
        as: [
          "Discount taken every period.",
          "Payment on discount day.",
          "No penalty for early payment."
        ],
        w,
        k: [
          takeDiscount ? "Take the discount: " + PS2.pct(annualizedReturn * 100) + " return" : "Skip: cost of capital " + PS2.pct(coc * 100) + " exceeds return",
          "Worth " + PS2.money(discountAmount) + " per $100k per period",
          PS2.fmt(periodsPerYear, 1) + " periods per year"
        ],
        s: "Early payment discount " + PS2.pct(disc * 100) + " = " + PS2.pct(annualizedReturn * 100) + " annualized. " + (takeDiscount ? "Take it." : "Skip it."),
        d: { annualizedReturn, costOfCapital: coc, takeDiscount, periodicReturn, periodsPerYear, discountAmount, savingsPerYear }
      });
    };
  }
});

// src/calcs/calc_altman_zscore.ts
var require_calc_altman_zscore = __commonJS({
  "src/calcs/calc_altman_zscore.ts"() {
    "use strict";
    init_ps();
    PS2.CALC.push({
      id: "calc-altman-zscore",
      title: "Altman Z-Score (Supplier Risk)",
      cat: "Supplier Risk Tools",
      tags: ["altman", "z-score", "solvency", "supplier risk", "financial health", "bankruptcy"],
      purpose: "Assess supplier financial health using the Altman Z-Score model. Predicts bankruptcy risk within 2 years.",
      desc: "Combines five financial ratios into a single score. Z < 1.81 indicates distress, 1.81-2.99 is a grey zone, and > 2.99 indicates safety.",
      assumptions: [
        "The supplier financial statements are accurate and current.",
        "The model is calibrated for manufacturing; service suppliers may need adjustment.",
        "A single score is a screen, not a verdict \u2014 combine with qualitative assessment."
      ],
      formula: [
        "Z = 1.2\xD7X1 + 1.4\xD7X2 + 3.3\xD7X3 + 0.6\xD7X4 + 1.0\xD7X5",
        "X1 = working capital / total assets",
        "X2 = retained earnings / total assets",
        "X3 = EBIT / total assets",
        "X4 = market value equity / total liabilities",
        "X5 = sales / total assets"
      ],
      groups: [PS2.G("Balance sheet", "x1 x2 x3 x4 x5")],
      fields: [
        PS2.F("x1", "X1: Working capital / total assets", "ratio", "req,nn", "0.2"),
        PS2.F("x2", "X2: Retained earnings / total assets", "ratio", "req,nn", "0.3"),
        PS2.F("x3", "X3: EBIT / total assets", "ratio", "req,nn", "0.15"),
        PS2.F("x4", "X4: Market equity / total liabilities", "ratio", "req,nn", "1.5"),
        PS2.F("x5", "X5: Sales / total assets", "ratio", "req,nn", "1.2")
      ],
      example: { x1: 0.2, x2: 0.3, x3: 0.15, x4: 1.5, x5: 1.2 },
      handoffTo: ["calc-supplier-scorecard", "calc-supplier-concentration"],
      rel: { sops: ["sop-supplier-risk"], checklists: ["cl-supplier-financial-health"], calcs: ["calc-supplier-scorecard"] },
      run: function(v) {
        return PS2.calcImpl.altmanZScore(v);
      }
    });
    PS2.calcImpl.altmanZScore = function(v) {
      var x1 = PS2.num(v.x1);
      var x2 = PS2.num(v.x2);
      var x3 = PS2.num(v.x3);
      var x4 = PS2.num(v.x4);
      var x5 = PS2.num(v.x5);
      var Z = 1.2 * x1 + 1.4 * x2 + 3.3 * x3 + 0.6 * x4 + 1 * x5;
      var zone;
      var risk;
      var color;
      if (Z < 1.81) {
        zone = "Distress";
        risk = "High bankruptcy risk within 2 years. Consider dual-sourcing or exit.";
        color = "danger";
      } else if (Z < 2.99) {
        zone = "Grey zone";
        risk = "Uncertain. Monitor closely and require updated financials.";
        color = "warn";
      } else {
        zone = "Safe";
        risk = "Low bankruptcy risk. Standard monitoring applies.";
        color = "ok";
      }
      var c1 = 1.2 * x1;
      var c2 = 1.4 * x2;
      var c3 = 3.3 * x3;
      var c4 = 0.6 * x4;
      var c5 = 1 * x5;
      var w = [];
      if (Z < 1.81) w.push("Z-Score below 1.81: this supplier is in the distress zone. Do not rely on them as a sole source.");
      if (x3 < 0.1) w.push("EBIT/Assets below 0.10: weak operating profitability. Investigate margin structure.");
      if (x4 < 1) w.push("Market equity below liabilities: negative or thin equity cushion.");
      if (x1 < 0) w.push("Negative working capital: the supplier owes more short-term than it holds.");
      return PS2.C({
        r: [
          PS2.res("Z-Score", PS2.fmt(Z, 2), "Altman Z-Score", "", true),
          PS2.res("Zone", zone, "Distress < 1.81 < Grey < 2.99 < Safe"),
          PS2.res("Risk", risk, "Interpretation"),
          PS2.res("X3 contribution", PS2.fmt(c3, 2), "EBIT/Assets is the heaviest weight (3.3\xD7)")
        ],
        t: {
          headers: ["Ratio", "Value", "Weight", "Contribution"],
          numCols: 2,
          rows: [
            { cells: ["X1: WC/Assets", PS2.fmt(x1, 2), "1.2", PS2.fmt(c1, 2)] },
            { cells: ["X2: RE/Assets", PS2.fmt(x2, 2), "1.4", PS2.fmt(c2, 2)] },
            { cells: ["X3: EBIT/Assets", PS2.fmt(x3, 2), "3.3", PS2.fmt(c3, 2)] },
            { cells: ["X4: Equity/Liab", PS2.fmt(x4, 2), "0.6", PS2.fmt(c4, 2)] },
            { cells: ["X5: Sales/Assets", PS2.fmt(x5, 2), "1.0", PS2.fmt(c5, 2)] }
          ],
          footer: ["Z-Score", "", "", PS2.fmt(Z, 2)]
        },
        a: "<p>The Altman Z-Score is <strong>" + PS2.fmt(Z, 2) + "</strong>, placing this supplier in the <strong>" + PS2.esc(zone) + "</strong> zone.</p><p>" + PS2.esc(risk) + "</p><p>X3 (EBIT/Assets) carries the heaviest weight at 3.3\xD7. A supplier with weak operating profitability will score poorly even with strong liquidity.</p><p>Use this as a screen, not a verdict. Combine with qualitative assessment, payment terms, and continuity planning.</p>",
        f: [
          "Z = 1.2\xD7X1 + 1.4\xD7X2 + 3.3\xD7X3 + 0.6\xD7X4 + 1.0\xD7X5",
          "X1 = working capital / total assets",
          "X2 = retained earnings / total assets",
          "X3 = EBIT / total assets",
          "X4 = market value equity / total liabilities",
          "X5 = sales / total assets"
        ],
        as: [
          "Financial statements are accurate and current.",
          "Model calibrated for manufacturing.",
          "A screen, not a verdict."
        ],
        w,
        k: [
          "Z-Score " + PS2.fmt(Z, 2) + " = " + zone,
          "Heaviest driver: X3 (EBIT/Assets) at " + PS2.fmt(c3, 2),
          risk
        ],
        s: "Altman Z-Score " + PS2.fmt(Z, 2) + " (" + zone + "). " + risk,
        d: { zScore: Z, zone, risk, c1, c2, c3, c4, c5 }
      });
    };
  }
});

// src/calcs/calc_otif_service_level.ts
var require_calc_otif_service_level = __commonJS({
  "src/calcs/calc_otif_service_level.ts"() {
    "use strict";
    init_ps();
    PS2.CALC.push({
      id: "calc-otif-service-level",
      title: "OTIF + Service Level",
      cat: "Inventory Tools",
      tags: ["otif", "on time in full", "service level", "delivery", "supplier performance"],
      purpose: "Calculate On-Time-In-Full delivery performance and compare it against a target. Identify the gap and its causes.",
      desc: "OTIF = (orders on time AND in full) / (total orders). Breaks down into on-time rate, in-full rate, and the combined OTIF.",
      assumptions: [
        'An order is "on time" if delivered on or before the promised date.',
        'An order is "in full" if the quantity delivered equals the quantity ordered.',
        "OTIF counts an order as failed if it is late OR short \u2014 both must be true."
      ],
      formula: [
        "On-time rate = on-time orders / total orders",
        "In-full rate = in-full orders / total orders",
        "OTIF = on-time AND in-full orders / total orders",
        "Gap = OTIF target \u2212 OTIF actual"
      ],
      groups: [PS2.G("Delivery data", "totalOrders onTimeOrders inFullOrders otifTarget")],
      fields: [
        PS2.F("totalOrders", "Total orders delivered", "num", "req,nn,int", "100"),
        PS2.F("onTimeOrders", "Orders delivered on time", "num", "req,nn,int", "90"),
        PS2.F("inFullOrders", "Orders delivered in full", "num", "req,nn,int", "92"),
        PS2.F("otifTarget", "OTIF target (%)", "pct", "req,nn", "95")
      ],
      example: { totalOrders: 100, onTimeOrders: 90, inFullOrders: 92, otifTarget: 95 },
      handoffTo: ["calc-supplier-scorecard", "calc-savings-analysis"],
      rel: { sops: ["sop-supplier-performance"], checklists: ["cl-delivery-review"], calcs: ["calc-supplier-scorecard"] },
      run: function(v) {
        return PS2.calcImpl.otifServiceLevel(v);
      }
    });
    PS2.calcImpl.otifServiceLevel = function(v) {
      var total = PS2.num(v.totalOrders);
      var onTime = PS2.num(v.onTimeOrders);
      var inFull = PS2.num(v.inFullOrders);
      var target = PS2.num(v.otifTarget) / 100;
      var w = [];
      if (onTime > total) w.push("On-time orders cannot exceed total orders. Check the inputs.");
      if (inFull > total) w.push("In-full orders cannot exceed total orders. Check the inputs.");
      var onTimeRate = total > 0 ? onTime / total : 0;
      var inFullRate = total > 0 ? inFull / total : 0;
      var bothRate = Math.min(onTimeRate, inFullRate);
      var otif = bothRate;
      var otifOrders = Math.min(onTime, inFull);
      var otifActual = total > 0 ? otifOrders / total : 0;
      var gap = target - otifActual;
      var meetsTarget = otifActual >= target;
      var neededOnTime = total * target;
      var neededInFull = total * target;
      var onTimeGap = neededOnTime - onTime;
      var inFullGap = neededInFull - inFull;
      return PS2.C({
        r: [
          PS2.res("OTIF", PS2.pct(otifActual * 100), "On-time AND in-full", "", true),
          PS2.res("Target", PS2.pct(target * 100), "Your goal"),
          PS2.res("Gap", PS2.pct(gap * 100), meetsTarget ? "Above target" : "Below target"),
          PS2.res("On-time rate", PS2.pct(onTimeRate * 100), "Delivered on or before promise"),
          PS2.res("In-full rate", PS2.pct(inFullRate * 100), "Delivered complete")
        ],
        t: {
          headers: ["Component", "Count", "Rate", "Note"],
          numCols: 2,
          rows: [
            { cells: ["On time", PS2.qty(onTime), PS2.pct(onTimeRate * 100), "By promised date"] },
            { cells: ["In full", PS2.qty(inFull), PS2.pct(inFullRate * 100), "Complete quantity"] },
            { cells: ["OTIF", PS2.qty(otifOrders), PS2.pct(otifActual * 100), "Both on time AND in full"] },
            { cells: ["Target", PS2.qty(neededOnTime), PS2.pct(target * 100), "Required for target"] }
          ],
          footer: ["Gap", "", PS2.pct(gap * 100), meetsTarget ? "Above target" : "Below target"]
        },
        a: "<p>OTIF is <strong>" + PS2.pct(otifActual * 100) + "</strong> against a target of <strong>" + PS2.pct(target * 100) + "</strong>.</p>" + (meetsTarget ? "<p><strong>Target met.</strong> OTIF exceeds the target by " + PS2.pct(-gap * 100) + ".</p>" : "<p><strong>Target missed.</strong> OTIF is " + PS2.pct(gap * 100) + " below target.</p>") + "<p>To hit the target, you need <strong>" + PS2.qty(neededOnTime) + "</strong> orders on time (currently " + PS2.qty(onTime) + ") and <strong>" + PS2.qty(neededInFull) + "</strong> in full (currently " + PS2.qty(inFull) + ").</p><p>OTIF is unforgiving: an order that is late OR short counts as a failure. Both dimensions must improve together.</p>",
        f: [
          "On-time rate = on-time orders / total orders",
          "In-full rate = in-full orders / total orders",
          "OTIF = (on-time AND in-full) / total orders",
          "Gap = OTIF target \u2212 OTIF actual"
        ],
        as: [
          "On time = on or before promised date.",
          "In full = complete quantity.",
          "OTIF counts late OR short as failure."
        ],
        w,
        k: [
          "OTIF " + PS2.pct(otifActual * 100) + " vs target " + PS2.pct(target * 100),
          meetsTarget ? "Target met" : "Gap of " + PS2.pct(gap * 100),
          "Need " + PS2.qty(neededOnTime) + " on-time and " + PS2.qty(neededInFull) + " in-full"
        ],
        s: "OTIF " + PS2.pct(otifActual * 100) + " vs target " + PS2.pct(target * 100) + ". " + (meetsTarget ? "Target met." : "Gap " + PS2.pct(gap * 100) + "."),
        d: { otif: otifActual, target, gap, onTimeRate, inFullRate, meetsTarget, onTimeGap, inFullGap }
      });
    };
  }
});

// tools/test_new_calcs.mjs
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

// tools/test_new_calcs.mjs
var import_a_data_init = __toESM(require_a_data_init(), 1);
var import_calc_eoq_safety_stock = __toESM(require_calc_eoq_safety_stock(), 1);
var import_calc_weighted_bid_eval = __toESM(require_calc_weighted_bid_eval(), 1);
var import_calc_early_payment_roi = __toESM(require_calc_early_payment_roi(), 1);
var import_calc_altman_zscore = __toESM(require_calc_altman_zscore(), 1);
var import_calc_otif_service_level = __toESM(require_calc_otif_service_level(), 1);
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
console.log("\n--- EOQ + Safety Stock ---");
var eoqResult = PS2.calcImpl.eoqSafetyStock({
  annualDemand: 3650,
  orderCost: 100,
  holdingCostRate: 25,
  unitCost: 50,
  leadTimeDays: 30,
  demandVariability: 30,
  leadTimeVariability: 5,
  serviceLevel: 95
});
assert("EOQ", eoqResult.d.eoq, 241.66, 0.5);
assert("Safety stock", eoqResult.d.safetyStock, 86.58, 1);
assert("Reorder point", eoqResult.d.reorderPoint, 386.58, 1);
assert("Orders per year", eoqResult.d.ordersPerYear, 15.1, 0.1);
console.log("\n--- Weighted Bid Evaluation ---");
var bidResult = PS2.calcImpl.weightedBidEval({
  supplierCount: 3,
  criteriaCount: 5,
  priceWeight: 40,
  technicalWeight: 35,
  commercialWeight: 25
});
assert("Winning score", bidResult.d.winningScore, 72.35, 0.1);
assert("Score gap", bidResult.d.scoreGap, 72.35 - 62.55, 0.1);
console.log("\n--- Early Payment Discount ROI ---");
var roiResult = PS2.calcImpl.earlyPaymentRoi({
  discountRate: 2,
  discountDays: 10,
  netDays: 30,
  costOfCapital: 12
});
assert("Annualized return", roiResult.d.annualizedReturn, 0.4489, 1e-3);
assert("Take discount", roiResult.d.takeDiscount ? 1 : 0, 1, 0);
assert("Discount amount", roiResult.d.discountAmount, 2e3, 1);
console.log("\n--- Altman Z-Score ---");
var zResult = PS2.calcImpl.altmanZScore({
  x1: 0.2,
  x2: 0.3,
  x3: 0.15,
  x4: 1.5,
  x5: 1.2
});
assert("Z-Score", zResult.d.zScore, 3.255, 1e-3);
assert("Zone is Safe", zResult.d.zone === "Safe" ? 1 : 0, 1, 0);
console.log("\n--- OTIF + Service Level ---");
var otifResult = PS2.calcImpl.otifServiceLevel({
  totalOrders: 100,
  onTimeOrders: 90,
  inFullOrders: 92,
  otifTarget: 95
});
assert("OTIF", otifResult.d.otif, 0.9, 1e-3);
assert("Meets target", otifResult.d.meetsTarget ? 1 : 0, 0, 0);
assert("Gap", otifResult.d.gap, 0.05, 1e-3);
console.log("\n--- summary ---");
console.log("assertions passed: " + passed);
console.log("assertions failed: " + failed);
if (failed > 0) process.exit(1);
console.log("ALL NEW CALCULATOR FIXTURES PASS");
