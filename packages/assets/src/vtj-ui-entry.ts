import Element from './ui/Element';

import { AssetsCategory } from '@vtj/engine';
const categories: AssetsCategory[] = [
  {
    id: 'base',
    category: '元件'
  }
];
const components = [Element];
export default { name: 'vtj-ui', label: 'UI', categories, components };
