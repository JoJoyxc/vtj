<template>
  <div>
    <XAction label="open" @click="show"></XAction>
    <XDialogGrid
      v-model="visible"
      title="键值对"
      :formatter="formatter"
      :columns="columns"
      :model="model"
      :rules="rules"
      :submit-method="submitMethod"
      width="600px"
      height="500px">
      <template #valueCell>
        <span>valueCell</span>
      </template>
    </XDialogGrid>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XDialogGrid, XAction, type GridColumns } from '@vtj/ui';

  const visible = ref(false);

  const columns: GridColumns = [
    {
      type: 'checkbox',
      title: '',
      width: 60
    },
    {
      type: 'seq',
      title: '序号',
      width: 60
    },
    {
      field: 'key',
      title: '键',
      editRender: {
        name: 'XInput'
      }
    },
    {
      field: 'value',
      title: '值',
      editRender: {
        name: 'XInput'
      },
      slots: {
        default: 'valueCell'
      }
    }
  ];

  const model = ref({
    key: 'value'
  });

  const rules = {
    key: [
      {
        required: true,
        message: '键名不能为空'
      }
    ]
  };

  const show = () => {
    visible.value = true;
  };

  const submitMethod = async (data: any) => {
    console.log('submitMethod', data);
    return true;
  };

  const formatter = (data: any) => {
    return Object.entries(data).map(([k, v]) => {
      return {
        key: k,
        value: v
      };
    });
  };
</script>
