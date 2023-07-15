<template>
  <Dialog ref="dialogRef" :body-padding="false" width="1000px" height="600px">
    <ElContainer class="vtj-binder">
      <ElAside>
        <Tabs :items="tabs" v-model="currentTab">
          <div v-if="currentTab === 'common'" class="vtj-binder__common">
            <ElInput
              v-model="keyword"
              size="small"
              clearable
              :prefix-icon="Search"
              placeholder="筛选可用项"></ElInput>

            <div v-for="group in searchResult">
              <ElDivider border-style="dotted">{{ group.title }}</ElDivider>
              <DataItem
                v-for="item in group.items"
                clickable
                :title="item"
                @click="onPick(item)">
                <template #action>
                  <i
                    class="vtj-icon-copy"
                    title="复制"
                    @click.stop="onCopy(item)"></i>
                </template>
              </DataItem>
            </div>
            <ElEmpty v-if="!searchResult.length"></ElEmpty>
          </div>
          <ContextViewer
            v-if="currentTab === 'viewer'"
            @pick="onPick"></ContextViewer>
        </Tabs>
      </ElAside>
      <ElMain>
        <Panel :title="null">
          <slot></slot>
          <template #footer>
            <div class="vtj-binder__footer">
              <span>
                <ElButton
                  v-if="props.clearable"
                  size="default"
                  type="warning"
                  @click="onRemoveBinding">
                  移除绑定
                </ElButton>
              </span>
              <span>
                <ElButton size="default" @click="onCancel">取消</ElButton>
                <ElButton size="default" type="primary" @click="onSubmit">
                  确定
                </ElButton>
              </span>
            </div>
          </template>
        </Panel>
      </ElMain>
    </ElContainer>
  </Dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import Dialog from './Dialog.vue';
import Panel from './Panel.vue';
import DataItem from './DataItem.vue';
import Tabs from './Tabs.vue';
import ContextViewer from './ContextViewer.vue';
import { Search } from '@element-plus/icons-vue';

import {
  ElContainer,
  ElAside,
  ElMain,
  ElButton,
  ElInput,
  ElDivider,
  ElMessage,
  ElEmpty
} from 'element-plus';
import { useClipboard } from '@vueuse/core';
import { useCore, useBinder } from '../../hooks';

export interface Props {
  clearable?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  clearable: true
});

const emit = defineEmits(['submit', 'cancel', 'remove', 'pick']);

const tabs = [
  {
    name: 'common',
    label: '常用'
  },
  {
    name: 'viewer',
    label: '高级'
  }
];

const currentTab = ref('common');

const { project } = useCore();
const keyword = ref('');
const { searchResult } = useBinder(project.current, keyword);
const { copy } = useClipboard({});
const dialogRef = ref();
const onSubmit = () => {
  emit('submit');
};
const onCancel = () => {
  emit('cancel');
  dialogRef.value.close();
};
const onRemoveBinding = () => {
  emit('remove');
};
const onPick = (item: string) => {
  emit('pick', item);
};
const onCopy = (item: string) => {
  copy(item);
  ElMessage.success({
    message: '已经复制到粘贴板'
  });
};
const close = () => {
  dialogRef.value.close();
};

defineExpose({
  close
});
</script>
<style lang="scss">
@use '../../style/vars' as *;
.vtj-binder {
  height: 100%;
  .el-main {
    --el-main-padding: 0;
  }

  .vtj-panel__header-wrapper {
    background-color: transparent;
  }
  .el-divider--horizontal {
    margin: 14px 0;
  }
  .el-divider__text {
    font-size: 12px;
    color: #666;
  }
  &__footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .vtj-tabs .vtj-panel__header .el-tabs__item.is-active {
    border-top: 1px solid var(--el-border-color-light);
  }
  .vtj-binder__common {
    background-color: #fff;
    height: 100%;
    padding: 10px;
    overflow: auto;
  }
}
</style>
