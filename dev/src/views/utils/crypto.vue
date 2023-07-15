<template>
  <div>crypto</div>
</template>
<script lang="ts" setup>
import { crypto } from '@vtj/utils';

const t1 = crypto.md5('111');
console.log(t1);
</script>
