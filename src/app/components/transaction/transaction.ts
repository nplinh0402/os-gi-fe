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
import { Toast, ToastModule } from "primeng/toast";
import { TooltipModule } from "primeng/tooltip";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { TableModule } from "primeng/table";
import { MultiSelectModule } from "primeng/multiselect";
import { DialogModule } from "primeng/dialog";
import { AutoCompleteModule } from "primeng/autocomplete";
import { ProgressBar, ProgressBarModule } from "primeng/progressbar";
import { DatePicker } from "primeng/datepicker";

import { Transaction } from "../../interfaces/transaction";
import { Ripple } from "primeng/ripple";

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
    DialogModule,
    AutoCompleteModule,
    ProgressBarModule,
    DatePicker,
    ProgressBar,
    Toast,
    ButtonModule,
    ProgressBar,
  ],
  templateUrl: "./transaction.html",
  styleUrl: "./transaction.scss",
  providers: [MessageService],
})
export class TransactionComponent implements OnInit {
  progress: number = 0;
  transactions: Transaction[] = []; // renamed from "products" for clarity
  cols: Column[] = [];
  selectedColumns: Column[] = [];
  loading = false;
  dialogMode: "create" | "export" = "create";
  visible: boolean = false;
  toastVisible: boolean = false;
  dataType: any = null;
  rangeDates: Date[] | undefined;
  filteredItems: any[] = [];
  dataTypeOptions: any[] = [];
  // Progress bar state for export toast
  exportProgress: number = 0;
  exportInterval: any = null;
  exportToastKey: string = "export-toast";
  interval: any = null;
  constructor(
    private apiService: ApiService,
    private messageService: MessageService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initColumns();
    this.fetchtransactions();
    this.initDataTypeOptions();
  }

  private initColumns() {
    this.cols = [{ field: "name", header: "Detail" }];
    this.selectedColumns = [...this.cols];
  }

  private fetchtransactions() {
    this.loading = true;
    // this.apiService
    //   .getList<{ transactions: Transaction[] }>("/transactions")
    //   .subscribe({
    //     next: (res) => {
    //       this.transactions = res.transactions || []; // assuming API returns an array of User
    //       this.loading = false;
    //       this.cd.detectChanges();
    //     },
    //     error: (err) => {
    //       this.loading = false;
    //       this.messageService.add({
    //         severity: "error",
    //         summary: "Error",
    //         detail: err.error?.message || "Failed to fetch transactions",
    //       });
    //     },
    //   });
    this.loading = false;
  }
  private initDataTypeOptions() {
    this.dataTypeOptions = [
      { label: "Exchange", value: "Exchange" },
      { label: "System", value: "System" },
    ];
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
  openDialog(mode: "create" | "export", data?: any) {
    this.dialogMode = mode;

    this.visible = true;
  }
  showExport() {
    this.visible = false;
    if (!this.toastVisible) {
      this.messageService.add({
        key: "confirm",
        sticky: true,
        severity: "custom",
        summary: "Exporting your files.",
        styleClass: "backdrop-blur-lg rounded-2xl",
      });
      this.toastVisible = true;
      this.progress = 0;

      if (this.interval) {
        clearInterval(this.interval);
      }

      this.interval = setInterval(() => {
        if (this.progress < 100) {
          this.progress = this.progress + 20;
        }

        if (this.progress >= 100) {
          this.progress = 100;
          clearInterval(this.interval);
          setTimeout(() => {
            this.messageService.clear("confirm");
            this.onCloseToast();
            this.messageService.add({
              severity: "success",
              summary: "Export successful",
              detail: "File has been exported successfully",
            });
          }, 1000);
        }
        this.cdr.markForCheck();
      }, 1000);
    }
  }

  filterShops(event: any) {
    const query = event.query.toLowerCase();
    this.filteredItems = this.dataTypeOptions.filter((option) =>
      option.label.toLowerCase().includes(query)
    );
  }
  onCloseToast() {
    this.toastVisible = false;
  }
}
