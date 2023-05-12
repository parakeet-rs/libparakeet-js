#include "em_rw_interfaces.h"
#include "factory.h"
#include "parakeet-crypto/IStream.h"

#include <parakeet-crypto/ITransformer.h>

#include <cstdint>
#include <cstdlib>
#include <memory>
#include <string>

#include <emscripten.h>
#include <emscripten/bind.h>
#include <emscripten/val.h>
#include <string>
#include <vector>

using namespace emscripten;
using namespace parakeet_crypto;

std::string transformer_get_name(uint16_t id) {
  auto transformer = g_transformer_registry.get(id);
  if (transformer) {
    return transformer->GetName();
  }

  return std::string("");
}

int transformer_transform(uint16_t handle, IWriteableWrapper *dst,
                          IReadSeekableWrapper *src) {
  auto transformer = g_transformer_registry.get(handle);
  if (transformer) {
    return (int)transformer->Transform(dynamic_cast<IWriteable *>(dst),
                                       dynamic_cast<IReadSeekable *>(src));
  }
  return -1;
}

EMSCRIPTEN_BINDINGS(EM__Transformer) {
  function("transformer_get_name", &transformer_get_name);
  function("transformer_transform", &transformer_transform,
           allow_raw_pointers());
}
