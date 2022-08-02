import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url + '/collaborators';

@Injectable({
  providedIn: 'root',
})
export class CollaboratorService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { token: this.token } };
  }

  create_collaborator(data: any): Observable<any> {
    const url = `${base_url}/create_collaborator`;
    return this.http.post(url, data, this.headers);
  }

  read_collaborators(): Observable<any> {
    const url = `${base_url}/read_collaborators`;
    return this.http.get(url, this.headers);
  }

  read_collaborator_by_id(id: any): Observable<any> {
    const url = `${base_url}/read_collaborator_by_id/${id}`;
    return this.http.get(url, this.headers);
  }

  update_collaborator(id: any, data: any): Observable<any> {
    const url = `${base_url}/update_collaborator/${id}`;
    return this.http.put(url, data, this.headers);
  }

  delete_collaborator(id: any): Observable<any> {
    const url = `${base_url}/delete_collaborator/${id}`;
    return this.http.delete(url, this.headers);
  }

  change_status(id: any, data: any): Observable<any> {
    const url = `${base_url}/change_status/${id}`;
    return this.http.put(url, data, this.headers);
  }

  list_advisors(): Observable<any> {
    const url = `${base_url}/read_collaborators`;
    return this.http.get(url, this.headers).pipe(
      map((res: any) =>
        res.data.filter(({ role, status }: any) => {
          return role == 'Asesor' && status == true;
        })
      )
    );
  }

  list_instructors(): Observable<any> {
    const url = `${base_url}/read_collaborators`;
    return this.http.get(url, this.headers).pipe(
      map((res: any) =>
        res.data.filter(({ role, status }: any) => {
          return role == 'Instructor' && status == true;
        })
      )
    );
  }
}
