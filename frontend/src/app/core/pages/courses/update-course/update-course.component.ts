import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
const base_url = environment.base_url;

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
})
export class UpdateCourseComponent implements OnInit {
  public course: any = {};
  public load_btn: boolean = false;
  public file: File | undefined;
  public imgSelected: any | ArrayBuffer = './assets/img/template/default.png';
  public imgCurrent: any | ArrayBuffer = './assets/img/template/default.png';
  public id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => (this.id = id));
    this.init_data();
  }

  myForm: FormGroup = this.fb.group({
    title: [, [Validators.required, Validators.minLength(3)]],
    description: [, Validators.required],
  });

  init_data() {
    this.courseService.read_course_by_id(this.id).subscribe({
      next: (res) => {
        if (res.data) {
          this.course = res.data;
          this.myForm.patchValue(this.course);
          this.imgSelected = `${base_url}/courses/image/${this.course.image}`;
          this.imgCurrent = `${base_url}/courses/image/${this.course.image}`;
        } else {
          this.router.navigateByUrl('/courses');
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

    if (this.file) {
      const img = this.fb.control(this.file, Validators.required);
      this.myForm.addControl('image', img);
    }

    this.load_btn = true;
    this.courseService.update_course(this.id, this.myForm.value).subscribe({
      next: (res) => {
        if (res.data) {
          this.load_btn = false;
          this.router.navigateByUrl('/courses');
          Swal.fire('Muy Bien!', 'Se actualizó  correctamente', 'success');
        } else {
          this.load_btn = false;
          Swal.fire('', res.msg, 'error');
        }
      },
      error: (err) => {
        this.load_btn = false;
        console.log(err);
      },
    });
  }

  validators(name: string) {
    const input = this.myForm.controls[name];
    return input.errors && input.touched;
  }

  fileChanged(event: any) {
    const file = event.target.files[0];
    if (!file) {
      this.file = undefined;
      this.imgSelected = this.imgCurrent;
    } else {
      if (file.size <= 4000000) {
        const array = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
        if (array.includes(file.type)) {
          const reader = new FileReader();
          reader.onload = () => (this.imgSelected = reader.result);
          reader.readAsDataURL(file);
          this.file = file;
        } else {
          this.file = undefined;
          this.imgSelected = this.imgCurrent;
          Swal.fire('', 'El archivo debe ser una imagen', 'error');
        }
      } else {
        this.file = undefined;
        this.imgSelected = this.imgCurrent;
        Swal.fire('', 'La imagen no puede superar los 4MB', 'error');
      }
    }
  }
}
