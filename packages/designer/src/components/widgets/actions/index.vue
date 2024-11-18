<template>
  <div class="v-actions-widget">
    <ElBadge v-if="false" :value="0" :max="99" :hidden="true">
      <XAction mode="icon" :icon="VtjIconBug" background="hover"></XAction>
    </ElBadge>

    <ElDivider v-if="false" direction="vertical"></ElDivider>

    <ElButton @click="onPreview" :type="isPreview ? 'warning' : 'default'" size="small" title="预览">
      <VtjIconPreview></VtjIconPreview>
    </ElButton>

    <ElButton @click="refresh" type="default" size="small" title="刷新">
      <VtjIconRefresh></VtjIconRefresh>
    </ElButton>

    <ElButton type="default" size="small" title="页面设置" @click="openCodeSetting">
      <VtjIconSetting></VtjIconSetting>
    </ElButton>
    <ElDivider direction="vertical"></ElDivider>
    <ElDropdown split-button type="primary" size="small" @click="onPublish" @command="onPublishCommand">
      <span>发布</span>
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem command="current" :icon="VtjIconPublish">发布当前文件</ElDropdownItem>
          <ElDropdownItem command="project" :icon="VtjIconProject">发布整站文件</ElDropdownItem>
          <ElDropdownItem command="template" :icon="VtjIconTemplate" divided>
            发布到模板
          </ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
    <Publisher v-if="publisherVisible" v-model="publisherVisible" v-bind="publisherProps"></Publisher>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import {
  ElButton,
  ElDivider,
  ElBadge,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElMessageBox
} from 'element-plus';
import {
  VtjIconSetting,
  VtjIconRefresh,
  VtjIconBug,
  VtjIconPreview,
  VtjIconTemplate,
  VtjIconPublish,
  VtjIconProject
} from '@vtj/icons';
import { XAction } from '@vtj/ui';
import { delay } from '@vtj/utils';
import Publisher from './publisher.vue';
import { useSelected, useOpenApi } from '../../hooks';
import { message } from '../../../utils';

export interface Props {
  coder?: boolean;
}

withDefaults(defineProps<Props>(), {
  coder: true,
  copy: true
});

const { engine, designer } = useSelected();
const { isLogined, toRemoteAuth } = useOpenApi();
const isPreview = ref(false);
const publisherVisible = ref(false);
const publisherProps = ref();
const refresh = () => {
  if (engine.current.value) {
    if (isPreview.value) {
      const widget = engine.skeleton?.getWidget('Previewer');
      widget?.widgetRef.refresh();
    } else {
      designer.value?.setSelected(null);
      engine.simulator.refresh();
    }
    message('刷新完成', 'success');
  } else {
    message('请先打开文件', 'warning');
  }
};

const openCodeSetting = async () => {
  if (engine.current.value) {
    if (isPreview.value) {
      engine.skeleton?.closePreview();
      isPreview.value = false;
      await delay(1000);
    }
    designer.value?.setSelected(engine.current.value);
  } else {
    message('请先打开文件', 'warning');
  }
};

const onPreview = () => {
  const project = engine.project.value;
  if (!project) return;
  if (engine.current.value) {
    if (isPreview.value) {
      engine.skeleton?.closePreview();
      isPreview.value = false;
      return;
    }
    engine.skeleton?.openPreview('');
    isPreview.value = true;
  } else {
    message('请先打开文件', 'warning');
  }
};

const onPublish = () => {
  const project = engine.project.value;
  if (!project) return;
  if (project.currentFile) {
    project.publish(project.currentFile);
  } else {
    message('请先打开文件', 'warning');
  }
};

const onPublishToTemplate = async () => {
  const project = engine.project.value;
  if (!project) return;
  if (project.currentFile) {
    if (await isLogined()) {
      const canvas = await engine.simulator.capture();
      const { name, title, market } = project.currentFile;
      if (!canvas) {
        message('截图失败', 'warning');
        return;
      }
      publisherProps.value = {
        id: market?.id,
        canvas,
        name,
        title,
        dsl: engine.current.value?.toDsl()
      };
      publisherVisible.value = true;
    } else {
      const ret = await ElMessageBox.confirm(
        '发布到模板需登录系统，您还没登录或登录已过期，请重新登录！',
        '提示',
        {
          type: 'info',
          confirmButtonText: '立即登录'
        }
      ).catch(() => false);
      if (ret) {
        toRemoteAuth();
      }
    }
  } else {
    message('请先打开文件', 'warning');
  }
};

const onPublishCommand = (command: string) => {
  const project = engine.project.value;
  if (!project) return;
  switch (command) {
    case 'current':
      onPublish();
      break;
    case 'project':
      project.publish();
      break;
    case 'template':
      onPublishToTemplate();
      break;
  }
};

defineOptions({
  name: 'ActionsWidget',
  inheritAttrs: false
});
</script>
