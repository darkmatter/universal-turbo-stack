#!/usr/bin/env sh

# scripts/entrypoints/nextjs.sh
# Entrypoint for nextjs service

echo "Starting nextjs"

# Source common functions
. "$(dirname "$0")/common.sh"

export DIRENV_DISABLE=1
SERVICE=${SERVICE:-"dev/apollo-web"}
AWS_PROFILE=${AWS_PROFILE:-"darkmatter-dev"}
ROLE_ARN=${ROLE_ARN:-"arn:aws:iam::950224716579:role/darkmatter-dev"}

# ------------------------------------------------------------
# Local development
# ------------------------------------------------------------
if is_local_development; then

    # use credential server if available
    # setup_aws_credentials_server "${ROLE_ARN}"
    # use dynamic redis/postgres ports if available
    setup_dynamic_ports
    # if no credentials detected, use aws-vault
    # setup_aws_vault_prefix "$AWS_PROFILE"
    # inject environment
    chamber_exec "$SERVICE" "$@"

# ------------------------------------------------------------
# Everywhere Else
# ------------------------------------------------------------
else
    exec_chamber_remote "$SERVICE" "$@"
fi

# ------------------------------------------------------------
# Useful examples for targeting specific envs
# - inside docker: [ -f "/.dockerenv" ]
# - exclude CI: [ -z "$CI" ]
# - GitHub Actions: [ -n "$GITHUB_ACTIONS" ]
# - Only if flox activated: [ -n "$FLOX_ENV" ]
