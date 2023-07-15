<template>
  <div class="vtj-setting-panel">
    <BlockScriptGroup
      title="状态数据"
      type="state"
      :block="block"
      nameLabel="状态数据名称"
      valueLabel="状态初始值 [ JSExpression ]"
      data-type="JSExpression"
      defaults="null"></BlockScriptGroup>

    <BlockScriptGroup
      title="计算属性"
      type="computed"
      :block="block"
      nameLabel="计算属性名称"
      valueLabel="计算函数 [ JSFunction ]"
      data-type="JSFunction"
      defaults="() => { }"></BlockScriptGroup>

    <BlockScriptGroup
      title="组件方法"
      type="methods"
      :block="block"
      nameLabel="方法名称"
      valueLabel="方法函数 [ JSFunction ]"
      data-type="JSFunction"
      defaults="() => { }"></BlockScriptGroup>

    <BlockScriptGroup
      title="生命周期"
      type="lifeCycles"
      :block="block"
      nameLabel="名称"
      valueLabel="函数 [ JSFunction ]"
      data-type="JSFunction"
      defaults="() => { }"></BlockScriptGroup>

    <BlockScriptGroup
      title="Watch"
      type="watch"
      data-type="JSFunction"
      :block="block"></BlockScriptGroup>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import BlockScriptGroup from '../parts/BlockScriptGroup.vue';
import { useDesigner } from '../../hooks';
import { Block } from '../../models';
const { selected } = useDesigner();

const block = computed(() => selected.value?.node as Block);
</script>
<style lang="scss">
.vtj-setting-panel {
  .el-empty__description {
    --el-empty-description-margin-top: 5px;
  }
}
</style>
