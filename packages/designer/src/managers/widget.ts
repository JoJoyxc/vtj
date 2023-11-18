import { widgets as components } from '../components';
import { type Widget, RegionType } from '../framework';

const builtInWidgets: Record<RegionType, string[]> = {
  Brand: ['Logo'],
  Toolbar: [],
  Actions: [],
  Apps: [],
  Workspace: [],
  Settings: [],
  Status: []
};

class WidgetManager {
  private widgets: Record<string, Widget> = {};
  constructor(components: Record<string, any>) {
    this.widgets = this.createWidgets(components);
  }

  private createWidgets(components: Record<string, any>) {
    const entries = Object.entries(builtInWidgets) as Array<
      [keyof typeof RegionType, string[]]
    >;
    const widgets: Record<string, Widget> = {};
    for (const [region, items] of entries) {
      for (const name of items) {
        widgets[name] = {
          name,
          region,
          component: components[name] || components.EmptyWidget
        };
      }
    }
    return widgets;
  }

  register(widget: Widget) {
    this.widgets[widget.name] = widget;
    const regions = builtInWidgets[widget.region];
    if (!regions.includes(widget.name)) {
      regions.push(widget.name);
    }
  }

  get(name: string) {
    return this.widgets[name];
  }

  getWidgets(region?: keyof typeof RegionType) {
    if (region) {
      const names = builtInWidgets[region];
      return names.map((name) => this.widgets[name]);
    } else {
      return Object.values(this.widgets);
    }
  }
}

export const widgetManager = new WidgetManager(components);
