<template>
  <div>
    <button @click="onClick">isClient</button>
  </div>
</template>

<script setup lang="ts">
  import {
    isClient,
    fileToBase64,
    formDataToJson,
    dataURLtoBlob,
    blobToFile
  } from '@vtj/utils';

  const onClick = () => {
    console.log(isClient);
  };
</script>

<style scoped></style>
