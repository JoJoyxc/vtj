<template>
  <ElConfigProvider :locale="zhCn">
    <el-container class="v-skeleton">
      <el-header class="v-skeleton__header" :height="headerHeight">
        <RegionWrapper region="Brand"></RegionWrapper>
        <RegionWrapper region="Toolbar"></RegionWrapper>
        <RegionWrapper region="Actions"></RegionWrapper>
      </el-header>
      <el-container class="v-skeleton__wrapper">
        <el-aside :width="leftWidth" class="v-skeleton__left">
          <RegionWrapper region="Apps"></RegionWrapper>
        </el-aside>
        <el-main class="v-skeleton__main">
          <RegionWrapper region="Workspace"></RegionWrapper>
        </el-main>
        <el-aside :width="rightWidth" class="v-skeleton__right">
          <RegionWrapper region="Settings"></RegionWrapper>
        </el-aside>
      </el-container>
      <el-footer class="v-skeleton__footer" :height="footerHeight">
        <RegionWrapper region="Status"></RegionWrapper>
      </el-footer>
    </el-container>
  </ElConfigProvider>
</template>
<script lang="ts" setup>
  import {
    ElContainer,
    ElHeader,
    ElAside,
    ElMain,
    ElFooter,
    ElConfigProvider
  } from 'element-plus';
  import zhCn from 'element-plus/es/locale/lang/zh-cn';
  import { useEngine } from '../framework';
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

  defineOptions({
    name: 'Skeletion'
  });
  const engine = useEngine();

  defineExpose({});

  console.log('engine', engine);
</script>
