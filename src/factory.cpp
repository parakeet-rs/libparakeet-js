#include "factory.h"

TransformerRegistry<parakeet_crypto::ITransformer> g_transformer_registry;
TransformerRegistry<parakeet_crypto::qmc2::QMCFooterParser> g_qmc2_footer_parser;
TransformerRegistry<parakeet_crypto::qmc2::IKeyCrypto> g_qmc2_key_crypto;
TransformerRegistry<parakeet_crypto::qmc2::FooterParseResult> g_qmc2_footer_result;
