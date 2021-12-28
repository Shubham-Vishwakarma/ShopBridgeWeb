import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/products/product.service'
import { Product } from './models/product'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'shopbridgeweb';


  constructor() {
  }

  ngOnInit(): void {



  }

}
