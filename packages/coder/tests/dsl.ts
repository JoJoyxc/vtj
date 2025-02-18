export const deps = [
  {
    package: 'vue',
    version: 'latest',
    library: 'Vue',
    urls: ['@vtj/materials/deps/uni-h5-vue/index.umd.js'],
    assetsLibrary: 'VueMaterial',
    required: true,
    official: true,
    enabled: true,
    platform: 'uniapp'
  },
  {
    package: 'vue-router',
    version: 'latest',
    library: 'VueRouter',
    urls: ['@vtj/materials/deps/vue-router/vue-router.global.prod.js'],
    assetsLibrary: 'VueRouterMaterial',
    required: true,
    official: true,
    enabled: true
  },
  {
    package: 'uni-app',
    version: 'latest',
    library: 'UniApp',
    urls: ['@vtj/materials/deps/uni-app/index.umd.js'],
    required: true,
    official: true,
    enabled: true,
    platform: 'uniapp'
  },
  {
    package: 'uni-h5',
    version: 'latest',
    library: 'UniH5',
    urls: [
      '@vtj/materials/deps/uni-h5/style.css',
      '@vtj/materials/deps/uni-h5/index.umd.js'
    ],
    required: true,
    official: true,
    enabled: true,
    assetsUrl: '@vtj/materials/assets/uni-h5/index.umd.js',
    assetsLibrary: 'UniH5Material',
    platform: 'uniapp'
  },
  {
    package: '@vtj/utils',
    version: 'latest',
    library: 'VtjUtils',
    urls: ['@vtj/materials/deps/@vtj/utils/index.umd.js'],
    required: true,
    official: true,
    enabled: true
  },
  {
    package: 'vant',
    version: 'latest',
    library: 'vant',
    urls: [
      '@vtj/materials/deps/vant/index.css',
      '@vtj/materials/deps/vant/vant.min.js'
    ],
    assetsUrl: '@vtj/materials/assets/vant/index.umd.js',
    assetsLibrary: 'VantMaterial',
    required: false,
    official: true,
    enabled: true,
    platform: ['h5', 'uniapp']
  }
];

export const dsl = {
  name: 'Homepage',
  locked: false,
  inject: [],
  state: {},
  lifeCycles: {},
  methods: {},
  computed: {},
  watch: [],
  css: '',
  props: [],
  emits: [],
  slots: [],
  dataSources: {},
  __VTJ_BLOCK__: true,
  __VERSION__: '1739757792261',
  id: '45t62ph4y',
  nodes: [
    {
      id: '45t62u8i1',
      name: 'View',
      from: '@dcloudio/uni-h5',
      invisible: false,
      locked: false,
      children: [
        {
          id: 'b911igg7g',
          name: 'Button',
          from: '@dcloudio/uni-h5',
          invisible: false,
          locked: false,
          children: 'Button',
          props: {},
          directives: [],
          events: {}
        }
      ],
      props: {},
      directives: [],
      events: {}
    }
  ]
};
