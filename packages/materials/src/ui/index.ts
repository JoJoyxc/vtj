import type {
  Material,
  MaterialCategory,
  MaterialDescription
} from '@vtj/core';
import { version } from '../version';
import icon from './icon';

const components: MaterialDescription[] = [icon];

const categories: MaterialCategory[] = [
  {
    id: 'base',
    category: '基础元件'
  },
  {
    id: 'layout',
    category: '布局排版'
  },
  {
    id: 'form',
    category: '表单'
  },
  {
    id: 'data',
    category: '数据展示'
  }
];

const material: Material = {
  name: '@vtj/ui',
  version,
  label: 'UI',
  library: 'VtjUIMaterial',
  order: 1,
  categories,
  components
};

export default material;
