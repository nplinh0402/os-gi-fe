import { Component } from "@angular/core";
import { ProductOverviewWidget } from "./productoverviewwidget/productoverviewwidget";
import { RecentActivityWidget } from "./recentactivitywidget/recentactivitywidget";
import { CryptoStatsWidget } from "./cryptostatswidget/cryptostatswidget";
import { ProfitChartWidget } from "./profitchartwidget/profitchartwidget";
import { VolumeChartWidget } from "./volumechartwidget/volumechartwidget";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-dashboard",
  imports: [
    ProductOverviewWidget,
    RecentActivityWidget,
    CryptoStatsWidget,
    ProfitChartWidget,
    VolumeChartWidget,
    TranslateModule,
  ],
  templateUrl: "./dashboard.html",
  styleUrl: "./dashboard.scss",
})
export class Dashboard {}