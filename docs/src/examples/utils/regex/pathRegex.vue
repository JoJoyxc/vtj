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
      example: 'pathToRegexpMatch',
      return: pathToRegexpMatch('/user/:name')
    },
    {
      name: 'pathToRegexpParse',
      example: "pathToRegexpParse('/user/:name')",
      return: pathToRegexpParse('/user/:name')
    },
    {
      name: 'pathToRegexpCompile',
      example:
        "pathToRegexpCompile('/user/:id/:name')({id: 10001, name: 'bob'})",
      return: pathToRegexpCompile('/user/:id/:name')({ id: 10001, name: 'bob' })
    }
  ];

  console.log(pathToRegexp('/foo/:bar'));
</script>
