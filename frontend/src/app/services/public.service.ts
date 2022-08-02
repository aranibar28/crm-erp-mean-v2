import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  sidebar: any[] = [
    {
      title: 'Colaboradores',
      path: '/collaborators',
      icon: 'fas fa-user-friends',
    },
    {
      title: 'Clientes',
      path: '/customers',
      icon: 'fas fa-users',
    },
    {
      title: 'Categorias',
      path: '/categories',
      icon: 'fas fa-list',
    },
    {
      title: 'Productos',
      path: '/products',
      icon: 'fas fa-shopping-bag',
    },
    {
      title: 'Cursos',
      path: '/courses',
      icon: 'fas fa-book',
    },
    {
      title: 'Ciclos',
      path: '/cycles',
      icon: 'fas fa-suitcase',
    },
    {
      title: 'Inscripcciones',
      path: '/inscriptions',
      icon: 'fas fa-table',
    },
  ];

  menu: any[] = [
    {
      title: 'Actividades',
      path: 'activities',
      class: 'btn btn-danger',
    },
    {
      title: 'Intereses',
      path: 'interest',
      class: 'btn btn-warning',
    },
    {
      title: 'LLamadas',
      path: 'call',
      class: 'btn btn-success',
    },
    {
      title: 'Correos',
      path: 'mail',
      class: 'btn btn-info',
    },
    {
      title: 'Tareas',
      path: 'task',
      class: 'btn btn-dark',
    },
  ];
}
