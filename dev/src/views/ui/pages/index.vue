<template>
  <div>
    <h3>ID: {{ route.query.id }}</h3>
    <div>
      <ElInput v-model="inputValue"></ElInput>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElInput } from 'element-plus';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const inputValue = ref('');
</script>
