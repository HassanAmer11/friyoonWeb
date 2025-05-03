// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // private apiUrl = environment.apiBaseUrl;

  token:string='';
  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
    "Content-Type": "application/json"
  });
  constructor(private http: HttpClient) {}

   public get(endpoint: string): Observable<any> {
    return this.http.get(endpoint);
  }

  // Public method to send POST requests with Bearer token
  public post(endpoint: string, body: any): Observable<any> {
    return this.http.post(`${endpoint}`, body);
  }

  // Method to send PUT requests with Bearer token
  public put(endpoint: string, body: any): Observable<any> {

    return this.http.put(`${endpoint}`, body);
  }

  // Method to send DELETE requests with Bearer token
  public delete(endpoint: string): Observable<any> {
    return this.http.delete(endpoint);
  }






}
