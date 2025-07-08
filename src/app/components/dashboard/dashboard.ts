import { Component } from "@angular/core";
import { ProductOverviewWidget } from "./productoverviewwidget/productoverviewwidget";
import { RecentActivityWidget } from "./recentactivitywidget/recentactivitywidget";
import { SalesTrendWidget } from "./salestrendwidget/salestrendwidget";
import { StatsWidget } from "./statswidget/statswidget";
import { AppTopbar } from "../app.topbar";
import { AppFooter } from "../app.footer";
@Component({
  selector: "app-dashboard",
  imports: [
    ProductOverviewWidget,
    RecentActivityWidget,
    SalesTrendWidget,
    StatsWidget,
    AppTopbar,
    AppFooter,
  ],
  templateUrl: "./dashboard.html",
  styleUrl: "./dashboard.scss",
})
export class Dashboard {}
