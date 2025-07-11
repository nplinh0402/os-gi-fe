import { Component } from "@angular/core";
import { AppTopbar } from "./components/shared/topbar/app.topbar";
import { AppFooter } from "./components/shared/footer/app.footer";
import { RouterModule, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [AppTopbar, RouterOutlet, AppFooter, RouterModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {}
