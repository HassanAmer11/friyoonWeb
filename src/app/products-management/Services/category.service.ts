import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../Interfaces/icategory';
import { ApiService } from '../../Common/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private _http: HttpClient, private apiservices: ApiService) { }

  getCategories(): Observable<any> {
    return this.apiservices.get(`Category/GetAllCategories`);
  }




  AddCategory(category:ICategory) : Observable<any> {

    const formData = new FormData();
            // Append the id
    formData.append('nameAr', category.nameAr);
    formData.append('descriptionAr', category.descriptionAr);
    formData.append('imagefile', category.imagefile); // File can be null
    formData.append('iconfile', category.iconfile); // File can be null
    return this.apiservices.post(`Category/AddCategory`, formData);

  }




  updateCategory(category:ICategory  ) : Observable<any> {
    const formData = new FormData();

    formData.append('id', category.id.toString());
    formData.append('nameAr', category.nameAr);
    formData.append('descriptionAr', category.descriptionAr);
    formData.append('imagefile', category.imagefile); // File can be null
    formData.append('iconfile', category.iconfile); // File can be null
    return this.apiservices.put(`Category/UpdateCategory`, formData);
    }

  deleteCategory(id: number): Observable<any> {
    return this.apiservices.delete(`Category/DeleteCategory/${id}`);
  }
}
