import InputSetter from './InputSetter.vue';
import SelectSetter from './SelectSetter.vue';
import ExpressionSetter from './ExpressionSetter.vue';
import JSONSetter from './JSONSetter.vue';
import FunctionSetter from './FunctionSetter.vue';
import BooleanSetter from './BooleanSetter.vue';
import ColorSetter from './ColorSetter.vue';
import NumberSetter from './NumberSetter.vue';
import IconSetter from './IconSetter.vue';

export interface SetterConfig {
  name: string;
  component: any;
  dataType: string;
}

export const buildInSetters: Record<string, any> = {
  StringSetter: InputSetter,
  InputSetter,
  SelectSetter,
  OptionSetter: SelectSetter,
  ExpressionSetter,
  JSONSetter,
  FunctionSetter,
  BooleanSetter,
  ColorSetter,
  NumberSetter,
  IconSetter
};

export const SetterValueTypes: Record<string, string[]> = {
  string: ['InputSetter', 'SelectSetter'],
  number: ['NumberSetter'],
  boolean: ['BooleanSetter'],
  object: ['JSONSetter'],
  function: ['FunctionSetter'],
  array: ['JSONSetter'],
  JSFunction: ['FunctionSetter'],
  JSExpression: ['ExpressionSetter']
};
