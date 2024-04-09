<template>
  <button @click="handleChangeValue('哈哈哈哈')">测试改变 value的值</button>
  <button @click="handleRefresh(1000)">测试改变 timeout的值为1000</button>
  <button @click="handleRefresh(0)">测试改变 timeout的值为0</button>
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

  const timeoutValue = ref(100);

  const onDataUrlChange = (val: string) => {
    dataUrl.value = val;
  };

  const handleChangeValue = (val: string) => {
    dataUrl.value = val;
  };

  const handleRefresh = (time: number = 1000) => {
    timeoutValue.value = time;
  };
</script>
