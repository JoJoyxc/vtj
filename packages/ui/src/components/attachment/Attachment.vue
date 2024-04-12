<template>
  <div class="x-attachment">
    <ElUpload list-type="picture-card" :file-list="fileList">
      <ElIcon><Plus /></ElIcon>
      <template #file="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" />
        <div class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview">
            <el-icon><ZoomIn /></el-icon>
          </span>
          <span class="el-upload-list__item-delete">
            <el-icon><Download /></el-icon>
          </span>
          <span class="el-upload-list__item-delete">
            <el-icon><Delete /></el-icon>
          </span>
        </div>
      </template>
    </ElUpload>
    <ElImageViewer v-if="false" :url-list="srcList"></ElImageViewer>
  </div>
</template>
<script lang="ts" setup>
  import { ElUpload, ElIcon, ElImageViewer } from 'element-plus';
  import { Plus, ZoomIn, Download, Delete } from '@vtj/icons';

  const fileList = [
    {
      url: 'http://dummyimage.com/120x90',
      name: 'food.jpeg'
    },
    {
      url: 'http://dummyimage.com/200x300',
      name: 'food.jpeg'
    },
    {
      url: 'http://dummyimage.com/300x300',
      name: 'food.jpeg'
    }
  ];

  const srcList = [
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
    'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
    'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
  ];
</script>
