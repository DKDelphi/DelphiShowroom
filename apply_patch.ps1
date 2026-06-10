
$file = 'index.html'
$content = Get-Content $file -Raw

$patch = Get-Content 'patch.txt' -Raw

$startMarker = '<h1>Healthcare Solutions</h1>'
$endMarker = '<!-- TAB 2: Data Models -->'

$startIndex = $content.IndexOf($startMarker)
$endIndex = $content.IndexOf($endMarker)

if ($startIndex -ge 0 -and $endIndex -gt $startIndex) {
    $newContent = $content.Substring(0, $startIndex) + $patch + $content.Substring($endIndex + $endMarker.Length)
    Set-Content $file -Value $newContent -Encoding UTF8
    Write-Output 'Patch applied successfully'
} else {
    Write-Output 'Failed to find markers'
}

