#include "factory.h"
#include "helper.h"

#include <parakeet-crypto/transformer/kuwo.h>

#include <emscripten/bind.h>

using namespace emscripten;
using namespace parakeet_crypto;

uint16_t create_kuwo(std::string key)
{
    return g_transformer_registry.add(
        transformer::CreateKuwoDecryptionTransformer(reinterpret_cast<const uint8_t *>(key.c_str())));
}

uint16_t create_kuwo_v2(std::string key, EM_ARG_VEC(v2_key))
{
    std::vector<uint8_t> v2_key(ptr_v2_key, ptr_v2_key + len_v2_key);

    return g_transformer_registry.add(transformer::CreateKuwoDecryptionTransformer(
        reinterpret_cast<const uint8_t *>(key.c_str()), std::move(v2_key)));
}

uint16_t create_kuwo_v2_ekey(std::string key, EM_ARG_VEC(ekey), uint16_t key_crypto_handle)
{
    if (auto key_crypto = g_qmc2_key_crypto.get(key_crypto_handle))
    {
        auto v2_key = key_crypto->Decrypt(EM_VEC_PTR_LEN(ekey));
        return g_transformer_registry.add(transformer::CreateKuwoDecryptionTransformer(
            reinterpret_cast<const uint8_t *>(key.c_str()), std::move(v2_key)));
    }

    return 0;
}

EMSCRIPTEN_BINDINGS(EM__CryptoKuwo)
{
    function("create_kuwo", &create_kuwo);
    function("create_kuwo_v2", &create_kuwo_v2);
    function("create_kuwo_v2_ekey", &create_kuwo_v2_ekey);
}
