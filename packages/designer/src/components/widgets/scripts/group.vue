<template>
  <Panel
    :title="props.title"
    class="v-sub-panel"
    size="small"
    :fit="false"
    plus
    grow>
    <Item title="stateName" border :actions="['edit', 'remove']"></Item>
    <State></State>
  </Panel>
</template>
<script lang="ts" setup>
  import { Panel, Item } from '../../shared';
  import State from './state.vue';

  export interface Props {
    title: string;
  }

  const props = defineProps<Props>();
</script>
