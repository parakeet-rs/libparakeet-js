#include "factory.h"

TransformerRegistry<parakeet_crypto::ITransformer> g_transformer_registry;
TransformerRegistry<parakeet_crypto::qmc2::QMCFooterParser> g_qmc2_footer_parser;
TransformerRegistry<parakeet_crypto::qmc2::IKeyCrypto> g_key_crypto;
