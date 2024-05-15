<template>
  <div class="container">
    <XGrid :columns="columns"></XGrid>
  </div>
</template>
<script lang="ts" setup>
  import { XGrid } from '@vtj/ui';
  const columns = [
    { type: 'checkbox', title: 'ID' },
    { field: 'name', title: '姓名' },
    { field: 'age', title: '年龄', sortable: true },
    { field: 'address', title: '地址' }
  ];
</script>

<style lang="scss" scope>
  .container {
    height: 100%;
  }
</style>
