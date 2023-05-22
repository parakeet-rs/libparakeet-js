#include "factory.h"

#include <parakeet-crypto/transformer/ximalaya.h>
#include <parakeet-crypto/xmly/scramble_key.h>

#include <algorithm>

#include <emscripten/bind.h>

using namespace emscripten;

uintptr_t create_xmly_android_scramble_table(double mul_init, double mul_step)
{
    if (auto table = parakeet_crypto::xmly::CreateScrambleKey(mul_init, mul_step))
    {
        auto n = table->size();
        if (auto ptr = (uint16_t *)calloc(n, sizeof(table->at(0))))
        {
            std::copy_n(table->cbegin(), n, ptr);
            return (uintptr_t)ptr;
        }
    }

    return (uintptr_t) nullptr;
}

void free_xmly_key(uintptr_t p)
{
    if (p)
    {
        free(reinterpret_cast<void *>(p));
    }
}

uint16_t create_xmly_android_transformer(uintptr_t key, std::string content_key)
{
    return g_transformer_registry.add(parakeet_crypto::transformer::CreateXimalayaDecryptionTransformer(
        reinterpret_cast<const uint16_t *>(key),                //
        reinterpret_cast<const uint8_t *>(content_key.c_str()), //
        content_key.size()                                      //
        ));
}

EMSCRIPTEN_BINDINGS(EM__CryptoXMLY)
{
    function("create_xmly_android_scramble_table", &create_xmly_android_scramble_table, allow_raw_pointers());
    function("free_xmly_key", &free_xmly_key, allow_raw_pointers());
    function("create_xmly_android_transformer", &create_xmly_android_transformer, allow_raw_pointers());
}
