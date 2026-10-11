$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$target = Join-Path $root 'provenance\CHECKSUMS.sha256'
$lines = Get-ChildItem -LiteralPath $root -Recurse -File |
    Where-Object { $_.FullName -notlike "$root\.git\*" -and $_.FullName -ne $target } |
    Sort-Object FullName |
    ForEach-Object {
        $hash = (Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
        $relative = $_.FullName.Substring($root.Length + 1).Replace('\','/')
        "$hash  $relative"
    }
$lines | Set-Content -LiteralPath $target -Encoding utf8
Write-Output "Wrote $($lines.Count) checksums."
