import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { TagModule } from "primeng/tag";
import { ToastModule } from "primeng/toast";
import { TooltipModule } from "primeng/tooltip";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { Router, RouterModule } from "@angular/router";
import { TableModule } from "primeng/table";
import { ShopService } from "../../services/shop";
import { Product } from "../../interfaces/shop";
import { MultiSelectModule } from "primeng/multiselect";
interface Column {
  field: string;
  header: string;
}
interface ShopItem {
  id: string;
  name: string;
  category: string;
  ownerName: string;
  products: number;
  wallet: number;
  rating: number;
  reviews: number;
  status: "active" | "inactive" | "pending";
  avatarColor?: string;
  createdDate: Date;
  lastActive: Date;
}

@Component({
  selector: "app-shop",
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    TagModule,
    ToastModule,
    TooltipModule,
    ProgressSpinnerModule,
    TableModule,
    MultiSelectModule,
    CommonModule,
  ],
  templateUrl: "./shop.html",
  styleUrl: "./shop.scss",
  providers: [ShopService],
})
export class ShopComponent {
  products!: Product[];

  cols!: Column[];

  selectedColumns!: Column[];

  constructor(
    private shopService: ShopService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.shopService.getProductsMini().then((data) => {
      this.products = data;
      this.cd.markForCheck();
    });

    this.cols = [
      { field: "name", header: "Name" },
      { field: "category", header: "Category" },
      { field: "quantity", header: "Quantity" },
    ];

    this.selectedColumns = this.cols;
  }
}
