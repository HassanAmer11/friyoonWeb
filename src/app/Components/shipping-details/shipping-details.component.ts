import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {  IProducts } from 'src/app/Interfaces/iproduct';
import { IGovernorates } from 'src/app/products-management/Interfaces/igovernorates';
import { ProductsService } from 'src/app/Services/products.service';
import { environment } from 'src/environments/environment.prod';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.scss'],
    providers: [MessageService]

})
export class ShippingDetailsComponent implements OnInit {
  productUrl:any;
  productDetails?: IProducts;
  errorMassage:string='';
  backImageUrl:string=""

  governorates: IGovernorates[] = [];
  selectGovernorates!: any

  constructor(private _activatedRoute:ActivatedRoute , private _productsService: ProductsService ,private messageService: MessageService ,private _router:Router  ) {
    this.backImageUrl=environment.imageurl;
  }
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      this.productUrl = params.get('id');

      if (this.productUrl != null) {
        this._productsService.getProductDetails(this.productUrl).subscribe({
          next: (result) => {
            this.productDetails = result.data;
          },
          error: (err) => {
            this.errorMassage = err.error.message;
          },
        });
      }
    });
    this.getGovernorates()
  }

  getGovernorates() {
    this._productsService.getGovernorates().subscribe({
      next: (response) => {
        console.log(response);
        this.governorates= response.data
      },
      error: (err) => {
        console.log(err);
      },
    })
  }
  optionGovernorates(options:any) {
    let optionsValue = (options.target as HTMLInputElement).value;
    console.log(optionsValue);
    this.selectGovernorates = this.governorates.find((gov) => gov.id == optionsValue);
    console.log(this.selectGovernorates);

  }
  shippingDetails:FormGroup = new FormGroup({
    clientName: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required,Validators.pattern(/^01[0125][0-9]{8}/)]),
    whatsApp: new FormControl(null, [Validators.pattern(/^01[0125][0-9]{8}/)]),
    address: new FormControl(null, [Validators.required]),
    orderStatus: new FormControl(null ),

    governorateId: new FormControl(null ),
    notes: new FormControl(null ),
    productId: new FormControl(null ),
    totalOrderPrice: new FormControl(null ),

  });

  shippingFormSubmit() {
    this.shippingDetails.patchValue({
      governorateId: this.selectGovernorates?.id,
      orderStatus: 2,
      productId: this.productDetails?.id,
      totalOrderPrice: this.productDetails?.price! + this.selectGovernorates.deliverdFees
    });
    console.log(this.shippingDetails.value);
    this._productsService.AddOrderCustomer(this.shippingDetails.value).subscribe({
      next: (response) => {
        console.log(response);
        if (response.statusCode == 200) {
          this.messageService.add({ severity: 'success', summary: 'تنبيه', detail: 'تم الطلب بنجاح   ' });
          setTimeout(() => {
            this._router.navigate(['../']); // هنا تحدد المسار الذي ترغب في التوجيه إليه
          }, 2000);
          // this._router.navigate(['../'])
          this.shippingDetails.reset()
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'تنبيه', detail: response.message });
        }
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'تنبيه', detail: err.message });

      },
    });


  }



  }
