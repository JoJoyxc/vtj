<template>
  <Panel
    class="v-pages-widget"
    title="页面管理"
    plus
    subtitle="(共 0 条)"
    @plus="onPlus">
    PagesWidget

    <PageForm v-if="visible" v-model="visible"></PageForm>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import PageForm from './form.vue';
  import { Panel } from '../../shared';

  defineOptions({
    name: 'PagesWidget'
  });

  const visible = ref(false);

  const onPlus = () => {
    visible.value = true;
  };
</script>
