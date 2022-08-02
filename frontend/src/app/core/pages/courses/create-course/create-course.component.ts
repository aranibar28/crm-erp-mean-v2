import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
})
export class CreateCourseComponent implements OnInit {
  public load_btn: boolean = false;
  public file: File | undefined;
  public imgSelected: any | ArrayBuffer = './assets/img/template/default.png';
  public imgCurrent: any | ArrayBuffer = './assets/img/template/default.png';

  constructor(
    private courseService: CourseService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  myForm: FormGroup = this.fb.group({
    title: [, [Validators.required, Validators.minLength(3)]],
    description: [, Validators.required],
  });

  register() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    if (this.file) {
      this.load_btn = true;
      this.courseService.create_course(this.myForm.value, this.file).subscribe({
        next: (res) => {
          if (res.data) {
            this.load_btn = false;
            this.router.navigateByUrl('/courses');
            Swal.fire('Muy Bien!', 'Se guardó correctamente', 'success');
          } else {
            this.load_btn = false;
            Swal.fire('', res.msg, 'error');
          }
        },
      });
    } else {
      Swal.fire('', 'Es obligatorio subir una imagen.', 'info');
    }
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
