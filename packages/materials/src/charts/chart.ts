import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'XChart',
  label: '图表',
  categoryId: 'base',
  props: [
    {
      name: 'option',
      label: 'option',
      title: 'ECharts option',
      setters: 'ObjectSetter'
    },
    {
      name: 'width',
      label: 'width',
      setters: ['StringNumber']
    },
    {
      name: 'height',
      label: 'height',
      setters: ['StringNumber']
    }
  ],
  snippet: {
    props: {
      width: '100%',
      height: '400px',
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      }
    }
  }
};

export default desc;