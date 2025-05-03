import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IProduct, IProducts } from 'src/app/Interfaces/iproduct';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnChanges {
  @Input() categoryId: number = 0;


  ngOnChanges(changes: SimpleChanges) {
    if (changes['categoryId'] && !changes['categoryId'].firstChange) {
      this.getProducts(0, 12);
    }
  }

  productsItems?: IProducts[];
  showPagination: boolean = false;
  currentPage: number = 1;
  totalPages: number = 0;
  paginationArray: number[] = [];

  constructor(public _ProductsService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts(this.currentPage, 12);
  }

  getProducts(page: number, pageSize: number): void {
    this._ProductsService.GetByCategoryId(this.categoryId, page, pageSize).subscribe({
      next: (response) => {
        console.log('this response => ' + response);
        this.showPagination = response.totalPages > 1;
        this.productsItems = response.data;
        this.totalPages = response.totalPages;
        this.createPaginationArray();
        console.log(this.productsItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  createPaginationArray(): void {
    this.paginationArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.getProducts(this.currentPage, 12);
    }
  }
}
