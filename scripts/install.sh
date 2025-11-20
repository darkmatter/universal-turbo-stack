#!/usr/bin/env bash
set -euo pipefail

# install.sh: Setup nix development environment and install dependencies
# Idempotent setup - Most of the setup is done by nix flakes, so this just
# ensures nix and direnv are installed


log() {
    echo "[installer] $*" >&2
}

shell="$0"
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


if ! command -v gum >/dev/null 2>&1; then
  log "Installing gum (https://github.com/charmbracelet/gum)"
  if [ "$(uname -s)" = "Darwin" ]; then
    brew install gum -y
  elif command -v apt >/dev/null 2>&1; then
    apt install gum -y
  else
    log "Please install gum manually: https://github.com/charmbracelet/gum"
    exit 1
  fi
fi

if ! command -v direnv >/dev/null 2>&1; then
  log "Installing direnv (https://direnv.net)"
  if [ "$(uname -s)" = "Darwin" ]; then
    brew install -y dotenv
  elif command -v apt >/dev/null 2>&1; then
    apt install direnv -y
  else
    log "Please install direnv manually: https://direnv.net"
    exit 1
  fi
fi

if ! command -v nix >/dev/null 2>&1; then
  log "Installing nix (https://nixos.org)"
  log "Using Determinate Systems installer for better experience..."
  if curl --proto '=https' --tlsv1.2 -sSf -L https://install.determinate.systems/nix | sh -s -- install; then
    log "nix installed successfully"
  else
    log "Determinate installer failed, trying official installer..."
    sh <(curl -L https://nixos.org/nix/install)
  fi

  # Source nix for current session
  if [ -e '/nix/var/nix/profiles/default/etc/profile.d/nix-daemon.sh' ]; then
		# shellcheck source=/nix/var/nix/profiles/default/etc/profile.d/nix-daemon.sh disable=SC1091
    . '/nix/var/nix/profiles/default/etc/profile.d/nix-daemon.sh'
  fi
else
  log "nix: OK"
fi

if ! command -v devenv >/dev/null 2>&1; then
  log "Installing devenv (https://devenv.sh)"
  nix profile add nixpkgs#devenv
  log "devenv installed successfully"
else
  log "devenv: OK"
fi

# Check if direnv hook is in the shell profile
if ! grep -q 'direnv hook' "$HOME/.bashrc" && ! grep -q 'direnv hook' "$HOME/.zshrc"; then
  log "Adding direnv hook to shell profile"
  if [ -n "$ZSH_VERSION" ]; then
    # shellcheck disable=SC2016
    echo 'eval "$(direnv hook zsh)"' >> "$HOME/.zshrc"
    log "Added to $HOME/.zshrc"
  elif [ -n "$BASH_VERSION" ]; then
    # shellcheck disable=SC2016
    echo 'eval "$(direnv hook bash)"' >> "$HOME/.bashrc"
    log "Added to $HOME/.bashrc"
  else
    log "Please add the direnv hook to your shell profile manually."
    # shellcheck disable=SC2016
    log 'For bash, add: eval "$(direnv hook bash)" to ~/.bashrc'
    # shellcheck disable=SC2016
    log 'For zsh, add: eval "$(direnv hook zsh)" to ~/.zshrc'
  fi
else
  log "direnv hook: OK"
fi


DIRENV_STATUS=$(direnv status --json | jq '.state.loadedRC.allowed' 2>/dev/null)
if [ "$DIRENV_STATUS" == "0" ]; then
  log "direnv: OK"
  direnv allow .
else
  log "Enabling direnv for this project"
fi

# Activate env - do this last
if [ -z "$DEVENV_ROOT" ] && command -v devenv >/dev/null 2>&1; then
  log "Activating devenv development environment..."
  log "Run 'devenv shell' to enter the development shell"
  log "Or 'direnv allow' for automatic activation"
  devenv shell
fi
