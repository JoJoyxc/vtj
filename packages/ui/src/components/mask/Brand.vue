<template>
  <XContainer class="x-mask-brand" align="center">
    <XContainer>
      <img class="x-mask-brand__logo" :src="logo" />
    </XContainer>
    <XContainer>
      <img class="x-mask-brand__title" :src="title" />
    </XContainer>
  </XContainer>
</template>
<script lang="ts" setup>
  import { XContainer, XIcon } from '../';
  import logo from './logo.png';
  import title from './title.png';
</script>
