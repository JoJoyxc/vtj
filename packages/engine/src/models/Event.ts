import {
  NodeEventSchema,
  NodeEventsSchema,
  JSFunction,
  NodeModifiers
} from '../core';
export class Event {
  public handler: JSFunction;
  public modifiers: NodeModifiers = {};
  constructor(public name: string, schema: NodeEventSchema) {
    const { handler } = schema;
    this.handler = handler;
    this.update(schema);
  }
  update(schema: NodeEventSchema) {
    const { handler, modifiers = {} } = schema;
    this.handler = handler;
    this.modifiers = modifiers;
  }
  static toDsl(events: Record<string, Event>): NodeEventsSchema {
    return Object.entries(events).reduce((result, [name, event]) => {
      const { handler, modifiers } = event;
      result[name] = { handler, modifiers };
      return result;
    }, {} as NodeEventsSchema);
  }
  static parse(events: NodeEventsSchema = {}): Record<string, Event> {
    return Object.entries(events).reduce((result, [name, schema]) => {
      result[name] = new Event(name, schema);
      return result;
    }, {} as Record<string, Event>);
  }
}
