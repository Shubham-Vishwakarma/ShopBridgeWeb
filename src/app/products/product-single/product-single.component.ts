import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { ProductService } from '../../services/products/product.service'
import { CartService } from '../../services/cart/cart.service'
import { Product } from '../../models/product'
import { Item } from '../../models/item'

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.css']
})
export class ProductSingleComponent implements OnInit {

  products: Product[] = []
  productId!: number
  product!: Product
  categoryProducts!: Product[]

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router) { }

  ngOnInit(): void {

    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products
      this.product = this.products.filter(p => p.id === this.productId)[0];

      if(!this.product)
        this.router.navigate(["/"])

      this.categoryProducts = this.products.filter(p => p.category === this.product.category && p.id !== this.product.id);
    });

    this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        if(paramMap.has('productId'))
        {
            this.productId = (Number)(paramMap.get('productId') as string);
        }
      });
  }

  addToCart(): void {
    const cartItem: Item = {
      itemId: -1,
      productId: this.product.id,
      productQuantity: this.product.quantity,
      productPrice: this.product.price,
      productName: this.product.name,
      productCategory: this.product.category
    }
    this.cartService.addToCart(cartItem);
  }

}
