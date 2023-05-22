#include "factory.h"

#include <parakeet-crypto/transformer/ncm.h>

#include <emscripten/bind.h>

using namespace emscripten;
using namespace parakeet_crypto;

/**
 * @param key 16-byte string
 * @return uint16_t
 */
uint16_t create_ncm(std::string key)
{
    return g_transformer_registry.add(
        transformer::CreateNeteaseNCMDecryptionTransformer(reinterpret_cast<const uint8_t *>(key.c_str())));
}

EMSCRIPTEN_BINDINGS(EM__CryptoNCM)
{
    function("create_ncm", &create_ncm);
}
