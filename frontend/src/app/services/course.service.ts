import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url + '/courses';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { token: this.token } };
  }

  create_course(data: any, file: any): Observable<any> {
    const url = `${base_url}/create_course`;
    const fd = new FormData();
    fd.append('title', data.title);
    fd.append('description', data.description);
    fd.append('image', file);
    return this.http.post(url, fd, this.headers);
  }

  read_courses(): Observable<any> {
    const url = `${base_url}/read_courses`;
    return this.http.get(url, this.headers);
  }

  read_course_by_id(id: any): Observable<any> {
    const url = `${base_url}/read_course_by_id/${id}`;
    return this.http.get(url, this.headers);
  }

  update_course(id: any, data: any): Observable<any> {
    const url = `${base_url}/update_course/${id}`;
    if (data.image) {
      const fd = new FormData();
      fd.append('title', data.title);
      fd.append('description', data.description);
      fd.append('image', data.image);
      return this.http.put(url, fd, this.headers);
    } else {
      return this.http.put(url, data, this.headers);
    }
  }

  delete_course(id: any): Observable<any> {
    const url = `${base_url}/delete_course/${id}`;
    return this.http.delete(url, this.headers);
  }

  change_status(id: any, data: any): Observable<any> {
    const url = `${base_url}/change_status/${id}`;
    return this.http.put(url, data, this.headers);
  }

  list_courses(): Observable<any> {
    const url = `${base_url}/list_courses`;
    return this.http.get(url, this.headers);
  }
}
