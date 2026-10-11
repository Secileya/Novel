param([string]$SourceDirectory)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$library = Join-Path $root '圖庫'
$originals = Join-Path $library '原圖'
$catalog = @(Get-Content -Raw -Encoding utf8 -LiteralPath (Join-Path $library '圖片資料索引.json') | ConvertFrom-Json)
$files = @(Get-ChildItem -LiteralPath $originals -File)
$analyses = @(Get-ChildItem -LiteralPath (Join-Path $library '逐張解讀') -File -Filter '*.md')
if ($catalog.Count -ne 197 -or $files.Count -ne 197 -or $analyses.Count -ne 197) { throw 'Catalog, originals and analysis files must each contain exactly 197 entries.' }
if (@($catalog.asset_id | Sort-Object -Unique).Count -ne 197) { throw 'Duplicate asset IDs.' }
if (@(Compare-Object @(1..197) @($catalog.number)).Count -ne 0) { throw 'Number sequence mismatch.' }
if ((($files | Measure-Object Length -Sum).Sum) -ne 152678508) { throw 'Original collection byte total mismatch.' }
$annotations = @(Import-Csv -LiteralPath (Join-Path $library '逐張圖片解讀資料.tsv') -Delimiter "`t" -Encoding utf8)
if ($annotations.Count -ne 197) { throw 'Annotation source count mismatch.' }
$index = Get-Content -Raw -Encoding utf8 -LiteralPath (Join-Path $library '圖片索引.md')
$gallery = Get-Content -Raw -Encoding utf8 -LiteralPath (Join-Path $library '全部圖片預覽.md')
if ([regex]::Matches($index, '(?m)^\| \d{3} \|').Count -ne 197) { throw 'Index does not include 197 rows.' }
if ([regex]::Matches($gallery, '<summary>\d{3} ·').Count -ne 197) { throw 'Gallery does not include 197 items.' }
foreach ($entry in $catalog) {
    $path = Join-Path $root $entry.relative_path
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) { throw "Missing image: $($entry.asset_id)" }
    $file = Get-Item -LiteralPath $path
    if ($file.Name -ne $entry.stored_filename -or $file.Length -ne $entry.bytes) { throw "File metadata mismatch: $($entry.asset_id)" }
    if ((Get-FileHash -LiteralPath $path -Algorithm SHA256).Hash.ToLowerInvariant() -ne $entry.sha256) { throw "Image hash mismatch: $($entry.asset_id)" }
    if ($entry.width -le 0 -or $entry.height -le 0) { throw "Invalid dimensions: $($entry.asset_id)" }
    foreach ($field in @('visible_record','interpretation_and_use','limitations','filename_assessment','review_method')) {
        if ([string]::IsNullOrWhiteSpace($entry.$field)) { throw "Blank $field at $($entry.asset_id)" }
    }
    $annotation = $annotations | Where-Object { [int]$_.number -eq $entry.number }
    if ($entry.visible_record -ne $annotation.visible -or $entry.interpretation_and_use -ne $annotation.interpretation -or $entry.limitations -ne $annotation.limits) {
        throw "Catalog no longer matches authored annotation: $($entry.asset_id)"
    }
    if ($entry.canon_status -ne 'REFERENCE_ONLY_NOT_STORY_EVENT' -or @($entry.story_event_ids).Count -ne 0) { throw "An image was silently made canon: $($entry.asset_id)" }
    $analysis = Get-Content -Raw -Encoding utf8 -LiteralPath (Join-Path $root $entry.analysis_path)
    foreach ($heading in @('## 畫面記錄','## 可用解讀／選圖用途','## 不能直接確定的事','## 檔名與來源檢核')) {
        if (-not $analysis.Contains($heading)) { throw "Missing section in $($entry.asset_id): $heading" }
    }
    $link = '原圖/' + [Uri]::EscapeDataString($entry.stored_filename)
    if (-not $index.Contains($link) -or -not $gallery.Contains($link)) { throw "Broken generated link: $($entry.asset_id)" }
    if ($SourceDirectory) {
        $sourcePath = Join-Path $SourceDirectory $entry.original_filename
        if (-not (Test-Path -LiteralPath $sourcePath -PathType Leaf)) { throw "Original source is missing: $sourcePath" }
        if ((Get-FileHash -LiteralPath $sourcePath -Algorithm SHA256).Hash.ToLowerInvariant() -ne $entry.sha256) { throw "Source-copy mismatch: $($entry.asset_id)" }
    }
}
foreach ($number in 109..197) {
    $entry = $catalog | Where-Object number -eq $number
    if ($entry.review_method -ne 'DIRECT_LOCAL_IMAGE_REVIEW') { throw "Missing direct review at $number" }
}
foreach ($number in @(29,34,42,45)) {
    $entry = $catalog | Where-Object number -eq $number
    if ($entry.review_method -ne 'DIRECT_LOCAL_IMAGE_REVIEW') { throw "Supplemental direct review lost at $number" }
}
foreach ($number in @(151,152,154,158,159,161,162)) {
    $entry = $catalog | Where-Object number -eq $number
    if ($entry.filename_assessment -eq '相容') { throw "Known filename issue lost at $number" }
}
$directCount = @($catalog | Where-Object review_method -eq 'DIRECT_LOCAL_IMAGE_REVIEW').Count
Write-Output "OK: images=197; analyses=197; unique IDs=197; numeric order=001-197; file hashes verified; direct reviews=$directCount; source copies verified=$([bool]$SourceDirectory)."
