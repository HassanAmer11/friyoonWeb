import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../Common/api-service.service';
import { IOrder } from '../Interfaces/iorder';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  constructor(private _http:HttpClient ,private apiservices:ApiService) { }
  getcategory='Category/GetAllCategories';
  getProduct='Service/GetAll';
  getProductDetials ='Service/GetServiceById';
  getGovernorate='Governorates/GetAll';
   getCategories(): Observable<any> {
    return this.apiservices.get(this.getcategory);
  }

  /* getProducts():Observable<any> {

    return this.apiservices.get(this.getProduct);
  } */

    getProducts(PageNumber: number, PageSize: number): Observable<any> {

      return this.apiservices.get(`Service/GetAll?PageNumber=${PageNumber}&PageSize=${PageSize}`);
    }
  getProductDetails(id:string):Observable<any> {
    return this.apiservices.get(`${this.getProductDetials}/${id}`)
  }

  getGovernorates(): Observable<any> {

       return this.apiservices.get(this.getGovernorate);
    }
      AddOrderCustomer(order:IOrder) : Observable<any> {

/*         const formData = new FormData();
        formData.append('clientName', order.clientName);
        formData.append('address', order.address);
        formData.append('phone', order.phone);
        formData.append('whatsApp', order.whatsApp);
        formData.append('productId', order.productId);
        formData.append('governorateId', order.governorateId);
        formData.append('orderStatus', order.orderStatus);
        formData.append('notes', order.notes);
        formData.append('totalOrderPrice', order.totalOrderPrice);

        console.log('goformDatav', formData)
 */
    // return this.apiservices.post(`Order/CreateOrder`, formData);

        return this.apiservices.post('Order/CreateOrder', order);

  }

  GetByCategoryId(catId: number, PageNumber: number, PageSize: number): Observable<any> {
    debugger
    if (catId) {
      return this.apiservices.get(`Service/GetByCategoryId/${catId}?PageNumber=${PageNumber}&PageSize=${PageSize}`);
    }
    else {
      return this.apiservices.get(`Service/GetAll?PageNumber=${PageNumber}&PageSize=${PageSize}`);
    }
  }
}
