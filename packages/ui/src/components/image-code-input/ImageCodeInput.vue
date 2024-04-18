<template>
  <ElInput
    v-model="inputValue"
    class="x-image-code-input"
    :maxlength="maxlength"
    :placeholder="props.placeholder">
    <!-- 图片 -->
    <template #prefix>
      <div class="x-image-code-input__imageWrapper" :class="imgClass">
        <img
          class="x-image-code-input__image"
          :class="imgClass"
          @click="handleRefreshImage"
          :src="imageValue" />
      </div>
    </template>
    <!-- 状态图标 -->
    <template #suffix>
      <XIcon
        v-if="status === 'success'"
        :icon="SuccessFilled"
        :size="IconSize"
        style="color: green"></XIcon>
      <XIcon
        v-if="status === 'error'"
        :icon="CircleCloseFilled"
        :size="IconSize"
        style="color: red"></XIcon>
    </template>
  </ElInput>
</template>

<script lang="ts" setup>
  import { ref, useAttrs, computed, watch } from 'vue';
  import { ElInput } from 'element-plus';
  import { SuccessFilled, CircleCloseFilled } from '@vtj/icons';
  import { XIcon } from '../icon';
  import { imageCodeInputProps } from './types';

  defineOptions({
    name: 'XImageCodeInput'
  });

  const props = defineProps(imageCodeInputProps);
  const attrs = useAttrs();

  // 状态 icon
  const status = ref<string>();
  const imageValue = ref();

  const runImgFn = () => {
    if (typeof props.image === 'function') {
      imageValue.value = props.image();
    }
  };
  runImgFn();

  // 验证码图片大小
  const IconSize = ref();
  const imgClass = computed(() => {
    const size = attrs.size || 'default';
    IconSize.value = size === 'small' ? '24' : size === 'large' ? '40' : '30';
    return {
      [`is-${size}`]: !!size
    };
  });

  const inputValue = ref('');
  const maxlength = ref<number>(props.maxLength);
  let validate: Function;
  if (typeof props.validate === 'function') {
    validate = props.validate;
  }

  const handleRefreshImage = () => {
    runImgFn();
  };

  // watch 值的长度 变化
  watch(
    inputValue,
    () => {
      if (inputValue.value.length === maxlength.value) {
        const res: boolean = validate(inputValue.value);
        res ? (status.value = 'success') : (status.value = 'error');
      } else {
        status.value = '';
      }
    },
    { immediate: true }
  );
</script>

<style scoped>
  .is-small {
    height: 24px;
  }
  .is-default {
    height: 30px;
  }
  .is-large {
    height: 40px;
  }
</style>

<!--* 
  用户 ==> 传入 图片Fn  传入 检验方法
  组件调用  图片Fn  

  用户 ==>  输入 值   
  组件 ==>  判断输入值长度是否等于maxLength
          是 ==> 调用传入的校验方法


  组件 图片被点击
  调用 图片Fn

 -->
