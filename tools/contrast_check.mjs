/* ==========================================================
   tools/contrast_check.mjs — WCAG 2.2 contrast assertion gate
   ==========================================================
   WHY THIS EXISTS

   The a11y audit checked structure (labels, ARIA, heading order,
   duplicate IDs) and reported "0 issues" without ever measuring a
   single colour pair. Colours that read as ordinary greys on a
   monitor can fail 4.5:1, which is exactly why nobody catches them
   by looking. HCM Studio proved this: nine pairs failed on its
   first contrast run, all of them "fine" to the eye.

   WHAT THIS DOES

   Parses the design tokens out of the compiled HTML, converts every
   colour to linear sRGB, computes WCAG relative luminance, and
   asserts the pairs the UI actually renders. Fails non-zero so the
   build blocks on a bad token, not on a reviewer's attention.

   Thresholds (WCAG 2.2):
     body   4.5:1  — normal-size text, and tag/badge text (small + bold
                     is still body text; we hold tags to the body bar)
     ui     3.0:1  — component boundaries, focus rings, chart rules

   Usage:  node tools/contrast_check.mjs ProcureSherpa-v2.0.html
   ========================================================== */
import fs from 'node:fs';

const file = process.argv[2] || 'ProcureSherpa-v2.0.html';
const html = fs.readFileSync(file, 'utf8');

/* ---------- colour math ---------- */

function oklchToLinearSrgb(L, C, Hdeg) {
  const h = (Hdeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ * l_ * l_, m = m_ * m_ * m_, s = s_ * s_ * s_;
  return {
    r: 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    b: -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  };
}

function hexToLinearSrgb(hex) {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  if (h.length === 8) h = h.slice(0, 6);
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  return { r: srgbToLinear(r), g: srgbToLinear(g), b: srgbToLinear(b) };
}

function srgbToLinear(c) {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/** A colour as linear-sRGB triple plus alpha, in 0..1. */
function toLinear(colour) {
  const c = colour.trim();
  if (c === 'transparent' || c === 'none') return { r: 0, g: 0, b: 0, a: 0 };
  if (c.startsWith('#')) return { ...hexToLinearSrgb(c), a: 1 };
  if (c.startsWith('rgb')) {
    const parts = c.replace(/rgba?\(/, '').replace(/\)/, '').split(/[,/\s]+/).filter(Boolean);
    const [r, g, b, a = 1] = parts;
    return {
      r: srgbToLinear(parseFloat(r) / 255),
      g: srgbToLinear(parseFloat(g) / 255),
      b: srgbToLinear(parseFloat(b) / 255),
      a: parseFloat(String(a).replace('%', '')) / (String(a).includes('%') ? 100 : 1),
    };
  }
  if (c.startsWith('oklch')) {
    const inner = c.replace(/oklch\(/, '').replace(/\)$/, '');
    const parts = inner.split(/[\s/]+/).filter(Boolean);
    const L = parseFloat(parts[0]) / (parts[0].includes('%') ? 100 : 1);
    const C = parts.length > 1 ? parseFloat(parts[1]) : 0;
    const H = parts.length > 2 ? parseFloat(parts[2]) : 0;
    const a = parts.find((p) => p.includes('%') && p !== parts[0] && p !== parts[1] && p !== parts[2])
      ? 1 : 1;
    return { ...oklchToLinearSrgb(L, C, H), a };
  }
  return null;
}

/** Composite a (possibly translucent) fg over an opaque bg, in linear space. */
function composite(fg, bg) {
  const a = fg.a ?? 1;
  return {
    r: fg.r * a + bg.r * (1 - a),
    g: fg.g * a + bg.g * (1 - a),
    b: fg.b * a + bg.b * (1 - a),
  };
}

function luminance({ r, g, b }) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(fg, bg) {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  const hi = Math.max(l1, l2), lo = Math.min(l1, l2);
  return (hi + 0.05) / (lo + 0.05);
}

/* ---------- token parsing ---------- */

const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (!styleMatch) { console.error('FAIL no <style> block found'); process.exit(1); }

const tokens = {};
for (const m of styleMatch[1].matchAll(/(--[a-z0-9-]+)\s*:\s*([^;}]+)/gi)) {
  tokens[m[1]] = m[2].trim();
}

/** Resolve a token value: var() indirection, then colour-mix(), then a literal. */
function resolve(raw, depth = 0) {
  if (depth > 6) return null;
  let v = raw.trim();
  if (v.startsWith('var(')) {
    const name = v.replace(/var\(/, '').replace(/[,)]?[^)]*\)?$/, '').split(',')[0];
    const fallback = v.match(/var\([^,]+,\s*([^)]+)\)/);
    const target = tokens[name] ?? (fallback ? fallback[1] : null);
    return target ? resolve(target, depth + 1) : null;
  }
  if (v.startsWith('color-mix')) {
    const inner = v.replace(/color-mix\(\s*in\s+srgb\s*,/, '').replace(/\)$/, '');
    // split at the last comma that separates the two colours is fragile;
    // colours here never contain commas at top level except rgb/oklch args.
    // Our token set uses hex/oklch with space separators, so split on ", ".
    const parts = inner.split(/,\s*(?![^()]*\))/);
    if (parts.length !== 2) return null;
    const pctMatch = parts[0].match(/(\d+(?:\.\d+)?)\s*%$/) || parts[1].match(/(\d+(?:\.\d+)?)\s*%$/);
    const pct = pctMatch ? parseFloat(pctMatch[1]) / 100 : 0.5;
    const c1raw = parts[0].replace(/\s*\d+(?:\.\d+)?\s*%$/, '').trim();
    const c2raw = parts[1].replace(/\s*\d+(?:\.\d+)?\s*%$/, '').trim();
    const c1 = toLinear(resolve(c1raw, depth + 1) ?? c1raw);
    const c2 = toLinear(resolve(c2raw, depth + 1) ?? c2raw);
    if (!c1 || !c2) return null;
    const a1 = c1.a ?? 1, a2 = c2.a ?? 1;
    const a = a1 * pct + a2 * (1 - pct);
    return {
      r: (c1.r * a1 * pct + c2.r * a2 * (1 - pct)) / (a || 1),
      g: (c1.g * a1 * pct + c2.g * a2 * (1 - pct)) / (a || 1),
      b: (c1.b * a1 * pct + c2.b * a2 * (1 - pct)) / (a || 1),
      a,
    };
  }
  const lit = toLinear(v);
  return lit;
}

