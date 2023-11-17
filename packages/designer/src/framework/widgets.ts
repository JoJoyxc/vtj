export class BaseWidget {}

export class WidgetManager {
  private static widgets: Record<string, any> = {};
  static register() {
    this.widgets['name'] = 'ab';
  }
}
