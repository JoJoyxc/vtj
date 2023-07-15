<template>
  <div class="vtj-actions" :class="[`is-${props.position}`]">
    <div class="vtj-actions__layers">
      <ElDropdown size="small" @command="handleCommand">
        <div><i class="vtj-icon-layers"></i>{{ props.title }}</div>
        <template #dropdown>
          <ElDropdownMenu v-if="nodePath && nodePath.length">
            <ElDropdownItem
              v-for="item in nodePath"
              :key="item.id"
              :command="item"
              @mouseenter="handleMenuMouseEnter(item)">
              {{ item.name }}
              <i :class="`is-${getNodeType(item)}`">
                {{ getNodeType(item) }}
              </i>
            </ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </div>
    <div v-if="!isRoot" class="vtj-actions__tools">
      <i class="vtj-icon-arrow-up" title="向前移动" @click="handleMovePrev"></i>
      <i
        class="vtj-icon-arrow-down"
        title="向后移动"
        @click="handleMoveNext"></i>
      <i @click="handleCopy" class="vtj-icon-copy" title="复制"></i>
      <i @click="handleRemove" class="vtj-icon-remove" title="删除"></i>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick } from 'vue';
import {
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElMessageBox,
  ElMessage
} from 'element-plus';
import { Block, Node } from '../../models';
import { isBlock } from '../../utils';

export interface Props {
  position?: string; // 'left-top' | 'left-bottom' | 'inner' | 'right-bottom'| 'right-bottom';
  node: Block | Node;
  title?: string;
  path?: Array<Block | Node>;
}

const props = withDefaults(defineProps<Props>(), {
  position: 'left-top',
  title: '',
  path: () => []
});

const emit = defineEmits(['action']);

const isRoot = computed(() => isBlock(props.node));

const nodePath = computed(() => props.path);

function getNodeType(node: Node | Block) {
  return isBlock(node) ? 'Block' : 'Node';
}

function handleRemove() {
  if (props.node.lock) {
    ElMessage.warning({
      message: '该节点已被锁定，不能删除'
    });
    return;
  }
  ElMessageBox.confirm('确定删除吗？', '提示', {
    type: 'warning'
  }).then(() => {
    props.node.dispose();
    nextTick(() => {
      emit('action', { type: 'remove' });
    });
  });
}

function handleMoveNext() {
  (props.node as Node).moveNext();
  nextTick(() => {
    emit('action', { type: 'move', next: true, node: props.node });
  });
}

function handleMovePrev() {
  (props.node as Node).movePrev();
  nextTick(() => {
    emit('action', { type: 'move', prev: true, node: props.node });
  });
}

function handleCopy() {
  const node = (props.node as Node).copy();
  nextTick(() => {
    emit('action', { type: 'copy', node });
  });
}

function handleMenuMouseEnter(node: Node | Block) {
  emit('action', { type: 'hover', node });
}
function handleCommand(node: Node | Block) {
  emit('action', { type: 'selected', node });
}
</script>

<style lang="scss">
@use '../../style/vars' as *;

.vtj-actions {
  position: absolute;
  pointer-events: initial;
  font-size: 12px;
  white-space: nowrap;
  &__layers {
    background: $vtj-primary-color;
    box-shadow: 0 0 3px #fff;
    padding: 0 5px;
    border-radius: 3px;
    display: inline-block;
    vertical-align: top;
    .el-tooltip__trigger {
      color: #fff !important;
      cursor: pointer;
      font-size: 12px;
      height: 23px;
      line-height: 22px;
      &:hover {
        opacity: 0.6;
      }
    }
    .vtj-icon-layers {
      margin-right: 5px;
    }
  }
  &__tools {
    background: $vtj-primary-color;
    padding: 0 5px;
    border-radius: 3px;
    display: inline-block;
    margin-left: 5px;
    height: 23px;
    line-height: 22px;
    vertical-align: top;
    box-shadow: 0 0 3px #fff;
    i {
      color: #fff;
      cursor: pointer;
      padding: 3px;
      line-height: 1;
      &:hover {
        opacity: 0.6;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 2px;
      }
      &.vtj-icon-unlock {
        color: #f3d19e;
      }
    }
  }
  &.is-inner {
    right: 2px;
    top: 2px;
  }

  &.is-left-top {
    left: 0;
    top: -4px;
    transform: translateY(-100%);
  }

  &.is-left-bottom {
    left: 0;
    bottom: -4px;
    transform: translateY(100%);
  }
  &.is-right-top {
    right: 0;
    top: -4px;
    transform: translateY(-100%);
  }
  &.is-right-bottom {
    right: 0;
    bottom: -4px;
    transform: translateY(100%);
  }
  .el-tooltip__trigger {
    outline: none;
  }
}

.is-Page {
  color: $vtj-warning-color;
  margin-left: 5px;
  font-size: 12px;
  zoom: 0.8;
}
.is-Node {
  color: $vtj-primary-color;
  margin-left: 5px;
  font-size: 12px;
  zoom: 0.8;
}

.is-Block {
  color: $vtj-success-color;
  margin-left: 5px;
  font-size: 12px;
  zoom: 0.8;
}
</style>
