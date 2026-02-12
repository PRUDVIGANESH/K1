# Run complete KodNestCareers project (web + worker)
# Requires: Node 20+ (https://nodejs.org). pnpm optional (script will use npx pnpm or npm).
$ErrorActionPreference = "Stop"
$ProjectRoot = Resolve-Path "$PSScriptRoot\.."
Set-Location $ProjectRoot

Write-Host "=== KodNestCareers - Full project run ===" -ForegroundColor Cyan

# Resolve pnpm: prefer global pnpm, then npx pnpm (project requires pnpm workspaces)
$Runner = $null
if (Get-Command pnpm -ErrorAction SilentlyContinue) {
    $Runner = "pnpm"
} elseif (Get-Command node -ErrorAction SilentlyContinue) {
    Write-Host "pnpm not in PATH. Using npx pnpm..." -ForegroundColor Yellow
    $Runner = "npx pnpm"
}

if (-not $Runner) {
    Write-Host "ERROR: Node.js not found. Install from https://nodejs.org (LTS), then run: npm install -g pnpm" -ForegroundColor Red
    exit 1
}

Write-Host "Using: $Runner" -ForegroundColor Gray

# 1. Install
Write-Host "`n[1/6] Installing dependencies..." -ForegroundColor Yellow
& $Runner install
if ($LASTEXITCODE -ne 0) { exit 1 }

# 2. Docker
if (Get-Command docker -ErrorAction SilentlyContinue) {
    Write-Host "`n[2/6] Starting Docker (Postgres, Redis, Mailpit)..." -ForegroundColor Yellow
    docker compose -f docker-compose.local.yml up -d
    Start-Sleep -Seconds 5
} else {
    Write-Host "`n[2/6] Docker not in PATH. Start Postgres + Redis, or install Docker Desktop." -ForegroundColor Yellow
}

# 3. Env
if (-not (Test-Path .env)) {
    Copy-Item .env.example .env
    Write-Host "`n[3/6] Created .env from .env.example" -ForegroundColor Green
} else {
    Write-Host "`n[3/6] .env exists" -ForegroundColor Green
}
# Prisma reads .env from packages/db when running migrate
if (-not (Test-Path "packages\db\.env")) {
    Copy-Item .env "packages\db\.env"
}

# 4. Prisma generate + migrate + build packages (migrate may fail if DB not up yet)
Write-Host "`n[4/6] Prisma generate..." -ForegroundColor Yellow
& $Runner db:generate
if ($LASTEXITCODE -ne 0) { Write-Host "Run again after fixing Node/pnpm." -ForegroundColor Red; exit 1 }
Write-Host "Running migrations..." -ForegroundColor Gray
& $Runner db:deploy 2>&1
if ($LASTEXITCODE -ne 0) { Write-Host "Migrations failed (is Docker/Postgres running?). Run 'pnpm db:deploy' or 'pnpm db:migrate' later." -ForegroundColor Yellow }
Write-Host "Building packages (db, shared)..." -ForegroundColor Gray
& $Runner --filter @kodnest/db build 2>&1
& $Runner --filter @kodnest/shared build 2>&1

# 5. Worker (background)
Write-Host "`n[5/6] Starting worker in background..." -ForegroundColor Yellow
$workerJob = Start-Job -ScriptBlock {
    Set-Location $using:ProjectRoot
    & $using:Runner --filter @kodnest/worker dev 2>&1
}

# 6. Web (foreground)
Write-Host "`n[6/6] Starting web at http://localhost:3000" -ForegroundColor Green
& $Runner --filter @kodnest/web dev
