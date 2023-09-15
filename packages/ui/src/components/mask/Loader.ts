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
    const { loaders, instances } = this;
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
        mounted() {
          // console.log('createVNode', this);
          // instances.set(name, this);
        },
        deactivated() {
          if (tab && tab.dialog) {
            console.log('createDialog', this);
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
