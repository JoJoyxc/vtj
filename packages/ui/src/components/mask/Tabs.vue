<template>
  <XContainer
    class="x-mask-tabs"
    height="100%"
    grow
    flex
    justify="flex-end"
    direction="column">
    <ElTabs type="card">
      <ElTabPane label="我的工作台" lazy></ElTabPane>
      <ElTabPane label="权限配置" closable lazy></ElTabPane>
      <ElTabPane v-for="n in 2" label="角色管理" closable lazy></ElTabPane>
    </ElTabs>
  </XContainer>
</template>
<script lang="ts" setup>
  import { ElTabs, ElTabPane } from 'element-plus';
  import { XContainer } from '../';
</script>
