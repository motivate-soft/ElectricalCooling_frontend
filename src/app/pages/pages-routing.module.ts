import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
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
