<template>
  <XImportButton multiple :uploader="uploader" parser="json" type="primary"
    >导入文件</XImportButton
  >
</template>
<script lang="ts" setup>
  import { XImportButton } from '@vtj/ui';
  import { downloadJson } from '@vtj/utils';

  const uploader = async (content: any) => {
    console.log('uploader', content);

    downloadJson(content, 'file.json');
    return true;
  };
</script>
