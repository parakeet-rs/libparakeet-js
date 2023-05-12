#include "factory.h"
#include "parakeet-crypto/ITransformer.h"

#include <parakeet-crypto/transformer/qmc.h>

#include <cstdint>
#include <cstdlib>
#include <memory>
#include <string>

#include <emscripten.h>
#include <emscripten/bind.h>
#include <emscripten/val.h>
#include <vector>

using namespace emscripten;
using namespace parakeet_crypto;

class TransparentTransformer final : public ITransformer {
private:
public:
  TransparentTransformer() : ITransformer() {}
  const char *GetName() override { return "Transparent"; }

  TransformResult Transform(IWriteable *output, IReadSeekable *input) override {
    size_t total = 0;
    uint8_t *buffer = (uint8_t *)malloc(1024);
    while (true) {
      auto bytes_read = input->Read(buffer, 1024);
      if (bytes_read == 0) {
        break;
      }
      total += bytes_read;
      if (!output->Write(buffer, bytes_read)) {
        free(buffer);
        return TransformResult::ERROR_IO_OUTPUT_UNKNOWN;
      }
    }
    free(buffer);
    return TransformResult::OK;
  }
};

uint16_t create_transparent_transformer() {
  return g_transformer_registry.add(std::make_shared<TransparentTransformer>());
}

EMSCRIPTEN_BINDINGS(EM__CryptoTransparent) {
  function("create_transparent_transformer", &create_transparent_transformer);
}
