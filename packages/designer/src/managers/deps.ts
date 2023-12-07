import type { Dependencie } from '@vtj/core';
import { builtInDeps } from './built-in';

class DepsManager {
  constructor(private deps: Dependencie[] = builtInDeps) {}
  get() {
    return this.deps;
  }
  set(deps: Dependencie[]) {
    this.deps = deps;
  }
}

export const depsManager = new DepsManager();
