import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { ProductsComponent } from './products/products.component';
import { ProductSingleComponent } from './products/product-single/product-single.component'

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'product/:productId', component: ProductSingleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
