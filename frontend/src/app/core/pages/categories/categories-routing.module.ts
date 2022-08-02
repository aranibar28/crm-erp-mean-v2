import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateCategoryComponent } from './create-category/create-category.component';
import { IndexCategoryComponent } from './index-category/index-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';

const routes: Routes = [
  { path: '', component: IndexCategoryComponent },
  { path: 'create', component: CreateCategoryComponent },
  { path: 'update/:id', component: UpdateCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
