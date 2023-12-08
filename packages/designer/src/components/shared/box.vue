<template>
  <div class="v-box">
    <XContainer direction="column" justify="center" align="center">
      <span class="v-box__name">{{ props.name }}</span>
      <span class="v-box__label">{{ props.title }}</span>
    </XContainer>
    <XContainer
      v-if="props.editable"
      class="v-box__footer"
      justify="flex-end"
      align="center">
      <XIcon :icon="VtjIconEdit" @click="onEdit"></XIcon>
      <XIcon :icon="VtjIconRemove" @click="onRemove"></XIcon>
    </XContainer>
  </div>
</template>
<script lang="ts" setup>
  import { XContainer, XIcon } from '@vtj/ui';
  import { VtjIconEdit, VtjIconRemove } from '@vtj/icons';
  import { ElMessageBox } from 'element-plus';

  export interface Props {
    name: string;
    title: string;
    editable?: boolean;
  }

  const props = defineProps<Props>();
  const emits = defineEmits(['edit', 'remove']);
  const onEdit = () => {
    emits('edit');
  };

  const onRemove = async () => {
    const ret = await ElMessageBox.confirm('确认删除？', '提示', {
      type: 'warning'
    }).catch(() => false);
    if (ret) {
      emits('remove');
    }
  };

  defineOptions({
    name: 'VBox'
  });
</script>
