<template>
  <XContainer
    class="x-mask-sidebar"
    :grow="false"
    flex
    direction="column"
    v-resizable="{
      dirs: ['e'],
      disabled: isExpanded,
      maxWidth: 500,
      minWidth: 200
    }"
    :class="{ 'is-expanded': isExpanded }">
    <Brand></Brand>
    <XContainer
      class="x-mask-sidebar__expander"
      direction="column"
      align="center"
      @click="onToggle">
      <XAction
        :icon="isExpanded ? Expand : Fold"
        size="large"
        mode="text"
        background="hover"
        type="info"></XAction>
    </XContainer>
    <XContainer
      class="x-mask-sidebar__wrapper"
      flex
      grow
      direction="column"
      justify="space-between"
      align="center">
      <Menu :collapse="isExpanded"></Menu>
      <div class="x-mask-sidebar__helper"></div>
    </XContainer>
  </XContainer>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XContainer, XAction } from '../';
  import { vResizable } from '../../directives';
  import Brand from './Brand.vue';
  import Menu from './Menu.vue';
  import { Expand, Fold } from '@element-plus/icons-vue';
  const isExpanded = ref(false);

  const onToggle = () => {
    isExpanded.value = !isExpanded.value;
  };
</script>
