import { NodeDirectiveSchema, JSExpression, NodeModifiers } from '../core';
import { uid } from '../utils';

export interface DirectiveIterator {
  item: string;
  index: string;
}

export class Directive {
  public readonly id: string;
  // 指令名称
  public name: string = '';
  // 参数
  public arg?: string | JSExpression;
  // 修饰符
  public modifiers?: NodeModifiers;
  // 指令值
  public value?: JSExpression;
  // v-for 迭代器
  public iterator?: DirectiveIterator;
  constructor(directive: NodeDirectiveSchema) {
    this.id = directive.id || uid();
    this.update(directive);
  }
  update(directive: NodeDirectiveSchema) {
    const { name, arg, modifiers, value, iterator } = directive;
    this.name = name;
    this.arg = arg;
    this.modifiers = modifiers;
    this.value = value;
    this.iterator = iterator;
  }
  static parse(directives: NodeDirectiveSchema[] = []) {
    return directives.map((value) => new Directive(value));
  }
  static toDsl(directives: Directive[] = []): NodeDirectiveSchema[] {
    return directives.map((directive) => {
      const { name, arg, modifiers, value, iterator, id } = directive;
      return {
        id,
        name,
        arg,
        modifiers,
        value,
        iterator
      };
    });
  }
}
