import { listFiles, readSrc } from './lib.mjs';

const ids = { kb: new Set(), sop: new Set(), cl: new Set(), tpl: new Set(), dec: new Set(), kpi: new Set(), gloss: new Set(), calc: new Set(), scen: new Set() };
const files = listFiles().filter(f => f.endsWith('.js'));

function balanced(t, start) {
  let depth = 0;
  for (let i = start; i < t.length; i++) {
    if (t[i] === '{') depth++;
    else if (t[i] === '}') { depth--; if (!depth) return t.slice(start, i + 1); }
  }
  return null;
}

for (const f of files) {
  const t = readSrc(f);
  for (const m of t.matchAll(/PS\.S(KB|SOP|DEC|CL|TPL|KPI|GLS|SCN)\(\s*\{/g)) {
    const obj = balanced(t, m.index + m[0].length - 1);
    if (!obj) continue;
    const im = obj.match(/\bi:\s*["']([^"']+)["']/);
    const key = { KB: 'kb', SOP: 'sop', CL: 'cl', TPL: 'tpl', DEC: 'dec', KPI: 'kpi', GLS: 'gloss', SCN: 'scen' }[m[1]];
    if (im && key) ids[key].add(im[1]);
  }
  for (const m of t.matchAll(/PS_CALC\.push\(\s*\{/g)) {
    const obj = balanced(t, m.index + m[0].length - 1);
    const im = obj && obj.match(/\bid:\s*["']([^"']+)["']/);
    if (im) ids.calc.add(im[1]);
  }
}

for (const [k, set] of Object.entries(ids)) {
  console.log(`=== ${k} (${set.size}) ===`);
  console.log([...set].sort().join(', '));
}
