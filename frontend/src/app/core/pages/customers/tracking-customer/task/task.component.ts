import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CollaboratorService } from 'src/app/services/collaborator.service';
import { ProspectService } from 'src/app/services/prospect.service';
import { success_alert, error_alert } from 'src/app/helpers/alerts';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit {
  public id = this.activatedRoute.snapshot.parent?.params['id'];
  public advisors: Array<any> = [];
  public tasks: Array<any> = [];
  public initForm: any = {};
  public date = new Date();
  public load_data = true;
  public load_btn = false;
  public p: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private collaboratorService: CollaboratorService,
    private prospectService: ProspectService,
    private fb: FormBuilder
  ) {}

  myForm: FormGroup = this.fb.group({
    title: [, [Validators.required]],
    date: [, [Validators.required]],
    time: ['12:00', [Validators.required]],
    type: ['', [Validators.required]],
    priority: ['', [Validators.required]],
    note: [, [Validators.required]],
    advisor: ['', [Validators.required]],
    customer: [this.id, [Validators.required]],
  });

  ngOnInit(): void {
    this.init_advisors();
    this.init_data();
    this.initForm = this.myForm.value;
  }

  init_advisors() {
    this.collaboratorService.list_advisors().subscribe({
      next: (res) => {
        this.advisors = res;
      },
    });
  }

  init_data() {
    this.prospectService.read_tasks(this.id).subscribe({
      next: (res) => {
        this.tasks = res.data;
        this.load_data = false;
      },
    });
  }

  register() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.load_btn = true;
    this.myForm.addControl('customer', this.fb.control(this.id));
    this.prospectService.create_task(this.myForm.value).subscribe({
      next: (res) => {
        this.load_btn = false;
        if (res.data) {
          $('#modal_default').modal('hide');
          success_alert('Se guardaron los datos.');
          this.myForm.reset(this.initForm);
          this.init_data();
        } else {
          error_alert(res.msg);
        }
      },
      error: (err) => {
        error_alert(err.msg);
        this.load_btn = false;
      },
    });
  }

  make_task(id: any) {
    Swal.fire({
      title: 'Marcar esta tarea?',
      text: 'Desea marcar esta tarea como hecho',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#8950FC',
      cancelButtonColor: '#f1416c',
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.prospectService.make_task(id).subscribe({
          next: (res) => {
            if (res.data) {
              success_alert('Tarea realizada.');
              this.init_data();
            } else {
              error_alert(res.msg);
            }
          },
          error: (err) => {
            error_alert(err.error.msg);
          },
        });
      }
    });
  }

  show_task(item: any) {
    Swal.fire({
      icon: 'info',
      title: 'Tarea marcado por:',
      text: `${item.advisor_make?.full_name || 'Sin Marcar'}`,
    });
  }

  validators(name: string) {
    const input = this.myForm.controls[name];
    return input.errors && input.touched;
  }
}
