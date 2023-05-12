#include "em_rw_interfaces.h"

#include <cstdint>
#include <cstdlib>
#include <memory>

using namespace emscripten;
using namespace parakeet_crypto;

size_t rw_test(IWriteableWrapper *dst, IReadSeekableWrapper *src) {
  size_t total = 0;
  uint8_t *buffer = (uint8_t *)malloc(100);
  while (true) {
    auto bytes_read = src->Read(buffer, 100);
    if (bytes_read == 0) {
      break;
    }
    total += bytes_read;
    dst->Write(buffer, bytes_read);
  }
  free(buffer);
  return total;
}

EMSCRIPTEN_BINDINGS(EM__RW_Interfaces) {
  class_<IReadSeekable>("IReadSeekable")
      .function(
          "Read",
          select_overload<size_t(uint8_t *, size_t)>(&IReadSeekable::Read),
          pure_virtual(), allow_raw_pointers())
      .function("Seek", &IReadSeekable::Seek, pure_virtual(),
                allow_raw_pointers())
      .function("GetSize", &IReadSeekable::GetSize, pure_virtual())
      .function("GetOffset", &IReadSeekable::GetOffset, pure_virtual())
      .allow_subclass<IReadSeekableWrapper>("IReadSeekableWrapper");

  class_<IWriteable>("IWriteable")
      .function("Write", &IWriteable::Write, pure_virtual(),
                allow_raw_pointers())
      .allow_subclass<IWriteableWrapper>("IWriteableWrapper");

  function("rw_test", &rw_test, allow_raw_pointers());
}
