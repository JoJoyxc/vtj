<template>
  <div>
    <ElRadioGroup size="small" v-model="mode" @change="onModeChane">
      <ElRadioButton label="pc">
        <i class="vtj-icon-pc"></i>
      </ElRadioButton>
      <ElRadioButton label="mobile">
        <i class="vtj-icon-phone"></i>
      </ElRadioButton>
      <ElRadioButton label="pad">
        <i class="vtj-icon-pad"></i>
      </ElRadioButton>
    </ElRadioGroup>

    <ElInput v-if="false" class="vtj-toolbar__zoomer" size="small">
      <template #prepend>
        <ElButton :icon="ZoomOut"></ElButton>
      </template>
      <template #append>
        <ElButton :icon="ZoomIn"></ElButton>
      </template>
    </ElInput>

    <ElButtonGroup>
      <ElButton
        type="default"
        size="small"
        @click="onHistoryBack"
        :disabled="!backable">
        <i class="vtj-icon-undo"></i>
      </ElButton>
      <ElButton
        type="default"
        size="small"
        @click="onHistoryGo"
        :disabled="!goable">
        <i class="vtj-icon-redo"></i>
      </ElButton>
    </ElButtonGroup>
  </div>
</template>
<script lang="ts" setup>
import {
  ElButtonGroup,
  ElButton,
  ElMessage,
  ElRadioGroup,
  ElRadioButton,
  ElInput
} from 'element-plus';
import { ZoomIn, ZoomOut } from '@element-plus/icons-vue';
import { useCore } from '../../hooks';
import { EVENT_VIEWPORT_MODE_CHANGE, emitter } from '../../core';
import { ref, computed } from 'vue';
const { engine } = useCore();

const mode = ref('pc');

const backable = computed(() => {
  const { index = 0, list = [] } = engine.simulator.history.value || {};
  return index < list.length - 1;
});

const goable = computed(() => {
  const { index = 0, list = [] } = engine.simulator.history.value || {};
  return index > 0;
});

const onHistoryBack = () => {
  engine.simulator.history.value?.back();
};

const onHistoryGo = () => {
  engine.simulator.history.value?.go();
};

const onModeChane = (value: any) => {
  emitter.emit(EVENT_VIEWPORT_MODE_CHANGE, value);
};
</script>

<style lang="scss">
.vtj-toolbar {
  width: 40%;
  text-align: center;
  white-space: nowrap;
  .el-radio-group {
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
    position: relative;
    .el-radio-button__inner {
      padding: 5px 10px 4px 10px;
    }
  }
  .el-input-group {
    width: 100px;
    line-height: 24px;
    margin-right: 20px;
    .el-button {
      height: 24px;
      padding: 6px;
    }
    .el-input__inner {
      text-align: center;
    }
  }
  .el-input-group__append,
  .el-input-group__prepend {
    padding: 0 15px;
  }
}
</style>
