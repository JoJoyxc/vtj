import { ref } from 'vue';
import { widgetManager } from '../../managers';
import { RegionType } from '../../framework';

export function useRegion(region: RegionType) {
  const widgets = widgetManager.getWidgets(region).filter((n) => !n.invisible);
  const widgetsRef = ref();

  return {
    widgets,
    widgetsRef
  };
}
