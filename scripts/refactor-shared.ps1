#!/usr/bin/env pwsh
# refactor-shared.ps1  —  Move shared hooks/api/contexts into domain sub-folders
# and update all TS/TSX imports across the repo.
#
# Usage:  pwsh scripts/refactor-shared.ps1

$ErrorActionPreference = 'Stop'
Set-Location (Split-Path $PSScriptRoot -Parent)

# ── helpers ──────────────────────────────────────────────────────────────────
function Move-And-Rewrite {
    param(
        [string]$OldRelative,   # e.g.  shared/hooks/use-auth.ts
        [string]$NewRelative    # e.g.  shared/hooks/auth/use-auth.ts
    )
    $oldFull  = "src/$OldRelative"
    $newFull  = "src/$NewRelative"
    $newDir   = Split-Path $newFull -Parent

    if (-not (Test-Path $oldFull)) {
        Write-Warning "SKIP (not found): $oldFull"
        return
    }

    # Create target directory
    if (-not (Test-Path $newDir)) {
        New-Item -ItemType Directory -Path $newDir -Force | Out-Null
    }

    # git mv (preserves history)
    git mv $oldFull $newFull
    Write-Host "  $oldFull  ->  $newFull"

    # Build the old and new import paths (without extension)
    $oldImport = "@/$($OldRelative -replace '\.tsx?$','' -replace '\\','/')"
    $newImport = "@/$($NewRelative -replace '\.tsx?$','' -replace '\\','/')"

    # Rewrite every .ts/.tsx file that references the old import
    Get-ChildItem -Path src -Recurse -Include *.ts,*.tsx |
        ForEach-Object {
            $content = Get-Content $_.FullName -Raw
            if ($content -match [regex]::Escape($oldImport)) {
                $content = $content -replace [regex]::Escape($oldImport), $newImport
                Set-Content $_.FullName -Value $content -NoNewline
            }
        }
}

# ── 1. HOOKS ─────────────────────────────────────────────────────────────────
Write-Host "`n=== Moving hooks ==="

$hookMoves = @{
    # auth domain
    "shared/hooks/use-auth.ts"                    = "shared/hooks/auth/use-auth.ts"
    "shared/hooks/use-permissions.ts"              = "shared/hooks/auth/use-permissions.ts"
    # company domain
    "shared/hooks/use-companies.ts"                = "shared/hooks/company/use-companies.ts"
    "shared/hooks/use-company-members.ts"          = "shared/hooks/company/use-company-members.ts"
    # project domain
    "shared/hooks/use-projects.ts"                 = "shared/hooks/project/use-projects.ts"
    "shared/hooks/use-documents.ts"                = "shared/hooks/project/use-documents.ts"
    # vendor domain
    "shared/hooks/use-vendors.ts"                  = "shared/hooks/vendor/use-vendors.ts"
    # wallet domain
    "shared/hooks/use-wallet.ts"                   = "shared/hooks/wallet/use-wallet.ts"
    # messaging domain
    "shared/hooks/use-messaging.ts"                = "shared/hooks/messaging/use-messaging.ts"
    # onboarding domain
    "shared/hooks/use-onboarding.ts"               = "shared/hooks/onboarding/use-onboarding.ts"
    # services domain
    "shared/hooks/use-services.ts"                 = "shared/hooks/service/use-services.ts"
    # core / utilities
    "shared/hooks/use-isomorphic-layout-effect.tsx" = "shared/hooks/core/use-isomorphic-layout-effect.tsx"
    "shared/hooks/use-outside-click.ts"            = "shared/hooks/core/use-outside-click.ts"
    "shared/hooks/use-media-query.ts"              = "shared/hooks/core/use-media-query.ts"
    "shared/hooks/use-location-preference.ts"      = "shared/hooks/core/use-location-preference.ts"
    "shared/hooks/use-weather.ts"                  = "shared/hooks/core/use-weather.ts"
    "shared/hooks/use-right-panel.ts"              = "shared/hooks/core/use-right-panel.ts"
}

foreach ($pair in $hookMoves.GetEnumerator()) {
    Move-And-Rewrite $pair.Key $pair.Value
}

# ── 2. API ───────────────────────────────────────────────────────────────────
Write-Host "`n=== Moving API ==="

$apiMoves = @{
    "shared/api/auth.ts"          = "shared/api/auth/auth.ts"
    "shared/api/companies.ts"     = "shared/api/company/companies.ts"
    "shared/api/kyc.ts"           = "shared/api/company/kyc.ts"
    "shared/api/projects.ts"      = "shared/api/project/projects.ts"
    "shared/api/proposals.ts"     = "shared/api/project/proposals.ts"
    "shared/api/schedules.ts"     = "shared/api/project/schedules.ts"
    "shared/api/services.ts"      = "shared/api/service/services.ts"
    "shared/api/users.ts"         = "shared/api/user/users.ts"
    "shared/api/wallet.ts"        = "shared/api/wallet/wallet.ts"
    "shared/api/messaging.ts"     = "shared/api/messaging/messaging.ts"
    "shared/api/notifications.ts" = "shared/api/notification/notifications.ts"
    "shared/api/onboarding.ts"    = "shared/api/onboarding/onboarding.ts"
}

foreach ($pair in $apiMoves.GetEnumerator()) {
    Move-And-Rewrite $pair.Key $pair.Value
}

# ── 3. CONTEXTS ──────────────────────────────────────────────────────────────
Write-Host "`n=== Moving contexts ==="

$ctxMoves = @{
    "shared/contexts/active-company-context.tsx" = "shared/contexts/company/active-company-context.tsx"
    "shared/contexts/right-panel-context.tsx"    = "shared/contexts/ui/right-panel-context.tsx"
}

foreach ($pair in $ctxMoves.GetEnumerator()) {
    Move-And-Rewrite $pair.Key $pair.Value
}

# ── 4. Fix barrel exports in api/index.ts ────────────────────────────────────
Write-Host "`n=== Updating api/index.ts barrel ==="

$barrelPath = "src/shared/api/index.ts"
if (Test-Path $barrelPath) {
    $barrelContent = Get-Content $barrelPath -Raw
    # The barrel references old flat paths — update them
    $barrelContent = $barrelContent `
        -replace '\./auth"',        './auth/auth"' `
        -replace '\./companies"',   './company/companies"' `
        -replace '\./kyc"',         './company/kyc"' `
        -replace '\./messaging"',   './messaging/messaging"' `
        -replace '\./notifications"','./notification/notifications"' `
        -replace '\./onboarding"',  './onboarding/onboarding"' `
        -replace '\./projects"',    './project/projects"' `
        -replace '\./proposals"',   './project/proposals"' `
        -replace '\./schedules"',   './project/schedules"' `
        -replace '\./services"',    './service/services"' `
        -replace '\./users"',       './user/users"' `
        -replace '\./wallet"',      './wallet/wallet"'
    Set-Content $barrelPath -Value $barrelContent -NoNewline
}

Write-Host "`n=== Done! Run 'pnpm tsc --noEmit' to verify ==="
