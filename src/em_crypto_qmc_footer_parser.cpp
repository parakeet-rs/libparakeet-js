#include "factory.h"
#include "parakeet-crypto/qmc2/footer_parser.h"

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

uint16_t qmcv2_footer_parser_new(uint8_t seed, std::string enc_v2_key_1,
                                 std::string enc_v2_key_2) {
  return g_qmc2_footer_parser.add(qmc2::CreateQMC2FooterParser(
      seed, reinterpret_cast<const uint8_t *>(enc_v2_key_1.c_str()),
      reinterpret_cast<const uint8_t *>(enc_v2_key_1.c_str())));
}

void qmcv2_footer_parser_delete(uint16_t handle) {
  g_qmc2_footer_parser.close(handle);
}

EMSCRIPTEN_BINDINGS(EM__CryptoQRC) {
  function("qmcv2_footer_parser_new", &qmcv2_footer_parser_new);
  function("qmcv2_footer_parser_delete", &qmcv2_footer_parser_delete);
}
