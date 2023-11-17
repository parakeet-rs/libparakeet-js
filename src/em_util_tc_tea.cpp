#include "em_rw_interfaces.h"
#include "factory.h"
#include "helper.h"

#include <cstdint>
#include <cstdio>

#include <parakeet-crypto/utils/tc_tea.h>

#include <emscripten/bind.h>

using namespace emscripten;
using namespace parakeet_crypto;

uintptr_t tc_tea_decrypt(EM_ARG_VEC(input), std::string key)
{
    auto result = utils::TeaDecrypt((uint8_t *)ptr_input, len_input, (const uint8_t *)key.c_str());
    return MakeSizedVector(result);
}

uintptr_t tc_tea_encrypt(EM_ARG_VEC(input), std::string key)
{
    auto result = utils::TeaEncrypt((uint8_t *)ptr_input, len_input, (const uint8_t *)key.c_str());
    return MakeSizedVector(result);
}

EMSCRIPTEN_BINDINGS(EM__Transformer)
{
    // Base64 (str to str)
    function("tc_tea_encrypt", &tc_tea_encrypt);
    function("tc_tea_decrypt", &tc_tea_decrypt);
}
