<template>
  <div>
    <h1>request</h1>
    <ElButton @click="execApi1">Test api1</ElButton>
  </div>
</template>
<script lang="ts" setup>
import { createApi, request } from '@vtj/utils';
import { ElNotification, ElLoading, ElButton } from 'element-plus';
let loading: any = null;
const url = '/1api/test/user';
type IParams = {
  id: number;
};
type IResponse = {
  result: boolean;
};
const api1 = createApi<IParams, IResponse>({
  url,
  settings: {
    originResponse: false,
    validSuccess: true,
    failMessage: true,
    loading: true,
    showError(msg: string) {
      console.log('showError', msg);
      ElNotification.error({
        message: msg
      });
    },
    showLoading() {
      console.log('showLoading');
      loading = ElLoading.service();
    },
    hideLoading() {
      if (loading) {
        loading.close();
      }
    }
  }
});

const execApi1 = () => {
  api1({ id: 3 })
    .then((res) => {
      console.log('api1 then', res);
    })
    .catch((e) => {
      console.log('api1 catch', e);
    })
    .finally(() => {
      console.log('api1 finally');
    });
};
</script>
