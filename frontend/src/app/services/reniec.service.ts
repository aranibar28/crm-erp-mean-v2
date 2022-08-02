import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.sunat;
const token = environment.token;

@Injectable({
  providedIn: 'root',
})
export class ReniecService {
  constructor(private http: HttpClient) {}

  get_user(number: any): Observable<any> {
    const url = `${base_url}/dni/${number}?token=${token}`;
    return this.http.get(url);
  }
}
