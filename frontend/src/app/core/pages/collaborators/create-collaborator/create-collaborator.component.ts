import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CollaboratorService } from 'src/app/services/collaborator.service';
import { ReniecService } from 'src/app/services/reniec.service';
import { success_alert, error_alert } from 'src/app/helpers/alerts';

@Component({
  selector: 'app-create-collaborator',
  templateUrl: './create-collaborator.component.html',
})
export class CreateCollaboratorComponent implements OnInit {
  public load_btn: boolean = false;
  public load_reniec: boolean = false;

  constructor(
    private collaboratorService: CollaboratorService,
    private reniecService: ReniecService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  myForm: FormGroup = this.fb.group({
    email: [, [Validators.required, Validators.email]],
    password: [, [Validators.required, Validators.minLength(3)]],
    first_name: [, [Validators.required, Validators.minLength(3)]],
    last_name: [, [Validators.required, Validators.minLength(3)]],
    dni: [, [Validators.required]],
    role: ['', [Validators.required]],
    phone: [,],
  });

  register() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.load_btn = true;
    this.collaboratorService.create_collaborator(this.myForm.value).subscribe({
      next: (res) => {
        this.load_btn = false;
        if (res.data) {
          success_alert('Datos guardados correctamente.');
          this.router.navigateByUrl('/collaborators');
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
        error_alert('Ocurri?? un error con la b??squeda.');
      },
    });
  }

  validators(name: string) {
    const input = this.myForm.controls[name];
    return input.errors && input.touched;
  }
}
