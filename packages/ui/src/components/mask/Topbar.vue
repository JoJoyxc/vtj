<template>
  <XContainer class="x-mask-topbar" justify="space-between" align="center">
    <Tabs></Tabs>
    <Toolbar></Toolbar>
  </XContainer>
</template>
<script lang="ts" setup>
  import { XContainer } from '../';
  import Tabs from './Tabs.vue';
  import Toolbar from './Toolbar.vue';
</script>
