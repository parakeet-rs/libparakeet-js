# Local config

Settings to override for current machine.

## Flags

```sh
PARALLEL_BUILD="$(nproc)"
EMSDK_VER="3.0.0"
BUILD_TYPE="Release"
```

Compile with `all - 2` processes:

```sh
PARALLEL_BUILD="$(nproc)"
if [[ "$PARALLEL_BUILD" -gt 2 ]]; then
    PARALLEL_BUILD="$((PARALLEL_BUILD - 2))"
fi
```
