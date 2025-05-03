import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { IProduct } from '../../Interfaces/iproduct';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-view-list-products',
  templateUrl: './view-list-products.component.html',
  styleUrls: ['./view-list-products.component.scss'],
  providers: [MessageService]
})
export class ViewListProductsComponent implements OnInit {
  backendurl: string = environment.imageurl;
  textSearch: string = '';
  productsList: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  PageNumber = 0;
  PageSize = 10;
  first = 0;
  loading = false;
  totalRecords: number = 0;
  porductDeleted:number = 0;
  constructor(private _productService: ProductService, private messageService: MessageService) { }

  ngOnInit(): void {
    //this.showProduct();
  }

  showProduct(): void {
    debugger
    this._productService.getProducts(this.PageNumber, this.PageSize).subscribe({
      next: (response) => {
        console.log(response);
        this.productsList = response.data;
        this.filteredProducts = response.data;
        this.totalRecords = response.totalCount;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  orderDelete(id: number): void {
    this.porductDeleted = id
  }
  editProduct(product: IProduct): void {
    console.log(product);
  }

  deleteProduct() {
    this._productService.deleteProduct(this.porductDeleted).subscribe({
      next: (response) => {
        console.log(response);
        this.showProduct();
        this.messageService.add({ severity: 'info', summary: 'تنبيه', detail: 'تم الحذف   ' });
        this.porductDeleted = 0
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'تنبيه', detail: err.message });

      },
    });
  }

  onPageChange(event: any): void {
    debugger
    // Update the page number and page size dynamically
    this.PageNumber = (event.first! / event.rows!) + 1; // Number of rows per page // event.first is the first index on the current page
    this.PageSize = event.rows!; // event.rows is the number of rows per page
    this.first = event.first!;
    this.showProduct(); // Fetch data for the new page
  }
  applyFilter(event: Event) {
    debugger
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();
    this.filteredProducts = this.productsList.filter(product =>
      product.nameAr.toLowerCase().includes(filterValue)
    );
  }

}
