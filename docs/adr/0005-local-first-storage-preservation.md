# ADR 0005 — Local-first storage preservation and versioned migration

**Status:** Accepted  
**Date:** 2026-11-04  
**Supersedes:** none

## Context

The master goal requires existing data integrity, business rules and user journeys to survive the revamp. Sherpa persists all user state — progress, quiz answers, exam results, badges, workbench records, notes, preferences — in the browser's `localStorage`, keyed by a small set of stable keys managed in `src/core/03d1_store.js`, `src/core/03d2_prefs.js`, `src/core/03e_saved.js` and related fragments. There is no server, no sync and no account; clearing site data clears the user's work, and `#/backup` is the documented migration path.

The revamp touches page rendering, navigation and the design system, not the storage layer — but any change to stored schemas must not silently destroy saved work.

## Decision

**Preserve local-first, client-side storage as the only persistence mechanism, with versioned schemas and tested migration.**

- No server, no cloud storage, no sync, no accounts, no telemetry (reaffirmed; see ADR 0003).
- All user data remains in `localStorage` under the existing key names; keys are not renamed or removed without a versioned migration.
- Any schema change ships with: a version number on the record, a pure migration function from old schema to new, a migration preview with counts and warnings, validation of every migrated record, preservation of unknown fields where safe, rollback backup kept until the user confirms successful use, and tests covering reload persistence, malformed data, hostile keys, quota limits and older backups.
- Backup/restore (`#/backup`) remains the human-readable JSON export and import path; hostile-file and malformed-backup handling is retained and tested.
- CSP `connect-src 'none'` is unchanged: nothing leaves the browser.

## Options considered

**A. Add cloud sync / accounts.** Rejected: breaks the single-tenant, offline-first, no-server security model (README "Privacy & Security" and SECURITY.md threat model) and requires a backend this product does not have.

**B. Move to IndexedDB.** Rejected: no operational problem with `localStorage` for this data volume, and a migration would add risk without user benefit.

**C. Preserve localStorage with versioned migration (chosen).** Keeps every existing user journey working, preserves data integrity, and gives the revamp a safe, tested path if schemas ever need to evolve.

## Consequences

- Existing saved work, progress and workbench records are not touched by the visual revamp and remain readable after any build.
- Any future schema change is gated by migration + rollback + tests, never a silent truncation or default change.
