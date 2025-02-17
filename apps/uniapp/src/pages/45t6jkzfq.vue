<template>
  <view> <button>Button</button></view>
  <SubComp></SubComp>
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import SubComp from './2a57sbp3j3.vue';
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'Test',
    components: { SubComp },
    setup(props) {
      const provider = useProvider({ id: '45t6jkzfq', version: '1739783497428' });
      const state = reactive<Record<string, any>>({});
      return { state, props, provider };
    }
  });
</script>
<style lang="scss" scoped></style>
