import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CustomerService } from 'src/app/services/customer.service';
import { ReniecService } from 'src/app/services/reniec.service';
import { success_alert, error_alert } from 'src/app/helpers/alerts';
declare var $: any;

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styles: [],
})
export class UpdateCustomerComponent implements OnInit {
  public customer: any = {};
  public load_btn: boolean = false;
  public load_reniec: boolean = false;
  public id: any;

  constructor(
    private customerService: CustomerService,
    private reniecService: ReniecService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => (this.id = id));
    this.init_data();
  }

  back(): void {
    this.location.back();
  }

  myForm: FormGroup = this.fb.group({
    email: [, [Validators.required, Validators.email]],
    password: [, [Validators.required, Validators.minLength(3)]],
    first_name: [, [Validators.required, Validators.minLength(3)]],
    last_name: [, [Validators.required, Validators.minLength(3)]],
    dni: [, [Validators.required]],
    phone: [, [Validators.required]],
    genre: [''],
    birthday: [],
    country: [''],
    city: [''],
  });

  init_data() {
    this.customerService.read_customer_by_id(this.id).subscribe({
      next: (res) => {
        if (res.data) {
          this.customer = res.data;
          this.myForm.patchValue(this.customer);
        } else {
          this.router.navigateByUrl('/customers');
        }
      },
      error: (err) => console.log(err),
    });
  }

  update() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    if ($('#input_password').val() == '') {
      this.myForm.controls['password'].setValue(this.customer.password);
    } else {
      this.myForm.controls['password'].setValue($('#input_password').val());
    }

    this.load_btn = true;
    this.customerService.update_customer(this.id, this.myForm.value).subscribe({
      next: (res) => {
        this.load_btn = false;
        if (res.data) {
          success_alert('Datos actualizados correctamente.');
          this.router.navigateByUrl('/customers');
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

  search_reniec() {
    this.load_reniec = true;
    const dni = this.myForm.controls['dni'].value;
    if (!dni) {
      this.load_reniec = false;
      error_alert('Debe ingresar un DNI');
      return;
    }
    this.reniecService.get_user(dni).subscribe({
      next: (res) => {
        if (res.dni) {
          const first_name = res.nombres;
          const last_name = res.apellidoPaterno + ' ' + res.apellidoMaterno;
          this.load_reniec = false;
          this.myForm.controls['first_name'].setValue(first_name);
          this.myForm.controls['last_name'].setValue(last_name);
        } else {
          this.load_reniec = false;
          this.myForm.controls['first_name'].setValue('');
          this.myForm.controls['last_name'].setValue('');
          error_alert('No se encontraron resultados.');
        }
      },
      error: (err) => {
        this.load_reniec = false;
        error_alert('Ocurrió un error con la búsqueda.');
      },
    });
  }

  validators(name: string) {
    const input = this.myForm.controls[name];
    return input.errors && input.touched;
  }
}
