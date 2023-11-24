<template>
  <div class="v-logo" @click="onClick">
    <img
      v-if="props.icon"
      :title="props.text"
      class="v-logo__icon"
      :src="props.icon" />
    <span v-else>{{ props.text }}</span>
  </div>
</template>

<script lang="ts" setup>
  import { type Widget, RegionType } from '../../../framework';
  export interface Props {
    widget: Widget;
    region: RegionType;
    icon?: string;
    text?: string;
    link?: string;
  }

  defineOptions({
    name: 'Logo'
  });

  const props = withDefaults(defineProps<Props>(), {
    text: 'VTJ'
  });

  const onClick = () => {
    if (props.link) {
      location.href = props.link;
    }
  };
</script>
