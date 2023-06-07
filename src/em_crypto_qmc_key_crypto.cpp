#include "factory.h"
#include "helper.h"

#include <algorithm>
#include <cstdint>
#include <cstdlib>
#include <parakeet-crypto/qmc2/key_crypto.h>
#include <parakeet-crypto/transformer/qmc.h>

#include <emscripten/bind.h>

using namespace emscripten;
using namespace parakeet_crypto;

uint16_t qmcv2_key_crypto_new(uint8_t seed, std::string enc_v2_key_1, std::string enc_v2_key_2)
{
    return g_qmc2_key_crypto.add(qmc2::CreateKeyCrypto(seed, reinterpret_cast<const uint8_t *>(enc_v2_key_1.c_str()),
                                                       reinterpret_cast<const uint8_t *>(enc_v2_key_2.c_str())));
}

/**
 * @brief Decrypt data. You must call "qmcv2_key_crypto_free" afterwards.
 *
 * @param handle
 * @return uintptr_t
 */
uintptr_t qmcv2_key_crypto_decrypt(uint16_t handle, EM_ARG_VEC(str))
{
    if (auto key_crypto = g_qmc2_key_crypto.get(handle))
    {
        auto result = key_crypto->Decrypt(EM_VEC_PTR_LEN(str));

        if (auto ptr = (uint8_t *)calloc(result.size() + sizeof(uint32_t), 1))
        {
            *(uint32_t *)ptr = result.size();
            std::copy(result.begin(), result.end(), ptr + 4);
            return reinterpret_cast<uintptr_t>(ptr);
        }
    }

    return 0;
}

/**
 * @brief Encrypt ekey. You must call "qmcv2_key_crypto_free" afterwards.
 *
 * @param handle
 * @return uintptr_t
 */
uintptr_t qmcv2_key_crypto_encrypt(uint16_t handle, EM_ARG_VEC(str), int key_version)
{
    if (auto key_crypto = g_qmc2_key_crypto.get(handle))
    {
        auto result = key_crypto->Encrypt(EM_VEC_PTR_LEN(str), static_cast<qmc2::KeyVersion>(key_version));

        if (auto ptr = (uint8_t *)calloc(result.size() + sizeof(uint32_t), 1))
        {
            *(uint32_t *)ptr = result.size();
            std::copy(result.begin(), result.end(), ptr + 4);
            return reinterpret_cast<uintptr_t>(ptr);
        }
    }

    return 0;
}

void qmcv2_key_crypto_free(uintptr_t p)
{
    if (p)
    {
        free(reinterpret_cast<void *>(p));
    }
}

void qmcv2_key_crypto_delete(uint16_t handle)
{
    g_qmc2_key_crypto.close(handle);
}

EMSCRIPTEN_BINDINGS(EM__CryptoQMC_KeyCrypto)
{
    function("qmcv2_key_crypto_new", &qmcv2_key_crypto_new);
    function("qmcv2_key_crypto_delete", &qmcv2_key_crypto_delete);

    function("qmcv2_key_crypto_encrypt", &qmcv2_key_crypto_encrypt);
    function("qmcv2_key_crypto_decrypt", &qmcv2_key_crypto_decrypt);
    function("qmcv2_key_crypto_free", &qmcv2_key_crypto_free);
}
