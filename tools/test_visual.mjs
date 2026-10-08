/* ==========================================================
   Visual regression test (optional, requires Playwright).
   Captures screenshots of key routes and compares against
   baseline images in _shot/baseline/.

   Usage:
     npm run test:visual              # capture new screenshots
     npm run test:visual -- --update  # update baseline images

   Note: This is NOT part of the core `npm run qa` gate because
   Playwright is a heavy dev-only dependency. Run it in CI or
   locally before major UI changes.
   ========================================================== */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SHOT_DIR = path.join(ROOT, '_shot');
const BASELINE_DIR = path.join(SHOT_DIR, 'baseline');
const UPDATE = process.argv.includes('--update');

const ROUTES = [
  { name: 'home', url: 'file:///' + path.join(ROOT, 'ProcureSherpa-v2.0.html').replace(/\\/g, '/') + '#/home' },
  { name: 'operations', url: 'file:///' + path.join(ROOT, 'ProcureSherpa-v2.0.html').replace(/\\/g, '/') + '#/operations' },
  { name: 'academy', url: 'file:///' + path.join(ROOT, 'ProcureSherpa-v2.0.html').replace(/\\/g, '/') + '#/academy' },
  { name: 'calc-tco', url: 'file:///' + path.join(ROOT, 'ProcureSherpa-v2.0.html').replace(/\\/g, '/') + '#/calc/calc-tco' },
  { name: 'calc-compare', url: 'file:///' + path.join(ROOT, 'ProcureSherpa-v2.0.html').replace(/\\/g, '/') + '#/calc/calc-compare-quotes' },
  { name: 'sop', url: 'file:///' + path.join(ROOT, 'ProcureSherpa-v2.0.html').replace(/\\/g, '/') + '#/sop/sop-procurement-intake' },
  { name: 'settings', url: 'file:///' + path.join(ROOT, 'ProcureSherpa-v2.0.html').replace(/\\/g, '/') + '#/settings' },
  { name: 'copilot', url: 'file:///' + path.join(ROOT, 'ProcureSherpa-v2.0.html').replace(/\\/g, '/') + '#/copilot' }
];

if (!UPDATE && !fs.existsSync(BASELINE_DIR)) {
  console.log('No baseline images found. Run with --update to create them.');
  process.exit(0);
}

if (UPDATE) {
  fs.mkdirSync(BASELINE_DIR, { recursive: true });
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

let passed = 0;
let failed = 0;

for (const route of ROUTES) {
  try {
    await page.goto(route.url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    const screenshot = await page.screenshot({ fullPage: false });
    const baselinePath = path.join(BASELINE_DIR, route.name + '.png');

    if (UPDATE) {
      fs.writeFileSync(baselinePath, screenshot);
      console.log('  updated ' + route.name);
      passed++;
    } else if (fs.existsSync(baselinePath)) {
      const baseline = fs.readFileSync(baselinePath);
      if (screenshot.equals(baseline)) {
        console.log('  PASS ' + route.name);
        passed++;
      } else {
        console.log('  FAIL ' + route.name + ' (screenshot differs from baseline)');
        const diffPath = path.join(SHOT_DIR, 'diff-' + route.name + '.png');
        fs.writeFileSync(diffPath, screenshot);
        console.log('    diff saved to ' + diffPath);
        failed++;
      }
    } else {
      console.log('  SKIP ' + route.name + ' (no baseline)');
    }
  } catch (e) {
    console.log('  ERROR ' + route.name + ': ' + e.message);
    failed++;
  }
}

await browser.close();

console.log('\n--- visual regression summary ---');
console.log('passed: ' + passed);
console.log('failed: ' + failed);
process.exit(failed ? 1 : 0);