function tokenColour(name) {
  const raw = tokens[name];
  if (!raw) return null;
  return resolve(raw);
}

/* ---------- the pairs the UI actually renders ---------- */
/* Threshold: 'body' 4.5:1 · 'ui' 3.0:1. Every pair below names the
   real on-screen combination, so a regression is a description of a
   defect rather than an abstract score. */

const PAIRS = [
  // Primary text on the three page surfaces.
  ['--text', '--bg', 'body', 'body text on canvas'],
  ['--text', '--panel', 'body', 'body text on panel'],
  ['--text', '--panel-2', 'body', 'body text on raised panel'],
  ['--text', '--sunken', 'body', 'body text on sunken panel'],

  // Secondary text. Held to the body bar because it carries real prose.
  ['--dim', '--panel', 'body', 'secondary text on panel'],
  ['--dim', '--bg', 'body', 'secondary text on canvas'],
  ['--mute', '--panel', 'body', 'muted text on panel'],
  ['--mute', '--bg', 'body', 'muted text on canvas'],
  ['--mute', '--panel-2', 'body', 'muted text on raised panel'],

  // Links and active-state text.
  ['--accent', '--panel', 'body', 'accent text on panel'],
  ['--accent', '--bg', 'body', 'accent text on canvas'],
  ['--brand', '--panel', 'body', 'brand text on panel'],
  ['--brand', '--bg', 'body', 'brand text on canvas'],

  // Buttons: label on fill.
  ['--accent-ink', '--accent', 'body', 'button label on accent fill'],
  ['--brand-ink', '--brand', 'body', 'button label on brand fill'],

  // Tags: text on tinted ground. Tags are small bold text, so body bar.
  ['--ok', '--ok-soft', 'body', 'success tag text on tint'],
  ['--warn', '--warn-soft', 'body', 'warn tag text on tint'],
  ['--danger', '--danger-soft', 'body', 'danger tag text on tint'],
  ['--info', '--info-soft', 'body', 'info tag text on tint'],

  // Content-type tags.
  ['--kb', '--kb-soft', 'body', 'knowledge tag text on tint'],
  ['--sop', '--sop-soft', 'body', 'SOP tag text on tint'],
  ['--cl', '--cl-soft', 'body', 'checklist tag text on tint'],
  ['--tpl', '--tpl-soft', 'body', 'template tag text on tint'],
  ['--calc', '--calc-soft', 'body', 'calculator tag text on tint'],
  ['--dec', '--dec-soft', 'body', 'decision tag text on tint'],
  ['--kpi', '--kpi-soft', 'body', 'KPI tag text on tint'],
  ['--scen', '--scen-soft', 'body', 'scenario tag text on tint'],
  ['--gloss', '--gloss-soft', 'body', 'glossary tag text on tint'],

  // Non-text contrast (WCAG 1.4.11): control boundaries and rules.
  ['--border-2', '--panel', 'ui', 'strong control border on panel'],
  ['--border-2', '--bg', 'ui', 'strong control border on canvas'],
  ['--accent', '--panel', 'ui', 'focus/active accent edge on panel'],
];

const THRESHOLDS = { body: 4.5, ui: 3.0 };

let failures = 0;
let checked = 0;
const missing = [];

for (const [fgName, bgName, level, label] of PAIRS) {
  const fg = tokenColour(fgName);
  const bg = tokenColour(bgName);
  if (!fg || !bg) {
    missing.push(`${fgName} or ${bgName} not resolvable (${label})`);
    continue;
  }
  const fgC = composite(fg, bg);
  const ratio = contrast(fgC, bg);
  const need = THRESHOLDS[level];
  checked++;
  const pass = ratio >= need;
  if (!pass) failures++;
  const mark = pass ? 'ok  ' : 'FAIL';
  console.log(
    `${mark} ${ratio.toFixed(2)}:1  (need ${need.toFixed(1)})  ${fgName} on ${bgName} — ${label}`,
  );
}

/* Guard on the guard: a vacuous pass is worse than a fail. */
if (checked < PAIRS.length * 0.9) {
  console.error(`FAIL only ${checked}/${PAIRS.length} pairs resolved — tokens missing or unparsable`);
  process.exit(1);
}

if (missing.length) {
  console.log('\nWARN unresolved tokens:');
  for (const m of missing) console.log('  ' + m);
}

console.log(`\ncontrast pairs: ${checked} checked, ${failures} failing`);
if (failures > 0) {
  console.error('CONTRAST CHECK: FAIL — fix the tokens above before shipping');
  process.exit(1);
}
console.log('CONTRAST CHECK: PASS');
