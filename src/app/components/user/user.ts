import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";

import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { TagModule } from "primeng/tag";
import { ToastModule } from "primeng/toast";
import { TooltipModule } from "primeng/tooltip";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { TableModule } from "primeng/table";
import { MultiSelectModule } from "primeng/multiselect";

import { MessageService } from "primeng/api";

import { ApiService } from "../../services/api";
import { User } from "../../interfaces/user";

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: "app-user",
  standalone: true,
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
  ],
  templateUrl: "./user.html",
  styleUrl: "./user.scss",
  providers: [MessageService],
})
export class UserComponent implements OnInit {
  users: User[] = []; // renamed from "products" for clarity
  cols: Column[] = [];
  selectedColumns: Column[] = [];
  loading = false;

  constructor(
    private apiService: ApiService,
    private messageService: MessageService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initColumns();
    this.fetchUsers();
  }

  private initColumns() {
    this.cols = [
      { field: "id", header: "ID" },
      { field: "username", header: "Username" },
      { field: "name", header: "Name" },
      { field: "email", header: "Email" },
      { field: "created_at", header: "Created At" },
      { field: "lastLogin", header: "Last Login" },
    ];
    this.selectedColumns = [...this.cols];
  }

  private fetchUsers() {
    this.loading = true;
    this.apiService.getList<{ users: User[] }>("/users").subscribe({
      next: (res) => {
        this.users = res.users || []; // assuming API returns an array of User
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: err.error?.message || "Failed to fetch users",
        });
      },
    });
  }

  getSeverity(status: string): string {
    switch (status.toLowerCase()) {
      case "active":
        return "success";
      case "inactive":
        return "danger";
      case "pending":
        return "warning";
      default:
        return "info";
    }
  }
}
