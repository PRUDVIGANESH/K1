# Run the complete project

One command from the project root (with Node 20+ and Docker installed):

```powershell
.\scripts\run-complete.ps1
```

If you see a script execution error:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
.\scripts\run-complete.ps1
```

## What the script does

1. **Finds pnpm** – Uses `pnpm` if in PATH, otherwise `npx pnpm` (no need to install pnpm globally).
2. **Installs dependencies** – `pnpm install` (also runs Prisma generate via postinstall).
3. **Starts Docker** – Postgres, Redis, Mailpit (if Docker is in PATH).
4. **Creates .env** – Copies from `.env.example` if missing.
5. **Prisma** – Generates client, then runs migrations (`migrate deploy`). If the DB isn’t up yet, you’ll see a warning; start Docker and run `pnpm db:deploy` later.
6. **Worker** – Starts in the background (exits cleanly if Redis isn’t available).
7. **Web** – Starts at **http://localhost:3000**.

Stop the web app with **Ctrl+C**. The worker keeps running in the background until you close the terminal.

## Prerequisites

- **Node.js 20+** – https://nodejs.org (LTS)
- **Docker Desktop** – For Postgres, Redis, Mailpit (https://www.docker.com/products/docker-desktop/)

You do **not** need to install pnpm globally; the script uses `npx pnpm` if needed.

## If something fails

| Issue | What to do |
|-------|------------|
| "Node.js not found" | Install Node 20+ from nodejs.org and restart the terminal. |
| "Migrations failed" | Start Docker (or your Postgres), wait a few seconds, then run `pnpm db:deploy`. |
| "Redis not available" (worker) | Start Docker so Redis runs, or ignore if you only need the web app. |
| Port 3000 in use | Stop the other app on 3000 or change the port in the web app. |

## Manual run (without script)

```powershell
cd C:\Users\prudv\Desktop\K1
pnpm install
docker compose -f docker-compose.local.yml up -d
copy .env.example .env
pnpm db:generate
pnpm db:deploy
pnpm dev:web
```

In a second terminal for the worker:

```powershell
cd C:\Users\prudv\Desktop\K1
pnpm dev:worker
```
