import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  HTTP_INTERCEPTORS, HttpClientModule } from  '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/Components/navbar/navbar.component';
import { LoadingComponent } from './shared/Components/loading/loading.component';
import { NotFound404Component } from './shared/Components/not-found404/not-found404.component';
import { FooterComponent } from './shared/Components/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductsComponent } from './Components/products/products.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { MainSliderComponent } from './Components/main-slider/main-slider.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { CategorieItemComponent } from './Components/categorie-item/categorie-item.component';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductItemComponent } from './Components/product-item/product-item.component';
import { EGPPipe } from './shared/Pipes/egp.pipe';
import { InfoShippingComponent } from './Components/info-shipping/info-shipping.component';
import { TestimonialComponent } from './Components/testimonial/testimonial.component';
import { MoreProductsComponent } from './Components/more-products/more-products.component';
import { ShippingDetailsComponent } from './Components/shipping-details/shipping-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { SliceTextPipe } from './shared/Pipes/slice-text.pipe';
import { GlobalInterceptor } from './shared/interceptor/global.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoadingComponent,
    NotFound404Component,
    FooterComponent,
    HomeComponent,
    ProductsComponent,
    ProductDetailsComponent,
    MainSliderComponent,
    CategoriesComponent,
    CategorieItemComponent,
    ProductItemComponent,
    EGPPipe,
    SliceTextPipe,
    TestimonialComponent,
    MoreProductsComponent,
    ShippingDetailsComponent,
    InfoShippingComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    CarouselModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastModule,

  ],
  exports:[
    SliceTextPipe,

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: GlobalInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
