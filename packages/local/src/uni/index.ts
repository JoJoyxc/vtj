import type { ProjectSchema } from '@vtj/core';
import { manifestJson as defaultManifestJson } from './manifest';
import { pagesJson as defaultPagesJson } from './pages';
import { resolve } from 'path';
import { readJsonSync, pathExistsSync } from '@vtj/node';

function getJson(name: string, dsl: ProjectSchema) {
  const map: Record<string, string> = {
    manifestJson: 'manifest.json',
    pagesJson: 'pages.json'
  };
  const defaults: Record<string, any> = {
    manifestJson: defaultManifestJson,
    pagesJson: defaultPagesJson
  };
  const file = map[name];
  const filePath = resolve('./src', file);
  if (pathExistsSync(filePath)) {
    return readJsonSync(filePath);
  }
  const uniConfig: Record<string, any> = dsl.uniConfig || {};
  return uniConfig[name] || defaults[name];
}

export function getUniConfig(dsl: ProjectSchema) {
  const manifestJson: Record<string, any> = getJson('manifestJson', dsl);
  const pagesJson: Record<string, any> = getJson('pagesJson', dsl);
  const { name, id, description } = dsl;
  Object.assign(manifestJson, {
    name: name,
    appid: id?.replace(/\//, '__'),
    description: description
  });
  return {
    ...dsl.uniConfig,
    manifestJson,
    pagesJson
  };
}
