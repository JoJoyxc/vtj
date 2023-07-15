<template>
  <Panel
    class="vtj-deps"
    title="依赖管理"
    :tools="tools"
    @tool-click="handleAdd">
    <DataItem
      v-for="item in list"
      :key="item.package"
      :removable="!item.official"
      :editable="!item.official"
      :class="{ 'vtj-deps__disabled': !item.enabled }"
      @edit="handleEdit(item)"
      @remove="handleRemove(item)">
      <template #action>
        <ElSwitch
          v-if="!item.required && item.official"
          size="small"
          v-model="item.enabled"
          @change="handleSwitchChange(item)"></ElSwitch>
      </template>
      <template #title> {{ item.package }}@{{ item.version }} </template>
    </DataItem>
    <Dialog
      v-if="formVisible"
      v-model="formVisible"
      :title="`${isEdit ? '编辑' : '新增'}依赖`"
      width="1000px"
      height="500px"
      submit
      cancel
      @submit="handleSubmit">
      <ElForm
        v-if="formModel"
        ref="form"
        size="small"
        label-width="80px"
        :model="formModel"
        :rules="rules">
        <ElFormItem label="npm包名" prop="package">
          <ElInput
            v-model.trim="formModel.package"
            :readonly="isEdit"
            :disabled="isEdit"></ElInput>
        </ElFormItem>
        <ElFormItem label="版本号" prop="version">
          <ElInput v-model.trim="formModel.version"></ElInput>
        </ElFormItem>
        <ElFormItem label="导出名称" prop="library">
          <ElInput v-model.trim="formModel.library"></ElInput>
        </ElFormItem>
        <ElFormItem label="资源URL" prop="urls">
          <ElInput type="textarea" :rows="5" v-model="formModel.urls"></ElInput>
          <div>多个资源可换行输入</div>
        </ElFormItem>
        <ElFormItem label="资产URL" prop="assetsUrl">
          <ElInput v-model.trim="formModel.assetsUrl"></ElInput>
        </ElFormItem>
        <ElFormItem label="资产名称" prop="assetsLibrary">
          <ElInput v-model.trim="formModel.assetsLibrary"></ElInput>
        </ElFormItem>
      </ElForm>
    </Dialog>
  </Panel>
</template>
<script lang="ts" setup>
import {
  ElSwitch,
  ElForm,
  ElFormItem,
  ElInput,
  ElMessageBox,
  ElMessage
} from 'element-plus';
import { ref, toRaw, computed } from 'vue';
import Panel from '../shared/Panel.vue';
import DataItem from '../shared/DataItem.vue';
import Dialog from '../shared/Dialog.vue';
import { Dependencie } from '../../core';
import { useCore } from '../../hooks';
export interface IFormModel {
  package: string;
  version: string;
  library: string;
  urls: string;
  assetsUrl: string;
  assetsLibrary: string;
}

const { project } = useCore();

const tools = [
  {
    name: 'add',
    icon: 'vtj-icon-plus'
  }
];
const rules = {
  package: { required: true, message: '包名不能为空' },
  version: { required: true, message: '版本不能为空' },
  library: { required: true, message: '导出变量名称不能为空' },
  urls: { required: true, message: '资源URL不能为空' }
};
const formModel = ref<IFormModel>();
const form = ref();
const formVisible = ref(false);
const isEdit = ref(false);

const list = computed(() => project.dependencies.value);

const handleSwitchChange = (item: Dependencie) => {
  project.setDeps(item);
};

const handleAdd = () => {
  formVisible.value = true;
  isEdit.value = false;
  formModel.value = {
    package: '',
    version: '',
    library: '',
    urls: '',
    assetsUrl: '',
    assetsLibrary: ''
  };
};

const handleEdit = (dep: Dependencie) => {
  formVisible.value = true;
  isEdit.value = true;
  formModel.value = {
    package: dep.package,
    version: dep.version,
    library: dep.library,
    urls: dep.urls.join('\n'),
    assetsUrl: dep.assetsUrl || '',
    assetsLibrary: dep.assetsLibrary || ''
  };
};

const handleRemove = (dep: Dependencie) => {
  ElMessageBox.confirm('确定删除该依赖项？', '提示', { type: 'warning' }).then(
    () => {
      project.removeDeps(dep);
    }
  );
};

const handleSubmit = () => {
  form.value.validate((vaild: boolean) => {
    if (!vaild) return;
    const { version, library, urls, assetsUrl, assetsLibrary } =
      formModel.value as IFormModel;
    if (!formModel.value?.package) return;
    const dep: Dependencie = {
      package: formModel.value?.package,
      version,
      library,
      urls: urls.trim().split('\n'),
      assetsUrl,
      assetsLibrary
    };
    const exist = project.dependencies.value.find(
      (n) => n.package === dep.package
    );
    if (exist && !isEdit.value) {
      ElMessage.warning({
        message: '已存在相同名称的依赖包'
      });
    } else {
      project.setDeps(toRaw(dep));
      formVisible.value = false;
    }
  });
};
</script>

<style lang="scss"></style>
