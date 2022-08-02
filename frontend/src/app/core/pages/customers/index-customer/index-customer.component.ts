import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { sortby } from 'src/app/helpers/functions';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-customer',
  templateUrl: './index-customer.component.html',
})
export class IndexCustomerComponent implements OnInit {
  public path = environment.base_url + '/customers/image/';
  public customers: Array<any> = [];
  public customers_arr: Array<any> = [];
  public load_data: boolean = false;
  public toggle: boolean = false;
  public filter: string = '';
  public key: string = '';
  public p: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.filter = params['filter'];
      if (this.filter) {
        this.init_data();
      } else {
        this.customers = [];
      }
    });
  }

  init_data() {
    if (this.filter) {
      this.load_data = true;
      this.customerService.read_customers(this.filter).subscribe({
        next: (res) => {
          this.customers = res.data;
          this.load_data = false;
        },
      });
    } else {
      this.customers = [];
    }
  }

  search() {
    if (this.filter) {
      this.router.navigate(['/customers'], {
        queryParams: { filter: this.filter },
      });
    } else {
      this.router.navigate(['/customers']);
    }
  }

  change_status(id: any, status: any) {
    const word = status ? 'desactivado' : 'activado';
    this.customerService.change_status(id, { status }).subscribe({
      next: (res) => {
        if (res.data) {
          this.init_data();
          Swal.fire('Listo!', `Estado ${word}.`, 'success');
        } else {
          Swal.fire('Error!', res.msg, 'error');
        }
      },
    });
  }

  delete_data(id: string, name: string) {
    Swal.fire({
      title: 'Eliminar Usuario',
      text: `¿Desea eliminar el usuario ${name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.delete_customer(id).subscribe((res) => {
          if (res.data) {
            this.init_data();
            Swal.fire('Listo!', `El usuario ${name} fue eliminado.`, 'success');
          } else {
            Swal.fire('Error!', res.msg, 'error');
          }
        });
      }
    });
  }

  sort(key: string) {
    this.toggle = !this.toggle;
    sortby(key, this.toggle, this.customers);
  }
}
