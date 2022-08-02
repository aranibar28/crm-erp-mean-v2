import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateCourseComponent } from './create-course/create-course.component';
import { IndexCourseComponent } from './index-course/index-course.component';
import { UpdateCourseComponent } from './update-course/update-course.component';

const routes: Routes = [
  { path: '', component: IndexCourseComponent },
  { path: 'create', component: CreateCourseComponent },
  { path: 'update/:id', component: UpdateCourseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
