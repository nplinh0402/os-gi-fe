import { Component, OnInit } from "@angular/core";
import { CardModule } from "primeng/card";
import { AvatarModule } from "primeng/avatar";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { Router } from "@angular/router";
interface Shop {
  id: number;
  initials: string;
  avatarColor: string;
  ownerName: string;
  products: number;
  wallet: number;
}

@Component({
  selector: "app-company",
  templateUrl: "./company.html",
  styleUrls: ["./company.scss"],
  imports: [CardModule, AvatarModule, ButtonModule, CommonModule],
})
export class CompanyComponent implements OnInit {
  shops: Shop[] = [];
  breadCrumbItems: any[] = [];

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    // Initialize breadcrumb
    this.breadCrumbItems = [
      { label: "Ecommerce", routerLink: ["/ecommerce"] },
      { label: "Shops" },
    ];

    // Mock data for shops
    this.shops = [
      {
        id: 1,
        initials: "AB",
        avatarColor: "#4A5FBF",
        ownerName: "Alice Brown",
        products: 120,
        wallet: 2500.75,
      },
      {
        id: 2,
        initials: "CD",
        avatarColor: "#F57C00",
        ownerName: "Charlie Davis",
        products: 75,
        wallet: 1830.5,
      },
      {
        id: 3,
        initials: "EF",
        avatarColor: "#388E3C",
        ownerName: "Eva Frost",
        products: 42,
        wallet: 975.0,
      },
      {
        id: 3,
        initials: "EF",
        avatarColor: "#388E3C",
        ownerName: "Eva Frost",
        products: 42,
        wallet: 975.0,
      },
      {
        id: 3,
        initials: "EF",
        avatarColor: "#388E3C",
        ownerName: "Eva Frost",
        products: 42,
        wallet: 975.0,
      },
      {
        id: 3,
        initials: "EF",
        avatarColor: "#388E3C",
        ownerName: "Eva Frost",
        products: 42,
        wallet: 975.0,
      },
      {
        id: 3,
        initials: "EF",
        avatarColor: "#388E3C",
        ownerName: "Eva Frost",
        products: 42,
        wallet: 975.0,
      },
      {
        id: 3,
        initials: "EF",
        avatarColor: "#388E3C",
        ownerName: "Eva Frost",
        products: 42,
        wallet: 975.0,
      },
      {
        id: 3,
        initials: "EF",
        avatarColor: "#388E3C",
        ownerName: "Eva Frost",
        products: 42,
        wallet: 975.0,
      },
      {
        id: 3,
        initials: "EF",
        avatarColor: "#388E3C",
        ownerName: "Eva Frost",
        products: 42,
        wallet: 975.0,
      },
      {
        id: 3,
        initials: "EF",
        avatarColor: "#388E3C",
        ownerName: "Eva Frost",
        products: 42,
        wallet: 975.0,
      },
      {
        id: 3,
        initials: "EF",
        avatarColor: "#388E3C",
        ownerName: "Eva Frost",
        products: 42,
        wallet: 975.0,
      },

      // Add more shops as needed
    ];
  }

  onClick(shop: Shop): void {
    this.router.navigate(["/shops"]);
  }

  loadMore(): void {
    console.log("Load more clicked");
    // Here you can call API to fetch additional shops and append to the array
    const newShops: Shop[] = [
      {
        id: 4,
        initials: "GH",
        avatarColor: "#D32F2F",
        ownerName: "George Hill",
        products: 90,
        wallet: 2150.3,
      },
      // Add more mock or fetched data
    ];
    this.shops = [...this.shops, ...newShops];
  }
}
