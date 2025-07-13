export interface MenuItem {
  icon: string;
  label: string;
  link: string;
  roles?: string[];
  items?: MenuItem[];
}
