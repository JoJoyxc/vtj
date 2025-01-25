import type { App } from 'vue';
//@ts-ignore
import { View } from '@dcloudio/uni-h5';

const components = {
  View
};

export { View };

export function install(app: App) {
  Object.entries(components).forEach(([k, v]) => {
    app.component(k, v);
  });
}
