import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@core/feature/auth/auth.routes').then((r) => r.authRoutes),
  },
  {
    path: '',
    loadChildren: () =>
      import('@core/feature/dashboard/dashboard.routes').then((r) => r.dashboardRoutes),
  },
  { path: '**', redirectTo: '' },
];
