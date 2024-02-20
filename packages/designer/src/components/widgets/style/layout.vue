<template>
  <Panel title="布局" class="v-sub-panel" size="small" :fit="false">
    <ElForm size="small" label-width="80px">
      <SetterWrapper
        name="display"
        label="排布"
        :value="2"
        :setters="{ name: 'TagSetter' }"
        :options="options"
        :variable="false"
        @change="onDisplayChange"></SetterWrapper>
      <template v-if="isFlex">
        <SetterWrapper
          name="flex-direction"
          label="主轴方向"
          :value="2"
          :setters="{ name: 'TagSetter' }"
          :options="flexDirectionOptions"
          :variable="false"></SetterWrapper>
        <SetterWrapper
          name="justify-content"
          label="主轴对齐"
          :value="2"
          :setters="{ name: 'TagSetter' }"
          :options="justifyOptions"
          :variable="false"></SetterWrapper>
        <SetterWrapper
          name="align-items"
          label="辅轴对齐"
          :value="2"
          :setters="{ name: 'TagSetter' }"
          :options="flexAlignItemsOptions"
          :variable="false"></SetterWrapper>
        <SetterWrapper
          name="flex-wrap"
          label="换行模式"
          :value="2"
          :setters="{ name: 'TagSetter' }"
          :options="flexWrapOptions"
          :variable="false"></SetterWrapper>
      </template>
    </ElForm>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElForm } from 'element-plus';
  import {
    IconDisplayBlock,
    IconDisplayFlex,
    IconDisplayInlineBlock,
    IconDisplayInline,
    IconEyeInvisible,
    IconFlexDirectionrow,
    IconFlexDirectioncolumn,
    IconFlexDirectioncolumnReverse,
    IconFlexDirectionrowReverse,
    IconFlexJustifycenterrow,
    IconFlexJustifyflexEndrow,
    IconFlexJustifyflexStartrow,
    IconFlexJustifyspaceAroundrow,
    IconFlexJustifyspaceBetweenrow,
    IconFlexAlignbaselinerow,
    IconFlexAligncenterrow,
    IconFlexAlignflexEndrow,
    IconFlexAlignflexStartrow,
    IconFlexAlignstretchrow
  } from '@vtj/icons';
  import { Panel } from '../../shared';
  import { SetterWrapper } from '../../../wrappers';

  const isFlex = ref();

  const options = [
    {
      label: 'block-块级布局',
      value: 'block',
      svg: IconDisplayBlock
    },
    {
      label: 'flex-弹性布局',
      value: 'flex',
      svg: IconDisplayFlex
    },
    {
      label: 'inline-block-行内块级布局',
      value: 'inline-block',
      svg: IconDisplayInlineBlock
    },
    {
      label: 'inline-行内布局',
      value: 'inline',
      svg: IconDisplayInline
    },
    {
      label: 'invisible-不可见',
      value: 'none',
      svg: IconEyeInvisible
    }
  ];

  const flexDirectionOptions = [
    {
      label: 'row-水平',
      value: 'row',
      svg: IconFlexDirectionrow
    },
    {
      label: 'row-reverse-水平',
      value: 'row-reverse',
      svg: IconFlexDirectionrowReverse
    },
    {
      label: 'column-垂直',
      value: 'column',
      svg: IconFlexDirectioncolumn
    },
    {
      label: 'column-reverse-垂直',
      value: 'column-reverse',
      svg: IconFlexDirectioncolumnReverse
    }
  ];

  const justifyOptions = [
    {
      label: 'flex-start',
      value: 'flex-start',
      svg: IconFlexJustifyflexStartrow
    },
    {
      label: 'flex-end',
      value: 'flex-end',
      svg: IconFlexJustifyflexEndrow
    },
    {
      label: 'center',
      value: 'center',
      svg: IconFlexJustifycenterrow
    },
    {
      label: 'space-between',
      value: 'space-between',
      svg: IconFlexJustifyspaceBetweenrow
    },
    {
      label: 'space-around',
      value: 'space-around',
      svg: IconFlexJustifyspaceAroundrow
    }
  ];

  const flexWrapOptions = [
    {
      label: '不换行',
      value: 'nowrap'
    },
    {
      label: '正换行',
      value: 'wrap'
    },
    {
      label: '逆换行',
      value: 'wrap-reverse'
    }
  ];

  const flexAlignItemsOptions = [
    {
      label: 'flex-start',
      value: 'flex-start',
      svg: IconFlexAlignflexStartrow
    },
    {
      label: 'flex-end',
      value: 'flex-end',
      svg: IconFlexAlignflexEndrow
    },
    {
      label: 'center',
      value: 'center',
      svg: IconFlexAligncenterrow
    },
    {
      label: 'baseline',
      value: 'baseline',
      svg: IconFlexAlignbaselinerow
    },
    {
      label: 'stretch',
      value: 'stretch',
      svg: IconFlexAlignstretchrow
    }
  ];

  const onDisplayChange = (_name: string, val: string) => {
    isFlex.value = val === 'flex';
    console.log('onDisplayChange', val);
  };
</script>
