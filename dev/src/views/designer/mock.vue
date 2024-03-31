<template>
  <div>Mock</div>
</template>
<script lang="ts" setup>
  import Mock from 'mockjs';

  const data = Mock.mock({
    'list|1-10': [
      {
        'id|+1': 1
      }
    ]
  });
  console.log(JSON.stringify(data, null, 2));
  console.log(Mock);
</script>
