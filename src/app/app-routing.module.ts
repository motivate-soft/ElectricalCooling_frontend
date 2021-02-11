import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './@core/auth-guard.service';


export const routes: Routes = [
  {
    path: 'pages',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'pages/cmodel/new',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/cmodel-detail/detail.module')
      .then(m => m.DetailModule),
  },
  {
    path: 'pages/cmodel/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/cmodel-detail/detail.module')
      .then(m => m.DetailModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.NgxAuthModule),
    // loadChildren: './auth/auth.module#NgxAuthModule',
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
