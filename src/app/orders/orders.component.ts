import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/orders/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {

    this.orderService.getOrders().subscribe((orders: any) => {
      console.log(orders);
    })

  }

}
