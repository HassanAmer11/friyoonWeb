import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGovernorates } from '../Interfaces/igovernorates';
import { ApiService } from '../../Common/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class GovernoratesService {

  constructor(private apiservices: ApiService) { }

  getGovernorates(): Observable<any> {
    return this.apiservices.get('Governorates/GetAll');
  }


  addGovernorates(gov: IGovernorates): Observable<any> {
    return this.apiservices.post('Governorates/Add', {
      id: 0,
      nameAr: gov.nameAr,
    });
  }
  updateGovernorates(id: number, gov: IGovernorates): Observable<any> {
    return this.apiservices.put('Governorates/Update', 
      {
        id: id,
        nameAr: gov.nameAr,
      })
  }
  deleteGovernorates(id:number) : Observable<any> {
    return this.apiservices.delete(`Governorates/Delete/${id}`)
  }
}
