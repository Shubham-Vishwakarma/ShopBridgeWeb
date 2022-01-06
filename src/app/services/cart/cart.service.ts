import { Injectable } from '@angular/core';
import { CartItem } from '../../models/cart-item'
import { Item } from '../../models/item'
import { Subject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartListener = new  Subject<number>();
  private cartItems: Item[] = [];

  constructor() { }

  public addToCart(cartItem: Item): void {
    this.cartItems.push(cartItem);
    this.cartListener.next(this.cartItems.length);
  }

  public getCart() : Item[] {
    return this.cartItems;
  }

  public getCartListener(): Observable<number> {
    return this.cartListener.asObservable();
  }

}
