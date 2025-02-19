import type { App } from 'vue';

import UniBadge from '@dcloudio/uni-ui/lib/uni-badge/uni-badge.vue';
import UniBreadcrumb from '@dcloudio/uni-ui/lib/uni-breadcrumb/uni-breadcrumb.vue';
import UniBreadcrumbItem from '@dcloudio/uni-ui/lib/uni-breadcrumb-item/uni-breadcrumb-item.vue';

const components = {
  UniBadge,
  UniBreadcrumb,
  UniBreadcrumbItem
};

export { UniBadge, UniBreadcrumb, UniBreadcrumbItem };

export function install(app: App) {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
  });
}
