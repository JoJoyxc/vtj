import { computed, useAttrs } from 'vue';
import { merge, camelCase, kebabCase } from '@vtj/utils';
import type { GridProps, VxeGridProps, VxeGridPropTypes } from '../types';
import { BUTTONS_SLOT_NAME, PAGER_LEFT_SLOT_NAME } from '../constants';

function getAttrValue(attrs: Record<string, any>, name: string) {
  return attrs[camelCase(name)] ?? attrs[kebabCase(name)] ?? undefined;
}

function useColumnConfig(props: GridProps, attrs: Record<string, any>) {
  const { resizable } = props;
  return {
    useKey: true,
    resizable,
    ...getAttrValue(attrs, 'columnConfig')
  };
}

function useRowConfig(attrs: Record<string, any>) {
  return {
    useKey: true,
    ...getAttrValue(attrs, 'rowConfig')
  };
}

function useProxyConfig(props: GridProps, attrs: Record<string, any>) {
  const { query, queryAll, save } = props;
  const config: VxeGridPropTypes.ProxyConfig = {
    enabled: !!query,
    seq: true,
    sort: true,
    filter: true,
    form: true,
    props: {
      total: 'total',
      result: 'list',
      list: 'list',
      message: 'msg'
    },
    ajax: {
      query,
      queryAll,
      save,
      delete: props.delete
    }
  };
  return merge(config, getAttrValue(attrs, 'proxyConfig') || {});
}

function useToolbarConfig(
  _props: GridProps,
  attrs: Record<string, any>,
  slots: string[]
) {
  const toolbarConfig = getAttrValue(attrs, 'toolbarConfig');
  const slot = slots.find((n) => n === BUTTONS_SLOT_NAME);
  const config: VxeGridPropTypes.ToolbarConfig = {
    enabled: !!toolbarConfig || !!slot,
    custom: true,
    slots: {
      buttons: slot
    }
  };

  return merge(config, toolbarConfig || {});
}

function usePagerConig(
  props: GridProps,
  attrs: Record<string, any>,
  slots: string[]
) {
  const { pager } = props;
  const slot = slots.find((n) => n === PAGER_LEFT_SLOT_NAME);
  const config: VxeGridPropTypes.PagerConfig = {
    background: true,
    size: 'mini',
    pageSize: 50,
    pageSizes: [50, 100, 200, 500],
    layouts: [
      'Total',
      'Sizes',
      'PrevJump',
      'PrevPage',
      'JumpNumber',
      'NextPage',
      'NextJump',
      'FullJump'
    ],
    slots: {
      left: slot
    }
  };
  return pager
    ? Object.assign(config, getAttrValue(attrs, 'pagerConfig') || {})
    : undefined;
}

function useScrollY(props: GridProps, attrs: Record<string, any>) {
  const { virtual } = props;
  return virtual
    ? Object.assign(
        {
          enabled: true,
          gt: 10
        },
        attrs.scrollY || {}
      )
    : undefined;
}

export function useProps(props: GridProps, slots: string[]) {
  const attrs: Record<string, any> = useAttrs();
  const defaults: VxeGridProps = {
    layouts: ['Top', 'Toolbar', 'Form', 'Table', 'Bottom', 'Pager'],
    size: 'small',
    height: 'auto',
    border: true,
    stripe: true,
    showOverflow: 'tooltip',
    autoResize: true
  };
  return computed(() => {
    const columnConfig = useColumnConfig(props, attrs);
    const rowConfig = useRowConfig(attrs);
    const pagerConfig = usePagerConig(props, attrs, slots);
    const proxyConfig = useProxyConfig(props, attrs);
    const scrollY = useScrollY(props, attrs);
    const toolbarConfig = useToolbarConfig(props, attrs, slots);
    return {
      ...defaults,
      ...attrs,
      columnConfig,
      rowConfig,
      pagerConfig,
      proxyConfig,
      scrollY,
      toolbarConfig
    };
  });
}
