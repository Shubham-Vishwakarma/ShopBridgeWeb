import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/models/order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  getOrders() {
    return this.httpClient.get<Order[]>('http://localhost:5135/api/Order');
  }

}
