import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'Form',
  label: '表单',
  categoryId: 'basic',
  props: [
    {
      name: 'report-submit',
      title: '是否返回 formId 用于发送模板消息',
      setters: 'BooleanSetter'
    },
    {
      name: 'report-submit-timeout',
      title: '等待一段时间（毫秒数）以确认 formId 是否生效',
      setters: 'NumberSetter'
    }
  ],
  events: ['submit', 'reset'],
  snippet: {
    children: [{ name: 'View' }]
  }
};

export default desc;
