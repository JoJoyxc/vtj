<template>
  <XDialogForm
    width="600px"
    height="760px"
    :icon="VtjIconTemplate"
    title="发布到模板"
    :model="model"
    :submit-method="submit">
    <XField label="截图">
      <template #editor>
        <div class="v-actions-widget__cover">
          <ElImage :src="imageDataUrl" fit="contain"></ElImage>
        </div>
      </template>
    </XField>
    <XField
      label="名称"
      name="name"
      required
      :rules="{ pattern: NAME_REGEX, message: '名称格式不正确' }"></XField>
    <XField label="标题" name="title" required></XField>
    <XField
      label="分类"
      name="category"
      editor="select"
      :options="getTemplateCategories"
      required></XField>
    <XField label="版本号" name="version" required></XField>
    <XField
      label="分享"
      name="share"
      editor="switch"
      tip="禁用分享即仅自己可以使用该模板"
      required>
    </XField>
    <XField
      label="更新日志"
      name="changelog"
      :props="{ type: 'textarea' }"></XField>
  </XDialogForm>
</template>
<script lang="ts" setup>
  import { computed, reactive } from 'vue';
  import { XDialogForm, XField } from '@vtj/ui';
  import { ElImage, ElMessage } from 'element-plus';
  import { VtjIconTemplate } from '@vtj/icons';
  import { dataURLtoBlob } from '@vtj/utils';
  import { useOpenApi, type PublishTemplateDto } from '../../hooks';
  import { NAME_REGEX } from '../../../constants';
  export interface Props {
    id?: string;
    canvas: any;
    name: string;
    title: string;
    dsl: any;
  }
  const props = defineProps<Props>();

  const { getTemplateCategories, publishTemplate } = useOpenApi();

  const model = reactive({
    name: props.name,
    title: props.title,
    share: true
  });

  const imageDataUrl = computed(() => {
    if (props.canvas) {
      return props.canvas.toDataURL('image/png');
    }
    return null;
  });

  const submit = async () => {
    const cover = dataURLtoBlob(imageDataUrl.value);
    const { dsl, id } = props;
    const dto: PublishTemplateDto = {
      id,
      dsl: JSON.stringify(dsl),
      cover,
      category: '',
      version: '',
      ...model
    };
    const ret = await publishTemplate(dto).catch((e: any) => {
      ElMessage.error({
        message: e.message || e || '未知错误'
      });
      return false;
    });
    if (ret) {
      ElMessage.success({
        message: '发布模板成功！'
      });
    }
    return !!ret;
  };
</script>

<style lang="scss" scoped>
  .v-actions-widget__cover {
    width: 100%;
    height: 300px;
    background-color: var(--el-fill-color-dark);
    border: 1px solid var(--el-border-color);
    .el-image {
      width: 100%;
      height: 100%;
    }
  }
</style>
