<template>
  <div class="container">
    <XGrid
      id="demo"
      size="small"
      :columns="columns"
      rowSortable
      @row-sort="onRowSort"
      @column-sort="onColSort"
      columnSortable
      @resizable-change="onResize"
      :getCustom="getCustom"
      :saveCustom="saveCustom"
      :border="true"
      :stripe="false"
      :query="query"
      :pager="true"
      :resizable="true"
      :showOverflow="true"
      :virtual="false"
      :toolbar-config="{ enabled: true }"
      :cellRenders="cellRenders">
      <!-- <template #top>
        <div>top</div>
      </template>
      <template #form>
        <div>form</div>
      </template> -->
    </XGrid>
  </div>
</template>
<script lang="ts" setup>
  // import { ref } from 'vue';
  import { XGrid } from '@vtj/ui';
  import { request, storage } from '@vtj/utils';

  const fetchData = (data: any) => {
    return request({
      url: '/mock-api/list',
      method: 'get',
      data,
      settings: {
        originResponse: false
      }
    });
  };

  const columns = [
    { type: 'checkbox', title: '', width: 60 },
    { type: 'seq', title: '序号', width: 60 },
    { field: 'id', title: 'ID' },
    {
      field: 'name',
      title: '姓名',
      cellRender: {
        name: 'LinkCell',
        props: {},
        events: {
          onClick(value: any, e: any) {
            console.log(value, e);
          }
        }
      }
    },
    {
      field: 'avatar',
      title: '头像',
      showOverflow: false
    },
    {
      field: 'sex',
      title: '性别',
      filters: [
        { label: '男', value: '男' },
        { label: '女', value: '女' }
      ]
    },
    { field: 'age', title: '年龄', sortable: true },
    {
      field: 'birth',
      title: '出生日期',
      children: [
        { field: 'year', title: '年' },
        { field: 'month', title: '月' },
        { field: 'date', title: '日' }
      ]
    },
    {
      field: 'address',
      title: '地址',
      children: [
        { field: 'province', title: '省' },
        { field: 'city', title: '市' },
        { field: 'county', title: '区' }
      ]
    },
    { field: 'salary', title: '工资' },
    {
      field: 'intro',
      title: '简介'
    }
  ];

  const cellRenders = {
    avatar: {
      name: 'ImageCell',
      props: {
        style: {
          width: '50px',
          height: '50px'
        }
      }
    },
    sex: 'TagCell'
  };

  const onRowSort = (e: any) => {
    console.log('onRowSort', e);
  };
  const onColSort = (e: any) => {
    console.log('onColSort', e);
  };

  const onResize = (e: any) => {
    console.log('onResize', e);
  };

  const getCustom = async (id: string) => {
    return storage.get(id, { type: 'local' });
  };
  const saveCustom = async (info: any) => {
    storage.save(info.id, info, { type: 'local' });
  };

  const query = async (params: any) => {
    const { currentPage, pageSize = 1000 } = params.page || {};
    return await fetchData({
      currentPage,
      pageSize,
      total: 1000
    });
  };
</script>

<style lang="scss" scope>
  .container {
    height: 100%;
  }
</style>
