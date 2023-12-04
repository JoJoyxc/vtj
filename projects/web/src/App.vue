<template>
  <div>
    <XPanel border
      >XPanel

      <ElButton type="primary" :icon="VtjIconApi">Button</ElButton>
    </XPanel>
  </div>
</template>
<script setup lang="ts">
  import { ElButton } from 'element-plus';
  import { XPanel, VtjIconApi } from '@vtj/web';
</script>
