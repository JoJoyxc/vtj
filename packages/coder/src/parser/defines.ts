import { type NodeFromUrlSchema, type NodeFromPlugin } from '@vtj/core';

export function parseUrlSchemas(
  urlSchemas: Record<string, NodeFromUrlSchema> = {}
) {
  const result: string[] = [];
  Object.entries(urlSchemas).forEach(([name, from]) => {
    result.push(
      `const ${name} = provider.defineUrlSchemaComponent('${from.url}');`
    );
  });
  return result;
}

export function parseBlockPlugins(
  plugins: Record<string, NodeFromPlugin> = {}
) {
  const result: string[] = [];
  Object.entries(plugins).forEach(([name, from]) => {
    result.push(
      `const ${name} = provider.definePluginComponent(${JSON.stringify(from)});`
    );
  });
  return result;
}

// export function parseRendererImports(
//   urlSchemas: Record<string, NodeFromUrlSchema> = {},
//   plugins: Record<string, NodeFromPlugin> = {}
// ) {
//   const result: string[] = [];
//   if (Object.keys(urlSchemas).length) {
//     result.push('defineUrlSchemaComponent');
//   }
//   if (Object.keys(plugins).length) {
//     result.push('definePluginComponent');
//   }
//   return result;
// }