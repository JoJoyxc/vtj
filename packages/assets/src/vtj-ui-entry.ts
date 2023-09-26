import Icon from './ui/Icon';
import Container from './ui/Container';

import { AssetsCategory } from '@vtj/engine';
const categories: AssetsCategory[] = [
  {
    id: 'base',
    category: '元件'
  }
];
const components = [Icon, Container];
export default { name: 'vtj-ui', label: 'UI', categories, components };
