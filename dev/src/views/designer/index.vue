<template>
  <div ref="container"></div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Engine } from '@vtj/designer';
  const container = ref();
  new Engine(container);
</script>
