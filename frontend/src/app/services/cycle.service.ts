import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url + '/cycles';

@Injectable({
  providedIn: 'root',
})
export class CycleService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { token: this.token } };
  }

  create_cycle(data: any): Observable<any> {
    const url = `${base_url}/create_cycle`;
    return this.http.post(url, data, this.headers);
  }

  read_current_cycles(id: any): Observable<any> {
    const url = `${base_url}/read_current_cycles/${id}`;
    return this.http.get(url, this.headers);
  }

  read_expired_cycles(id: any): Observable<any> {
    const url = `${base_url}/read_expired_cycles/${id}`;
    return this.http.get(url, this.headers);
  }

  read_cycle_by_id(id: any, id_cycle: any): Observable<any> {
    const url = `${base_url}/read_cycle_by_id/${id}/${id_cycle}`;
    return this.http.get(url, this.headers);
  }

  update_cycle(id: any, data: any): Observable<any> {
    const url = `${base_url}/update_cycle/${id}`;
    return this.http.put(url, data, this.headers);
  }

  add_rooms_cycle(data: any): Observable<any> {
    const url = `${base_url}/add_rooms_cycle`;
    return this.http.post(url, data, this.headers);
  }

  del_rooms_cycle(id: any): Observable<any> {
    const url = `${base_url}/del_rooms_cycle/${id}`;
    return this.http.delete(url, this.headers);
  }

  change_status_cycle(id: any, data: any): Observable<any> {
    const url = `${base_url}/change_status_cycle/${id}`;
    return this.http.put(url, data, this.headers);
  }

  list_instructors_room(id: any): Observable<any> {
    const url = `${base_url}/list_instructors_room/${id}`;
    return this.http.get(url, this.headers);
  }

  add_instructor_room(data: any): Observable<any> {
    const url = `${base_url}/add_instructor_room`;
    return this.http.post(url, data, this.headers);
  }

  del_instructor_room(id: any): Observable<any> {
    const url = `${base_url}/del_instructor_room/${id}`;
    return this.http.delete(url, this.headers);
  }

  list_courses(): Observable<any> {
    const url = `${base_url}/list_courses`;
    return this.http.get(url, this.headers);
  }
}
