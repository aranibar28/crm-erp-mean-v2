import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { success_alert, error_alert } from 'src/app/helpers/alerts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public load_btn: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  myForm: FormGroup = this.fb.group({
    email: [, [Validators.required, Validators.email]],
    password: [, [Validators.required, Validators.minLength(3)]],
  });

  ngOnInit(): void {}

  login() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.load_btn = true;
    this.authService.login(this.myForm.value).subscribe({
      next: (res) => {
        this.load_btn = false;
        if (res.data) {
          let { data, token } = res;
          this.router.navigateByUrl('/');
          //this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          localStorage.setItem('id', data._id);
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(data));
          success_alert('Hola ' + data.full_name);
        } else {
          error_alert(res.msg);
        }
      },
      error: (err) => {
        this.load_btn = false;
        error_alert(err.msg);
      },
    });
  }

  validators(name: string) {
    const input = this.myForm.controls[name];
    return input.errors && input.touched;
  }
}
