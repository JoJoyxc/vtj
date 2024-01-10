import { VTJ_UTILS_VERSION, isClient } from './utils';
import { VTJ_ICONS_VERSION } from './icons';
import { VTJ_UI_VERSION } from './ui';
import { VTJ_RENDERER_VERSION } from './renderer';

const __VTJ_Web__ = {
  VTJ_UTILS_VERSION,
  VTJ_ICONS_VERSION,
  VTJ_UI_VERSION,
  VTJ_RENDERER_VERSION
};

declare global {
  interface Window {
    __VTJ_Web__: typeof __VTJ_Web__;
  }
}

if (isClient) {
  window.__VTJ_Web__ = __VTJ_Web__;
}

export * from './utils';
export * from './icons';
export * from './ui';
export * from './renderer';
