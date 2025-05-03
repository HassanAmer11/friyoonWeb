import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../Services/order.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
  providers: [MessageService]
})
export class ViewOrderComponent implements OnInit {
  orderDetails: any;

  constructor(
    private route: ActivatedRoute,
    private _orderService: OrderService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails() {
    const orderId = this.route.snapshot.paramMap.get('id');
    this._orderService.getOrderById(orderId).subscribe({
      next: (response) => {
        this.orderDetails = response.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  changeStatus() {
    this.orderDetails.orderStatus = 1;
    this._orderService.updateOrder(this.orderDetails).subscribe({
      next: (response) => {
        if (response.statusCode == 200) {
          console.log('Order status updated successfully', response);
          this.messageService.add({ severity: 'success', summary: 'تم التحديث', detail: 'تم تحديث حالة الطلب بنجاح' });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'تنبيه', detail: response.message });
        }
      },
      error: (err) => {
        console.log('Error updating order status', err);
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء تحديث حالة الطلب' });
      }
    });
  }


  printPage() {
    const printContents = document.querySelector('.content-print')?.innerHTML;
    const originalContents = document.body.innerHTML;

    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      location.reload();
    }
  }
}
