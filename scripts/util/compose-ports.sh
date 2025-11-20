#!/usr/bin/env bash

# When running multiple docker-compose projects, the postgres/redis ports will
# conflict. By not specifying a static port, docker-compose will allocate a
# dynamic port which we can then read and export for local development.
# This script helps with that by getting the right port and setting the correct
# POSTGRES_URL and REDIS_URL environment variables.

# inside docker do nothing
if [ -f "/.dockerenv" ]; then
  exit 0
fi

# If docker-compose is not installed, do nothing
if ! command -v docker-compose >/dev/null; then
  exit 0
fi

postgres_host=$(docker compose port postgres 5432)
redis_host=$(docker compose port redis 6379)

export POSTGRES_URL=$(echo $POSTGRES_URL | sed "s/postgres:5432/${postgres_host}/")
export REDIS_URL=$(echo $REDIS_URL | sed "s/redis:6379/${redis_host}/")