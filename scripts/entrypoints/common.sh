#!/bin/sh

# scripts/entrypoints/common.sh
# Common functions for entrypoint scripts

# Common environment setup
export DIRENV_DISABLE=1
DEBUG=1

debug() {
    if [ "${DEBUG:-0}" -eq 1 ]; then
        echo "[DEBUG] $@"
    fi
}

# Check if running in local development (not CI, docker command available)
is_local_development() {
    [ -z "$CI" ] && command -v docker >/dev/null
}

print_trouble_shooting_info() {
    local aws_profile="${1:-darkmatter-dev}"
    echo ""
    echo "----------------------------------------"
    echo "⚠️ aws authentication failed - try the following:"
    echo "----------------------------------------"
    echo "1. Check if the credential server is running"
    echo "2. Check 'aws sts get-caller-identity --profile ${aws_profile}' to see if the credentials are available"
    echo "3. If 2 fails, try 'aws sso login --profile ${aws_profile}'"
    echo "4. Try re-adding to vault with 'aws-vault remove ${aws_profile} && aws-vault login ${aws_profile}'"
    echo "5. Environment variables can override your credentials, check them with 'printenv | grep AWS'"
    echo "6. ~/.aws/config also overrides - try renaming it temporarily to ~/.aws/config.bak"
    echo ""
    echo ""
}

# Setup AWS credential server (for local development with docker)
# Sets AWS_CONTAINER_CREDENTIALS_FULL_URI and AWS_CONTAINER_AUTHORIZATION_TOKEN
setup_aws_credentials_server() {
    local role_arn="${1:-}"

    cred_server_host=$(docker compose port aws-vault-proxy 80 2>/dev/null)
    if [ -n "$cred_server_host" ]; then
        cred_token=$(\
            docker compose exec aws-vault-proxy env \
            | grep AWS_CONTAINER_AUTHORIZATION_TOKEN \
            | cut -d '=' -f 2 \
            | tr -d '\r\n' \
        )
        full_uri="http://${cred_server_host}/role-arn/${role_arn}"
        export AWS_CONTAINER_CREDENTIALS_FULL_URI="${full_uri}"
        export AWS_CONTAINER_AUTHORIZATION_TOKEN="${cred_token}"
        [ -n "$DEBUG" ] && \
            aws sts get-caller-identity --debug && \
            debug "🛜 Successfully authenticated with credential server" || \
            debug "⚠️ Failed to authenticate with credential server"
    fi
}



setup_dynamic_ports() {
  if is_local_development; then
    POSTGRES_HOST=$(docker compose port postgres 5432)
    REDIS_HOST=$(docker compose port redis 6379)
    export POSTGRES_URL="postgresql://pguser:password@${POSTGRES_HOST}/app"
    export REDIS_URL="redis://${REDIS_HOST}"
  fi
}

# Determine if we need to use aws-vault
# Sets AWS_VAULT_PREFIX variable
setup_aws_vault_prefix() {
    local aws_profile="$1"

    if [ -z "$AWS_CONTAINER_CREDENTIALS_FULL_URI" ]; then
        AWS_VAULT_PREFIX="aws-vault exec --ecs-server ${aws_profile} --debug -- "
    else
        AWS_VAULT_PREFIX=""
    fi
}

# Load AWS credentials from runtime secrets if available
load_runtime_aws_secrets() {
    if [ -f /run/secrets/aws ]; then
        . /run/secrets/aws
    fi
}

# Execute command with chamber in local development environment
chamber_exec() {
    local chamber_service_path="$1"
    shift

    # Credentials provided via long-lived ECS credential server
    ${AWS_VAULT_PREFIX} \
        chamber exec --verbose ${chamber_service_path} -- \
        env POSTGRES_URL="${POSTGRES_URL}" \
            REDIS_URL="${REDIS_URL}" \
            "$@"
}

# Execute command with chamber (production/CI environments)
exec_chamber_remote() {
    local chamber_service_path="$1"
    shift

    load_runtime_aws_secrets
    chamber exec --verbose ${chamber_service_path} -- "$@"
}


# Docker-compatible Tailscale - Only runs if `TS_AUTH_KEY` is set and user is root.
# Put this near the top of your entrypoint script, then drop priveleges if
# needed, as follows:
# ```
# if [ "$(id -u)" -eq 0 ]; then
#   start_tailscale
#   # Re-exec this script as appuser
#   exec su-exec "${APP_UID}:${APP_GID}" "$@"
#   exit 0
# fi
# ```
#
# Example Dockerfile:
# ```
#  # assumes alpine base image
#  RUN apk update && apk add ca-certificates iptables ip6tables
#  COPY --from=docker.io/tailscale/tailscale:stable /usr/local/bin/tailscaled /usr/local/bin/tailscaled
#  COPY --from=docker.io/tailscale/tailscale:stable /usr/local/bin/tailscale /usr/local/bin/tailscale
#  RUN mkdir -p /var/run/tailscale /var/cache/tailscale /var/lib/tailscale
# ```
start_tailscale() {
    # If running as root, start privileged services (e.g., tailscale) then drop to appuser
    if [ "$(id -u)" -eq 0 ] && [ -n "${TS_AUTH_KEY:-}" ]; then
        echo "🔐 Setting up Tailscale (root)..."
        /usr/local/bin/tailscaled --state=/var/lib/tailscale/tailscaled.state --socket=/var/run/tailscale/tailscaled.sock &
        /usr/local/bin/tailscale up --auth-key="${TS_AUTH_KEY}" --hostname="fly-${FLY_APP_NAME:-app}"
    fi
}