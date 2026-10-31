/* ==========================================================
   The page contract: what a route has to contain before a gate may
   call it "rendered".

   This lives in one file because three tools need the same definition
   (tools/smoke.mjs, the G7 sweep in tools/test_integrity.mjs and
   tools/verify_deploy.mjs). Before it existed each carried its own
   number: smoke failed a route under 60 characters, G7 under 40 and the
   deploy check under 40, which is why "#/dec renders content" could be
   reported as a pass while #/dec was showing the not-found card.

   Where the numbers come from
   ---------------------------
   Master §81 lists the deliverables and says what each one IS:
   Knowledge (comprehensive concepts), SOP (a structured library),
   Decisions (interactive guides), Checklists (operational), Templates
   (practical documents), Calculators, KPIs, Scenarios, Workspace (saved
   local work), Reports, Search, Privacy, Architecture. Master §76 then
   lists the checks the product promises before release, and its first
   two headings are Navigation ("every sidebar item works") and
   Calculators ("every calculator loads"). So a route is not "rendered"
   because it returned a string; it is rendered when it delivers the
   thing §81 names, and a page that delivers nothing has to say why.

   Two kinds of page follow from that, and every route must be one of
   them (an unclassified route is treated as LIBRARY, the strict kind, so
   a new page cannot arrive unmeasured):

   LIBRARY   - the page delivers a §81 content kind. §18 gives an SOP 19
               numbered parts, §10 gives a concept 11, §24 gives a
               calculator 17, §30 gives a KPI 9, §38 the same again for a
               knowledge page. A page genuinely carrying any of those
               cannot be short: the floor is 600 characters.

   WORKSPACE - the page's payload is the reader's own data (§81 "Workspace:
               saved local work", §27, §49) or one interaction with it
               (§50, §76 Storage). Such a page legitimately has nothing to
               show on a clean browser, so the character floor is lower
               (250) but the page has to earn it: it must name the state,
               and it must offer a way forward - a link into the product
               or a control with a handler. That is the treatment the
               disabled certificate page already gives a feature it cannot
               honestly ship: a stated reason and a way back. A bare
               "nothing here" card is not a page.

   STATE     - the not-found card itself. Exempt from the floor because it
               is by definition the page for nothing, but it still may not
               leak a sentinel and must carry a way back.

   Everything, in every kind:
   - must not be the not-found card, unless the route *is* notfound;
   - must not leak `undefined`, `NaN`, `[object Object]` or `null%` (the
     signature of a consumer reading a field the producer never wrote);
   - must render a visible h1 (§47 logical heading hierarchy), except
     STATE.

   All three tools measure every route from a cleared browser profile.
   That is both the deterministic choice and the strict one: it is what a
   first-time reader sees, and it stops a data-driven page passing the
   floor because an earlier route in the sweep happened to write a record.
   ========================================================== */

export const FLOOR = { LIBRARY: 600, WORKSPACE: 250 };

/* Routes whose content is the reader's own data or one interaction.
   Anything not listed here is held to the LIBRARY floor, including pages
   that were briefly considered for this list (help, operations,
   quickstart, learning-paths, academy-progress, whats-new, career-paths)
   and rejected: their payload is shipped content, not the reader's
   records, so they take the strict floor. */
export const WORKSPACE_ROUTES = new Set([
  'saved', 'fav', 'recent', 'backup', 'settings', 'audit', 'dash', 'dash-savings',
  'copilot', 'exams', 'spend-model', 'docpack', 'assessment', 'labs', 'portfolio',
  'community', 'certificate', 'daily-tip', 'next-up',
  'rfx', 'suppliers', 'contracts', 'catalogue', 'receipts', 'budget', 'approvals', 'analytics'
]);

export const STATE_ROUTES = new Set(['notfound']);

export const SENTINELS = ['undefined', 'NaN', '[object Object]', 'null%'];

/* The signature of PS.notFound() and PS.errPanel() in src/core. */
export const NOT_FOUND_MARK = /Page not found|has no [\w ]* with the reference|Something unexpected happened while building this page/;

/* Which route prefix renders which content kind. Used to pick a real id
   out of the shipped registry for a detail fixture. */
export const DETAIL_KIND = {
  k: 'kb', sop: 'sop', cl: 'cl', tpl: 'tpl', dec: 'dec', kpi: 'kpi', scen: 'scen', calc: 'calc'
};

export function routeName(hash) {
  return String(hash).replace(/^#\//, '').split('?')[0].split('/')[0] || 'home';
}

export function classify(hash) {
  const name = routeName(hash);
  if (STATE_ROUTES.has(name)) return 'STATE';
  if (WORKSPACE_ROUTES.has(name)) return 'WORKSPACE';
  return 'LIBRARY';
}

/* Does this element actually reach an assistive technology / the screen?
   `.report-head` is a print-only duplicate h1 and is display:none on
   screen, so counting it would fail almost every route. */
function visible(win, el) {
  for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
    const st = win.getComputedStyle(n);
    if (st.display === 'none' || st.visibility === 'hidden') return false;
  }
  return true;
}

/**
 * Measure one rendered route against the contract.
 * @param {object} opts  win: the jsdom window, hash: the route visited,
 *                       main: the #main element
 * @returns {{kind:string, chars:number, links:number, controls:number,
 *            h1:number, problems:string[]}}
 */
export function assessRoute({ win, hash, main }) {
  const kind = classify(hash);
  const text = (main && main.textContent ? main.textContent : '').trim();
  const problems = [];
  const anchors = main ? [...main.querySelectorAll('a[href^="#/"]')] : [];
  const controls = main ? [...main.querySelectorAll('[data-act]')].filter((el) => visible(win, el)) : [];
  const h1s = main ? [...main.querySelectorAll('h1')].filter((el) => visible(win, el)) : [];

  for (const bad of SENTINELS) {
    if (text.includes(bad)) {
      const i = text.indexOf(bad);
      problems.push('leaks "' + bad + '" near: ' + text.slice(Math.max(0, i - 40), i + 40).replace(/\s+/g, ' '));
    }
  }
  if (NOT_FOUND_MARK.test(text) && kind !== 'STATE') {
    problems.push('renders the not-found card: ' + text.slice(0, 70).replace(/\s+/g, ' '));
  }
  if (kind !== 'STATE' && !h1s.length) problems.push('no visible h1');
  const floor = kind === 'STATE' ? 0 : FLOOR[kind];
  if (text.length < floor) problems.push('renders ' + text.length + ' chars, below the ' + floor + '-char floor for a ' + kind + ' page');
  if (kind === 'WORKSPACE' && !anchors.length && !controls.length) {
    problems.push('empty or near-empty workspace page with no way forward: no link into the product and no control on it');
  }
  return { kind, chars: text.length, links: anchors.length, controls: controls.length, h1: h1s.length, problems };
}
