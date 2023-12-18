<template>
  <div>
    <Binder
      title="标题"
      :context="markRaw(context)"
      :model="model"
      :block="markRaw(block)"
      v-model="visible"
      :submitMethod="submitMethod">
      <XField name="title" label="标题字段" required></XField>
    </Binder>
    <div>
      <component :is="renderer"></component>
      <button @click="visible = true">open</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, markRaw } from 'vue';
  import { createRenderer, ContextMode, Binder, BlockModel } from '@vtj/pro';
  import { XField } from '@vtj/web';

  const block = new BlockModel({
    name: 'Test',
    state: {
      abc: {
        type: 'JSExpression',
        value: '1'
      }
    }
  });
  const { renderer, context } = createRenderer({
    mode: ContextMode.Design,
    dsl: block.toDsl()
  });

  const model = {
    title: 'abc'
  };

  const visible = ref(false);

  const submitMethod = async (value: any) => {
    console.log(value);
    return true;
  };

  console.log(context);
</script>
