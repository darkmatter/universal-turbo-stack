#!/usr/bin/env sh

# The turbo token is used often so we cache it for performance.

SERVICE_PATH="dev/apollo-workspace"
ENV_FILE="/tmp/.apollo-workspace.env"
MD5="4842f3b16ab1de6ec9a35a7893739928"

create_env_file() {
  if [ -f "/.dockerenv" ] && [ -f /run/secrets/aws ]; then
    # shellcheck disable=SC1091  # Runtime-mounted secret file; not available during lint
    . /run/secrets/aws
  fi
  # validate ability to auth aws
  if ! aws sts get-caller-identity > /dev/null 2>&1; then
    echo "⚠️ Unable to authenticate with AWS: Skipping env file creation"
    echo "Prepend 'aws-vault exec darkmatter-dev' -- to your commands to authenticate"
  else
    nix run nixpkgs#chamber -- export $SERVICE_PATH --format dotenv > "$ENV_FILE"
  fi
}



# Invalidates the cache if the env is updated
if [ -f "$ENV_FILE" ]; then
  contents="$(cat "$ENV_FILE")"
  hash=$(echo "$contents" | md5sum | awk '{print $1}')
  if [ "$hash" != "$MD5" ]; then
    echo "🌳 Cached env at $ENV_FILE is outdated - invalidating"
    rm "$ENV_FILE"
  fi
fi

# ------------------------------------------------------------
# OUTSIDE docker
# ------------------------------------------------------------
if [ ! -f "$ENV_FILE" ]; then
  create_env_file
else
  # shellcheck disable=SC1090,SC1091  # Generated at runtime; not available during lint
	export "$(cat "$ENV_FILE" | xargs)"
  echo "🔑 Using env file: $ENV_FILE"
fi
# dynamically allocated ports with docker compose
POSTGRES_HOST=$(docker compose port postgres 5432)
REDIS_HOST=$(docker compose port redis 6379)
export POSTGRES_URL="postgresql://pguser:password@${POSTGRES_HOST}/app"
export REDIS_URL="redis://${REDIS_HOST}"
export TURBO_UI=true
if [ -n "$1" ]; then
	exec "$@"
fi
