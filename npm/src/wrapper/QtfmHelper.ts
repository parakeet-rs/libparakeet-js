import type { LibParakeet } from '../libparakeet';

export class QtfmHelper {
  constructor(public readonly mod: LibParakeet) {}

  createDeviceKey(product: string, device: string, manufacturer: string, brand: string, board: string, model: string) {
    return this.mod.qtfm_to_device_key(product, device, manufacturer, brand, board, model);
  }
}
