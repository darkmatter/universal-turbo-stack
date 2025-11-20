#!/usr/bin/env bash
set -euo pipefail

# Anything in here will be sourced by all wrappers and should therefore only
# include things that will apply to all apps

# Set AWS Profile so authentication always works
export AWS_PROFILE="${AWS_PROFILE:-darkmatter-dev}"
# Make it easy to find the project root
export ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"

# Remove this path from PATH to avoid infinite recursion
strip_wrapper_from_path() {
	local p=":${PATH}:"
	p="${p//:${SCRIPT_DIR}:/:}"
	p="${p#:}"
	p="${p%:}"
	printf '%s\n' "$p"
}
export PATH="$(strip_wrapper_from_path)"

# Helper to run commands inside nix shell if available
nix_run() {
  local cmd="$1"
  shift
  if command -v devenv >/dev/null 2>&1; then
    exec devenv shell --"$cmd" "$@"
  elif command -v nix >/dev/null 2>&1; then
    exec nix develop "$ROOT" --command "$cmd" "$@"
  else
    exec "$cmd" "$@"
  fi
}
