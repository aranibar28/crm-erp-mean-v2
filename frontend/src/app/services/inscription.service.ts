import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url + '/inscriptions';

@Injectable({
  providedIn: 'root',
})
export class InscriptionService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { token: this.token } };
  }

  create_inscription(data: any): Observable<any> {
    const url = `${base_url}/create_inscription`;
    return this.http.post(url, data, this.headers);
  }

  read_inscriptions_today(): Observable<any> {
    const url = `${base_url}/read_inscriptions_today`;
    return this.http.get(url, this.headers);
  }

  read_inscriptions_dates(advisor: any, from: any, to: any): Observable<any> {
    const url = `${base_url}/read_inscriptions_dates/${advisor}/${from}/${to}`;
    return this.http.get(url, this.headers);
  }

  read_inscription_by_id(id: any): Observable<any> {
    const url = `${base_url}/read_inscription_by_id/${id}`;
    return this.http.get(url, this.headers);
  }

  send_invoice(id: any): Observable<any> {
    const url = `${base_url}/send_invoice/${id}`;
    return this.http.get(url, this.headers);
  }

  firm_inscription(id: any, data: any): Observable<any> {
    const url = `${base_url}/firm_inscription/${id}`;
    return this.http.put(url, data, this.headers);
  }

  cancel_inscription(id: any): Observable<any> {
    const url = `${base_url}/cancel_inscription/${id}`;
    return this.http.get(url, this.headers);
  }

  list_comments(id: any): Observable<any> {
    const url = `${base_url}/list_comments/${id}`;
    return this.http.get(url, this.headers);
  }
}
