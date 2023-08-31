<template>
  <div class="x-startup">
    <slot>
      <span>{{ props.text }}</span>
    </slot>
  </div>
</template>
<script lang="ts" setup>
  export interface StartupProps {
    text?: string;
  }

  const props = withDefaults(defineProps<StartupProps>(), {
    text: 'Hello VTJ.PRO'
  });

  defineOptions({
    name: 'XStartup'
  });
</script>
<style lang="scss">
  .x-startup {
    font-size: 100px;
    height: 100%;
    font-weight: bold;
    color: #337ecc;
    background-color: #ecf5ff;
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }
</style>
