#include "factory.h"

#include <parakeet-crypto/transformer/kuwo.h>

#include <emscripten/bind.h>

using namespace emscripten;
using namespace parakeet_crypto;

uint16_t create_kuwo(std::string key)
{
    return g_transformer_registry.add(
        transformer::CreateKuwoDecryptionTransformer(reinterpret_cast<const uint8_t *>(key.c_str())));
}

EMSCRIPTEN_BINDINGS(EM__CryptoKuwo)
{
    function("create_kuwo", &create_kuwo);
}
