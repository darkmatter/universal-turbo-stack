#!/usr/bin/env bash

export DIRENV_DISABLE=1
AWS_PROFILE=${AWS_PROFILE:-"darkmatter-dev"}
ROLE_ARN=${ROLE_ARN:-"arn:aws:iam::950224716579:role/darkmatter-dev"}
CHAMBER_SERVICE_PATH=${CHAMBER_SERVICE_PATH:-"dev/expo"}

# Source common functions
. "$(dirname "$0")/common.sh"

# ------------------------------------------------------------
# Local development
# ------------------------------------------------------------
# use dynamic redis/postgres ports if available
setup_dynamic_ports
# inject environment
source <(chamber env "${CHAMBER_SERVICE_PATH}")
exec "$@"