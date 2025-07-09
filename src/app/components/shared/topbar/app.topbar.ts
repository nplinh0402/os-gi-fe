import { Component, computed, inject } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { StyleClassModule } from "primeng/styleclass";
import { AppConfig } from "../../app.config";
import { Layout } from "../../../services/layout";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { DrawerHeadless } from "../drawer-headless/drawer-headless";

@Component({
  selector: "app-topbar",
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    StyleClassModule,
    AppConfig,
    DrawerHeadless,
  ],
  templateUrl: "./app.topbar.html",
})
export class AppTopbar {
  layoutService: Layout = inject(Layout);
  router = inject(Router);

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
