{
  pkgs,
  lib,
  config,
  _inputs,
  ...
}:
let
  goTestReport = pkgs.buildGoModule rec {
    pname = "go-test-report";
    version = "0.9.3";

    src = pkgs.fetchFromGitHub {
      owner = "vakenbolt";
      repo = "go-test-report";
      rev = "v${version}";
      sha256 = "1j2fyznkjp4z4ggj3pl3xg0fh37947d7x3n11qq778pqlh1by7w9";
    };

    vendorHash = "sha256-Y/J5R0Vxk0bUlfqvY2ncJPuXIwjOHEvjNb1mefPmJzo=";

    meta = with lib; {
      description = "Generate HTML reports from go test output";
      homepage = "https://github.com/vakenbolt/go-test-report";
      license = licenses.asl20;
      maintainers = [ ];
      mainProgram = "go-test-report";
    };
  };
in
{
  imports = [
    ./scripts.nix
  ];

  # https://devenv.sh/basics/
  # https://devenv.sh/reference/options/#env
  env = {
    STARSHIP_CONFIG = "${config.git.root}/nix/extra/starship.toml";
    COMPOSE_DOCKER_CLI_BUILD = "1";
    DOCKER_BUILDKIT = "1";
    TURBO_UI = "true";
  };

  packages =
    [
      goTestReport
    ]
    ++ (with pkgs; [
      # System
      awscli2
      chamber
      aws-vault
      # Go
      go_1_25
      golangci-lint
      delve
      # Python
      # - enabled by languages.python
      # JS
      pnpm_10
      turbo
      # Treefmt formatters
      treefmt
      alejandra # Nix formatter
      biome # JavaScript/TypeScript formatter
      ruff # Python formatter
      prettier # Markdown formatter
      yamlfmt # YAML formatter
    ]);

  # https://devenv.sh/pre-commit-hooks/
  # https://devenv.sh/reference/options/#pre-commit
  # git-hooks.hooks.shellcheck.enable = true;

  # # https://devenv.sh/guides/using-with-cachix/
  # # Binary caching with Cachix
  # # Disable automatic cache management to avoid requiring trusted-users on the daemon.
  # cachix.enable = lib.mkDefault true;
  # # If you want to push/pull via Cachix, enable it locally or configure system-level substituters.
  # cachix.pull = ["devenv" "darkmatter"];
  # cachix.push = "darkmatter";

  # https://devenv.sh/process-managers/process-compose/
  process.managers = {
    process-compose = {
      tui.enable = true;
      settings = {
        environment = [
          "TURBO_UI=false"
        ];
      };
    };
  };

  apple.sdk = lib.mkDefault (if pkgs.stdenv.isDarwin then pkgs.apple-sdk_15 else null);

  # See full reference at https://devenv.sh/reference/options/
}
