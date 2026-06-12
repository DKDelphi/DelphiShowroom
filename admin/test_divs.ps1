$html = Get-Content "c:\Users\MobeenShaikh\Downloads\DelphiShowroom\admin\index.html" -Raw
$idxStart = $html.IndexOf('<div class="practices-main-content">')
$idxEnd = $html.IndexOf('</body>')
$subHtml = $html.Substring($idxStart, $idxEnd - $idxStart)

$matches = [regex]::Matches($subHtml, '(?i)<\/?(div)(?:\s[^>]*)?>')
$depth = 0
$lastSection = ""

# Track the current section
$secMatches = [regex]::Matches($subHtml, '(?i)<section id="([^"]+)"|</section>')
$sections = @()
foreach ($m in $secMatches) {
    if ($m.Value.StartsWith("<section")) {
        $sections += New-Object PSObject -Property @{ id = $m.Groups[1].Value; index = $m.Index }
    }
}

foreach ($m in $matches) {
    if ($m.Value -match '(?i)^</') {
        $depth--
        if ($depth -lt 0) {
            # Find the section this happens in
            $sec = "Unknown"
            foreach ($s in $sections) {
                if ($m.Index -gt $s.index) { $sec = $s.id }
            }
            Write-Host "Extra closing tag found in section: $sec at index $($m.Index)"
            $depth = 0 # reset to continue finding others
        }
    } else {
        $depth++
    }
}
