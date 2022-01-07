import { Component, OnInit } from '@angular/core';
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
    private authService: AuthenticationService) { }

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

      this.orderService.postOrders(orderPost);
    }
  }

}
