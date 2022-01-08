import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/models/order';
import { OrderPost } from 'src/app/models/order-post'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  getOrders() {
    return this.httpClient.get<Order[]>('http://localhost:5135/api/Order');
  }

  postOrders(orderPost: OrderPost) {
    return this.httpClient.post('http://localhost:5135/api/order', orderPost);
  }

}
