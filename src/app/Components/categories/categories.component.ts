import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ICategry } from 'src/app/Interfaces/icategry';
import { ProductsService } from 'src/app/Services/products.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<number>(); // Declare an event

  categories?: ICategry[]
constructor(public _ProductsService:ProductsService,) { }
backendurl:string=environment.imageurl;
customOptions: OwlOptions = {
  rtl: true,
  loop: true,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  margin: 15,

  navText: ['<i class="fa-solid fa-angle-right"></i>', ' <i class="fa-solid fa-angle-left"></i>'],

  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: true
}
  ngOnInit(): void {
    this._ProductsService.getCategories().subscribe({
      next:(response)=>{console.log(response);
        this.categories = response.data;
      },
      error:(err)=>{ console.log(err);
      },
    });
  }
  selectcategory(categoryId:number) {
    this.messageEvent.emit(categoryId);
  }

}
