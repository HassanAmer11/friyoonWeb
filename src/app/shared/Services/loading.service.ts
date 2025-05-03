import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading = new Subject<boolean>();
  constructor() { }
  show() {
    this.isLoading.next(true);
  }
  hide() {
    this.isLoading.next(false) ;
  }
}
