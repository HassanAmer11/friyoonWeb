import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {  IProducts } from 'src/app/Interfaces/iproduct';
import { ProductsService } from 'src/app/Services/products.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  productUrl: string | null = null;
  errorMassage!: string;
  productDetails?: IProducts;
  inputQuantity: number = 1;
  addFavorite: boolean = false;
  backImageUrl:string=""
  remainingTime: number = 0; // Set initial countdown time in seconds
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  updateTime() {
    this.hours = Math.floor(this.remainingTime / 3600);
    this.minutes = Math.floor((this.remainingTime % 3600) / 60);
    this.seconds = this.remainingTime % 60;
  }

  constructor(

    private _productsService: ProductsService,
    private _activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.backImageUrl=environment.imageurl;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit(): void {
    console.log('')
    this._activatedRoute.paramMap.subscribe((params) => {
      this.productUrl = params.get('id');
      if (this.productUrl != null) {
        this._productsService.getProductDetails(this.productUrl).subscribe({
          next: (result) => {
            this.productDetails = result.data;
            console.log(result);
          },
          error: (err) => {
            this.errorMassage = err.error.message;
          },
        });
      }
    });



    this.remainingTime = 3600; // Start the countdown
    setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
        this.updateTime();
      }
    }, 1000);
  }
}
