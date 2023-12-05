<template>
  <div class="v-status-region">StatusRegion</div>
</template>
<script lang="ts" setup>
  import { RegionType } from '../../framework';
  export interface Props {
    region: RegionType;
  }

  defineProps<Props>();

  defineOptions({
    name: 'StatusRegion'
  });
</script>
