import type { CreateViteConfigOptions } from './types';
import { type PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import basicSsl from '@vitejs/plugin-basic-ssl';
import dts from 'vite-plugin-dts';
import { visualizer } from 'rollup-plugin-visualizer';
import ElementPlus from 'unplugin-element-plus/vite';
import { removeSync, toArray } from '@vtj/node';
import { babelPlugin, versionPlugin, staticServer } from '../plugins';

const createBabelPlugin = (targets: string[]) => {
  return babelPlugin({
    apply: 'build',
    babelConfig: {
      presets: [
        [
          '@babel/preset-env',
          { targets: targets, modules: false, useBuiltIns: false }
        ]
      ]
    }
  });
};

export const mergePlugins = (opts: CreateViteConfigOptions) => {
  const plugins: PluginOption[] = opts.uniapp ? [] : [vue(), vueJsx()];

  if (opts.version) {
    plugins.push(versionPlugin());
  }

  if (opts.babel && !opts.uniapp && opts.targets) {
    plugins.push(createBabelPlugin(toArray(opts.targets)));
  }

  if (opts.elementPlus && !opts.uniapp) {
    plugins.push(
      ElementPlus(typeof opts.elementPlus === 'object' ? opts.elementPlus : {})
    );
  }

  if (opts.lib && opts.dts) {
    if (opts.dtsOutputDir) {
      try {
        removeSync(opts.dtsOutputDir);
      } catch (_e) {}
    }
    plugins.push(
      dts({
        outDir: opts.dtsOutputDir,
        staticImport: true,
        cleanVueFileName: true
      }) as PluginOption
    );
  }

  if (opts.https) {
    plugins.push(basicSsl() as PluginOption);
  }

  if (!opts.lib && !opts.uniapp) {
    plugins.push(
      legacy({
        targets: opts.targets,
        polyfills: opts.polyfills,
        renderLegacyChunks: !!opts.legacy
      }) as PluginOption
    );
  }

  if (opts.visualizer) {
    plugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true
      }) as any
    );
  }

  if (opts.staticDirs) {
    plugins.push(staticServer(opts.staticDirs));
  }

  if (opts.plugins) {
    plugins.push(...opts.plugins);
  }

  return plugins;
};
