<template>
  <div class="container">
    <XGrid
      ref="gridRef"
      id="demo"
      size="small"
      :columns="columns"
      :rowSortable="true"
      @toolbarButtonClick="onToolbarButtonClick"
      @row-sort="onRowSort"
      @column-sort="onColSort"
      columnSortable
      @resizable-change="onResize"
      :customable="false"
      :getCustom="getCustom"
      :saveCustom="saveCustom"
      :border="true"
      :stripe="false"
      :query="query"
      :pager="false"
      :resizable="true"
      :showOverflow="true"
      :virtual="false"
      :toolbar-config="toolbarConfig"
      :cellRenders="cellRenders"
      :edit-config="{ mode: 'cell', trigger: 'click', showStatus: true }"
      :valid-config="{}"
      :edit-rules="editRules"
      @edit-closed="onEditClosed">
      <!-- <template #toolbar__buttons>
        <XActionBar v-bind="toolbarConfig"></XActionBar>
      </template> -->
    </XGrid>
  </div>
</template>
<script lang="ts" setup>
  import { ref, markRaw } from 'vue';
  import { XGrid, GridCellRenders } from '@vtj/ui';
  import { request, storage, numberFormat } from '@vtj/utils';
  import { EditPen, Delete } from '@vtj/icons';

  const gridRef = ref<InstanceType<typeof XGrid>>();

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
    {
      field: 'id',
      title: 'ID',
      editRender: {
        name: 'InputEdit',
        events: {
          change(params: any) {
            const grid = gridRef.value as any;
            if (grid) {
              console.log('InputEdit change', params);
              // grid.vxeRef.updateStatus(params);
              // grid.vxeRef.clearValidate();
            }
          }
        }
      }
    },
    {
      field: 'name',
      title: '姓名',
      filters: [{ value: null }],
      filterRender: { name: 'InputFilter' },
      cellRender: {
        name: 'LinkCell',
        events: {
          click(value: any, e: any) {
            console.log(value, e);
          }
        }
      }
    },
    // {
    //   field: 'avatar',
    //   title: '头像',
    //   showOverflow: false
    // },
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
    {
      field: 'age',
      title: '年龄',
      sortable: true,
      editRender: {
        name: 'InputEdit'
      }
    },
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
      field: 'salary',
      title: '工资',
      formatter: (e: any) => `￥${numberFormat(e.cellValue, '0.00')}`
    },
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
    },
    {
      field: 'actions',
      title: '操作',
      width: '150px'
    }
  ];

  const cellRenders: GridCellRenders = {
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
          type: params.cellValue === 1 ? 'success' : 'warning'
        };
      }
    },
    actions: {
      name: 'ActionsCell',
      props: {
        mode: 'icon',
        size: 'default',
        items: [
          {
            label: '编辑',
            icon: markRaw(EditPen),
            type: 'primary'
          },
          {
            label: '删除',
            icon: markRaw(Delete),
            type: 'danger'
          }
        ]
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
    const { currentPage, pageSize = 2 } = params.page || {};
    console.log('query', params);
    return await fetchData({
      currentPage,
      pageSize,
      total: 1000
    });
  };

  const toolbarConfig = {
    buttons: [
      {
        name: '新增',
        type: 'button',
        status: 'primary',
        code: 'insert_last_actived'
      },
      {
        name: '校验',
        type: 'button',
        status: 'warning',
        code: 'validate'
      }
    ]
  };

  const editRules = {
    id: [
      {
        required: true,
        message: '验证错误信息'
      },
      {
        validator({ cellValue }: any) {
          // 模拟服务端校验
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (
                cellValue &&
                (cellValue.length < 3 || cellValue.length > 50)
              ) {
                reject(new Error('名称长度在 3 到 50 个字符之间'));
              } else {
                resolve(true);
              }
            }, 100);
          });
        }
      }
    ],
    name: [
      {
        required: true,
        message: '验证错误信息'
      },
      {
        validator({ cellValue }: any) {
          // 模拟服务端校验
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (
                cellValue &&
                (cellValue.length < 3 || cellValue.length > 50)
              ) {
                reject(new Error('名称长度在 3 到 50 个字符之间'));
              } else {
                resolve(true);
              }
            }, 100);
          });
        }
      }
    ]
  };

  const onToolbarButtonClick = async (e: any) => {
    if (e.code === 'insert_last_actived') {
      gridRef.value?.insertAndEdit();
    }
    console.log(e);
  };

  const onEditClosed = (e: any) => {
    console.log('onEditClosed', e);
    e.$grid.clearValidate();
  };
</script>

<style lang="scss" scope>
  .container {
    height: 100%;
  }
</style>
