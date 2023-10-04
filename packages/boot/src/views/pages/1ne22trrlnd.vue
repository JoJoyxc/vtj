<template>
  <ElTable
    :data="[
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }
    ]">
    <ElTableColumn prop="date" label="Date"> </ElTableColumn>
    <ElTableColumn prop="name" label="Name"> </ElTableColumn>
    <ElTableColumn prop="address" label="Address"> </ElTableColumn>
  </ElTable>
  <ElButton type="primary"> 按钮 </ElButton>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { ElTable, ElTableColumn, ElButton } from 'element-plus';
  import { useProvider } from '@vtj/runtime';
  export default defineComponent({
    name: 'mptest',

    components: { ElTable, ElTableColumn, ElButton },

    setup(props) {
      const provider = useProvider();
      const state = reactive({});
      return {
        state,
        props,
        provider
      };
    }
  });
</script>
