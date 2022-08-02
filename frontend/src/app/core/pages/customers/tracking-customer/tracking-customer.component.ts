import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tracking-customer',
  templateUrl: './tracking-customer.component.html',
})
export class TrackingCustomerComponent implements OnInit {
  public path = environment.base_url + '/customers/image/';
  public customer: any = {};
  public id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => (this.id = id));
    this.init_data();
  }

  init_data() {
    this.customerService.read_customer_by_id(this.id).subscribe({
      next: (res) => {
        if (res.data) {
          this.customer = res.data;
        } else {
          this.router.navigateByUrl('/customers');
        }
      },
      error: (err) => console.log(err),
    });
  }
}
