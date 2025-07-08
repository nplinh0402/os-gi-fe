import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";

import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { ToastModule } from "primeng/toast";
import { CommonModule } from "@angular/common";
@Component({
  selector: "app-login",
  imports: [
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
    private http: HttpClient,
    private messageService: MessageService
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

    // Replace with your API endpoint
    this.http
      .post<any>("https://your-api.com/auth/login", loginData)
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.messageService.add({
            severity: "success",
            summary: "Login Successful",
            detail: `Welcome ${response.username || loginData.username}`,
          });
          // Optionally, save token or redirect
          localStorage.setItem("token", response.token);
        },
        error: (err) => {
          this.loading = false;
          this.messageService.add({
            severity: "error",
            summary: "Login Failed",
            detail: err.error?.message || "Invalid credentials",
          });
        },
      });
  }
}
