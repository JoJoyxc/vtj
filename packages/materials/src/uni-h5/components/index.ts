import type {
  Material,
  MaterialCategory,
  MaterialDescription
} from '@vtj/core';
import { version } from '../../version';
import { setPackageName } from '../../shared';
import view from './view';

const name = '@dcloudio/uni-h5';
const components: MaterialDescription[] = [view].flat();

const categories: MaterialCategory[] = [
  {
    id: 'container',
    category: '视图组件'
  }
];

const material: Material = {
  name,
  version,
  label: 'UniApp',
  library: 'UniH5Material',
  order: 4,
  categories,
  components: setPackageName(components, name)
};

export default material;
