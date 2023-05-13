cmake_minimum_required(VERSION 3.5)
project(libparakeet-wasm)

set(PARAKEET_CRYPTO_BUILD_TESTING OFF CACHE BOOL "no tests")
set(PARAKEET_CRYPTO_BUILD_EXAMPLES OFF CACHE BOOL "no examples")
add_subdirectory(./vendor/libparakeet EXCLUDE_FROM_ALL)

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

file(GLOB_RECURSE CORE_HDR src/*.h)
file(GLOB_RECURSE CORE_SRC src/*.cpp)

set(RUNTIME_METHODS_LIST
	getValue
	writeArrayToMemory
	UTF8ToString
	stringToUTF8
	lengthBytesUTF8
)
list(JOIN RUNTIME_METHODS_LIST "," RUNTIME_METHODS)

set(EMSCRIPTEN_FLAGS
	"--bind"
	"-lembind"
	"-s DYNAMIC_EXECUTION=0"
	"-s MODULARIZE=1"
	"-s EXPORT_NAME=LibParakeet"
	"-s EXPORTED_RUNTIME_METHODS=${RUNTIME_METHODS}"
    "-s DEMANGLE_SUPPORT=1"
	"-s ALLOW_MEMORY_GROWTH=0"
	"-s ENVIRONMENT=node,web"
)
set(EMSCRIPTEN_FLAGS_ES6
	${EMSCRIPTEN_FLAGS}
	"-s EXPORT_ES6=1"
)

list(JOIN EMSCRIPTEN_FLAGS " " EMSCRIPTEN_FLAGS_STR)
list(JOIN EMSCRIPTEN_FLAGS_ES6 " " EMSCRIPTEN_FLAGS_ES6_STR)

add_executable(libparakeet-cjs ${CORE_SRC} ${CORE_HDR})
target_link_libraries(libparakeet-cjs PRIVATE parakeet::crypto)
target_compile_features(libparakeet-cjs PRIVATE cxx_std_17)
set_target_properties(libparakeet-cjs PROPERTIES
	OUTPUT_NAME "libparakeet"
	LINK_FLAGS "${EMSCRIPTEN_FLAGS_STR}"
	RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/build.emscripten
)

add_executable(libparakeet-es6 ${CORE_SRC} ${CORE_HDR})
target_link_libraries(libparakeet-es6 PRIVATE parakeet::crypto)
target_compile_features(libparakeet-es6 PRIVATE cxx_std_17)
set_target_properties(libparakeet-es6 PROPERTIES
	OUTPUT_NAME "libparakeet"
	SUFFIX ".mjs"
	LINK_FLAGS "${EMSCRIPTEN_FLAGS_ES6_STR}"
	RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/build.emscripten-es6
)
