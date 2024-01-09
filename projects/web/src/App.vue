<template>
  <ElConfigProvider :locale="zhCn">
    <Suspense>
      <XMask :disabled="disabled"></XMask>
    </Suspense>
  </ElConfigProvider>
</template>
<script setup lang="ts">
  import { Suspense } from 'vue';
  import { ElConfigProvider } from 'element-plus';
  import { XMask } from '@vtj/web';
  import { useMask } from '@vtj/renderer';
  import zhCn from 'element-plus/es/locale/lang/zh-cn';

  const { disabled } = useMask();
</script>
