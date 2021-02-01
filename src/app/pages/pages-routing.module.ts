import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { DimensionsLossesComponent } from './dimensions-losses/dimensions-losses.component';
import { CoolingFlowComponent } from './cooling-flow/cooling-flow.component';
import { HeatTransferCoefficientsComponent } from './heat-transfer-coefficients/heat-transfer-coefficients.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dimensions-and-losses',
        component: DimensionsLossesComponent,
      },
      {
        path: 'cooling-flow',
        component: CoolingFlowComponent,
      },
      {
        path: 'heat-transfer-coefficients',
        component: HeatTransferCoefficientsComponent,
      },
      {
        path: 'results',
        component: ResultComponent,
      },
      {
        path: '',
        redirectTo: 'dimensions-and-losses',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
