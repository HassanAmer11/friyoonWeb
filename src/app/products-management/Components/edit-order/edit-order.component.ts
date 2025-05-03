import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../Services/order.service';
import { IGovernorates } from '../../Interfaces/igovernorates';
import { GovernoratesService } from '../../Services/governorates.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss'],
  providers: [MessageService]

})
export class EditOrderComponent {
  orderForm: FormGroup;
  orderDetails: any;
  governorates: any[] = []; // تأكد من تهيئة هذه القائمة بالبيانات اللازمة

  constructor(
    private fb: FormBuilder,
    private _orderService: OrderService,
    private route: ActivatedRoute,
    private _governoratesService: GovernoratesService,

    private messageService: MessageService
  ) {
    this.orderForm = this.fb.group({
      clientName: ['', Validators.required],
      productName: ['', Validators.required],
      phone: ['', Validators.required],
      whatsApp: ['', Validators.required],
      governorateId: ['', Validators.required],
      deliveryPrice: [''],
      productPrice: ['', Validators.required],
      totalOrderPrice: ['', Validators.required],
      address: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.getOrderDetails();
    this.getGovernorates();
  }

  getOrderDetails() {
    const orderId = this.route.snapshot.paramMap.get('id');
    this._orderService.getOrderById(orderId).subscribe({
      next: (response) => {
        this.orderDetails = response.data;
        this.orderForm.patchValue(this.orderDetails);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getGovernorates() {
    this._governoratesService.getGovernorates().subscribe({
      next: (response) => {
        console.log(response);
        this.governorates = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });  }

  onSubmit() {
    if (this.orderForm.valid) {
      const updatedOrder = {
        ...this.orderDetails,
        ...this.orderForm.value
      };
      this._orderService.updateOrder(updatedOrder).subscribe({
        next: (response) => {
          if (response.statusCode == 200) {
            console.log('Order updated successfully', response);
            this.messageService.add({ severity: 'success', summary: 'تم التحديث', detail: 'تم تحديث حالة الطلب بنجاح' });
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'تنبيه', detail: response.message });
          }
        },
        error: (err) => {
          console.log('Error updating order', err);
          this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء تحديث حالة الطلب' });
        }
      });
    }
  }

  changeStatus(event: any) {
    this.orderForm.get('governorateId')?.setValue(event.target.value);

    console.log(`Selected governorate ID: ${this.orderForm.get('governorateId')?.value}`);
  }
}
