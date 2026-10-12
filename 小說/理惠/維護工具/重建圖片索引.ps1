param(
    [string]$SourceDirectory,
    [switch]$RebuildOnly
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$library = Join-Path $root '圖庫'
$originals = Join-Path $library '原圖'
$analysisDirectory = Join-Path $library '逐張解讀'
$utf8 = [System.Text.UTF8Encoding]::new($false)
$storedNameMap = @{ '047_Gyaru_Peace.webp' = '047_雙手比耶.webp'; '086_KTV約會.webp' = '086_唱歌約會.webp' }
$sourceNameMap = @{ '047_雙手比耶.webp' = '047_Gyaru_Peace.webp'; '086_唱歌約會.webp' = '086_KTV約會.webp' }

function Write-GeneratedText([string]$Path, [string]$Content) {
    [System.IO.File]::WriteAllText($Path, $Content.Replace("`r`n", "`n") + "`n", $utf8)
}

function Get-WebPDimensions([string]$Path) {
    $bytes = [System.IO.File]::ReadAllBytes($Path)
    $ascii = [System.Text.Encoding]::ASCII
    if ($bytes.Length -lt 20 -or $ascii.GetString($bytes, 0, 4) -ne 'RIFF' -or $ascii.GetString($bytes, 8, 4) -ne 'WEBP') {
        throw "Invalid WebP signature: $Path"
    }
    for ($position = 12; $position + 8 -le $bytes.Length;) {
        $type = $ascii.GetString($bytes, $position, 4)
        $length = [BitConverter]::ToUInt32($bytes, $position + 4)
        $data = $position + 8
        if ($data + $length -gt $bytes.Length) { throw "Truncated WebP chunk: $Path" }
        if ($type -eq 'VP8X' -and $length -ge 10) {
            $width = 1 + [int]$bytes[$data + 4] + ([int]$bytes[$data + 5] -shl 8) + ([int]$bytes[$data + 6] -shl 16)
            $height = 1 + [int]$bytes[$data + 7] + ([int]$bytes[$data + 8] -shl 8) + ([int]$bytes[$data + 9] -shl 16)
            return @($width, $height)
        }
        if ($type -eq 'VP8 ' -and $length -ge 10) {
            if ($bytes[$data + 3] -ne 0x9d -or $bytes[$data + 4] -ne 0x01 -or $bytes[$data + 5] -ne 0x2a) {
                throw "Invalid VP8 frame: $Path"
            }
            return @(([BitConverter]::ToUInt16($bytes, $data + 6) -band 0x3fff), ([BitConverter]::ToUInt16($bytes, $data + 8) -band 0x3fff))
        }
        if ($type -eq 'VP8L' -and $length -ge 5 -and $bytes[$data] -eq 0x2f) {
            $bits = [BitConverter]::ToUInt32($bytes, $data + 1)
            return @(1 + ($bits -band 0x3fff), 1 + (($bits -shr 14) -band 0x3fff))
        }
        $position = $data + $length + ($length % 2)
    }
    throw "WebP dimensions not found: $Path"
}

$annotations = @(Import-Csv -LiteralPath (Join-Path $library '逐張圖片解讀資料.tsv') -Delimiter "`t" -Encoding utf8)
if ($annotations.Count -ne 197) { throw "Expected 197 annotations, got $($annotations.Count)." }
$annotationMap = @{}
foreach ($row in $annotations) {
    $number = [int]$row.number
    if ($annotationMap.ContainsKey($number)) { throw "Duplicate annotation number: $number" }
    foreach ($field in @('visible', 'interpretation', 'limits', 'tags', 'filename_assessment')) {
        if ([string]::IsNullOrWhiteSpace($row.$field)) { throw "Blank $field at $number" }
    }
    $annotationMap[$number] = $row
}
foreach ($number in 1..197) { if (-not $annotationMap.ContainsKey($number)) { throw "Missing annotation: $number" } }

New-Item -ItemType Directory -Path $originals, $analysisDirectory -Force | Out-Null
if (-not $RebuildOnly) {
    if ([string]::IsNullOrWhiteSpace($SourceDirectory)) { throw 'Pass -SourceDirectory, or -RebuildOnly to rebuild an already imported library.' }
    $source = (Resolve-Path -LiteralPath $SourceDirectory).Path
    $sourceFiles = @(Get-ChildItem -LiteralPath $source -File | Where-Object Extension -eq '.webp' | Sort-Object Name)
    if ($sourceFiles.Count -ne 197) { throw "Expected exactly 197 source WebP files, got $($sourceFiles.Count)." }
    $sourceNumbers = @($sourceFiles | ForEach-Object {
        if ($_.Name -notmatch '^(\d{3})_(.+)\.webp$') { throw "Unexpected source name: $($_.Name)" }
        [int]$Matches[1]
    })
    if (@(Compare-Object @(1..197) $sourceNumbers).Count -ne 0 -or @($sourceNumbers | Sort-Object -Unique).Count -ne 197) {
        throw 'Source numbers must be unique and continuous 001-197.'
    }
    foreach ($file in $sourceFiles) {
        $storedName = if ($storedNameMap.ContainsKey($file.Name)) { $storedNameMap[$file.Name] } else { $file.Name }
        $target = Join-Path $originals $storedName
        $sourceHash = (Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
        if (Test-Path -LiteralPath $target) {
            if ((Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash.ToLowerInvariant() -ne $sourceHash) {
                throw "Refusing to overwrite a differing existing image: $target"
            }
        } else {
            Copy-Item -LiteralPath $file.FullName -Destination $target
        }
        if ((Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash.ToLowerInvariant() -ne $sourceHash) {
            throw "Copy verification failed: $($file.Name)"
        }
    }
}

$files = @(Get-ChildItem -LiteralPath $originals -File | Sort-Object Name)
if ($files.Count -ne 197) { throw "Expected 197 imported originals, got $($files.Count)." }
$catalog = [System.Collections.Generic.List[object]]::new()
$index = [System.Collections.Generic.List[string]]::new()
$gallery = [System.Collections.Generic.List[string]]::new()
$index.Add('# 圖像索引：001–197')
$index.Add('')
$index.Add('197 張原檔按原編號排列。這是素材庫，不是已發生的故事清單。成人項目有清楚標示；點「解讀」查看畫面記錄、推論、限制與原圖。')
$index.Add('')
$index.Add('[使用規則](閱讀指南.md) · [全部圖片預覽](全部圖片預覽.md) · [選圖參考](寫作選圖參考.md) · [結構化索引](圖片資料索引.json)')
$index.Add('')
$index.Add('| 編號 | 原檔名／原圖 | 內容分類 | 畫面記錄 | 檔名檢核 | 解讀 |')
$index.Add('|---|---|---|---|---|---|')
$gallery.Add('# 圖像區：原編號完整預覽')
$gallery.Add('')
$gallery.Add('共 197 張，保留原始檔案，沒有調色、裁切、重畫或另加遮罩。成人項目及其他圖片均以可展開區塊排列。原圖可能本來就含遮罩。')
$gallery.Add('')
$gallery.Add('[索引](圖片索引.md) · [使用規則](閱讀指南.md)')
$gallery.Add('')

foreach ($file in $files) {
    if ($file.Name -notmatch '^(\d{3})_(.+)\.webp$') { throw "Unexpected imported image: $($file.Name)" }
    $number = [int]$Matches[1]
    $label = $Matches[2]
    $sourceFilename = if ($sourceNameMap.ContainsKey($file.Name)) { $sourceNameMap[$file.Name] } else { $file.Name }
    $sourceLabel = [IO.Path]::GetFileNameWithoutExtension($sourceFilename).Substring(4)
    $padded = '{0:D3}' -f $number
    $id = "SR-IMG-$padded"
    $row = $annotationMap[$number]
    $dimensions = Get-WebPDimensions $file.FullName
    $rating = 'GENERAL'
    $ratingLabel = '一般'
    if ($number -in @(103, 105, 127, 129, 130, 195)) { $rating = 'SUGGESTIVE'; $ratingLabel = '親密／衣著' }
    if ($number -in @(128, 131, 132, 133, 188, 189, 192, 193, 194, 196, 197)) { $rating = 'ADULT_NUDITY'; $ratingLabel = '成人裸露' }
    if (($number -ge 109 -and $number -le 126) -or ($number -ge 134 -and $number -le 187) -or $number -in @(190,191)) {
        $rating = 'ADULT_SEXUAL'; $ratingLabel = '成人性接觸'
    }
    $category = if ($number -le 20) { '表情' } elseif ($number -le 50) { '居家互動' } elseif ($number -le 74) { '戶外／修復' } elseif ($number -le 78) { '未來情境參考' } elseif ($number -le 108) { '約會場所' } elseif ($number -le 126) { '身體接觸' } elseif ($number -le 163) { '成人親密動作' } elseif ($number -le 187) { '性交姿勢' } elseif ($number -le 191) { '浴室' } else { '休息／事後參考' }
    $directReview = $number -ge 109 -or $number -in @(29,30,34,42,45)
    $reviewMethod = if ($directReview) { 'DIRECT_LOCAL_IMAGE_REVIEW' } else { 'INHERITED_REVIEW_WITH_NUMBER_CHECK' }
    $reviewLabel = if ($directReview) { '本次直接開啟本機原圖核對。' } else { '沿用前次已讀圖像解讀與編號核對；不是本批逐張重新開圖。' }
    $hash = (Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
    $analysisFilename = $file.BaseName + '_解讀.md'
    $imageLink = '原圖/' + [Uri]::EscapeDataString($file.Name)
    $analysisLink = '逐張解讀/' + [Uri]::EscapeDataString($analysisFilename)
    $githubBase = [Uri]::EscapeDataString('小說') + '/' + [Uri]::EscapeDataString('理惠') + '/' + [Uri]::EscapeDataString('圖庫') + '/'
    $githubImageUrl = 'https://raw.githubusercontent.com/Secileya/Novel/main/' + $githubBase + [Uri]::EscapeDataString('原圖') + '/' + [Uri]::EscapeDataString($file.Name)
    $githubAnalysisUrl = 'https://github.com/Secileya/Novel/blob/main/' + $githubBase + [Uri]::EscapeDataString('逐張解讀') + '/' + [Uri]::EscapeDataString($analysisFilename)
    $embedFromProse = "![理惠｜$id｜$label](../圖庫/$imageLink)"
    $embedFromDialogue = "![理惠｜$id｜$label](../../圖庫/$imageLink)"
    $embedForChat = "![理惠｜$id｜$label]($githubImageUrl)"
    $entry = [ordered]@{
        asset_id = $id
        number = $number
        character = '佐伯理惠'
        original_filename = $sourceFilename
        original_label = $sourceLabel
        stored_filename = $file.Name
        display_label = $label
        relative_path = '圖庫/原圖/' + $file.Name
        analysis_path = '圖庫/逐張解讀/' + $analysisFilename
        github_image_url = $githubImageUrl
        github_analysis_url = $githubAnalysisUrl
        markdown_embed_from_prose = $embedFromProse
        markdown_embed_from_dialogue = $embedFromDialogue
        markdown_embed_for_chat = $embedForChat
        sha256 = $hash
        bytes = $file.Length
        width = $dimensions[0]
        height = $dimensions[1]
        content_rating = $rating
        category = $category
        canon_status = 'REFERENCE_ONLY_NOT_STORY_EVENT'
        story_event_ids = @()
        visible_record = $row.visible
        interpretation_and_use = $row.interpretation
        limitations = $row.limits
        tags = @($row.tags.Split(';'))
        filename_assessment = $row.filename_assessment
        review_method = $reviewMethod
        provenance_id = 'IMG-LOCAL-197'
    }
    $catalog.Add($entry)
    $index.Add("| $padded | [$($file.Name)]($imageLink) | $ratingLabel | $($row.visible) | $($row.filename_assessment) | [解讀]($analysisLink) |")
    $gallery.Add('<details>')
    $gallery.Add("<summary>$padded · $($file.Name) · $ratingLabel</summary>")
    $gallery.Add('')
    $gallery.Add("![SR-IMG-$padded]($imageLink)")
    $gallery.Add('')
    $gallery.Add("$($row.visible)")
    $gallery.Add('')
    $gallery.Add("[逐張解讀]($analysisLink)")
    $gallery.Add('')
    $gallery.Add('</details>')
    $gallery.Add('')
    $analysis = @(
        "# $id · $label", '',
        "原檔名：``$sourceFilename``  ",
        "內容分類：$ratingLabel  ",
        "類別：$category  ",
        '正典狀態：僅為圖像參考，未自行連結到任何故事事件。', '',
        '## 畫面記錄', '', $row.visible, '',
        '## 可用解讀／選圖用途', '', $row.interpretation, '',
        '## 不能直接確定的事', '', $row.limits, '',
        '另：表情、愛心、汗滴、未反抗、姿勢或原檔名，都不能單獨證明同意、高潮、關係階段或好感度。確認事件請回查有效對話。', '',
        '## 檔名與來源檢核', '',
        "- 檔名檢核：$($row.filename_assessment)",
        "- 解讀來源：$reviewLabel",
        '- 原檔來源：IMG-LOCAL-197；見 [來源紀錄](../../來源與校對/圖片來源與核對紀錄.md)。',
        "- 圖像尺寸：$($dimensions[0]) × $($dimensions[1])；檔案大小：$($file.Length) bytes。",
        "- SHA-256：``$hash``", '',
        '## 原圖', '',
        '<details>', '<summary>展開原圖（依上方內容分類）</summary>', '',
        "![SR-IMG-$padded](../$imageLink)", '', '</details>', '',
        '## 正文直接嵌圖', '',
        '位於 `正文/` 的 Markdown 使用：', '',
        '```markdown', $embedFromProse,
        "圖像索引：[$id](../圖庫/$analysisLink)", '```', '',
        '位於 `分日對話/第幾天/` 的 Markdown 使用：', '',
        '```markdown', $embedFromDialogue,
        "圖像索引：[$id](../../圖庫/$analysisLink)", '```', '',
        '聊天中直接顯示（GitHub 原圖網址）：', '',
        '```markdown', $embedForChat,
        "圖像索引：[$id]($githubAnalysisUrl)", '```', '',
        '[回到圖像索引](../圖片索引.md)'
    ) -join "`n"
    Write-GeneratedText (Join-Path $analysisDirectory $analysisFilename) $analysis
}

Write-GeneratedText (Join-Path $library '圖片資料索引.json') (ConvertTo-Json -InputObject $catalog.ToArray() -Depth 10)
Write-GeneratedText (Join-Path $library '圖片索引.md') ($index -join "`n")
Write-GeneratedText (Join-Path $library '全部圖片預覽.md') ($gallery -join "`n")
$imageHashes = $catalog | ForEach-Object { "$($_.sha256)  原圖/$($_.stored_filename)" }
Write-GeneratedText (Join-Path $library '檔案校驗碼.sha256') ($imageHashes -join "`n")
$totalBytes = ($files | Measure-Object Length -Sum).Sum
Write-Output "Imported and cataloged $($catalog.Count) images. Bytes=$totalBytes; direct reviews=$(@($catalog | Where-Object review_method -eq 'DIRECT_LOCAL_IMAGE_REVIEW').Count)."
