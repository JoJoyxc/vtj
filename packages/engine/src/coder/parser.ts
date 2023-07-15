import {
  BlockSchema,
  DefineProps,
  JSFunction,
  JSExpression,
  StateSchema,
  WatchSchema,
  NodeSchema,
  InjectSchema,
  NodeChildrenSchema,
  PropsSchema,
  NodeSlotSchema,
  NodeDirectiveSchema,
  NodeEventSchema,
  NodeEventsSchema,
  ComponentsSchema,
  UtilsSchema
} from '../core';
import {
  isJSFunction,
  isJSExpression,
  upperFirstCamelCase,
  isPlainObject,
  getModifiers,
  toTsType,
  getDiretives
} from '../utils';

export interface ICodeToken {
  id: string;
  name: string;
  template: string;
  Props: string;
  propsDefault: string;
  state: string;
  computedValues: string;
  computedNames: string;
  methodsValues: string;
  methodsNames: string;
  injectValues: string;
  injectNames: string;
  watch: string;
  lifeCycles: string;
  emits: string;
  css: string;
  vueImports: string;
  imports: string;
  importItems: string;
}

function parseValue(val: any, stringify: boolean = true) {
  const value = isJSExpression(val)
    ? `${(val as JSExpression).value}`
    : isJSFunction(val)
    ? (val as JSFunction).value
    : stringify
    ? JSON.stringify(val)
    : val;
  return replaceContext(value);
}

function replaceContext(val: string) {
  return val.replace(/this.context./g, '').replace(/this./g, '');
}

function parseProps(props: DefineProps = []) {
  const res = props.map((n) => {
    return typeof n === 'string'
      ? {
          name: n
        }
      : n;
  });
  const Props: string[] = res.map((n) => {
    return `${n.name}${n.required ? '' : '?'}: ${
      n.type ? toTsType(n.type) : 'any'
    }`;
  });
  const defaults = res
    .filter((n) => n.default !== undefined)
    .map((n) => {
      const value = parseValue(n.default);
      return `${n.name}: ${value}`;
    });
  return {
    Props,
    defaults
  };
}

function parseState(state: StateSchema = {}) {
  return Object.entries(state).map(([name, val]) => {
    const value = parseValue(val);
    return `${name}:${value}`;
  });
}

function parseComputed(computed: Record<string, JSFunction> = {}) {
  const names: string[] = [];
  const values = Object.entries(computed).map(([name, val]) => {
    const value = parseValue(val);
    names.push(name);
    return `const ${name} = computed(${value})`;
  });
  return {
    names,
    values
  };
}

function parseMethods(methods: Record<string, JSFunction> = {}) {
  const names: string[] = [];
  const values = Object.entries(methods).map(([name, val]) => {
    names.push(name);
    const value = parseValue(val);
    return `const ${name} = ${value}`;
  });
  return {
    names,
    values
  };
}

function parseWatch(watches: WatchSchema[] = []) {
  return watches.map((n) => {
    return `watch(${parseValue(n.source)},
    ${parseValue(n.handler)},
     {
      deep:${parseValue(!!n.deep)},
      immediate:${parseValue(!!n.immediate)}
     })`;
  });
}

function parseLifeCycles(lifeCycles: Record<string, JSFunction> = {}) {
  const names: string[] = [];
  const value = Object.entries(lifeCycles).map(([key, val]) => {
    const name = `on${upperFirstCamelCase(key)}`;
    const value = parseValue(val);
    names.push(name);
    return `${name}(${value})`;
  });
  return {
    names,
    value
  };
}

function parseInject(injects: InjectSchema[]) {
  const names: string[] = [];
  const values = injects.map((n) => {
    names.push(n.name);
    const key = n.from ? parseValue(n.from) : JSON.stringify(n.name);
    const defaultValue = parseValue(n.default ?? null);
    return `const ${n.name} = inject(${key}, ${defaultValue})`;
  });
  return {
    names,
    values
  };
}

function parsePlainObjectValue(obj: Record<string, any> = {}) {
  return Object.entries(obj).map(([name, value]) => {
    return `${name}: ${parseValue(value)}`;
  });
}

function bindProp(name: string, value: unknown) {
  if (typeof value === 'string') {
    return `${name}="${value}"`;
  } else if (isJSExpression(value) || isJSFunction(value)) {
    return `:${name}="${parseValue(value)}"`;
  } else if (isPlainObject(value)) {
    return `:${name}='{${parsePlainObjectValue(
      value as Record<string, any>
    ).join(', ')}}'`;
  } else {
    return `:${name}="${JSON.stringify(value)}"`;
  }
}

function bindEvent(name: string, value: NodeEventSchema) {
  const modifiers = getModifiers(value.modifiers, true);
  return `@${name}${modifiers}="${parseValue(value.handler)}"`;
}

