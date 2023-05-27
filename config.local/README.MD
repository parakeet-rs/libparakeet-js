# Local config

Settings to override for current machine. Those are shell scripts.

## Init config file

```sh
# Enter project repo root dir first:
#
#   cd "$(git rev-parse --show-toplevel)"
#

# Create config file
touch "config.local/${HOSTNAME}.sh"
# Edit it
$EDITOR "config.local/${HOSTNAME}.sh"
```

## Available variables

```sh
PARALLEL_BUILD="$(nproc)"
EMSDK_VER="3.0.0"
BUILD_TYPE="Release"
```

Compile with `all - 2` processes by default:

```sh
PARALLEL_BUILD="$(nproc)"
if [[ "$PARALLEL_BUILD" -gt 2 ]]; then
    PARALLEL_BUILD="$((PARALLEL_BUILD - 2))"
fi
```
