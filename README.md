# KodNestCareers

Local-first monorepo (modular monolith + worker) for KodNestCareers.

## Quick local setup

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

4. **Env:** Copy `.env.example` to `.env` and set `DATABASE_URL`, `REDIS_URL` if needed.

5. **Web app:**
   ```bash
   pnpm --filter @kodnest/web dev
   ```

6. **Worker (optional):**
   ```bash
   pnpm --filter @kodnest/worker dev
   ```

## Structure

- `apps/web` – Next.js app (auth, dashboard, API, features).
- `apps/worker` – Background jobs (ingestion, relevance, readiness, resume, notifications, analytics).
- `packages/db` – Prisma schema and client.
- `packages/modules` – Domain modules (auth-profile, job-tracker, readiness, resume, notifications, analytics).
- `packages/ai-gateway` – AI model routing and providers.
- `packages/events` – Event outbox and publishers.
- `packages/shared` – Types, errors, logger, utils, validators.
- `packages/config` – Env, feature flags, security.
- `infra/` – Docker and scripts for local run.

## Scripts (root)

- `pnpm build` – Build all packages.
- `pnpm dev` – Run dev for all apps.
- `pnpm docker:up` / `pnpm docker:down` – Local Docker stack.
