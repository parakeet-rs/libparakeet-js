#!/bin/bash

EMSDK_VER="3.1.37"
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

cp build.emscripten/libparakeet-wasm.wasm ../../npm/src/

cat > ../../npm/src/libparakeet-wasm.mjs <<EOF
import wasm from './libparakeet-wasm.wasm';

$(sed -E '
s/getBinaryPromise\(binaryFile\).then\(.*imports\)\}\)/wasm(imports)/;
s/isDataURI\(binaryFile\)/1/
' < build.emscripten/libparakeet-wasm.js)
EOF
