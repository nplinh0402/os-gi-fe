import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ApiService } from "../../services/api";
import { Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { MessageService } from "primeng/api";
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
import { Transaction } from "../../interfaces/transaction";

interface Column {
  field: string;
  header: string;
}
@Component({
  selector: "app-transaction",
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
  templateUrl: "./transaction.html",
  styleUrl: "./transaction.scss",
  providers: [MessageService],
})
export class TransactionComponent implements OnInit {
  transactions: Transaction[] = []; // renamed from "products" for clarity
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
    this.fetchtransactions();
  }

  private initColumns() {
    this.cols = [{ field: "name", header: "Detail" }];
    this.selectedColumns = [...this.cols];
  }

  private fetchtransactions() {
    // this.loading = true;
    this.apiService
      .getList<{ transactions: Transaction[] }>("/transactions")
      .subscribe({
        next: (res) => {
          this.transactions = res.transactions || []; // assuming API returns an array of User
          this.loading = false;
          this.cd.detectChanges();
        },
        error: (err) => {
          this.loading = false;
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: err.error?.message || "Failed to fetch transactions",
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
