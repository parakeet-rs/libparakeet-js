#include "factory.h"
#include "helper.h"

#include <parakeet-crypto/transformer/kgm.h>

#include <emscripten/bind.h>

using namespace emscripten;

uint16_t create_kgm(std::string slot_key_1, std::string v4_slot_key_table, std::string v4_file_key_table)
{
    using parakeet_crypto::transformer::CreateKGMDecryptionTransformer;
    using parakeet_crypto::transformer::KGMConfig;
    using parakeet_crypto::transformer::KGMConfigV4;

    KGMConfig config = {.slot_keys = {{1, VecFromStr(slot_key_1)}},
                        .v4 = {
                            .slot_key_table = VecFromStr(v4_slot_key_table),
                            .file_key_table = VecFromStr(v4_file_key_table),
                        }};

    return g_transformer_registry.add(CreateKGMDecryptionTransformer(config));
}

EMSCRIPTEN_BINDINGS(EM__CryptoKGM)
{
    function("create_kgm", &create_kgm);
}
