#!/usr/bin/env bash
set -euo pipefail

# install.sh: Activate Nix flake dev environment and install dependencies
# Idempotent setup - most of the heavy lifting is handled by nix develop



# Detect CI context
CI_MODE=${CI:-}

log() {
    echo "[installer] $*" >&2
}

shell="$(echo $0)"
kernel=$(uname -s | tr "[:upper:]" "[:lower:]")
case "${kernel}" in
mingw*)
    kernel=windows
    ;;
esac
case "$(uname -m)" in
x86_64)
    machine=amd64
    ;;
i686 | i386)
    machine=386
    ;;
armv7l)
    machine=arm
    ;;
aarch64 | arm64)
    machine=arm64
    ;;
*)
    die "Machine $(uname -m) not supported by the installer.\n" \
    "Go to https://direnv for alternate installation methods."
    ;;
esac
log "kernel=$kernel machine=$machine shell=$shell"


# List files in ./include
SCRIPT_DIR=$(realpath "$(dirname "$0")")

if ! command -v nix >/dev/null 2>&1; then
  echo "Nix is required. Please install Nix with flakes enabled: https://nixos.org/download.html"
  exit 1
fi

log "nix: $(nix --version)"

echo "Activating nix flake environment..."
NIX_FLAGS=(--accept-flake-config)

if [ -n "${CI_MODE}" ]; then
  NIX_FLAGS+=(--impure)
fi

nix develop . "${NIX_FLAGS[@]}" --command true

if ! command -v pnpm >/dev/null 2>&1; then
  echo "pnpm not available after nix develop. Falling back to corepack bootstrap."
  corepack enable
  corepack prepare pnpm --activate
  pnpm install
fi

echo "✅ Dependencies installed via nix flake dev shell"

echo "✅ install.sh completed"

# TODO: offer to install direnv hooks automatically
# # Check if direnv hook is in the shell profile
# if ! grep -q 'direnv hook' "$HOME/.bashrc" && ! grep -q 'direnv hook' "$HOME/.zshrc"; then
#   log "Adding direnv hook to shell profile"
#   if [ -n "$ZSH_VERSION" ]; then
#     echo 'eval "$(direnv hook zsh)"' >> "$HOME/.zshrc"
#     log "Added to $HOME/.zshrc"
#   elif [ -n "$BASH_VERSION" ]; then
#     echo 'eval "$(direnv hook bash)"' >> "$HOME/.bashrc"
#     log "Added to $HOME/.bashrc"
#   else
#     log "Please add the direnv hook to your shell profile manually."
#     log 'For bash, add: eval "$(direnv hook bash)" to ~/.bashrc'
#     log 'For zsh, add: eval "$(direnv hook zsh)" to ~/.zshrc'
#   fi
# else
#   log "direnv hook: OK"
# fi


# DIRENV_STATUS=$(direnv status --json | jq '.state.loadedRC.allowed' 2>/dev/null)
# if [ "$DIRENV_STATUS" == "0" ]; then
#   log "direnv: OK"
#   direnv allow .
# else
#   log "Enabling direnv for this project"
# fi

