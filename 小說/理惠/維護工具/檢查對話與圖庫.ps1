$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$luna = @(Get-Content -Raw -LiteralPath (Join-Path $root '原始對話\LunarTalk對話\逐則原始訊息.json') | ConvertFrom-Json)
$codex = @(Get-Content -Raw -LiteralPath (Join-Path $root '原始對話\Codex對話\逐則原始訊息.json') | ConvertFrom-Json)
$chat = Get-Content -Raw -LiteralPath (Join-Path $root '原始對話\ChatGPT對話\最近取得的對話資料.json') | ConvertFrom-Json
$complete = @(Get-Content -Raw -LiteralPath (Join-Path $root '原始對話\ChatGPT對話\逐則原始訊息.json') | ConvertFrom-Json)
$order = @(Get-Content -Raw -LiteralPath (Join-Path $root '正文\事件閱讀順序.json') | ConvertFrom-Json)
$redirects = @(Get-Content -Raw -LiteralPath (Join-Path $root '來源與校對\同事件整合與舊入口.json') | ConvertFrom-Json)
$events = @(Get-ChildItem -LiteralPath (Join-Path $root '分日對話') -Recurse -Filter '*.md')

if ($luna.Count -ne 437) { throw "Expected 437 Lunar Talk messages, got $($luna.Count)." }
if (@($luna | Where-Object role -eq 'ai').Count -ne 221) { throw 'Lunar Talk AI count mismatch.' }
if (@($luna | Where-Object role -eq 'user').Count -ne 215) { throw 'Lunar Talk user count mismatch.' }
if (@($chat.messages).Count -ne 56) { throw 'ChatGPT visible batch count mismatch.' }
if ($complete.Count -ne 1000) { throw "Expected 1000 complete ChatGPT messages, got $($complete.Count)." }
if ($events.Count -ne 40 -or $order.Count -ne 38 -or $redirects.Count -ne 2) { throw "Event index mismatch: source files=$($events.Count), whole events=$($order.Count), old entries=$($redirects.Count)." }
if (@($complete.message_id | Sort-Object -Unique).Count -ne 1000) { throw 'Duplicate complete source IDs.' }
foreach ($event in $order) {
    if (-not (Test-Path -LiteralPath (Join-Path $root ('正文\' + $event.path)))) { throw "Missing prose event: $($event.path)" }
}

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

Write-Output "OK: LunarTalk=$($luna.Count); PreservedLunarTalk=$($expectedLunaIds.Count); Codex=$($codex.Count); ChatGPTComplete=$($complete.Count); WholeEvents=$($order.Count); SourceEventFiles=$($events.Count); OldEntryRedirects=$($redirects.Count); OlderSnapshot=$(@($chat.messages).Count)"

if (Test-Path -LiteralPath (Join-Path $root '圖庫\圖片資料索引.json')) {
    & (Join-Path $PSScriptRoot '檢查圖片與解讀.ps1')
}
