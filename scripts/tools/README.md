# Wrappers

These wrappers get added to PATH by direnv in `.envrc` - they simply execute
their respective tools, but allow running before/after hooks in a way that
will be compatible with tooling in a fool-proof way.

An example is if some VS Code extension needs to run go but happens to run it
in its' own process with something like `env -i go run .`, or maybe there's
no easy way to set an environment variable in its process. In this case, there
would be errors due to not being able to auth with AWS.

These little wrappers will work in all cases like that without adding much
complexity.
