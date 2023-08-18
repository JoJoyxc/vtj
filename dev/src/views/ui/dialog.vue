<template>
  <div>
    <XDialog
      title="弹窗标题"
      subtitle="我是副标题内容"
      :icon="VtjIconBug"
      :modal="true">
      DialogBody
    </XDialog>
  </div>
</template>
<script lang="ts" setup>
  import { XDialog } from '@vtj/ui';
  import {
    VtjIconBug,
    VtjIconApi,
    VtjIconPlus,
    VtjIconSetting
  } from '@vtj/icons';
</script>
