import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryComponent } from '../categories/create-category/create-category.component';
import { UpdateCategoryComponent } from '../categories/update-category/update-category.component';
import { IndexProductComponent } from './index-product/index-product.component';

const routes: Routes = [
  { path: '', component: IndexProductComponent },
  { path: 'create', component: CreateCategoryComponent },
  { path: 'update/:id', component: UpdateCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
