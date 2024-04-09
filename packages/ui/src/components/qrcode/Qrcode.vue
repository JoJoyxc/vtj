<template>
  <div class="x-qrcode" ref="qrcodeRef">
    <img class="x-qrcode__qrcode" v-bind="attrs" :src="dataUrlRef" />

    <div class="x-qrcode__mask" v-if="!props.timeout">
      <slot name="logo">
        <div class="x-qrcode__logo" @click="handleRefresh">
          <XIcon :icon="Refresh" :size="40"></XIcon>
          <p>刷新</p>
        </div>
      </slot>
      <slot name="tip">
        <p class="x-qrcode__tip">二维码已失效请刷新居重试</p>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, useAttrs } from 'vue';
  import { XIcon } from '../icon';
  import { Refresh } from '@vtj/icons';
  import { qrcodeProps, type QrcodeEmits } from './types';
  import QRCode from 'qrcode';

  defineOptions({
    name: 'XQrcode'
  });

  const props = defineProps(qrcodeProps);
  const emit = defineEmits<QrcodeEmits>();
  const attrs = useAttrs();

  // ---
  const dataUrlRef = ref<string>();
  const toDataURL = async () => {
    const { quality, value, ...rest } = props;
    const typeValue = typeof value === 'function' ? await value() : value;

    QRCode.toDataURL(
      typeValue,
      Object.assign(rest, quality == null || { renderOptions: { quality } })
    )
      .then((dataUrl) => {
        dataUrlRef.value = dataUrl;
        emit('change', dataUrl);
      })
      .catch((err: unknown) => {
        console.log(err);
      });
  };

  const handleRefresh = () => {
    emit('refresh');
  };

  watch(props, toDataURL, { immediate: true });

  // 组件
  const qrcodeRef = ref();
  //暴露组件
  defineExpose({
    qrcodeRef
  });
</script>
