<template>
  <component
    :key="fileId.toString()"
    v-if="renderer"
    :is="renderer"></component>
</template>
<script lang="ts" setup>
import { useBlock } from '@vtj/runtime';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useTitle } from '@vueuse/core';
const route = useRoute();
const fileId = computed(() => route.params.id as string);
const { renderer, dsl } = useBlock(fileId);
const title = computed(() => dsl.value?.title || '未命名');

useTitle(title);
</script>
