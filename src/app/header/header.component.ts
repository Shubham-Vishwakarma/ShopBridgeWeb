import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthenticationService } from '../services/auth/authentication.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User | null = null;
  isAuthenticated = false;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authenticationService.isAuthenticated;
    this.currentUser = this.authenticationService.user;
    this.authenticationService.getAuthStateListener().subscribe((x : boolean) => {
      this.isAuthenticated = x
      this.currentUser = this.authenticationService.user
    });
  }

  logout() {
    this.authenticationService.logout();
  }
}
