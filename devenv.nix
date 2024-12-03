{ pkgs, lib, config, inputs, ... }:

{
  # https://devenv.sh/basics/
  env.GREET = "devenv";
  dotenv.enable = true;

  # https://devenv.sh/packages/
  packages = [ pkgs.git ];

  # https://devenv.sh/languages/
  languages.javascript.enable = true;
  languages.typescript.enable = true;

  # https://devenv.sh/processes/
  # processes.cargo-watch.exec = "cargo-watch";

  # https://devenv.sh/services/
  # services.postgres.enable = true;

  # https://devenv.sh/scripts/

  enterShell = ''
    hello
    git --version
  '';

  # https://devenv.sh/tasks/
  tasks = {
    "node:setup".exec = "npm install";
    "ts:compile" = {
      exec = "compile";
      after = [ "node:setup" ];
    };
    "devenv:enterShell".after = [ "node:setup" "ts:compile" ];
  };

  scripts.skeet.exec = "node index.js";
  scripts.compile.exec = "npx tsc";

  # https://devenv.sh/tests/
  enterTest = ''
    echo "Running tests"
    git --version | grep --color=auto "${pkgs.git.version}"
  '';

  # https://devenv.sh/pre-commit-hooks/
  # pre-commit.hooks.shellcheck.enable = true;

  # See full reference at https://devenv.sh/reference/options/
}
