<template>
  <div>
    <button @click="open">open</button>
    <XDialog
      v-model="visible"
      title="弹窗标题"
      subtitle="我是副标题内容"
      :icon="VtjIconBug"
      :modal="true"
      @open="onOpen">
      DialogBody
    </XDialog>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XDialog } from '@vtj/ui';
  import {
    VtjIconBug,
    VtjIconApi,
    VtjIconPlus,
    VtjIconSetting
  } from '@vtj/icons';

  const visible = ref(true);

  const open = () => {
    visible.value = true;
  };
  const onOpen = () => {
    console.log('open');
  };
</script>
