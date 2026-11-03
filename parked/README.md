Authored content that is deliberately not in src/manifest.txt yet.

build.mjs fails when a file under src/ is not listed in the manifest, which is the
gate that once let Module 13 ship unwired. So work that is finished but waiting on
the payload decision (task #21) is parked here rather than in src/content, and
moving it back plus listing it in src/manifest.txt is the whole wiring step.

Current contents: Academy Module 31 - Demand Forecasting and Purchase Planning
(2 lessons, 5 quizzes each, 7 SOP steps each) and its 4 knowledge concepts.
Relation ids in these files were validated against the built registry: 0 broken.
