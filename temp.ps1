Continue = 'Stop'; try { [System.Management.Automation.Language.Parser]::ParseFile('c:\Users\MobeenShaikh\Downloads\DelphiShowroom\js\main.js', [ref], [ref]) } catch { Write-Host .Exception.Message }
