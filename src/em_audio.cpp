#include <parakeet-audio/detect_audio_type.h>

#include <cstdint>
#include <cstdlib>
#include <memory>
#include <string>

#include <emscripten.h>
#include <emscripten/bind.h>
#include <emscripten/val.h>
#include <vector>

using namespace emscripten;

std::string detect_audio_type(uintptr_t buffer, size_t len) {
    return std::string(parakeet_audio::DetectAudioExtension(reinterpret_cast<const uint8_t*>(buffer), len));
}

EMSCRIPTEN_BINDINGS(EM__Audio) {
  function("detect_audio_type", &detect_audio_type);
}
