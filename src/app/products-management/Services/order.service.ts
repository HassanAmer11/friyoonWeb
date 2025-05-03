import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/Common/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(private _http:HttpClient , private apiServices: ApiService) { }

  getOrders(PageNumber: number, PageSize: number) :Observable<any> {
    return this.apiServices.get(`Order/GetAll?PageNumber=${PageNumber}&PageSize=${PageSize}`);
  }

  getOrderById(id: any): Observable<any> {

    return this.apiServices.get(`Order/GetOrderById/${id}`);
  }
  filterOrderByDate(FromDate:any ,ToDate: any , OrderStatus:any,PageNumber: number, PageSize: number):Observable<any>{
    return this.apiServices.get(`Order/GetOrdersAccordingCriteria?FromDate=${FromDate}&ToDate=${ToDate}&OrderStatus=${OrderStatus}&PageNumber=${PageNumber}&PageSize=${PageSize}`);
  }

  updateOrder(order: any): Observable<any> {
    return this.apiServices.put('Order/Update', order);
  }
  updateOrderStatus(order:any) :Observable<any> {
    return this.apiServices.put('Order/UpdateOrderStatus', order);
  }
  deleteOrder(id: number): Observable<any> {
    return this.apiServices.delete(`Order/Delete/${id}`);
  }
}
