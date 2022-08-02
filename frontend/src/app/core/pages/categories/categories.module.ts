import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { CategoriesRoutingModule } from './categories-routing.module';
import { IndexCategoryComponent } from './index-category/index-category.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';

@NgModule({
  declarations: [
    IndexCategoryComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    CategoriesRoutingModule,
  ],
})
export class CategoriesModule {}
