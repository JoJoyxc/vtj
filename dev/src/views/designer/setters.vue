<template>
  <div>
    <div>
      <SetterWrapper
        name="test"
        label="排布"
        label-width="100px"
        :value="2"
        :setters="{ name: 'RadioSetter' }"
        :options="options"
        :variable="true"
        @change="onChange"></SetterWrapper>
      <SetterWrapper
        name="test"
        label="排布"
        label-width="100px"
        :value="2"
        :setters="{ name: 'RadioSetter' }"
        :options="options"
        :variable="true"
        @change="onChange"></SetterWrapper>
      <SetterWrapper
        name="test"
        label="排布"
        label-width="100px"
        :value="2"
        :setters="{ name: 'RadioSetter' }"
        :options="options"
        :variable="true"
        @change="onChange"></SetterWrapper>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { SetterWrapper } from '@vtj/pro';
  import {
    IconDisplayBlock,
    IconDisplayFlex,
    IconDisplayInlineBlock,
    IconDisplayInline,
    IconEyeInvisible
  } from '@vtj/icons';

  const options = [
    {
      label: '选项1',
      value: 1,
      svg: IconDisplayBlock
    },
    {
      label: '选项2',
      value: 2,
      svg: IconDisplayFlex
    },
    {
      label: '选项3',
      value: 3,
      svg: IconDisplayInlineBlock
    },
    {
      label: '选项3',
      value: 4,
      svg: IconDisplayInline
    },
    {
      label: '选项3',
      value: 5,
      svg: IconEyeInvisible
    }
  ];

  const onChange = (n: string, v: any) => {
    console.log('change', n, v);
  };
</script>
