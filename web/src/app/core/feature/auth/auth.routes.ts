import { Routes } from '@angular/router';
import { AuthRouter } from './router';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthRouter,
    children: [
      { path: 'sign-in', loadComponent: () => import('./page').then((p) => p.SignInPage) },
      { path: 'sign-up', loadComponent: () => import('./page').then((p) => p.SignUpPage) },
      { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
    ],
  },
];
