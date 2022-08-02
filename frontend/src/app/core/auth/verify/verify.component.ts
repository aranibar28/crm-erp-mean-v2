import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styles: [],
})
export class VerifyComponent implements OnInit {
  public load_data = true;
  public token = '';
  public message = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (res) => {
        this.token = res['token'];

        if (this.token) {
          this.load_data = true;
          this.customerService.confirm_email_verify(this.token).subscribe({
            next: (res) => {
              console.log(res);
              if (res.data) {
                this.message = 'La cuenta fue verificada correctamente.';
              } else {
                this.message = res.msg;
              }
              this.load_data = false;
            },
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
