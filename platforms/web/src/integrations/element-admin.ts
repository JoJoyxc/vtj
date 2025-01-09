import type { App } from 'vue';
import type { Router, RouteRecordRaw } from 'vue-router';
import { kebabCase } from '@vtj/utils';
import { autoUpdate } from '@vtj/ui';
import type { ProjectSchema, PageFile } from '@vtj/core';
import {
  createProvider,
  LocalService,
  NodeEnv,
  ContextMode,
  notify,
  loading,
  createAdapter,
  createServiceRequest
} from '../renderer';
import { createModules } from '../modules';

export interface SetupElementAdminOptions {
  id: string;
  app: App;
  ready?: () => void;
}

export interface setupElementAdminRoutesOptions {
  id: string;
  router: Router;
  routes: any[];
  layout: any;
}

function toElIcon(icon?: string) {
  return icon ? `vi-ep:${kebabCase(icon)}` : undefined;
}

function createPageRoute(page: PageFile) {
  const { id, title, icon, hidden, cache = false, meta = {} } = page;
  return {
    path: `page/${id}`,
    name: `Page_${id}`,
    component: () => import(`$vtj/vue/${id}.vue`),
    meta: {
      title,
      hidden,
      icon: toElIcon(icon),
      noCache: !cache,
      ...meta
    }
  };
}

function createNoMaskRoute(page: PageFile) {
  const { id, title, icon, cache = false, meta = {} } = page;
  return {
    path: `/page/${id}`,
    component: () => import(`$vtj/vue/${id}.vue`),
    meta: {
      title,
      icon: toElIcon(icon),
      hidden: true,
      noCache: !cache,
      ...meta
    }
  };
}

function childrenToRoutes(
  children: PageFile[] = [],
  noMask: any[]
): RouteRecordRaw[] {
  return children.map((child) => {
    const { id, dir, mask = true, title, icon, hidden } = child;
    if (dir) {
      return {
        path: '',
        name: `Dir_${id}`,
        redirect: `/page/${id}`,
        meta: {
          hidden,
          title,
          alwaysShow: true,
          icon: toElIcon(icon)
        },
        children: childrenToRoutes(child.children, noMask)
      };
    }
    if (!mask) {
      noMask.push(createNoMaskRoute(child));
    }
    return createPageRoute(child);
  });
}

function pagesToRoutes(pages: PageFile[], layout: any) {
  const noMask: any[] = [];
  const items: any[] = [];
  for (const page of pages) {
    const { id, dir, mask = true, title, icon, hidden, children = [] } = page;
    if (!dir && !mask) {
      noMask.push(createNoMaskRoute(page));
    }

    if (children.length) {
      items.push({
        path: '/',
        name: `Root_${id}`,
        component: layout,
        meta: {
          hidden,
          title,
          alwaysShow: true,
          icon: toElIcon(icon)
        },
        children: childrenToRoutes(children, noMask)
      });
    } else {
      items.push({
        path: '/',
        name: `Root_${id}`,
        component: layout,
        meta: {
          hidden,
          title,
          alwaysShow: !!dir,
          icon: toElIcon(icon)
        },
        children: dir ? [] : [createPageRoute(page)]
      });
    }
  }
  return [...noMask, ...items];
}

export function setupElementAdmin(options: SetupElementAdminOptions) {
  const { id, app, ready } = options;
  const adapter = createAdapter({ loading, notify });
  const service = new LocalService(createServiceRequest(notify));
  const modules = createModules();
  const { provider, onReady } = createProvider({
    nodeEnv: process.env.NODE_ENV as NodeEnv,
    mode: ContextMode.Raw,
    modules,
    adapter,
    service,
    dependencies: {
      Vue: () => import('vue'),
      VueRouter: () => import('vue-router')
    },
    project: {
      id
    }
  });

  onReady(async () => {
    app.use(provider);
    ready && ready();
  });

  if (process.env.NODE_ENV === 'production') {
    autoUpdate();
  }
}

export async function setupElementAdminRoutes(
  options: setupElementAdminRoutesOptions
) {
  const modules = createModules();
  const { id, layout, routes, router } = options;
  const loader = modules[`.vtj/projects/${id}.json`];
  if (loader) {
    const project = ((await loader()) as any).default as ProjectSchema;
    const pages = project.pages || [];
    const pageRoutes = pagesToRoutes(pages, layout);
    console.log(pageRoutes);
    routes.unshift(...pageRoutes);
    routes.forEach((item) => {
      router.addRoute(item);
    });
  }
}
