import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { AuthenticationService } from './services/auth/authentication.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'shopbridgeweb';
  currentUser!: User;
  isAuthenticated = false;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authenticationService.currentUserSubject.subscribe((x : any) => {
      this.currentUser = x.value;
    });
    if(localStorage.getItem("currentUser") == null){
      this.isAuthenticated = false;
    }
    else {
      this.isAuthenticated = true;
    }
  }

  logout() {
    this.authenticationService.logout();
  }

}
