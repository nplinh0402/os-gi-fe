import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

interface CryptoData {
  name: string;
  key: string;
  colorClass: string;
  bgClass: string;
  trend: 'up' | 'down';
  change: string;
}

@Component({
  selector: "crypto-stats-widget",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./cryptostatswidget.html",
})
export class CryptoStatsWidget {
  @Input() dataHeader: any = {
    btc: '$45,230.50',
    eth: '$3,125.80',
    bnb: '$425.60',
    doge: '$0.085'
  };

  cryptoData: CryptoData[] = [
    {
      name: 'BTC',
      key: 'btc',
      colorClass: 'text-orange-500',
      bgClass: 'bg-orange-100 dark:bg-orange-900/20',
      trend: 'up',
      change: '+2.5'
    },
    {
      name: 'ETH',
      key: 'eth',
      colorClass: 'text-blue-500',
      bgClass: 'bg-blue-100 dark:bg-blue-900/20',
      trend: 'up',
      change: '+1.8'
    },
    {
      name: 'BNB',
      key: 'bnb',
      colorClass: 'text-yellow-500',
      bgClass: 'bg-yellow-100 dark:bg-yellow-900/20',
      trend: 'down',
      change: '-0.5'
    },
    {
      name: 'DOGE',
      key: 'doge',
      colorClass: 'text-purple-500',
      bgClass: 'bg-purple-100 dark:bg-purple-900/20',
      trend: 'up',
      change: '+5.2'
    }
  ];

  getValueByKey(key: string): string {
    return this.dataHeader[key] || '0';
  }
}