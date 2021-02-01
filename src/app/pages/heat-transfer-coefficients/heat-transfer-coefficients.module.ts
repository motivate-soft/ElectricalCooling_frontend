import { NgModule } from '@angular/core';
import { HeatTransferCoefficientsComponent } from './heat-transfer-coefficients.component';
import { ThemeModule } from '../../@theme/theme.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartModule } from 'angular2-chartjs';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
import { HtcChartComponent } from './htc-chart/htc-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HtcsTableComponent } from './htcs-table/htcs-table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    Ng2SmartTableModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
  ],
  declarations: [
    HeatTransferCoefficientsComponent,
    HtcChartComponent,
    HtcsTableComponent,
  ],
})
export class HeatTransferCoefficientsModule {}
