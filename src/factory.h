#pragma once
#include <parakeet-crypto/ITransformer.h>
#include <parakeet-crypto/qmc2/footer_parser.h>
#include <parakeet-crypto/qmc2/key_crypto.h>

#include <cstdint>
#include <memory>
#include <unordered_map>

template <typename T> class TransformerRegistry
{
  public:
    inline uint16_t add(std::shared_ptr<T> transformer)
    {
        // Make it seem random, doesn't really need to be random.
        uint16_t delta = static_cast<uint32_t>((uintptr_t)transformer.get()) >> 4;
        do
        {
            next_id_ += delta;
        } while (next_id_ != 0 && transformers_.find(next_id_) != transformers_.end());

        transformers_[next_id_] = transformer;
        return next_id_;
    }
    inline std::shared_ptr<T> get(uint16_t id)
    {
        auto it = transformers_.find(id);
        if (it == transformers_.end())
        {
            return nullptr;
        }
        else
        {
            return it->second;
        }
    }
    inline void close(uint16_t id)
    {
        transformers_.erase(id);
    }

  private:
    uint16_t next_id_ = 0;
    std::unordered_map<uint16_t, std::shared_ptr<T>> transformers_;
};

extern TransformerRegistry<parakeet_crypto::ITransformer> g_transformer_registry;

extern TransformerRegistry<parakeet_crypto::qmc2::QMCFooterParser> g_qmc2_footer_parser;

extern TransformerRegistry<parakeet_crypto::qmc2::IKeyCrypto> g_key_crypto;
