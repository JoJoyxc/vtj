import type {
  Material,
  MaterialCategory,
  MaterialDescription
} from '@vtj/core';
import { setPackageName } from '../shared';
import { version } from '../version';

import buttton from './button';

const name = 'vant';
const components: MaterialDescription[] = [buttton].flat();

const categories: MaterialCategory[] = [
  {
    id: 'base',
    category: '基础组件'
  },
  {
    id: 'form',
    category: '表单组件'
  },
  {
    id: 'feedback',
    category: '反馈组件'
  },
  {
    id: 'view',
    category: '展示组件'
  },
  {
    id: 'nav',
    category: '导航组件'
  },
  {
    id: 'business',
    category: '业务组件'
  }
];

const material: Material = {
  name: 'vant',
  version,
  label: 'Vant',
  library: 'VantMaterial',
  order: 1,
  categories,
  components: setPackageName(components, name)
};

export default material;
