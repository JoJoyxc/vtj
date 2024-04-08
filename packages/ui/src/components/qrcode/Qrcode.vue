<template>
  <img
    class="x-qrcode"
    ref="qrcodeRef"
    :style="styleComputed"
    :src="dataUrlRef" />
</template>

<script setup lang="ts">
  import { ref, computed, watch, useAttrs } from 'vue';
  import { qrcodeProps, type QrcodeEmits, type QRCodeValue } from './types';
  import { getSizeValue } from '../../utils';
  import QRCode from 'qrcode';

  defineOptions({
    name: 'XQrcode'
  });

  const props = defineProps(qrcodeProps);
  const emit = defineEmits<QrcodeEmits>();
  const attrs = useAttrs();
  console.log(attrs);

  // ---
  const dataUrlRef = ref<string>('哈哈的哈哈哈');
  const toDataURL = () => {
    const { quality, value, ...rest } = props;
    QRCode.toDataURL(
      value as QRCodeValue,
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
  watch(props, toDataURL, { immediate: true });

  // 组件
  const qrcodeRef = ref();
  // 样式
  const styleComputed = computed(() => {
    return {
      width: getSizeValue(props.width ?? 400),
      scale: getSizeValue(props.scale)
    };
  });
  //暴露组件
  defineExpose({
    qrcodeRef
  });
</script>
