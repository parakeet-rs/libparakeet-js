#include "em_rw_interfaces.h"

#include <cstdint>
#include <cstdlib>
#include <memory>

using namespace emscripten;

EMSCRIPTEN_BINDINGS(EM__RW_Memory) {
  function("libparakeet_malloc", &malloc, allow_raw_pointers());
  function("libparakeet_free", &free, allow_raw_pointers());
}
