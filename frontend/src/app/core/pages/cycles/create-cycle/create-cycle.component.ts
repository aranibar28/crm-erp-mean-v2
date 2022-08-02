import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CourseService } from 'src/app/services/course.service';
import { CycleService } from 'src/app/services/cycle.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-create-cycle',
  templateUrl: './create-cycle.component.html',
  styleUrls: ['../../../../../assets/plugins/icheck/icheck-bootstrap.min.css'],
})
export class CreateCycleComponent implements OnInit {
  public date = new Date();
  public load_data: boolean = true;
  public load_btn: boolean = false;
  public data: boolean = false;
  public id: string = '';

  public course: any = {};
  public room: any = { room: '', start_time: '08:00', final_time: '09:45' };

  public days: Array<any> = [];
  public frequency: Array<any> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private cycleService: CycleService,
    private location: Location,
    private router: Router,
    private fb: FormBuilder
  ) {}

  myForm: FormGroup = this.fb.group({
    nivel: ['', [Validators.required]],
    sede: ['', [Validators.required]],
    price: [, [Validators.required]],
    start_date: [, [Validators.required]],
    final_date: [, [Validators.required]],
  });

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => (this.id = id));
    this.init_data();
  }

  back(): void {
    this.location.back();
  }

  init_data() {
    this.courseService.read_course_by_id(this.id).subscribe({
      next: (res) => {
        this.load_data = false;
        if (res.data) {
          this.course = res.data;
          this.data = true;
        } else {
          this.data = false;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  register() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.load_btn = true;
    this.myForm.addControl('course', this.fb.control(this.id));
    this.myForm.addControl('frequency', this.fb.control(this.frequency));

    this.cycleService.create_cycle(this.myForm.value).subscribe({
      next: (res) => {
        this.load_btn = false;
        if (res.data) {
          this.router.navigate(['/cycles/course/' + this.id]);
          Swal.fire('Listo!', 'Datos Guardados', 'success');
        } else {
          Swal.fire('Error', res.msg, 'error');
        }
      },
    });
  }

  select_day($event: any) {
    let status = $event.currentTarget.checked;
    let value = $event.target.value;
    if (status) {
      this.days.push(value);
    } else {
      this.days.forEach((element, index) => {
        if (element == value) {
          this.days.splice(index, 1);
        }
      });
    }
  }

  add_item() {
    if (!this.room.room) {
      Swal.fire('Error', 'Debe seleccionar un salón.', 'error');
    } else if (!this.room.aforo || this.room.aforo <= 0) {
      Swal.fire('Error', 'Debe ingresar un aforo válido.', 'error');
    } else if (!this.room.start_time || !this.room.final_time) {
      Swal.fire('Error', 'Debe ingresar un fecha.', 'error');
    } else if (this.days?.length <= 0) {
      Swal.fire('Error', 'Debe seleccionar por lo menos un día.', 'error');
    } else {
      this.room.frequency = this.days;
      this.frequency.push(this.room);
      this.room = { room: '', start_time: '08:00', final_time: '09:45' };
      this.days = [];
      $('.check').prop('checked', false);
      $('#modal_default').modal('hide');
    }
  }

  del_item(index: any) {
    this.frequency.splice(index, 1);
  }

  validators(name: string) {
    const input = this.myForm?.controls[name];
    return input?.errors && input?.touched;
  }
}
