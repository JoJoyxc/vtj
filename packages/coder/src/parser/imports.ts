import { type MaterialDescription, type PlatformType } from '@vtj/core';
import { dedupArray } from '@vtj/base';

export function parseImports(
  componentMap: Map<string, MaterialDescription>,
  components: string[] = [],
  importBlocks: string[] = [],
  collectImports: Record<string, Set<string>> = {},
  platform: PlatformType = 'web'
) {
  const uniH5 = '@dcloudio/uni-h5';
  const imports: Record<string, string[]> = {
    vue: ['defineComponent', 'reactive']
  };

  const uniComponents: string[] = [];

  for (const name of components) {
    const desc = componentMap.get(name.split(':')[0]);
    if (desc && desc.package) {
      const items = imports[desc.package] ?? (imports[desc.package] = []);
      const item = desc.parent || (desc.alias || '').split('.')[0] || desc.name;
      items.push(item);
      if (platform === 'uniapp' && desc.package === uniH5) {
        uniComponents.push(item);
      }
    }
  }

  for (const [name, value] of Object.entries(collectImports)) {
    const items = imports[name] ?? (imports[name] = []);
    items.push(...Array.from(value));
    if (platform === 'uniapp' && name === uniH5) {
      uniComponents.push(...Array.from(value));
    }
  }

  const result = Object.entries(imports)
    .filter(([name, values]) => {
      return platform === 'uniapp'
        ? name !== uniH5 && !!values.length
        : !!values.length;
    })
    .map(([name, values]) => {
      return `import { ${(dedupArray(values) as string[]).join(
        ','
      )}} from '${name}';`;
    })
    .concat(importBlocks);

  return {
    imports: result,
    uniComponents
  };
}
