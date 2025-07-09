import { Component, inject, OnInit, OnDestroy } from "@angular/core";
import { ChartModule } from "primeng/chart";
import { DropdownModule } from "primeng/dropdown";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Layout } from "../../../services/layout";
import { debounceTime, Subscription } from "rxjs";

@Component({
  selector: "profit-chart-widget",
  standalone: true,
  imports: [CommonModule, ChartModule, DropdownModule, FormsModule],
  templateUrl: "./profitchartwidget.html",
})
export class ProfitChartWidget implements OnInit, OnDestroy {
  layoutService = inject(Layout);
  subscription!: Subscription;

  chartData: any;
  chartOptions: any;
  selectedTimeRange = '7d';

  timeRanges = [
    { label: '7 ngày', value: '7d' },
    { label: '30 ngày', value: '30d' },
    { label: '3 tháng', value: '3m' },
    { label: '1 năm', value: '1y' }
  ];

  constructor() {
    this.subscription = this.layoutService.appStateUpdate$
      .pipe(debounceTime(25))
      .subscribe(() => {
        this.initChart();
      });
  }

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

    this.chartData = {
      labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
      datasets: [
        {
          label: 'Lợi nhuận ($)',
          data: [1200, 1900, 3000, 5000, 2300, 3200, 4100],
          fill: true,
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          borderColor: documentStyle.getPropertyValue("--green-500"),
          borderWidth: 2,
          tension: 0.4,
          pointBackgroundColor: documentStyle.getPropertyValue("--green-500"),
          pointBorderColor: documentStyle.getPropertyValue("--green-500"),
          pointRadius: 4,
        }
      ]
    };

    this.chartOptions = {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: surfaceBorder,
          borderWidth: 1,
        }
      },
      scales: {
        x: {
          grid: {
            color: surfaceBorder,
            drawBorder: false
          },
          ticks: {
            color: textColor
          }
        },
        y: {
          grid: {
            color: surfaceBorder,
            drawBorder: false
          },
          ticks: {
            color: textColor,
            callback: function(value: any) {
              return '$' + value.toLocaleString();
            }
          }
        }
      }
    };
  }

  onTimeRangeChange(event: any) {
    // Update chart data based on selected time range
    const dataMap: { [key: string]: number[] } = {
      '7d': [1200, 1900, 3000, 5000, 2300, 3200, 4100],
      '30d': [15000, 18000, 22000, 25000, 28000, 32000, 35000],
      '3m': [45000, 52000, 48000, 55000, 62000, 58000, 65000],
      '1y': [120000, 135000, 142000, 158000, 165000, 172000, 180000]
    };

    const labelsMap: { [key: string]: string[] } = {
      '7d': ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
      '30d': ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'],
      '3m': ['Tháng 1', 'Tháng 2', 'Tháng 3'],
      '1y': ['Q1', 'Q2', 'Q3', 'Q4']
    };

    this.chartData = {
      ...this.chartData,
      labels: labelsMap[event.value] || labelsMap['7d'],
      datasets: [{
        ...this.chartData.datasets[0],
        data: dataMap[event.value] || dataMap['7d']
      }]
    };
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}