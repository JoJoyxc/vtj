<template>
  <div class="vtj-setting-panel">
    <SubPanel title="通用属性">
      <ElForm size="small" label-width="100px" @keydown.enter.prevent.stop>
        <SetterRenderer
          v-for="item in commonProps"
          :key="`${item.name}_${node.id}`"
          v-bind="(item as any)"
          @change="onChange"></SetterRenderer>
      </ElForm>
    </SubPanel>
    <SubPanel v-if="componentProps.length" title="组件属性">
      <ElForm size="small" label-width="100px" @keydown.enter.prevent.stop>
        <SetterRenderer
          v-for="item in componentProps"
          :key="`${item.name}_${node.id}`"
          v-bind="(item as any)"
          @change="onChange"></SetterRenderer>
      </ElForm>
    </SubPanel>
    <SubPanel title="自定义属性" :tools="plusTool" @tool-click="onClickTool">
      <ElForm size="small" label-width="100px" @keydown.enter.prevent.stop>
        <SetterRenderer
          v-for="item in customProps"
          :key="`${item.name}_${node.id}`"
          v-bind="(item as any)"
          removable
          @change="onChange"
          @remove="onRemove"></SetterRenderer>
      </ElForm>
    </SubPanel>
    <Dialog
      v-model="dialogVisible"
      title="新增属性"
      width="400px"
      submit
      cancel
      @submit="onAddCustom">
      <ElForm ref="formRef" size="small" :rules="rules" :model="newProp">
        <ElFormItem label="属性名称" prop="name">
          <ElInput v-model="newProp.name"></ElInput>
        </ElFormItem>
      </ElForm>
    </Dialog>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElNotification,
  ElMessageBox
} from 'element-plus';
import { SubPanel, Dialog } from '../shared';
import { SetterRenderer } from '../renderers';
import { useCore, useDesigner, useNodeProps } from '../../hooks';
import { Node } from '../../models';

const { assets } = useCore();
const { selected } = useDesigner();
const node = computed(() => selected.value?.node as Node);
const {
  commonProps,
  componentProps,
  onChange,
  isExist,
  addCustom,
  customProps,
  removeProp
} = useNodeProps(node, assets);

const plusTool = [
  {
    name: 'add',
    icon: 'vtj-icon-plus'
  }
];

const rules = {
  name: [{ required: true, message: '熟悉名称为必填项' }]
};

const newProp = reactive({
  name: ''
});

const dialogVisible = ref<boolean>(false);

const onClickTool = (tool: any) => {
  dialogVisible.value = true;
  newProp.name = '';
};

const onAddCustom = () => {
  const keys = Object.keys(node.value.props);
  if (newProp.name && !isExist(newProp.name) && !keys.includes(newProp.name)) {
    addCustom(newProp.name);
    dialogVisible.value = false;
  } else {
    ElNotification.warning({
      message: '已存在该属性名称'
    });
  }
};

const onRemove = async (name: string) => {
  const ret = await ElMessageBox.confirm('确定删除?', '提示', {
    type: 'warning'
  }).catch((e) => false);
  if (ret) {
    removeProp(name);
  }
};
</script>

<style lang="scss">
@use '../../style/vars' as *;

.vtj-setting-panel {
  background-color: $vtj-background-color;
  padding: 0;
  overflow: visible;
  min-height: calc(100% - 10px);

  .el-divider {
    margin-top: 10px;
    opacity: 0.6;
  }
  .el-divider__text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  &__empty {
    text-align: center;
    padding: 20px 0;
    color: $vtj-secondary-color;
    opacity: 0.6;
  }
}
</style>
