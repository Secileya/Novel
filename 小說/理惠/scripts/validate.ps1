$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$luna = @(Get-Content -Raw -LiteralPath (Join-Path $root 'raw\lunartalk\messages.json') | ConvertFrom-Json)
$codex = @(Get-Content -Raw -LiteralPath (Join-Path $root 'raw\codex\messages.json') | ConvertFrom-Json)
$chat = Get-Content -Raw -LiteralPath (Join-Path $root 'raw\chatgpt\latest-visible-batch.json') | ConvertFrom-Json
$events = @(Get-ChildItem -LiteralPath (Join-Path $root 'dialogue') -Recurse -Filter '*.md')

if ($luna.Count -ne 437) { throw "Expected 437 Lunar Talk messages, got $($luna.Count)." }
if (@($luna | Where-Object role -eq 'ai').Count -ne 221) { throw 'Lunar Talk AI count mismatch.' }
if (@($luna | Where-Object role -eq 'user').Count -ne 215) { throw 'Lunar Talk user count mismatch.' }
if (@($chat.messages).Count -ne 56) { throw 'ChatGPT visible batch count mismatch.' }
if ($events.Count -ne 15) { throw "Expected 15 canonical event files, got $($events.Count)." }
if (-not $chat.page_info.has_previous_page) { throw 'Expected ChatGPT source gap signal has_previous_page=true.' }

$canonicalText = ($events | ForEach-Object { Get-Content -Raw -LiteralPath $_.FullName }) -join "`n"
$canonicalLunaIds = [regex]::Matches($canonicalText,'LT-\d{4}') | ForEach-Object Value | Sort-Object -Unique
$expectedLunaIds = $luna |
    Where-Object { $_.role -ne 'system' -and $_.text.Trim() -ne '劇情摘要' } |
    ForEach-Object source_id |
    Sort-Object -Unique
$missing = Compare-Object -ReferenceObject $expectedLunaIds -DifferenceObject $canonicalLunaIds |
    Where-Object SideIndicator -eq '<=' |
    ForEach-Object InputObject
if (@($missing).Count -gt 0) { throw "Canonical event coverage is missing: $($missing -join ', ')." }

Write-Output "OK: LunarTalk=$($luna.Count); CanonicalLunarTalk=$($expectedLunaIds.Count); Codex=$($codex.Count); ChatGPTNodes=$(@($chat.messages).Count); Events=$($events.Count)"

if (Test-Path -LiteralPath (Join-Path $root 'assets\images\catalog.json')) {
    & (Join-Path $PSScriptRoot 'validate-images.ps1')
}
