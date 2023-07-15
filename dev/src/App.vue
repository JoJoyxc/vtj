<template>
  <el-config-provider :locale="zhCn">
    <div class="app">
      <Sidebar class="sidebar"></Sidebar>
      <div class="main">
        <Suspense>
          <router-view></router-view>
        </Suspense>
      </div>
    </div>
  </el-config-provider>
</template>

<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus';
import Sidebar from '@/components/Sidebar.vue';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
</script>
<style lang="scss" scoped>
.app {
  display: flex;
  height: 100%;
}
.sidebar {
  width: 200px;
  flex-shrink: 0;
}
.main {
  flex-grow: 1;
  height: 100%;
  padding: 10px;
  overflow: auto;
}
</style>
