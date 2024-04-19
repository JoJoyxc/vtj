import { type DefineComponent } from 'vue';
import { type MaterialDescription } from './assets';

export interface BlockPlugin {
  block: DefineComponent<any, any, any, any> | Record<string, any>;
  material: MaterialDescription;
}
