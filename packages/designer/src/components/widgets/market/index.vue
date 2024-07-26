<template>
  <div>
    插件市场
    <button @click="openDesigner">open designer</button>
  </div>
</template>
<script lang="ts" setup>
  import { useEngine } from '../../../framework';

  const engine = useEngine();

  const openDesigner = () => {
    const region = engine.skeleton?.getRegion('Workspace');
    if (region) {
      region.regionRef.openTab('Designer');
    }
    // console.log(region);
  };

  defineOptions({
    name: 'MarketWidget'
  });

  defineExpose({
    openDesigner
  });
</script>
