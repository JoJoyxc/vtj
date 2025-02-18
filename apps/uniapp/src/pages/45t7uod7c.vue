<template>
  <button>Button</button>
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { Button } from '@dcloudio/uni-h5';
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'TestBlock',
    components: { Button },
    setup(props) {
      const provider = useProvider({ id: '45t7uod7c', version: '1739861975242' });
      const state = reactive<Record<string, any>>({});
      return { state, props, provider };
    }
  });
</script>
<style lang="scss" scoped></style>
