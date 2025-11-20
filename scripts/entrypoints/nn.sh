#!/bin/sh

export DIRENV_DISABLE=1
AWS_PROFILE=${AWS_PROFILE:-"darkmatter-dev"}
ROLE_ARN=${ROLE_ARN:-"arn:aws:iam::950224716579:role/darkmatter-dev"}
CHAMBER_SERVICE_PATH=${CHAMBER_SERVICE_PATH:-"dev/nn"}

# Source common functions
. "$(dirname "$0")/common.sh"

# ------------------------------------------------------------
# Local development
# ------------------------------------------------------------
if is_local_development; then

  # use credential server if available
  # setup_aws_credentials_server "$ROLE_ARN"
  # use dynamic redis/postgres ports if available
  setup_dynamic_ports
  # if no credentials detected, use aws-vault
  # setup_aws_vault_prefix $AWS_PROFILE
  # inject environment
  chamber_exec "${CHAMBER_SERVICE_PATH}" "$@"
# ------------------------------------------------------------
# Everywhere Else
# ------------------------------------------------------------
else

    # AWS credentials provided via runtime secrets
    if [ -f /run/secrets/aws ]; then
      . /run/secrets/aws
    fi
    # Use source instead of eval since eval is not defined
    # source <(chamber env "$CHAMBER_SERVICE_PATH" 2>&1)
    chamber exec ${CHAMBER_SERVICE_PATH} -- "$@"
fi
# ------------------------------------------------------------
# Useful examples for targeting specific envs
# - inside docker: [ -f "/.dockerenv" ]
# - exclude CI: [ -z "$CI" ]
# - GitHub Actions: [ -n "$GITHUB_ACTIONS" ]
# - Only if flox activated: [ -n "$FLOX_ENV" ]

