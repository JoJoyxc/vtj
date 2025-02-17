<template>
  <view> <button type="primary">Button</button></view>
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'SubComp',
    setup(props) {
      const provider = useProvider({
        id: '2a57sbp3j3',
        version: '1739783437449'
      });
      const state = reactive<Record<string, any>>({});
      return { state, props, provider };
    }
  });
</script>
<style lang="scss" scoped></style>
