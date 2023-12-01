<template>
  <ElConfigProvider :locale="zhCn">
    <el-container class="v-skeleton">
      <el-header class="v-skeleton__header" :height="headerHeight">
        <RegionWrapper ref="brand" region="Brand"></RegionWrapper>
        <RegionWrapper ref="toolbar" region="Toolbar"></RegionWrapper>
        <RegionWrapper ref="actions" region="Actions"></RegionWrapper>
      </el-header>
      <el-container class="v-skeleton__wrapper">
        <el-aside
          v-resizable="leftResizable"
          :width="leftWidth"
          class="v-skeleton__left"
          :class="{
            'is-collapsed': collapsed
          }">
          <RegionWrapper ref="apps" region="Apps"></RegionWrapper>
        </el-aside>
        <el-main class="v-skeleton__main">
          <RegionWrapper ref="workspace" region="Workspace"></RegionWrapper>
        </el-main>
        <el-aside
          v-if="settable"
          v-resizable="rightResizable"
          :width="rightWidth"
          class="v-skeleton__right">
          <RegionWrapper ref="settings" region="Settings"></RegionWrapper>
        </el-aside>
      </el-container>
      <el-footer class="v-skeleton__footer" :height="footerHeight">
        <RegionWrapper ref="status" region="Status"></RegionWrapper>
      </el-footer>
    </el-container>
  </ElConfigProvider>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    ElContainer,
    ElHeader,
    ElAside,
    ElMain,
    ElFooter,
    ElConfigProvider
  } from 'element-plus';
  import zhCn from 'element-plus/es/locale/lang/zh-cn';
  import { vResizable, type ResizableOptions } from '@vtj/ui';
  import { RegionWrapper } from '../wrappers';

  export interface Props {
    headerHeight?: string;
    leftWidth?: string;
    rightWidth?: string;
    footerHeight?: string;
  }

  withDefaults(defineProps<Props>(), {
    headerHeight: '36px',
    leftWidth: '400px',
    rightWidth: '350px',
    footerHeight: '20px'
  });

  const leftResizable: ResizableOptions = {
    dirs: ['e'],
    maxWidth: 600,
    minWidth: 49
  };

  const rightResizable: ResizableOptions = {
    dirs: ['w'],
    maxWidth: 600,
    minWidth: 2
  };

  const brand = ref();
  const toolbar = ref();
  const actions = ref();
  const apps = ref();
  const workspace = ref();
  const settings = ref();
  const status = ref();
  const collapsed = ref(false);
  const settable = ref(true);

  defineOptions({
    name: 'Skeletion'
  });

  defineExpose({
    brand,
    toolbar,
    actions,
    apps,
    workspace,
    settings,
    status,
    collapsed,
    settable
  });
</script>
