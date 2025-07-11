import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormGroup, FormsModule } from "@angular/forms";
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
import { Shop } from "../../interfaces/shop";
import { MultiSelectModule } from "primeng/multiselect";
import { MessageService } from "primeng/api";
import { ApiService } from "../../services/api";
import { Menu } from "primeng/menu";
import { DialogModule } from "primeng/dialog";
interface Column {
  field: string;
  header: string;
}

@Component({
  selector: "app-shop",
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
    CommonModule,
    Menu,
    DialogModule,
  ],
  templateUrl: "./shop.html",
  styleUrl: "./shop.scss",
  providers: [ShopService, MessageService],
})
export class ShopComponent {
  shops!: Shop[];

  cols!: Column[];
  dialogMode: "create" | "view" | "edit" = "create";
  selectedShop: Shop | null = null;
  shopForm: FormGroup | null = null;
  visible: boolean = false;
  selectedColumns!: Column[];
  loading: boolean = false;

  constructor(
    private readonly apiService: ApiService,
    private readonly shopService: ShopService,
    private readonly messageService: MessageService,
    private readonly cd: ChangeDetectorRef,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.fetchData();
    this.shopService.getProductsMini().then((data) => {
      this.shops = data;
      this.cd.markForCheck();
    });

    this.cols = [
      { field: "shop_name", header: "Shop Name" },
      { field: "account_name", header: "Account Name" },
      { field: "main_wallet_id", header: "Main Wallet ID" },
      { field: "email", header: "Email" },
      { field: "phone_number", header: "Phone" },
      { field: "created_at", header: "Created At" },
      { field: "updated_at", header: "Updated At" },
      { field: "updated_by", header: "Updated By" },
    ];

    this.selectedColumns = this.cols;
  }
  private fetchData() {
    this.loading = true;
    this.apiService.getList<{ shops: Shop[] }>("/shops").subscribe({
      next: (res) => {
        this.shops = res.shops || []; // assuming API returns an array of Shop
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: err.error?.message || "Failed to fetch shops",
        });
      },
    });
    console.log(this.shops);
  }
  onRowClick(data: any) {
    const id = data.id;
    this.router.navigate(["/shops"], { queryParams: { shop_id: id } });
  }
  openDialog(mode: "create" | "view" | "edit", shop?: Shop) {
    shop ??= {
      id: 0,
      shop_name: "",
      account_name: "",
      main_wallet_id: "",
      email: "",
      phone_number: "",
      created_at: 0,
      updated_at: 0,
      updated_by: 0,
    };
    this.dialogMode = mode;

    this.selectedShop = { ...shop };

    this.visible = true;
  }
  closeDialog() {
    this.selectedShop = null;
  }
  getActions(shop: Shop) {
    return [
      {
        label: "View Details",
        icon: "pi pi-fw pi-eye",
        command: () => this.openDialog("view", shop),
      },
      {
        label: "Edit",
        icon: "pi pi-fw pi-pencil",
        command: () => this.openDialog("edit", shop),
      },
      { separator: true },
      {
        label: "Delete",
        icon: "pi pi-fw pi-trash",
      },
    ];
  }
  onSubmit() {
    if (!this.shopForm?.valid) return;

    const shopData = this.shopForm.value;
    if (this.dialogMode === "create") {
      this.apiService.create("/shops", shopData).subscribe({
        next: () => {
          this.messageService.add({
            severity: "success",
            summary: "Shop Created",
          });
          this.fetchData();
          this.closeDialog();
        },
        error: (err) => {
          this.messageService.add({
            severity: "error",
            summary: "Create Failed",
            detail: err.error?.message || "Could not create shop",
          });
        },
      });
    } else if (this.dialogMode === "edit" && this.selectedShop) {
      this.apiService
        .update(`/shops`, this.selectedShop.id || 0, shopData)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: "success",
              summary: "Shop Updated",
            });
            this.fetchData();
            this.closeDialog();
          },
          error: (err) => {
            this.messageService.add({
              severity: "error",
              summary: "Update Failed",
              detail: err.error?.message || "Could not update shop",
            });
          },
        });
    }
  }
}
