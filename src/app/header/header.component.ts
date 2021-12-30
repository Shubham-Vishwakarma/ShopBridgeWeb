import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthenticationService } from '../services/auth/authentication.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser!: User;
  isAuthenticated = false;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authenticationService.isAuthenticated;
    this.authenticationService.getAuthStateListener().subscribe((x : boolean) => { this.isAuthenticated = x });
  }

  logout() {
    this.authenticationService.logout();
  }
}
