<template>
  <div>
    <div>isString('abc') => {{ isString('abc') }}</div>
    <div>isString(123) => {{ isString(123) }}</div>
  </div>
</template>

<script setup lang="ts">
  import { isString } from '@vtj/utils';
</script>
