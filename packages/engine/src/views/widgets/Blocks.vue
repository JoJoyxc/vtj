<template>
  <ListPanel title="区块管理" :tools="tools" @tool-click="onAdd">
    <template #default="{ span }">
      <ComponentList
        :list="blocks"
        :span="span"
        :active="active"
        type="Schema"
        editable
        removable
        @edit="onEdit"
        @remove="onRemove"
        @click="onClick"></ComponentList>
      <Dialog
        v-if="dialogVisible"
        v-model="dialogVisible"
        :title="model.id ? '修改' : '新增'"
        width="500px"
        submit
        cancel
        @submit="onSubmit">
        <ElForm ref="formRef" size="small" :model="model" :rules="rules">
          <ElFormItem label="组件名称" prop="name">
            <ElInput v-model="model.name"></ElInput>
          </ElFormItem>
          <ElFormItem label="标题备注" prop="title">
            <ElInput v-model="model.title"></ElInput>
          </ElFormItem>
        </ElForm>
      </Dialog>
    </template>
  </ListPanel>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { ListPanel, Dialog, ComponentList } from '../shared';
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElEmpty,
  ElMessage,
  ElMessageBox
} from 'element-plus';
import { useCore } from '../../hooks';

const { project, engine } = useCore();
const tools = [{ name: 'add', icon: 'vtj-icon-plus' }];
const defaultValue = {
  id: '',
  name: '',
  title: ''
};

const rules = {
  name: [{ required: true, message: '请输入组件名称', trigger: 'blur' }],
  title: [{ required: true, message: '请输入标题备注', trigger: 'blur' }]
};
const formRef = ref();
const model = ref();
const blocks = computed(() => project.blocks.value);

const dialogVisible = ref(false);

const active = (item: any) => {
  return item.id === project.current.value?.id;
};

const onAdd = () => {
  model.value = { ...defaultValue };
  dialogVisible.value = true;
};

const onSubmit = async () => {
  const valid = await formRef.value.validate().catch((e: any) => false);
  if (valid) {
    if (project.existBlockName(model.value)) {
      ElMessage.warning({
        message: '已存在相同名称的区块，请更换名称'
      });
      return;
    }

    // 更新
    if (model.value.id) {
      const schema = await engine.service.getFile(model.value.id);
      project.updateBlock(model.value, schema);
    } else {
      // 新增
      project.addBlock(model.value);
    }

    dialogVisible.value = false;
  }
};

const onEdit = (item: any) => {
  model.value = item;
  dialogVisible.value = true;
};

const onRemove = async (item: any) => {
  const confirm = await ElMessageBox.confirm('确定删除？', '提示', {
    type: 'warning'
  });
  if (confirm) {
    project.removeBlock(item.id as string);
  }
};

const onClick = async (item: any) => {
  const id = item.id as string;
  const schema = await engine.service.getFile(id);
  project.activeFile(schema);
};
</script>
