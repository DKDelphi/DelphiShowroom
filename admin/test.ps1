$html = Get-Content "c:\Users\MobeenShaikh\Downloads\DelphiShowroom\admin\index.html" -Raw
function Check-Hierarchy ($id) {
    $index = $html.IndexOf("id="`$id"")
    if ($index -eq -1) {
        Write-Host "$id not found"
        return
    }
    $prefix = $html.Substring(0, $index)
    $matches = [regex]::Matches($prefix, '(?i)<\/?(section|div)(?:\s[^>]*)?>')
    $stack = @()
    foreach ($m in $matches) {
        $tag = $m.Value.ToLower()
        if ($tag.StartsWith("</")) {
            if ($stack.Count -gt 0) {
                $stack = $stack[0..($stack.Count-2)]
            }
        } else {
            $stack += $tag
        }
    }
    Write-Host "Parents of $id :"
    foreach ($t in $stack) {
        Write-Host "  $t"
    }
}
Check-Hierarchy "screen-datamodels"
Check-Hierarchy "screen-engines"
Check-Hierarchy "screen-manufacturing"
