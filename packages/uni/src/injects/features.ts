import type { SetupUniAppOptions } from '../types';

function getRouterMode(manifest: Record<string, any>) {
  const webManifest = manifest.web || manifest.h5;
  let routerMode = 'hash';
  if (
    webManifest &&
    webManifest.router &&
    webManifest.router.mode === 'history'
  ) {
    routerMode = '"history"';
  }
  return routerMode;
}

function getWindows(manifest: Record<string, any>) {
  return {
    topWindow: !!manifest.topWindow?.path,
    leftWindow: !!manifest.leftWindow?.path,
    rightWindow: !!manifest.rightWindow?.path
  };
}

function getPullDownRefresh(options: SetupUniAppOptions) {
  const { routes = [], globalStyle = {} } = options;
  if (globalStyle.enablePullDownRefresh) {
    return true;
  }
  if (routes.find((page) => !!page.meta?.styleenablePullDownRefresh)) {
    return true;
  }
  return false;
}

function isNavigationCustom(options: SetupUniAppOptions) {
  const { routes = [], globalStyle = {} } = options;
  let isCustom = false;
  if (globalStyle.navigationBar.style === 'custom') {
    isCustom = true; // 全局custom
    if (
      routes.find(
        (page) => page.meta?.style?.navigationBar?.style === 'default'
      )
    ) {
      isCustom = false;
    }
  } else {
    // 所有页面均custom
    if (
      routes.every(
        (page) => page.meta?.style?.navigationBar?.style === 'custom'
      )
    ) {
      isCustom = true;
    }
  }
  return isCustom;
}

function getNavigationBar(options: SetupUniAppOptions) {
  const isCustom = isNavigationCustom(options);
  const features = {
    navigationBar: false,
    navigationBarButtons: false,
    navigationBarSearchInput: false,
    navigationBarTransparent: false
  };
  const { routes = [], globalStyle = {} } = options;
  if (isCustom) {
    return features;
  }
  if (
    !routes.find((page) => !!page.meta?.style?.navigationBar?.buttons?.length)
  ) {
    features.navigationBarButtons = false;
  }
  if (
    !globalStyle.navigationBar?.searchInput &&
    !routes.find((page) => !!page.meta?.style?.navigationBar?.searchInput)
  ) {
    features.navigationBarSearchInput = false;
  }
  if (
    globalStyle.navigationBar?.type !== 'transparent' &&
    !routes.find(
      (page) => page.meta?.style?.navigationBar?.type === 'transparent'
    )
  ) {
    features.navigationBarTransparent = false;
  }
  return features;
}

export function injectUniFeatures(
  options: SetupUniAppOptions,
  global: any = window
) {
  const { routes = [], tabBar, manifest = {} } = options;
  const { topWindow, leftWindow, rightWindow } = getWindows(manifest);
  const {
    navigationBar,
    navigationBarButtons,
    navigationBarSearchInput,
    navigationBarTransparent
  } = getNavigationBar(options);

  const features = {
    // vue
    __VUE_OPTIONS_API__: true, // enable/disable Options API support, default: true
    __VUE_PROD_DEVTOOLS__: false, // enable/disable devtools support in production, default: false
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    // uni
    __UNI_FEATURE_WX__: false, // 是否启用小程序的组件实例 API，如：selectComponent 等（uni-core/src/service/plugin/appConfig）
    __UNI_FEATURE_WXS__: false, // 是否启用 wxs 支持，如：getComponentDescriptor 等（uni-core/src/view/plugin/appConfig）
    __UNI_FEATURE_RPX__: false, // 是否启用运行时 rpx 支持
    __UNI_FEATURE_PROMISE__: false, // 是否启用旧版本的 promise 支持（即返回[err,res]的格式）,默认返回标准
    __UNI_FEATURE_LONGPRESS__: false, // 是否启用longpress
    __UNI_FEATURE_I18N_EN__: false, // 是否启用en
    __UNI_FEATURE_I18N_ES__: false, // 是否启用es
    __UNI_FEATURE_I18N_FR__: false, // 是否启用fr
    __UNI_FEATURE_I18N_ZH_HANS__: false, // 是否启用zh_Hans
    __UNI_FEATURE_I18N_ZH_HANT__: false, // 是否启用zh_Hant
    // 以下特性，编译器已自动识别是否需要启用
    __UNI_FEATURE_UNI_CLOUD__: false, // 是否启用uniCloud
    __UNI_FEATURE_I18N_LOCALE__: false, // 是否启用i18n
    __UNI_FEATURE_NVUE__: false, // 是否启用nvue
    __UNI_FEATURE_ROUTER_MODE__: getRouterMode(manifest), // 路由模式
    __UNI_FEATURE_PAGES__: !!routes.length, // 是否多页面
    __UNI_FEATURE_TABBAR__: !!tabBar?.list?.length, // 是否包含tabBar
    __UNI_FEATURE_TABBAR_MIDBUTTON__: !!tabBar?.midButton, // 是否包含midButton
    __UNI_FEATURE_TOPWINDOW__: topWindow, // 是否包含topWindow
    __UNI_FEATURE_LEFTWINDOW__: leftWindow, // 是否包含leftWindow
    __UNI_FEATURE_RIGHTWINDOW__: rightWindow, // 是否包含rightWindow
    __UNI_FEATURE_RESPONSIVE__: false, // 是否启用响应式
    __UNI_FEATURE_NAVIGATIONBAR__: navigationBar, // 是否启用标题栏
    __UNI_FEATURE_PULL_DOWN_REFRESH__: getPullDownRefresh(options), // 是否启用下拉刷新
    __UNI_FEATURE_NAVIGATIONBAR_BUTTONS__: navigationBarButtons, // 是否启用标题栏按钮
    __UNI_FEATURE_NAVIGATIONBAR_SEARCHINPUT__: navigationBarSearchInput, // 是否启用标题栏搜索框
    __UNI_FEATURE_NAVIGATIONBAR_TRANSPARENT__: navigationBarTransparent // 是否启用透明标题栏
  };
  Object.entries(features).forEach(([k, v]) => {
    global[k] = v;
  });
}
