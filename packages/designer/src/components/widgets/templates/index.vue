<template>
  <Panel
    class="v-blocks-widget v-templates-widgets"
    title="模板"
    :subtitle="subtitle">
    <div class="v-blocks__search">
      <ElInput
        size="small"
        v-model="keyword"
        :prefix-icon="Search"
        placeholder="搜索模板"
        clearable></ElInput>
    </div>
    <ElCollapse :model-value="categories">
      <ElCollapseItem
        v-for="(items, name) in groups"
        :name="name"
        :title="`${name} (${items.length})`">
        <ElRow wrap="wrap" :gutter="5">
          <ElCol v-for="item in items" :key="item.id" :span="span">
            <Box
              class="v-templates-widgets__item"
              :name="item.name"
              :title="item.title">
              <ElTag
                v-if="item.vip"
                class="is-vip"
                type="danger"
                size="small"
                effect="light"
                round>
                VIP
              </ElTag>
              <ElImage :src="item.cover" fit="contain"></ElImage>
              <div class="v-templates-widgets__title">{{ item.title }}</div>
              <div class="use-handle">
                <ElButton
                  class="v-templates-widgets__download"
                  :icon="Download"
                  type="primary"
                  round
                  @click="download(item)">
                  使用
                </ElButton>
              </div>
            </Box>
          </ElCol>
        </ElRow>
      </ElCollapseItem>
    </ElCollapse>
    <ElEmpty v-if="!templates.length"></ElEmpty>
  </Panel>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import {
    ElRow,
    ElCol,
    ElEmpty,
    ElCollapse,
    ElCollapseItem,
    ElInput,
    ElImage,
    ElButton,
    ElMessageBox,
    ElTag
  } from 'element-plus';
  import { Search, Download } from '@vtj/icons';
  import { groupBy } from '@vtj/utils';
  import { Panel, Box } from '../../shared';
  import { useColSpan, useTemplates, type TemplateDto } from '../../hooks';

  const { span } = useColSpan(240);
  const { templates, toRemoteAuth, isLogined, installTemplate, access } =
    useTemplates();
  const keyword = ref('');

  const list = computed(() => {
    if (keyword.value) {
      return templates.value.filter((n) => {
        return (
          n.name.includes(keyword.value) || n.title?.includes(keyword.value)
        );
      });
    }
    return templates.value;
  });
  const groups = computed(() => {
    const userId = access?.getData()?.id;
    return groupBy(list.value, (template) => {
      return template.author === userId ? '我的' : template.category;
    });
  });

  const categories = computed(() => Object.keys(groups.value));

  const subtitle = computed(() => {
    return `(共 ${templates.value.length} 个)`;
  });

  const download = async (template: TemplateDto) => {
    if (await isLogined()) {
      await installTemplate(template.id);
    } else {
      const ret = await ElMessageBox.confirm(
        '下载模板需登录系统，您还没登录或登录已过期，请重新登录！',
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
  };

  defineOptions({
    name: 'TemplatesWidget'
  });
</script>
