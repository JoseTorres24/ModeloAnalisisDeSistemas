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
  },
  {
    path: 'admin-login',
    loadComponent: () => import('./pages/admin-login/admin-login.page').then(m => m.AdminLoginPage)
  },
  {
    path: 'admin',
    redirectTo: '/assets/ModelosPanel/admin.html'
  },
  {
    path: 'organizador',
    redirectTo: '/assets/ModelosPanel/organizador.html'
  }
];
