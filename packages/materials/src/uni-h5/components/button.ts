import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'Button',
  label: '按钮',
  categoryId: 'form',
  props: [
    {
      name: 'type',
      label: 'type'
    }
  ],
  snippet: {
    children: 'Button'
  }
};

export default desc;
