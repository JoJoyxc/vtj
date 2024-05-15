<template>
  <div class="container">
    <XGrid
      id="test_grid"
      size="mini"
      :columns="columns"
      :data="rows"
      :toolbarConfig="toolbarConfig"
      rowSortable
      @row-sort="onRowSort"
      @column-sort="onColSort"
      columnSortable
      @resizable-change="onResize"
      :getCustom="getCustom"
      :saveCustom="saveCustom"
      :border="true"
      :stripe="false"></XGrid>
  </div>
</template>
<script lang="ts" setup>
  import { XGrid } from '@vtj/ui';
  import { request, storage } from '@vtj/utils';
  // import { VtjIconApi } from '@vtj/icons';

  const fetchData = () => {
    return request({
      url: '/mock-api/list',
      method: 'get',
      settings: {
        originResponse: false
      }
    });
  };

  const toolbarConfig = {
    buttons: [
      { code: 'insert_actived', name: '新增', icon: 'vtj-icon-api' },
      { code: 'delete', name: '直接删除' },
      { code: 'mark_cancel', name: '删除/取消' },
      { code: 'save', name: '保存', status: 'success' }
    ],
    custom: true
  };

  const columns = [
    { type: 'checkbox', title: '', width: 60 },
    { type: 'seq', title: '序号', width: 60 },
    { field: 'id', title: 'ID' },
    {
      field: 'name',
      title: '姓名'
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
    {
      field: 'intro',
      title: '简介'
    }
  ];

  const rows = await fetchData();

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
</script>

<style lang="scss" scope>
  .container {
    height: 100%;
  }
</style>
