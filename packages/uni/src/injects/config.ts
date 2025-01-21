export function injectUniConfig(global: any = window) {
  global.__uniConfig = {
    globalStyle: {
      backgroundColor: '#FF0000',
      navigationBar: {
        backgroundColor: '#EEEEEE',
        titleText: 'uni-app',
        type: 'default',
        titleColor: '#000000'
      },
      isNVue: false
    },
    compilerVersion: '4.45',
    appId: '',
    appName: '',
    appVersion: '1.0.0',
    appVersionCode: '100',
    async: {
      loading: 'AsyncLoading',
      error: 'AsyncError',
      delay: 200,
      timeout: 60000,
      suspensible: true
    },
    debug: false,
    networkTimeout: {
      request: 60000,
      connectSocket: 60000,
      uploadFile: 60000,
      downloadFile: 60000
    },
    sdkConfigs: {},
    nvue: { 'flex-direction': 'column' },
    locale: '',
    fallbackLocale: '',
    locales: {},
    router: { mode: 'hash', base: '/', assets: 'assets', routerBase: '/' },
    darkmode: true,
    themeConfig: {}
  };
}
