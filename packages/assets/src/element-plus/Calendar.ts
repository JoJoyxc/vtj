import { ComponentDescription } from '@vtj/engine';
const Calendar: ComponentDescription = {
  name: 'ElCalendar',
  title: '日历',

  categoryId: 'data',
  doc: 'https://element-plus.org/zh-CN/component/calendar.html',
  package: 'element-plus',
  props: [
    {
      name: 'modelValue',
      defaultValue: '',
      setters: 'ExpressionSetter'
    },
    {
      name: 'range',
      defaultValue: '',
      setters: 'JSONSetter'
    }
  ],
  slots: [
    {
      name: 'date-cell'
    },
    {
      name: 'header'
    }
  ]
};

export default Calendar;
