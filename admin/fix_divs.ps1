$html = Get-Content "c:\Users\MobeenShaikh\Downloads\DelphiShowroom\admin\index.html" -Raw

$fixedHtml = ""
$depth = 0
$idx = 0

$matches = [regex]::Matches($html, '(?i)<\/?(div|section)(?:\s[^>]*)?>')

foreach ($m in $matches) {
    $fixedHtml += $html.Substring($idx, $m.Index - $idx)
    
    $tag = $m.Value.ToLower()
    if ($tag -match '^</') {
        if ($depth -gt 0) {
            $depth--
            $fixedHtml += $m.Value
        } else {
            Write-Host "Ignoring stray closing tag at $($m.Index): $($m.Value)"
            # Skip appending $m.Value
        }
    } else {
        $depth++
        $fixedHtml += $m.Value
    }
    $idx = $m.Index + $m.Length
}

$fixedHtml += $html.Substring($idx)

Set-Content "c:\Users\MobeenShaikh\Downloads\DelphiShowroom\admin\index_fixed.html" -Value $fixedHtml
