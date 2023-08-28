<template>
  <XContainer
    class="x-mask-brand"
    :class="{ 'is-collasped': props.collasped }"
    align="center">
    <XContainer class="x-mask-brand__logo" flex justify="center" align="center">
      <img v-if="props.logo" :src="props.logo" />
    </XContainer>
    <XContainer class="x-mask-brand__title" flex align="center">
      <span v-if="props.title">{{ props.title }}</span>
    </XContainer>
  </XContainer>
</template>
<script lang="ts" setup>
  import { XContainer } from '../';

  export interface Props {
    collasped?: boolean;
    logo?: string;
    title?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    collasped: false
  });
</script>
