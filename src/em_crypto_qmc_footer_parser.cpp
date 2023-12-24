#include "factory.h"
#include "helper.h"

#include <cstdint>
#include <parakeet-crypto/qmc2/footer_parser.h>
#include <parakeet-crypto/transformer/qmc.h>
#include <parakeet-crypto/utils/hex.h>

#include <emscripten/bind.h>

using namespace emscripten;
using namespace parakeet_crypto;

uint16_t qmcv2_footer_parser_new(uint8_t seed, std::string enc_v2_key_1, std::string enc_v2_key_2)
{
    return g_qmc2_footer_parser.add(
        qmc2::CreateQMC2FooterParser(seed, reinterpret_cast<const uint8_t *>(enc_v2_key_1.c_str()),
                                     reinterpret_cast<const uint8_t *>(enc_v2_key_2.c_str())));
}

uint16_t qmcv2_footer_parse(uint16_t handle, EM_ARG_VEC(tail))
{
    if (auto parser = g_qmc2_footer_parser.get(handle))
    {
        return g_qmc2_footer_result.add(parser->Parse(EM_VEC_PTR_LEN(tail)));
    }

    return 0;
}

void qmcv2_footer_parser_delete(uint16_t handle)
{
    g_qmc2_footer_parser.close(handle);
}

std::string qmcv2_footer_result_get_media_name(uint16_t handle)
{
    if (auto result = g_qmc2_footer_result.get(handle))
    {
        return result->media_file_name;
    }
    return {};
}

uint32_t qmcv2_footer_result_get_state(uint16_t handle)
{
    if (auto result = g_qmc2_footer_result.get(handle))
    {
        return static_cast<uint32_t>(result->state);
    }
    return 0xff;
}

size_t qmcv2_footer_result_get_footer_size(uint16_t handle)
{
    if (auto result = g_qmc2_footer_result.get(handle))
    {
        return result->footer_size;
    }
    return {};
}

uintptr_t qmcv2_footer_result_get_ekey(uint16_t handle)
{
    if (auto result = g_qmc2_footer_result.get(handle))
    {
        return MakeSizedVector(result->key);
    }

    return {};
}

void qmcv2_footer_result_delete(uint16_t handle)
{
    g_qmc2_footer_result.close(handle);
}

EMSCRIPTEN_BINDINGS(EM__CryptoQMC_FooterParser)
{
    function("qmcv2_footer_parser_new", &qmcv2_footer_parser_new);
    function("qmcv2_footer_parser_delete", &qmcv2_footer_parser_delete);

    function("qmcv2_footer_parse", &qmcv2_footer_parse);
    function("qmcv2_footer_result_get_state", &qmcv2_footer_result_get_state);
    function("qmcv2_footer_result_get_media_name", &qmcv2_footer_result_get_media_name);
    function("qmcv2_footer_result_get_footer_size", &qmcv2_footer_result_get_footer_size);
    function("qmcv2_footer_result_get_ekey", &qmcv2_footer_result_get_ekey);
    function("qmcv2_footer_result_delete", &qmcv2_footer_result_delete);
}
