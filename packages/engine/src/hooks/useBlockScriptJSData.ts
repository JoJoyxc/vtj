import {
  computed,
  ref,
  reactive,
  watchEffect,
  PropType,
  ExtractPropTypes
} from 'vue';
import { Block } from '../models';
import { JSExpression, JSFunction } from '../core';
import { expressionValidate, cloneDeep } from '../utils';
import { ElNotification } from 'element-plus';
import { BlockScriptType } from './useBlockScript';

export interface JSData {
  name: string;
  value: JSExpression | JSFunction;
}

export const jsDataDialogProps = {
  block: {
    type: Object as PropType<Block>,
    default: null
  },
  data: {
    type: Object as PropType<JSData>
  },
  type: {
    type: String as PropType<Exclude<BlockScriptType, 'watch'>>,
    default: 'state'
  },
  title: {
    type: String,
    default: ''
  },
  nameLabel: {
    type: String,
    default: ''
  },
  valueLabel: {
    type: String,
    default: ''
  },
  dataType: {
    type: String as PropType<'JSExpression' | 'JSFunction'>,
    default: 'JSExpression'
  },
  defaults: {
    type: String,
    default: ''
  }
};

export type JSDataDialogProps = ExtractPropTypes<typeof jsDataDialogProps>;

export function useBlockScriptJSData(props: JSDataDialogProps) {
  const defaultJsData: JSData = {
    name: '',
    value: {
      type: props.dataType,
      value: props.defaults
    }
  };

  const set = {
    state: props.block.setState.bind(props.block),
    computed: props.block.setComputed.bind(props.block),
    methods: props.block.setMethods.bind(props.block),
    lifeCycles: props.block.setLifeCycles.bind(props.block)
  };

  const formRef = ref();
  const dialogRef = ref();
  const editorRef = ref();

  const title = computed(() =>
    props.data ? `编辑${props.title}` : `新增${props.title}`
  );

  const rules = {
    name: [{ required: true, message: `${props.title}名称为必填项` }]
  };

  const disabled = computed(() => !!props.data);

  const model = reactive<JSData>(props.data || cloneDeep(defaultJsData));

  watchEffect(() => {
    Object.assign(model, props.data || cloneDeep(defaultJsData));
  });

  const isExist = (name: string) => {
    if (props.data) return false;
    return !!props.block[props.type][name];
  };

  const onSubmit = async () => {
    const valid = await formRef.value.validate().catch(() => false);
    if (valid) {
      if (isExist(model.name)) {
        ElNotification.warning({
          title: '提示',
          message: '已存在相同名称，请更换！'
        });
        return;
      }
      const code = editorRef.value.getEditor().getValue();
      const context = props.block.runtimeContext;
      if (
        context &&
        expressionValidate({ ...model.value, value: code }, context)
      ) {
        model.value.value = code;
        set[props.type](model.name, model.value as any);
        dialogRef.value.close();
      }
    }
  };

  return {
    defaultJsData,
    title,
    model,
    formRef,
    dialogRef,
    editorRef,
    rules,
    disabled,
    onSubmit
  };
}
