import { setters } from '../../components/setters';
import { type SetterConfig } from '../../framework';

export const builtInSetters: Array<SetterConfig> = [
  {
    name: 'StringSetter',
    component: setters.StringSetter,
    dataType: 'String'
  },
  {
    name: 'BooleanSetter',
    component: setters.BooleanSetter,
    dataType: 'Boolean'
  }
];
