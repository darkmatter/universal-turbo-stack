{
  pkgs,
  config,
  lib,
  ...
}:
{
  # -------------------------------------
  # Global Helper Scripts
  # -----------------------------------
  # https://devenv.sh/scripts/
  scripts = {
    # helper to create a menu
    menu =
      let
        scriptDescriptions = lib.generators.toKeyValue { } (
          lib.mapAttrs (_: value: value.description or "") config.scripts
        );
      in
      {
        description = "Render a list of available commands";
        exec = ''
                  ROOT="${config.git.root}"
                  KIWI=156; ORANGE=215; PINK=212; PURPLE=99; PRIMARY=7; BRIGHT=15; FAINT=103; DARK=238;
                  label() {
                    gum style --width 20 --foreground $PINK "$1"
                  }
                  subtitle() {
                    gum style --foreground $PURPLE "$1"
                  }
                  description() {
                    gum style --foreground $FAINT "$1"
                  }
                  gather_task_names() {
                    local files=()
                    if [ -f "$ROOT/devenv.nix" ]; then
                      files+=("$ROOT/devenv.nix")
                    fi
                    if [ -d "$ROOT/apps" ]; then
                      while IFS= read -r file; do
                        files+=("$file")
                      done < <(find "$ROOT/apps" -name 'devenv.nix' -print 2>/dev/null)
                    fi
                    if [[ ''${#files[@]} -eq 0 ]]; then
                      return
                    fi
                    if command -v rg >/dev/null 2>&1; then
                      rg --no-heading --no-filename --only-matching 'tasks\."([^"]+)"' -r '$1' "''${files[@]}" 2>/dev/null | sort -u
                    else
                      grep -hRo 'tasks\."[^"]\+"' "''${files[@]}" 2>/dev/null | sed 's/tasks\."//;s/"//g' | sort -u
                    fi
                  }
                  gather_service_names() {
                    if [ ! -f "$ROOT/devenv.nix" ]; then
                      return
                    fi
                    if command -v python3 >/dev/null 2>&1; then
                      python3 - "$ROOT/devenv.nix" <<'PY'
          import sys, pathlib, re
          path = pathlib.Path(sys.argv[1])
          text = path.read_text()
          match = re.search(r"services\s*=\s*{", text)
          if not match:
              sys.exit(0)
          i = match.end()
          depth = 1
          names = []
          while i < len(text):
              ch = text[i]
              if ch == "{":
                  depth += 1
                  i += 1
                  continue
              if ch == "}":
                  depth -= 1
                  i += 1
                  if depth == 0:
                      break
                  continue
              if depth == 1:
                  entry = re.match(r'\s*([A-Za-z0-9_-]+)\s*=\s*{', text[i:])
                  if entry:
                      names.append(entry.group(1))
                      i += entry.end()
                      depth += 1
                      continue
              i += 1
          for name in names:
              print(name)
          PY
                    else
                      awk '
                        /services[[:space:]]*=/ && /{/ {
                          in_block = 1
                          depth = gsub(/{/, "{") - gsub(/}/, "}")
                          next
                        }
                        in_block {
                          if (match($0, /^[[:space:]]*([A-Za-z0-9_-]+)[[:space:]]*=[[:space:]]*{/, m)) {
                            print m[1]
                          }
                          depth += gsub(/{/, "{")
                          depth -= gsub(/}/, "}")
                          if (depth <= 0) {
                            exit
                          }
                        }
                      ' "$ROOT/devenv.nix" | sort -u
                    fi
                  }
                  echo
                  subtitle "Available commands:"
                  echo

                  # Process each script entry with formatting functions
                  while IFS="=" read -r cmd desc; do
                    if [[ -n "$cmd" && -n "$desc" ]]; then
                      echo "$(label "$cmd") $(description "$desc")"
                    fi
                  done <<'EOF_COMMANDS'
          ${scriptDescriptions}
          EOF_COMMANDS
                  echo

                  task_lines=$(gather_task_names)
                  if [[ -n "$task_lines" ]]; then
                    subtitle "Available tasks (run with: devenv tasks run <name>)"
                    echo
                    while IFS= read -r task; do
                      if [[ -n "$task" ]]; then
                        echo "$(label "$task")"
                      fi
                    done <<< "$task_lines"
                    echo
                  fi

                  service_lines=$(gather_service_names)
                  if [[ -n "$service_lines" ]]; then
                    subtitle "Services"
                    echo
                    while IFS= read -r service; do
                      if [[ -n "$service" ]]; then
                        status_label=$(gum style --foreground $KIWI "available")
                        echo "$(label "$service") $status_label"
                      fi
                    done <<< "$service_lines"
                    echo
                  fi
        '';
      };

    get-turbo-token = {
      description = "Get the turbo token from the environment";
      exec = ''
        ${config.git.root}/scripts/env.workspace.sh echo $TURBO_TOKEN
      '';
    };

    get-ports = {
      description = "Get the ports from the docker compose services";
      exec = ''
        # inside docker do nothing
        if [ -f "/.dockerenv" ]; then
          exit 0
        fi

        # If docker-compose is not installed, do nothing
        if ! command -v docker-compose >/dev/null; then
          exit 0
        fi

        postgres_host=$(docker compose port postgres 5432)
        redis_host=$(docker compose port redis 6379)

        export POSTGRES_URL=$(echo $POSTGRES_URL | sed "s/postgres:5432/''${postgres_host}/")
        export REDIS_URL=$(echo $REDIS_URL | sed "s/redis:6379/''${redis_host}/")
      '';
    };

    activate = {
      description = "Source the MOTD script";
      exec = ''
        source $DEVENV_ROOT/scripts/activate.sh
      '';
    };
  };

  # https://devenv.sh/basics/
  env = {
    STARSHIP_CONFIG = "${config.git.root}/nix/extra/starship.toml";
    COMPOSE_DOCKER_CLI_BUILD = "1";
    DOCKER_BUILDKIT = "1";
  };

  # -------------------------------------
  # Containers
  # -----------------------------------
  # 1. LOCAL DEV: Interactive shell container for testing/debugging
  #    Use case: Run your dev environment in a container for isolation
  #    Usage: devenv container run shell
  containers."shell" = {
    name = "darkmatter-dev";
    # Default behavior - drops you into a shell with all tools available
    # Includes: git, pnpm, turbo, AWS tools, etc.
  };

  # 2. DOCKER: Development services container (postgres, redis, processes)
  #    Use case: Run all services and processes together
  #    Usage: devenv container run dev-services
  containers."dev-services" = {
    name = "darkmatter-services";
    # Runs postgres, redis, and turbo dev
    startupCommand = "${pkgs.process-compose}/bin/process-compose";
    # Only copy necessary files, exclude node_modules and build artifacts
    copyToRoot = lib.mkForce (
      pkgs.buildEnv {
        name = "dev-root";
        paths = [
          # Include only what's needed for services
          (pkgs.writeTextDir "etc/devenv-services" "true")
        ];
      }
    );
  };

  # 3. CI: Test container for GitHub Actions / GitLab CI
  #    Use case: Run tests in CI with all dependencies
  #    Usage: devenv container run ci-test
  containers."ci-test" = {
    name = "darkmatter-ci";
    version = lib.mkDefault "latest";
    # Keep the image build minimal; CI will mount the repo and run tests
    startupCommand = "${pkgs.coreutils}/bin/true";
    # Minimal root (no source); CI will mount repo
    copyToRoot = pkgs.buildEnv {
      name = "ci-root";
      paths = [
        (pkgs.writeTextDir "etc/ci/.keep" "")
      ];
    };
  };

  # # 4a. PRODUCTION: Apollo Go API container
  # #     Use case: Deploy Apollo service to production
  # #     Usage: devenv container --registry docker://registry.fly.io/ copy apollo-api
  # containers."apollo-api" = {
  #   name = "apollo";
  #   version = lib.mkDefault "latest";
  #   registry = lib.mkDefault "docker://registry.fly.io/darkmatter-apollo";

  #   # Run the compiled Go binary
  #   startupCommand = pkgs.writeShellScript "start-apollo" ''
  #     set -e
  #     cd /app
  #     exec ./apollo serve --port=''${PORT:-8080}
  #   '';

  #   # Copy only the built binary and necessary runtime files
  #   copyToRoot = lib.mkIf (!config.container.isBuilding) (
  #     pkgs.buildEnv {
  #       name = "apollo-root";
  #       paths = [
  #         # Would include your built Go binary here
  #         # For now, placeholder structure
  #         (pkgs.writeTextDir "app/.gitkeep" "")
  #       ];
  #     }
  #   );

  #   # Default args for fly.io deployment
  #   defaultCopyArgs = [
  #     "--dest-creds"
  #     "x:\"$(flyctl auth token 2>/dev/null || echo 'missing-token')\""
  #   ];
  # };

  # 4b. PRODUCTION: Next.js web container
  #     Use case: Deploy Next.js app to production
  #     Usage: devenv container --registry docker://registry.fly.io/ copy nextjs-web
  # containers."nextjs-web" = {
  #   name = "nextjs";
  #   version = lib.mkDefault "latest";
  #   registry = lib.mkDefault "docker://registry.fly.io/darkmatter-web";

  #   # Run Next.js standalone server
  #   startupCommand = pkgs.writeShellScript "start-nextjs" ''
  #     set -e
  #     cd /app/apps/nextjs/.next/standalone
  #     exec ${pkgs.nodejs_24}/bin/node server.js
  #   '';

  #   # Copy only the standalone build
  #   copyToRoot = lib.mkIf (!config.container.isBuilding) (
  #     pkgs.buildEnv {
  #       name = "nextjs-root";
  #       paths = [
  #         # Would include your .next/standalone output
  #         (pkgs.writeTextDir "app/.gitkeep" "")
  #       ];
  #     }
  #   );

  #   defaultCopyArgs = [
  #     "--dest-creds"
  #     "x:\"$(flyctl auth token 2>/dev/null || echo 'missing-token')\""
  #   ];
  # };

  # 4c. PRODUCTION: Expo/React Native API container (if needed)
  #     Use case: Deploy Expo backend services
  # containers."expo-api" = {
  #   name = "expo-api";
  #   version = lib.mkDefault "latest";

  #   startupCommand = pkgs.writeShellScript "start-expo-api" ''
  #     set -e
  #     cd /app/apps/expo
  #     exec ${pkgs.nodejs_24}/bin/node dist/server.js
  #   '';

  #   copyToRoot = null; # Will be built separately
  # };

  # 5. PRODUCTION: Python NN service container
  #    Use case: Deploy Python ML/NN service
  # containers."nn-service" = {
  #   name = "nn-service";
  #   version = lib.mkDefault "latest";
  #   registry = lib.mkDefault "docker://registry.fly.io/darkmatter-nn";

  #   startupCommand = pkgs.writeShellScript "start-nn" ''
  #     set -e
  #     cd /app/apps/nn
  #     exec ${pkgs.python313}/bin/python -m uvicorn app:app --host 0.0.0.0 --port ''${PORT:-8000}
  #   '';

  #   copyToRoot = null;
  # };

  # -------------------------------------
  # Enter Shell
  # -----------------------------------

  # https://devenv.sh/basics/
  enterShell = ''
    #! /usr/bin/env bash

    #DEFAULT_XDG_CONFIG_HOME="''${HOME}/.config"
    #export XDG_CONFIG_HOME="''${XDG_CONFIG_HOME:-$DEFAULT_XDG_CONFIG_HOME}"

    mkdir -p "$XDG_CONFIG_HOME/process-compose"
    # Initialize Starship prompt
    eval "$(${pkgs.starship}/bin/starship init $SHELL)"
  '';

  # https://devenv.sh/automatic-shell-activation/
  dotenv.enable = true;

  # https://devenv.sh/guides/using-with-cachix/
  # cachix.enable = true;
  cachix.pull = [
    "devenv"
    "darkmatter"
  ];
  # Only push to Cachix if a token is present in the environment
  cachix.push = lib.mkIf (builtins.getEnv "CACHIX_AUTH_TOKEN" != "") "darkmatter";
}
