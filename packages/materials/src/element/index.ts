import type {
  Material,
  MaterialCategory,
  MaterialDescription
} from '@vtj/core';
import { version } from '../version';
import button from './button';

const components: MaterialDescription[] = [...button];

const categories: MaterialCategory[] = [
  {
    id: 'base',
    category: '基础组件'
  },
  {
    id: 'layout',
    category: '排版布局'
  },
  {
    id: 'form',
    category: '表单组件'
  },
  {
    id: 'data',
    category: '数据展示'
  },
  {
    id: 'nav',
    category: '导航'
  },
  {
    id: 'other',
    category: '其他'
  }
];

const material: Material = {
  name: 'element-plus',
  version: version,
  label: 'Element+',
  library: 'ElementPlusMaterial',
  order: 2,
  categories,
  components
};

export default material;
