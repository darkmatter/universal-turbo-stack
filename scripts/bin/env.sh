#!/usr/bin/env bash

echo "Running pre-build hooks..."


# usage: upfind_dir <filename> [start_dir]
upfind_dir() {
  local target="$1"
  local dir="${2:-$PWD}"

  if [[ -z "$target" ]]; then
    echo "usage: upfind_dir <filename> [start_dir]" >&2
    return 2
  fi

  dir="${dir%/}"

  while true; do
    if [[ -e "$dir/$target" ]]; then
      printf '%s\n' "$dir"
      return 0
    fi

    if [[ "$dir" == "/" || -z "$dir" ]]; then
      return 1
    fi

    dir="$(dirname "$dir")"
  done
}

root_dir=$(upfind_dir "pnpm-workspace.yaml" || echo "$PWD")

target_app="$1"

if [ -z "$target_app" ]; then
  echo "Usage: env <app>"
  exit 1
fi


shift

secrets_file="$root_dir/secrets/dev/$target_app.yaml"

if [ ! -f "$secrets_file" ]; then
  echo "Secrets file not found at $secrets_file"
  exit 1
fi

_sops_exec() {
  local FILE=$1 COMMAND=$2 ARGS
  shift 2

  ARGS=$(printf " %q" "$@")  # %q quotes the arguments properly
  sops exec-env "${FILE}" "'${COMMAND}${ARGS}'"
}


_sops_exec "$secrets_file" "$@"


