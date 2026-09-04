$ErrorActionPreference = "Stop"
Set-Location (Split-Path -Parent $PSScriptRoot)
npx --yes serve . -l 4174
