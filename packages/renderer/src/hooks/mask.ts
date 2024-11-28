import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import type { MenuDataItem } from '@vtj/ui';
import type { PageFile } from '@vtj/core';
import { useProvider } from '../provider';
import { useAccess, type Access } from '../plugins';
import { PAGE_ROUTE_NAME, HOMEPAGE_ROUTE_NAME } from '../constants';

export interface UseMaskOptions {
  menuBasePath?: string;
}

function createMenus(basePath: string, pages: PageFile[] = []): MenuDataItem[] {
  return pages.map((page) => {
    const { id, title, icon, children, hidden } = page;
    const menu: MenuDataItem = {
      id,
      title,
      icon,
      hidden,
      url: `${basePath}/${id}`,
      children:
        children && children.length
          ? createMenus(basePath, children)
          : undefined
    };
    return menu;
  });
}

function menusFilter(menus: MenuDataItem[], access?: Access): MenuDataItem[] {
  if (!access) return menus;
  let result: MenuDataItem[] = [];

  for (const menu of menus) {
    if (menu.children && menu.children.length) {
      const childArray = menusFilter(menu.children, access);
      if (childArray.length) {
        menu.children = childArray;
        result.push(menu);
      }
    } else {
      if (access.can(menu.id.toString())) {
        result.push(menu);
      }
    }
  }

  return result;
}

export function useMask(options?: UseMaskOptions) {
  const { menuBasePath = '/page' } = options || {};
  const provider = useProvider();
  const route = useRoute();
  const access = useAccess();
  const disabled = ref(false);
  const pure = ref(false);
  const project = provider.project;
  watchEffect(() => {
    const { name, params, meta } = route;
    if (name === PAGE_ROUTE_NAME) {
      const page = provider.getPage(params.id as string);
      disabled.value = !page?.mask;
      pure.value = !!page?.pure;
    } else if (name === HOMEPAGE_ROUTE_NAME) {
      const page = provider.getHomepage();
      disabled.value = !page?.mask;
      pure.value = !!page?.pure;
    } else {
      disabled.value = !meta.mask;
      pure.value = !!meta.pure;
    }
  });

  const menus: MenuDataItem[] = createMenus(menuBasePath, project?.pages);
  const config = project?.config;
  return {
    disabled,
    logo: config?.logo,
    themeSwitchable: config?.themeSwitchable,
    title: config?.title || project?.description || project?.name || 'VTJ App',
    menus: menusFilter(menus, access),
    pure
  };
}
