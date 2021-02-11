import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { DetailComponent } from './detail.component';
import { DimensionsLossesComponent } from './dimensions-losses/dimensions-losses.component';
import { CoolingFlowComponent } from './cooling-flow/cooling-flow.component';
import { HeatTransferCoefficientsComponent } from './heat-transfer-coefficients/heat-transfer-coefficients.component';
import { ResultComponent } from './result/result.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: DetailComponent,
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
export class DetailRoutingModule { }
