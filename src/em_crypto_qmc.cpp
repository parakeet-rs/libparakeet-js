#include "factory.h"

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

uint16_t create_qmc_v1(uintptr_t key, size_t len) {
  return g_transformer_registry.add(
      transformer::CreateQMC1StaticDecryptionTransformer(
          reinterpret_cast<const uint8_t *>(key), len));
}

uint16_t create_qmc_v2(uint16_t footer_parser_handle) {
  auto footer_parser = g_qmc2_footer_parser.get(footer_parser_handle);
  if (!footer_parser) {
    return 0;
  }

  return g_transformer_registry.add(
      transformer::CreateQMC2DecryptionTransformer(footer_parser));
}

uint16_t create_qmc_v2_rc4(uintptr_t key, size_t len) {
  return g_transformer_registry.add(
      transformer::CreateQMC2RC4DecryptionTransformer(
          reinterpret_cast<const uint8_t *>(key), len));
}

uint16_t create_qmc_v2_map(uintptr_t key, size_t len) {
  return g_transformer_registry.add(
      transformer::CreateQMC2MapDecryptionTransformer(
          reinterpret_cast<const uint8_t *>(key), len));
}

EMSCRIPTEN_BINDINGS(EM__CryptoQRC) {
  function("create_qmc_v1", &create_qmc_v1);
  function("create_qmc_v2", &create_qmc_v2);
  function("create_qmc_v2_map", &create_qmc_v2_map);
  function("create_qmc_v2_rc4", &create_qmc_v2_rc4);
}
