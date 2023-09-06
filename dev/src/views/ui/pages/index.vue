<template>
  <div>
    <h3>ID: {{ route.query.id }}</h3>
    <div>
      <ElInput v-model="inputValue"></ElInput>
      <ElButton @click="onClick">Button</ElButton>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElInput, ElButton } from 'element-plus';
  import { useRoute, useRouter } from 'vue-router';
  import { useMask, MaskTab } from '@vtj/ui';
  const route = useRoute();
  const router = useRouter();
  const inputValue = ref('');
  const mask = useMask();
  const onClick = () => {
    router.push('/ui/mask/subpage');
  };

  defineOptions({
    name: 'InnerPage'
  });

  const defineTab = async () => {
    return {
      // title: '自定义标签'
    };
  };

  defineExpose({
    defineTab
  });
</script>
