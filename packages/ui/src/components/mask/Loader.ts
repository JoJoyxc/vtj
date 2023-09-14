import { defineComponent, h, MaybeRef, unref } from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { upperFirstCamelCase } from '@vtj/utils';
import { MaskTab } from './types';
import { createDialog } from '../../';
export class Loader {
  loaders: Map<string, any> = new Map();
  instances: Map<string, any> = new Map();
  constructor() {}
  createVNode(
    component: any,
    route: RouteLocationNormalizedLoaded,
    tab: MaskTab
  ) {
    const { loaders } = this;
    const name = upperFirstCamelCase(route.fullPath);
    let wrapper;
    if (loaders.has(name)) {
      wrapper = loaders.get(name);
    } else {
      wrapper = defineComponent({
        name,
        render() {
          return h(component, {
            ref: name,
            ...route.query
          });
        },
        deactivated() {
          if (tab && tab.dialog) {
            createDialog({
              title: tab.title,
              icon: tab.icon,
              modal: false,
              resizable: true,
              draggable: true,
              componentInstance: this,
              ...tab.dialog
            });
          }
        }
      });
      loaders.set(name, wrapper);
    }
    return h(wrapper);
  }
}
