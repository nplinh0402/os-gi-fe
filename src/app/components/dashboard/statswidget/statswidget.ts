import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { CommonModule } from "@angular/common";

@Component({
  selector: "stats-widget",
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: "statswidget.html",
})
export class StatsWidget {
  stats = [
    {
      title: "Total Orders",
      icon: "pi-shopping-cart",
      value: "1,234",
      subtitle: "Last 7 days",
    },
    {
      title: "Active Users",
      icon: "pi-users",
      value: "2,573",
      subtitle: "Last 7 days",
    },
    {
      title: "Revenue",
      icon: "pi-dollar",
      value: "$45,200",
      subtitle: "Last 7 days",
    },
    {
      title: "Success Rate",
      icon: "pi-chart-line",
      value: "95%",
      subtitle: "Last 7 days",
    },
  ];
}
