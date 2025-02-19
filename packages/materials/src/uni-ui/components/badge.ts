import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniBadge',
  label: '数字角标',
  categoryId: 'ext',
  props: [
    {
      name: 'text',
      title: '角标内容',
      setters: 'StringSetter'
    }
  ],
  snippet: {}
};

export default desc;
