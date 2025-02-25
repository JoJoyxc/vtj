import { ContextMode } from '@vtj/renderer';

export function createModules(mode: ContextMode = ContextMode.Runtime) {
  if (mode === ContextMode.Runtime || process.env.NODE_ENV === 'development') {
    return import.meta.glob([
      '/.vtj/projects/*.json',
      '/.vtj/files/*.json',
      '/src/pages/*.vue'
    ]);
  } else {
    return import.meta.glob(['/.vtj/projects/*.json', '/src/pages/*.vue']);
  }
}
