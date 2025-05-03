import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsManagementRoutingModule } from './products-management-routing.module';
import { AddProductsComponent } from './Components/add-products/add-products.component';
import { ProductsManagementComponent } from './Components/products-management/products-management.component';
import { CategoryComponent } from './Components/category/category.component';
import { GovernoratesComponent } from './Components/governorates/governorates.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './Pipes/filter.pipe';
import { ViewListProductsComponent } from './Components/view-list-products/view-list-products.component';
import { TableModule } from 'primeng/table';
import { LoginComponent } from './Components/login/login.component';
import { SharedModule } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TextSlicePipe } from './Pipes/text-slice.pipe';
import { UploadComponent } from './Components/upload/upload.component';
import { UpdateProductsComponent } from './Components/update-products/update-products.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OrderListComponent } from './Components/order-list/order-list.component';
import { ViewOrderComponent } from './Components/view-order/view-order.component';
import { EditOrderComponent } from './Components/edit-order/edit-order.component';
import { CalendarModule } from 'primeng/calendar';
import { EditorModule } from 'primeng/editor';
import { MultiSelectModule } from 'primeng/multiselect';



@NgModule({
  declarations: [
    AddProductsComponent,
    ProductsManagementComponent,
    CategoryComponent,
    GovernoratesComponent,
    FilterPipe,
    ViewListProductsComponent,
    LoginComponent,
    TextSlicePipe,
    UploadComponent,
    UpdateProductsComponent,
    OrderListComponent,
    ViewOrderComponent,
    EditOrderComponent
  ],
  imports: [
    CommonModule,
    ProductsManagementRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    SharedModule,
    ToastModule,
    CarouselModule,
    CalendarModule,
    EditorModule,
    MultiSelectModule,

  ] ,exports: [OrderListComponent],
})
export class ProductsManagementModule { }
