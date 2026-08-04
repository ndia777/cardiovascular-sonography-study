<#
    Bundles index.html + decks.js into ONE self-contained file at docs\index.html.

    Run it after editing decks.js, either by right-clicking this file and
    choosing "Run with PowerShell", or from a terminal:

        powershell -ExecutionPolicy Bypass -File build.ps1

    The result has no external dependencies - email it, drop it in a group chat,
    put it on Google Drive, or host it. Anyone who opens it gets the whole app,
    online or off.
#>

$ErrorActionPreference = 'Stop'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path

$srcPath   = Join-Path $here 'index.html'
$decksPath = Join-Path $here 'decks.js'
$outDir    = Join-Path $here 'docs'
$outPath   = Join-Path $outDir 'index.html'

foreach ($f in @($srcPath, $decksPath)) {
    if (-not (Test-Path $f)) {
        Write-Error ('Missing ' + (Split-Path -Leaf $f) + ' - build.ps1 must sit beside index.html and decks.js.')
        exit 1
    }
}

$html  = Get-Content $srcPath   -Raw -Encoding UTF8
$decks = Get-Content $decksPath -Raw -Encoding UTF8

# A literal closing script tag inside the deck data would end the tag early and
# break the page. Nothing has one today, but a future note might quote one.
$closeTag = '</' + 'script>'
if ($decks.ToLower().Contains($closeTag)) {
    $decks = $decks -replace ('(?i)' + [regex]::Escape($closeTag)), ('<\/' + 'script>')
    Write-Host 'note: escaped a literal closing script tag found in decks.js'
}

# Exact literal match - no regex, so nothing in the data can be misread.
$needle = '<script src="decks.js"></script>'
$idx = $html.IndexOf($needle)
if ($idx -lt 0) {
    Write-Error 'Could not find the decks.js script tag in index.html.'
    exit 1
}

$inlined = '<script>' + "`n" + $decks + "`n" + $closeTag
$bundled = $html.Substring(0, $idx) + $inlined + $html.Substring($idx + $needle.Length)

if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }

# UTF-8 with no BOM.
[System.IO.File]::WriteAllText($outPath, $bundled, (New-Object System.Text.UTF8Encoding($false)))

$kb      = [math]::Round((Get-Item $outPath).Length / 1KB)
$deckNum = ([regex]::Matches($decks, '(?m)^\s+id:\s')).Count
# Counting cards is fussier than it looks, and this line has been wrong twice.
# `{ term:` misses every `{ fact: true, term: ... }` card, and dropping the brace
# still misses the JSON-quoted `"term":` form some decks use. Match the separator
# plus an optionally quoted key, which covers all three.
# test/app.test.js re-runs this exact pattern against the real deck data, so a
# fourth card style breaks the suite instead of silently miscounting again.
$cardNum = ([regex]::Matches($decks, '[\{,]\s*"?term"?\s*:')).Count

Write-Host ''
Write-Host ('Built docs\index.html - ' + $kb + ' KB, ' + $deckNum + ' decks, ' + $cardNum + ' terms, zero external files.')
Write-Host 'That one file is the whole app. Share it however you like.'
