<template>
  <ElButtonGroup>
    <ElButton @click="click_handler_l6pmc60gj8"> {{ $props.id }} </ElButton>
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
    props: {
      id: {
        type: [String],
        required: false,
        default: 'abc'
      }
    },

    setup(props) {
      const provider = useProvider();
      const state = reactive({});
      return {
        state,
        props,
        provider
      };
    },

    methods: {
      click_handler_l6pmc60gj8() {
        this.$router.push({
          path: '/page/rzanymqivw',
          query: {
            id: 'test'
          }
        });
      }
    }
  });
</script>
<style lang="scss" scoped></style>
