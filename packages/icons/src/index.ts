import './style.scss';
import { App, defineComponent, createVNode } from 'vue';
import { glyphs } from './iconfont/iconfont.json';
import * as svgIcons from './components';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
export * from './components';
export interface Icon {
  label: string;
  value: string;
  unicode: string;
}

const createIconComponent = (name: string) => {
  return defineComponent({
    name,
    render() {
      return createVNode('i', { class: name });
    }
  });
};

const icons: Icon[] = glyphs.map((item) => {
  return {
    label: item.name,
    value: `vtj-icon-${item.font_class}`,
    unicode: item.unicode
  };
});

const components: Record<string, any> = {
  ...ElementPlusIconsVue,
  ...svgIcons
};

for (const item of icons) {
  components[item.value] = createIconComponent(item.value);
}

const install = (app: App) => {
  for (const [key, component] of Object.entries(components)) {
    app.component(key, component as any);
  }
};

export { icons, components, install };
