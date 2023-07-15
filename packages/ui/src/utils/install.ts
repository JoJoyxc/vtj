import { NOOP } from './util';
import type { App, Directive, AppContext, Plugin } from 'vue';

export type WithInstall<T> = T & Plugin;

export type InstallWithContext<T> = WithInstall<T> & {
  _context: AppContext | null;
};

export const withInstall = <T, E extends Record<string, any>>(
  main: T,
  extra?: E
) => {
  (main as WithInstall<T>).install = (app): void => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      if (typeof comp === 'function') {
        app.use(comp);
      } else if (comp.name) {
        app.component(comp.name, comp);
      }
    }
  };

  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      (main as any)[key] = comp;
    }
  }
  return main as WithInstall<T> & E;
};

export const withInstallFunction = <T>(fn: T, name: string) => {
  (fn as WithInstall<T>).install = (app: App) => {
    (fn as InstallWithContext<T>)._context = app._context;
    app.config.globalProperties[name] = fn;
  };

  return fn as InstallWithContext<T>;
};

export const withInstallDirective = <T extends Directive>(
  directive: T,
  name: string
) => {
  (directive as WithInstall<T>).install = (app: App): void => {
    app.directive(name, directive);
  };

  return directive as WithInstall<T>;
};

export const withNoopInstall = <T>(component: T) => {
  (component as WithInstall<T>).install = NOOP;

  return component as WithInstall<T>;
};
