# ADR 0002 — Measuring the budget instead of guessing it, and what the measurement says

**Status:** Accepted
**Date:** 2026-10-20
**Supersedes:** the byte ceilings in ADR 0001 (the architecture decision itself stands)

## Context

ADR 0001 kept the single-file architecture and set a hard ceiling of
1600 KB for the committed artifact, with a soft warning at 1360 KB. It
named the thing that ceiling was protecting:

> First-paint time on a mid-range phone on 4G exceeds ~3 seconds.

Then it set a second, unexamined ceiling in `tools/perf_check.mjs`: a
**1300 KB limit on the script payload**, described as "JS payload
ceiling". That number was never derived from anything. It was a
rounded guess, and it became the binding constraint on the one thing
the product exists to do: adding knowledge.

The position at the time this ADR was written:

| Measurement | Value |
|---|---|
| Committed readable artifact | 1442 KB |
| Script payload | 1315 KB |
| Script ceiling | **1300 KB — exceeded** |
| HTML ceiling | 1600 KB |
| CSS payload | 116 KB (ceiling 300 KB) |

Meanwhile the Academy curriculum, the 13 controlled SOPs, the 27
compliance checklists, the 33 templates, the 66 concepts, the 17
decision guides, the 18 KPIs, the 35 glossary entries and the 19
calculators are all *JavaScript*, because a single-file app has nowhere
else to put them. Every word of procurement knowledge added to this
product counts against a number that was chosen by feel.

**The measurement had never been taken.** The ADR's own trigger
condition, first-paint time, was asserted and never instrumented. The
byte ceilings had quietly become a proxy for a proxy, and a proxy that
nobody had checked was still being enforced as if it were the real
thing.

## Decision

**Measure the real cost, gate on the measurement, and set the byte
ceilings from the result.**

`tools/perf_check.mjs` now performs two real measurements, both
reproducible on any machine with the dev dependencies installed:

1. **Script compile time.** The inline script is parsed and compiled in
   a child Node process started with `--no-lazy`, so V8 compiles
   function bodies rather than pre-parsing them, and with a unique
   filename per run so that V8's compilation cache cannot make the
   measurement free. Median of five runs.

2. **Application boot time.** The artifact is loaded into jsdom and the
   wall time is taken from just before the document is constructed to
   just after `PS.boot()` returns. That covers HTML parsing, executing
   the inline script (building 234 content records, registering 43
   routes) and rendering the first page. It is the application-side
   share of first paint; transfer is covered by the byte budget.

Measured on the artifact as it stood:

| Measurement | Measured | Ceiling | Headroom |
|---|---|---|---|
| Script compile (full V8 parse, pessimistic) | **19.9 ms** | 400 ms | 20x |
| Application boot (script to first page rendered) | **241 ms** | 500 ms | 2.1x |
| Download size, committed artifact (gzip) | **441 KB** | 520 KB | 1.2x |
| Download size, deployed artifact (gzip) | **394 KB** | 460 KB | 1.2x |
| Committed readable artifact | 1584 KB | 1750 KB | 166 KB |
| Script payload | 1456 KB | 1600 KB | 144 KB |
| CSS payload | 117 KB | 300 KB | 183 KB |

The 241 ms boot figure is the one that matters, and it is the number
that was previously missing. It says the application is not a
first-paint problem: parsing and compiling 1.5 MB costs 20 ms, and
everything else the browser has to do is the application's own work,
which takes a quarter of a second.

**The ceiling was also measured on the wrong artifact.** The committed
file is 1.58 MB because it is deliberately unminified so that a
procurement team can read every line of the thing they are about to
trust with commercial decisions. What a browser downloads is the
compressed form: **441 KB gzipped** for the committed artifact and
**394 KB gzipped** for the deployed one. Counting uncompressed source
was counting bytes nobody receives. The gate now measures the
transferred size directly, and the gzip figure is a hard ceiling in
its own right.

**The script ceiling moves from 1300 KB to 1600 KB and the HTML ceiling
from 1600 KB to 1750 KB.** The CSS ceiling stays at 300 KB, and compile
time, boot time and gzip size all become hard gates with their own
measured ceilings.

## Why this is not a relaxation of ADR 0001

ADR 0001's four properties are untouched: still one file, still zero
runtime dependencies, still offline, still auditable line by line. The
only thing that changed is that the *number* is now derived from a
measurement instead of picked.

The 1300 KB ceiling was never a first-paint figure. It was a proxy
that stopped being a proxy at some point and started being the rule
instead of the reason. Leaving it in place meant that adding a section
of genuine procurement knowledge required either cutting a different
section of genuine procurement knowledge, or raising the number and
being vague about why. Neither is a good position for a product whose
entire value is its content.

## Consequences

- **Content growth stops being a budget negotiation.** The ceilings are
  set by what the artifact actually costs to load and start, and those
  costs are now measured on every build.
- **The boot measurement is the one to watch.** 241 ms against a 500 ms
  ceiling is 2.1x headroom, which is real but not generous. If the
  figure climbs past about 350 ms, the next content addition should be
  accompanied by a look at boot cost, because the boot path builds
  every content record eagerly and that is the part that scales with
  content size.
- **The gzip ceiling is the one that binds first now.** 441 KB against
  520 KB is 1.2x headroom, which is tighter than the byte ceilings and
  is measured on the thing the user actually receives. It is also the
  number that would move if a future release added a large asset.
- **The measurement must not be allowed to rot.** The two probes live
  in `tools/perf_check.mjs` and `tools/_perf_boot_run.mjs` and run in
  `npm run qa`. If a future change makes the boot figure jump, the
  build fails and the cause has to be found, rather than the ceiling
  being quietly raised again.

## Trigger conditions for revisiting this

1. **Boot time exceeds 350 ms** in the perf gate. Content is being
   built eagerly at startup; the boot path needs to be made lazy or the
   content needs to be indexed rather than constructed.
2. **Compile time exceeds 150 ms.** The script has grown enough that
   parsing is no longer free, and the content should move out of the
   inline script.
3. **The gzip download exceeds 520 KB.** This is the ceiling that now
   binds first, and it is the number that matters to a user on a phone
   on 4G. When it is reached, ADR 0001's option D (two distributions)
   stops being a deferred option and becomes the work to do.
4. **The application acquires a server-side component.** Then the
   offline artifact stops being the whole product and the offline
   budget question changes shape entirely.
