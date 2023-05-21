#include "factory.h"

#include <parakeet-crypto/transformer/qrc.h>

#include <emscripten/bind.h>

using namespace emscripten;
using namespace parakeet_crypto;

uint16_t create_qrc(uint16_t qmc1_static_transformer_handle, std::string key1, std::string key2, std::string key3)
{
    auto qmc1_static_transformer = g_transformer_registry.get(qmc1_static_transformer_handle);
    if (!qmc1_static_transformer)
    {
        return 0;
    }

    return g_transformer_registry.add(transformer::CreateQRCLyricsDecryptionTransformer(
        qmc1_static_transformer, reinterpret_cast<const uint8_t *>(key1.c_str()),
        reinterpret_cast<const uint8_t *>(key2.c_str()), reinterpret_cast<const uint8_t *>(key3.c_str())));
}

EMSCRIPTEN_BINDINGS(EM__CryptoQRC)
{
    function("create_qrc", &create_qrc);
}
