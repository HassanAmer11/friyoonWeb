import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { ProductsComponent } from './Components/products/products.component';
import { NotFound404Component } from './shared/Components/not-found404/not-found404.component';
import { ShippingDetailsComponent } from './Components/shipping-details/shipping-details.component';
import { LoginComponent } from './products-management/Components/login/login.component';
import { authGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '',redirectTo:'home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  { path: 'Products', component:ProductsComponent},
  { path: 'Login', component:LoginComponent},
  { path: 'products-management',canActivate:[authGuard],
    loadChildren:()=>(import('./products-management/products-management.module').then(m => m.ProductsManagementModule))

  },

  { path: 'Product/:id', component:ProductDetailsComponent},
  { path: 'shipping-details/:id', component:ShippingDetailsComponent},
  { path: '**', component:NotFound404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
