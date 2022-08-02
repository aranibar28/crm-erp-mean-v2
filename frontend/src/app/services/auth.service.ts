import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../interfaces/login';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  get user(): string {
    return localStorage.getItem('user') || '';
  }

  login(data: Login): Observable<any> {
    const url = `${base_url}/auth/login_collaborator`;
    return this.http.post(url, data);
  }

  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth');
  }
}
