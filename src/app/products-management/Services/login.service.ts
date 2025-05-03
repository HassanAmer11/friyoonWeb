import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../../Common/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLogged = new BehaviorSubject<boolean>(localStorage.getItem('token')? true: false);

  constructor(private apiServices: ApiService) { }

  login(form:object): Observable<any> {
    return this.apiServices.post('Auth/login', form);
  }


  logout() {
    localStorage.removeItem('token');
    this.isLogged.next(false);
  }
}
