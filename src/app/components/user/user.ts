import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormGroup, FormsModule } from "@angular/forms";
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
import { DialogModule } from "primeng/dialog";

import { MenuItem, MessageService } from "primeng/api";
import { Menu } from "primeng/menu";

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
    ToastModule,
    Menu,
    DialogModule,
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
  actions: MenuItem[] = [];
  dialogVisible = false;
  dialogMode: "create" | "view" | "edit" = "create";
  selectedUser: User | null = null;
  userForm: FormGroup | null = null;
  visible: boolean = false;

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
      { field: "id", header: "Code" },
      { field: "name", header: "Name" },
      { field: "username", header: "Username" },
      //   { field: "email", header: "Email" },
      { field: "created_at", header: "Created At" },
      { field: "updated_at", header: "Last Login" },
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
          this.fetchUsers();
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
            this.fetchUsers();
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
    if (user == null) {
      user = {
        id: 0,
        username: "",
        code: "",
        password: "",
        name: "",
        email: "",
        created_at: 0,
        lastLogin: 0,
      };
    }
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
}
