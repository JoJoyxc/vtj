<template>
  <div></div>
</template>
<script lang="ts" setup>
  import { jsonp } from '@vtj/web';

  jsonp('/mock/test_jsonp.js', { a: 'abc' }).then((res) => {
    console.log('jsonp', res);
  });

  jsonp(
    '/libs/lcdp-utils.umd.js',
    {},
    { script: true, name: 'LCDP_Utils' }
  ).then((res) => {
    console.log('LCDP_Utils', res);
  });
</script>
