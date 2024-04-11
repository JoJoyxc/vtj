<template>
  <div class="x-qrcode" ref="qrcodeRef">
    <img class="x-qrcode__qrcode" v-bind="attrs" :src="qrcodeValue" />

    <!-- 蒙层 -->
    <div class="x-qrcode__mask" v-if="qrcodeValue && isTimeout">
      <div class="x-qrcode__logo" @click="handleRefresh">
        <slot name="logo">
          <XIcon :icon="Refresh" :size="40"></XIcon>
          <p>刷新</p>
        </slot>
      </div>

      <div class="x-qrcode__tip">
        <slot name="tip">{{ props.tip }}</slot>
      </div>
    </div>

    <!-- loading  -->
    <div class="x-qrcode__loading" v-if="isLoading">
      <XIcon :icon="Loading" :size="60"></XIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, useAttrs, onUnmounted } from 'vue';
  import { XIcon } from '../icon';
  import { Loading, Refresh } from '@vtj/icons';
  import { qrcodeProps, type qrcodeEmits } from './types';
  import QRCode from 'qrcode';

  defineOptions({
    name: 'XQrcode'
  });

  const props = defineProps(qrcodeProps);
  const emit = defineEmits<qrcodeEmits>();
  const attrs = useAttrs();

  const isTimeout = ref<boolean>(false);
  const isLoading = ref<boolean>(false);

  let timer: any;
  const refreshTimeout = (): void => {
    timer = setTimeout(() => {
      isTimeout.value = true;
    }, props.timeout);
  };

  const handleRefresh = () => {
    clearTimeout(timer as unknown as number); // 移除定时器
    emit('refresh'); //触发更新
    isTimeout.value = false; //移除 刷新蒙层
    isLoading.value = true; //展示 loading
    toDataURL(); // 加载数据
    isLoading.value = false; // 移除 loading
    refreshTimeout(); //重新定时
  };

  if (props.timeout > 0) refreshTimeout();

  onUnmounted(() => {
    clearTimeout(timer as unknown as number);
  });

  // 保存 qrcode 的值 value  props.value
  const qrcodeValue = ref<string>();
  const toDataURL = async () => {
    const { quality, value, darkColor, lightColor, ...rest } = props;
    rest.color = { dark: darkColor, light: lightColor };
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
