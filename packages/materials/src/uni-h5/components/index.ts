import type {
  Material,
  MaterialCategory,
  MaterialDescription
} from '@vtj/core';
import { version } from '../../version';
import { setPackageName } from '../../shared';
// container 视图容器
import view from './view';
import scrollView from './scrollView';

// Base 基础内容
import button from './button';

const name = '@dcloudio/uni-h5';
const components: MaterialDescription[] = [view, scrollView, button].flat();

const categories: MaterialCategory[] = [
  {
    id: 'container',
    category: '视图组件'
  },
  {
    id: 'form',
    category: '表单'
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
