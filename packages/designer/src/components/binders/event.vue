<template>
  <Binder title="绑定事件" :block="current" :context="context"></Binder>
</template>
<script lang="ts" setup>
  import { Binder } from '../shared';
  import { useCurrent } from '../hooks';

  const { current, context } = useCurrent();

  defineOptions({
    name: 'EventBinder'
  });
</script>
