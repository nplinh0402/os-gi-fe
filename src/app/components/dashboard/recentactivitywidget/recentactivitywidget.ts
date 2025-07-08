import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { CommonModule } from "@angular/common";

@Component({
  selector: "recent-activity-widget",
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: "./recentactivitywidget.html",
})
export class RecentActivityWidget {
  activities = [
    {
      icon: "pi-shopping-cart",
      text: "New order #1123",
      time: "2 minutes ago",
      color: "text-primary",
    },
    {
      icon: "pi-user-plus",
      text: "New customer registered",
      time: "15 minutes ago",
      color: "text-green-500",
    },
    {
      icon: "pi-check-circle",
      text: "Payment processed",
      time: "25 minutes ago",
      color: "text-blue-500",
    },
    {
      icon: "pi-inbox",
      text: "Inventory updated",
      time: "40 minutes ago",
      color: "text-yellow-500",
    },
  ];
}
