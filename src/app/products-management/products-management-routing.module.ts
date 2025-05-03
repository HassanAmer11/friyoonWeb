import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsManagementComponent } from './Components/products-management/products-management.component';
import { GovernoratesComponent } from './Components/governorates/governorates.component';
import { CategoryComponent } from './Components/category/category.component';
import { ViewListProductsComponent } from './Components/view-list-products/view-list-products.component';
import { AddProductsComponent } from './Components/add-products/add-products.component';
import { UpdateProductsComponent } from './Components/update-products/update-products.component';
import { OrderListComponent } from './Components/order-list/order-list.component';
import { ViewOrderComponent } from './Components/view-order/view-order.component';
import { EditOrderComponent } from './Components/edit-order/edit-order.component';

const routes: Routes = [
  {path: '', redirectTo:'products-management', pathMatch:'full' },
  {path: 'products-management', component:ProductsManagementComponent},
  {path: 'governorates', component:GovernoratesComponent},
  {path: 'category', component:CategoryComponent},
  {path: 'category', component:CategoryComponent},
  {path: 'view-products', component:ViewListProductsComponent},
  {path: 'add-products', component:AddProductsComponent},
  {path: 'update-products/:id', component:UpdateProductsComponent},
  {path: 'order', component:OrderListComponent},
  {path: 'view-order/:id', component:ViewOrderComponent},
  {path: 'edit-order/:id', component:EditOrderComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsManagementRoutingModule { }
