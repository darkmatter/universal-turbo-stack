FROM nixos/nix:2.21.4 AS base

ENV NIX_CONFIG="experimental-features = nix-command flakes"

WORKDIR /workspace

COPY . .

RUN ./install.sh

RUN nix develop . --accept-flake-config --command pnpm build


