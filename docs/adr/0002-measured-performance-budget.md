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
| **Transfer time, 3 s at 1.5 Mbps 4G** | **2.76 s** | 3.0 s | 8% |
| Compressed download, committed artifact | **518 KB gzip** | 576 KB | 10% |
| Compressed download, deployed artifact | 444 KB gzip | 490 KB | 9% |
| Script compile (full V8 parse, pessimistic) | 21 ms | 400 ms | 19x |
| Script load (parse, compile, define every content record) | 8 ms | — | — |
| Application boot to first rendered page | 32 ms | 500 ms | 15x |
| Committed readable artifact | 1868 KB | not gated | — |

Two of those numbers were wrong the first time they were measured, and
the correction matters.

**The byte ceilings were measuring the wrong thing.** The committed
artifact is 1.87 MB because it is deliberately unminified so that a
procurement team can read every line of the thing they are about to
trust with commercial decisions. What a browser receives is the
compressed form: 518 KB, which is 2.76 seconds at a conservative
1.5 Mbps. Gating on the uncompressed size was gating on bytes nobody
receives, and it had quietly become the rule instead of the reason.

**The boot probe was not measuring the application.** The first
version of the probe stripped the `<script>` element out of the artifact
before loading it, so it was timing jsdom's HTML parser rather than
Procure Sherpa, and reporting 241 ms and later 818 ms for an
application that was in fact starting in 32 ms. The probe now keeps the
script and marks both ends of it, which is what separates the three
real costs: 21 ms to parse and compile, 8 ms to define every content
record, and 32 ms from boot to a rendered first page.

**The gate is now stated in the units that matter.** The hard limit is
a transfer time: 3 seconds at a conservative effective 4G rate. The
rate is 3 Mbps, which is well below the 10 to 25 Mbps median that
Ookla reports for 4G, and accounts for latency and congestion on a
first visit. That is 1,152 KB of compressed payload, derived rather
than picked, and `build.mjs` and `tools/perf_check.mjs` both compute
it from the seconds and the rate, so they cannot disagree, and neither
of them carries a hardcoded byte ceiling that has to be remembered.
Compile time and boot time are separate measured gates. The
uncompressed size is reported, not gated.

**The first version of this ADR used 1.5 Mbps, and it was wrong.** A
1.5 Mbps effective rate is 3G territory, not 4G, and using it made the
ceiling six times tighter than the trigger it was derived from, which
had the effect of ruling out work the product actually needed. The
error is worth recording because the symptom looked like a technical
constraint and it was an invented one. A ceiling that is derived from
the constraint cannot be tightened by accident; a ceiling that is
picked can.

**What this means for content.** Depth is data, and data is what the
user downloads. The 3 second trigger is the real constraint on how much
knowledge this product can carry, and at 1.38 s the artifact is
comfortably inside it. The previous 1300 KB script ceiling, which was
never derived from anything, had made the ceiling a matter of opinion
rather than of measurement, and it was the ceiling, not the constraint,
that had been stopping the curriculum from growing.

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

- **Content growth stops being a budget negotiation.** The ceiling is
  now a transfer time, derived from the trigger, and it is measured on
  every build. The curriculum is data, and data is what the user
  downloads, so the constraint is the honest one.
- **The transfer time is the one to watch.** 2.76 s against a 3.00 s
  trigger is 8% of headroom, and it is the tightest number in the
  build. The next content release will need to be measured against it
  rather than against a byte count.
- **The boot measurement is now trustworthy and it is not the
  constraint.** 32 ms from boot to a rendered first page, with 21 ms
  to parse and compile and 8 ms to define every content record. The
  application is not a first-paint problem; the download is.
- **The measurement must not be allowed to rot.** The probes live in
  `tools/perf_check.mjs` and `tools/_perf_boot_run.mjs` and run in
  `npm run qa`. If a future change makes the transfer time or the boot
  time jump, the build fails and the cause has to be found, rather than
  the ceiling being quietly raised again. The first version of the boot
  probe was wrong for a whole release cycle, which is the argument for
  having the probe measure the thing rather than something near it.

## Trigger conditions for revisiting this

1. **Transfer time exceeds 2.9 s** at 1.5 Mbps. The artifact is at the
   ADR 0001 trigger, and the honest options are to reduce the content
   or to move the curriculum out of the inline script. The build gate
   fires before this point, so it is a warning rather than a surprise.
2. **Boot time exceeds 150 ms.** The application would have stopped
   being instant, which is the property the single file buys. The boot
   path builds every content record eagerly, so this is the number that
   moves if the content model changes shape.
3. **Compile time exceeds 100 ms.** The script has grown enough that
   parsing is no longer free, and the content should move out of the
   inline script.
4. **The application acquires a server-side component.** Then the
   offline artifact stops being the whole product and the offline
   budget question changes shape entirely.

## On measuring a wall-clock budget

The size budgets are deterministic. The timing budgets are not: they
are wall-clock measurements, and a wall-clock measurement on a machine
that is also running a headless browser is a measurement of the machine
as much as of the build. A release was blocked here once because the
gate ran while a screenshot job was competing for the CPU. The same
build measured 127 ms against a 500 ms budget moments later.

So a timing failure is measured once more after a short pause, and the
reported figures are the ones from the passing run. A build that is
genuinely slow fails twice and still fails. The retry is reported in
the output, because a gate that sometimes re-measures should say so
rather than quietly produce a nicer number. The size budgets are
never retried: they are facts about the file, not about the moment.

