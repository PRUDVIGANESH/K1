#!/usr/bin/env bash
# Tear down local stack
set -e
cd "$(dirname "$0")/../.."
docker compose -f docker-compose.local.yml down
