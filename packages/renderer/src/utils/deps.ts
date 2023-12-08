import type { Dependencie } from '@vtj/core';

export function isCSSUrl(url: string): boolean {
  return /\.css$/.test(url);
}

export function isJSUrl(url: string): boolean {
  return /\.js$/.test(url);
}
export function createAssetScripts(scripts: string[]): string {
  return scripts.map((url) => `<script src="${url}"></script>`).join('');
}

export function createAssetsCss(css: string[] = []) {
  return css.map((url) => `<link rel="stylesheet" href="${url}" />`).join('');
}

export function parseDeps(deps: Dependencie[]) {
  const packages = deps.filter((n) => !!n.enabled);
  const scripts: string[] = [];
  const css: string[] = [];
  packages.forEach(({ urls }) => {
    urls?.forEach((url) => {
      if (isJSUrl(url)) {
        scripts.push(url);
      }
      if (isCSSUrl(url)) {
        css.push(url);
      }
    });
  });
  return {
    scripts,
    css
  };
}
