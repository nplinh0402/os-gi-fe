import { Component, inject, OnInit, OnDestroy } from "@angular/core";
import { ChartModule } from "primeng/chart";
import { ButtonModule } from "primeng/button";
import { CommonModule } from "@angular/common";
import { Layout } from "../../../services/layout";
import { debounceTime, Subscription } from "rxjs";

interface VolumeStats {
  label: string;
  value: number;
  color: string;
}

@Component({
  selector: "volume-chart-widget",
  standalone: true,
  imports: [CommonModule, ChartModule, ButtonModule],
  templateUrl: "./volumechartwidget.html",
})
export class VolumeChartWidget implements OnInit, OnDestroy {
  layoutService = inject(Layout);
  subscription!: Subscription;

  chartData: any;
  chartOptions: any;

  volumeStats: VolumeStats[] = [
    { label: 'BTC', value: 35, color: '#f59e0b' },
    { label: 'ETH', value: 28, color: '#3b82f6' },
    { label: 'BNB', value: 22, color: '#eab308' },
    { label: 'DOGE', value: 15, color: '#8b5cf6' }
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

    this.chartData = {
      labels: this.volumeStats.map(stat => stat.label),
      datasets: [
        {
          data: this.volumeStats.map(stat => stat.value),
          backgroundColor: this.volumeStats.map(stat => stat.color),
          borderColor: this.volumeStats.map(stat => stat.color),
          borderWidth: 2,
          hoverBackgroundColor: this.volumeStats.map(stat => stat.color + '80'),
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
          callbacks: {
            label: (context: any) => {
              return `${context.label}: ${context.parsed}%`;
            }
          }
        }
      },
      cutout: '60%',
      animation: {
        animateRotate: true,
        animateScale: true
      }
    };
  }

  refreshData() {
    // Simulate data refresh
    const newData = this.volumeStats.map(stat => ({
      ...stat,
      value: Math.floor(Math.random() * 40) + 10
    }));
    
    this.volumeStats = newData;
    this.chartData = {
      ...this.chartData,
      datasets: [{
        ...this.chartData.datasets[0],
        data: newData.map(stat => stat.value)
      }]
    };
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}