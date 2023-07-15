<template>
  <div class="icons">
    <div v-for="item in icons" class="item">
      <XIcon :icon="item.value" :size="40"></XIcon>
      <div>
        <span> {{ item.label }}</span>
        <span>{{ item.value }}</span>
        <span>{{ item.unicode }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { icons } from '@vtj/icons';
import { XIcon } from '@vtj/ui';
</script>

<style lang="scss" scoped>
.icons {
  display: flex;
  flex-wrap: wrap;
}
.item {
  width: 150px;
  text-align: center;
  padding: 10px;
  border-radius: 3px;
  border: 1px dashed #ccc;
  margin: 5px;
  > div {
    padding-top: 10px;
    font-size: 12px;
    color: #666;
    > span {
      display: block;
    }
  }
}
</style>
