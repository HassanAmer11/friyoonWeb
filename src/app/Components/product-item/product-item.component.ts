import { Component, Input, OnInit } from '@angular/core';
import { IProduct, IProducts } from 'src/app/Interfaces/iproduct';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
@Input() product?: IProducts;
defauletImagepath:string='';
backImageUrl:string=""
 
  constructor() { 

    this.backImageUrl = environment.imageurl;
  }
  ngOnInit(): void {

   }


}
