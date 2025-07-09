import { Component } from "@angular/core";
import { ProductOverviewWidget } from "./productoverviewwidget/productoverviewwidget";
import { RecentActivityWidget } from "./recentactivitywidget/recentactivitywidget";
import { SalesTrendWidget } from "./salestrendwidget/salestrendwidget";
import { StatsWidget } from "./statswidget/statswidget";

@Component({
  selector: "app-dashboard",
  imports: [
    ProductOverviewWidget,
    RecentActivityWidget,
    SalesTrendWidget,
    StatsWidget,
  ],
  templateUrl: "./dashboard.html",
  styleUrl: "./dashboard.scss",
})
export class Dashboard {}