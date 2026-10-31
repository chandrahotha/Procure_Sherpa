/* Shared repo-path helpers for tools/*.mjs (avoids hardcoded absolute paths). */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
export const SRC = path.join(ROOT, 'src');
export const SRC_CONTENT = path.join(SRC, 'content');

/* All source fragments, as forward-slash paths relative to src/, sorted. */
export function listFiles(dir = SRC) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...listFiles(p));
    else if (!e.name.startsWith('.')) out.push(path.relative(SRC, p).split(path.sep).join('/'));
  }
  return out.sort();
}

export const baseName = (rel) => rel.slice(rel.lastIndexOf('/') + 1);
export const readSrc = (rel) => fs.readFileSync(path.join(SRC, rel), 'utf8');

/* ==========================================================
   One reader for "what is actually registered".

   Both tools/Inventory and tools/check_rels need the same answer, and
   they used to compute it two different ways. `check_rels` found 19
   calculators by parsing every `PS_CALC.push({` object, while
   `inventory.mjs` looked for files whose *full relative path* started
   with "2" (`/^2\d/.test('calcs/20a_calc_tco.js')` is always false,
   because the path begins with the directory name) and only accepted
   ids of the form `calc-…`. It printed `CALC (0)` while the registry
   held 19, and several documents quote inventory's numbers.

   There is now one implementation, here, and it reads the only two
   ways an id can enter the product: a `PS.S<REGISTRY>({…})` push for
   content and a `PS_CALC.push({…})` for calculators.
   ========================================================== */

/* Return the balanced {…} text starting at index `start`, or null. */
export function balanced(t, start) {
  let depth = 0;
  for (let i = start; i < t.length; i++) {
    if (t[i] === '{') depth++;
    else if (t[i] === '}') { depth--; if (!depth) return t.slice(start, i + 1); }
  }
  return null;
}

export const REGISTRY_KEYS = ['kb', 'sop', 'cl', 'tpl', 'dec', 'kpi', 'gloss', 'scen', 'calc'];

/* Scan every source fragment and return
     { ids:  { kb:Set, sop:Set, … },
       rels: [ { f, rel } ] }
   `rels` is what check_rels resolves; inventory ignores it. */
export function registryFromSource(files = listFiles().filter((f) => f.endsWith('.js'))) {
  const ids = {};
  for (const k of REGISTRY_KEYS) ids[k] = new Set();
  const rels = [];
  for (const f of files) {
    const t = readSrc(f);
    for (const m of t.matchAll(/PS\.S(?:KB|SOP|DEC|CL|TPL|KPI|GLS|SCN)\(\s*\{/g)) {
      const obj = balanced(t, m.index + m[0].length - 1);
      if (!obj) continue;
      const im = obj.match(/["']?\bi["']?:\s*["']([^"']+)["']/);
      const ty = m[0].match(/KB|SOP|CL|TPL|DEC|KPI|GLS|SCN/)[0];
      const key = { KB: 'kb', SOP: 'sop', CL: 'cl', TPL: 'tpl', DEC: 'dec', KPI: 'kpi', GLS: 'gloss', SCN: 'scen' }[ty];
      if (im) ids[key].add(im[1]);
      const rm = obj.match(/,\s*["']?rel["']?:\s*\{/);
      if (rm) {
        const rtxt = balanced(obj, obj.indexOf('{', rm.index + rm[0].length - 1));
        if (rtxt) rels.push({ f, rel: relObject(rtxt) });
      }
    }
    for (const m of t.matchAll(/PS_CALC\.push\(\s*\{/g)) {
      const obj = balanced(t, m.index + m[0].length - 1);
      const im = obj && obj.match(/["']?\bid["']?:\s*["']([^"']+)["']/);
      if (im) ids.calc.add(im[1]);
      if (obj) {
        const rm = obj.match(/,\s*["']?rel["']?:\s*\{/);
        if (rm) {
          const rtxt = balanced(obj, obj.indexOf('{', rm.index + rm[0].length - 1));
          if (rtxt) rels.push({ f, rel: relObject(rtxt) });
        }
      }
    }
  }
  return { ids, rels };
}

function relObject(rtxt) {
  const rel = {};
  for (const pm of rtxt.matchAll(/["']?(\w+)["']?\s*:\s*\[([^\]]*)\]/g)) {
    rel[pm[1]] = (pm[2].match(/["']([^"']+)["']/g) || []).map((x) => x.slice(1, -1));
  }
  return rel;
}
