<template>
  <Panel ref="panel" :title="null" class="vtj-docs" :body-padding="false">
    <iframe ref="frame" :src="props.url" @load="onLoad"></iframe>
  </Panel>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Panel from '../shared/Panel.vue';
import { ElLoading } from 'element-plus';

export interface IProps {
  url?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  url: 'https://element-plus.org/zh-CN/'
});

const panel = ref();
let loading: any = null;
onMounted(() => {
  if (!loading) {
    loading = ElLoading.service({ target: panel.value?.$el });
  }
});

onUnmounted(() => {
  loading.close();
  loading = null;
});

const onLoad = () => {
  loading.close();
};
</script>

<style lang="scss">
.vtj-docs {
  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
  .vtj-panel__body {
    overflow: hidden;
  }
}
</style>
