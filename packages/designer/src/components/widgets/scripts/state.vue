<template>
  <Panel
    :title="props.title"
    class="v-sub-panel"
    size="small"
    :fit="false"
    plus
    grow
    @plus="onPlus">
    <Item
      v-for="name of list"
      :title="name"
      border
      :actions="['edit', 'remove']"></Item>
    <Binder
      v-model="visible"
      :title="title"
      :submit-method="submit"
      :model="model">
      <XField name="name" label="状态名称" required></XField>
      <XField name="value" label="状态初始值 [ JSExpression ]" required>
        <template #editor>
          <Editor
            ref="editorRef"
            dark
            height="350px"
            v-model="model.value"></Editor>
        </template>
      </XField>
    </Binder>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { XField } from '@vtj/ui';
  import { Panel, Item, Binder } from '../../shared';
  import Editor from '../../editor';
  import { useCurrent } from '../../hooks';

  export interface Props {
    title: string;
    defaultValue?: string;
  }

  export interface Model extends Record<string, any> {
    name: string;
    value: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    defaultValue: 'null'
  });
  const { current } = useCurrent();

  const editorRef = ref();
  const visible = ref(false);
  const model = ref<Model>({ name: '', value: '' });
  const isEdit = ref(false);
  const title = computed(() =>
    isEdit.value ? `编辑${props.title}` : `新增${props.title}`
  );

  const list = computed(() => {
    return Object.keys(current.value?.state || {});
  });

  const onPlus = () => {
    isEdit.value = false;
    model.value = {
      name: '',
      value: props.defaultValue
    };
    visible.value = true;
  };

  const submit = async (form: any) => {
    const { name, value } = form;
    current.value?.setState(name, {
      type: 'JSExpression',
      value
    });
    return true;
  };
</script>
