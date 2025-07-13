import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormGroup, FormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";

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
import { DialogModule } from "primeng/dialog";
import { AutoCompleteModule } from "primeng/autocomplete";
import { MenuItem, MessageService } from "primeng/api";
import { CardModule } from "primeng/card";
import { PasswordModule } from "primeng/password";

import { ApiService } from "../../../services/api";
import { User } from "../../../interfaces/user";
import { Shop } from "../../../interfaces/shop";

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
    ToastModule,
    CardModule,
    AutoCompleteModule,
    DialogModule,
    PasswordModule,
  ],
  templateUrl: "./user-detail.html",
  styleUrl: "./user-detail.scss",
  providers: [MessageService],
})
export class UserDetailComponent implements OnInit {
  currentUser: User = {
    code: "",
    name: "",
    username: "",
    password: "",
    created_at: 0,
  }; // renamed from "products" for clarity

  cols: Column[] = [];
  selectedColumns: Column[] = [];
  loading = false;
  actions: MenuItem[] = [];
  dialogVisible = false;
  dialogMode: "create" | "view" | "edit" = "create";
  selectedUser: User | null = null;
  userForm: FormGroup | null = null;
  visible: boolean = false;
  shopID = 0;
  userID = 0;
  // Properties for user detail form

  // Properties for shop autocomplete
  selectedShop: any = null;
  shopOptions: any[] = [];
  filteredItems: any[] = [];

  constructor(
    private apiService: ApiService,
    private messageService: MessageService,
    private router: Router,
    private cd: ChangeDetectorRef,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.shopID = params.get("shop_id")
        ? parseInt(params.get("shop_id") || "0")
        : 0;
    });
    this.fetchData();
    this.initShopOptions();
  }

  private fetchData() {
    this.loading = true;
    let id = this.activatedRoute.snapshot.paramMap.get("id") || 0;
    this.apiService.getDetail<{ user: User }>("/users", id).subscribe({
      next: (res) => {
        this.currentUser = res.user || {}; // assuming API returns an array of User
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
  private initShopOptions() {
    this.apiService.getList<{ shops: Shop[] }>("/shops").subscribe({
      next: (res) => {
        this.shopOptions = (res.shops || []).map((shop) => ({
          label: shop.shop_name || "",
          value: shop.shop_name,
          id: shop.id, // or shop.id if you want just the id
        }));
        this.filteredItems = this.shopOptions;
      },
      error: (err) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: err.error?.message || "Failed to fetch shops",
        });
      },
    });
  }

  onRowClick(data: any) {
    if (this.shopID > 0) {
      this.router.navigate(["/transactions"]);
    }
  }
  onActionClick(event: MouseEvent): void {
    event.stopPropagation(); // Ngăn sự kiện lan lên <tr>
  }
  getActions(user: User) {
    return [
      {
        label: "View Details",
        icon: "pi pi-fw pi-eye",
        command: () => this.openDialog("view", user),
      },
      //   {
      //     label: "Edit",
      //     icon: "pi pi-fw pi-pencil",
      //     command: () => this.openDialog("edit", user),
      //   },
      //   { separator: true },
      //   {
      //     label: "Delete",
      //     icon: "pi pi-fw pi-trash",
      //   },
    ];
  }
  onSubmit() {
    if (!this.userForm?.valid) return;

    const userData = this.userForm.value;
    if (this.dialogMode === "create") {
      this.apiService.create("/users", userData).subscribe({
        next: () => {
          this.messageService.add({
            severity: "success",
            summary: "User Created",
          });
          this.fetchData();
          this.closeDialog();
        },
        error: (err) => {
          this.messageService.add({
            severity: "error",
            summary: "Create Failed",
            detail: err.error?.message || "Could not create user",
          });
        },
      });
    } else if (this.dialogMode === "edit" && this.selectedUser) {
      this.apiService
        .update(`/users`, this.selectedUser.id || 0, userData)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: "success",
              summary: "User Updated",
            });
            this.fetchData();
            this.closeDialog();
          },
          error: (err) => {
            this.messageService.add({
              severity: "error",
              summary: "Update Failed",
              detail: err.error?.message || "Could not update user",
            });
          },
        });
    }
  }

  openDialog(mode: "create" | "view" | "edit", user?: User) {
    user ??= {
      id: 0,
      username: "",
      code: "",
      password: "",
      name: "",
      email: "",
      created_at: 0,
      lastLogin: 0,
    };
    this.dialogMode = mode;

    this.selectedUser = { ...user };

    this.visible = true;
  }

  closeDialog() {
    this.dialogVisible = false;
    this.selectedUser = null;
  }

  onCreateUser() {
    // TODO: Implement user creation logic
    this.closeDialog();
  }

  onUpdateUser() {
    // TODO: Implement user update logic
    this.closeDialog();
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

  // Optionally, add a filter method for autocomplete (if needed by template)
  filterShops(event: any) {
    const query = event.query.toLowerCase();
    this.filteredItems = this.shopOptions.filter((option) =>
      option.label.toLowerCase().includes(query)
    );
  }
}
