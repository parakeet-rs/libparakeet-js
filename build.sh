#!/bin/bash

cd "$(dirname "${BASH_SOURCE[0]}")"

# EMSDK_VER="3.1.38"
EMSDK_VER="3.0.0"
BUILD_TYPE="Release"

# Init emsdk

./vendor/emsdk/emsdk install "${EMSDK_VER}"
./vendor/emsdk/emsdk activate "${EMSDK_VER}"
source ./vendor/emsdk/emsdk_env.sh

# Begin build
OUT_DIR="out/em-${BUILD_TYPE}"
mkdir -p "${OUT_DIR}"
cd "${OUT_DIR}"
emcmake cmake -DCMAKE_BUILD_TYPE="${BUILD_TYPE}" ../../
cmake --build . -j

cp -f build.emscripten/libparakeet.{wasm,js} ../../npm/src/
cp -f build.emscripten-es6/libparakeet.mjs ../../npm/src/
