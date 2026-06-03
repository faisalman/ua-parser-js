Write-Host "`n- run build`n"
npm run build-windows
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "`n- lint js code`n"
npm run test:jshint
if ($LASTEXITCODE -ne 0) { exit 1 }
npm run test:eslint
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "`n- test using mocha`n"
npm run test:mocha
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "`n- test using playwright`n"
npm run test:playwright
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "`n- lint lockfile`n"
npm run test:lockfile-lint
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "`n- lint d.ts files`n"
npm run test:dts-lint
if ($LASTEXITCODE -ne 0) { exit 1 }