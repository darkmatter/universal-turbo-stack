#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR=$(realpath "$(dirname "$0")")
DEBUG=${DEBUG:-0}
LOG_PREFIX=${LOG_PREFIX:-""}
# Colors
RED=197
KIWI=156
ORANGE=215
PINK=212
PURPLE=99
# Foreground
PRIMARY=7
BRIGHT=15
# FAINT=238
FAINT=103
DARK=238
# Default values
START_URL="https://dark-matter.awsapps.com/start"
ORG_ACCOUNT_ID="950224716579"
REGION="us-west-2"
AWS_PROFILE="${AWS_PROFILE:-darkmatter-dev}"         # override via env if you like
SESSION="${SESSION:-darkmatter-sso}"               # SSO session name
CHAMBER_SERVICE_NAME="${CHAMBER_SERVICE_NAME:-"dev/apollo"}"
# ==============================================================================

echo "" > /tmp/debug.log

log() {
  if command -v gum >/dev/null 2>&1; then
    gum log --level="info" --time="1/2 15:04:05" --prefix="$LOG_PREFIX" -s "$@"
  else
    echo "$@"
  fi
}

debug() {
  if [ "${DEBUG:-0}" -eq 1 ]; then
    echo "$@" >> /tmp/debug.log
    # if command -v gum >/dev/null 2>&1; then
    #   gum log --level="debug" --time="1/2 15:04:05" --prefix="$LOG_PREFIX" -s "$@"
    # else
    #   echo "DEBUG: $@"
    # fi
  fi
}

# === Config =====
hr() { printf '%*s\n' "$(tput cols 2>/dev/null || echo 80)" '' | tr ' ' -; }

need() {
  command -v "$1" >/dev/null 2>&1 || { echo "❌ missing required tool: $1"; return 1; }
}

label() {
  local text="$1" color="${2:-$PURPLE}"
  if command -v gum >/dev/null 2>&1; then
    gum style --foreground="$color" "$text"
  else
    echo "$text"
  fi
}

install_hint() {
  local tool="$1"
  if [[ "$(uname -s)" == "Darwin" ]]; then
    echo "👉 macOS: brew install $tool"
  else
    echo "👉 Linux: use your package manager to install $tool"
  fi
}

ensure_tools() {
  echo "🔎 Checking prerequisites…"
  local missing=0
  for t in aws  yq gum aws-vault chamber; do
    if ! need "$t"; then
      install_hint "$t"; missing=1
    fi
  done
  if [[ $missing -eq 1 ]]; then
    echo "Please install the missing tools above, then rerun this script."
    exit 1
  fi
}


configure_profile() {
  echo "🛠️ Configuring AWS SSO session for profile: $AWS_PROFILE"
  echo "Select the following options:"
  echo "• $(label 'SSO session name'): $SESSION"
  echo "• $(label 'SSO start URL'): $START_URL"
  echo "• $(label 'SSO region'): $REGION"
  echo "• $(label 'SSO account ID'): $ORG_ACCOUNT_ID"
  echo "• $(label 'SSO role name'): Developer or PowerUser"
  echo "• $(label 'SSO scope'): sso:account:access"
  aws configure sso --profile "$AWS_PROFILE"
  echo "✅ Logged in as $AWS_PROFILE"
}


write_sso_session_block() {
  local cfg="$HOME/.aws/config"
  local session="$1" start_url="$2" sso_region="$3"
  mkdir -p "$(dirname "$cfg")"
  # If block exists, leave it; otherwise append.
  if grep -q "^\[sso-session ${session}\]" "$cfg" 2>/dev/null; then
    echo "• SSO session [sso-session ${session}] already exists in ~/.aws/config"
  else
    {
      echo ""
      echo "[sso-session ${session}]"
      echo "sso_start_url = ${start_url}"
      echo "sso_region = ${sso_region}"
      echo "sso_registration_scopes = sso:account:access"
      echo ""
    } >>"$cfg"
    echo "✓ Wrote SSO session block to ~/.aws/config"
  fi
}


check_profiles() {
  profile_match=$(aws configure get "profile.$AWS_PROFILE.sso_account_id" 2>/dev/null || true)
  debug "check profile" "profile_match" "$profile_match" "ORG_ACCOUNT_ID" "$ORG_ACCOUNT_ID"
  if [[ "$profile_match" == "$ORG_ACCOUNT_ID" ]]; then
    echo "✅ AWS_PROFILE '$AWS_PROFILE' matches account $ORG_ACCOUNT_ID"
    return 0
  fi
  valid_match=""
  for name in $(aws configure list-profiles); do
    debug "checking profile" "name" "$name"
    account_id=$(aws configure get "profile.$name.sso_account_id")
    debug "resolved local profile"  "account_id" "$account_id"
    if [[ "$account_id" == "$ORG_ACCOUNT_ID" ]]; then
      valid_match="$name"
      if [[ "$name" == "$AWS_PROFILE" ]]; then
        echo "✅ Current AWS_PROFILE '$AWS_PROFILE' matches account $ORG_ACCOUNT_ID"
        return 0
      else
        if gum confirm "Found match for account, but with an unexpected profile name '$name'. Create new profile for '$AWS_PROFILE'?"; then
          configure_profile
          return 0
        else
          echo "Please run `aws configure sso --profile $AWS_PROFILE` to configure."
          exit 1
        fi
      fi
    fi
  done
  debug "no valid matches found" "valid_match" "$valid_match"
  gum confirm "AWS_PROFILE '$AWS_PROFILE' does not match account $ORG_ACCOUNT_ID. Create profile ?" || exit 1
  configure_profile
}


check_identity() {
  aws sts get-caller-identity --profile $AWS_PROFILE
}


install_profile() {
  local SSO_SESSION=$SESSION
  local SSO_ROLE_NAME=$AWS_PROFILE
  local ACCOUNT_ID=950224716579
  local REGION=us-west-2
  local SSO_START_URL=https://dark-matter.awsapps.com/start
  # Configure the SSO session``
  write_sso_session_block "$SSO_SESSION" "$SSO_START_URL" "$REGION"
  echo "✅ Configured SSO session $SSO_SESSION"
  # Configure the profile
  aws configure set profile.$AWS_PROFILE.role_name $SSO_ROLE_NAME
  aws configure set profile.$AWS_PROFILE.sso_session $SSO_SESSION
  aws configure set profile.$AWS_PROFILE.sso_account_id $ACCOUNT_ID
  aws configure set profile.$AWS_PROFILE.region $REGION
  aws configure set profile.$AWS_PROFILE.output json
  echo "✅ Configured aws sso profile $AWS_PROFILE"
}

login() {
  # Login to the SSO session
  aws-vault remove $AWS_PROFILE -f
  aws sso login --profile $AWS_PROFILE --sso-session $SSO_SESSION
  echo "✅ Authenticated to $AWS_PROFILE"
  source <(aws configure export-credentials --profile $AWS_PROFILE)
  aws-vault login
  echo "✅ Authenticated to $AWS_PROFILE"
}

check_decryption() {
  chamber read "$CHAMBER_SERVICE_NAME" node-env
}

# ----- Main --------------------------------------------------------------------
hr
ensure_tools
log "Using AWS_PROFILE=$AWS_PROFILE"
hr
check_profiles || install_profile
hr
check_identity || login
hr
check_decryption || login
hr
echo "✅ All good."