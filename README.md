# KodNestCareers

Local-first monorepo (modular monolith + worker) for KodNestCareers. Track jobs, manage resumes, run readiness assessments, and view analytics.

## Run the complete project (one command)

From the project root (with Node 20+, pnpm, and Docker installed):

```powershell
.\scripts\run-complete.ps1
```

Then open **http://localhost:3000**. See [RUN.md](./RUN.md) for details and troubleshooting.

## Quick local setup (manual)

1. **Prerequisites:** Node 20+, pnpm 9+, Docker (for Postgres, Redis, Mailpit).

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start local stack:**
   ```bash
   pnpm docker:up
   ```
   Or: `docker compose -f docker-compose.local.yml up -d`

4. **Env:** Copy `.env.example` to `.env`. Set `NEXTAUTH_SECRET` (e.g. `openssl rand -base64 32`).

5. **Database:** Generate Prisma client and run migrations:
   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```

6. **Web app:**
   ```bash
   pnpm --filter @kodnest/web dev
   ```
   Open http://localhost:3000. Sign up, then use the dashboard.

7. **Worker (optional, for queue jobs):**
   ```bash
   pnpm --filter @kodnest/worker dev
   ```

## Features

- **Auth** – Register, login, session (NextAuth + credentials).
- **Job tracker** – Add jobs, save, track status (saved / applied / interviewing / offered / rejected).
- **Resumes** – Create and edit resumes (title, contact, summary, skills).
- **Readiness** – Run a readiness assessment and view score + breakdown.
- **Notifications** – List and mark as read; create via API or worker.
- **Analytics** – Dashboard counts (saved jobs, applications, resumes, readiness, unread notifications).
- **Worker** – BullMQ notification queue; process jobs to create in-app notifications.

## Structure

- `apps/web` – Next.js app (auth, dashboard, API, features).
- `apps/worker` – Background jobs (notifications queue; extensible for ingestion, email, etc.).
- `packages/db` – Prisma schema and client.
- `packages/modules` – Domain modules (auth-profile, job-tracker, readiness, resume, notifications, analytics).
- `packages/ai-gateway` – AI model routing (stub; wire OpenRouter/Groq/Huggingface as needed).
- `packages/events` – Event outbox and publishers (stubs).
- `packages/shared` – Types, errors, logger, utils, validators.
- `packages/config` – Env, feature flags, security.
- `infra/` – Docker and scripts for local run.

## Scripts (root)

- `pnpm build` – Build all packages.
- `pnpm dev` – Run dev for all apps.
- `pnpm docker:up` / `pnpm docker:down` – Local Docker stack.
- `pnpm db:generate` – Generate Prisma client.
- `pnpm db:migrate` – Run migrations.