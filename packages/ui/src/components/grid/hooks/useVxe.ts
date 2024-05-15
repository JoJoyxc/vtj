import { VxeGrid, VXETable, type VXETableConfigOptions } from 'vxe-table';
import { useAdapter } from '../../../adapter';
export function useVxe(options: VXETableConfigOptions = {}) {
  const { vxeConfig } = useAdapter();
  VXETable.config({
    ...vxeConfig,
    ...options
  });
  return {
    VxeGrid,
    VXETable
  };
}
