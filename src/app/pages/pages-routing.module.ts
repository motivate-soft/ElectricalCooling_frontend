import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../@core/auth-guard.service';
import { DetailComponent } from './cmodel-detail/detail.component';
import { CmodelListComponent } from './cmodel-list/cmodel-list.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: 'cmodel/new',
                canActivate: [AuthGuard],
                component: DetailComponent,

            },
            {
                path: 'cmodel/:id',
                canActivate: [AuthGuard],
                component: DetailComponent,
            },
            {
                path: 'profile',
                component: ProfileComponent,
            },
            {
                path: 'cmodel',
                component: CmodelListComponent,
            },
            { path: '', redirectTo: '/cmodel', pathMatch: 'full' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule { }
