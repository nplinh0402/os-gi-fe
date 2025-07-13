import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { ToastModule } from "primeng/toast";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";

import { ApiService } from "../../services/api";

@Component({
  selector: "app-login",
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
    CommonModule,
  ],
  templateUrl: "./login.html",
  styleUrl: "./login.scss",
  providers: [MessageService],
})
export class Login {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService, // ✅ inject ApiService
    private messageService: MessageService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const loginData = this.loginForm.value;

    this.api.create("/auth/login", loginData).subscribe({
      next: (res: any) => {
        this.loading = false;
        console.log("Res: " + JSON.stringify(res));
        this.messageService.add({
          severity: "success",
          summary: "Login Successful",
          detail: `Welcome ${res.user?.username || loginData.username}!`,
        });

        localStorage.setItem("access_token", res.access_token);
        localStorage.setItem("refresh_token", res.refresh_token);
        localStorage.setItem("role", res.role);

        this.router.navigate(["/dashboard"]);
      },
      error: (err) => {
        this.loading = false;

        this.messageService.add({
          severity: "error",
          summary: "Login Failed",
          detail: err.error?.message || "Invalid username or password",
        });
      },
    });
  }
}
