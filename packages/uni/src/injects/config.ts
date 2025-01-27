// export function normalizeAppUniConfig(
//   pagesJson: UniApp.PagesJson,
//   manifestJson: Record<string, any>
// ) {
//   const { autoclose, alwaysShowBeforeRender } = getSplashscreen(manifestJson)
//   const platformConfig = getPlatformManifestJsonOnce()

//   const config: AppUniConfig = {
//     pages: [],
//     globalStyle: pagesJson.globalStyle,
//     nvue: {
//       compiler: getNVueCompiler(manifestJson),
//       styleCompiler: getNVueStyleCompiler(manifestJson),
//       'flex-direction': getNVueFlexDirection(manifestJson),
//     },
//     renderer:
//       manifestJson['app-plus']?.renderer === 'native' ? 'native' : 'auto',
//     appname: manifestJson.name || '',
//     splashscreen: {
//       alwaysShowBeforeRender,
//       autoclose,
//     },
//     compilerVersion: process.env.UNI_COMPILER_VERSION,
//     ...parseEntryPagePath(pagesJson),
//     networkTimeout: normalizeNetworkTimeout(manifestJson.networkTimeout),
//     tabBar: pagesJson.tabBar,
//     fallbackLocale: manifestJson.fallbackLocale,
//     locales: initLocales(path.join(process.env.UNI_INPUT_DIR, 'locale')),
//     darkmode: platformConfig.darkmode || false,
//     themeConfig: normalizeThemeConfigOnce(platformConfig),
//     // @ts-expect-error
//     qqMapKey: platformConfig?.distribute?.sdkConfigs?.maps?.tencent?.key,
//   }
//   // TODO 待支持分包
//   return JSON.stringify(config)
// }
import type { SetupUniAppOptions } from '../types';
import { getNavigationBar, getGobalStyle } from '../utils';
// import pkg from '../../../../node_modules/@dcloudio/vite-plugin-uni/package.json';
// console.log('pkg', pkg['uni-app']);

export function injectUniConfig(
  options: SetupUniAppOptions,
  global: any = window
) {
  const { pagesJson = {}, manifestJson = {} } = options;
  const { easycom = {} } = pagesJson;
  const {
    appid = '',
    name = '',
    versionCode = '',
    versionName = ''
  } = manifestJson;

  const globalStyle = pagesJson.globalStyle as Record<string, any>;
  const router = manifestJson.h5?.router || {};
  global.__uniConfig = {
    easycom,
    globalStyle: {
      ...getGobalStyle(globalStyle),
      navigationBar: getNavigationBar(globalStyle),
      isNVue: false
    },
    compilerVersion: '4.45',
    appId: appid,
    appName: name,
    appVersion: versionName,
    appVersionCode: String(versionCode),
    async: {
      loading: 'AsyncLoading',
      error: 'AsyncError',
      delay: 200,
      timeout: 60000,
      suspensible: true,
      ...(manifestJson.h5?.async || {})
    },
    debug: false,
    networkTimeout: {
      request: 60000,
      connectSocket: 60000,
      uploadFile: 60000,
      downloadFile: 60000,
      ...(manifestJson.networkTimeout || {})
    },
    sdkConfigs: {},
    nvue: {
      'flex-direction': 'column'
    },
    locale: '',
    fallbackLocale: '',
    locales: {},
    router: {
      mode: 'hash',
      base: '/',
      assets: 'assets',
      routerBase: router.base || '/',
      ...router
    },
    darkmode: false,
    themeConfig: {},
    tabBar: pagesJson.tabBar
  };
}
