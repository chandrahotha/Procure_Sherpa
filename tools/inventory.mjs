import fs from 'node:fs';
import path from 'node:path';
import { listFiles, baseName, readSrc } from './lib.mjs';
const groups = { kb: [], sop: [], cl: [], tpl: [], dec: [], kpi: [], scen: [], gloss: [], calc: [] };
for (const f of listFiles()) {
  if (!f.endsWith('.js')) continue;
  const t = readSrc(f);
  const pre = baseName(f).slice(0, 2);
  const key = pre === '10' ? 'kb' : pre === '11' ? 'sop' : pre === '12' ? 'cl' : pre === '13' ? 'tpl'
    : pre === '14' ? 'dec' : (pre === '15' ? 'gloss' : (pre === '16' ? 'scen' : (pre === '17' ? 'kpi' : null)));
  if (key) {
    for (const m of t.matchAll(/\bi:\s*["']([a-z0-9-]+)["']/g)) if (!groups[key].includes(m[1])) groups[key].push(m[1]);
  }
  if (/^2\d/.test(f)) {
    for (const m of t.matchAll(/\bid:\s*['"](calc-[a-z0-9-]+)['"]/g)) if (!groups.calc.includes(m[1])) groups.calc.push(m[1]);
  }
}
for (const [k, v] of Object.entries(groups)) console.log(k.toUpperCase() + ' (' + v.length + '): ' + v.join(' '));
