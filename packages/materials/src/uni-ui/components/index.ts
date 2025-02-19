import type {
  Material,
  MaterialCategory,
  MaterialDescription
} from '@vtj/core';
import { version } from '../../version';
import { setPackageName } from '../../shared';
import badge from './badge';

const name = '@dcloudio/uni-ui';
const components: MaterialDescription[] = [badge].flat();

const categories: MaterialCategory[] = [
  {
    id: 'ext',
    category: '扩展组件'
  }
];

const material: Material = {
  name,
  version,
  label: 'UniUI',
  library: 'UniUIMaterial',
  order: 5,
  categories,
  components: setPackageName(components, name)
};

export default material;
