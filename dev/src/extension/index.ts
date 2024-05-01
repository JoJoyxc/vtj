import { widgetManager, type AppWidget, type ExtensionFactory } from '@vtj/pro';
import { type App } from 'vue';
import { VtjIconDatabase } from '@vtj/icons';
import Meta from './Meta.vue';

const meta: AppWidget = {
  type: 'app',
  label: '数据配置',
  name: 'Meta',
  region: 'Apps',
  openType: 'panel',
  icon: VtjIconDatabase,
  component: Meta,
  order: 5
};
widgetManager.register(meta);

const factory: ExtensionFactory = () => {
  return {
    install(app: App) {}
  };
};

export default factory;
