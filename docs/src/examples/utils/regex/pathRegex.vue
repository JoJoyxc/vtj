<template>
  <div>
    <configTable title=" path-to-regexp例子" :list="list"></configTable>
  </div>
</template>

<script setup lang="ts">
  import {
    pathToRegexp,
    pathToRegexpMatch,
    pathToRegexpParse,
    pathToRegexpCompile
  } from '@vtj/utils';

  import configTable from '../../../../.vitepress/components/configTable.vue';

  const list = [
    {
      name: 'pathToRegexp',
      example: "pathToRegexp('/user/:name')",
      return: pathToRegexp('/user/:name')
    },
    {
      name: 'pathToRegexpMatch',
      example: "pathToRegexp('/user/:name')",
      return: pathToRegexp('/user/:name')
    }
  ];
</script>