function bindNodeEvents(events: NodeEventsSchema = {}) {
  return Object.entries(events).map(([name, value]) => {
    return bindEvent(name, value);
  });
}

function bindNodeProps(props: PropsSchema = {}) {
  return Object.entries(props).map(([name, value]) => {
    return bindProp(name, value);
  });
}

function wrapSlot(slot: string | NodeSlotSchema | undefined, content: string) {
  if (!slot) return content;
  const realSlot =
    typeof slot === 'string'
      ? { name: slot, params: [] }
      : { params: [], ...slot };
  const slotString = `#${realSlot.name}="${
    realSlot.params?.length > 0 ? `{${realSlot.params?.join(',')}}` : 'scope'
  }"`;
  return `<template ${slotString}>${content}</template>`;
}

function parseDirectives(directives: NodeDirectiveSchema[] = []) {
  const result: string[] = [];
  const { vIf, vShow, vModels, vFor, others } = getDiretives(directives);
  if (vIf) {
    result.push(`v-if="${parseValue(vIf.value)}"`);
  }
  if (vShow) {
    result.push(`v-show="${parseValue(vShow.value)}"`);
  }

  vModels.forEach((vModel) => {
    const modifiers = getModifiers(vModel.modifiers, true);
    const arg = vModel.arg
      ? isJSExpression(vModel.arg)
        ? `:[${parseValue(vModel.arg)}]`
        : `:${vModel.arg}`
      : '';
    result.push(`v-model${arg}${modifiers}="${parseValue(vModel.value)}"`);
  });

  if (vFor) {
    const { item, index } = vFor.iterator || { item: 'item', index: 'index' };
    result.push(`v-for="(${item}, ${index}) in ${parseValue(vFor.value)}"`);
  }
  // todo: 实现others 指令
  return result;
}

function parseTemplate(children: NodeSchema[] = []) {
  const result: string[] = [];
  for (let child of children) {
    const { name, invisible, slot } = child;
    if (invisible) {
      continue;
    }
    const props = bindNodeProps(child.props).join(' ');
    const events = bindNodeEvents(child.events).join(' ');
    const directives = parseDirectives(child.directives).join(' ');
    const node = wrapSlot(
      slot,
      `<${name} ${directives} ${props} ${events}>
      ${parseNodeChildren(child.children)}
    </${name}>`
    );
    result.push(node);
  }
  return result;
}

function parseNodeChildren(children?: NodeChildrenSchema) {
  if (!children) return '';
  if (typeof children === 'string') {
    return children;
  }
  if (isJSExpression(children)) {
    return `{{ ${parseValue(children)} }}`;
  }

  if (Array.isArray(children)) {
    return parseTemplate(children).join('\n');
  }
}

function parseImports(schema: BlockSchema) {
  // todo: 分析 schema 生成引用 components， utils
  const imports: string[] = [];
  let items: string[] = [];
  // Object.entries({ ...components, ...utils }).forEach(([name, value]) => {
  //   if (value.length > 0) {
  //     imports.push(`import {${value.join(',')}} from '${name}';`);
  //     items = items.concat(value);
  //   }
  // });
  return {
    imports,
    items
  };
}

export function schemaParser(schema: BlockSchema): ICodeToken {
  const vueImports = new Set<string>(['reactive']);
  const { id = '', name = '', css = '', emits = [] } = schema;
  const { Props, defaults } = parseProps(schema.props);
  const state = parseState(schema.state);
  const computed = parseComputed(schema.computed);
  const methods = parseMethods(schema.methods);
  const injects = parseInject(schema.inject ?? []);
  const watches = parseWatch(schema.watch ?? []);
  const lifeCycles = parseLifeCycles(schema.lifeCycles ?? {});
  const nodes = parseTemplate(schema.children ?? []);

  const { imports, items: importItems } = parseImports(schema);

  if (computed.names.length > 0) {
    vueImports.add('computed');
  }
  if (watches.length > 0) {
    vueImports.add('watch');
  }
  if (injects.names.length > 0) {
    vueImports.add('inject');
  }

  lifeCycles.names.forEach((n) => {
    vueImports.add(n);
  });

  return {
    id,
    name,
    css,
    emits: emits.join(','),
    Props: Props.join(','),
    propsDefault: defaults.join(','),
    state: state.join(','),
    computedValues: computed.values.join('\n'),
    computedNames:
      computed.names.length > 0 ? ',' + computed.names.join(',') : '',
    methodsValues: methods.values.join('\n'),
    methodsNames: methods.names.length > 0 ? ',' + methods.names.join(',') : '',
    injectValues: injects.values.join('\n'),
    injectNames: injects.names.length > 0 ? ',' + injects.names.join(',') : '',
    watch: watches.join('\n'),
    lifeCycles: lifeCycles.value.join('\n'),
    template: nodes.join('\n'),
    vueImports: Array.from(vueImports).join(','),
    imports: imports.join('\n'),
    importItems: importItems.join(',')
  };
}
