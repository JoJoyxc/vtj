<template>
  <div style="height: 100%">
    <button @click="handleChangeValue">测试改变 value的值</button>
    <XQrcode
      :value="dataUrl"
      type="image/png"
      :color="{ dark: '#000000ff', light: '#ffffffff' }"
      @change="onDataUrlChange"></XQrcode>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XQrcode } from '@vtj/web';

  const dataUrl = ref('二维码数据');

  const onDataUrlChange = (val: string) => {
    dataUrl.value = val;
  };

  const handleChangeValue = () => {
    dataUrl.value === '哈哈哈哈';
  };
</script>

<style></style>
