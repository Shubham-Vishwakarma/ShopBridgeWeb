import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/auth/authentication.service'
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formData!: FormGroup;
  hidePassword: boolean = true;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {

    if(this.formData.invalid)
      return;

    this.loading = true;

    this.authService.login(this.formData.value.email, this.formData.value.password)
    this.authService.getAuthStateListener().subscribe((r: boolean) => {
        if(r) {
          this.loading = false;
          this.router.navigate(["/"]);
        }
        else {
          this.loading = false;
        }
      });

  }
}
