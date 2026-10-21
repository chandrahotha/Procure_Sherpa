/* ==========================================================
   The build stamp.

   The stamp is a short hash of the SOURCE, not of the artifact and not
   of the commit. That distinction matters:

   - A hash of the commit would change every time the artifact is
     committed, so the committed artifact could never contain the hash
     of its own commit, and the drift check would fail on every build.
   - A hash of the artifact would be circular, because the stamp is
     part of the artifact.
   - A hash of the source fragments is stable: the same sources always
     produce the same stamp, on any machine, in any checkout, whether
     the source is checked out with LF or CRLF. So the committed
     artifact always matches a rebuild, and the live site can be asked
     "is this the build I think it is?" and get an answer.

   build.mjs and check_drift.mjs both call this, which is the point:
   the assembly and the check have to agree, and they agree because
   they agree about one function rather than about two copies of the
   same idea.

   The stamp is substituted into the artifact, so PS.BUILD at runtime
   identifies the sources the running application was built from. It is
   also what the deploy check compares against the live site.
   ========================================================== */
import crypto from 'node:crypto';

/* The placeholder lives in src/core/03a_util.js. */
export const STAMP_PATTERN = /PS\.BUILD\s*=\s*'[^']*'/;
export const STAMP_PLACEHOLDER = "PS.BUILD = '__BUILD_STAMP__'";

/* The same normalisation the build uses, so a Windows checkout and a
   Linux checkout of the same sources produce the same stamp. */
export const toCRLF = (s) => s.replace(/\r\n/g, '\n').replace(/\n/g, '\r\n');

/* The hash of the assembled source, before the stamp is substituted. */
export function stampFor(parts) {
  const text = Array.isArray(parts) ? parts.join('') : String(parts);
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex').slice(0, 12);
}

/* Substitute the stamp into an assembled artifact. */
export function applyStamp(assembled, stamp) {
  return assembled.replace(STAMP_PATTERN, "PS.BUILD = '" + stamp + "'");
}

/* Read the stamp back out of an artifact. */
export function readStamp(artifact) {
  const m = STAMP_PATTERN.exec(String(artifact));
  return m ? /'([^']*)'/.exec(m[0])[1] : null;
}
