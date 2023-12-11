<template>
  <div ref="container" class="v-designer">
    <Viewport :mode="mode" :width="width" :height="height">
      <iframe ref="iframe" frameborder="0"></iframe>
    </Viewport>
  </div>
</template>
<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { useElementSize } from '@vueuse/core';
  import { Viewport } from '../../shared';
  import { useDeps } from '../../hooks';

  const container = ref();
  const iframe = ref<HTMLIFrameElement>();
  const { width, height } = useElementSize(container);
  const { dependencies, engine } = useDeps();
  engine.simulator.init(iframe, dependencies);

  const mode = computed(() => {
    const widget = engine.skeleton?.getWidget('Toolbar');
    return widget?.widgetRef.mode ?? 'pc';
  });

  defineOptions({
    name: 'VDesigner',
    inheritAttrs: false
  });
</script>
