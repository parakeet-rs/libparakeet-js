#include "em_rw_interfaces.h"
#include "factory.h"
#include "helper.h"

#include <cstdint>
#include <parakeet-crypto/utils/base64.h>

#include <emscripten/bind.h>

using namespace emscripten;
using namespace parakeet_crypto;

std::string base64_encode_str(std::string str)
{
    auto result = utils::Base64Encode((const uint8_t *)str.data(), str.size());
    return std::string(result.cbegin(), result.cend());
}

std::string base64_decode_str(std::string str)
{
    auto result = utils::Base64Decode((const uint8_t *)str.data(), str.size());
    return std::string(result.cbegin(), result.cend());
}

uintptr_t base64_encode(EM_ARG_VEC(input))
{
    auto result = utils::Base64Encode((uint8_t *)ptr_input, len_input);
    return MakeSizedVector(result);
}

uintptr_t base64_decode(EM_ARG_VEC(input))
{
    auto result = utils::Base64Decode((uint8_t *)ptr_input, len_input);
    return MakeSizedVector(result);
}

EMSCRIPTEN_BINDINGS(EM__Transformer)
{
    // Base64 (str to str)
    function("base64_encode_str", &base64_encode_str);
    function("base64_decode_str", &base64_decode_str);

    // Base64 (buffer to buffer)
    function("base64_encode", &base64_encode);
    function("base64_decode", &base64_decode);
}
