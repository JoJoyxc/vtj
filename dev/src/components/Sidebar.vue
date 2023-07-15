<template>
  <div class="sidebar">
    <h1 class="title">Vtj Core</h1>
    <Menus title="@vtj/utils" :items="utils"></Menus>
    <Menus title="@vtj/icons" :items="icons"></Menus>
    <Menus title="@vtj/ui" :items="ui"></Menus>
    <Menus title="@vtj/engine" :items="lcdp"></Menus>
  </div>
</template>
<script lang="ts" setup>
import Menus from './Menus.vue';
import { utils, ui, lcdp, icons } from '@/router/routes';
</script>
<style lang="scss" scoped>
.sidebar {
  background-color: #fafafa;
  border-right: 1px solid #eee;
  height: 100%;
  overflow: auto;
}

.title {
  font-size: 12px;
  margin: 0;
  padding: 5px 10px;
  text-align: center;
}
</style>
