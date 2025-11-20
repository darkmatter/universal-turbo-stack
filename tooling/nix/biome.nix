{
  pkgs,
  lib,
  ...
}: let
  rootBiome = lib.importJSON ../../biome.json;
  allowedDomains = ["react" "test" "solid" "next" "qwik" "vue" "project" "tailwind"];
  allowedValues = ["all" "none" "recommended"];
  rawDomains = rootBiome.linter.domains or {};
  domains =
    lib.filterAttrs (
      name: value:
        lib.elem name allowedDomains && builtins.isString value && lib.elem value allowedValues
    )
    rawDomains;
in {
  root = true;
  "$schema" = "https://biomejs.dev/schemas/2.2.5/schema.json";
  files = {
    ignoreUnknown = true;
    includes = ["**"];
    experimentalScannerIgnores = [
      "**/nix/store/**"
      "**/node_modules/**"
      "**/.venv/**"
      "**/.pytest_cache/**"
      "**/.mypy_cache/**"
      "**/.ruff_cache/**"
      "**/.turbo/**"
      "**/.devenv/**"
      "**/.devenv*/**"
      "**/static/**"
      "**/fixtures/**"
      "**/*.test.ts"
      "**/.storybook/**"
      "**/env/src/lib/**"
      "**/.yarn/releases/**"
      "tooling/typescript/base.json"
    ];
  };
  assist = {
    enabled = true;
    actions = {
      source = {
        recommended = true;
        organizeImports = "on";
      };
    };
  };
  formatter = {
    enabled = true;
    formatWithErrors = false;
    indentStyle = "space";
    indentWidth = 2;
    lineEnding = "lf";
    lineWidth = 80;
    attributePosition = "auto";
  };
  json = {
    parser = {
      allowComments = true;
    };
    formatter = {
      indentStyle = "space";
    };
  };
  linter = {
    enabled = true;

    domains = domains;
    rules = {
      recommended = true;
      complexity = {
        noForEach = "off";
        useOptionalChain = "error";
      };
      correctness = {
        noUnusedVariables = {
          level = "error";
          options = {ignoreRestSiblings = true;};
        };
        useExhaustiveDependencies = "warn";
        useHookAtTopLevel = "error";
      };
      nursery = {
        useSortedClasses = {
          level = "off";
          options = {
            attributes = ["className" "class"];
            functions = ["clsx" "cn" "cva"];
          };
        };
        noImportCycles = "warn";
      };
      style = {
        noNonNullAssertion = "error";
        useAsConstAssertion = "error";
        noProcessEnv = "error";
        useConsistentArrayType = {
          level = "warn";
          options = {syntax = "shorthand";};
        };
        useImportType = "warn";
      };
      suspicious = {
        noExplicitAny = "warn";
        noArrayIndexKey = "warn";
        noConsole = "warn";
        noTsIgnore = "off";
      };
      performance = {
        noAccumulatingSpread = "warn";
      };
    };
  };
  javascript = {
    formatter = {
      quoteStyle = "double";
      jsxQuoteStyle = "double";
      trailingCommas = "all";
      semicolons = "always";
      arrowParentheses = "always";
      bracketSpacing = true;
      bracketSameLine = false;
    };
  };
  overrides = [
    {
      includes = ["**/*.ts" "**/*.tsx"];
      linter = {
        rules = {
          correctness = {
            noUndeclaredVariables = "off";
            noUnusedImports = "error";
          };
        };
      };
    }
    {
      includes = ["apps/expo/**"];
      linter = {
        rules = {
          a11y = {
            useKeyWithClickEvents = "off";
          };
        };
      };
    }
    {
      includes = ["packages/ui/**"];
      linter = {
        rules = {
          a11y = {
            useSemanticElements = "off";
          };
        };
      };
    }
    {
      includes = ["**/*.css"];
      linter = {
        rules = {
          suspicious = {
            noUnknownAtRules = "off";
          };
        };
      };
    }
  ];
  vcs = {
    enabled = true;
    clientKind = "git";
    useIgnoreFile = false;
    defaultBranch = "main";
  };
}
