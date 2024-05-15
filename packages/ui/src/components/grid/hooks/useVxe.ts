import { getCurrentInstance } from 'vue';
import {
  VxeTableFilterModule,
  VxeTableEditModule,
  VxeTableMenuModule,
  VxeTableExportModule,
  VxeTableKeyboardModule,
  VxeTableValidatorModule,
  VxeTableCustomModule,
  VxeGrid,
  VXETable,
  VxeTooltip,
  VxeToolbar,
  VxeModal,
  type VXETableConfigOptions
} from 'vxe-table';
import { useAdapter } from '../../../adapter';
export function useVxe(options: VXETableConfigOptions = {}) {
  const modules = [
    VxeTableFilterModule,
    VxeTableEditModule,
    VxeTableMenuModule,
    VxeTableExportModule,
    VxeTableKeyboardModule,
    VxeTableValidatorModule,
    VxeTableCustomModule,
    VxeGrid,
    VxeTooltip,
    VxeToolbar,
    VxeModal
  ];
  const instance = getCurrentInstance();
  const app = instance?.appContext.app;
  const { vxeConfig } = useAdapter();
  VXETable.config({
    ...vxeConfig,
    ...options
  });
  if (app && !(app as any).__installVxe) {
    modules.forEach((n) => app.use(n));
    (app as any).__installVxe = true;
  }

  return {
    VxeGrid,
    VXETable
  };
}
