<template>
  <div>crypto</div>
</template>
<script lang="ts" setup>
  import { MD5 } from '@vtj/utils';

  const t1 = MD5('111');
  console.log(t1);
</script>
