$lines = Get-Content 'js/main.js' -Encoding UTF8
$newlines = @()
foreach ($l in $lines) {
    if ($l -match "filter-tech" -and $l -notmatch "forEach") { continue }
    if ($l -match "filter-domain" -and $l -notmatch "forEach") { continue }
    if ($l -match "filter-project" -and $l -notmatch "forEach") { continue }
    
    if ($l -match "forEach") {
        $l = $l -replace "'filter-tech', ", ""
        $l = $l -replace "'filter-domain', ", ""
        $l = $l -replace "'filter-project', ", ""
    }
    
    $newlines += $l
}
Set-Content 'js/main.js' -Value $newlines -Encoding UTF8
