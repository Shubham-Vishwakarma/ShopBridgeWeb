import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router'
import { AuthenticationService } from '../services/auth/authentication.service'
import { CartService } from '../services/cart/cart.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User | null = null;
  isAuthenticated = false;
  cartItemCount: number = 0;

  constructor(
    private authenticationService: AuthenticationService,
    private cartService: CartService,
    private router: Router) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authenticationService.isAuthenticated;
    this.currentUser = this.authenticationService.user;
    this.cartItemCount = this.cartService.getCart().length;

    this.authenticationService.getAuthStateListener().subscribe((x : boolean) => {
      this.isAuthenticated = x
      this.currentUser = this.authenticationService.user
    });

    this.cartService.getCartListener().subscribe((count: number) => {
      this.cartItemCount = count;
    });

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/"])
  }
}
