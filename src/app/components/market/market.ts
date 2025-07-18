import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

import { CardModule } from "primeng/card";
import { AvatarModule } from "primeng/avatar";
import { ButtonModule } from "primeng/button";
import { ImageModule } from "primeng/image";

interface Market {
  id: number;
  name: string;
  url: string;
  image?: string;
}

@Component({
  selector: "app-market",
  templateUrl: "./market.html",
  styleUrls: ["./market.scss"],
  imports: [CardModule, AvatarModule, ButtonModule, CommonModule, ImageModule],
})
export class MarketComponent implements OnInit {
  markets: Market[] = [];
  breadCrumbItems: any[] = [];

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    // Initialize breadcrumb
    this.breadCrumbItems = [
      { label: "Ecommerce", routerLink: ["/ecommerce"] },
      { label: "Markets" },
    ];

    // Mock data for markets
    this.markets = [
      {
        id: 1,
        name: "CoinMarketCap",
        url: "https://coinmarketcap.com/",
        image: "./images/coin_market_cap.png",
      },
      {
        id: 2,
        name: "CoinMarketCap",
        url: "https://coinmarketcap.com/",
        image: "./images/coin_market_cap.png",
      },
      {
        id: 3,
        name: "CoinMarketCap",
        url: "https://coinmarketcap.com/",
        image: "./images/coin_market_cap.png",
      },
      {
        id: 4,
        name: "CoinMarketCap",
        url: "https://coinmarketcap.com/",
        image: "./images/coin_market_cap.png",
      },
    ];
  }

  onClick(market: Market): void {
    if (market.url) {
      window.open(market.url, "_blank");
    }
  }

  loadMore(): void {
    console.log("Load more clicked");
    // Here you can call API to fetch additional markets and append to the array
    const newMarkets: Market[] = [
      {
        id: 4,
        name: "",
        url: "",
        image: "",
      },
      // Add more mock or fetched data
    ];
    this.markets = [...this.markets, ...newMarkets];
  }
}
