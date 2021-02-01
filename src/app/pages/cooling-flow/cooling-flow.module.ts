import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { NbButtonModule, NbCardModule, NbTabsetModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { FluidsComponent } from './fluids/fluids.component';
import { PassagesComponent } from './passages/passages.component';
import { CoolingFlowComponent } from './cooling-flow.component';

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    NbTabsetModule,
    NbButtonModule,
    Ng2SmartTableModule,
  ],
  declarations: [CoolingFlowComponent, FluidsComponent, PassagesComponent],
})
export class CoolingFlowModule {}
