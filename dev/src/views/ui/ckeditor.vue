<template>
  <div style="height: 100%">
    <XCkeditor
      v-model="content"
      :uploader="uploader"
      :border="false"></XCkeditor>
    <hr />
    <XCkeditor v-model="content" :editable="false"></XCkeditor>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XCkeditor } from '@vtj/web';
  const content = ref('');

  const uploader = async (file: File) => {
    console.log('file', file);
    return 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg';
  };
</script>

<style></style>
