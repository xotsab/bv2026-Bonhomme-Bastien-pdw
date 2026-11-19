import { Routes } from '@angular/router';
import { DashboardRouter } from './router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardRouter,
    children: [
      { path: 'home', loadComponent: () => import('./page').then((p) => p.HomePage) },
      { path: '', pathMatch: 'full', redirectTo: 'home' },
    ],
  },
];
