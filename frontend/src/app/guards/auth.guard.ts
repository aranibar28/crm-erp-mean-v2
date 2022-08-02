import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
const url_getUser = "";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private http: HttpClient) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      if (localStorage.getItem('token') != null) {
        let body = {
          idToken: localStorage.getItem('token'),
        };
        this.http.post(url_getUser, body).subscribe({
          next: () => {
            resolve(true);
          },
          error: () => {
            localStorage.clear();
            this.router.navigateByUrl('/auth');
            resolve(false);
          },
        });
      } else {
        this.router.navigateByUrl('/auth');
        resolve(false);
      }
    });
  }
}
