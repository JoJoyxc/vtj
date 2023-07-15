<template>
  <div class="vtj-setting-panel vtj-directives">
    <SubPanel title="内置指令">
      <ElForm label-width="80px">
        <SetterRenderer
          name="vIf"
          label="v-if"
          setters="ExpressionSetter"
          :value="vIf.value"
          @change="onValueChange"></SetterRenderer>
        <SetterRenderer
          name="vShow"
          label="v-show"
          :value="vShow.value"
          setters="ExpressionSetter"
          @change="onValueChange"></SetterRenderer>
        <SetterRenderer
          name="vBind"
          label="v-bind"
          setters="ExpressionSetter"
          :value="vBind.value"
          @change="onValueChange"></SetterRenderer>
      </ElForm>
    </SubPanel>
    <SubPanel title="循环">
      <ElForm label-width="80px">
        <SetterRenderer
          name="value"
          label="循环数据"
          setters="ExpressionSetter"
          :value="vFor.value"
          @change="onForChange"></SetterRenderer>
        <SetterRenderer
          name="item"
          label="迭代变量名"
          :setters="{
            name: 'InputSetter',
            props: { placeholder: 'item' }
          }"
          :value="vFor.iterator?.item"
          @change="onForChange"></SetterRenderer>
        <SetterRenderer
          name="index"
          label="索引变量名"
          :setters="{
            name: 'InputSetter',
            props: { placeholder: 'index' }
          }"
          :value="vFor.iterator?.index"
          @change="onForChange"></SetterRenderer>
      </ElForm>
    </SubPanel>
    <SubPanel v-if="vModels.length" title="双向绑定">
      <DataItem
        v-for="(vModel, index) in vModels"
        :title="`v-model: ${getModelArgName(vModel)}`">
        <ElForm label-width="80px">
          <SetterRenderer
            :name="index.toString()"
            label="绑定变量"
            :value="vModel.value"
            setters="ExpressionSetter"
            @change="onModelChange"></SetterRenderer>
        </ElForm>
      </DataItem>
    </SubPanel>
    <!-- <SubPanel title="自定义指令" :tools="plusTool">
      <DataItem title="v-draggable" removable>
        <ElForm label-width="80px">
          <SetterRenderer
            name="value"
            label="参数名"
            setters="InputSetter"></SetterRenderer>
          <SetterRenderer
            name="value"
            label="指令值"
            setters="ExpressionSetter"></SetterRenderer>
          <SetterRenderer
            name="value"
            label="修饰符"
            setters="JSONSetter"></SetterRenderer>
        </ElForm>
      </DataItem>
    </SubPanel> -->
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { ElForm } from 'element-plus';
import { SubPanel, DataItem } from '../shared';
import { SetterRenderer } from '../renderers';
import { useCore, useDesigner, useDirectives } from '../../hooks';
import { Node, Directive } from '../../models';
import { parseExpression } from '../../utils';
const { assets } = useCore();
const { selected } = useDesigner();
const node = computed(() => selected.value?.node as Node);
const desc = computed(() => assets.componentMap[node.value.name]);

const plusTool = [
  {
    name: 'add',
    icon: 'vtj-icon-plus'
  }
];

const getModelArgName = (vModel: Directive) => {
  if (!vModel.arg) return 'modelValue';
  return typeof vModel.arg === 'string'
    ? vModel.arg
    : parseExpression(vModel.arg, {});
};

const {
  vIf,
  vShow,
  vBind,
  vFor,
  vModels,
  onValueChange,
  onForChange,
  onModelChange
} = useDirectives(node, desc);
</script>
<style lang="scss"></style>
