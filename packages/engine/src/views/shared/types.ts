export interface TabItem {
  name: string;
  label: string;
  closable?: boolean;
}

export interface MoreItem {
  label: string;
  name: string;
  checked?: boolean;
  closable?: boolean;
}

export interface ToolItem {
  icon: string;
  name: string;
}

export interface PanelProps {
  icon?: string;
  title?: string | null;
  subtitle?: string;
  tools?: ToolItem[];
  bodyPadding?: boolean;
  back?: boolean;
}
