import { Routes } from "@angular/router";
import { Login } from "./components/login/login";
import { ShopComponent } from "./components/shop/shop";
import { CompanyComponent } from "./components/company/company";
import { TransactionComponent } from "./components/transaction/transaction";
import { UserComponent } from "./components/user/user";
import { Dashboard } from "./components/dashboard/dashboard";
import { AuthGuard } from "./guards/auth-guard";

export const routes: Routes = [
  {
    path: "login",
    component: Login,
  },
  {
    path: "dashboard",
    component: Dashboard,
    canActivate: [AuthGuard],
    data: {
      roles: ["admin", "user"],
    },
  },
  {
    path: "shops",
    component: ShopComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ["admin", "user"],
    },
  },
  {
    path: "companys",
    component: CompanyComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ["admin", "user"],
    },
  },
  {
    path: "transactions",
    component: TransactionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ["admin", "user"],
    },
  },
  {
    path: "users",
    component: UserComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ["admin", "user"],
    },
  },
  //   {
  //     path: "users/:id",
  //     component: User,
  //     // canActivate: [AuthRoleGuard],
  //     data: {
  //       accessRole: ["admin", "user"],
  //     },
  //   },
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
];
