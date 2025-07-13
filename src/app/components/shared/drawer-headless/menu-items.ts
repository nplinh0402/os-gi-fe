import { MenuItem } from "../../../interfaces/menu-item";

export const menuItems: MenuItem[] = [
  {
    icon: "pi pi-chart-line mr-2",
    label: "Dashboard",
    link: "/dashboard",
    roles: ["admin", "user"],
  },
  {
    icon: "pi pi-bitcoin mr-2",
    label: "Exchange",
    link: "/companys",
    roles: ["admin"],
  },
  {
    icon: "pi pi-users mr-2",
    label: "User",
    link: "/users",
    roles: ["admin"],
  },
  {
    icon: "pi pi-search mr-2",
    label: "Market",
    link: "/market",
  },
];
