import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { CartService } from '../services/cart/cart.service'
import { OrderService } from '../services/orders/order.service'
import { AuthenticationService } from '../services/auth/authentication.service'
import { Item } from '../models/item'
import { OrderPost } from '../models/order-post'
import { ItemPost } from '../models/item-post'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: Item[] = []

  constructor(private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
  }

  buyItems() {

    const items: ItemPost[] = []

    for(let i = 0; i < this.cartItems.length; i++) {
      const item: ItemPost = {
        productId: this.cartItems[i].productId,
        productQuantity: this.cartItems[i].productQuantity,
        productPrice: this.cartItems[i].productPrice
      }
      items.push(item);
    }

    if(this.authService.user) {
      const customerId = this.authService.user.id;
      const orderPost: OrderPost = {
        customerId: customerId,
        items: items
      }

      this.orderService.postOrders(orderPost)
        .subscribe((result: any) => {
          console.log(result);
          this.cartService.clearCart();
          this.router.navigate(["/orders"])
        },
        (error: any) => {
          console.log(error);
        });
    }
  }

  discardItems(): void {
    this.cartService.clearCart();
    this.cartItems = this.cartService.getCart();
  }

}
