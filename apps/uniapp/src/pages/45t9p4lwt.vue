<template>
  <uni-badge text="100"></uni-badge>
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'Aa',
    setup(props) {
      const provider = useProvider({ id: '45t9p4lwt', version: '1739973553494' });
      const state = reactive<Record<string, any>>({});
      return { state, props, provider };
    }
  });
</script>
<style lang="scss" scoped></style>
