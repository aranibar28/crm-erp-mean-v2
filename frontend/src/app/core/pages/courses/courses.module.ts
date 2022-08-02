import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { IndexCourseComponent } from './index-course/index-course.component';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { CoursesRoutingModule } from './courses-routing.module';

@NgModule({
  declarations: [
    IndexCourseComponent,
    UpdateCourseComponent,
    CreateCourseComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    CoursesRoutingModule,
  ],
})
export class CoursesModule {}
