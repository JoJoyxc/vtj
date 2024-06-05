<template>
  <div>
    <XField>
      <template #editor>
        <XPicker
          v-model="modelValue"
          :multiple="true"
          append
          value-key="id"
          label-key="name"
          query-key="name"
          :dialog-props="{ title: '选择器' }"
          :columns="columns"
          :fields="fields"
          :loader="loader"
          :defaultQuery="defaultQuery"
          @change="onChange"
          @picked="onPicked"></XPicker>
      </template>
    </XField>
    <div>
      {{ modelValue }}
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    XPicker,
    XField,
    type PickerColumns,
    type PrickerFields
  } from '@vtj/ui';
  import { request } from '@vtj/utils';

  const modelValue = ref('');
  // const modelValue = ref(['abc']);
  // const modelValue = ref({
  //   label: 'ABC',
  //   value: '123'
  // });

  // const modelValue = ref([
  //   {
  //     id: '123',
  //     name: 'ABC'
  //   }
  // ]);

  const columns: PickerColumns = [
    {
      field: 'id',
      title: 'ID'
    },
    {
      field: 'name',
      title: '姓名'
    },

    {
      field: 'sex',
      title: '性别'
    },
    {
      field: 'age',
      title: '年龄'
    },
    {
      field: 'intro',
      title: '简介'
    },
    {
      field: 'join',
      title: '入职日期'
    },
    {
      field: 'create',
      title: '创建时间'
    }
  ];

  const fields: PrickerFields = [
    {
      label: '姓名',
      name: 'name',
      editor: 'text',
      props: {}
    },
    {
      label: '姓别',
      name: 'sex',
      editor: 'select'
    },
    {
      label: '入职时间开始',
      name: 'join-start',
      editor: 'date',
      props: {
        valueFormat: 'YYYY-MM-DD'
      }
    },
    {
      label: '入职时间结束',
      name: 'join-end',
      editor: 'date',
      props: {
        valueFormat: 'YYYY-MM-DD'
      }
    },
    {
      label: '年龄大于',
      name: 'age-start',
      editor: 'number'
    },
    {
      label: '年龄小于',
      name: 'age-end',
      editor: 'number'
    }
  ];

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

  const loader: any = async (params: any) => {
    console.log('do load', params);
    const { page, pageSize = 50, form } = params || {};
    // console.log('query', { ...params, ...model, tab: tabValue.value });
    return await fetchData({
      ...form,
      currentPage: page,
      pageSize,
      total: 1000
    });
  };

  const defaultQuery = () => {
    return {
      name: 'default'
    };
  };

  const onChange = (data: any) => {
    console.log('change', data);
  };

  const onPicked = (raw: any) => {
    console.log('onPicked', raw);
  };
</script>
