import { Component, computed, inject } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { StyleClassModule } from "primeng/styleclass";
import { AppConfig } from "../../app.config";
import { Layout } from "../../../services/layout";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { DrawerHeadless } from "../drawer-headless/drawer-headless";
import { SplitButtonModule } from "primeng/splitbutton";
import { ToastModule } from "primeng/toast";
import { Menu } from "primeng/menu";

@Component({
  selector: "app-topbar",
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    StyleClassModule,
    AppConfig,
    DrawerHeadless,
    Menu,
  ],
  templateUrl: "./app.topbar.html",
})
export class AppTopbar {
  layoutService: Layout = inject(Layout);
  router = inject(Router);
  items = [
    {
      get label() {
        return localStorage.getItem("access_token") ? "Logout" : "Login";
      },
      get icon() {
        return localStorage.getItem("access_token")
          ? "pi pi-sign-out"
          : "pi pi-sign-in";
      },
      command: () => {
        const token = localStorage.getItem("access_token");

        if (token) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("role");
          location.reload();
        } else {
          this.router.navigate(["/login"]);
        }
      },
    },
  ];

  isDarkMode = computed(() => this.layoutService.appState().darkMode);

  navigateToLogin() {
    this.router.navigate(["/login"]);
  }

  toggleDarkMode() {
    this.layoutService.appState.update((state: any) => ({
      ...state,
      darkMode: !state.darkMode,
    }));
  }
}
