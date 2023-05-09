cmake_minimum_required(VERSION 3.5)
project(libparakeet-wasm)

set(PARAKEET_CRYPTO_BUILD_TESTING OFF CACHE BOOL "no tests")
set(PARAKEET_CRYPTO_BUILD_EXAMPLES OFF CACHE BOOL "no examples")
add_subdirectory(./vendor/libparakeet EXCLUDE_FROM_ALL)

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/build.emscripten)

file(GLOB_RECURSE CORE_HDR src/*.h)
file(GLOB_RECURSE CORE_SRC src/*.cpp)

set(RUNTIME_METHODS_LIST
	getValue
	writeArrayToMemory
	UTF8ToString
)
list(JOIN RUNTIME_METHODS_LIST "," RUNTIME_METHODS)

set(EMSCRIPTEN_FLAGS
	"--bind"
	"-s NO_DYNAMIC_EXECUTION=1"
	"-s MODULARIZE=1"
	"-s EXPORT_NAME=LibParakeet"
	"-s EXPORTED_RUNTIME_METHODS=${RUNTIME_METHODS}"
    "-s DEMANGLE_SUPPORT=1"
	"-s EXPORT_ES6=1"
	"-s ALLOW_MEMORY_GROWTH"
)
list(JOIN EMSCRIPTEN_FLAGS " " EMSCRIPTEN_FLAGS_STR)

add_executable(libparakeet-wasm ${CORE_SRC} ${CORE_HDR})
# target_include_directories(libparakeet-wasm PRIVATE vendor/emsdk/upstream/emscripten/cache/sysroot/include/)
target_link_libraries(libparakeet-wasm
  PRIVATE
    parakeet::crypto
)
add_compile_options(libparakeet-wasm "-lembind")
set_target_properties(libparakeet-wasm PROPERTIES LINK_FLAGS "-lembind ${EMSCRIPTEN_FLAGS_STR}")
