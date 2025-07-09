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
import { MessageService } from "primeng/api";
import { Router, RouterModule } from "@angular/router";
import { TableModule } from "primeng/table";
import { UserService } from "../../services/user";
import { User } from "../../interfaces/user";
import { MultiSelectModule } from "primeng/multiselect";
interface Column {
  field: string;
  header: string;
}
interface UserItem {
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
  selector: "app-user",
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
  templateUrl: "./user.html",
  styleUrl: "./user.scss",
  providers: [UserService],
})
export class UserComponent {
  products!: User[];

  cols!: Column[];

  selectedColumns!: Column[];

  constructor(
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userService.getProductsMini().then((data) => {
      this.products = data;
      this.cd.markForCheck();
    });

    this.cols = [
      { field: "code", header: "Code" },
      { field: "name", header: "Name" },
      { field: "username", header: "Username" },
      { field: "createdAt", header: "Date start" },
      { field: "lastLogin", header: "Last login" },
    ];

    this.selectedColumns = this.cols;
  }
}
