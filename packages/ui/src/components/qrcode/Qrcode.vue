<template>
  <div class="x-qrcode" ref="qrcodeRef">
    <img class="x-qrcode__qrcode" v-bind="attrs" :src="qrcodeValue" />

    <div class="x-qrcode__mask" v-if="qrcodeValue && isTimeout">
      <slot name="logo">
        <div class="x-qrcode__logo" @click="handleRefresh">
          <XIcon :icon="Refresh" :size="40"></XIcon>
          <p>刷新</p>
        </div>
      </slot>
      <slot name="tip">
        <p class="x-qrcode__tip">{{ props.tip }}</p>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, useAttrs, onUnmounted } from 'vue';
  import { XIcon } from '../icon';
  import { Refresh } from '@vtj/icons';
  import { qrcodeProps, type qrcodeEmits } from './types';
  import QRCode from 'qrcode';

  defineOptions({
    name: 'XQrcode'
  });

  const props = defineProps(qrcodeProps);
  const emit = defineEmits<qrcodeEmits>();
  const attrs = useAttrs();

  const isTimeout = ref<boolean>(false);

  let timer: any;
  const refreshTimeout = (): void => {
    isTimeout.value = false;
    timer = setTimeout(() => {
      isTimeout.value = true;
    }, props.timeout);
  };

  const handleRefresh = () => {
    clearTimeout(timer as unknown as number);
    emit('refresh');
    toDataURL();
    refreshTimeout();
  };

  if (props.timeout > 0) refreshTimeout();

  onUnmounted(() => {
    clearTimeout(timer as unknown as number);
  });

  // 保存 qrcode 的值 value  props.value
  const qrcodeValue = ref<string>();
  const toDataURL = async () => {
    const { quality, value, ...rest } = props;
    const typeValue = typeof value === 'function' ? await value() : value;
    QRCode.toDataURL(
      typeValue,
      Object.assign(rest, quality == null || { renderOptions: { quality } })
    )
      .then((dataUrl) => {
        qrcodeValue.value = dataUrl;
      })
      .catch((err: unknown) => {
        console.log(err);
      });
  };

  watch(props, toDataURL, { immediate: true });

  // 组件
  const qrcodeRef = ref();
  //暴露组件
  defineExpose({
    qrcodeRef
  });
</script>
