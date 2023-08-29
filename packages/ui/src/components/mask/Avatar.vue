<template>
  <ElPopover
    :width="200"
    popper-class="x-mask-avatar__popper"
    :disabled="!mask.slots.user">
    <template #reference>
      <ElAvatar
        class="x-mask-avatar"
        shape="circle"
        :icon="UserFilled"
        :src="avatar"
        :size="26"></ElAvatar>
    </template>
    <component v-if="mask.slots.user" :is="mask.slots.user"></component>
  </ElPopover>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { ElAvatar, ElPopover } from 'element-plus';
  import { UserFilled } from '@element-plus/icons-vue';
  import { useInjectMask } from './hooks';
  const mask = useInjectMask();
  const avatar = computed(() => mask.props.avatar as string);
</script>
