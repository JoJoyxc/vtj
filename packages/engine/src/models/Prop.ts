import { JSONValue, JSExpression, JSFunction, PropsSchema } from '../core';
export class Prop {
  isUnset: boolean = false;
  constructor(
    public name: string,
    public value?: JSONValue | JSExpression | JSFunction,
    public defaultValue?: JSONValue | JSExpression | JSFunction
  ) {
    this.setValue(value);
  }
  setValue(value: JSONValue | JSExpression | JSFunction) {
    this.value = value;
    this.isUnset = this.value === this.defaultValue;
  }
  getValue() {
    return this.value ?? this.defaultValue;
  }
  static toDsl(props: Record<string, Prop> = {}): PropsSchema {
    return Object.entries(props).reduce((result, [name, prop]) => {
      if (!prop.isUnset) {
        result[name] = prop.getValue();
      }
      return result;
    }, {} as PropsSchema);
  }
  static parse(props: PropsSchema = {}): Record<string, Prop> {
    return Object.entries(props).reduce((result, [name, value]) => {
      // todo: 处理默认值 defaultValue
      result[name] = new Prop(name, value);
      return result;
    }, {} as Record<string, Prop>);
  }
}
