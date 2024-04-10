<template>
  <div style="height: 100%">
    <XQrcode
      :value="dataUrl"
      type="image/png"
      :color="{ dark: '#000000ff', light: '#ffffffff' }"
      :timeout="timeoutValue"
      @change="onDataUrlChange"
      @refresh="handleRefresh">
      <!-- <template #logo> <p>插槽自定义刷新图标和文字</p></template> -->
      <!-- <template #tip> <p>插槽自定义内容</p></template> -->
    </XQrcode>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XQrcode } from '@vtj/web';

  const dataUrl = ref('二维码数据');

  const timeoutValue = ref<number>(3000000);

  const onDataUrlChange = (val: string) => {
    dataUrl.value = val;
  };

  const handleRefresh = (time: number = 3000000) => {
    timeoutValue.value = time;
  };
</script>
