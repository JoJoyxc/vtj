<template>
  <div
    class="vtj-code-editor"
    :class="{ 'is-border': props.border }"
    ref="container"
    :style="{ height: props.height }"></div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { editor as monacoEditor } from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

export interface Props {
  lang?: string;
  modelValue?: string;
  options?: monacoEditor.IEditorConstructionOptions;
  height?: string;
  readonly?: boolean;
  dark?: boolean;
  border?: boolean;
  minimap?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  height: '300px',
  lang: 'typescript',
  modelValue: '',
  readonly: false,
  dark: false,
  minimap: false,
  options: () => ({})
});

// const { engine } = useCore();

self.MonacoEnvironment = {
  createTrustedTypesPolicy: undefined as any,
  getWorker(_, label) {
    if (label === 'json' && JsonWorker) {
      return new JsonWorker();
    }
    if (['css', 'scss', 'less'].includes(label) && CssWorker) {
      return new CssWorker();
    }
    if (['html', 'handlebars', 'razor', 'vue'].includes(label) && HtmlWorker) {
      return new HtmlWorker();
    }
    if (['typescript', 'javascript'].includes(label) && TsWorker) {
      return new TsWorker();
    }

    if (EditorWorker) {
      return new EditorWorker();
    }

    return Promise.resolve({}) as Promise<Worker>;
  }
};

const emit = defineEmits(['change', 'blur']);

const container = ref();
let editor: monacoEditor.IStandaloneCodeEditor | null = null;

// const exposeEditor = ref();

const format = async () => {
  if (!editor) return;
  await editor.getAction('editor.action.formatDocument')?.run();
  editor.setValue(editor.getValue());
};

const handleBlur = async () => {
  await format();
  emit('blur', editor?.getValue());
};

// languages.typescript.typescriptDefaults.addExtraLib(`
//   declare module  LCDP_Utils {
//       export declare function hashId(): string;
//       export declare function isCSSUrl(url: string): boolean;
//       export declare function isJSUrl(url: string): boolean;
//       export declare function isElement(node: any): node is Element;
//       export declare function isFunction(fn: any): boolean;
//       export declare function isJSExpression(data: any): any;
//       export declare function isJSFunction(x: any): any;
//       export declare function isObject(value: any): value is Record<string, unknown>;
//       export declare function isString(value: any): boolean;
//       export declare function isI18NObject(value: any): boolean;
//       export declare function isTextChildren(children: any): boolean;
//       export declare function isUndefined(value: any): boolean;
//       export declare function arrayToMap(array: any[], keyName: string): any;
//   }
// `);

const createEditor = () => {
  editor = monacoEditor.create(container.value, {
    value: props.modelValue,
    language: props.lang,
    readOnly: props.readonly,
    theme: props.dark ? 'vs-dark' : 'vs',
    automaticLayout: true,
    minimap: { enabled: props.minimap },
    ...props.options
  });

  editor.onDidChangeModelContent((e) => {
    emit('change', editor?.getValue(), e);
  });

  editor.onDidBlurEditorText(handleBlur);
};

onMounted(() => {
  nextTick(createEditor);
});

onUnmounted(() => {
  if (editor) {
    editor.dispose();
  }
});

watch(
  () => props.modelValue,
  (value) => {
    if (editor) {
      editor.setValue(value);
    }
  }
);

const getEditor = () => {
  return editor;
};

defineExpose({ getEditor });
</script>

<style lang="scss">
@use '../style/vars' as *;

.vtj-code-editor {
  overflow: hidden;
  width: 100%;
  &.is-border {
    border: 1px solid $vtj-border-color;
  }
}
</style>
