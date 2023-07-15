import { Widget } from '../core';
import logo from './logo.png';
export const brand: Array<Widget> = [
  {
    name: 'logo',
    type: 'Logo',
    region: 'brand',
    props: {
      text: 'Tj',
      icon: logo
    }
  },
  {
    name: 'switcher',
    type: 'Switcher',
    region: 'brand',
    props: {
      link: '/'
    }
  }
];
