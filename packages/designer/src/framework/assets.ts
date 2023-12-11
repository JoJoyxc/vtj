import type {
  Material,
  MaterialCategory,
  MaterialDescription
} from '@vtj/core';
import { arrayToMap } from '@vtj/utils';
import { builtInMaterials } from '../managers/built-in';

export interface AssetGroup {
  name: string;
  label: string;
  count: number;
  components?: MaterialDescription[];
  children?: AssetGroup[];
}

export class Assets {
  components: MaterialDescription[] = [];
  componentMap: Map<string, MaterialDescription> = new Map();
  groups: AssetGroup[] = [];
  constructor() {
    console.log(builtInMaterials);
  }

  private getCateoryComponents(
    cateory: MaterialCategory,
    components: MaterialDescription[]
  ) {
    const items = components.filter(
      (n) => n.categoryId === cateory.id && n.hidden !== true
    );
    return {
      name: cateory.id,
      label: cateory.category,
      count: items.length,
      components: items
    } as AssetGroup;
  }

  private parseGroups(materials: Material[]) {
    const result: AssetGroup[] = [];
    for (let pkg of materials) {
      const { categories, components, label, name } = pkg;
      if (!categories || !components) {
        continue;
      }
      const children: AssetGroup[] = categories.map((c) =>
        this.getCateoryComponents(c, components)
      );
      const total = children.reduce((p, n) => {
        return n.count + p;
      }, 0);

      const group: AssetGroup = {
        name: pkg.name,
        label: label || name,
        count: total,
        children
      };
      result.push(group);
    }
    return result;
  }

  load(materials: Material[]) {
    const packages = [...builtInMaterials, ...materials].filter((n) => !!n);
    packages.sort((a, b) => a.order - b.order);
    for (let pkg of packages) {
      if (pkg.components) {
        this.components = this.components.concat(pkg.components);
      }
    }
    this.groups = this.parseGroups(packages);
    this.componentMap = arrayToMap(this.components, 'name');
  }
}
