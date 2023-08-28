<template>
  <div>工作台: {{ route.query.id }}</div>
</template>
<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  const route = useRoute();
</script>
