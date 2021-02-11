import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetailComponent } from "./cmodel-detail/detail.component";
import { CmodelListComponent } from "./cmodel-list/cmodel-list.component";
import { PagesComponent } from "./pages.component";
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: 'cmodel',
                component: CmodelListComponent,
            },
            {
                path: 'cmodel/new',
                component: DetailComponent,
            },
            {
                path: 'cmodel/:id',
                component: DetailComponent,
            },
            {
                path: 'profile',
                component: ProfileComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule { }
