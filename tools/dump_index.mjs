import { listFiles, baseName, readSrc } from './lib.mjs';
const groups = {};
for (const f of listFiles()) {
  if (!f.endsWith('.js')) continue;
  const t = readSrc(f);
  const pre = baseName(f).slice(0, 2);
  const key = pre === '10' ? 'kb' : pre === '11' ? 'sop' : pre === '12' ? 'cl' : pre === '13' ? 'tpl'
    : pre === '14' ? 'dec' : (pre === '15' ? 'gloss' : (pre === '16' ? 'scen' : (pre === '17' ? 'kpi' : null)));
  if (key) {
    groups[key] = groups[key] || [];
    for (const m of t.matchAll(/PS\.S(?:KB|SOP|CL|TPL|DEC|KPI|GLS|SCN)\(\{\s*i:\s*["']([a-z0-9-]+)["']\s*,\s*t:\s*("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g)) {
      let title = m[2];
      try { title = JSON.parse(title.replace(/^'|'$/g, (q) => q)); } catch { title = title.slice(1, -1); }
      if (!groups[key].some((x) => x.id === m[1])) groups[key].push({ id: m[1], t: title });
    }
  }
  if (/^2\d/.test(baseName(f))) {
    groups.calc = groups.calc || [];
    for (const m of t.matchAll(/\bid:\s*['"](calc-[a-z0-9-]+)['"]/g)) {
      if (!groups.calc.some((x) => x.id === m[1])) groups.calc.push({ id: m[1], t: m[1] });
    }
  }
}
for (const [k, v] of Object.entries(groups)) {
  console.log('=== ' + k.toUpperCase() + ' (' + v.length + ') ===');
  v.forEach((x) => console.log('  ' + x.id + '  ::  ' + x.t));
}
