@echo off
cd /d "%~dp0\.."
where pnpm >nul 2>&1 || (echo Enabling pnpm... && corepack enable && corepack prepare pnpm@9 --activate)
echo Installing dependencies...
call pnpm install
where docker >nul 2>&1 && (echo Starting Docker... && docker compose -f docker-compose.local.yml up -d && timeout /t 3 /nobreak >nul)
if not exist .env copy .env.example .env
echo Generating Prisma client...
call pnpm db:generate
echo Running migrations...
call pnpm db:migrate
echo Starting web app at http://localhost:3000
call pnpm --filter @kodnest/web dev
