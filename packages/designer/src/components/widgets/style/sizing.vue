<template>
  <Panel title="尺寸" class="v-sub-panel v-" size="small" :fit="false">
    <ElForm
      class="v-style-widget__sizing"
      size="small"
      label-width="60px"
      inline>
      <SetterWrapper
        name="width"
        label="宽(W)"
        :setters="{ name: 'SizeSetter' }"
        :variable="false"
        :value="props.styleJson.width"></SetterWrapper>
      <SetterWrapper
        name="height"
        label="高(H)"
        :setters="{ name: 'SizeSetter' }"
        :variable="false"></SetterWrapper>
      <SetterWrapper
        name="min-width"
        label="最小宽"
        :setters="{ name: 'SizeSetter' }"
        :variable="false"></SetterWrapper>
      <SetterWrapper
        name="min-height"
        label="最小高"
        :setters="{ name: 'SizeSetter' }"
        :variable="false"></SetterWrapper>
      <SetterWrapper
        name="max-width"
        label="最大宽"
        :setters="{ name: 'SizeSetter' }"
        :variable="false"></SetterWrapper>
      <SetterWrapper
        name="max-height"
        label="最大高"
        :setters="{ name: 'SizeSetter' }"
        :variable="false"></SetterWrapper>
      <SetterWrapper
        name="overflow"
        label="溢出"
        :setters="{ name: 'SelectSetter' }"
        :options="overflowOptions"
        :variable="false"></SetterWrapper>
      <SetterWrapper
        name="object-fit"
        label="适应"
        :setters="{ name: 'SelectSetter' }"
        :options="objectFitOptions"
        :variable="false"></SetterWrapper>
    </ElForm>
  </Panel>
</template>
<script lang="ts" setup>
  // import { ref } from 'vue';
  import { ElForm } from 'element-plus';
  import { Panel } from '../../shared';
  import { SetterWrapper } from '../../../wrappers';

  export interface Props {
    styleJson: Record<string, any>;
  }

  const props = defineProps<Props>();

  const overflowOptions = [
    { label: '自动', value: 'auto' },
    { label: '隐藏', value: 'hidden' },
    { label: '滚动', value: 'scroll' },
    { label: '显示', value: 'visible' }
  ];

  const objectFitOptions = [
    { label: '填充', value: 'fill' },
    { label: '适应', value: 'contain' },
    { label: '覆盖', value: 'cover' },
    { label: '拉伸', value: 'scale-down' },
    { label: '原始', value: 'none' }
  ];
</script>
