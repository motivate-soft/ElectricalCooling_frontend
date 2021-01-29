import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ECommerceComponent } from "./e-commerce/e-commerce.component";
import { NotFoundComponent } from "./miscellaneous/not-found/not-found.component";
import { DimensionsComponent } from "./dimensions-losses/dimensions/dimensions.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "dimensions-and-losses",
        component: DimensionsComponent,
      },
      {
        path: "cooling-flow",
        component: DashboardComponent,
      },
      {
        path: "heat-transfer-coefficients",
        component: DashboardComponent,
      },
      {
        path: "results",
        component: DashboardComponent,
      },
      {
        path: "",
        redirectTo: "dimensions-and-losses",
        pathMatch: "full",
      },
      {
        path: "**",
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
