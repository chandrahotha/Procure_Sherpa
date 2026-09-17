# Procure Sherpa build (thin wrapper).
# The build itself is implemented in build.mjs (Node) so that
# `npm run build` and `.\assemble.ps1` always do exactly the same thing:
# read src/manifest.txt, concatenate src/* -> ProcureSherpa-v2.0.html,
# then run the JS syntax check and validate.mjs.
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
& node (Join-Path $root 'build.mjs')
exit $LASTEXITCODE
