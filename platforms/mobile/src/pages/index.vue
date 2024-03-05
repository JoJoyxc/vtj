<template>
  <view class="test-list">
    <uni-section title="组件" type="line">
      <uni-list>
        <uni-list-item
          title="XContextMenu"
          right-text="上下文菜单"
          clickable
          to="/pages/components/context-menu"></uni-list-item>
      </uni-list>
    </uni-section>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
</style>
