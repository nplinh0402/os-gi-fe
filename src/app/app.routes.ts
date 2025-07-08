import { Routes } from "@angular/router";
import { Login } from "./components/login/login";
import { Shop } from "./components/shop/shop";
import { Company } from "./components/company/company";
import { Transaction } from "./components/transaction/transaction";
import { User } from "./components/user/user";
import { Dashboard } from "./components/dashboard/dashboard";

export const routes: Routes = [
  {
    path: "login",
    component: Login,
  },
  {
    path: "dashboard",
    component: Dashboard,
  },
  {
    path: "shops",
    component: Shop,
    // canActivate: [A],
    data: {
      accessRole: ["admin", "user"],
    },
  },
  {
    path: "company",
    component: Company,
    // canActivate: [AuthRoleGuard],
    data: {
      accessRole: ["admin", "user"],
    },
  },
  {
    path: "transactions",
    component: Transaction,
    // canActivate: [AuthRoleGuard],
    data: {
      accessRole: ["admin", "user"],
    },
  },
  {
    path: "users",
    component: User,
    // canActivate: [AuthRoleGuard],
    data: {
      accessRole: ["admin"],
    },
  },
  {
    path: "users/:id",
    component: User,
    // canActivate: [AuthRoleGuard],
    data: {
      accessRole: ["admin", "user"],
    },
  },
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
];
