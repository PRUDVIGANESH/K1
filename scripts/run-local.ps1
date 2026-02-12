# Run KodNestCareers locally (Node 20+ and Docker required)
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

# Node 20+ and pnpm required. Install: https://nodejs.org then: npm install -g pnpm
if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: pnpm not found. Install Node.js then run: npm install -g pnpm"
    exit 1
}

Write-Host "Installing dependencies..."
pnpm install

if (Get-Command docker -ErrorAction SilentlyContinue) {
    Write-Host "Starting Docker (Postgres, Redis, Mailpit)..."
    docker compose -f docker-compose.local.yml up -d
    Start-Sleep -Seconds 3
} else {
    Write-Host "Docker not found. Start Postgres and Redis manually or skip for DB-less run."
}

if (-not (Test-Path .env)) {
    Copy-Item .env.example .env
    Write-Host "Created .env from .env.example. Set NEXTAUTH_SECRET if needed."
}

Write-Host "Generating Prisma client..."
pnpm db:generate

Write-Host "Running migrations..."
pnpm db:migrate

Write-Host "Starting web app at http://localhost:3000"
pnpm --filter @kodnest/web dev
