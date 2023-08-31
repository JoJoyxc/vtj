<template>
  <el-config-provider>
    <Suspense>
      <router-view></router-view>
    </Suspense>
  </el-config-provider>
</template>

<script lang="ts" setup>
  import { ElConfigProvider } from 'element-plus';
</script>
