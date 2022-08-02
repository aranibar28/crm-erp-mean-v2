import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { Error404Component } from './pages/error404/error404.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  { path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/account/account.module').then((m) => m.AccountModule),
        data: { title: 'Home' }
      },
      {
        path: 'collaborators',
        loadChildren: () => import('./pages/collaborators/collaborators.module').then((m) => m.CollaboratorsModule),
        data: { title: 'Colaboradores' }
      },
      {
        path: 'customers',
        loadChildren: () => import('./pages/customers/customers.module').then((m) => m.CustomersModule),
        data: { title: 'Clientes' }
      },
      {
        path: 'categories',
        loadChildren: () => import('./pages/categories/categories.module').then((m) => m.CategoriesModule),
        data: { title: 'Categorias' }
      },
      {
        path: 'products',
        loadChildren: () => import('./pages/products/products.module').then((m) => m.ProductsModule),
        data: { title: 'Productos' }
      },
      {
        path: 'courses',
        loadChildren: () => import('./pages/courses/courses.module').then((m) => m.CoursesModule),
        data: { title: 'Cursos' }
      },
      {
        path: 'cycles',
        loadChildren: () => import('./pages/cycles/cycles.module').then((m) => m.CyclesModule),
        data: { title: 'Ciclos' }
      },
      {
        path: 'inscriptions',
        loadChildren: () => import('./pages/inscriptions/inscriptions.module').then((m) => m.InscriptionsModule),
        data: { title: 'Inscripciones' }
      },
      {
        path: '**',
        component: Error404Component,
        data: { title: 'Not Found' }
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
