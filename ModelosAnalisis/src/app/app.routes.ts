import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'todos-eventos',
    loadComponent: () =>
      import('./pages/todos-eventos/todos-eventos.page').then(m => m.TodosEventosPage)
  }
];
