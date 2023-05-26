#include "factory.h"

#include <parakeet-crypto/transformer/migu3d.h>

#include <emscripten/bind.h>

using namespace emscripten;
using namespace parakeet_crypto;

uint16_t create_migu3d(std::string salt, std::string file_key)
{
    auto p_salt = reinterpret_cast<const uint8_t *>(salt.c_str());
    auto p_file_key = reinterpret_cast<const uint8_t *>(file_key.c_str());
    return g_transformer_registry.add(transformer::CreateMiguTransformer(p_salt, p_file_key));
}

uint16_t create_migu3d_keyless()
{
    return g_transformer_registry.add(transformer::CreateKeylessMiguTransformer());
}

EMSCRIPTEN_BINDINGS(EM__CryptoMigu)
{
    function("create_migu3d", &create_migu3d);
    function("create_migu3d_keyless", &create_migu3d_keyless);
}
