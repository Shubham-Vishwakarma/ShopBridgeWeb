import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthenticationService } from '../../services/auth/authentication.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerFormData!: FormGroup;
  hidePassword: boolean = true;
  loading = false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.registerFormData = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {

    if(!this.registerFormData.valid)
      return;

    this.loading = true;
    this.authService.register(this.registerFormData.value.name, this.registerFormData.value.email, this.registerFormData.value.password)
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
