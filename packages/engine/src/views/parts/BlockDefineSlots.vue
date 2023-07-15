<template>
  <Dialog
    ref="dialogRef"
    title="新增插槽"
    width="400px"
    height="150px"
    submit
    cancel
    @submit="onSubmit">
    <ElForm ref="formRef" :model="model" :rules="rules" size="small">
      <ElFormItem label="插槽名称" prop="name">
        <ElInput v-model="model.name"></ElInput>
      </ElFormItem>
    </ElForm>
  </Dialog>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElForm, ElFormItem, ElInput } from 'element-plus';
import { Dialog } from '../shared';
import { Block } from '../../models';

export interface IFormData {
  name: string;
}
export interface Props {
  block: Block;
  formData?: IFormData;
}

const props = defineProps<Props>();

const model = reactive(props.formData || { name: '' });
const rules = {
  name: [{ required: true, message: '插槽名称为必填项' }]
};
const dialogRef = ref();
const formRef = ref();

const onSubmit = async () => {
  const valid = await formRef.value.validate().catch((e: any) => false);
  if (valid) {
    props.block.setSlot(model.name);
    dialogRef.value.close();
  }
};
</script>
