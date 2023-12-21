#include "factory.h"
#include "helper.h"

#include <cstdint>
#include <parakeet-crypto/qingting_fm/device_key.h>
#include <parakeet-crypto/transformer/qingting_fm.h>
#include <parakeet-crypto/utils/hex.h>

#include <emscripten/bind.h>

using namespace emscripten;
using namespace parakeet_crypto;

uint16_t create_qtfm_by_key(std::string name, std::string secret_key)
{
    auto secret_key_bytes = utils::UnHex(secret_key.c_str());
    return g_transformer_registry.add(
        transformer::CreateAndroidQingTingFMTransformer(name.c_str(), secret_key_bytes.data()));
}

uint16_t create_qtfm_by_device_id(std::string filename, std::string product, std::string device,
                                  std::string manufacturer, std::string brand, std::string board, std::string model)
{
    return g_transformer_registry.add(transformer::CreateAndroidQingTingFMTransformer(
        filename.c_str(), product.c_str(), device.c_str(), manufacturer.c_str(), brand.c_str(), board.c_str(),
        model.c_str()));
}

std::string qtfm_to_device_key(std::string product, std::string device, std::string manufacturer, std::string brand,
                               std::string board, std::string model)
{
    auto secret_key = qtfm::CreateDeviceSecretKey(product, device, manufacturer, brand, board, model);
    return utils::Hex(secret_key.data(), secret_key.size(), false);
}

EMSCRIPTEN_BINDINGS(EM__CryptoQingTingFM)
{
    function("create_qtfm_by_key", &create_qtfm_by_key);
    function("create_qtfm_by_device_id", &create_qtfm_by_device_id);
    function("qtfm_to_device_key", &qtfm_to_device_key);
}
