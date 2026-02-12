#!/usr/bin/env bash
# Reset local stack (down + remove volumes + up)
set -e
cd "$(dirname "$0")/../.."
docker compose -f docker-compose.local.yml down -v
docker compose -f docker-compose.local.yml up -d
