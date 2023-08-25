<template>
  <XContainer
    class="x-mask-sidebar"
    :grow="false"
    flex
    direction="column"
    v-resizable="{
      dirs: ['e'],
      disabled: collasped,
      maxWidth: 500,
      minWidth: 200
    }"
    :class="{ 'is-expanded': collasped }">
    <Brand></Brand>
    <XContainer
      class="x-mask-sidebar__wrapper"
      flex
      grow
      direction="column"
      justify="space-between"
      align="center">
      <SwitchBar
        v-model:collasped="collasped"
        v-model:favorite="favorite"
        @search="onSearch"></SwitchBar>
      <Menu
        :collapse="collasped"
        :favorite="favorite"
        :keyword="keyword"></Menu>
      <div class="x-mask-sidebar__helper"></div>
    </XContainer>
  </XContainer>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XContainer } from '../';
  import { vResizable } from '../../directives';
  import Brand from './Brand.vue';
  import Menu from './Menu.vue';
  import SwitchBar from './SwitchBar.vue';

  const collasped = ref(false);
  const favorite = ref(false);
  const keyword = ref('');
  const onSearch = (val: string) => {
    keyword.value = val;
  };
</script>
