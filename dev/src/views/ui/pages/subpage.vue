<template>
  <div>Subpage</div>
</template>

<script lang="ts" setup>
  import { useMask } from '@vtj/ui';
  const defineTab = () => {
    return {
      title: '二级页面'
    };
  };


  defineExpose({
    defineTab
  });
</script>
