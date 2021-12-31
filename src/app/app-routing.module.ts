import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { ProductsComponent } from './products/products.component';
import { ProductSingleComponent } from './products/product-single/product-single.component'
import { AuthGuard } from './auth.guard';
import { OrdersComponent } from './orders/orders.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'product/:productId', component: ProductSingleComponent },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
