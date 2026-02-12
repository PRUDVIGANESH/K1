#!/usr/bin/env bash
# Bring up local stack (Postgres, Redis, Mailpit)
set -e
cd "$(dirname "$0")/../.."
docker compose -f docker-compose.local.yml up -d
