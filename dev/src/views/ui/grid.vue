<template>
  <div class="container">
    <XGrid
      id="demo"
      size="mini"
      :columns="columns"
      rowSortable
      @row-sort="onRowSort"
      @column-sort="onColSort"
      columnSortable
      @resizable-change="onResize"
      :customable="true"
      :getCustom="getCustom"
      :saveCustom="saveCustom"
      :border="true"
      :stripe="false"
      :query="query"
      :pager="false"
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
      filters: [{ value: null }],
      filterRender: { name: 'InputFilter' },
      cellRender: {
        name: 'LinkCell',
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
        { label: '男', value: 1 },
        { label: '女', value: 0 }
      ],
      formatter: (data: any) => {
        const { row } = data;
        const map: Record<number, any> = {
          1: '男',
          0: '女'
        };
        return map[row.sex];
      }
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
    },
    {
      field: 'join',
      title: '入职日期',
      filters: [{ value: '' }],
      filterRender: {
        name: 'DateFilter'
      }
    },
    {
      field: 'create',
      title: '创建时间'
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
    sex: {
      name: 'TagCell',
      props: (params: any) => {
        return {
          type: params.cellValue === 1 ? 'primary' : 'warning'
        };
      }
    }
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
    const { currentPage, pageSize = 10 } = params.page || {};
    console.log('query', params);
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
