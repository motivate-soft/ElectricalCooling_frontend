import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbMenuModule, NbTabsetModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DetailComponent } from './detail.component';
import { DimensionsLossesModule } from './dimensions-losses/dimensions-losses.module';
import { CoolingFlowModule } from './cooling-flow/cooling-flow.module';
import { HeatTransferCoefficientsModule } from './heat-transfer-coefficients/heat-transfer-coefficients.module';
import { ResultComponent } from './result/result.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@NgModule({
  imports: [
    ThemeModule,
    NbMenuModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbTabsetModule,
    NbIconModule,
    NbEvaIconsModule,
    Ng2SmartTableModule,
    ngFormsModule,

    DimensionsLossesModule,
    CoolingFlowModule,
    HeatTransferCoefficientsModule,
  ],
  declarations: [DetailComponent, ResultComponent],
})
export class DetailModule { }
