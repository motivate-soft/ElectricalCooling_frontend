import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { DetailComponent } from './detail.component';
import { DetailRoutingModule } from './detail-routing.module';
import { DimensionsLossesModule } from './dimensions-losses/dimensions-losses.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { CoolingFlowModule } from './cooling-flow/cooling-flow.module';
import { HeatTransferCoefficientsModule } from './heat-transfer-coefficients/heat-transfer-coefficients.module';
import { ResultComponent } from './result/result.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    DetailRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbButtonModule,
    Ng2SmartTableModule,

    MiscellaneousModule,
    DimensionsLossesModule,
    CoolingFlowModule,
    HeatTransferCoefficientsModule,
  ],
  declarations: [DetailComponent, ResultComponent],
})
export class DetailModule { }