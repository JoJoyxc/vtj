<template>
  <Panel
    class="v-raw-widget"
    :title="title"
    :subtitle="subtitle"
    size="small"
    fit>
    <Editor
      ref="editorRef"
      :model-value="content"
      height="100%"
      lang="html"
      dark
      readonly></Editor>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref, watch, computed } from 'vue';
  import { Panel } from '../../shared';
  import Editor from '../../editor';
  import { useCurrent } from '../../hooks';

  const { current, engine } = useCurrent();
  const editorRef = ref();
  const content = ref('');
  const subtitle = computed(() => {
    return current.value ? `$vtj/vue/${current.value.id}.vue` : '';
  });
  const title = computed(() => {
    return current.value ? current.value.name : '';
  });

  watch(
    [current, engine.changed],
    async () => {
      const project = engine.project.value;
      if (project && current.value) {
        content.value = await engine.service.genVueContent(
          project.toDsl(),
          current.value.toDsl()
        );
      } else {
        content.value = '';
      }
    },
    {
      immediate: true,
      deep: true
    }
  );

  defineOptions({
    name: 'SchemaWidget'
  });
</script>
