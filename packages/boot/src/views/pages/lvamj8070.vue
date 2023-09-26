<template>
  <XContainer
    :fit="false"
    :auto="true"
    wrap="wrap"
    justify="flex-start"
    alignContent="flex-start"
    :grow="false"
    align="flex-start"
    :shrink="true"
    :inline="true"
    alignSelf="flex-start">
    <XContainer
      v-for="(item, index) in 10"
      :fit="false"
      :auto="true"
      :width="200"
      :height="200"
      :style='{"background": "#ccc", "margin": "10px"}'
      :grow="true"
      :shrink="false"
      alignSelf="auto"
      :padding="false"
      alignContent="flex-start"
      justify="center"
      wrap="nowrap"
      align="center">
      <XIcon icon="Baseball" :size="100" color="#0A8C77"> </XIcon>
    </XContainer>
  </XContainer>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { XContainer, XIcon } from '@vtj/ui';
  import { useProvider } from '@vtj/runtime';
  export default defineComponent({
    name: 'Dashboard',

    components: { XContainer, XIcon },

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
