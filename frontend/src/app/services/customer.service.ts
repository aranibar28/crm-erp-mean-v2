import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url + '/customers';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { token: this.token } };
  }

  create_customer(data: any): Observable<any> {
    const url = `${base_url}/create_customer`;
    return this.http.post(url, data, this.headers);
  }

  read_customers(filter: any): Observable<any> {
    const url = `${base_url}/read_customers/${filter}`;
    return this.http.get(url, this.headers);
  }

  read_customer_by_id(id: any): Observable<any> {
    const url = `${base_url}/read_customer_by_id/${id}`;
    return this.http.get(url, this.headers);
  }

  update_customer(id: any, data: any): Observable<any> {
    const url = `${base_url}/update_customer/${id}`;
    return this.http.put(url, data, this.headers);
  }

  delete_customer(id: any): Observable<any> {
    const url = `${base_url}/delete_customer/${id}`;
    return this.http.delete(url, this.headers);
  }

  change_status(id: any, data: any): Observable<any> {
    const url = `${base_url}/change_status/${id}`;
    return this.http.put(url, data, this.headers);
  }

  confirm_email_verify(token: any): Observable<any> {
    const url = `${base_url}/confirm_email_verify/${token}`;
    return this.http.get(url, this.headers);
  }

  list_customers(filter: any): Observable<any> {
    const url = `${base_url}/read_customers/${filter}`;
    return this.http.get(url, this.headers);
  }
}
