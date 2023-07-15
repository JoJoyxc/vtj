import { computed, ComputedRef, ref } from 'vue';
import { Block } from '../models';
import { ElMessageBox } from 'element-plus';

export type BlockScriptType =
  | 'state'
  | 'computed'
  | 'methods'
  | 'watch'
  | 'lifeCycles';

export function useBlockScript(
  block: ComputedRef<Block | null>,
  type: BlockScriptType
) {
  const remove = {
    state: block.value?.removeState.bind(block.value),
    computed: block.value?.removeComputed.bind(block.value),
    methods: block.value?.removeMethods.bind(block.value),
    watch: block.value?.removeWatch.bind(block.value),
    lifeCycles: block.value?.removeLifeCycles.bind(block.value)
  };

  const visible = ref<boolean>(false);
  const keyRef = ref(Symbol());
  const data = ref();
  const list = computed(() => {
    if (type === 'watch') {
      return (block.value?.watch || []).map((item) => {
        return {
          title: item.source.value,
          model: item
        };
      });
    } else {
      const schema = block.value?.[type];
      const entries = Object.entries(schema ?? {});
      return entries.map(([name, value]) => {
        return {
          title: name,
          model: { name, value }
        };
      });
    }
  });

  const onAdd = (tool: any) => {
    keyRef.value = Symbol();
    data.value = null;
    visible.value = true;
  };

  const onEdit = (model: any) => {
    keyRef.value = Symbol();
    data.value = { ...model };
    visible.value = true;
  };

  const onRemove = async (model: any) => {
    const yes = await ElMessageBox.confirm('是否确定删除?', '提示', {
      type: 'warning'
    }).catch(() => false);
    if (yes) {
      const func = remove[type];
      if (func) {
        if (type === 'watch') {
          func(model);
        } else {
          func(model.name);
        }
      }
    }
  };

  return {
    list,
    visible,
    data,
    onAdd,
    onEdit,
    onRemove,
    keyRef
  };
}
