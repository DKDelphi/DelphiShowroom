$html = Get-Content "c:\Users\MobeenShaikh\Downloads\DelphiShowroom\admin\index.html" -Raw

function Get-Hierarchy($id) {
    $idx = $html.IndexOf("id="$id"")
    if ($idx -eq -1) { Write-Host "$id not found"; return }
    $prefix = $html.Substring(0, $idx)
    
    $tags = [regex]::Matches($prefix, '(?i)<\/?(?:section|div)[^>]*>') | ForEach-Object { $_.Value }
    $stack = New-Object System.Collections.ArrayList
    
    foreach ($t in $tags) {
        if ($t -match '(?i)^</') {
            if ($stack.Count -gt 0) {
                $stack.RemoveAt($stack.Count - 1)
            }
        } else {
            $null = $stack.Add($t)
        }
    }
    
    Write-Host "--- Parents of $id ---"
    foreach ($t in $stack) {
        Write-Host "  $t"
    }
}

Get-Hierarchy "screen-datamodels"
Get-Hierarchy "screen-engines"
Get-Hierarchy "screen-manufacturing"
