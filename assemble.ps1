# Procure Sherpa build: concatenate source fragments into the single-file app, then validate.
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$dir  = Join-Path $root 'build'
$out  = Join-Path $root 'ProcureSherpa-v2.0.html'

$files = Get-ChildItem -Path $dir -File | Where-Object { $_.Name -notlike '.*' } | Sort-Object Name
$sb = New-Object System.Text.StringBuilder
foreach ($f in $files) {
  [void]$sb.Append((Get-Content $f.FullName -Raw))
  [void]$sb.Append("`r`n")
}
Set-Content -Path $out -Value $sb.ToString() -Encoding UTF8 -NoNewline
Write-Output ("assembled " + $files.Count + " fragments -> " + (Split-Path -Leaf $out))

$html = Get-Content $out -Raw
$m = [regex]::Match($html, '(?s)<script>(.*?)</script>')
if (-not $m.Success) { Write-Error 'no inline script block found'; exit 1 }
$jsPath = Join-Path $root '_check.js'
Set-Content -Path $jsPath -Value $m.Groups[1].Value -Encoding UTF8 -NoNewline
& node --check $jsPath
if ($LASTEXITCODE -ne 0) { Write-Error 'javascript syntax check failed'; exit 1 }

& node (Join-Path $root 'validate.mjs') $out
if ($LASTEXITCODE -ne 0) { exit 1 }
