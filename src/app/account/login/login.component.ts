import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formData!: FormGroup;
  hidePassword: boolean = true;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    console.log("Here");
  }
}
