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

    // Simulate login process
    setTimeout(() => {
      this.loading = false;
      
      // Simple validation for demo purposes
      if (loginData.username && loginData.password) {
        this.messageService.add({
          severity: "success",
          summary: "Login Successful",
          detail: `Welcome ${loginData.username}!`,
        });
        
        // Store user info and redirect to dashboard
        localStorage.setItem("user", JSON.stringify({ username: loginData.username }));
        
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000);
      } else {
        this.messageService.add({
          severity: "error",
          summary: "Login Failed",
          detail: "Please enter valid credentials",
        });
      }
    }, 1000);
  }
}