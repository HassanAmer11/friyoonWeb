import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../Interfaces/iproduct';
import { ApiService } from '../../Common/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private _http: HttpClient, private apiservices: ApiService) { }



  getProducts(PageNumber: number, PageSize: number): Observable<any> {
    return this.apiservices.get(`Service/GetAll?PageNumber=${PageNumber}&PageSize=${PageSize}`);
  }

  getProduct(id: string): Observable<any> {
    return this.apiservices.get(`Service/GetServiceById/${id}`)
  }

  addProduct(product: any): Observable<any> {
    return this.apiservices.post('Service/AddService', product);
  }

  updateProduct(product: any): Observable<any> {
    debugger
    return this.apiservices.put('Service/Update', product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.apiservices.delete(`Service/Delete/${id}`);
  }
  deleteProductImage(deleteImage: any): Observable<any> {
    return this.apiservices.post(`Service/DeleteImageService`, deleteImage);
  }

}
