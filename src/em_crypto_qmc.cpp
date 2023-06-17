#include "factory.h"
#include "helper.h"

#include <cstdint>
#include <parakeet-crypto/transformer/qmc.h>

#include <emscripten/bind.h>
#include <vector>

using namespace emscripten;
using namespace parakeet_crypto;

uint16_t create_qmc_v1(EM_ARG_VEC(key))
{
    return g_transformer_registry.add(transformer::CreateQMC1StaticDecryptionTransformer(EM_VEC_PTR_LEN(key)));
}

uint16_t create_qmc_v2(uint16_t footer_parser_handle)
{
    auto footer_parser = g_qmc2_footer_parser.get(footer_parser_handle);
    if (!footer_parser)
    {
        return 0;
    }

    return g_transformer_registry.add(transformer::CreateQMC2DecryptionTransformer(footer_parser));
}

uint16_t create_qmc_v2_rc4(EM_ARG_VEC(key))
{
    return g_transformer_registry.add(transformer::CreateQMC2RC4DecryptionTransformer(EM_VEC_PTR_LEN(key)));
}

uint16_t create_qmc_v2_map(EM_ARG_VEC(key))
{
    return g_transformer_registry.add(transformer::CreateQMC2MapDecryptionTransformer(EM_VEC_PTR_LEN(key)));
}

uint16_t create_qmc_v2_key(EM_ARG_VEC(key))
{
    if (len_key > 300)
    {
        return g_transformer_registry.add(transformer::CreateQMC2RC4DecryptionTransformer(EM_VEC_PTR_LEN(key)));
    }
    else
    {
        return g_transformer_registry.add(transformer::CreateQMC2MapDecryptionTransformer(EM_VEC_PTR_LEN(key)));
    }
}

uint16_t create_qmc_v2_ekey(EM_ARG_VEC(ekey), uint16_t key_crypto_handle)
{
    if (auto key_crypto = g_qmc2_key_crypto.get(key_crypto_handle))
    {
        auto key = key_crypto->Decrypt(EM_VEC_PTR_LEN(ekey));
        return create_qmc_v2_key(reinterpret_cast<uintptr_t>(key.data()), key.size());
    }

    return 0;
}

EMSCRIPTEN_BINDINGS(EM__CryptoQMC)
{
    function("create_qmc_v1", &create_qmc_v1);
    function("create_qmc_v2", &create_qmc_v2);
    function("create_qmc_v2_map", &create_qmc_v2_map);
    function("create_qmc_v2_rc4", &create_qmc_v2_rc4);
    function("create_qmc_v2_key", &create_qmc_v2_key);
    function("create_qmc_v2_ekey", &create_qmc_v2_ekey);
}
