<template>
  <div style="height: 100%">
    <XQrcode
      :value="dataUrl"
      type="image/png"
      :color="{ dark: '#000000ff', light: '#ffffffff' }"
      :timeout="timeoutValue"
      @refresh="handleRefresh">
    </XQrcode>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XQrcode } from '@vtj/web';

  const dataUrl = ref('二维码数据');

  const timeoutValue = ref<number>(3000);

  const handleRefresh = (time: number = 3000) => {
    timeoutValue.value = time;
  };
</script>
