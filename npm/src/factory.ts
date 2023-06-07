/**
 * @file
 * @deprecated
 */

import { LibParakeet, PARAKEET_CRYPTO_HANDLE } from './types';
import { QMCv2FooterParser } from './wrapper/QMCv2FooterParser';
import { Transformer } from './utils/Transformer';
import { createBuffer } from './utils/bufferHelper';

export function CreateQMCv1Transformer(mod: LibParakeet, key: ArrayBuffer | ArrayLike<number>) {
  const [key_ptr, key_len, free_key] = createBuffer(mod, key);
  try {
    return new Transformer(mod, mod.create_qmc_v1(key_ptr, key_len));
  } finally {
    free_key();
  }
}

export function CreateQMCv2Transformer(mod: LibParakeet, footerParser: QMCv2FooterParser | PARAKEET_CRYPTO_HANDLE) {
  const footerParserHandle = footerParser instanceof QMCv2FooterParser ? footerParser.handle : footerParser;
  return new Transformer(mod, mod.create_qmc_v2(footerParserHandle));
}

export function CreateQMCv2MAPTransformer(mod: LibParakeet, key: ArrayBuffer | ArrayLike<number>) {
  const [key_ptr, key_len, free_key] = createBuffer(mod, key);
  try {
    return new Transformer(mod, mod.create_qmc_v2_map(key_ptr, key_len));
  } finally {
    free_key();
  }
}

export function CreateQMCv2RC4Transformer(mod: LibParakeet, key: ArrayBuffer | ArrayLike<number>) {
  const [key_ptr, key_len, free_key] = createBuffer(mod, key);
  try {
    return new Transformer(mod, mod.create_qmc_v2_rc4(key_ptr, key_len));
  } finally {
    free_key();
  }
}
