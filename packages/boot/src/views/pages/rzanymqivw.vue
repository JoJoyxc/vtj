<template>
  <ElButtonGroup>
    <ElButton> Button1-3 </ElButton>
    <ElButton> Button2 </ElButton>
    <ElButton> Button3 </ElButton>
  </ElButtonGroup>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { ElButtonGroup, ElButton } from 'element-plus';
  import { useProvider } from '@vtj/runtime';
  export default defineComponent({
    name: 'User',

    components: { ElButtonGroup, ElButton },

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
