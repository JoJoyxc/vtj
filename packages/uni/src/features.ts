export function initUniFeatures(
  _options: Record<string, any> = {},
  global: any = window
) {
  // todo: _options

  const features = {
    // vue
    __VUE_OPTIONS_API__: true, // enable/disable Options API support, default: true
    __VUE_PROD_DEVTOOLS__: true, // enable/disable devtools support in production, default: false
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
    __UNI_FEATURE_ROUTER_MODE__: 'hash', // 路由模式
    __UNI_FEATURE_PAGES__: false, // 是否多页面
    __UNI_FEATURE_TABBAR__: false, // 是否包含tabBar
    __UNI_FEATURE_TABBAR_MIDBUTTON__: false, // 是否包含midButton
    __UNI_FEATURE_TOPWINDOW__: false, // 是否包含topWindow
    __UNI_FEATURE_LEFTWINDOW__: false, // 是否包含leftWindow
    __UNI_FEATURE_RIGHTWINDOW__: false, // 是否包含rightWindow
    __UNI_FEATURE_RESPONSIVE__: false, // 是否启用响应式
    __UNI_FEATURE_NAVIGATIONBAR__: true, // 是否启用标题栏
    __UNI_FEATURE_PULL_DOWN_REFRESH__: false, // 是否启用下拉刷新
    __UNI_FEATURE_NAVIGATIONBAR_BUTTONS__: false, // 是否启用标题栏按钮
    __UNI_FEATURE_NAVIGATIONBAR_SEARCHINPUT__: false, // 是否启用标题栏搜索框
    __UNI_FEATURE_NAVIGATIONBAR_TRANSPARENT__: false // 是否启用透明标题栏
  };
  Object.entries(features).forEach(([k, v]) => {
    global[k] = v;
  });
}
