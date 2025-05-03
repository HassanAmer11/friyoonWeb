import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoadingService } from '../Services/loading.service';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

  constructor(private _loadingService:LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._loadingService.show();
    const token = localStorage.getItem('token');
    const baseUrl: string = environment.apiBaseUrl;

    let modifiedRequest = request.clone({
      url: baseUrl + request.url
    });

    if (token !== null) {
      modifiedRequest = request.clone({
        setHeaders: {
          'Authorization': 'Bearer ' + token,
          // ...request.headers
        },
        url: baseUrl + request.url
      });
    }

    return next.handle(modifiedRequest).pipe(
      finalize(() => this._loadingService.hide()),
    );

  }
}
