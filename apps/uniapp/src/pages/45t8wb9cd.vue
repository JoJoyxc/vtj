<template>
  <Button> Button</Button>
  <Label></Label>
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { Button, Label } from '@dcloudio/uni-h5';
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'Hompage',
    components: { Button, Label },
    setup(props) {
      const provider = useProvider({ id: '45t8wb9cd', version: '1739925403989' });
      const state = reactive<Record<string, any>>({});
      return { state, props, provider };
    }
  });
</script>
<style lang="scss" scoped></style>
