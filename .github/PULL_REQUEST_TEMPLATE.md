## Description
Briefly describe the purpose of this change and the problem it solves.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (e.g., new calculator, SOP, template, or competency module)
- [ ] Content or governance update (CIPS/ISM/SOX alignment)
- [ ] Documentation, styling, or accessibility enhancement
- [ ] Tooling or CI/CD improvement

## Production Quality Gates Checklist
All PRs must pass the full verification gate before merging:
- [ ] `npm run check:drift` passes (committed artifact matches `src/` fragments)
- [ ] `npm run lint` passes with 0 errors and 0 warnings
- [ ] `npm run test` passes (calculator logic and math fixtures verify)
- [ ] `npm run qa` passes end-to-end locally (smoke, security, a11y, perf)
- [ ] Bundle size remains within performance budget (< 1600 KB)
- [ ] Zero runtime dependencies added (`dependencies` in `package.json` remains empty)
- [ ] Zero outbound network requests / zero telemetry introduced
