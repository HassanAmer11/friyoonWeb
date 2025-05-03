import { Component } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
    providers: [MessageService, DatePipe]
})
export class OrderListComponent {
  ordersList:any[] = []
  textSearch:string = '';

  PageNumber = 0;
  PageSize = 10;
  first = 0;
  totalCount: number = 0;
  orderDeleted:number = 0;
  rangeDates?: Date[] ;
  selectDefault= 0
  OrderStatus:number = 2;
  constructor(private _orderService:OrderService , private messageService: MessageService , private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.showOrder()
  }
  FilterOrder() {
    debugger;
    console.log(this.rangeDates);

    if (this.rangeDates && this.rangeDates.length === 2) {
      let FromDate = this.rangeDates[0];
      let ToDate = this.rangeDates[1];

      // تنسيق التاريخ بالشكل المطلوب
      let formattedFromDate = this.datePipe.transform(FromDate, 'MM/dd/yyyy');
      let formattedToDate = this.datePipe.transform(ToDate, 'MM/dd/yyyy');

      console.log(`Filtering orders from ${formattedFromDate} to ${formattedToDate} with status ${this.OrderStatus}`);

      this._orderService.filterOrderByDate(formattedFromDate, formattedToDate, this.OrderStatus, this.PageNumber, this.PageSize).subscribe({
        next: (response) => {
          console.log(response);
          this.ordersList = response.data;
          this.totalCount = response.totalCount;
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log("Please select a valid date range.");
    }
  }
  showOrder() {
    this._orderService.getOrders(this.PageNumber, this.PageSize).subscribe({
      next: (response) => {
        console.log(response);
        this.ordersList = response.data;
        this.totalCount = response.totalCount; // افترض أن الاستجابة تحتوي على totalRecords
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  resetFilter() {
    this.OrderStatus = this.selectDefault; // قم بتعيين القيمة الافتراضية لحالة الطلب
    this.rangeDates = undefined;
    this.showOrder(); // عرض جميع الطلبات بعد إعادة الضبط
  }

  viewOrder(id:number) {
    console.log(id);
  }
  editOrder(order:any) {
    console.log(order);
  }
  orderDelete(id: number): void {
    this.orderDeleted = id; // Get Order Id to do Delete
    console.log('order Id => ' +  this.orderDeleted);

  }

  deleteOrder() {

    this._orderService.deleteOrder(this.orderDeleted).subscribe({
      next: (response) => {
        console.log(response);
        this.showOrder();
        this.messageService.add({ severity: 'info', summary: 'تنبيه', detail: 'تم الحذف   ' });
        this.orderDeleted = 0
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'تنبيه', detail: err.message });

      },
    });
  }

  changeStatus(event: any) {
    this.OrderStatus = +event.target.value;;
  }

  onPageChange(event: any): void {
    debugger
    // Update the page number and page size dynamically
    this.PageNumber = (event.first / event.rows) + 1; // event.first is the first index on the current page
    this.PageSize = event.rows; // event.rows is the number of rows per page
    this.first = event.first;
    this.showOrder(); // Fetch data for the new page
  }

  next() {
    console.log("next")
    this.first = this.first + this.PageSize;
  }

  prev() {
    console.log("prev")
    this.first = this.first - this.PageSize;
  }

  reset() {
    this.first = 0;
  }
  isLastPage(): boolean {
    return this.ordersList ? this.first === this.ordersList.length - this.PageSize : true;
  }

  isFirstPage(): boolean {
    return this.ordersList ? this.first === 0 : true;
  }
}
