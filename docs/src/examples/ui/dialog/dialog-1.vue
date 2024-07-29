<template>
  <div>
    <ElButton type="primary" @click="open1">open 弹窗1</ElButton>
    <ElButton type="primary" @click="open2">open 弹窗2</ElButton>
    <XDialog
      ref="dialog"
      key="dialog1"
      v-model="visible1"
      title="弹窗标题"
      subtitle="我是副标题内容"
      :modal="false"
      submit
      cancel
      :resizable="false"
      @open="onOpen">
      <div>
        <div v-for="n in 50">{{ n }}</div>
      </div>
    </XDialog>

    <XDialog
      key="dialog2"
      title="弹窗标题"
      subtitle="我是副标题内容"
      v-model="visible2"
      :icon="VtjIconBug"
      modal
      width="800px"
      height="400px"
      submit
      cancel
      :maximizable="true"
      :minimizable="true"
      @maximized="onMaximized"
      @minimized="onMinimized"
      @normal="onNormal"
      @modeChange="onModeChange"
      resizable
      @open="onOpen">
      <div style="text-align: right">可放大缩小、拉伸</div>
    </XDialog>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { XDialog } from '@vtj/ui';
  import { VtjIconBug } from '@vtj/web';
  import { ElButton } from 'element-plus';

  const visible1 = ref(false);
  const visible2 = ref(false);
  const open1 = () => {
    visible1.value = true;
  };
  const open2 = () => {
    visible2.value = true;
  };

  const onOpen = () => {
    console.log('open');
  };

  const onMaximized = () => {
    console.log('最大化');
  };
  const onMinimized = () => {
    console.log('最小化');
  };

  const onNormal = () => {
    console.log('正常化');
  };

  const onModeChange = (mode) => {
    console.log('onModeChange', mode);
  };
</script>

<style scoped></style>
