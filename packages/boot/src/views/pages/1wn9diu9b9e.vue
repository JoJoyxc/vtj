<template>
  <AButtonGroup>
    <AButton> Button1 </AButton>
    <AButton
      :block="false"
      :danger="false"
      :disabled="false"
      :ghost="false"
      :loading="false"
      size="middle">
      Button2
    </AButton>
    <AButton type="default"> Button3 </AButton>
  </AButtonGroup>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { Button } from 'ant-design-vue';
  import { useProvider } from '@vtj/runtime';
  export default defineComponent({
    name: 'HomePage',

    components: { AButtonGroup: Button.Group, AButton: Button },

    setup(props) {
      const provider = useProvider();
      const state = reactive({});
      return {
        state,
        props,
        provider
      };
    }
  });
</script>
<style lang="scss" scoped></style>
