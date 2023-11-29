#include "factory.h"
#include "helper.h"

#include <cstdint>
#include <parakeet-crypto/transformer/qingting_fm.h>

#include <emscripten/bind.h>

using namespace emscripten;
using namespace parakeet_crypto;

uint16_t create_qtfm_by_key(std::string name, uintptr_t secret_key)
{
    return g_transformer_registry.add(
        transformer::CreateAndroidQingTingFMTransformer(name.c_str(), reinterpret_cast<const uint8_t *>(secret_key)));
}

uint16_t create_qtfm_by_device_id(std::string filename, std::string product, std::string device,
                                  std::string manufacturer, std::string brand, std::string board, std::string model)
{
    return g_transformer_registry.add(transformer::CreateAndroidQingTingFMTransformer(
        filename.c_str(), product.c_str(), device.c_str(), manufacturer.c_str(), brand.c_str(), board.c_str(),
        model.c_str()));
}

EMSCRIPTEN_BINDINGS(EM__CryptoQingTingFM)
{
    function("create_qtfm_by_key", &create_qtfm_by_key);
    function("create_qtfm_by_device_id", &create_qtfm_by_device_id);
}
