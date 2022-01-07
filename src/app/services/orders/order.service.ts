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
    console.log(orderPost);
    this.httpClient.post('http://localhost:5135/api/order', orderPost)
      .subscribe((result: any) => {
        console.log(result);
      },
      (error: any) => {
        console.log(error);
      });
  }

}
