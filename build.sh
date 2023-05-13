#!/bin/bash

cd "$(dirname "${BASH_SOURCE[0]}")"

# EMSDK_VER="3.1.38"
EMSDK_VER="3.0.0"
BUILD_TYPE="Release"
PARALLEL_BUILD=$(nproc)

LOCAL_CONFIG="config.local/${HOSTNAME}.sh"

if [[ -f "$LOCAL_CONFIG" ]]; then
    echo "Loading local default config from '${LOCAL_CONFIG}'"
    . "$LOCAL_CONFIG"
fi

while [[ $# -gt 0 ]]; do
    case "$1" in
    --emsdk-version)
        EMSDK_VER="$2"
        shift
        ;;

    -b | --build)
        BUILD_TYPE="$2"
        shift
        ;;

    -j | --parallel)
        PARALLEL_BUILD="$2"
        shift
        ;;
    *)
        echo "Unknown flag: $1"
        exit 1
        ;;
    esac
    shift
done

echo "---------------------------------"
echo "BUILD_TYPE: ${BUILD_TYPE}"
echo "EMSDK_VER: ${EMSDK_VER}"
echo "PARALLEL_BUILD: ${PARALLEL_BUILD}"
echo "---------------------------------"

# Init emsdk
./vendor/emsdk/emsdk install "${EMSDK_VER}"
./vendor/emsdk/emsdk activate "${EMSDK_VER}"
source ./vendor/emsdk/emsdk_env.sh

# Begin build
OUT_DIR="out/em-${BUILD_TYPE}"
mkdir -p "${OUT_DIR}"
cd "${OUT_DIR}"
emcmake cmake -DCMAKE_BUILD_TYPE="${BUILD_TYPE}" ../../
cmake --build . -j "${PARALLEL_BUILD}"

cp -f build.emscripten/libparakeet.{wasm,js} ../../npm/src/
cp -f build.emscripten-es6/libparakeet.mjs ../../npm/src/
