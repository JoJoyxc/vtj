<template>
  <div class="v-file-setter">
    <ElInput
      readonly
      @focus="openDialog"
      :model-value="props.modelValue"
      :suffix-icon="Files"
      v-bind="$attrs">
    </ElInput>
    <XDialog
      v-if="dialogVisible"
      v-model="dialogVisible"
      title="文件选择器"
      width="800px"
      height="600px"
      cancel
      submit
      @submit="handleSubmit">
      <XAttachment
        list-type="list"
        :selectable="true"
        :uploader="uploader"
        :model-value="fileList"
        v-model:select-value="selectValue"
        v-bind="props.attachment"
        @remove="handleRemove"></XAttachment>
      <template #extra>
        <ElButton type="warning" size="default" @click="handleClear">
          清除
        </ElButton>
      </template>
    </XDialog>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, watch } from 'vue';
  import { ElInput, ElButton } from 'element-plus';
  import { Files } from '@vtj/icons';
  import { XDialog, XAttachment, type AttachmentFile } from '@vtj/ui';
  import { notify } from '../../utils';
  import { useProject } from '../hooks';

  export interface Props {
    modelValue?: string;
    attachment?: Record<string, any>;
  }

  defineOptions({
    name: 'FileSetter'
  });

  const props = withDefaults(defineProps<Props>(), {});
  const emit = defineEmits(['change', 'update:modelValue']);
  const { engine, project } = useProject();
  const fileList = ref<AttachmentFile[]>([]);
  const dialogVisible = ref(false);

  const mapToFile = (res: any) => {
    if (Array.isArray(res)) {
      return res.map((n) => {
        return {
          name: n.filename,
          url: n.filepath
        };
      });
    } else {
      return res ? { name: res.filename, url: res.filepath } : null;
    }
  };

  const uploader = async (file: File) => {
    if (engine && project.value) {
      const res = await engine.service.uploadStaticFile(file, project.value.id);
      return mapToFile(res) as AttachmentFile;
    }
    return null;
  };

  const toFiles = (url?: string) => {
    if (url) {
      const items = (url || '').split(',');
      return items.map((n) => {
        return { url: n };
      });
    }
    return [];
  };

  const selectValue = ref<AttachmentFile | AttachmentFile[]>(
    toFiles(props.modelValue)
  );

  const inputValue = computed(() => {
    if (Array.isArray(selectValue.value)) {
      return selectValue.value.map((n) => n.url).join(',');
    } else {
      return selectValue.value ? selectValue.value.url : '';
    }
  });

  watch(
    () => props.modelValue,
    (v) => {
      selectValue.value = toFiles(v);
    }
  );

  watch(dialogVisible, async (v) => {
    if (v) {
      const res = await engine.service
        .getStaticFiles(project.value?.id as string)
        .catch(() => {
          return null;
        });
      fileList.value = mapToFile(res) as AttachmentFile[];
    }
  });

  const handleSubmit = () => {
    if (
      !selectValue.value ||
      (Array.isArray(selectValue.value) && selectValue.value.length === 0)
    ) {
      notify('请选择文件');
      return;
    }

    emit('change', inputValue.value);
    emit('update:modelValue', inputValue.value);
    dialogVisible.value = false;
  };
  const handleClear = () => {
    selectValue.value = [];
    emit('change', undefined);
    emit('update:modelValue', undefined);
    dialogVisible.value = false;
  };

  const openDialog = () => {
    dialogVisible.value = true;
  };

  const handleRemove = (file: AttachmentFile) => {
    if (file.name && project.value?.id) {
      engine.service.removeStaticFile(file.name, project.value?.id);
    }
  };
</script>
