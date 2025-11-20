#!/usr/bin/env sh
set -e

# scripts/entrypoints/apollo.sh
# Entrypoint for apollo service

echo "Starting apollo service"

export DIRENV_DISABLE=1
AWS_PROFILE=${AWS_PROFILE:-darkmatter-dev}
ROLE_ARN=${ROLE_ARN:-"arn:aws:iam::950224716579:role/darkmatter-dev"}
CHAMBER_SERVICE_PATH=${CHAMBER_SERVICE_PATH:-"dev/apollo"}

# Source common functions
. "$(dirname "$0")/common.sh"

# ------------------------------------------------------------
# Local development
# ------------------------------------------------------------
if is_local_development; then
    # setup_aws_credentials_server "${ROLE_ARN}"
    # setup_aws_vault_prefix "$AWS_PROFILE"
    chamber_exec "$CHAMBER_SERVICE_PATH" "$@"

# ------------------------------------------------------------
# Everywhere Else
# ------------------------------------------------------------
else

    exec_chamber_remote "$CHAMBER_SERVICE_PATH" "$@"
fi

# ------------------------------------------------------------
# Useful examples for targeting specific envs
# - inside docker: [ -f "/.dockerenv" ]
# - exclude CI: [ -z "$CI" ]
# - GitHub Actions: [ -n "$GITHUB_ACTIONS" ]
# - Only if flox activated: [ -n "$FLOX_ENV" ]
