import { resolve } from 'path';
import type { ProjectSchema } from '@vtj/core';
import { writeJsonSync, outputFileSync } from '@vtj/node';
import { vueFormatter, tsFormatter } from '@vtj/coder';

export const APP_LIFE_CYCLE = [
  'onLaunch',
  'onShow',
  'onHide',
  'onError',
  'onPageNotFound',
  'onUnhandledRejection',
  'onThemeChange',
  'onPageNotFound',
  'onUniNViewMessage',
  'onExit'
];

const vueAppTempalte = `
<script setup lang="ts">
  {{ts}}
</script>
<style></style>
`;

export class UniRepository {
  constructor() {}

  createProjectPages(project: ProjectSchema) {
    const oPages = (project.uniConfig?.pagesJson?.pages || []).filter(
      (n: any) => !n.vtj
    );
    const pages = project.pages || [];

    const json: any[] = [];
    for (const page of pages) {
      if (page.id === project.homepage) {
        json.unshift({
          path: `pages/${page.id}`,
          style: page.style || {},
          needLogin: page.needLogin,
          vtj: true
        });
      } else {
        json.push({
          path: `pages/${page.id}`,
          style: page.style || {},
          needLogin: page.needLogin,
          vtj: true
        });
      }
    }
    for (const item of oPages) {
      const exist = json.find((n) => n.path === item.path);
      if (!exist) {
        json.push(item);
      }
    }
    return json;
  }

  savePagesJson(project: ProjectSchema) {
    const pages = this.createProjectPages(project);
    const { pagesJson = {} } = project.uniConfig || {};
    const filePath = resolve('src/pages.json');
    pagesJson.pages = pages;
    writeJsonSync(filePath, pagesJson, {
      spaces: 2,
      EOL: '\n'
    });
    return true;
  }

  saveManifestJson(project: ProjectSchema) {
    const { manifestJson } = project.uniConfig || {};
    const filePath = resolve('src/manifest.json');
    writeJsonSync(filePath, manifestJson, {
      spaces: 2,
      EOL: '\n'
    });
    return true;
  }

  async saveApp(project: ProjectSchema) {
    const filePath = resolve('src/App.vue');
    const uniConfig = project.uniConfig || {};
    const names: string[] = [];
    const content: string[] = [];
    for (const [name, value] of Object.entries(uniConfig)) {
      if (APP_LIFE_CYCLE.includes(name) && value.value) {
        names.push(name);
        content.push(`${name}(${value.value})`);
      }
    }
    const tsCode = names.length
      ? `import {${names.join(',')}} from '@dcloudio/uni-app';${content.join(';\n')}`
      : '';

    const result = vueAppTempalte.replace('{{ts}}', await tsFormatter(tsCode));
    outputFileSync(filePath, await vueFormatter(result), 'utf-8');
  }
}
