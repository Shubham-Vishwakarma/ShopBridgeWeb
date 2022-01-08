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
  countInCart: number = 0;

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

      const items = this.cartService.getCart().filter(p => p.productId === this.product.id);
      if(items.length === 1)
        this.countInCart = items[0].productQuantity;

    });

    this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        if(paramMap.has('productId'))
        {
            this.productId = (Number)(paramMap.get('productId') as string);
        }
      });

  }

  buyNow(): void {
    this.addOneToCart();
    this.router.navigate(["/cart"])
  }

  addToCart(): void {
    this.countInCart++;
    const cartItem: Item = {
      itemId: -1,
      productId: this.product.id,
      productQuantity: this.countInCart,
      productPrice: this.product.price,
      productName: this.product.name,
      productCategory: this.product.category
    }
    this.cartService.addToCart(cartItem);
  }

  addOneToCart(): void {

    const items = this.cartService.getCart().filter(p => p.productId === this.product.id);

    if(items.length === 1) {
      this.countInCart++;
      const item: Item = items[0];
      item.productQuantity = this.countInCart;
    }
    else {
      this.addToCart();
    }

  }

  removeOneFromCart(): void {
    this.countInCart--;

    const items = this.cartService.getCart().filter(p => p.productId === this.product.id);

    if(items.length === 1) {
      const item: Item = items[0];
      item.productQuantity = this.countInCart;
    }

  }

}
